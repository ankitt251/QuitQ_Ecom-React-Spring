package com.quitqecom.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quitqecom.model.Seller;
import com.quitqecom.model.SellerReport;
import com.quitqecom.repository.SellerReportRepository;
import com.quitqecom.service.SellerReportService;

@Service
public class SellerReportServiceImpl implements SellerReportService {

	@Autowired
	private SellerReportRepository sellerReportRepository;

	@Override
	public SellerReport getSellerReport(Seller seller) {

		SellerReport sr = sellerReportRepository.findBySellerId(seller);

		if (sr == null) {
			SellerReport newReport = new SellerReport();
			newReport.setSeller(seller);
			return sellerReportRepository.save(newReport);
		}

		return sr;
	}

	@Override
	public SellerReport updateSellerReport(SellerReport sellerReport) {

		return sellerReportRepository.save(sellerReport);
	}

}
