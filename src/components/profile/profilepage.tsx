"use client";

import { useEffect, useRef, useState } from "react";
import { Apploader } from "../loader/loading";
import { userDetails, userLevel } from "@/helpers/services/users";
import { Button } from "@material-tailwind/react";

export default function ProfilePage() {
  const [loading, setloading] = useState(1);
  const [userDeatils, setuserDeatils] = useState<any>(null);
  const teamReportRef = useRef<any>(null);
  const [teamReport, setteamReport] = useState(null);
  const [activeLevel, setactiveLevel] = useState(1);
  const [profile, setProfile] = useState({
    username: "Jatin Arora",
    email: "jatin@example.com",
    location: "New Delhi, India",
    bio: "Full-stack developer. Love React, Angular & Next.js 🚀",
  });

  useEffect(() => {
    setactiveLevel((e) => 1);
    getUserdata();
  }, []);

  async function getUserdata() {
    try {
      setloading((e) => 1);
      const id = localStorage.getItem("uId");
      if (id) {
        const response = await userDetails(id).then((res) => res);
        if (response) {
          setuserDeatils((e: any) => response);
          getUserlevels(id)
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
        setloading((e) => 0);
      }
    } catch (error) {
      teamReportRef.current = null;
      setteamReport((e) => teamReportRef.current);
      setloading((e) => 0);
    }
  }

  function CreativeTable({levelData}:{levelData:any}) {
    return (
      <div>
        <div className="overflow-hidden shadow-sm border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                <th className="px-6 py-4 text-sm font-semibold">ID</th>
                <th className="px-6 py-4 text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-sm font-semibold">Phone No.</th>
                 <th className="px-6 py-4 text-sm font-semibold">Commission</th>
                <th className="px-6 py-4 text-sm font-semibold">Email Confirmed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {levelData.map((item:any, index:number) => {
                return(
                  <tr className="hover:bg-indigo-50 transition" key={index}>
                <td className="px-6 py-4">{(index + 1)}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{item.firstName + " " + item.lastName}</td>
                <td className="px-6 py-4 text-gray-600">{item.phoneNumber}</td>
                <td className="px-6 py-4 font-medium text-gray-800">0</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${item.emailConfirmed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                    {item.emailConfirmed ? "Active" : "InActive"}
                  </span>
                </td>
              </tr>
                )
              })}
              
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function dataByActivelevel(id:number){
    let data = teamReportRef.current.filter((item:any)  => {
       if(id == item.level){
         return item
       }
    })
    return data[0]?.users.length > 0 ? data[0].users : null;
  }

  return (
    <Apploader Loadingstate={loading}>
      <div className="mt-10 p-5 mb-10">
        <div className="w-full  bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Personal Centre</h1>
          </div>

          {userDeatils && (
            <div className="flex items-center mb-6">
              <div className="mr-5">
                <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center text-2xl font-bold shadow-md">
                  {userDeatils.firstName.charAt(0) +
                    "" +
                    userDeatils.lastName.charAt(0)}
                </div>
              </div>
              <div>
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <h2 className="text-white font-semibold">
                      {userDeatils?.firstName + " " + userDeatils?.lastName}
                    </h2>
                    <h2 className="text-white"> {userDeatils?.phoneNumber}</h2>
                  </div>
                  <div className="grid grid-cols-2">
                    <div>
                      <h3 className="font-bold text-white">Lv2 Nextlevel</h3>
                      <p className="text-white">500/2000.00 {"(Recharge)"}</p>
                      <p className="text-white">3/2 subordinates</p>
                    </div>
                    <div className="ml-10">
                      <h3 className="font-bold text-white">Referral Code</h3>
                      <p className="text-white">{userDeatils?.referralCode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full  bg-white rounded-xl shadow-lg p-8 mt-5">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Team Report</h1>
          </div>

          {teamReport && (
            <>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-cyan-800 rounded-md p-2 text-center">
                  <h1 className="font-bold text-white text-xl">56788.00</h1>
                  <h2 className="text-white">Yesterday teams commission</h2>
                </div>
                <div className="bg-cyan-800 rounded-md p-2 text-center">
                  <h1 className="font-bold text-white text-xl">56788.00</h1>
                  <h2 className="text-white">Active count today</h2>
                </div>
                <div className="bg-cyan-800 rounded-md p-2 text-center">
                  <h1 className="font-bold text-white text-xl">56788.00</h1>
                  <h2 className="text-white">Added People</h2>
                </div>
              </div>

              {teamReport?.length > 0 && (
                <div className="grid grid-cols-10 gap-1 mt-5">
                  {teamReport?.map((item: any, i: number) => {
                    return (
                      <Button
                        size="sm"
                        key={i}
                        onClick={() => setactiveLevel((e) => item?.level)}
                        className="border-2 rounded-md p-2 text-center border-black"
                        color={activeLevel == item.level ? "gray" : "white"}
                      >
                        Lv {i + 1}
                      </Button>
                    );
                  })}
                </div>
              )}

              {dataByActivelevel(activeLevel) && <div className="mt-5">
                <CreativeTable levelData={dataByActivelevel(activeLevel)} />
              </div> }
            </>
          )}
        </div>
      </div>
    </Apploader>
  );
}
