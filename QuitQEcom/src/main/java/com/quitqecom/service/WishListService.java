package com.quitqecom.service;

import com.quitqecom.model.Product;
import com.quitqecom.model.User;
import com.quitqecom.model.Wishlist;

public interface WishListService {

	Wishlist createWishList(User user);

	Wishlist getWishListByUserId(User user);

	Wishlist addProductToWishList(User user, Product product);

}