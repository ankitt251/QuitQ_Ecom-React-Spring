package com.quitqecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quitqecom.model.Cart;
import com.quitqecom.model.CartItem;
import com.quitqecom.model.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

	CartItem findByCartAndProductAndSize(Cart cart, Product product, String size);

}
