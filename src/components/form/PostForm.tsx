import { useState } from "react";
import { api } from "@/utils/api";
import { CategorySelect, ColorSelect, StorageSelect } from "@/components/index";
import type {
  ColorType,
  StorageType,
  ProductType,
  CategoryType,
} from "@/types/index";
const PostForm = ({ categories }: { categories?: CategoryType[] }) => {
  const [product, setProduct] = useState<ProductType | null>({
    title: "",
    description: "",
    brand: "",
    price: 0,
    published: false,
  });
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [color, setColor] = useState<ColorType[]>([]);
  const [storage, setStorage] = useState<StorageType[]>([]);
  const { mutate: addPost } = api.product.addProduct.useMutation({
    onSuccess(data) {
      setProduct({
        title: "",
        description: "",
        brand: "",
        price: 0,
        published: false,
      });
      setCategory([]);
      setColor([]);
      setStorage([]);
      console.log(data);
    },
    onError(e) {
      console.error(e);
    },
  });
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
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
            value={product?.brand ? product?.brand : ""}
          />
        </div>
      </div>
      <div className="form__row">
        <div className="form__input-group">
          <label htmlFor="color" className="form__label">
            Color
          </label>
          <ColorSelect color={color} setColor={setColor} />
        </div>
        <div className="form__input-group">
          <label htmlFor="storage" className="form__label">
            Storage
          </label>
          <StorageSelect storage={storage} setStorage={setStorage} />
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
      </div>
      <div className="form__input-group">
        <label htmlFor="description" className="form__label">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          className="form__textarea"
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          value={product?.description ? product?.description : ""}
          cols={30}
          rows={10}></textarea>
      </div>
      <button
        type="button"
        className="form__button"
        onClick={() => {
          addPost({ ...product, color, storage, category });
        }}>
        post
      </button>
    </form>
  );
};

export default PostForm;
