package com.quitqecom.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

	@GetMapping("/user")
	@PreAuthorize("hasAuthority('USER')")
	public String userDashboard() {
		return "Welcome to User Dashboard";
	}

	@GetMapping("/seller")
	@PreAuthorize("hasAuthority('SELLER')")
	public String sellerDashboard() {
		return "Welcome to Seller Dashboard";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasAuthority('ADMIN')")
	public String adminDashboard() {
		return "Welcome to Admin Dashboard";
	}
}
