"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SearchOption = ({
  category,
  isActive,
}: {
  category: string;
  isActive: boolean;
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (category) {
      router.replace(`/portfolio/${category}`);
    } else {
      router.replace(`/portfolio`);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={isActive ? "default" : "outline"}
      className={`
        px-6 py-2 rounded-md border-transparent hover:text-primary  transition-all duration-300
        ${
          isActive
            ? "bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-black hover:opacity-90"
            : "border border-[#B8860B]/20 text-[#B8860B] hover:border-[#B8860B]/50 hover:bg-[#B8860B]/10"
        }
      `}
    >
      {category}
    </Button>
  );
};

export default SearchOption;
