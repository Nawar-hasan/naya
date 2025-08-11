import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";

// Generate QR code at build time
export async function generateStaticParams() {
  return [];
}

// Generate the page content at build time
export async function generateMetadata() {
  return {
    title: "Naya | QR",
  };
}

export default async function QRCodePage() {
  // Generate QR code for the company's social links
  // Replace with your actual URL
  const url = process.env.NEXT_PUBLIC_APP_BASE_URL + "/socials";
  const qrCodeDataUrl = await QRCode.toDataURL(url, {
    color: {
      dark: "#555", // Gold color for the QR code dots
      light: "#ffffff", // White background
    },
    errorCorrectionLevel: "H", // High error correction for better readability with custom colors
    margin: 1,
    width: 300,
  });

  return (
    <div className="text-center font-sans rtl" dir="rtl">
      <h2 className="text-xl font-bold my-4">
        امسح الكود للوصول إلى روابط الشركة
      </h2>

      <div className="my-4 mx-auto size-72  flex justify-center items-center relative">
        <Image
          src={qrCodeDataUrl || "/placeholder.svg"}
          alt="QR Code"
          fill
          className="mx-auto   aspect-square"
        />
        <Image
          src={"/logo.png"}
          alt="QR Code"
          width={100}
          height={100}
          className="mx-auto relative"
        />
      </div>

      <div className="mt-5 text-2xl font-bold">
        <Link
          href="/socials"
          target="_blank"
          className="text-[#C13584] no-underline transition-colors hover:text-black hover:underline"
        >
          Naya Marketing
        </Link>
      </div>
    </div>
  );
}
