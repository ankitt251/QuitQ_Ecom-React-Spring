// import React from "react";
// import MainCarousel from "../../components/HomeCarousel/MainCarousel";
// import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";

// const HomePage = () => {
//   return (
//     <div>
//       <MainCarousel />
//       <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
//         <HomeSectionCarousel/>
//         <HomeSectionCarousel/>
//         <HomeSectionCarousel/>
//         <HomeSectionCarousel/>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React from "react";
import MainCarousel from "../../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import ElectricCategory from "./CategoryGrid/ElectricCategory";
import Deal from "./CategoryGrid/Deal/Deal";
import { Button, Divider } from "@mui/material";
import { mens_kurta } from "../../../data/Men/mens_kurta";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-screen">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('../homeebg.jpg')`, // Replace with your image path
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>

        {/* Text Box */}
        <div className="relative z-10 flex justify-end items-center h-full pr-[20%] pt-15">
          <div className="bg-[#FFF3E3] rounded-lg p-8 md:p-12 max-w-lg text-center">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              New Arrival
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#9C6E39] mb-4">
              Discover Our New Collection
            </h1>
            <p className="text-gray-700 mb-6">
              Transform your home this Diwali with our exquisite new
              collections! From vibrant decor pieces to timeless home
              essentials, find everything you need to create a space filled with
              warmth, light, and celebration.
            </p>
            <button className="bg-[#9C6E39] text-white font-medium py-3 px-6 rounded shadow hover:bg-[#8A5C34]">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Carousel */}
      {/* <MainCarousel /> */}

      <div className="space-y-5 lg:space-y-10 relative">
        <ElectricCategory />
      </div>

      <div>
        <Deal />
      </div>

      {/* Section with Carousels */}
      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
        <HomeSectionCarousel data={mens_kurta} />
        <HomeSectionCarousel data={mens_kurta} />
      </div>

      <section className="relative h-[450px] lg:h-[550px]">
        {/* Background Image */}
        <img
          className="h-full w-full object-cover"
          src="../imgs/seller_home.jpg"
          alt="Seller Home"
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start px-6 lg:px-20">
          <div className="text-white space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">
              Sell Your Products
            </h1>
            <p className="text-lg md:text-2xl">
              Join <span className="text-custom font-serif italic">QuitQ</span>{" "}
              Today
            </p>

            {/* Button */}
            <div className="pt-6">
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#FFF3E3",
                  color: "#000",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  "&:hover": {
                    backgroundColor: "#FFE3C5",
                  },
                }}
              >
                Become a Seller
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
