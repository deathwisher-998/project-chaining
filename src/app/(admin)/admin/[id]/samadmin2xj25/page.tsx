import Adminlogincomponent from "@/components/admin/components/login/login";
import Chakraprovider from "@/components/Provider/Provider";
import React from "react";
function Adminpage() {
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
