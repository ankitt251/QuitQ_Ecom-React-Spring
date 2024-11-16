package com.quitqecom.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quitqecom.model.Product;
import com.quitqecom.model.User;
import com.quitqecom.model.Wishlist;
import com.quitqecom.repository.WishListRepository;
import com.quitqecom.service.WishListService;

@Service
public class WishListServiceImpl implements WishListService {

	@Autowired
	private WishListRepository wishListRepository;

	@Override
	public Wishlist createWishList(User user) {
		Wishlist wishlist = new Wishlist();
		wishlist.setUser(user);
		return wishListRepository.save(wishlist);
	}

	@Override
	public Wishlist getWishListByUserId(User user) {
		Wishlist wishlist = wishListRepository.findByUserId(user.getId());
		if (wishlist == null) {
			wishlist = createWishList(user);
		}
		return wishlist;
	}

	@Override
	public Wishlist addProductToWishList(User user, Product product) {
		Wishlist wishlist = getWishListByUserId(user);

		if (wishlist.getProducts().contains(product)) {
			wishlist.getProducts().remove(product);
		} else
			wishlist.getProducts().add(product);

		return wishListRepository.save(wishlist);
	}

}
