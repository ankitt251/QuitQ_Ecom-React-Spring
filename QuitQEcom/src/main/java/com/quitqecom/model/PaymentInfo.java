package com.quitqecom.model;

import jakarta.persistence.Column;

public class PaymentInfo {

	@Column(name = "cardholder_name")
	private String cardHolderName;

	@Column(name = "card_number")
	private String cardNumber;

	@Column(name = "expiry_date")
	private String expiryDate;

	@Column(name = "cvv")
	private String cvv;
}
