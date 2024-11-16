package com.quitqecom.model;

import com.quitqecom.enums.AccountStatus;
import com.quitqecom.enums.USER_ROLE;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
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
public class Seller {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String sellerName;

	@Column(unique = true, nullable = false)
	private String email;

	private String password;

	private String mobile;

	@Embedded
	private BusinessDetails businessDetails = new BusinessDetails();

	@OneToOne(cascade = CascadeType.ALL)
	private Address pickupAddress = new Address();

	private USER_ROLE role = USER_ROLE.SELLER;

	private AccountStatus accountStatus = AccountStatus.ACTIVE;

}
