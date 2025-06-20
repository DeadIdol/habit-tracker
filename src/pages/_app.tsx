import { HabitProvider } from "@/context/HabitContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HabitProvider>
      <Component {...pageProps} />;
    </HabitProvider>
  )

}
