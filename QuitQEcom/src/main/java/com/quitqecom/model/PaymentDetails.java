package com.quitqecom.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDetails {

	private String paymentMethod;

	private String paymentStatus;

	private String paymentId;

	private String razorpayPaymentLinkId;

	private String razorpayPaymentLinkReferenceId;

	private String razorpayPaymentLinkStatus;

	private String razorpayPaymentId;

}
