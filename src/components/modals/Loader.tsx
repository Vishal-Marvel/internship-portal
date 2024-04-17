import { useModal } from "@/hooks/use-model-store";
import { cn } from "@/lib/utils";

import { Loader2 } from "lucide-react";

export const LoaderModal = () => {
  const { isOpen, type } = useModal();
  const isModalOpen = isOpen && type == "loader";
  // const isModalOpen = true;

  return (
    <div
      className={cn(
        " fixed top-0 left-0 w-full h-full backdrop-brightness-50 justify-center align-middle items-center z-50",
        isModalOpen ? "block" : "hidden"
      )}
    >
      <div className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative bg-slate-50/50 rounded-full">
          <img
            src="/logo.png"
            className="aspect-auto h-10 absolute z-[100] top-16 left-10"
          />
          <Loader2
            className="text-white animate-spin h-44 w-44 "
            strokeWidth={0.8}
          />
        </div>
      </div>
    </div>
  );
};
