package com.quitqecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quitqecom.exception.ProductException;
import com.quitqecom.exception.UserException;
import com.quitqecom.model.Product;
import com.quitqecom.model.User;
import com.quitqecom.model.Wishlist;
import com.quitqecom.service.ProductService;
import com.quitqecom.service.UserService;
import com.quitqecom.service.WishListService;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

	@Autowired
	private WishListService wishListService;

	@Autowired
	private UserService userService;

	@Autowired
	private ProductService productService;

	@GetMapping
	public ResponseEntity<Wishlist> getWishListByUserId(@RequestHeader("Authorization") String jwt)
			throws UserException {
		User user = userService.findUserProfileByJwt(jwt);
		Wishlist wishlist = wishListService.getWishListByUserId(user);
		return new ResponseEntity<>(wishlist, HttpStatus.ACCEPTED);
	}

	@PostMapping("/addProduct/{productId}")
	public ResponseEntity<Wishlist> addProductToWishList(@PathVariable Long productId,
			@RequestHeader("Authorization") String jwt) throws ProductException, UserException {
		Product product = productService.findProductById(productId);

		User user = userService.findUserProfileByJwt(jwt);
		Wishlist updatedWishlist = wishListService.addProductToWishList(user, product);
		return new ResponseEntity<>(updatedWishlist, HttpStatus.ACCEPTED);

	}

}
