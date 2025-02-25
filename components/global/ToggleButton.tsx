import { Dispatch, SetStateAction } from "react";

const ToggleButton = ({value, setValue}: {value: boolean; setValue: Dispatch<SetStateAction<boolean>>}) => {
  return (
    <button onClick={() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      value ? setValue(false) : setValue(true)
    }}
    className="relative w-16 h-7 bg-neutral-950 border-2 border-neutral-800 rounded-md"
    >
      <span className={`absolute top-1/2 -translate-y-1/2  ${value ? "left-10" : "left-1"} w-4 h-4 ${value ? "bg-white" : "bg-neutral-500"} rounded-sm transition-all duration-200`}></span>
    </button>
  )
}
export default ToggleButton