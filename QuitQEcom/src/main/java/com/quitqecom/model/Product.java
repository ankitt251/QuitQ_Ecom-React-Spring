package com.quitqecom.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String title;

	private String description;

	private int mrpPrice;

	private int sellingPrice;

	private int discountPercentage;

	private int quantity;

	private String brand;

	private String color;

	@ManyToOne
	private Seller seller;

	private String sizes;

	@Column(name = "image_url")
	private List<String> imageUrl = new ArrayList<>();

//	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
//	private List<Rating> ratings = new ArrayList<>();

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Review> reviews = new ArrayList<>();

	@Column(name = "num_ratings")
	private int numRatings;

	@ManyToOne
	private Category category;

	private LocalDateTime createdAt;

}
