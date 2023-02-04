import { useState } from "react";
import type { StorageType, StorageProps } from "@/types/index";
import { CloseIcon, DownIcon, PlusIcon } from "@/components/icons";
const StorageSelect = ({ storage, setStorage }: StorageProps) => {
  const [addStorage, setAddStorage] = useState<StorageType>({
    storage: "",
    price: 0,
    totalQty: 0,
  });
  const [show, setShow] = useState<boolean>(false);
  const [showTag, setShowTag] = useState<boolean>(false);
  return (
    <div className="select form__input">
      <div className="select__wrapper">
        {storage && storage.length > 0 && (
          <>
            {storage?.map(({ storage, id }: StorageType) => (
              <div className="select__items" key={id}>
                <p
                  className="select__item-title"
                  contentEditable={true}
                  suppressContentEditableWarning={true}>
                  {storage}
                </p>
                <div
                  className="select__icon"
                  onClick={() =>
                    setStorage((prevNotes: StorageType[]) =>
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
                  <label htmlFor="price" className="form__label">
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    className="form__input"
                    placeholder="Price"
                    required
                    value={addStorage.price ? addStorage.price : ""}
                    onChange={(e) => {
                      setAddStorage({
                        ...addStorage,
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
                    value={addStorage.totalQty ? addStorage.totalQty : ""}
                    onChange={(e) => {
                      setAddStorage({
                        ...addStorage,
                        totalQty: Number(e.target.value),
                      });
                    }}
                  />
                </div>
              </div>
              <div className="form__row  select__form-row">
                <div className="form__input-group">
                  <label htmlFor="storage" className="form__label">
                    storage
                  </label>
                  <input
                    id="storage"
                    type="text"
                    className="form__input"
                    placeholder="Storage"
                    required
                    value={addStorage.storage ? addStorage.storage : ""}
                    onChange={(e) => {
                      setAddStorage({
                        ...addStorage,
                        storage: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <button
                type="button"
                className="select__option-button"
                onClick={() => {
                  setStorage([
                    ...storage,
                    {
                      ...addStorage,
                      id: Math.random().toString(),
                    },
                  ]);
                  setAddStorage({
                    storage: "",
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

export default StorageSelect;
