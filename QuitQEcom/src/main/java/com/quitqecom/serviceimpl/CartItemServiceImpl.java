package com.quitqecom.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quitqecom.model.CartItem;
import com.quitqecom.model.User;
import com.quitqecom.repository.CartItemRepository;
import com.quitqecom.service.CartItemService;

@Service
public class CartItemServiceImpl implements CartItemService {

	@Autowired
	private CartItemRepository cartItemRepository;

	@Override
	public CartItem findCartItemById(Long id) throws Exception {

		return cartItemRepository.findById(id).orElseThrow(() -> new Exception("Cart item not found with id: " + id));
	}

	@Override
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws Exception {
		CartItem item = findCartItemById(id);

		User cartItemUser = item.getCart().getUser();

		if (cartItemUser.getId() == userId) {
			item.setQuantity(cartItem.getQuantity());
			item.setMrpPrice(item.getQuantity() * item.getProduct().getMrpPrice());
			item.setSellingPrice(item.getQuantity() * item.getProduct().getSellingPrice());
			return cartItemRepository.save(item);
		}
		throw new Exception("Cart item not found");
	}

	@Override
	public void removeCartItem(Long userId, Long cartItemId) throws Exception {

		CartItem item = findCartItemById(cartItemId);

		User cartItemUser = item.getCart().getUser();

		if (cartItemUser.getId() == userId) {
			cartItemRepository.delete(item);
		} else {
			throw new Exception("Cart item not found");
		}

	}

}
