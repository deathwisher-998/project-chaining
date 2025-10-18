import Navbar from "@/components/navbar";
import Footer from "../footer";
import { ReactNode } from "react";

function Authlayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Authlayout;
