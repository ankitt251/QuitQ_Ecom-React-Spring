package com.quitqecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quitqecom.enums.AccountStatus;
import com.quitqecom.exception.UserException;
import com.quitqecom.model.Seller;
import com.quitqecom.model.User;
import com.quitqecom.service.SellerService;
import com.quitqecom.service.UserService;
import com.quitqecom.serviceimpl.AdminServiceImpl;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

	@Autowired
	private SellerService sellerService;

	@Autowired
	private AdminServiceImpl adminService;

	@Autowired
	private UserService userService;

	@PatchMapping("/seller/{id}/{status}")
	public ResponseEntity<Seller> updateSellerStatus(@PathVariable Long id, @PathVariable AccountStatus status)
			throws UserException {
		Seller updatedSeller = sellerService.updateSellerAccountStatus(id, status);
		return ResponseEntity.ok(updatedSeller);
	}

	@PatchMapping("/user/{id}/{status}")
	public ResponseEntity<User> updateUserStatus(@PathVariable Long id, @PathVariable AccountStatus status)
			throws UserException {
		User updatedUser = userService.updateUserAccountStatus(id, status);
		return ResponseEntity.ok(updatedUser);
	}

	// Get All Sellers
	@GetMapping("/sellers")
	public ResponseEntity<List<Seller>> getAllSellers() {
		List<Seller> sellers = sellerService.getAllSellers();
		return ResponseEntity.ok(sellers);
	}

	// Get All Users
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}

	@GetMapping("/profile")
	public ResponseEntity<User> getAdminProfile(@RequestHeader("Authorization") String jwt) throws UserException {
		User adminProfile = adminService.findAdminProfileByJwt(jwt);
		return ResponseEntity.ok(adminProfile);
	}

}
