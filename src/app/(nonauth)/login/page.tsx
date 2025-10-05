"use client";

import Logincomponent from "@/components/login/Login-page";
import Chakraprovider from "@/components/Provider/Provider";
import { useEffect } from "react";
import LoginPage from "./pagenew";


export default function Login() {

  useEffect(() => {
   
  },[])

  return (
    <>
      <Chakraprovider>
        <Logincomponent />
        {/* <LoginPage /> */}
      </Chakraprovider>
    </>
  );
}
