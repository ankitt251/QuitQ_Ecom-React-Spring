package com.quitqecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quitqecom.exception.ProductException;
import com.quitqecom.exception.SellerException;
import com.quitqecom.exception.UserException;
import com.quitqecom.model.Product;
import com.quitqecom.model.Seller;
import com.quitqecom.request.CreateProductReq;
import com.quitqecom.service.ProductService;
import com.quitqecom.service.SellerService;

@RestController
@RequestMapping("/seller/products")
public class SellerProductController {

	@Autowired
	private SellerService sellerService;

	@Autowired
	private ProductService productService;

	@PostMapping("/add-product")
	public ResponseEntity<Product> createProduct(@RequestBody CreateProductReq req,
			@RequestHeader("Authorization") String jwt) throws UserException, ProductException, SellerException {
		Seller seller = sellerService.getSellerProfile(jwt);

		Product product = productService.createProduct(req, seller);

		return new ResponseEntity<>(product, HttpStatus.CREATED);
	}

	@DeleteMapping("delete/{productId}")
	public ResponseEntity<String> deleteProduct(@PathVariable Long productId) {
		try {
			productService.deleteProduct(productId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (ProductException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("update/{productId}")
	public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @RequestBody Product product)
			throws ProductException, UserException {

		Product updatedProduct = productService.updateProduct(productId, product);
		return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<Product>> getProductBySellerId(@RequestHeader("Authorization") String jwt)
			throws UserException {
		Seller seller = sellerService.getSellerProfile(jwt);
		List<Product> products = productService.getProductsBySellerId(seller.getId());
		return new ResponseEntity<>(products, HttpStatus.OK);
	}

}
