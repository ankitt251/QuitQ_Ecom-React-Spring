package com.quitqecom.service;

import java.util.List;

import com.quitqecom.enums.AccountStatus;
import com.quitqecom.exception.UserException;
import com.quitqecom.model.Seller;

public interface SellerService {

	Seller getSellerProfile(String jwt) throws UserException;

	Seller createSeller(Seller seller) throws UserException;

	Seller getSellerByEmail(String email) throws UserException;

	Seller getSellerById(Long id) throws UserException;

	List<Seller> getAllSellers(AccountStatus status) throws UserException;

	Seller updateSeller(Long id, Seller seller) throws UserException;

	void deleteSeller(Long id) throws UserException;

	// Seller verifyEmail(String email) throws UserException;

	Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws UserException;

}
