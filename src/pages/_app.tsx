import type { AppProps } from "next/app";
import 'bootstrap/dist/css/bootstrap.css';
import "@/styles/globals.scss";
import { ContextProvider } from "@/contexts/Context";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}
