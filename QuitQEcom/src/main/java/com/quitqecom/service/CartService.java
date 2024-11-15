package com.quitqecom.service;

import com.quitqecom.model.Cart;
import com.quitqecom.model.CartItem;
import com.quitqecom.model.Product;
import com.quitqecom.model.User;

public interface CartService {

	public CartItem addCartItem(User user, Product product, int quantity, String size);

	public Cart findUserCart(User user);

}
