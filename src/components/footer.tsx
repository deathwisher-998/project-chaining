"use client";

import { Typography, Button, Input } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const LINKS = [
  {
    title: "Policy & Orders",
    items: [
      { name: "Track Your Order", link: "/profile", token: true },
      { name: "Become a Brand Partner", link: "/register" },
      { name: "Return & Claims", link: "/return-policy" },
      { name: "Privacy & Security Policy", link: "/privacy-policy" },
      { name: "Shipping Policy", link: "/shipping-policy" },
      { name: "Terms & Conditions", link: "terms-conditions" },
      { name: "Grienvance Redressal", link: "" },
    ],
  },
  {
    title: "Company Pages",
    items: [
      { name: "About Us", link: "/about" },
      { name: "Company", link: "/about-company" },
      { name: "Policy", link: "/policy" },
      { name: "Achievements", link: "" },
      { name: "Work with Us", link: "/register" },
    ],
  },
  {
    title: "Discover",
    items: [
      { name: "Join Us", link: "/register" },
      { name: "FAQs", link: "" },
      { name: "Blogs", link: "" },
    ],
  },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const navigation = useRouter();

  function navigateTopath(link: string, flag: number) {
    if (link) {
      if (flag == 1) {
        navigation.push(link);
      } else {
        const tokenExist = localStorage.getItem("token");
        if(tokenExist){
          localStorage.setItem('checkorder', 'yes')
          navigation.push(link);
        }else{
          toast.warning("Please login first to access track your order")
        }
      }
    }
  }

  return (
    <footer
      className="px-8 pt-20 pb-8 mt-20"
      style={{ backgroundColor: "#17212b" }}
    >
      <ToastContainer />
      <div className="container flex flex-col mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 !w-full">
          <div className="flex md:col-span-2 gap-10 md:gap-24 mb-10 md:gap-20 flex-wrap">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography variant="h6" color="white" className="mb-4">
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link.name}>
                    {link.link ? (
                      <Typography
                        as="p"
                        onClick={() => navigateTopath(link.link, (link.token ? 2: 1))}
                        className="py-1 font-normal !text-gray-500 transition-colors hover:!text-white cursor-pointer"
                      >
                        {link.name}
                      </Typography>
                    ) : (
                      <Typography
                        as="p"
                        className="py-1 font-normal !text-gray-500 transition-colors hover:!text-white cursor-pointer"
                      >
                        {link.name}
                      </Typography>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div>
            <Typography variant="h6" className="mb-4 text-left text-white">
              Contact Information
            </Typography>
            <div>
              <Typography
                as="p"
                className="py-1 font-normal !text-gray-500 transition-colors hover:!text-white text-color-by-logo-1"
              >
                info@samdenadeals.com
              </Typography>
            </div>
            <div>
              <Typography
                as="p"
                className="py-1 font-normal !text-gray-500 transition-colors"
              >
                F-2/788 Ratiya Marg Main Road Sangam Vihar New Delhi - 110080
              </Typography>
            </div>
          </div>
          <div className="mt-10 sm:mt-0">
            <Typography variant="h6" className="mb-3 text-left text-white">
              Location
            </Typography>

            <div style={{ width: "100%", height: "180px" }}>
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.284840820003!2d77.24422977612434!3d28.501076675736872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce10c4a4eb141%3A0xd800f0b25cf5d3eb!2sRatiya%20Marg%2C%20Sangam%20Vihar%2C%20New%20Delhi%2C%20Delhi%20110080!5e0!3m2!1sen!2sin!4v1760168791864!5m2!1sen!2sin"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:justify-between mt-10 border-t pt-7">
          <div>
            <Typography
              color="blue-gray"
              className="text-center font-normal text-white"
            >
              &copy; {CURRENT_YEAR} Made with by{" "}
              <a href="#" target="_blank">
                Auramera
              </a>
              .
            </Typography>
          </div>

          <div></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
