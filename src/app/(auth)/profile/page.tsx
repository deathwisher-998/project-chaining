import ProfilePage from "@/components/profile/profilepage";
import Chakraprovider from "@/components/Provider/Provider";

export default function Useraccount() {
  return (
    <>
      <Chakraprovider>
        <ProfilePage routeid={null} />
      </Chakraprovider>
    </>
  );
}
