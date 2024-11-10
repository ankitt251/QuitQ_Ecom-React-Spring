package com.quitqecom.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerReport {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	private Seller seller;

	private Long totalEarnings = 0L;

	private Long totalSales = 0L;

	private Long totalRefunds = 0L;

	private Long totalTax = 0L;

	private Long netEarnings = 0L;

	private Integer totalOrders = 0;

	private Integer cancelledOrders = 0;

}