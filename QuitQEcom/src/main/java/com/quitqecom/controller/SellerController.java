package com.quitqecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quitqecom.config.JwtProvider;
import com.quitqecom.enums.AccountStatus;
import com.quitqecom.exception.UserException;
import com.quitqecom.model.Seller;
import com.quitqecom.request.LoginRequest;
import com.quitqecom.response.AuthResponse;
import com.quitqecom.service.AuthService;
import com.quitqecom.service.SellerService;

@RestController
@RequestMapping("/sellers")
public class SellerController {

	@Autowired
	private SellerService sellerService;

	@Autowired
	private AuthService authService;

	@Autowired
	private JwtProvider jwtProvider;

	@PostMapping("/loginSeller")
	public ResponseEntity<AuthResponse> loginSeller(@RequestBody LoginRequest req) throws UserException {

		String email = req.getEmail();
		String password = req.getPassword();
		req.setEmail("seller_" + email);
		AuthResponse authResponse = authService.loginUser(req);
		return ResponseEntity.ok(authResponse);

	}

	@PostMapping("/create")
	public ResponseEntity<Seller> createSeller(@RequestBody Seller seller) throws UserException {
		Seller savedSeller = sellerService.createSeller(seller);
		return new ResponseEntity<>(savedSeller, HttpStatus.CREATED);
	}

	@GetMapping("/profile")
	public ResponseEntity<Seller> getSellerProfile(@RequestHeader("Authorization") String jwt) throws UserException {
		Seller seller = sellerService.getSellerProfile(jwt);
		return new ResponseEntity<>(seller, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Seller> getSellerById(@PathVariable Long id) throws UserException {
		Seller seller = sellerService.getSellerById(id);
		return new ResponseEntity<>(seller, HttpStatus.OK);
	}

//	public ResponseEntity<SellerReport> getSellerReport(@RequestHeader("Authorization") String jwt)
//			throws UserException {
//		String email = jwtProvider.getEmailFromToken(jwt);
//		Seller seller = sellerService.getSellerByEmail(email);
//		SellerReport sellerReport = sellerService.getSellerReport(seller);
//		return new ResponseEntity<>(sellerReport, HttpStatus.OK);
//	}

	@GetMapping
	public ResponseEntity<List<Seller>> getAllSellers(@RequestParam("status") AccountStatus status)
			throws UserException {
		List<Seller> allSellers = sellerService.getAllSellers(status);
		return new ResponseEntity<>(allSellers, HttpStatus.OK);
	}

	@PatchMapping
	public ResponseEntity<Seller> updateSeller(@RequestHeader("Authorization") String jwt, @RequestBody Seller seller)
			throws UserException {
		Seller profile = sellerService.getSellerProfile(jwt);
		Seller updatedSeller = sellerService.updateSeller(profile.getId(), seller);
		return new ResponseEntity<>(updatedSeller, HttpStatus.OK);
	}

	public ResponseEntity<Void> deleteSeller(@PathVariable Long id) throws UserException {
		sellerService.deleteSeller(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
