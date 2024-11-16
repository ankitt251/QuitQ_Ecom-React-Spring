package com.quitqecom.service;

import com.quitqecom.model.Seller;
import com.quitqecom.model.SellerReport;

public interface SellerReportService {

	SellerReport getSellerReport(Seller seller);

	SellerReport updateSellerReport(SellerReport sellerReport);

}
