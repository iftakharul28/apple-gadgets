import { useState } from "react";
import type { ColorType, ColorProps } from "@/types/index";
import { CloseIcon, DownIcon, PlusIcon } from "@/components/icons";
const ColorSelect = ({ color, setColor }: ColorProps) => {
  const [addColor, setAddColor] = useState<ColorType>({
    color: "",
    colorCode: "",
    image: "",
    price: 0,
    totalQty: 0,
  });
  const [show, setShow] = useState<boolean>(false);
  const [showTag, setShowTag] = useState<boolean>(false);
  return (
    <div className="select form__input">
      <div className="select__wrapper">
        {color && color.length > 0 && (
          <>
            {color?.map(({ color, id }: ColorType) => (
              <div className="select__items" key={id}>
                <p
                  className="select__item-title"
                  contentEditable={true}
                  suppressContentEditableWarning={true}>
                  {color}
                </p>
                <div
                  className="select__icon"
                  onClick={() =>
                    setColor((prevNotes: ColorType[]) =>
                      prevNotes.filter((note) => note.id !== id)
                    )
                  }>
                  <CloseIcon className="select__icon" />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="select__icon-wrapper" onClick={() => setShow(!show)}>
        <DownIcon className="select__icon" />
      </div>
      {show && (
        <div className="select__option-wrapper">
          {showTag ? (
            <div className="select__form">
              <div className="form__row  select__form-row">
                <div className="form__input-group">
                  <label htmlFor="color" className="form__label">
                    Color
                  </label>
                  <input
                    id="color"
                    type="text"
                    className="form__input"
                    placeholder="Color"
                    required
                    value={addColor.color ? addColor.color : ""}
                    onChange={(e) => {
                      setAddColor({ ...addColor, color: e.target.value });
                    }}
                  />
                </div>
                <div className="form__input-group">
                  <label htmlFor="colorCode" className="form__label">
                    Color Code
                  </label>
                  <input
                    id="colorCode"
                    type="text"
                    className="form__input"
                    placeholder="Color Code"
                    required
                    value={addColor.colorCode ? addColor.colorCode : ""}
                    onChange={(e) => {
                      setAddColor({ ...addColor, colorCode: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="form__row  select__form-row">
                <div className="form__input-group">
                  <label htmlFor="price" className="form__label">
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    className="form__input"
                    placeholder="Price"
                    required
                    value={addColor.price ? addColor.price : ""}
                    onChange={(e) => {
                      setAddColor({
                        ...addColor,
                        price: Number(e.target.value),
                      });
                    }}
                  />
                </div>
                <div className="form__input-group">
                  <label htmlFor="totalQty" className="form__label">
                    Total Qty
                  </label>
                  <input
                    id="totalQty"
                    type="number"
                    className="form__input"
                    placeholder="Total Qty"
                    required
                    value={addColor.totalQty ? addColor.totalQty : ""}
                    onChange={(e) => {
                      setAddColor({
                        ...addColor,
                        totalQty: Number(e.target.value),
                      });
                    }}
                  />
                </div>
              </div>
              <div className="form__row  select__form-row">
                <div className="form__input-group">
                  <label htmlFor="image" className="form__label">
                    Image
                  </label>
                  <input
                    id="image"
                    type="text"
                    className="form__input"
                    placeholder="Image"
                    required
                    value={addColor.image ? addColor.image : ""}
                    onChange={(e) => {
                      setAddColor({ ...addColor, image: e.target.value });
                    }}
                  />
                </div>
              </div>
              <button
                type="button"
                className="select__option-button"
                onClick={() => {
                  setColor([
                    ...color,
                    {
                      ...addColor,
                      id: Math.random().toString(),
                    },
                  ]);
                  setAddColor({
                    color: "",
                    colorCode: "",
                    image: "",
                    price: 0,
                    totalQty: 0,
                  });
                  setShowTag(!showTag);
                }}>
                <PlusIcon className="select__option-icon select__icon" />
                add item
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="select__option-button"
              onClick={() => setShowTag(!showTag)}>
              <PlusIcon className="select__option-icon select__icon" />
              add item
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ColorSelect;
