import Image from "next/image";
import { Globe, Facebook, Instagram } from "lucide-react";

export default function SocialsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-10">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/logoWithText.png"
          alt="Naya"
          width={240}
          height={120}
          className="mx-auto"
        />
      </div>

      {/* Arabic Heading */}
      <h2 className="text-xl mb-8 font-medium text-center" dir="rtl">
        تابعنا على وسائل التواصل
      </h2>

      {/* Social Media Links */}
      <div className="w-full max-w-md px-4 space-y-4">
        <a
          href="https://goldenrootsmarketing.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white text-black py-3 px-6 rounded-md w-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-blue-600">
            <Globe size={24} />
          </span>
          <span className="font-medium">Website</span>
          <span className="w-6"></span> {/* Spacer for alignment */}
        </a>

        <a
          href="https://www.facebook.com/share/1LjVVQ9Ndo/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white text-black py-3 px-6 rounded-md w-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-blue-600">
            <Facebook size={24} />
          </span>
          <span className="font-medium">Facebook</span>
          <span className="w-6"></span> {/* Spacer for alignment */}
        </a>

        <a
          href="https://wa.me/message/CWPHDPCVVYSUE1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white text-black py-3 px-6 rounded-md w-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-green-500">
            <WhatsAppIcon />
          </span>
          <span className="font-medium">WhatsApp</span>
          <span className="w-6"></span> {/* Spacer for alignment */}
        </a>

        <a
          href="https://snapchat.com/t/oU4pJx4C"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white text-black py-3 px-6 rounded-md w-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-yellow-400">
            <SnapchatIcon />
          </span>
          <span className="font-medium">Snapchat</span>
          <span className="w-6"></span> {/* Spacer for alignment */}
        </a>

        <a
          href="https://www.tiktok.com/@goldenroots0?_t=ZS-8vTNbGiAe0u&_r=1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white text-black py-3 px-6 rounded-md w-full hover:bg-gray-100 transition-colors"
        >
          <span>
            <TikTokIcon />
          </span>
          <span className="font-medium">TikTok</span>
          <span className="w-6"></span> {/* Spacer for alignment */}
        </a>

        <a
          href="https://www.instagram.com/goldenrootsmarketingmanagement?igsh=MTk2dnI0azBwZWM1eg%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white text-black py-3 px-6 rounded-md w-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-pink-600">
            <Instagram size={24} />
          </span>
          <span className="font-medium">Instagram</span>
          <span className="w-6"></span> {/* Spacer for alignment */}
        </a>
      </div>
    </div>
  );
}

// Custom icons for platforms without Lucide equivalents
function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function SnapchatIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12.206 21.844c-.11 0-.217-.003-.325-.01a4.573 4.573 0 01-.8-.114 4.631 4.631 0 01-1.635-.702 4.362 4.362 0 01-.955-.863 4.051 4.051 0 01-.62-1.126 3.768 3.768 0 01-.19-.548c-.01-.04-.02-.078-.023-.1-.063-.278-.13-.455-.401-.615-.26-.154-.694-.244-1.29-.274a.638.638 0 01-.07-.005.402.402 0 01-.067-.007.337.337 0 01-.252-.158.339.339 0 01-.027-.321c.186-.423.999-.686 1.468-.822.04-.012.078-.022.112-.033.33-.1.42-.192.457-.278a2.94 2.94 0 00.077-.507c.01-.11-.059-.22-.176-.278-.05-.025-.097-.04-.142-.056a6.263 6.263 0 01-.743-.31 2.486 2.486 0 01-.987-.73 1.97 1.97 0 01-.36-1.254c.022-.433.22-.817.54-1.05a1.243 1.243 0 011.3-.124c.155.077.29.186.418.29.013.01.026.02.038.03.195.147.37.214.524.214a.76.76 0 00.286-.06l-.012-.238c-.055-1.343-.123-3.013.26-3.94.142-.342.368-.642.673-.895a3.04 3.04 0 011.026-.583c.397-.13.82-.197 1.258-.197.439 0 .858.066 1.246.194.388.128.74.328 1.046.595.306.267.53.57.67.9.382.926.314 2.597.26 3.94l-.012.238a.76.76 0 00.286.06c.153 0 .329-.067.524-.213.012-.01.025-.02.038-.03.127-.105.263-.214.418-.291a1.243 1.243 0 011.3.123c.32.234.518.618.54 1.051.022.433-.095.858-.36 1.254-.264.396-.59.605-.987.73-.264.11-.51.214-.743.31-.045.016-.092.031-.142.056-.117.058-.186.168-.176.278.015.168.04.338.077.507.037.086.127.178.457.278.034.01.072.021.112.033.47.136 1.282.399 1.468.822a.339.339 0 01-.027.321.337.337 0 01-.252.158.402.402 0 01-.068.007.638.638 0 01-.07.005c-.595.03-1.03.12-1.289.274-.271.16-.338.337-.4.616-.004.02-.014.059-.024.099a3.768 3.768 0 01-.19.548 4.051 4.051 0 01-.62 1.126c-.28.338-.598.624-.955.863a4.631 4.631 0 01-1.635.702 4.573 4.573 0 01-.8.114c-.108.007-.215.01-.325.01z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}
