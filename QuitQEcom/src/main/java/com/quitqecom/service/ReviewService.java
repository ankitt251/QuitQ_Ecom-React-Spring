package com.quitqecom.service;

import java.util.List;

import com.quitqecom.model.Product;
import com.quitqecom.model.Review;
import com.quitqecom.model.User;
import com.quitqecom.request.CreateReviewRequest;

public interface ReviewService {

	Review createReview(CreateReviewRequest req, User user, Product product);

	List<Review> getReviewByProductId(Long productId);

	Review updateReview(Long reviewId, String reviewText, double rating, Long userId) throws Exception;

	void deleteReview(Long reviewId, Long userId) throws Exception;

	Review getReviewById(Long reviewId) throws Exception;

}
