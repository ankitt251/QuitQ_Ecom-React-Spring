package com.quitqecom.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.quitqecom.config.JwtProvider;
import com.quitqecom.model.USER_ROLE;
import com.quitqecom.model.User;
import com.quitqecom.repository.UserRepository;
import com.quitqecom.request.LoginRequest;
import com.quitqecom.request.SignUpRequest;
import com.quitqecom.response.AuthResponse;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private CustomUserServiceImpl customUserServiceImpl;

	@Override
	public String createUser(SignUpRequest req) {
		User user = userRepository.findByEmail(req.getEmail());

		if (user == null) {
			User createdUser = new User();
			createdUser.setEmail(req.getEmail());
			createdUser.setUsername(req.getUsername());
			createdUser.setRole(USER_ROLE.CUSTOMER);
			createdUser.setPassword(passwordEncoder.encode(req.getPassword()));

			createdUser.setCreatedAt(LocalDateTime.now());

			user = userRepository.save(createdUser);

		}

		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority("ROLE_" + USER_ROLE.CUSTOMER.toString()));

		Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		return jwtProvider.generateToken(authentication);
	}

	@Override
	public AuthResponse loginUser(LoginRequest req) {
		String email = req.getEmail();
		String password = req.getPassword();

		Authentication authentication = authenticate(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtProvider.generateToken(authentication);

		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Login successful!");

		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		String roleName = authorities.iterator().next().getAuthority();

		authResponse.setRole(USER_ROLE.valueOf(roleName));

		return authResponse;
	}

	private Authentication authenticate(String email, String password) {
		UserDetails userDetails = customUserServiceImpl.loadUserByUsername(email);
		if (userDetails == null) {
			throw new BadCredentialsException("User not found");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid Password.....");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

	}

}
