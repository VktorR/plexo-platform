import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Provider as URQLProvider } from "urql";
import { NextPage } from "next";
import Head from "next/head";

import Fonts from "theming/fonts";
import { URQLClient } from "lib/client";
import { MyMantineProvider } from "theming/mantine";
import PlexoProvider from "../context/PlexoContext";

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const client = URQLClient();

const PlexoApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <>
      <Head>
        <title>Plexo</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" type="image/png" sizes="5x5" href="/plexo.png" />
      </Head>
      <URQLProvider value={client}>
        <PlexoProvider>
          <MyMantineProvider>
            <Fonts />
            {getLayout(<Component {...pageProps} />)}
          </MyMantineProvider>
        </PlexoProvider>
      </URQLProvider>
    </>
  );
};

export default PlexoApp;
