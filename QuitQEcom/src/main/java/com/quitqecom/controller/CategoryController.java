package com.quitqecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quitqecom.model.Category;
import com.quitqecom.service.CategoryService;

@RestController
@RequestMapping("/api/category")
@PreAuthorize("hasRole('ADMIN') or hasRole('SELLER')")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@PostMapping("/create")
	public ResponseEntity<List<Category>> createCategories(@RequestBody List<Category> categories) {
		List<Category> createdCategories = categoryService.createCategory(categories);
		return ResponseEntity.ok(createdCategories);
	}

	@PatchMapping("/update/{id}")
	public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category)
			throws Exception {
		Category updatedCategory = categoryService.updateCategory(category, id);
		return ResponseEntity.ok(updatedCategory);
	}

	@GetMapping
	public ResponseEntity<List<Category>> getAllCategories() {
		List<Category> categories = categoryService.getAllCategories();
		return ResponseEntity.ok(categories);
	}

}
