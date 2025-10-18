"use client";

import { useEffect, useRef, useState } from "react";
import { Apploader } from "../loader/loading";
import {
  userDetails,
  userLevel,
  userAddress,
  createAddress,
  userAddressByid,
} from "@/helpers/services/users";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import AddressSection from "./addressection";
import Createaddress from "./createAddress";
import { ToastContainer, toast } from "react-toastify";
import { Orderlist } from "@/helpers/services/order";
import Orderlists from "./orderList";
import {
  CheckBadgeIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import Sidemenudata from "@/components/profile/sidemenujson/sidemenu.json";
import { useRouter } from "next/navigation";

export default function ProfilePage({ routeid }: { routeid: any }) {
  const [loading, setloading] = useState(0);
  const [userDeatils, setuserDeatils] = useState<any>(null);
  const teamReportRef = useRef<any>(null);
  const [teamReport, setteamReport] = useState(null);
  const [activeLevel, setactiveLevel] = useState(1);
  const [userAddressDetail, setuserAddressDetail] = useState<any>(null);
  const [isOpen, setisOpen] = useState(false);
  const [formSubmit, setformSubmit] = useState(0);
  const [orderList, setorderList] = useState<any>(null);
  const Sidemenu = Sidemenudata;
  const [activeMenu, setactiveMenu] = useState(1);
  const navigation = useRouter();

  const [profile, setProfile] = useState({
    username: "Jatin Arora",
    email: "jatin@example.com",
    location: "New Delhi, India",
    bio: "Full-stack developer. Love React, Angular & Next.js 🚀",
  });

  useEffect(() => {
    setactiveLevel((e) => 1);
    getUserdata();
    getOrderbyUserId();
  }, []);

  useEffect(() => {
    if (routeid) {
      addNewadress(true, 1, null);
    }
  }, [routeid]);

  async function useraddress() {
    try {
      const id = localStorage.getItem("uId");
      const response: any = await userAddressByid(id).then((res) => res);
      if (response.succeeded && response.data?.length > 0) {
        setuserAddressDetail((e: any) => response.data);
        if (routeid) {
          setactiveMenu((e) => 4);
        }
      } else {
        setuserAddressDetail((e: any) => null);
      }
      setloading((e) => 0);
    } catch (error) {
      setloading((e) => 0);
      setuserAddressDetail((e: any) => null);
    }
  }

  async function getUserdata() {
    try {
      setloading((e) => 1);
      const id = localStorage.getItem("uId");
      if (id) {
        const response = await userDetails(id).then((res) => res);
        if (response) {
          setuserDeatils((e: any) => response);
          getUserlevels(id);
        } else {
          setuserDeatils((e: any) => null);
          setloading((e) => 0);
        }
      }
    } catch (err) {
      setloading((e) => 0);
      setuserDeatils((e: any) => null);
    }
  }

  async function getUserlevels(id: string) {
    try {
      if (id) {
        const response: any = await userLevel(id).then((res) => res);
        if (response?.succeeded && response.data?.length > 0) {
          teamReportRef.current = response.data;
          setteamReport((e) => teamReportRef.current);
        } else {
          teamReportRef.current = null;
          setteamReport((e) => teamReportRef.current);
        }
        useraddress();
      }
    } catch (error) {
      teamReportRef.current = null;
      setteamReport((e) => teamReportRef.current);
      setloading((e) => 0);
    }
  }

  function CreativeTable({ levelData }: { levelData: any }) {
    return (
      <div>
        <div className="overflow-scroll shadow-sm border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                <th className="px-6 py-4 text-sm font-semibold">ID</th>
                <th className="px-6 py-4 text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-sm font-semibold">Phone No.</th>
                <th className="px-6 py-4 text-sm font-semibold">Commission</th>
                <th className="px-6 py-4 text-sm font-semibold">
                  Email Confirmed
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {levelData.map((item: any, index: number) => {
                return (
                  <tr className="hover:bg-indigo-50 transition" key={index}>
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.firstName + " " + item.lastName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {item.phoneNumber}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.commission}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          item.emailConfirmed
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.emailConfirmed ? "Active" : "InActive"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function dataByActivelevel(id: number) {
    let data = teamReportRef.current.filter((item: any) => {
      if (id == item.level) {
        return item;
      }
    });
    return data[0]?.users.length > 0 ? data[0].users : null;
  }

  const addNewadress = (value: boolean, flag: number, data: any) => {
    if (value && flag == 1) {
      setisOpen((e) => value);
    } else if (value && flag == 2) {
      setisOpen((e) => false);
    } else if (flag == 3) {
      setformSubmit((e) => 1);
      CreateAddress(data);
    }
  };

  async function getOrderbyUserId() {
    try {
      const userid = localStorage.getItem("uId");
      if (userid) {
        const response: any = await Orderlist(userid).then((res) => res);
        if (response?.succeeded && response.data?.length > 0) {
          setorderList((e: any) => response.data);
        } else {
          setorderList((e: any) => null);
        }
      }
    } catch (error) {
      setorderList((e: any) => response.data);
    }
  }

  async function CreateAddress(data: any) {
    try {
      if (data) {
        let userid = localStorage.getItem("uId");
        let payload = {
          ...data,
          ["id"]: "",
          ["type"]: "Home",
          ["userID"]: userid,
        };
        const response: any = await createAddress(payload).then((res) => res);
        if (response?.succeeded) {
          setisOpen((e) => false);
          toast.success("New Address added Successfully");
          setloading((e) => 1);
          useraddress();
          if(response.data && routeid){
             localStorage.setItem("adsData", JSON.stringify({id:response.data})),
             navigation.replace("/cart")
          }
        }

        setformSubmit((e) => 0);
      }
    } catch (error) {
      setformSubmit((e) => 0);
    }
  }

  function countCommissionorUser(data: any, flag: number) {
    if (flag == 1) {
      const totalCommission = data.reduce((total: any, level: any) => {
        const levelSum = level.users.reduce((sum: any, user: any) => {
          return sum + (user.commission || 0);
        }, 0);
        return total + levelSum;
      }, 0);
      return totalCommission + ".00";
    } else if (flag == 2) {
      let todayCommission;
      let currentDate = new Date().toISOString();
      currentDate = currentDate.split("T")[0];
      let listOftodayCommission = data.filter((item: any) => {
        if (
          item.commissionDate &&
          item?.commissionDate[0]?.split("T")[0] == currentDate
        ) {
          return;
        }
      });
      if (listOftodayCommission.length > 0) {
        listOftodayCommission.reduce((total: any, level: any) => {
          const levelSum = level.users.reduce((sum: any, user: any) => {
            return sum + (user.commission || 0);
          }, 0);
          return total + levelSum;
        }, 0);
      }

      return todayCommission ? todayCommission : "0";
    } else if (flag == 3) {
      const totalusers = data.reduce((total: any, level: any) => {
        return total + level.users?.length;
      }, 0);
      return totalusers ? totalusers : 0;
    }
  }

  return (
    <>
      <Apploader Loadingstate={loading}>
        <ToastContainer />
        <div className="mt-10 mb-10 min-h-[600px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5">
            <div className="md:col-span-3 btn-color-by-logo-2 rounded-md shadow-lg p-4 pt-5 pb-5">
              {Sidemenu.map((item) => {
                return (
                  <div
                    className={`side-menuitem-section  flex items-center justify-between p-3 rounded-xl mb-3 ${
                      activeMenu == item.id && "btn-color-by-logo-1"
                    }`}
                    style={{ cursor: "pointer" }}
                    key={item.id}
                    onClick={() => setactiveMenu((e) => item.id)}
                  >
                    <h1 className="font-semibold text-lg text-white">
                      {item.name}
                    </h1>
                    {activeMenu == item.id && (
                      <ChevronDoubleRightIcon
                        strokeWidth={2}
                        color="#fff"
                        className="h-5 w-5 ml-2"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="md:col-span-9 bg-gray-100 rounded-md p-5">
              {activeMenu == 1 && (
                <div>
                  {userDeatils && (
                    <>
                      <div className="flex items-center mb-6">
                        <div className="mr-5">
                          <div className="w-24 h-24 rounded-full bg-gray-800 text-black flex items-center justify-center text-2xl font-bold shadow-md text-white">
                            {userDeatils.firstName.charAt(0) +
                              "" +
                              userDeatils.lastName.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <div className="grid grid-cols-1 gap-2">
                            <div>
                              <h2 className="text-black text-xl font-semibold underline">
                                {userDeatils?.firstName +
                                  " " +
                                  userDeatils?.lastName}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                          <h3 className="font-bold text-xl text-black">
                            Info.
                          </h3>
                          <p className="text-black">
                            {userDeatils?.phoneNumber}
                          </p>
                          <p className="text-black flex items-center">
                            {userDeatils?.email}{" "}
                            {userDeatils?.emailConfirmed && (
                              <CheckBadgeIcon
                                strokeWidth={2}
                                color="#c8a042"
                                className="h-5 w-5 ml-2"
                              />
                            )}
                          </p>
                        </div>
                        <div className="ml-0 md:ml-10">
                          <h3 className="font-bold text-black text-xl">
                            Referral Code
                          </h3>
                          <p className="text-black">
                            {userDeatils?.referralCode}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeMenu == 2 && (
                <div>
                  {teamReport && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
                        <div className="btn-color-by-logo-1 rounded-md p-2 text-center">
                          <h1 className="font-bold text-white text-xl">
                            {countCommissionorUser(teamReport, 1)}
                          </h1>
                          <h2 className="text-white">Total Commission</h2>
                        </div>
                        <div className="btn-color-by-logo-1 rounded-md p-2 text-center">
                          <h1 className="font-bold text-white text-xl">
                            {countCommissionorUser(teamReport, 2)}
                          </h1>
                          <h2 className="text-white">Today Commission</h2>
                        </div>
                        <div className="btn-color-by-logo-1 rounded-md p-2 text-center">
                          <h1 className="font-bold text-white text-xl">
                            {countCommissionorUser(teamReport, 3)}
                          </h1>
                          <h2 className="text-white">Total User</h2>
                        </div>
                      </div>

                      {teamReport?.length > 0 && (
                        <div className="grid grid-cols-4 md:grid-cols-10 lg:grid-cols-10 gap-1 mt-5">
                          {teamReport?.map((item: any, i: number) => {
                            return (
                              <Button
                                size="sm"
                                key={i}
                                onClick={() =>
                                  setactiveLevel((e) => item?.level)
                                }
                                className="border-2 rounded-md p-2 text-center border-black"
                                color={
                                  activeLevel == item.level ? "gray" : "white"
                                }
                              >
                                Lv {i + 1}
                              </Button>
                            );
                          })}
                        </div>
                      )}

                      {dataByActivelevel(activeLevel) && (
                        <div className="mt-5">
                          <CreativeTable
                            levelData={dataByActivelevel(activeLevel)}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {activeMenu == 3 && (
                <>
                  <Orderlists odrerlisting={orderList} />
                </>
              )}

              {activeMenu == 4 && (
                <>
                  <AddressSection
                    data={userAddressDetail}
                    addNewaddress={addNewadress}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </Apploader>

      <Dialog open={isOpen} dismiss={false}>
        <Apploader Loadingstate={formSubmit}>
          <>
            <DialogHeader>Add New Address</DialogHeader>
            <DialogBody
              className="bg-dark rounded-lg"
              style={{ backgroundColor: "#17212b" }}
            >
              <Createaddress onCancel={addNewadress} onCreate={addNewadress} />
            </DialogBody>
          </>
        </Apploader>
      </Dialog>
    </>
  );
}
