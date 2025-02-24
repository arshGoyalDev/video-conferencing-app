import Link from "next/link";

const ModalHeader = ({ title }: { title: string }) => {
  return (
    <div className="py-3 px-4 flex items-center justify-between border-b-2 border-neutral-800">
      <h2 className="text-lg">{title}</h2>
      <Link href="/app">
        <span className="stroke-white">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.16998 14.83L14.83 9.17004"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.83 14.83L9.16998 9.17004"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
};
export default ModalHeader;
