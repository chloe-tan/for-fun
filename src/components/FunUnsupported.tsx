import FunTypography from "./FunTypography";
import { InfoIcon } from "./Icons";

/**
 * Simple version of a empty segment / unsupported banner component
 */
export default function FunUnsupported() {
  return (
    <div className="flex flex-row gap-2 items-center bg-gray-100 py-2 px-3 rounded-md">
      <InfoIcon sizeClass="w-4 h-4" colorClass="text-fdark"/>
      <FunTypography level={4} fontWeight="font-[500]" textColor="text-fdark">Unsupported operation ⛑️</FunTypography>
    </div>
  )
}