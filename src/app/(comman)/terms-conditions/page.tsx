export default function TermsConditions() {
  return (
    <>
      <div className="container mx-auto mt-10 mb-10 px-10 md:px-0 md:mb-20 md:mt-20">
        {/* <h1 classNameName="text-2xl font-semibold underline"> Terms & Conditions</h1> */}

        <section>
          <h1 className="text-3xl font-bold underline underline-offset-4 mb-6">
            Terms & Conditions
          </h1>

          <p className="mb-6">
            Welcome to <strong>Samdena Deals Pvt. Ltd.</strong> By accessing our
            website, app, or participating in our direct selling program, you
            agree to comply with the following Terms & Conditions. These apply
            to all associates, preferred customers, and regular customers.
          </p>

          <h2 className="text-xl font-bold mb-4 mt-8">
            1. Orders & Product Purchase
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>All orders are subject to stock availability.</li>
            <li>
              Orders can be placed via our official website, app, or authorized
              channels.
            </li>
            <li>
              Once an order is confirmed, cancellation or modification is
              allowed only as per the Return & Claim Policy.
            </li>
            <li>
              Pricing and shipping charges are clearly displayed at checkout and
              may vary depending on location and courier availability.
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-4 mt-8">
            2. Direct Selling & Commission Rules
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Associates earn commission only on actual product sales.</li>
            <li>
              Income from recruitment or joining fees is strictly prohibited.
            </li>
            <li>
              Commission structure, bonuses, and referral rules are defined in
              the associate plan and may be updated at company discretion.
            </li>
            <li>
              Associates must adhere to ethical sales practices and avoid
              misleading claims or forced recruitment.
            </li>
          </ul>
          <p className="mt-2">
            <strong>Note:</strong> An associate does not need to purchase
            products themselves to earn referral commission. They can simply
            register and refer others, and commissions will be credited when
            their referrals make purchases.
          </p>

          <h2 className="text-xl font-bold mb-4 mt-8">3. Payments & Refunds</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Payments must be completed through authorized payment channels.
            </li>
            <li>
              Refunds, if applicable, will be processed as per the Return &
              Claim Policy.
            </li>
            <li>
              The company is not responsible for delays caused by banks, payment
              gateways, or technical failures.
            </li>
            <li>
              All commission payments are subject to tax deductions at source
              (TDS) as per the provisions of the Indian Income Tax Act, 1961.
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-4 mt-8">4. Shipping & Delivery</h2>
          <p>
            Governed by the <strong>Shipping & Delivery Policy</strong>,
            including timelines, charges, and handling of damaged or tampered
            packages.
          </p>

          <h2 className="text-xl font-bold mb-4 mt-8">5. Returns & Claims</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Governed by the Return & Claim Policy.</li>
            <li>
              Misuse of the policy may result in denial of refund/replacement or
              termination of associate privileges.
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-4 mt-8">6. Prohibited Practices</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Forced recruitment, pyramid schemes, or misleading promises are
              strictly forbidden.
            </li>
            <li>
              Unauthorized resale of products outside approved channels is
              prohibited.
            </li>
            <li>
              Violation may lead to immediate termination of association and
              legal action.
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-4 mt-8">7. Privacy & Security</h2>
          <p>
            All personal information is handled as per the{" "}
            <strong>Privacy & Security Policy</strong>. Associates and customers
            must keep account credentials confidential.
          </p>

          <h2 className="text-xl font-bold mb-4 mt-8">8. Intellectual Property</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              All content, logos, and materials on the website/app are the
              property of Samdena Deals Pvt. Ltd.
            </li>
            <li>
              Unauthorized use, reproduction, or distribution is prohibited.
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-4 mt-8">
            9. Limitation of Liability
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              The company is not liable for indirect, incidental, or
              consequential damages arising from product use, technical
              failures, or delays beyond its control.
            </li>
            <li>
              Company responsibility is limited to product replacement or refund
              as per policies.
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-4 mt-8">10. Contact Us</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Email:{" "}
              <a
                href="mailto:info@samdenadeals.com"
                className="text-blue-600 hover:underline"
              >
                info@samdenadeals.com
              </a>
            </li>
            <li>
              Website:{" "}
              <a
                href="https://www.samdenadeals.com"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                www.samdenadeals.com
              </a>
            </li>
            <li>Customer Care: (as mentioned on website)</li>
          </ul>
        </section>
      </div>
    </>
  );
}
