package com.quitqecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quitqecom.model.Seller;
import com.quitqecom.model.SellerReport;

public interface SellerReportRepository extends JpaRepository<SellerReport, Long> {

	SellerReport findBySellerId(Seller seller);

}
