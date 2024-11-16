package com.quitqecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quitqecom.enums.OrderStatus;
import com.quitqecom.exception.OrderException;
import com.quitqecom.exception.SellerException;
import com.quitqecom.exception.UserException;
import com.quitqecom.model.Orders;
import com.quitqecom.model.Seller;
import com.quitqecom.service.OrderService;
import com.quitqecom.service.SellerService;

@RestController
@RequestMapping("/api/seller/orders")
public class SellerOrderController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private SellerService sellerService;

	@GetMapping
	public ResponseEntity<List<Orders>> getAllOrdersHandler(@RequestHeader("Authorization") String jwt)
			throws SellerException, UserException {
		Seller seller = sellerService.getSellerProfile(jwt);
		List<Orders> orders = orderService.sellerOrders(seller.getId());

		return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);

	}

	@PatchMapping("/{orderId}/status/{orderStatus}")
	public ResponseEntity<Orders> updateOrderHandler(@RequestHeader("Authorization") String jwt,
			@PathVariable Long orderId, @PathVariable OrderStatus orderStatus) throws OrderException {

		Orders order = orderService.updateOrderStatus(orderId, orderStatus);
		return new ResponseEntity<>(order, HttpStatus.ACCEPTED);

	}

}
