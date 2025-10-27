import { useRouter } from "next/navigation";

function Adminnavbar() {
  const navigation = useRouter();
  function logOut() {
    localStorage.clear();
    navigation.replace("/admin/33/samdena-admin/product");
    window.location.reload();
  }
  return (
    <div className="bg-gray-800 rounded-md mt-5 p-5 flex justify-end">
      <div className="flex">
        <p
          className="text-white font-semibold underline cursor-pointer"
          onClick={() => navigation.replace("/admin/33/samdena-admin/product")}
        >
          Products
        </p>
        <p
          className="text-white font-semibold ml-5 underline cursor-pointer"
          onClick={() =>
            navigation.replace("/admin/33/samdena-admin/user-refferal")
          }
        >
          User Referral
        </p>
        <p
          className="text-white font-semibold ml-5 underline cursor-pointer"
          onClick={() =>
            navigation.replace("/admin/33/samdena-admin/withdraw-list")
          }
        >
          Withdraw List
        </p>
        <p
          className="text-white font-semibold ml-5 underline cursor-pointer"
          onClick={() => navigation.replace("/admin/33/samdena-admin/category")}
        >
          Category
        </p>
        <p
          className="text-white font-semibold ml-5 underline cursor-pointer"
          onClick={() =>
            navigation.replace("/admin/33/samdena-admin/order-list")
          }
        >
          Order
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
