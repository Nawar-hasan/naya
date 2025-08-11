import { FacebookPixelContext } from "@/app/contexts/FacebookPixelContextProvider";
import { useContext } from "react";

export const useFacebookPixel = () => {
  const context = useContext(FacebookPixelContext);
  if (!context) {
    throw new Error(
      "useFacebookPixel must be used within a FacebookPixelProvider"
    );
  }
  return context;
};
