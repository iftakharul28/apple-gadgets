import Head from "next/head";
import capLatter from "@/lib/capLatter";
import type { siteType } from "@/types/index";
const Layout = ({ children, title }: siteType) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          {title
            ? `${capLatter(title)} - Apple Gadgets`
            : "Smartphones, Gadgets & Premium Accessories | Apple Gadgets"}
        </title>
        <meta
          name="description"
          content="Apple Gadgets is the perfect gadget shop in Bangladesh with a vast collection of useful gadgets with the most attractive prices in Bangladesh"
        />
        <meta
          property="og:title"
          content={
            title ? `${capLatter(title)} - Apple Gadgets` : "Apple Gadgets"
          }
        />
        <meta
          property="og:description"
          content="Apple Gadgets is the perfect gadget shop in Bangladesh with a vast collection of useful gadgets with the most attractive prices in Bangladesh"
        />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="robots" content="index, follow" />
      </Head>
      {children}
    </>
  );
};

export default Layout;
