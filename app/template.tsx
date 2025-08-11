"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FB_PIXEL_ID } from "@/lib/facebook-pixels";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Dynamically import the library to ensure it only runs in the browser
    import("react-facebook-pixel").then((module) => {
      const ReactPixel = module.default;
      console.log(FB_PIXEL_ID);
      ReactPixel.init(FB_PIXEL_ID);
      ReactPixel.pageView();
    });
  }, []);

  useEffect(() => {
    import("react-facebook-pixel").then((module) => {
      const ReactPixel = module.default;
      ReactPixel.pageView();
    });
  }, [pathname]);

  return <>{children}</>;
}
