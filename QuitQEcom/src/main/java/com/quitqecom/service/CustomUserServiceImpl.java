package com.quitqecom.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.quitqecom.model.Seller;
import com.quitqecom.model.USER_ROLE;
import com.quitqecom.model.User;
import com.quitqecom.repository.SellerRepository;
import com.quitqecom.repository.UserRepository;

@Service
public class CustomUserServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private SellerRepository sellerRepository;

	private static final String SELLER_PREFIX = "seller_";

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		if (username.startsWith(SELLER_PREFIX)) {
			String actualUsername = username.substring(SELLER_PREFIX.length());
			Seller seller = sellerRepository.findByEmail(actualUsername);

			if (seller != null) {
				return buildUserDetails(seller.getEmail(), seller.getPassword(), seller.getRole());
			}

		} else {
			User user = userRepository.findByEmail(username);

			if (user != null) {
				return buildUserDetails(user.getEmail(), user.getPassword(), user.getRole());
			}
		}

		throw new UsernameNotFoundException("User not found with username: " + username);
	}

	private UserDetails buildUserDetails(String email, String password, USER_ROLE role) {
		if (role == null) {
			role = USER_ROLE.CUSTOMER;
		}
		List<GrantedAuthority> authorityList = new ArrayList<>();
		authorityList.add(new SimpleGrantedAuthority(role.toString()));
		return new org.springframework.security.core.userdetails.User(email, password, authorityList);

	}

}
