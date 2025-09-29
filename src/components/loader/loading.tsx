// import { Spinner } from "@chakra-ui/react";

import { Spinner } from "@material-tailwind/react";

interface LoaderType {
  children: React.ReactNode;
  Loadingstate: number; // ✅ use lowercase `number`, not `Number`
}

export const Apploader = ({ children, Loadingstate }: LoaderType) => {
  return (
    <>
      {Loadingstate == 1 ? (
        <div className="loader-block">
          <Spinner className="h-12 w-12"/>
        </div>
      ) : null}
      {children}
    </>
  );
};
