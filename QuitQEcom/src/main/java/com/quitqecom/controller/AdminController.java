package com.quitqecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quitqecom.enums.AccountStatus;
import com.quitqecom.exception.UserException;
import com.quitqecom.model.Seller;
import com.quitqecom.service.SellerService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	private SellerService sellerService;

	public ResponseEntity<Seller> updateSellerStatus(@PathVariable Long id, @PathVariable AccountStatus status)
			throws UserException {
		Seller updatedSeller = sellerService.updateSellerAccountStatus(id, status);
		return ResponseEntity.ok(updatedSeller);
	}

}
