"use client";

import { Provider } from "react-redux";
import { configuredStore } from "./store";

type propsData = {
  children: any;
};

export function Providers({ children }: propsData) {
  return <Provider store={configuredStore({})}>{children}</Provider>;
}
