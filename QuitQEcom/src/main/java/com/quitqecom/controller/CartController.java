package com.quitqecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quitqecom.exception.ProductException;
import com.quitqecom.exception.UserException;
import com.quitqecom.model.Cart;
import com.quitqecom.model.CartItem;
import com.quitqecom.model.Product;
import com.quitqecom.model.User;
import com.quitqecom.request.AddItemRequest;
import com.quitqecom.response.ApiResponse;
import com.quitqecom.service.CartItemService;
import com.quitqecom.service.CartService;
import com.quitqecom.service.ProductService;
import com.quitqecom.service.UserService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

	@Autowired
	private CartService cartService;

	@Autowired
	private CartItemService cartItemService;

	@Autowired
	private UserService userService;

	@Autowired
	private ProductService productService;

	@GetMapping
	public ResponseEntity<Cart> findUserCartHandler(@RequestHeader("Authorization") String jwt) throws UserException {
		User user = userService.findUserProfileByJwt(jwt);

		Cart cart = cartService.findUserCart(user);

		return new ResponseEntity<>(cart, HttpStatus.ACCEPTED);
	}

	@PutMapping("/add")
	public ResponseEntity<CartItem> addItemToCart(@RequestBody AddItemRequest req,
			@RequestHeader("Authorization") String jwt) throws UserException, ProductException, Exception {

		User user = userService.findUserProfileByJwt(jwt);
		Product product = productService.findProductById(req.getProductId());

		CartItem item = cartService.addCartItem(user, product, req.getQuantity(), req.getSize());

		return new ResponseEntity<>(item, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/delete/{cartItemId}")
	public ResponseEntity<ApiResponse> deleteCartItemHandler(@PathVariable Long cartItemId,
			@RequestHeader("Authorization") String jwt) throws Exception {

		User user = userService.findUserProfileByJwt(jwt);
		cartItemService.removeCartItem(user.getId(), cartItemId);

		ApiResponse response = new ApiResponse();
		response.setMessage("Cart item removed successfully");

		return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}

	@PutMapping("/update/{cartItemId}")
	public ResponseEntity<CartItem> updateCartItemHandler(@PathVariable Long cartItemId, @RequestBody CartItem cartItem,
			@RequestHeader("Authorization") String jwt) throws Exception {

		User user = userService.findUserProfileByJwt(jwt);

		CartItem updatedItem = null;

		if (cartItem.getQuantity() > 0) {
			updatedItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
		}

		return new ResponseEntity<>(updatedItem, HttpStatus.ACCEPTED);

	}

}
