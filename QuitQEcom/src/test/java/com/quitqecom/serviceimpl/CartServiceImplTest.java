package com.quitqecom.serviceimpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.HashSet;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.quitqecom.model.Cart;
import com.quitqecom.model.CartItem;
import com.quitqecom.model.Product;
import com.quitqecom.model.User;
import com.quitqecom.repository.CartItemRepository;
import com.quitqecom.repository.CartRepository;

class CartServiceImplTest {

	@InjectMocks
	private CartServiceImpl cartService;

	@Mock
	private CartRepository cartRepository;

	@Mock
	private CartItemRepository cartItemRepository;

	private User user;
	private Product product;
	private Cart cart;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);

		// Mock user
		user = new User();
		user.setId(1L);

		// Mock product
		product = new Product();
		product.setId(101L);
		product.setSellingPrice(500);
		product.setMrpPrice(1000);

		// Mock cart
		cart = new Cart();
		cart.setId(1L);
		cart.setUser(user);
		cart.setCartItems(new HashSet<>());

		// Mock cart repository behavior
		when(cartRepository.findByUserId(user.getId())).thenReturn(cart);
	}

	@Test
	void testAddCartItem_ExistingCartItem() {
		String size = "M";
		int quantity = 2;

		CartItem existingItem = new CartItem();
		existingItem.setId(1L);
		existingItem.setCart(cart);
		existingItem.setProduct(product);
		existingItem.setSize(size);

		when(cartItemRepository.findByCartAndProductAndSize(cart, product, size)).thenReturn(existingItem);

		CartItem cartItem = cartService.addCartItem(user, product, quantity, size);

		assertNotNull(cartItem);
		assertEquals(existingItem, cartItem);
		verify(cartItemRepository, times(0)).save(cartItem);
	}

	@Test
	void testFindUserCart_ValidCart() {
		CartItem cartItem = new CartItem();
		cartItem.setMrpPrice(1000);
		cartItem.setSellingPrice(500);
		cartItem.setQuantity(2);
		cart.getCartItems().add(cartItem);

		Cart foundCart = cartService.findUserCart(user);

		assertNotNull(foundCart);
		assertEquals(1000, foundCart.getTotalMrpPrice());
		assertEquals(500, foundCart.getTotalSellingPrice());
		assertEquals(50, foundCart.getDiscount());
		assertEquals(2, foundCart.getTotalItem());
	}

	@Test
	void testFindUserCart_EmptyCart() {
		Cart foundCart = cartService.findUserCart(user);

		assertNotNull(foundCart);
		assertEquals(0, foundCart.getTotalMrpPrice());
		assertEquals(0, foundCart.getTotalSellingPrice());
		assertEquals(0, foundCart.getDiscount());
		assertEquals(0, foundCart.getTotalItem());
	}
}
