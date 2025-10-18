"use client";

import Adminlogincomponent from "@/components/admin/components/login/login";
import Chakraprovider from "@/components/Provider/Provider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
function Adminpage() {
  const navigate = useRouter();

  useEffect(() => {
    const admintoken = localStorage.getItem("admintoken");
    const adminId = localStorage.getItem("adminId");

    if (admintoken && adminId) {
      navigate.replace("/admin/33/samadmin2xj25/product");
    }
  }, []);

  return (
    <>
      <React.Fragment>
        <Chakraprovider>
          <Adminlogincomponent />
        </Chakraprovider>
      </React.Fragment>
    </>
  );
}

export default React.memo(Adminpage);
