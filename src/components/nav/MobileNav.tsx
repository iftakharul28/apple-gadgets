import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCart } from "@/store";
const MobileNav = () => {
  const { data: userData } = useSession();
  const cart = useCart((state) => state.cart);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => setTotal(cart), [cart]);
  return (
    <nav className="mobile-nav">
      <div className="container">
        <div className="mobile-nav__wrapper">
          <Link href="/#" className="mobile-nav__item-wrapper">
            <img
              className="header__top-link-image"
              src="/gift.webp"
              alt="gift"
            />
            <p className="mobile-nav__text">Latest Offers</p>
          </Link>

          <Link href="/cart" className="mobile-nav__item-wrapper">
            <img
              className="header__top-link-image"
              src="/cart.webp"
              alt="gift"
            />
            <p className="mobile-nav__text">Cart ({total})</p>
          </Link>
          <Link href="/#" className="mobile-nav__item-wrapper">
            <img
              className="header__top-link-image"
              src="/shop.webp"
              alt="gift"
            />
            <p className="mobile-nav__text">Order Today</p>
          </Link>
          {userData ? (
            <button
              type="button"
              className="mobile-nav__item-wrapper"
              onClick={() =>
                signOut({
                  callbackUrl: "/auth/login",
                  redirect: true,
                })
              }>
              <img
                className="header__top-link-image"
                src="/user.webp"
                alt="gift"
              />
              <p className="mobile-nav__text">{userData.user.name}</p>
            </button>
          ) : (
            <button
              type="button"
              className="mobile-nav__item-wrapper"
              onClick={() => signIn()}>
              <img
                className="header__top-link-image"
                src="/user.webp"
                alt="gift"
              />
              <p className="mobile-nav__text">Register or Login</p>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
