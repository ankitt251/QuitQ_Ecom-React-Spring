package com.quitqecom.service;

import java.util.List;

import com.quitqecom.exception.OrderException;
import com.quitqecom.model.Address;
import com.quitqecom.model.Order;
import com.quitqecom.model.User;

public interface OrderService {

	public Order createOrder(User user, Address shippingAddress) throws OrderException;

	public Order findOrderById(Long orderId) throws OrderException;

	public List<Order> usersOrdersHistory(Long userId) throws OrderException;

	public Order placedOrder(Long orderId) throws OrderException;

	public Order confirmOrder(Long orderId) throws OrderException;

	public Order shippedOrder(Long orderId) throws OrderException;

	public Order deliveredOrder(Long orderId) throws OrderException;

	public Order cancelledOrder(Long orderId) throws OrderException;

	public List<Order> getAllOrders();

	public void deleteOrder(Long orderId) throws OrderException;

}
