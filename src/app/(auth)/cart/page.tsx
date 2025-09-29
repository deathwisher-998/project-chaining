import Cart from "@/components/cart/cart";

export default function Sitecart() {
  return (
    <>
      <div className="container bg-black mt-5 rounded-md p-5">
        <div className="grid">
          <div>
            <h1 className="text-white text-xl text-center">My Cart</h1>
          </div>
        </div>
      </div>
      <Cart />
    </>
  );
}
