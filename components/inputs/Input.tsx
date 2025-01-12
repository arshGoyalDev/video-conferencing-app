import { Dispatch, SetStateAction } from "react";

const Input = ({
  value,
  setValue,
  error,
  type,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error?: string;
  type: string;
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-neutral-700 uppercase font-bold">{type}</h2>
      <input
        type="text"
        name={type}
        id={type}
        value={value}
        autoComplete="off"
        autoFocus={true}
        onChange={(e) => setValue(e.target.value)}
        placeholder={type === "name" ? "John Doe" : "johnDoe@domain"}
        className={` w-full py-3 px-5 bg-neutral-900 rounded-lg placeholder:text-neutral-700 border-2 border-transparent`}
      />
      {error && (
        <>{error !== "" && <p className="text-red-500 mt-3">{error}</p>}</>
      )}
    </div>
  );
};

export default Input;
