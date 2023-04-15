// import Layout from "@/ui/comp-layout";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import '@/style/globals.css';

import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    const fetchRandomImages = async () => {
      const response = await fetch('/api/random');
      const images = await response.json();
  
      console.log("primeiro useEffect", images)

      setRandomImages(images);
    };
    fetchRandomImages();
  }, []);

  useEffect(() => {
    console.log("segundo useEffect", randomImages)

    const interval: any = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * randomImages.length);
      const randomImage = randomImages[randomIndex];
      document.body.style.backgroundImage = `url(/images/randoms/${randomImage})`;
    }, 2000);
    return () => clearInterval(interval);
  }, [randomImages]);
  
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