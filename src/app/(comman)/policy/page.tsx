export default function Policypage() {
  return (
    <>
      <div className="container mx-auto mt-10 mb-10 px-10 md:px-0 md:mb-20 md:mt-20">
        <h1 className="text-2xl font-semibold underline"> Payment Policy</h1>
        <p className="text-lg mt-5">
          Any Associate can buy Samdena deal’s products on their registered ID
          by using our website www. samdenadeals.com and using our E-Shop
          facility.
        </p>
        <ul>
          <li className="text-lg mt-3">
            {" "}
            In the E-Shop facility, Razorpay is our Payment gateway partner.
            Further, payments can be done through below options{" "}
          </li>
        </ul>
        <h2 className="text-lg mt-3 font-semibold"> Security Systems Adopted by Razorpay </h2>
        <p className="text-lg mt-3">
          Razorpay is PCI DSS compliant with latest certificate version of
          3.2.1. Security standards set by card industry which ensures proper
          security measures followed to protect sensitive information. Further,
          we are abiding by the latest circular the Reserve Bank of India
          pertaining to tokenization of credit card and debit card information
          viz. Card-on-File Tokenization
        </p>

        <p className="text-lg mt-3">
          For further information on Security Systems adopted by Razorpay,
          please visit the following link{" "}
          <a href="https://razorpay.com/">https://razorpay.com/</a>
        </p>
        <p className="text-lg mt-3 font-semibold">Kindly Note</p>

        <ul>
          <li className="text-lg mt-3">
            To successfully place an order, it is required that the amount shall
            have been recorded in Samdena deal’s accounts and until such event
            happens, the order is not deemed to have been successfully placed.
          </li>

          <li className="text-lg mt-3">
            Customer 's e-wallet balance will not be refunded. This balance can
            be used by the customer for shopping only.
          </li>

          <li className="text-lg mt-3">
            We take services of Razorpay to make the process of payment secure,
            fast and reliable for you. However, it is to be noted that Samdena
            deals does not own/ control these payment gateways and as such it is
            highly recommended that you read their terms of use and other policy
            documents carefully as published on https://www.razorpay.com
          </li>

          <li className="text-lg mt-3">
            We do not store any payment credentials such as Credit/Debit Card
            Numbers, CVV, Net banking log-in details, etc. and as such you might
            be required to enter the said credentials every time you place an
            order.
          </li>

          <li className="text-lg mt-3">
            We do not charge any extra transaction charges from our Associates /
            customers for using digital mode of payments
          </li>

          <li className="text-lg mt-3">
          If any of the Associates/ Preferred customers face any issue in
          Payment made at E-Shop options, they can immediately inform Customer
          Support through Customer care number mentioned on company site or
          write an e mail info@samdena.com, mentioning the order reference
          number. We shall make our best efforts to ensure the resolution of the
          complaint at the earliest.
        </li>
        </ul>

        
      </div>
    </>
  );
}
