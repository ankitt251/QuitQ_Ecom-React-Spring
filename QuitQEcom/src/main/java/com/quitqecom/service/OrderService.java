package com.quitqecom.service;

import java.util.List;

import com.quitqecom.enums.OrderStatus;
import com.quitqecom.exception.OrderException;
import com.quitqecom.model.Address;
import com.quitqecom.model.Cart;
import com.quitqecom.model.OrderItem;
import com.quitqecom.model.Orders;
import com.quitqecom.model.User;

public interface OrderService {

	public List<Orders> createOrder(User user, Address shippingAddress, Cart cart) throws OrderException;

	public Orders findOrderById(Long orderId) throws OrderException;

	public List<Orders> usersOrdersHistory(Long userId) throws OrderException;

	public List<Orders> sellerOrders(Long sellerId);

	public Orders updateOrderStatus(Long orderId, OrderStatus orderStatus) throws OrderException;

	public Orders cancelOrder(Long orderId, User user) throws OrderException;

	OrderItem getOrderItemById(Long orderId) throws OrderException;
}
