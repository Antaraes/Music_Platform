"use client";
import makeStore from "./store";
import { Provider } from "react-redux";
import { FC } from "react";

interface providerProps {
  children: React.ReactNode;
}

const CustomProvider: FC<providerProps> = ({ children }) => {
  return <Provider store={makeStore()}>{children}</Provider>;
};

export default CustomProvider;
