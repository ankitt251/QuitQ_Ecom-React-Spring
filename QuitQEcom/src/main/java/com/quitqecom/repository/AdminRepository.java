package com.quitqecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quitqecom.model.User;

@Repository
public interface AdminRepository extends JpaRepository<User, Long> {
	User findByUsername(String username);
}
