export default function ShippingPolicy() {
  return (
    <>
      <div className="container mx-auto mt-10 mb-10 px-10 md:px-0 md:mb-20 md:mt-20">
        <section>
          <h1 className="text-3xl font-bold underline underline-offset-4 mb-6">
            Shipping & Delivery Policy
          </h1>

          <p className="mb-6">
            At <strong>Samdena Deals Pvt. Ltd.</strong>, we are committed to
            delivering your products safely and on time. Please read the
            following terms carefully to understand our shipping and delivery
            process.
          </p>

          <h2 className="text-xl font-bold mb-4 mt-8">1. Shipping Charges</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Shipping charges may vary based on delivery location, order
              weight, and courier service availability.
            </li>
            <li>
              The applicable delivery charge will be clearly displayed at
              checkout before you confirm your order.
            </li>
            <li>
              All courier charges are inclusive of applicable taxes and are
              non-refundable.
            </li>
          </ul>
          <p className="mt-2">
            <strong>Note:</strong> Shipping charges may differ for remote or
            special delivery zones as per courier partner rates.
          </p>

          <h2 className="text-xl font-bold mb-4 mt-8">2. Delivery Timeline</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              We strive to deliver your orders in the fastest and safest
              possible manner.
            </li>
            <li>
              Standard delivery time is 3–5 working days from the date of order
              confirmation (within India).
            </li>
            <li>
              Delivery timelines may vary depending on your location and courier
              service coverage.
            </li>
          </ul>

          <p className="mt-4 font-semibold">Delays may occur due to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Government restrictions</li>
            <li>Natural calamities</li>
            <li>Transportation issues</li>
            <li>Any unforeseen circumstances beyond our control</li>
          </ul>

          <p className="mt-4">
            If delivery is expected to exceed the normal timeline:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              The associate or preferred customer will be notified in advance.
            </li>
            <li>
              You may choose to continue with the delivery or cancel the order.
            </li>
            <li>
              In case of cancellation, a refund will be initiated as per our
              Product Exchange/Return/Refund Policy.
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-4 mt-8">
            3. Damaged or Tampered Packages
          </h2>
          <p className="mb-2">
            We ensure all products are carefully packed before dispatch.
            However, if you notice that the package is tampered with or damaged
            at the time of delivery:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Do not accept the package.</li>
            <li>
              Immediately inform our Customer Support Team by:
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>
                  📞 Contacting the customer care number mentioned on our
                  website
                </li>
                <li>
                  📧 Emailing us at{" "}
                  <a
                    href="mailto:info@samdenadeals.com"
                    className="text-blue-600 hover:underline"
                  >
                    info@samdenadeals.com
                  </a>{" "}
                  with your Order Reference Number
                </li>
              </ul>
            </li>
            <li>
              We will promptly arrange for a replacement or reshipment as
              applicable.
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-4 mt-8">4. Order Complaints</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Any complaint or discrepancy related to your order must be
              reported within 24 hours of delivery.
            </li>
            <li>Complaints raised after 24 hours will not be entertained.</li>
          </ul>

          <h2 className="text-xl font-bold mb-4 mt-8">5. Important Note</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              All orders are subject to stock availability and confirmation by{" "}
              <strong>Samdena Deals Pvt. Ltd.</strong>.
            </li>
            <li>
              Delivery timelines mentioned are indicative and may vary depending
              on courier partner operations and delivery location.
            </li>
          </ul>

          <div className="mt-8">
            <p className="font-semibold mb-2">
              📦 For any queries or assistance:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                📧 Email:{" "}
                <a
                  href="mailto:info@samdenadeals.com"
                  className="text-blue-600 hover:underline"
                >
                  info@samdenadeals.com
                </a>
              </li>
              <li>📞 Customer Care: (as mentioned on official website)</li>
              <li>
                🌐 Website:{" "}
                <a
                  href="https://www.samdenadeals.com"
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  www.samdenadeals.com
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
