import FunTypography from "./FunTypography";
import { CheckIcon } from "./Icons";
import useToast from "./hooks/useToast";

export default function ToastComponent() {
  const [{ showToast, toastMessageInfo }] = useToast();

  return showToast ? (
    <div className="fade-out toast absolute top-4 left-4 right-4 z-50 flex flex-row">
      <div id="toast-default" className="flex justify-between gap-2 items-center w-full py-3 px-4 bg-[#1A1C26] rounded-[40px] min-w-[100px]" role="alert">
        <div className="flex flex-row gap-2 items-center">
          {toastMessageInfo?.prefix ? toastMessageInfo?.prefix : <CheckIcon colorClass="text-fgreensuccess" sizeClass="h-4 w-4" />}
          <FunTypography level={4} fontWeight="font-normal" textColor="text-fwhite">{toastMessageInfo?.message}</FunTypography>
        </div>
        <button type="button" className="hover:opacity-70" data-dismiss-target="#toast-default" aria-label="Close" onClick={toastMessageInfo?.suffixAction}>
          {toastMessageInfo?.suffix ? toastMessageInfo?.suffix : <FunTypography level={4} textColor="text-fwhite">View</FunTypography>}
        </button>
      </div>
    </div>
  ) : null
}