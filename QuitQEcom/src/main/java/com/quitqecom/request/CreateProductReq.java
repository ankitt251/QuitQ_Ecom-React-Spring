package com.quitqecom.request;

import java.util.List;

import lombok.Data;

@Data
public class CreateProductReq {

	private String title;

	private String description;

	private int quantity;

	private int mrpPrice;

	private int sellingPrice;

	private int discountPercentage;

	private String color;

	private String brand;

	private List<String> imageUrl;

	private String category;

	private String category2;

	private String category3;

	private String sizes;

}
