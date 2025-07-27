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
      className={`${geistSans.className} ${geistMono.className} min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans`}
    >
      <Tabs defaultValue="main" className="justify-self-center">
        <TabsList className="self-center">
          <TabsTrigger value="main">Daily Habit Check</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="main"><MainTab /></TabsContent>
        <TabsContent value="stats"><StatsTab /></TabsContent>
        <TabsContent value="about">
          <p className="max-w-prose font-serif">
            Simple web app to log and review your daily habits. In the &apos;Daily Habit Check&apos; view, use the coloured tabs
            on the side of each habit to record the outcome for that day. The meaning of each tab colour is not enforced, but my usage is:
            <ul className="list-disc">
              <li>Green: Habit done</li>
              <li>Amber: Habit not done</li>
              <li>Red: Habit not done, and this violates a resolution or goal you have</li>
              <li>Grey: N/A for this day</li>
            </ul>
            <br />
            The app is designed assuming all habits have a positive valence. So for example, instead of creating a habit &apos;Scroll twitter&apos;
            I recommend &apos;Don&apos;t scroll twitter&apos;.
            <br />
            In the &apos;Statistics&apos; view, you can see how you have performed on each habit for this week. You can see previous weeks with the date picker.
            <br /><br />
            I created this app to help me stick to resolutions. I have found myself making goals which I would stick to for a while, but then start slipping out of forgetfulness. The next time I&apos;d go on a self-improvement kick, I would find I could not remember when, why or how I had failed my previous resolutions. It was a process of gradual slipping. The first step to sticking to resolutions has to be noticing when you have failed.
            I could not find an existing habit app that displayed a log the way I wanted, so I created this one.
          </p>
        </TabsContent>

      </Tabs>


    </div>
  );
}
