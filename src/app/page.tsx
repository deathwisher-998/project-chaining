// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "@/components/pages-utilities/hero";
import ExploreCourses from "@/components/pages-utilities/explore-courses";
import React from "react";

function Campaign() {
  return (
    <>
      <Navbar />
      <Hero />
      <ExploreCourses />
      <Footer />
    </>
  );
}

export default React.memo(Campaign);
