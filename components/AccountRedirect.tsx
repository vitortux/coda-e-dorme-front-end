import { useRouter } from "next/navigation";

type AccountRedirectButtonProps = {
  text: string;
  route: string;
};

export default function AccountRedirectButton({
  text,
  route,
}: AccountRedirectButtonProps) {
  const router = useRouter();

  return (
    <button
      className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 ring-inset"
      onClick={() => router.push(route)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-4 h-4 inline-block align-text-top"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
        />
      </svg>
      <span className="inline-block ml-1">{text}</span>
    </button>
  );
}
