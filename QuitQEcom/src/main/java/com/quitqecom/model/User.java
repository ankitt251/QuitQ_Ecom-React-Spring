package com.quitqecom.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.quitqecom.enums.AccountStatus;
import com.quitqecom.enums.USER_ROLE;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Pattern(regexp = "^[0-9]{5}$", message = "Employee postal code must be a 5-digit number.")

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String fullName;

	private String username;

	private String email;

	private String password;

	private USER_ROLE role = USER_ROLE.ROLE_CUSTOMER;

	private String mobile;

	private AccountStatus accountStatus = AccountStatus.ACTIVE;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Address> address = new ArrayList<>();

	@Embedded
	@ElementCollection
	@CollectionTable(name = "payment_info", joinColumns = @JoinColumn(name = "user_id"))
	private List<PaymentInfo> paymentInfo = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Rating> ratings = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Review> reviews = new ArrayList<>();

	private LocalDateTime createdAt;
}
