import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "@/utils/api";
import "@/styles/scss/styles.scss";
import { Layout, SiteLayout } from "@/layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
