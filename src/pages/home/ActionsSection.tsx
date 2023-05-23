import FunButton from "@/components/FunButton";
import { SendIcon, SwapIcon } from "@/components/Icons";
import { SEND_ROUTE_BASE, SWAP_ROUTE_BASE } from "@/const/routes";
import { swapTokens } from "@/utils/funService";
import { useRouter } from "next/router";
import { useCallback } from "react";

export default function ActionsSection() {
  const router = useRouter();
  const handleRedirect = useCallback((route: string) => {
    router.push(route);
  }, [router]);
  return (
    <div id="actions-section" className="flex flex-row gap-2 py-6">
      <FunButton text="Swap" type="secondary" onClick={() => handleRedirect(SWAP_ROUTE_BASE)} prefixIcon={<SwapIcon sizeClass="w-5 h-5" colorClass="text-fdarkblue" />} />
      <FunButton 
        text="Send" 
        type="primary" 
        // onClick={() => swapTokens()}
        onClick={() => handleRedirect(SEND_ROUTE_BASE)} 
        prefixIcon={<SendIcon sizeClass="w-5 h-5" colorClass="text-fwhite" />} 
      />
    </div>
  )
}