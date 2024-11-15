package com.quitqecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quitqecom.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

	Cart findByUserId(Long id);

}
