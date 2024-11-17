package com.quitqecom.serviceimpl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.quitqecom.enums.USER_ROLE;
import com.quitqecom.model.User;
import com.quitqecom.repository.UserRepository;

@Component
public class AdminInitializer implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public void run(String... args) {
		String adminEmail = "admin@example.com";
		String adminPassword = "admin123";

		if (userRepository.findByEmail(adminEmail) == null) {
			User admin = new User();
			admin.setFullName("Admin User");
			admin.setUsername("admin");
			admin.setEmail(adminEmail);
			admin.setPassword(passwordEncoder.encode(adminPassword));
			admin.setRole(USER_ROLE.ROLE_ADMIN);
			admin.setMobile("+1234567890");
			admin.setCreatedAt(LocalDateTime.now());

			userRepository.save(admin);
			System.out.println("Default admin created.");
		}
	}
}
