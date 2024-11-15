package com.quitqecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quitqecom.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
