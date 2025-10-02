
// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "@/components/pages-utilities/hero";
import OutImpressiveStats from "@/components/pages-utilities/out-impressive-stats";
import CoursesCategories from "@/components/pages-utilities/courses-categories";
import ExploreCourses from "@/components/pages-utilities/explore-courses";
import Testimonial from "@/components/pages-utilities/testimonial";
import Events from "@/components/pages-utilities/events";
import StudentsFeedback from "@/components/pages-utilities/students-feedback";
import TrustedCompany from "@/components/pages-utilities/trusted-companies";
import { useEffect } from "react";

export default function Campaign() {

  return (
    <>
      <Navbar />
      <Hero />
      <ExploreCourses />
      <Footer />
    </>
  );
}
