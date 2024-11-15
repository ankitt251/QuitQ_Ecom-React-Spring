package com.quitqecom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quitqecom.enums.AccountStatus;
import com.quitqecom.model.Seller;

public interface SellerRepository extends JpaRepository<Seller, Long> {
	Seller findByEmail(String email);

	List<Seller> findByAccountStatus(AccountStatus status);

}
