import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import '@/style/globals.css';

import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        position="bottom-left"
        reverseOrder={true}
      />
    </>
  )
}