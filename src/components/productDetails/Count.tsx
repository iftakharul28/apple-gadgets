import type { ChangeEvent } from "react";
import { ActionButton } from "@/components/buttons";
type Props = {
  AddToCard: (key: string, e?: ChangeEvent<HTMLInputElement>) => void;
  qty?: number;
};
const Count = (props: Props) => {
  return (
    <div className="product__actions-wrapper">
      <ActionButton
        type="button"
        className="product__action"
        onClick={() => props.AddToCard("remove")}>
        -
      </ActionButton>
      <label className="visually-hidden" htmlFor="add">
        add
      </label>
      <input
        className="product__action-input"
        type="number"
        name="add"
        id="add"
        value={props.qty ? props.qty : 1}
        onChange={(e) => props.AddToCard("update", e)}
      />
      <ActionButton
        type="button"
        className="product__action"
        onClick={() => props.AddToCard("add")}>
        +
      </ActionButton>
    </div>
  );
};

export default Count;
