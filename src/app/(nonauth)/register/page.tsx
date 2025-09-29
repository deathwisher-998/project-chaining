import Chakraprovider from "@/components/Provider/Provider";
import Registercomponent from "@/components/Register/register";

export default function Register() {
  return (
    <>
      <Chakraprovider>
            <Registercomponent />
      </Chakraprovider>
    </>
  );
}
