export default function Tooltip({ tooltipText = "" }) {

  return (
    <div id="tooltip-bottom" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
      {tooltipText}
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
  )
}