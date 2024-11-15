package com.quitqecom.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.quitqecom.exception.ProductException;
import com.quitqecom.model.Product;
import com.quitqecom.model.Seller;
import com.quitqecom.request.CreateProductReq;

public interface ProductService {

	public Product createProduct(CreateProductReq req, Seller seller);

	public String deleteProduct(Long productId) throws ProductException;

	public Product updateProduct(Long productId, Product product) throws ProductException;

	Product findProductById(Long productId) throws ProductException;

	public Page<Product> getAllProducts(String category, String brand, String color, String sizes, Integer minPrice,
			Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber);

	public List<Product> getAllProducts();

	List<Product> getProductsBySellerId(Long sellerId);
}