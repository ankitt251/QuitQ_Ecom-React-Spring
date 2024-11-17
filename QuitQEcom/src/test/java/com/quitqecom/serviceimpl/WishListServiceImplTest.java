package com.quitqecom.serviceimpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.HashSet;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.quitqecom.model.Product;
import com.quitqecom.model.User;
import com.quitqecom.model.Wishlist;
import com.quitqecom.repository.WishListRepository;

class WishListServiceImplTest {

	@InjectMocks
	private WishListServiceImpl wishListService;

	@Mock
	private WishListRepository wishListRepository;

	private User user;
	private Product product;
	private Wishlist wishlist;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);

		// Initialize test data
		user = new User();
		user.setId(1L);

		product = new Product();
		product.setId(101L);

		wishlist = new Wishlist();
		wishlist.setId(1L);
		wishlist.setUser(user);
		wishlist.setProducts(new HashSet<>());
	}

	@Test
	void testCreateWishList() {
		// Arrange
		when(wishListRepository.save(any(Wishlist.class))).thenReturn(wishlist);

		// Act
		Wishlist createdWishlist = wishListService.createWishList(user);

		// Assert
		assertNotNull(createdWishlist, "Wishlist should not be null");
		assertEquals(user, createdWishlist.getUser(), "User mismatch");
		verify(wishListRepository, times(1)).save(any(Wishlist.class));
	}

	@Test
	void testGetWishListByUserId_ExistingWishlist() {
		// Arrange
		when(wishListRepository.findByUserId(user.getId())).thenReturn(wishlist);

		// Act
		Wishlist retrievedWishlist = wishListService.getWishListByUserId(user);

		// Assert
		assertNotNull(retrievedWishlist, "Wishlist should not be null");
		assertEquals(user, retrievedWishlist.getUser(), "User mismatch");
		verify(wishListRepository, times(1)).findByUserId(user.getId());
	}

	@Test
	void testGetWishListByUserId_CreateNewWishlistIfNotExist() {
		// Arrange
		when(wishListRepository.findByUserId(user.getId())).thenReturn(null);
		when(wishListRepository.save(any(Wishlist.class))).thenReturn(wishlist);

		// Act
		Wishlist retrievedWishlist = wishListService.getWishListByUserId(user);

		// Assert
		assertNotNull(retrievedWishlist, "Wishlist should not be null");
		assertEquals(user, retrievedWishlist.getUser(), "User mismatch");
		verify(wishListRepository, times(1)).findByUserId(user.getId());
		verify(wishListRepository, times(1)).save(any(Wishlist.class));
	}

	@Test
	void testAddProductToWishList_AddProduct() {
		// Arrange
		when(wishListRepository.findByUserId(user.getId())).thenReturn(wishlist);
		when(wishListRepository.save(any(Wishlist.class))).thenReturn(wishlist);

		// Act
		Wishlist updatedWishlist = wishListService.addProductToWishList(user, product);

		// Assert
		assertNotNull(updatedWishlist, "Wishlist should not be null");
		assertTrue(updatedWishlist.getProducts().contains(product), "Product should be in the wishlist");
		verify(wishListRepository, times(1)).save(wishlist);
	}

	@Test
	void testAddProductToWishList_RemoveProduct() {
		// Arrange
		wishlist.getProducts().add(product); // Pre-add the product
		when(wishListRepository.findByUserId(user.getId())).thenReturn(wishlist);
		when(wishListRepository.save(any(Wishlist.class))).thenReturn(wishlist);

		// Act
		Wishlist updatedWishlist = wishListService.addProductToWishList(user, product);

		// Assert
		assertNotNull(updatedWishlist, "Wishlist should not be null");
		assertFalse(updatedWishlist.getProducts().contains(product), "Product should be removed from the wishlist");
		verify(wishListRepository, times(1)).save(wishlist);
	}
}
