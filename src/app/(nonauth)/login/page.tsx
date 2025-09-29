import Logincomponent from "@/components/login/Login-page";
import Chakraprovider from "@/components/Provider/Provider";

export default function Login() {
  return (
    <>
      <Chakraprovider>
        <Logincomponent />
      </Chakraprovider>
    </>
  );
}
