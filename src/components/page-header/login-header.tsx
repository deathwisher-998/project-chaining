import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  UserCircleIcon,
  CommandLineIcon,
  Squares2X2Icon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { routes } from "@/routes/routes";
import Link from "next/link";
import Image from "next/image";

const NAV_MENU = [
  {
    name: "Page",
    icon: RectangleStackIcon,
  },
  {
    name: "Account",
    icon: UserCircleIcon,
  },
  {
    name: "Docs",
    icon: CommandLineIcon,
    href: "https://www.material-tailwind.com/docs/react/installation",
  },
];

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <Typography
        as="a"
        href={href || "#"}
        target={href ? "_blank" : "_self"}
        variant="paragraph"
        color="gray"
        className="flex items-center gap-2 font-medium text-gray-900"
      >
        {children}
      </Typography>
    </li>
  );
}

export function Loginheader() {
  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <div className="px-10 sticky top-4 z-50">
      <div className="mx-auto w-full">
              <MTNavbar
                blurred
                color="white"
                className="z-50 mt-6 relative border-0 pr-10 py-3 pl-10 max-w-[100%]"
                style={{backgroundColor:"#17212b"}}
              >
          <div className="flex items-center justify-between">
             <Typography
              color="blue-gray"
              className="text-lg font-bold text-white"
            >
              <Link href={routes.auth.home}>
               <Image src={"/image/app-logo.png"} width={180} height={70} />
              </Link>
            </Typography>
            {/* <ul className="ml-10 hidden items-center gap-8 lg:flex">
              {NAV_MENU.map(({ name, icon: Icon, href }) => (
                <NavItem key={name} href={href}>
                  <Icon className="h-5 w-5" />
                  {name}
                </NavItem>
              ))}
            </ul> */}
            <div className="hidden items-center gap-4 lg:flex">
              <Link href={routes.nonauth.home}>
                <Button variant="text" className="text-white">Home</Button>
              </Link>

              <Link href={routes.nonauth.register}>
                <Button className="btn-color-by-logo-1">Register here!</Button>
              </Link>
            </div>
            <IconButton
              variant="text"
              color="white"
              onClick={handleOpen}
              className="ml-auto inline-block lg:hidden"
            >
              {open ? (
                <XMarkIcon strokeWidth={2} className="h-6 w-6" />
              ) : (
                <Bars3Icon strokeWidth={2} className="h-6 w-6" />
              )}
            </IconButton>
          </div>
          <Collapse open={open}>
            <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
              {/* <ul className="flex flex-col gap-4">
                {NAV_MENU.map(({ name, icon: Icon, href }) => (
                  <NavItem key={name} href={href}>
                    <Icon className="h-5 w-5" />
                    {name}
                  </NavItem>
                ))}
              </ul> */}
              <div className="flex items-center gap-4" style={{flexDirection:"column"}}>
                <div>
                  <Link href={routes.nonauth.home}>
                  <Button variant="text"
                    className="text-white">Home</Button>
                  </Link>
                </div>
               <div>
                 <Link href={routes.nonauth.register}>
                  <Button className="btn-color-by-logo-1">Register here!</Button>
                </Link>
               </div>
              </div>
            </div>
          </Collapse>
        </MTNavbar>
      </div>
    </div>
  );
}

export default Loginheader;
