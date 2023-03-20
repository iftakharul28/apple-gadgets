type Props = {
  className?: string;
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
  disabled?: boolean;
};
const ActionButton = (props: Props) => {
  return (
    <button
      className={props.className}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      style={{ cursor: props.disabled ? "not-allowed" : "" }}>
      {props.children}
    </button>
  );
};

export default ActionButton;
