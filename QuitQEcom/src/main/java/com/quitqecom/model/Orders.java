package com.quitqecom.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.quitqecom.enums.OrderStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
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
public class Orders {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String orderId;

	@ManyToOne
	private User user;

	private Long sellerId;

	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	private List<OrderItem> orderItems = new ArrayList<>();

	private LocalDateTime orderDate = LocalDateTime.now();

	private LocalDateTime deliveryDate = orderDate.plusDays(7);

	@ManyToOne
	private Address shippingAddress;

	@Embedded
	private PaymentDetails paymentDetails = new PaymentDetails();

	private double totalMrpPrice;

	private Integer totalSellingPrice;

	private OrderStatus orderStatus;

	private Integer discount;

	private int totalItem;

	private LocalDateTime createdAt;
}
