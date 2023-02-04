import { Header, MobileNav } from "@/components/index";
import type { siteType } from "@/types/index";
import useMediaQuery from "@/hooks/useMediaQuery";

const Site = ({ children }: siteType) => {
  const isMobile = useMediaQuery("(max-width: 980px)");
  return (
    <main>
      <Header />
      <main className="main--body">{children}</main>
      {isMobile && <MobileNav />}
    </main>
  );
};

export default Site;
