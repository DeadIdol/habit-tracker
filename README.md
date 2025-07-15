This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).
You can view a vercel deployment of this app at https://habit-tracker-seven-tau.vercel.app/

## Usage
Simple web app to log and review your daily habits. In the 'Daily Habit Check' view, use the coloured tabs
on the side of each habit to record the outcome for that day. The meaning of each tab colour is not enforced, but my usage is:
- Green: Habit done
- Amber: Habit not done
- Red: Habit not done, and this violates a resolution or goal you have
- Grey: N/A for this day

The app is designed assuming all habits have a positive valence. So for example, instead of creating a habit 'Scroll twitter' I recommend 'Don't scroll twitter'.

In the 'Statistics' view, you can see how you have performed on each habit for this week. You can see previous weeks with the date picker.

I created this app to help me stick to resolutions. I have found myself making goals which I would stick to for a while, but then start slipping out of forgetfulness. The next time I'd go on a self-improvement kick, I would find I could not remember when, why or how I had failed my previous resolutions. It was a process of gradual slipping. The first step to sticking to resolutions has to be noticing when you have failed.
I could not find an existing habit app that displayed a log the way I wanted, so I created this one.

## Run Locally

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Built With
- Next.js
- TailwindCSS
- Shadcn-ui
- localStorage for persistence
