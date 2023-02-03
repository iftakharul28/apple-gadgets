import { useState } from "react";
import { api } from "@/utils/api";
import { CategorySelect, VarientForm, VarientSelect } from "@/components/index";
import type { VariantType, ProductType, CategoryType } from "@/types/index";
const PostForm = ({ categories }: { categories?: CategoryType[] }) => {
  const [product, setProduct] = useState<ProductType | null>({
    title: "",
    description: "",
    price: 0,
    published: false,
  });
  const [variant, setVariant] = useState<VariantType[]>([]);
  const [showVariant, setShowVariant] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryType[]>([]);
  const { mutate: addPost } = api.product.addProduct.useMutation({
    onSuccess(data) {
      setProduct({
        title: "",
        description: "",
        price: 0,
        published: false,
      });
      setCategory([]);
      console.log(data);
    },
    onError(e) {
      console.error(e);
    },
  });
  console.log(variant);
  return (
    <form className="form login__card-body" role="form">
      <div className="form__row">
        <div className="form__input-group">
          <label htmlFor="title" className="form__label">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="form__input"
            placeholder="Product Title"
            required
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            value={product?.title ? product?.title : ""}
          />
        </div>
        <div className="form__input-group">
          <label htmlFor="price" className="form__label">
            Price
          </label>
          <input
            className="form__input"
            type="number"
            name="price"
            placeholder="Product Price"
            id="price"
            required
            onChange={(e) =>
              setProduct({ ...product, price: Number(e.target.value) })
            }
            value={product?.price ? product?.price : ""}
          />
        </div>
      </div>
      <div className="form__row">
        <div className="form__input-group">
          <label htmlFor="category" className="form__label">
            Category
          </label>
          <CategorySelect
            categories={categories}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div className="form__input-group">
          <label htmlFor="image" className="form__label">
            Image
          </label>
          <input
            className="form__input"
            type="text"
            name="image"
            placeholder="Product Image"
            id="image"
            required
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            value={product?.image ? product?.image : ""}
          />
        </div>
      </div>
      {variant?.map((item, i) => (
        <VarientForm
          item={item}
          variant={variant}
          setShowVariant={setShowVariant}
          setVariant={setVariant}
          key={i}
        />
      ))}
      {showVariant ? (
        <div className="form__input-group form__popup">
          <div className="form__popup-wrapper">
            <h2>Varient</h2>
            <VarientSelect
              variant={variant}
              setVariant={setVariant}
              setShowVariant={setShowVariant}
            />
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setShowVariant(true)}>
          Add Varient
        </button>
      )}

      <div className="form__input-group form__checkbox-group">
        <label htmlFor="publish" className="form__label">
          Published
        </label>
        <input
          type="checkbox"
          id="publish"
          name="publish"
          className="form__checkbox-input"
          checked={product?.published}
          onChange={() =>
            setProduct({ ...product, published: !product?.published })
          }
        />
      </div>
      <div className="form__input-group">
        <label htmlFor="description" className="form__label">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          className="form__textarea"
          cols={30}
          rows={10}></textarea>
      </div>
      <button
        type="button"
        className="form__button"
        onClick={() => {
          addPost({ ...product, variant, category });
        }}>
        post
      </button>
    </form>
  );
};

export default PostForm;
