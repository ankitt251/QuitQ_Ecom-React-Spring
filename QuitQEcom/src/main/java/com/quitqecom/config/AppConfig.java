package com.quitqecom.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
public class AppConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(authz -> authz.requestMatchers("/api/user/**").permitAll()
						.requestMatchers("/api/admin/**").hasRole("ADMIN").requestMatchers("/api/seller/**")
						.hasRole("SELLER").requestMatchers("/api/customer/**").hasRole("CUSTOMER")
						.requestMatchers("/api/products/*/reviews").permitAll().anyRequest().permitAll())
				.addFilterBefore(new JwtValidator(), BasicAuthenticationFilter.class).csrf(csrf -> csrf.disable())
				.logout(logout -> logout.logoutUrl("/auth/logout").permitAll());
		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		// Using BCryptPasswordEncoder for password encoding
		return new BCryptPasswordEncoder();
	}
}
