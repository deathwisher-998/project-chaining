"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import ProductTable from "./refferal-components/adminuserTable";
import { Apploader } from "@/components/loader/loading";
import { useEffect, useRef, useState } from "react";
import Chakraprovider from "@/components/Provider/Provider";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { addRefferal, adminUsers } from "@/helpers/services/users";
import Adminusertable from "./refferal-components/adminuserTable";
import Adminnavbar from "../../../admin-navbar/adminNavbar";

export default function Productpage() {
  const [loading, setloading] = useState(1);
  const [isOpen, setisOpen] = useState(false);
  const navigation = useRouter();
  const [adminUserlist, setadminUserlist] = useState<[]>([]);
  const [refferralCodevalue, setrefferralCodevalue] = useState<string>("");
  const [referralsubmit, setreferralsubmit] = useState(false);
  const userIddata = useRef(null);

  useEffect(() => {
    getAdminuser();
  }, []);

  async function getAdminuser() {
    try {
      setloading((e) => 1);
      const response: any = await adminUsers().then((res) => res);
      if (response.succeeded && response.data?.length > 0) {
        setadminUserlist((e: any) => response.data);
      } else {
        setadminUserlist((e: any) => []);
      }
      setloading((e) => 0);
    } catch (error) {
      setloading((e) => 0);
      setadminUserlist((e: any) => []);
    }
  }

  const addRefferalcode = (data: any, flag: number) => {
    if (flag == 1) {
      userIddata.current = data;
      setisOpen((e) => true);
      setrefferralCodevalue((e) => "");
    } else if (flag == 2) {
      if (refferralCodevalue) {
        addReferenceuser(userIddata.current);
      } else {
        setreferralsubmit((e) => true);
      }
    } else if (flag == 3) {
      userIddata.current = null;
      setisOpen((e) => false);
      setrefferralCodevalue((e) => "");
    }
  };

  async function addReferenceuser(data: any) {
    try {
      if (data) {
        let payload = {
          id: data.id,
          referralCode: refferralCodevalue,
        };
        setloading((e) => 1);
        const response = await addRefferal(payload).then((res: any) => res);
        console.log("response", response);
        if (response) {
          addRefferalcode("", 3);
          getAdminuser();
          toast.success("Refferral code added successfully");
        }
        setloading((e) => 0);
      }
    } catch (error) {
      setloading((e) => 0);
    }
  }

  return (
    <>
      <ToastContainer />
      <Apploader Loadingstate={loading}>
        <div className="container mx-auto">
          <Adminnavbar />

          <div className="mt-5">
            <Adminusertable
              userlist={adminUserlist}
              addRefferalcode={addRefferalcode}
            />
          </div>
        </div>
      </Apploader>

      <Dialog open={isOpen} dismiss={false} size="sm">
        <Apploader Loadingstate={loading}>
          <Chakraprovider>
            <div className="p-5">
              <div>
                <h2 className="text-lg font-semibold text-black">
                  Add User Refferral Code
                </h2>
              </div>
              <div className="mt-5 mb-5">
                <Input
                  type="text"
                  placeholder=""
                  variant="outlined"
                  label="Refferal Code"
                  maxLength={50}
                  value={refferralCodevalue}
                  onChange={(e) => [
                    setrefferralCodevalue(e.target.value),
                    setreferralsubmit(false),
                  ]}
                />
                {referralsubmit && !refferralCodevalue && (
                  <div>
                    <p className="text-red-900 text-sm">
                      Please enter refferral code
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <Button
                  variant="filled"
                  size="sm"
                  color="red"
                  className="mr-5"
                  onClick={() => addRefferalcode("", 3)}
                >
                  {" "}
                  Cancel
                </Button>
                <Button
                  variant="filled"
                  size="sm"
                  onClick={() => addRefferalcode("", 2)}
                >
                  {" "}
                  Submit
                </Button>
              </div>
            </div>
          </Chakraprovider>
        </Apploader>
      </Dialog>
    </>
  );
}
