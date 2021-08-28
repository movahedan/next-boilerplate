import Head from "next/head";
import { useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";

import { GBaseLayout } from "ui";

import { AnalyticsProvider } from "lib/analytics";
import { withErrorHandler } from "lib/errors";
// import { reduxWrapper } from "lib/store";
import { isWebVitalsEnable } from "lib/utils";
import "tailwindcss/tailwind.css";

import type { AppWithLayoutProps, NextWebVitalsMetric } from "next/app";
import type { FC } from "react";

const App: FC<AppWithLayoutProps> = ({ Component, pageProps }) => {
  const queryClient = useRef(new QueryClient());

  const Layout = Component.Layout?.Component || GBaseLayout;
  const layoutProps =
    typeof Component.Layout?.props === "function"
      ? Component.Layout?.props(pageProps)
      : Component.Layout?.props || {};

  return (
    <>
      <QueryClientProvider client={queryClient.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout {...layoutProps}>
            <Component {...pageProps} />
          </Layout>

          <AnalyticsProvider />
        </Hydrate>

        <ReactQueryDevtools />
      </QueryClientProvider>

      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />

        <title>Next.js</title>

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#317EFB" />
        <link
          href="/icons/icon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/icon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>

        <link
          rel="preconnect"
          crossOrigin=""
          href="https://fonts.gstatic.com/"
        />
        <link rel="preload" as="style" href="/font.css" />
        <link rel="stylesheet" href="/font.css" />
      </Head>
    </>
  );
};

export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
  if (isWebVitalsEnable) console.log(metric);
};

export default withErrorHandler(App);
