"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import qs from "query-string";

type Props = {
  label: string;
  value?: string;
  icon?: any;
};

const CategoryItem: React.FC<Props> = ({ label, icon: Icon, value }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-[#6f3823] transition",
        isSelected && "border-[#6f3823] bg-[#6f3823]/20 [#6f3823]"
      )}
      type="button">
      {Icon && <img className="w-4 h-4" src={Icon} alt={label} />}
      <div className="truncate">{label}</div>
    </button>
  );
};

export default CategoryItem;
