'use client';

import Image from "next/image";

export default function ClickableImage() {
  return (
    <div
      onClick={() => window.open("https://example.com", "_blank")}
      className="p-3 bg-black/50 border border-primary/20 rounded-lg cursor-pointer"
    >
      <Image
        src="/s7.png"
        alt="s7"
        width={30}
        height={30}
        className="relative w-full h-full object-contain"
      />
    </div>
  );
}
