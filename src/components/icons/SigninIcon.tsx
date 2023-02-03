import type { IconClassType } from "@/types/index";
const SigninIcon = ({ className }: IconClassType) => {
  return (
    <svg
      className={className ? `${className}` : ""}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width="12"
      height="12"
      viewBox="0 0 256 256"
      xmlSpace="preserve">
      <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
        <path
          d="M 64.797 45 c 0 0.586 -0.205 1.173 -0.616 1.644 L 50.92 61.839 c -0.908 1.041 -2.487 1.148 -3.527 0.24 c -1.04 -0.909 -1.146 -2.489 -0.24 -3.527 L 58.979 45 L 47.152 31.447 c -0.907 -1.04 -0.799 -2.62 0.24 -3.527 c 1.04 -0.907 2.619 -0.8 3.527 0.24 l 13.261 15.196 C 64.592 43.827 64.797 44.414 64.797 45 z"
          style={{ strokeWidth: 2 }}
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 64.797 45 c 0 1.381 -1.119 2.5 -2.5 2.5 H 27.704 c -1.381 0 -2.5 -1.119 -2.5 -2.5 s 1.119 -2.5 2.5 -2.5 h 34.593 C 63.678 42.5 64.797 43.619 64.797 45 z"
          style={{ strokeWidth: 2 }}
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
        <path
          d="M 90 45 c 0 24.813 -20.187 45 -45 45 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 C 69.813 0 90 20.187 90 45 z M 5 45 c 0 22.056 17.944 40 40 40 c 22.056 0 40 -17.944 40 -40 C 85 22.944 67.056 5 45 5 C 22.944 5 5 22.944 5 45 z"
          style={{ strokeWidth: 2 }}
          transform=" matrix(1 0 0 1 0 0) "
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default SigninIcon;
