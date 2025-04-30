import { useRouter } from "next/navigation";

export default function GoToHomeButton() {
  const router = useRouter();

  return (
    <button
      className="transition duration-200 mx-5 px-6 py-5 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 ring-inset"
      onClick={() => router.push("/")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5 inline-block align-text-top"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      <span className="inline-block ml-2">Página inicial</span>
    </button>
  );
}
