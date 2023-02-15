import Link from "next/link";
import { footerAddress, footerLink, footerMenu } from "@/data/footer";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__row">
            <Link className="footer__row-wrapper" href="tel:+09678148148">
              <p className="footer__row-text">Customer Care</p>
              <p className="footer__row-text footer__row-text--secondery">
                09678148148
              </p>
            </Link>
            <Link className="footer__row-wrapper" href="/#">
              <p className="footer__row-text">Store Locator</p>
              <p className="footer__row-text footer__row-text--secondery">
                Find Our Stores
              </p>
            </Link>
          </div>
          <div className="footer__row">
            {footerMenu.map(({ name, url }, i: number) => (
              <Link key={i} className="footer__row-link" href={`#${url}`}>
                {name}
              </Link>
            ))}
          </div>
          <div className="footer__row">
            {footerLink.map(({ name, url }, i: number) => (
              <Link key={i} className="footer__row-link" href={`#${url}`}>
                {name}
              </Link>
            ))}
          </div>
          <div className="footer__row">
            <p className="footer__row-text footer__row-text--secondery">
              Apple Gadgets Ltd.
            </p>
            {footerAddress.address.map(({ name }, i: number) => (
              <p key={i} className="footer__row-text">
                {name}
              </p>
            ))}
            <Link
              className="footer__row-text"
              href={`mailto:${footerAddress.email}`}>
              {footerAddress.email}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
