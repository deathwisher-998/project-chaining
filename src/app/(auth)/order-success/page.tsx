import Link from "next/link";

export default function Ordersuccess() {
  return (
    <div className="flex items-center justify-center pt-40 pb-40 px-10">
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-10 max-w-lg w-full text-center" style={{backgroundColor:"#d3044c"}}>
        {/* Success Icon */}
        <div className="flex justify-center mb-6 mt-7">
          <div className="h-20 w-20 flex items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Order Successful 🎉
        </h1>

        {/* Message */}
        <p className="text-white text-sm sm:text-base mb-6">
          Thank you for your purchase! Your order has been placed successfully.
          You will receive a confirmation email shortly.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-7">
          <Link
            href="/"
            className="px-5 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-300 hover:text-black transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
