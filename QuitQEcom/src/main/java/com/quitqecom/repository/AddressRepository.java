package com.quitqecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quitqecom.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
