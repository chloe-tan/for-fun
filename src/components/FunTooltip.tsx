import { Fragment, ReactNode } from "react";

interface FunTooltipProps {
  tooltipText?: string;
  children: ReactNode;
}

export default function FunTooltip({ tooltipText = "", children }: FunTooltipProps) {
  return (
    <Fragment>
      <div data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom">
        {children}
      </div>
      <div id="tooltip-bottom" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-fwhite bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        {tooltipText}
        <div className="tooltip-arrow" data-popper-arrow />
      </div>
    </Fragment>
  )
}