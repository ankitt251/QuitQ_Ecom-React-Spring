package com.quitqecom.service;

import java.util.List;

import com.quitqecom.model.Category;

public interface CategoryService {

	List<Category> createCategory(List<Category> category);

	Category updateCategory(Category category, Long id) throws Exception;

	List<Category> getAllCategories();
}
