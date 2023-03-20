import { useEffect, useState } from "react";
import { useCart } from "@/store";
import { CartList } from "@/components";
import { ActionButton } from "@/components/buttons";
import Link from "next/link";

const CartWrapper = () => {
  const cartList = useCart((state) => state?.cartList);
  const cart = useCart((state) => state?.cart);
  const [totalCart, setTotalCart] = useState<typeof cartList>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  useEffect(() => {
    setTotalCart(cartList);
    // let sum = 0;
    // cartList?.map(({ total }: { total?: number }) => (sum += total || 0));
    const sum = cartList.reduce((a, b) => a + b.price * b.qty, 0);
    setTotalCost(sum);
  }, [cartList]);

  const [total, setTotal] = useState<number>(0);
  useEffect(() => setTotal(cart), [cart]);
  return (
    <div className="cart__wrappper">
      <div className="cart__product">
        <h1 className="cart__product-heading">Products</h1>
        <div className="cart__product-list">
          {totalCart.length > 0 ? (
            <>
              {totalCart?.map((item, i) => (
                <CartList item={item} key={i} />
              ))}
            </>
          ) : (
            <p className="cart__table-text">Start adding items to your cart</p>
          )}
        </div>
      </div>
      <div className="cart__table">
        <div className="cart__table-wrapper">
          <p className="cart__table-title">Your Cart ({total})</p>
          <p className="cart__table-text">Start adding items to your cart</p>
          <p className="cart__table-title">Price Details</p>
          <hr className="cart__table-hr" />
          <div className="cart__table-box">
            <p className="cart__table-title--secondery">Price</p>
            <p className="cart__table-title">BDT {totalCost}</p>
          </div>
          <div className="cart__table-box">
            <p className="cart__table-title--secondery">Delivery Charges</p>
            <p className="cart__table-text">(will be added)</p>
          </div>
          <hr className="cart__table-hr cart__table-hr--secondery" />
          <div className="cart__table-box">
            <p className="cart__table-title--secondery">Total Amount</p>
            <p className="cart__table-title">BDT {totalCost}</p>
          </div>
          <Link href="checkout">
            <ActionButton
              disabled={cartList.length === 0}
              type="button"
              className="cart__button">
              Check out
            </ActionButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartWrapper;
