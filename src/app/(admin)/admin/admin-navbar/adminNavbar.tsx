import { useRouter } from "next/navigation";

function Adminnavbar() {
  const navigation = useRouter();
  function logOut() {
    localStorage.clear();
    navigation.replace("/admin/33/samadmin2xj25");
    window.location.reload();
  }
  return (
    <div className="bg-gray-800 rounded-md mt-5 p-5 flex justify-end">
      <div className="flex">
        <p
          className="text-white font-semibold underline cursor-pointer"
          onClick={() => navigation.replace("/admin/33/samadmin2xj25/product")}
        >
          Products
        </p>
        <p
          className="text-white font-semibold ml-5 underline cursor-pointer"
          onClick={() =>
            navigation.replace("/admin/33/samadmin2xj25/user-refferal")
          }
        >
          User Referral
        </p>
        <p
          className="text-white font-semibold ml-5 underline cursor-pointer"
          onClick={() =>
            navigation.replace("/admin/33/samadmin2xj25/withdraw-list")
          }
        >
          Withdraw List
        </p>
        <p
          className="text-white font-semibold ml-5 underline cursor-pointer"
          onClick={() => navigation.replace("/admin/33/samadmin2xj25/category")}
        >
          Category
        </p>
        <p
          className="text-white font-semibold ml-5 underline cursor-pointer"
          onClick={logOut}
        >
          Log Out
        </p>
      </div>
    </div>
  );
}

export default Adminnavbar;
