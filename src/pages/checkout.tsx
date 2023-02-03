import { CheckoutForm } from "@/components";
import { Layout } from "@/layout";
import { useCart } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";

const Checkout = () => {
  const cartList = useCart((state) => state?.cartList);
  const [totalCart, setTotalCart] = useState<typeof cartList>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [coupon, setCupon] = useState<string>("");
  useEffect(() => {
    setTotalCart(cartList);
    let sum = 0;
    cartList?.map(({ total }: { total?: number }) => (sum += total || 0));
    setTotalCost(sum);
  }, [cartList]);
  const cuponCheck = (key: string) => {
    if (
      key.startsWith("Discount5") ||
      key.startsWith("Discount10") ||
      key.startsWith("Special100")
    ) {
      if (key.startsWith("Discount5")) {
        setTotalCost(totalCost - 5);
      }
      if (key.startsWith("Discount10")) {
        setTotalCost(totalCost - 10);
      }
      if (key.startsWith("Special100")) {
        setTotalCost(totalCost - 100);
      }
    }
  };
  return (
    <Layout title="Checkout" description="Checkout Page">
      <section className="checkout">
        <div className="container">
          <div className="checkout__wrappper">
            <div className="checkout__form">
              <h1 className="checkout__heading">Products</h1>
              <div className="checkout__form">
                <CheckoutForm />
              </div>
            </div>
            <div className="checkout__table">
              <h1 className="checkout__heading">Order Summary</h1>
              <div className="checkout__table-box">
                <p className="checkout__table-text">Product</p>
                <p className="checkout__table-text">Price</p>
              </div>

              {totalCart?.map(({ title, qty, price, id }) => (
                <div className="checkout__table-box" key={id}>
                  <p className="checkout__table-title">{title}</p>
                  <p className="checkout__table-text">
                    {qty} X {price}
                  </p>
                </div>
              ))}
              <div className="checkout__table-wrapper">
                <p className="checkout__table-text">
                  Start adding items to your checkout
                </p>
                <hr className="checkout__table-hr" />
                <div className="checkout__table-box">
                  <p className="checkout__table-text">Total Price:</p>
                  <p className="checkout__table-title">BDT {totalCost}</p>
                </div>
                <div className="checkout__table-box">
                  <p className="checkout__table-text">Delivery Charges:</p>
                  <p className="checkout__table-title">BDT 100</p>
                </div>
                <form className="checkout__table-form">
                  <label className="visually-hidden" htmlFor="coupon">
                    coupon
                  </label>
                  <input
                    className="checkout__table-form-input"
                    type="text"
                    placeholder="Enter Your Coupon"
                    name="coupon"
                    id="coupon"
                    value={coupon}
                    onChange={(e) => setCupon(e.target.value)}
                  />
                  <button
                    className="checkout__button"
                    type="button"
                    onClick={() => cuponCheck(coupon)}>
                    Apply
                  </button>
                </form>
                <hr className="checkout__table-hr checkout__table-hr--secondery" />
                <div className="checkout__table-box">
                  <p className="checkout__table-title--secondery">
                    Total Price:
                  </p>
                  <p className="checkout__table-title">BDT {totalCost + 100}</p>
                </div>
                <Link href="checkout">
                  <button
                    type="button"
                    className="checkout__button  checkout__button--secondery">
                    Place Order
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
