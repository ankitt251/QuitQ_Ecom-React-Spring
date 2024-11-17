package com.quitqecom.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.quitqecom.config.JwtProvider;
import com.quitqecom.enums.AccountStatus;
import com.quitqecom.enums.USER_ROLE;
import com.quitqecom.exception.UserException;
import com.quitqecom.model.Address;
import com.quitqecom.model.Seller;
import com.quitqecom.repository.AddressRepository;
import com.quitqecom.repository.SellerRepository;
import com.quitqecom.service.SellerService;

@Service
public class SellerServiceImpl implements SellerService {

	@Autowired
	private SellerRepository sellerRepository;

	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AddressRepository addressRepository;

	@Override
	public Seller getSellerProfile(String jwt) throws UserException {

		String email = jwtProvider.getEmailFromToken(jwt);

		return this.getSellerByEmail(email);
	}

	@Override
	public Seller createSeller(Seller seller) throws UserException {
		Seller sellerExist = sellerRepository.findByEmail(seller.getEmail());
		if (sellerExist != null) {
			throw new UserException("Seller already exists with email-" + seller.getEmail());
		}
		Address saveAddress = addressRepository.save(seller.getPickupAddress());

		Seller newSeller = new Seller();
		newSeller.setEmail(seller.getEmail());
		newSeller.setPassword(passwordEncoder.encode(seller.getPassword()));
		newSeller.setSellerName(seller.getSellerName());
		newSeller.setPickupAddress(saveAddress);
		newSeller.setRole(USER_ROLE.ROLE_SELLER);
		newSeller.setBusinessDetails(seller.getBusinessDetails());
		newSeller.setMobile(seller.getMobile());

		return sellerRepository.save(newSeller);
	}

	@Override
	public Seller getSellerByEmail(String email) throws UserException {
		Seller seller = sellerRepository.findByEmail(email);

		if (seller == null) {
			throw new UserException("Seller already exists with email-" + email);
		}
		return seller;
	}

	@Override
	public Seller getSellerById(Long id) throws UserException {

		return sellerRepository.findById(id).orElseThrow(() -> new UserException("Seller not found with id-" + id));

	}

	@Override
	public List<Seller> getAllSellersByStatus(AccountStatus status) throws UserException {

		return sellerRepository.findByAccountStatus(status);
	}

	@Override
	public Seller updateSeller(Long id, Seller seller) throws UserException {
		Seller existingSeller = sellerRepository.findById(id)
				.orElseThrow(() -> new UserException("Seller not found with id-" + id));

		// Only update fields that are not null in the provided seller object
		if (seller.getSellerName() != null) {
			existingSeller.setSellerName(seller.getSellerName());
		}
		if (seller.getBusinessDetails() != null && seller.getBusinessDetails().getBusinessName() != null) {
			existingSeller.getBusinessDetails().setBusinessName(seller.getBusinessDetails().getBusinessName());
		}
		if (seller.getPickupAddress() != null) {
			existingSeller.setPickupAddress(seller.getPickupAddress());
		}
		if (seller.getMobile() != null) {
			existingSeller.setMobile(seller.getMobile());
		}
		if (seller.getEmail() != null) {
			existingSeller.setEmail(seller.getEmail());
		}

		if (seller.getPickupAddress() != null && seller.getPickupAddress().getStreetAddress() != null
				&& seller.getPickupAddress().getCity() != null && seller.getPickupAddress().getState() != null
				&& seller.getMobile() != null) {

			existingSeller.getPickupAddress().setStreetAddress(seller.getPickupAddress().getStreetAddress());
			existingSeller.getPickupAddress().setCity(seller.getPickupAddress().getCity());
			existingSeller.getPickupAddress().setState(seller.getPickupAddress().getState());
			existingSeller.getPickupAddress().setMobile(seller.getPickupAddress().getMobile());
		}

		return sellerRepository.save(existingSeller);
	}

	@Override
	public void deleteSeller(Long id) throws UserException {
		Seller seller = getSellerById(id);

		sellerRepository.delete(seller);

	}

	@Override
	public Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws UserException {
		Seller seller = getSellerById(sellerId);
		seller.setAccountStatus(status);
		return sellerRepository.save(seller);
	}

	@Override
	public List<Seller> getAllSellers() {
		return sellerRepository.findAll();
	}

}
