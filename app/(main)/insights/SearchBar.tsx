"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" />
      <Input
        type="text"
        placeholder="Search articles..."
        value={searchParams.get("category") || ""}
        onChange={(e) => params.set("category", e.target.value)}
        className="w-full pl-12 pr-4 py-6 bg-black/50 border border-[#FFD700]/20 text-white placeholder:text-zinc-400 focus:border-[#FFD700]/50 transition-colors"
      />
    </div>
  );
};

export default SearchBar;
