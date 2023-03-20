import { ActionButton } from "@/components/buttons";
const Alart = ({
  heading,
  text,
  close,
}: {
  heading?: string | null;
  text?: string | null;
  close?: () => void;
}) => {
  return (
    <section className="alart">
      <div className="alart__wrapper">
        <div className="alart__content">
          <p className="alart__heading">{heading}</p>
          {text && <p className="alart__text">{text}</p>}
          <ActionButton className="alart__button" type="button" onClick={close}>
            close
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default Alart;
