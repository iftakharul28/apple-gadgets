import type { ChangeEvent } from "react";
type CountType = {
  AddToCard: (key: string, e?: ChangeEvent<HTMLInputElement>) => void;
  qty?: number;
};
const Count = ({ AddToCard, qty }: CountType) => {
  return (
    <div className="product__actions-wrapper">
      <button
        type="button"
        className="product__action"
        onClick={() => AddToCard("remove")}>
        -
      </button>
      <label className="visually-hidden" htmlFor="add">
        add
      </label>
      <input
        className="product__action-input"
        type="number"
        name="add"
        id="add"
        value={qty ? qty : 1}
        onChange={(e) => AddToCard("update", e)}
      />
      <button
        type="button"
        className="product__action"
        onClick={() => AddToCard("add")}>
        +
      </button>
    </div>
  );
};

export default Count;
