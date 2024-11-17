package com.quitqecom.serviceimpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.quitqecom.exception.ProductException;
import com.quitqecom.model.Category;
import com.quitqecom.model.Product;
import com.quitqecom.model.Seller;
import com.quitqecom.repository.CategoryRepository;
import com.quitqecom.repository.ProductRepository;
import com.quitqecom.request.CreateProductReq;
import com.quitqecom.service.SellerService;

class ProductServiceImplTest {

	@InjectMocks
	private ProductServiceImpl productService;

	@Mock
	private CategoryRepository categoryRepository;

	@Mock
	private ProductRepository productRepository;

	@Mock
	private SellerService sellerService;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void testCreateProduct() {
		// Arrange
		CreateProductReq req = new CreateProductReq();
		req.setCategory("Electronics");
		req.setCategory2("Laptops");
		req.setCategory3("Gaming Laptops");
		req.setTitle("Gaming Laptop");
		req.setColor("Black");
		req.setSellingPrice(900);
		req.setImageUrl(Collections.singletonList("https://example.com/gaming-laptop.jpg"));
		req.setMrpPrice(1000);
		req.setDescription("A powerful gaming laptop");
		req.setSizes("15-inch");

		Seller seller = new Seller();
		seller.setId(1L);

		Category category = new Category();
		category.setCategoryId("Gaming Laptops");

		when(categoryRepository.findByCategoryId("Gaming Laptops")).thenReturn(category);
		when(productRepository.save(any(Product.class))).thenReturn(new Product());

		// Act
		Product product = productService.createProduct(req, seller);

		// Assert
		assertNotNull(product);
		verify(productRepository, times(1)).save(any(Product.class));
	}

	@Test
	void testFindProductById_Success() throws ProductException {
		// Arrange
		Product product = new Product();
		product.setId(1L);
		when(productRepository.findById(1L)).thenReturn(Optional.of(product));

		// Act
		Product foundProduct = productService.findProductById(1L);

		// Assert
		assertNotNull(foundProduct);
		assertEquals(1L, foundProduct.getId());
	}

	@Test
	void testFindProductById_NotFound() {
		// Arrange
		when(productRepository.findById(1L)).thenReturn(Optional.empty());

		// Act & Assert
		ProductException exception = assertThrows(ProductException.class, () -> productService.findProductById(1L));
		assertEquals("Product not found with id-1", exception.getMessage());
	}

	@Test
	void testDeleteProduct() throws ProductException {
		// Arrange
		Product product = new Product();
		product.setId(1L);
		when(productRepository.findById(1L)).thenReturn(Optional.of(product));
		doNothing().when(productRepository).delete(product);

		// Act
		String result = productService.deleteProduct(1L);

		// Assert
		assertEquals("Product deleted successfully", result);
		verify(productRepository, times(1)).delete(product);
	}

	@Test
	void testUpdateProduct() throws ProductException {
		// Arrange
		Product existingProduct = new Product();
		existingProduct.setId(1L);

		Product updatedProduct = new Product();
		updatedProduct.setTitle("Updated Product");

		when(productRepository.findById(1L)).thenReturn(Optional.of(existingProduct));
		when(productRepository.save(any(Product.class))).thenReturn(updatedProduct);

		// Act
		Product result = productService.updateProduct(1L, updatedProduct);

		// Assert
		assertNotNull(result);
		assertEquals("Updated Product", result.getTitle());
	}

	@Test
	void testGetProductsBySellerId() {
		// Arrange
		List<Product> productList = new ArrayList<>();
		productList.add(new Product());
		when(productRepository.findBySellerId(1L)).thenReturn(productList);

		// Act
		List<Product> result = productService.getProductsBySellerId(1L);

		// Assert
		assertNotNull(result);
		assertEquals(1, result.size());
	}
}
