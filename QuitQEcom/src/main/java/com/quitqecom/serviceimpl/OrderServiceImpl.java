package com.quitqecom.serviceimpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quitqecom.enums.OrderStatus;
import com.quitqecom.exception.OrderException;
import com.quitqecom.model.Address;
import com.quitqecom.model.Cart;
import com.quitqecom.model.CartItem;
import com.quitqecom.model.OrderItem;
import com.quitqecom.model.Orders;
import com.quitqecom.model.User;
import com.quitqecom.repository.AddressRepository;
import com.quitqecom.repository.OrderItemRepository;
import com.quitqecom.repository.OrderRepository;
import com.quitqecom.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private OrderItemRepository orderItemRepository;

	@Override
	public List<Orders> createOrder(User user, Address shippingAddress, Cart cart) throws OrderException {

		if (!user.getAddress().contains(shippingAddress)) {
			user.getAddress().add(shippingAddress);
		}

		Address address = addressRepository.save(shippingAddress);

		Map<Long, List<CartItem>> itemsBySeller = cart.getCartItems().stream()
				.collect(Collectors.groupingBy(item -> item.getProduct().getSeller().getId()));

		List<Orders> orders = new ArrayList<>();

		for (Map.Entry<Long, List<CartItem>> entry : itemsBySeller.entrySet()) {
			Long sellerId = entry.getKey();
			List<CartItem> items = entry.getValue();

			int totalOrderPrice = items.stream().mapToInt(CartItem::getSellingPrice).sum();
			int totalItem = items.stream().mapToInt(CartItem::getQuantity).sum();

			Orders createdOrder = new Orders();
			createdOrder.setUser(user);
			createdOrder.setSellerId(sellerId);
			createdOrder.setTotalMrpPrice(totalOrderPrice);
			createdOrder.setTotalSellingPrice(totalOrderPrice);
			createdOrder.setTotalItem(totalItem);
			createdOrder.setShippingAddress(address);
			createdOrder.setOrderStatus(OrderStatus.PENDING);

			Orders savedOrder = orderRepository.save(createdOrder);
			orders.add(createdOrder);

			List<OrderItem> orderItems = new ArrayList<>();

			for (CartItem item : items) {
				OrderItem orderItem = new OrderItem();

				orderItem.setOrder(savedOrder);
				orderItem.setMrpPrice(item.getMrpPrice());
				orderItem.setProduct(item.getProduct());
				orderItem.setQuantity(item.getQuantity());
				orderItem.setSize(item.getSize());
				orderItem.setUserId(item.getUserId());
				orderItem.setSellingPrice(item.getSellingPrice());

				savedOrder.getOrderItems().add(orderItem);

				OrderItem savedOrderItem = orderItemRepository.save(orderItem);
				orderItems.add(savedOrderItem);
			}

		}
		return orders;
	}

	@Override
	public Orders findOrderById(Long orderId) throws OrderException {
		return orderRepository.findById(orderId).orElseThrow(() -> new OrderException("Order not found"));
	}

	@Override
	public List<Orders> usersOrdersHistory(Long userId) throws OrderException {
		return orderRepository.findByUserId(userId);
	}

	@Override
	public List<Orders> sellerOrders(Long sellerId) {
		return orderRepository.findBySellerId(sellerId);
	}

	@Override
	public Orders updateOrderStatus(Long orderId, OrderStatus orderStatus) throws OrderException {
		Orders order = findOrderById(orderId);
		order.setOrderStatus(orderStatus);
		return orderRepository.save(order);
	}

	@Override
	public Orders cancelOrder(Long orderId, User user) throws OrderException {
		Orders order = findOrderById(orderId);

		if (user.getId().equals(order.getUser().getId())) {
			throw new OrderException("You don't have access to this order");
		}

		order.setOrderStatus(OrderStatus.CANCELLED);
		return orderRepository.save(order);

	}

	@Override
	public OrderItem getOrderItemById(Long orderId) throws OrderException {

		return orderItemRepository.findById(orderId).orElseThrow(() -> new OrderException("Order not found"));
	}

}