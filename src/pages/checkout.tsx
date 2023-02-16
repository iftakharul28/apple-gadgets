import { useEffect, useState } from "react";
import Link from "next/link";
import { Alart, CheckoutForm } from "@/components";
import { Layout } from "@/layout";
import { useCart, useCupon } from "@/store";

const Checkout = () => {
  const cartList = useCart((state) => state?.cartList);
  const finalPrice = useCart((state) => state?.finalPrice);
  const addFinalPrice = useCart((state) => state?.addFinalPrice);
  const [alart, setAlart] = useState<boolean>(false);
  const cuponList = useCupon((state) => state?.cuponList);
  const setCuponList = useCupon((state) => state?.setCuponList);
  const [totalCart, setTotalCart] = useState<typeof cartList>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [coupon, setCupon] = useState<string>("");
  useEffect(() => {
    setTotalCart(cartList);
    // let sum = 0;
    // cartList?.map(({ total }: { total?: number }) => (sum += total || 0));
    const sum = cartList.reduce((a, b) => a + b.price * b.qty, 0);
    addFinalPrice({ price: sum });
    setTotalCost(finalPrice);
  }, [cartList]);
  const cuponCheck = (key: string) => {
    const find = cuponList.some((item) => item.name === key);
    if (!find) {
      if (
        key.startsWith("Discount5") ||
        key.startsWith("Discount10") ||
        key.startsWith("Special100")
      ) {
        if (key.startsWith("Discount5")) {
          setCuponList({ name: "Discount5" });
          addFinalPrice({ price: totalCost - 5 });
          setTotalCost(totalCost - 5);
        }
        if (key.startsWith("Discount10")) {
          setCuponList({ name: "Discount10" });
          addFinalPrice({ price: totalCost - 10 });
          setTotalCost(totalCost - 10);
        }
        if (key.startsWith("Special100")) {
          setCuponList({ name: "Special100" });
          addFinalPrice({ price: totalCost - 100 });
          setTotalCost(totalCost - 100);
        }
      }
    } else {
      setAlart(true);
    }
  };
  return (
    <Layout title="Checkout">
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
                    disabled={cartList.length === 0}
                    type="button"
                    className="checkout__button  checkout__button--secondery">
                    Place Order
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {alart ? (
          <Alart
            heading="coupon Code Issue"
            text="Sorry...You have already tried this coupon code"
            close={() => setAlart(false)}
          />
        ) : null}
      </section>
    </Layout>
  );
};

export default Checkout;
