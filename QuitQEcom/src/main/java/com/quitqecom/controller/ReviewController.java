package com.quitqecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quitqecom.exception.ProductException;
import com.quitqecom.exception.UserException;
import com.quitqecom.model.Product;
import com.quitqecom.model.Review;
import com.quitqecom.model.User;
import com.quitqecom.request.CreateReviewRequest;
import com.quitqecom.response.ApiResponse;
import com.quitqecom.service.ProductService;
import com.quitqecom.service.ReviewService;
import com.quitqecom.service.UserService;

@RestController
@RequestMapping("/api")
public class ReviewController {

	@Autowired
	private UserService userService;

	@Autowired
	private ReviewService reviewService;

	@Autowired
	private ProductService productService;

	@GetMapping("/products/{productId}/reviews")
	public ResponseEntity<List<Review>> getReviewsByProductId(@PathVariable Long productId) {

		List<Review> reviews = reviewService.getReviewByProductId(productId);

		return ResponseEntity.ok(reviews);

	}

	@PostMapping("/products/{productId}/reviews")
	public ResponseEntity<Review> writeReview(@RequestBody CreateReviewRequest req, @PathVariable Long productId,
			@RequestHeader("Authorization") String jwt) throws UserException, ProductException {

		User user = userService.findUserProfileByJwt(jwt);
		Product product = productService.findProductById(productId);

		Review review = reviewService.createReview(req, user, product);
		return ResponseEntity.ok(review);

	}

	@PatchMapping("/reviews/{reviewId}")
	public ResponseEntity<Review> updateReview(@RequestHeader("Authorization") String jwt, @PathVariable Long reviewId,
			@RequestBody CreateReviewRequest req) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		Review review = reviewService.updateReview(reviewId, req.getReviewText(), req.getReviewRating(), user.getId());
		return ResponseEntity.ok(review);
	}

	@DeleteMapping("/reviews/{reviewId}")
	public ResponseEntity<ApiResponse> deleteReview(@RequestHeader("Authorization") String jwt,
			@PathVariable Long reviewId) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		reviewService.deleteReview(reviewId, user.getId());
		ApiResponse res = new ApiResponse();
		res.setMessage("Review deleted successfully");
		return ResponseEntity.ok(res);
	}

}
