package com.quitqecom.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quitqecom.model.Category;
import com.quitqecom.repository.CategoryRepository;
import com.quitqecom.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public List<Category> createCategory(List<Category> category) {
		return categoryRepository.saveAll(category);
	}

	@Override
	public Category updateCategory(Category category, Long id) throws Exception {

		Category existingCategory = categoryRepository.findById(id)
				.orElseThrow(() -> new Exception("Category not found"));

		if (category.getImage() != null) {
			existingCategory.setImage(category.getImage());
		}
		if (category.getCategoryId() != null) {
			existingCategory.setName(category.getName());
		}

		return categoryRepository.save(existingCategory);
	}

	@Override
	public List<Category> getAllCategories() {
		return categoryRepository.findAll();
	}

}
