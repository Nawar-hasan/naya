"use client";

import { createContext, PropsWithChildren } from "react";
// import dynamic from "next/dynamic";
// import ReactFacebookPixel from "react-facebook-pixel";
// type ReactFacebookPixelType = typeof ReactFacebookPixel;
// //@ts-expect-error sadasd
// const ReactPixel = dynamic(
//   //@ts-expect-error sadasd
//   async () => (await import("react-facebook-pixel")).default,
//   {
//     ssr: false,
//   }
// ) as ReactFacebookPixelType;
// Create the context
interface FacebookPixelContextValue {
  trackEvent: (eventName: string, eventParams: unknown) => void;
  // pixelRef: MutableRefObject<typeof ReactPixel | null>;
  pixelRef: { current: boolean };
}

export const FacebookPixelContext = createContext<
  FacebookPixelContextValue | undefined
>(undefined);

// Provider component
export const FacebookPixelProvider = ({ children }: PropsWithChildren) => {
  // const pixelRef = useRef<typeof ReactPixel | null>(null);

  // useEffect(() => {
  //   const FACEBOOK_PIXEL_ID = "YOUR_PIXEL_ID"; // Replace with your actual Pixel ID
  //   if (process.env.NODE_ENV === "production") {
  //     ReactPixel.init(FACEBOOK_PIXEL_ID);
  //     ReactPixel.pageView();
  //     console.log("ReactPixel.pageView");
  //     pixelRef.current = ReactPixel;
  //   }
  // }, []);

  // const trackEvent = (eventName: string, eventParams: unknown) => {
  //   if (pixelRef.current) {
  //     pixelRef.current.track(eventName, eventParams);
  //     console.log(`track(${eventName}, ${eventParams});`);
  //   }
  // };
  const pixelRef = { current: false };

  const trackEvent = (eventName: string, eventParams: unknown) => {
    if (pixelRef.current) {
      console.log(`track(${eventName}, ${eventParams});`);
    }
  };

  return (
    <FacebookPixelContext.Provider value={{ trackEvent, pixelRef }}>
      {children}
    </FacebookPixelContext.Provider>
  );
};

// Custom hook for consuming the context

// Usage example in the RootLayout
export default function FacebookPixelContextProvider({
  children,
}: PropsWithChildren) {
  return <FacebookPixelProvider>{children}</FacebookPixelProvider>;
}
