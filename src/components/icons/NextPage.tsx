import type { IconClassType } from "@/types/index";
const NextPage = ({ className }: IconClassType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className ? `h-6 w-6 ${className}` : "h-6 w-6"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
export default NextPage;
