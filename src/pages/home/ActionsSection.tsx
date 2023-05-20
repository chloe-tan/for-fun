import FunButton from "@/components/FunButton";
import { SendIcon, SwapIcon } from "@/components/Icons";

export default function ActionsSection() {
  return (
    <div id="actions-section" className="flex flex-row gap-2 py-6">
      <FunButton text="Swap" type="secondary" prefixIcon={<SwapIcon sizeClass="w-5 h-5" colorClass="text-fdarkblue" />} />
      <FunButton text="Send" type="primary" prefixIcon={<SendIcon sizeClass="w-5 h-5" colorClass="text-fwhite" />} />
    </div>
  )
}