export default function SubmitButton({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="bg-black text-white w-full py-2.5 rounded-lg text-sm shadow-sm font-semibold text-center inline-block cursor-pointer transition duration-200 transform hover:scale-102"
    >
      <span className="inline-block mr-2">{text}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-4 h-4 inline-block"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </button>
  );
}
