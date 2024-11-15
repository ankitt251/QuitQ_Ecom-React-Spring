package com.quitqecom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quitqecom.model.Orders;

public interface OrderRepository extends JpaRepository<Orders, Long> {

	List<Orders> findByUserId(Long userId);

	List<Orders> findBySellerId(Long sellerId);

}
