import ProfilePage from "@/components/profile/profilepage";
import Chakraprovider from "@/components/Provider/Provider";
import React from "react";

function Useraccount() {
  return (
    <>
      <Chakraprovider>
        <ProfilePage routeid={null} />
      </Chakraprovider>
    </>
  );
}


export default React.memo(Useraccount)