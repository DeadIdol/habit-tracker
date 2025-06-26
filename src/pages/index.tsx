import { Geist, Geist_Mono } from "next/font/google";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MainTab from "@/components/MainTab";
import StatsTab from "@/components/StatsTab";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <Tabs defaultValue="main" className="justify-self-center">
        <TabsList className="self-center">
          <TabsTrigger value="main">Daily Habit Check</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="main"><MainTab /></TabsContent>
        <TabsContent value="stats"><StatsTab /></TabsContent>
      </Tabs>
    </div>
  );
}
