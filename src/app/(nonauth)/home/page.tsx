// components
import { Navbar, Footer } from "@/components";

import ExploreCourses from "@/components/pages-utilities/explore-courses";
import React from "react";
import Carousel from "@/components/pages-utilities/hero-carousel";

function Campaign() {
  return (
    <>
      <Navbar />
      <Carousel />
      <div>
        <ExploreCourses />
      </div>
      <Footer />
    </>
  );
}

export default React.memo(Campaign);
