package com.quitqecom.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quitqecom.model.Cart;
import com.quitqecom.model.CartItem;
import com.quitqecom.model.Product;
import com.quitqecom.model.User;
import com.quitqecom.repository.CartItemRepository;
import com.quitqecom.repository.CartRepository;
import com.quitqecom.service.CartService;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private CartItemRepository cartItemRepository;

	@Override
	public CartItem addCartItem(User user, Product product, int quantity, String size) {

		Cart cart = findUserCart(user);

		CartItem isPresent = cartItemRepository.findByCartAndProductAndSize(cart, product, size);

		if (isPresent == null) {
			CartItem cartItem = new CartItem();
			cartItem.setCart(cart);
			cartItem.setProduct(product);
			cartItem.setQuantity(quantity);
			cartItem.setUserId(user.getId());
			cartItem.setSize(size);

			int totalPrice = quantity * product.getSellingPrice();
			cartItem.setSellingPrice(totalPrice);
			cartItem.setMrpPrice(product.getMrpPrice());

			cart.getCartItems().add(cartItem);
			cartItem.setCart(cart);

			return cartItemRepository.save(cartItem);
		}
		return isPresent;
	}

	@Override
	public Cart findUserCart(User user) {
		Cart cart = cartRepository.findByUserId(user.getId());

		int totalPrice = 0;
		int totalDiscountPrice = 0;
		int totalItem = 0;

		for (CartItem cartItem : cart.getCartItems()) {
			totalPrice += cartItem.getMrpPrice();
			totalDiscountPrice += cartItem.getSellingPrice();
			totalItem += cartItem.getQuantity();
		}

		cart.setTotalMrpPrice(totalPrice);
		cart.setTotalItem(totalItem);
		cart.setTotalSellingPrice(totalDiscountPrice);
		cart.setDiscount(calculateDiscountPercentage(totalPrice, totalDiscountPrice));
		cart.setTotalItem(totalItem);
		return cart;
	}

	private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
		if (mrpPrice <= 0) {
			return 0;
		}

		double discount = mrpPrice - sellingPrice;
		double discountPercentage = (discount / mrpPrice) * 100;

		return (int) discountPercentage;
	}

}
