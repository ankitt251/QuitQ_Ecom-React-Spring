package com.quitqecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quitqecom.exception.OrderException;
import com.quitqecom.exception.UserException;
import com.quitqecom.model.Address;
import com.quitqecom.model.Cart;
import com.quitqecom.model.OrderItem;
import com.quitqecom.model.Orders;
import com.quitqecom.model.Seller;
import com.quitqecom.model.SellerReport;
import com.quitqecom.model.User;
import com.quitqecom.service.CartService;
import com.quitqecom.service.OrderService;
import com.quitqecom.service.SellerReportService;
import com.quitqecom.service.SellerService;
import com.quitqecom.service.UserService;

@RestController
@RequestMapping("/api/order")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private UserService userService;

	@Autowired
	private CartService cartService;

	@Autowired
	private SellerService sellerService;

	@Autowired
	private SellerReportService sellerReportService;

	@PostMapping("/createorder")
	public ResponseEntity<Orders> createOrder(@RequestBody Address shippingAddress,
			@RequestHeader("Authorization") String jwt) throws OrderException, UserException {

		User user = userService.findUserProfileByJwt(jwt);
		Cart cart = cartService.findUserCart(user);

		List<Orders> orders = orderService.createOrder(user, shippingAddress, cart);
		return ResponseEntity.ok(orders.get(0));
	}

	@GetMapping("/myorders")
	public ResponseEntity<List<Orders>> usersOrdersHistory(@RequestHeader("Authorization") String jwt)
			throws UserException, OrderException {

		User user = userService.findUserProfileByJwt(jwt);
		List<Orders> orders = orderService.usersOrdersHistory(user.getId());
		return ResponseEntity.ok(orders);
	}

	@GetMapping("/{orderId}")
	public ResponseEntity<Orders> getOrderById(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt)
			throws OrderException, UserException {

		User user = userService.findUserProfileByJwt(jwt);
		Orders orders = orderService.findOrderById(orderId);
		return new ResponseEntity<>(orders, HttpStatus.OK);
	}

	@GetMapping("/item/{orderItemId}")
	public ResponseEntity<OrderItem> getOrderItemById(@PathVariable Long orderItemId,
			@RequestHeader("Authorization") String jwt) throws OrderException, UserException {
		User user = userService.findUserProfileByJwt(jwt);
		OrderItem orderItem = orderService.getOrderItemById(orderItemId);
		return new ResponseEntity<>(orderItem, HttpStatus.OK);
	}

	public ResponseEntity<Orders> cancelOrder(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt)
			throws OrderException, UserException {

		User user = userService.findUserProfileByJwt(jwt);
		Orders orders = orderService.cancelOrder(orderId, user);

		Seller seller = sellerService.getSellerById(orders.getSellerId());

		SellerReport report = sellerReportService.getSellerReport(seller);
		report.setCancelledOrders(report.getCancelledOrders());

		report.setTotalRefunds(report.getTotalRefunds() + orders.getTotalSellingPrice());
		sellerReportService.updateSellerReport(report);

		return ResponseEntity.ok(orders);

	}

}
