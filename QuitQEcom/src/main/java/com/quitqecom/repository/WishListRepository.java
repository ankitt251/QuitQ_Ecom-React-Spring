package com.quitqecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quitqecom.model.Wishlist;

public interface WishListRepository extends JpaRepository<Wishlist, Long> {

	Wishlist findByUserId(Long userId);

}
