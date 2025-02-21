import { Dispatch, SetStateAction, useState } from "react";

const EditInput = ({
  value,
  setValue,
  className,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  className?: string;
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className={`relative w-full ${className}`}>
      <div className="rounded-md bg-neutral-800 border-2 border-neutral-700">
        {editing ? (
          <input
            type="text"
            name="value-edit"
            autoComplete="off"
            autoFocus={true}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="bg-transparent w-full py-2 px-3"
          />
        ) : (
          <div className="py-2 px-3 ">{value !== "" ? value : (
            <span className="text-neutral-400">First Name</span>
          )}</div>
        )}

        <button
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            editing ? setEditing(false) : setEditing(true);
          }}
          className="absolute right-2 top-2 p-1 bg-neutral-900 border-2 border-neutral-700 rounded-md"
        >
          <span className="stroke-white">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.26 3.59997L5.04997 12.29C4.73997 12.62 4.43997 13.27 4.37997 13.72L4.00997 16.96C3.87997 18.13 4.71997 18.93 5.87997 18.73L9.09997 18.18C9.54997 18.1 10.18 17.77 10.49 17.43L18.7 8.73997C20.12 7.23997 20.76 5.52997 18.55 3.43997C16.35 1.36997 14.68 2.09997 13.26 3.59997Z"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.89 5.05005C12.32 7.81005 14.56 9.92005 17.34 10.2"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 22H21"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};
export default EditInput;
