import { HabitProvider } from "@/context/HabitContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <HabitProvider>
        <Component {...pageProps} />;
      </HabitProvider>
    </DndProvider>
  )

}
