import { useState } from "react";
import { ActionButton } from "@/components/buttons";
import type { VariantFormProps, VariantType } from "@/types";
const VarientForm = ({
  item,
  variant,
  setVariant,
}: // setShowVariant,
VariantFormProps) => {
  const [addVariant, setAddVariant] = useState<VariantType>(item);
  return (
    <div>
      <div className="form__row">
        <div className="form__input-group">
          <label htmlFor="color" className="form__label">
            Color
          </label>
          <input
            id="color"
            type="text"
            className="form__input"
            placeholder="Product Color"
            required
            value={addVariant?.color ? addVariant?.color : ""}
            onChange={(e) =>
              setAddVariant({ ...addVariant, color: e.target.value })
            }
          />
        </div>
        <div className="form__input-group">
          <label htmlFor="color" className="form__label">
            Color Code
          </label>
          <input
            id="color"
            type="text"
            className="form__input"
            placeholder="Product Color"
            required
            value={addVariant?.colorCode ? addVariant?.colorCode : ""}
            onChange={(e) =>
              setAddVariant({ ...addVariant, colorCode: e.target.value })
            }
          />
        </div>
      </div>
      <div className="form__row">
        <div className="form__input-group">
          <label htmlFor="size" className="form__label">
            Size
          </label>
          <input
            className="form__input"
            type="text"
            name="size"
            placeholder="Product Size"
            id="size"
            required
            value={addVariant?.size ? addVariant?.size : ""}
            onChange={(e) =>
              setAddVariant({ ...addVariant, size: e.target.value })
            }
          />
        </div>
        <div className="form__input-group">
          <label htmlFor="storage" className="form__label">
            Storage
          </label>
          <input
            className="form__input"
            type="text"
            name="storage"
            placeholder="Product Storage"
            id="storage"
            required
            value={addVariant?.storage ? addVariant?.storage : ""}
            onChange={(e) =>
              setAddVariant({ ...addVariant, storage: e.target.value })
            }
          />
        </div>
      </div>
      <div className="form__row">
        <div className="form__input-group">
          <label htmlFor="variantPrice" className="form__label">
            Variant Price
          </label>
          <input
            id="variantPrice"
            type="text"
            name="variantPrice"
            className="form__input"
            placeholder="Product Variant Price"
            required
            value={addVariant?.price ? addVariant?.price : ""}
            onChange={(e) =>
              setAddVariant({ ...addVariant, price: e.target.value })
            }
          />
        </div>
        <div className="form__input-group">
          <label htmlFor="image" className="form__label">
            Image Url
          </label>
          <input
            className="form__input"
            type="text"
            name="image"
            placeholder="Product Image Url"
            id="image"
            required
            value={addVariant?.image ? addVariant?.image : ""}
            onChange={(e) =>
              setAddVariant({ ...addVariant, image: e.target.value })
            }
          />
        </div>
      </div>
      <div className="form__row">
        <div className="form__input-group">
          <label htmlFor="totalQty" className="form__label">
            Total Qty
          </label>
          <input
            id="totalQty"
            type="text"
            name="totalQty"
            className="form__input"
            placeholder="Product Total Qty"
            required
            value={addVariant?.totalQty ? addVariant?.totalQty : ""}
            onChange={(e) =>
              setAddVariant({ ...addVariant, totalQty: e.target.value })
            }
          />
        </div>
        <div className="form__input-group">
          <label htmlFor="brand" className="form__label">
            Brand
          </label>
          <input
            className="form__input"
            type="text"
            name="brand"
            placeholder="Product Brand"
            id="brand"
            required
            value={addVariant?.brand ? addVariant?.brand : ""}
            onChange={(e) =>
              setAddVariant({ ...addVariant, brand: e.target.value })
            }
          />
        </div>
      </div>
      <ActionButton
        type="button"
        onClick={() => {
          setVariant([
            ...variant,
            {
              ...addVariant,
            },
          ]);
        }}>
        Update Varient
      </ActionButton>
    </div>
  );
};

export default VarientForm;
