import { useState } from "react";
import type { CategoryType, CategoryProps } from "@/types/index";
import { CloseIcon, DownIcon, PlusIcon } from "@/components/icons";
const CategorySelect = ({
  categories,
  category,
  setCategory,
}: CategoryProps) => {
  const [addCategory, setAddCategory] = useState<CategoryType>({
    name: "",
  });
  const [show, setShow] = useState<boolean>(false);
  const [showTag, setShowTag] = useState<boolean>(false);
  return (
    <div className="select form__input">
      <div className="select__wrapper">
        {category && category.length > 0 && (
          <>
            {category?.map(({ name, id }: CategoryType) => (
              <div className="select__items" key={id}>
                <p
                  className="select__item-title"
                  contentEditable={true}
                  suppressContentEditableWarning={true}>
                  {name}
                </p>
                <div
                  className="select__icon"
                  onClick={() =>
                    setCategory((prevNotes: CategoryType[]) =>
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
          <div className="select__options scrollbar-hidden">
            {categories?.map(({ name, id }: CategoryType, i: number) => (
              <div
                className="select__option"
                key={i + 1}
                onClick={() => setCategory([...category, { name, id }])}>
                <p>{i + 1}.</p>
                <p>{name}</p>
              </div>
            ))}
          </div>
          {showTag ? (
            <div className="select__form">
              <div className="form__row  select__form-row">
                <div className="form__input-group">
                  <label htmlFor="name" className="form__label">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form__input"
                    placeholder="Name"
                    required
                    value={addCategory.name ? addCategory.name : ""}
                    onChange={(e) => {
                      setAddCategory({ ...addCategory, name: e.target.value });
                    }}
                  />
                </div>
              </div>
              <button
                type="button"
                className="select__option-button"
                onClick={() => {
                  setCategory([
                    ...category,
                    {
                      name: addCategory.name,
                      id: Math.random().toString(),
                    },
                  ]);
                  setAddCategory({
                    name: "",
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

export default CategorySelect;
