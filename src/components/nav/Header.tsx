import Link from "next/link";
import { SearchIcon } from "@/components/icons";
import { topMenu } from "@/data/header";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCart } from "@/store";
import { useEffect, useState } from "react";

export default function Header() {
  const { data: userData } = useSession();
  const cart = useCart((state) => state.cart);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => setTotal(cart), [cart]);
  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="header__top-wrapper">
            <Link href={"/"}>
              <img className="header__logo" src="/logo.webp" alt="applegaget" />
            </Link>
            <form method="post" className="header__form">
              <label className="visually-hidden" htmlFor="search">
                search
              </label>
              <input
                className="header__form-input"
                type="search"
                name="search"
                id="search"
                placeholder="Search"
              />
              <button className="header__form-button" type="submit">
                <SearchIcon className="header__form-icon" />
              </button>
            </form>
            <div className="header__top-link-wrappper">
              <Link href="/#" className="header__top-link">
                <img
                  className="header__top-link-image"
                  src="/gift.webp"
                  alt="gift"
                />
                <div className="header__top-text-wrapper">
                  <p className="header__top-text">Offers</p>
                  <p className="header__top-text">Latest Offers</p>
                </div>
              </Link>

              <Link href="/cart" className="header__top-link">
                <img
                  className="header__top-link-image"
                  src="/cart.webp"
                  alt="gift"
                />
                <div className="header__top-text-wrapper">
                  <p className="header__top-text">Cart ({total})</p>
                  <p className="header__top-text">Add items</p>
                </div>
              </Link>
              <Link href="/#" className="header__top-link">
                <img
                  className="header__top-link-image"
                  src="/shop.webp"
                  alt="gift"
                />
                <div className="header__top-text-wrapper">
                  <p className="header__top-text">Pre-Order</p>
                  <p className="header__top-text">Order Today</p>
                </div>
              </Link>
              {userData ? (
                <button
                  type="button"
                  className="header__top-link"
                  onClick={() =>
                    signOut({
                      redirect: false,
                    })
                  }>
                  <img
                    className="header__top-link-image"
                    src="/user.webp"
                    alt="gift"
                  />
                  <div className="header__top-text-wrapper">
                    <p className="header__top-text">{userData.user.name}</p>
                    <p className="header__top-text">Logout</p>
                  </div>
                </button>
              ) : (
                <button
                  type="button"
                  className="header__top-link"
                  onClick={() => signIn()}>
                  <img
                    className="header__top-link-image"
                    src="/user.webp"
                    alt="gift"
                  />
                  <div className="header__top-text-wrapper">
                    <p className="header__top-text">Account</p>
                    <p className="header__top-text">Register or Login</p>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <div className="container">
          <nav className="header__bottom-wrapper">
            {topMenu.map(({ attribute, children }, i) => (
              <div key={i} className="header__bottom-link-wrapper">
                <Link href="#" className="header__bottom-link">
                  {attribute.name.en}
                </Link>
                {children.length > 0 && (
                  <div className="header__bottom-sublink-wrapper">
                    {children.map(({ id, attribute }) => (
                      <Link
                        href="#"
                        className="header__bottom-sublink"
                        key={id}>
                        {attribute.name.en}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
