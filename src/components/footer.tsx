import { Typography, Button, Input } from "@material-tailwind/react";

const LINKS = [
  {
    title: "Company",
    items: [
      { name: "About", link: "/about" },
      { name: "Company", link: "/about-company" },
    ],
  },
  {
    title: "Pages",
    items: [
      { name: "Home", link: "/" },
      { name: "Policy", link: "/policy" },
      { name: "Contact Us", link: "/" },
    ],
  },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer
      className="px-8 pt-20 pb-8 mt-40"
      style={{ backgroundColor: "#17212b" }}
    >
      <div className="container flex flex-col mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 !w-full ">
          <div className="flex col-span-1 gap-24 mb-10 md:gap-20">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography variant="h6" color="white" className="mb-4">
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link.name}>
                    <Typography
                      as="a"
                      href={link.link}
                      className="py-1 font-normal !text-gray-500 transition-colors hover:!text-white"
                    >
                      {link.name}
                    </Typography>
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
                className="py-1 font-normal !text-gray-500 transition-colors hover:!text-white"
              >
                info@email.com
              </Typography>
            </div>
            <div>
              <Typography
                as="p"
                className="py-1 font-normal !text-gray-500 transition-colors hover:!text-white"
              >
                9820299282
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14018.50997277646!2d77.20482905!3d28.62678885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd3d79da3cf7%3A0x2f8b77b3b944bcd4!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1696600000000!5m2!1sen!2sin"
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
