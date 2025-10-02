import { Typography, Button, Input } from "@material-tailwind/react";
import Link from "next/link";

const CURRENT_YEAR = new Date().getFullYear();

const links = [
  { name: "Home", link: "/" },
  { name: "Policy", link: "/" },
  { name: "About", link: "/" },
  { name: "Company", link: "/" },
  { name: "Contact Us", link: "/" },
];

export function Footer() {
  return (
    <footer className="px-8 pt-5 pb-5" style={{ backgroundColor: "#17212b" }}>
      <div className="container max-w-6xl flex flex-col mx-auto">
        <div className="w-full flex justify-center border-b border-gray-600 pb-1">
          <div className="flex col-span-2 items-center gap-10 mb-1 lg:mb-0 md:gap-36">
            <ul style={{ display: "inline-flex", justifyContent:"center", flexWrap:"wrap" }}>
              {links.map((item: any) => {
                return (
                  <li className="mr-4">
                    <Typography
                      as="a"
                      href={item.link}
                      className="py-1 font-normal text-white transition-colors hover:!text-gray-500"
                    >
                      {item.name}
                    </Typography>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div>
          <Typography
            color="blue-gray"
            className="text-center mt-2 font-normal text-white"
          >
            &copy; {CURRENT_YEAR} Made with by{" "}
            <a href="#" target="_blank">
              Auramera
            </a>
            .
          </Typography>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
