import type { IconClassType } from "@/types/index";
const HamburgerIcon = ({ className }: IconClassType) => {
  return (
    <svg
      className={className ? `${className}` : ""}
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <line
        x1="1.26758"
        y1="1.89355"
        x2="20.1207"
        y2="1.89355"
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="round"></line>
      <line
        x1="1.26758"
        y1="7.15576"
        x2="20.1207"
        y2="7.15576"
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="round"></line>
      <line
        x1="1.26758"
        y1="12.6309"
        x2="20.1207"
        y2="12.6309"
        stroke="currentcolor"
        strokeWidth="2"
        strokeLinecap="round"></line>
    </svg>
  );
};

export default HamburgerIcon;
