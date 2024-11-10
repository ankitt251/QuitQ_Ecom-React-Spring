package com.quitqecom.config;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		String redirectUrl = determineRedirectUrl(authentication);
		response.sendRedirect(redirectUrl);
	}

	private String determineRedirectUrl(Authentication authentication) {
		for (GrantedAuthority authority : authentication.getAuthorities()) {
			String role = authority.getAuthority();
			if ("USER".equalsIgnoreCase(role)) {
				return "/user/home"; // Redirect URL for user
			} else if ("SELLER".equalsIgnoreCase(role)) {
				return "/seller/dashboard"; // Redirect URL for seller
			} else if ("ADMIN".equalsIgnoreCase(role)) {
				return "/admin/dashboard"; // Redirect URL for admin
			}
		}
		throw new IllegalStateException("User has no roles assigned!");
	}
}
