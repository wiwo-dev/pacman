import "@/styles/globals.css";
import { PacmanContextProvider } from "@/utils/Context";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PacmanContextProvider>
        <Component {...pageProps} />
      </PacmanContextProvider>
    </>
  );
}
