package com.quitqecom.serviceimpl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.quitqecom.exception.ProductException;
import com.quitqecom.model.Category;
import com.quitqecom.model.Product;
import com.quitqecom.model.Seller;
import com.quitqecom.repository.CategoryRepository;
import com.quitqecom.repository.ProductRepository;
import com.quitqecom.request.CreateProductReq;
import com.quitqecom.service.ProductService;
import com.quitqecom.service.SellerService;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private SellerService sellerService;

	@Autowired
	private ProductRepository productRepository;

	@Override
	public Product createProduct(CreateProductReq req, Seller seller) {

		Category category1 = categoryRepository.findByCategoryId(req.getCategory());

		if (category1 == null) {
			Category category = new Category();
			category.setCategoryId(req.getCategory());
			category.setLevel(1);
			category1 = categoryRepository.save(category);
		}
		Category category2 = categoryRepository.findByCategoryId(req.getCategory2());

		if (category2 == null) {
			Category category = new Category();
			category.setCategoryId(req.getCategory2());
			category.setLevel(2);
			category.setParentCategory(category1);
			category2 = categoryRepository.save(category);
		}

		Category category3 = categoryRepository.findByCategoryId(req.getCategory3());

		if (category3 == null) {
			Category category = new Category();
			category.setCategoryId(req.getCategory3());
			category.setLevel(3);
			category.setParentCategory(category2);
			category3 = categoryRepository.save(category);
		}

		int discountPercentage = calculateDiscountPercentage(req.getMrpPrice(), req.getSellingPrice());

		Product product = new Product();
		product.setSeller(seller);
		product.setCategory(category3);
		product.setDescription(req.getDescription());
		product.setCreatedAt(LocalDateTime.now());
		product.setTitle(req.getTitle());
		product.setColor(req.getColor());
		product.setSellingPrice(req.getSellingPrice());
		product.setImageUrl(req.getImageUrl());
		product.setMrpPrice(req.getMrpPrice());
		product.setSizes(req.getSizes());
		product.setQuantity(req.getQuantity());
		product.setBrand(req.getBrand());
		product.setDiscountPercentage(discountPercentage);

		return productRepository.save(product);
	}

	private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
		if (mrpPrice <= 0 || sellingPrice <= 0) {
			throw new IllegalArgumentException("Actual price must be greater than 0");
		}

		double discount = mrpPrice - sellingPrice;
		double discountPercentage = (discount / mrpPrice) * 100;

		return (int) discountPercentage;
	}

	@Override
	public Product findProductById(Long productId) throws ProductException {

		return productRepository.findById(productId)
				.orElseThrow(() -> new ProductException("Product not found with id-" + productId));
	}

	@Override
	public String deleteProduct(Long productId) throws ProductException {
		Product product = findProductById(productId);
		if (product == null) {
			throw new ProductException("Product not found with id: " + productId);
		}
		productRepository.delete(product);
		return "Product deleted successfully";
	}

	@Override
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	@Override
	public Product updateProduct(Long productId, Product product) throws ProductException {
		findProductById(productId);
		product.setId(productId);
		return productRepository.save(product);
	}

	@Override
	public Page<Product> getAllProducts(String category, String brand, String color, String sizes, Integer minPrice,
			Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber) {

		Specification<Product> spec = (root, query, criteriaBuilder) -> {
			List<Predicate> predicates = new ArrayList<>();

			if (category != null) {
				Join<Product, Category> categoryJoin = root.join("category");
				predicates.add(criteriaBuilder.equal(categoryJoin.get("categoryId"), category));
			}
			if (color != null && !color.isEmpty()) {
				predicates.add(criteriaBuilder.equal(root.get("color"), color));
			}

			if (sizes != null && !sizes.isEmpty()) {
				predicates.add(criteriaBuilder.equal(root.get("sizes"), sizes));
			}

			if (minPrice != null) {
				predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("sellingPrice"), minPrice));
			}

			if (maxPrice != null) {
				predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("sellingPrice"), maxPrice));
			}

			if (brand != null) {
				predicates.add(criteriaBuilder.equal(root.get("brand"), brand));
			}
			if (stock != null) {
				predicates.add(criteriaBuilder.equal(root.get("stock"), stock));
			}
			if (minDiscount != null) {
				predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("discountPercentage"), minDiscount));
			}

			return criteriaBuilder.and(predicates.toArray(new Predicate[0]));

		};

		Pageable pageable;
		if (sort != null && !sort.isEmpty()) {
			switch (sort) {
			case "price_low":
				pageable = PageRequest.of(pageNumber != null ? pageNumber : 0, 10, Sort.by("sellingPrice").ascending());
				break;

			case "price_high":
				pageable = PageRequest.of(pageNumber != null ? pageNumber : 0, 10,
						Sort.by("sellingPrice").descending());
				break;

			default:
				pageable = PageRequest.of(pageNumber != null ? pageNumber : 0, 10);
				break;
			}
		} else {
			pageable = PageRequest.of(pageNumber != null ? pageNumber : 0, 10);
		}

		return productRepository.findAll(spec, pageable);
	}

	@Override
	public List<Product> getProductsBySellerId(Long sellerId) {

		return productRepository.findBySellerId(sellerId);
	}

}