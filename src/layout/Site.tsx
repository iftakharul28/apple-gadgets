import { Header } from "@/components/index";
import type { siteType } from "@/types/index";

const Site = ({ children }: siteType) => {
  return (
    <main>
      <Header />
      <main className="main--body">{children}</main>
    </main>
  );
};

export default Site;
