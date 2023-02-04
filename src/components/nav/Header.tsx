import { useEffect, useState } from "react";
import Link from "next/link";
import useMediaQuery from "@/hooks/useMediaQuery";
import { HamburgerIcon, SearchIcon } from "@/components/icons";
import { topMenu } from "@/data/header";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCart } from "@/store";

export default function Header() {
  const { data: userData } = useSession();
  const isMobile = useMediaQuery("(max-width: 980px)");
  const cart = useCart((state) => state.cart);
  const [total, setTotal] = useState<number>(0);
  const [showNav, setShowNav] = useState<boolean>(false);
  useEffect(() => setTotal(cart), [cart]);
  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          {isMobile ? (
            <div className="header__nav">
              <div
                className="header__nav-icon-wrapper"
                onClick={() => setShowNav(!showNav)}>
                <HamburgerIcon className="header__nav-icon" />
              </div>
              <Link href="/">
                <img
                  className="header__logo"
                  src="/logo.webp"
                  alt="applegaget"
                />
              </Link>
              <button className="header__form-button" type="submit">
                <SearchIcon className="header__form-icon header__nav-icon--secondery" />
              </button>
            </div>
          ) : (
            <div className="header__top-wrapper">
              <Link href="/">
                <img
                  className="header__logo"
                  src="/logo.webp"
                  alt="applegaget"
                />
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
                        callbackUrl: "/auth/login",
                        redirect: true,
                      })
                    }>
                    {userData?.user.image ? (
                      <img
                        className="header__user-image"
                        src={userData?.user.image || ""}
                        alt="gift"
                      />
                    ) : (
                      <img
                        className="header__top-link-image"
                        src="/user.webp"
                        alt="gift"
                      />
                    )}
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
          )}
        </div>
      </div>
      {!isMobile && (
        <div className="header__bottom">
          <div className="container">
            <nav className="header__bottom-wrapper">
              {topMenu.map(({ attribute, children }, i) => (
                <div key={i} className="header__bottom-link-wrapper">
                  <Link href="/#" className="header__bottom-link">
                    {attribute.name.en}
                  </Link>
                  {children.length > 0 && (
                    <div className="header__bottom-sublink-wrapper">
                      {children.map(({ id, attribute }) => (
                        <Link
                          href="/#"
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
      )}
    </header>
  );
}
