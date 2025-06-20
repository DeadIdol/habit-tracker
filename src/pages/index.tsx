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
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="bg-red-900">Test</h1>

        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="main">Daily Habit Check</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="main"><MainTab /></TabsContent>
          <TabsContent value="stats"><StatsTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
