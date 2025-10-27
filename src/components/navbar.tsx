import React, { useEffect, useMemo } from "react";
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
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { routes } from "@/routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { cartproductList } from "@/app/globalstore/cart/actions";
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

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const navigation = useRouter();
  const { token, loading } = useAuth(); // your auth logic
  const cartcount = useSelector((state: any) => state?.ProductCart);
  const dispatch = useDispatch();

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
    let mewdata = localStorage.getItem("cdata");
    if (mewdata) {
      dispatch(cartproductList(JSON.parse(mewdata)));
    }
  }, []);

  useEffect(() => {
    // let mewdata = localStorage.getItem("cdata");
    // if (mewdata) {
    //   dispatch(cartproductList(JSON.parse(mewdata)));
    // }
  }, []);

  function logoutReload() {
    localStorage.removeItem("token"),
      localStorage.removeItem("uId"),
      localStorage.removeItem("cdata");
    localStorage.removeItem("adsData");

    dispatch(
      cartproductList({
        cartproductlist: null,
        productQuantity: null,
      })
    );

    window.location.href = "/";
  }

  return (
    <div className="sticky top-0 z-50">
      <div className="mx-auto w-full">
        <MTNavbar
          blurred
          color="white"
          className="z-50 relative border-0 pr-2 py-3 pl-2 md:pl-10 md:pr-10 max-w-[100%]"
          // pt-5 pb-5
          style={{ backgroundColor: "#17212b", borderRadius: 0 }}
        >
          <div className="flex items-center justify-between">
            <Typography
              color="blue-gray"
              className="text-lg font-bold text-white"
            >
              <Link href={routes.auth.home}>
                <Image
                  src={"/image/app-logo.png"}
                  width={180}
                  height={70}
                  className="logo-sz"
                />
              </Link>
            </Typography>
            <div className="hidden items-center gap-4 lg:flex">
              <Button
                variant="text"
                onClick={() =>
                  token
                    ? navigation.push("/profile")
                    : navigation.push("/login")
                }
                className="text-white"
              >
                {token ? "Account" : "Login"}
              </Button>

              <Button
                variant="text"
                onClick={() => navigation.push("/products")}
                className="text-white"
              >
                {"Products"}
              </Button>

              <Button
                // color="red"
                onClick={() =>
                  token ? navigation.push("/cart") : navigation.push("/login")
                }
                className="btn-color-by-logo-1"
              >
                Items in Cart{" "}
                <span className={"cartcount"}>
                  {cartcount.productQuantity ? cartcount.productQuantity : "0"}
                </span>
              </Button>

              {token && (
                <div>
                  <Button
                    variant="text"
                    className="text-white"
                    size="sm"
                    onClick={() => {
                      logoutReload();
                    }}
                  >
                    Log Out
                  </Button>
                </div>
              )}
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
              <div
                className="flex items-center gap-4"
                style={{ flexDirection: "column" }}
              >
                <div>
                  <Button
                    variant="text"
                    className="text-white"
                    onClick={() =>
                      token
                        ? navigation.push("/profile")
                        : navigation.push("/login")
                    }
                  >
                    {token ? "Account" : "Login"}
                  </Button>
                  <Button
                    variant="text"
                    className="text-white"
                    onClick={() => navigation.push("/products")}
                  >
                    {"Products"}
                  </Button>
                </div>
                {}

                <div>
                  <Button
                    onClick={() =>
                      token
                        ? navigation.push("/cart")
                        : navigation.push("/login")
                    }
                    className="btn-color-by-logo-1"
                  >
                    Items in Cart{" "}
                    {cartcount.productQuantity
                      ? cartcount.productQuantity
                      : "0"}
                  </Button>
                </div>

                {token && (
                  <div>
                    <Button
                      variant="text"
                      className="text-white"
                      onClick={() => {
                        localStorage.removeItem("token"),
                          localStorage.removeItem("uId"),
                          navigation.replace("/");
                      }}
                    >
                      Log Out
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Collapse>
        </MTNavbar>
      </div>
    </div>
  );
}

export default Navbar;
