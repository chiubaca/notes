---
title: Leaning into the vibes
publish_date: 2026-01-07
last_updated: 2026-01-07
description: Some notes on using these new AI tools in practice
status: live
tags:
---

As with most developers right now, all we're thinking about right now is AI. I've been feeling  _really_ anxious about the state of things. My colleagues and friends are on all spectrums with how they feel about how AI change things. Some totally skeptical and find it useless. Others are complete maximalist and are all in. So with me, I'm trying to strike somewhere in the middle.  

Listening to [Ilya Sutskever](https://www.reddit.com/r/ControlProblem/comments/1ptter6/ilya_sutskever_the_moment_ai_can_do_every_job/) on the subject matter of the future of our jobs now that AI seemingly knows _everything_. Now is time to simply just use these tools, build the intuition and understand the ergonomics. As a software developer in someones nothing has changed. We look at problems and see how we can resolve them. It's just the how-we-get-there has changed significantly. 

So over this xmas break I've finally had some time to test Claude Code and Open Code with various models its been a lot of fun. They hype is really. I've had my "oh-shit wow" moments , felt a bit scared but mostly just impressed.

I built my new app [chonk-poker](https://chonk-poker.chiubaca.com/). Its a planning poker game that uses the [chonk scale](https://www.reddit.com/r/cats/comments/99lc07/where_is_your_kitty_on_the_chonk_chart/). This is is how we size tickets at work now and its hilarious because every one keeps forgetting what size is what and we just count to three and post it in a google meet chat. this stupid app is to solve that particular problem in my team. 

It was good oppurtunity to appy [skill-stacking](permanent-notes/skill-stacking.md) and learn a bunch of new thing, namely Tanstack start/query/form, Cloudflare durable objects and revise state machine concepts with XState.

I started slow. I scaffolded all the technology touch points by hand which I still think is key. Though if you are to believe the noise on twitter, AI can do this well too. I personally just wanted to 100% understand and verify how my frontend connected to the backend workers and durable objects and database. 

The next core mechnic was the state machine. I've used Xstate for my [big-two](https://github.com/chiubaca/big-two-app) card game. But I used the Big pickle in Open Code to verify my patterns used that that project made sense. I'm really chuffed I figured all of the xstate mechnics in a different project by myself pre-AI.  And on that point of being proud that you can figure something out do it by hand. I'm slowly realising that mindset of being precious about code could be the very thing might make some developers left behind. Yes you can slog out writing code by hand and reading every error and hit your head against the wall until it works. Having the grit to persevere through this is a trait that I used to take pride in. But LLMs are so good at resolving errors now, you're just down right being stubborn to not take advantage of it. I'm Dad with kid thats one years old. I get very little sleep and I only have 1 or two hours in the middle of the night to tinker with this stuff. Even though I _want_ to figure out the issues out myself, I've learnt to swallow my pride and lean into these AI tool move the project along quicker.

This was my "holy-shit" moment. 

I topped up 6 pounds of Anthropic credits and finally tried Opus 4.5 which basically the whole of tech twitter had been hyping up the last couple months. Over several weeks of tinkering with this stack I had a fugly UI and the first two screens of the planning poker state created. I was in a place where I was mostly happy with the project architecture and let Opus loose to build the remain UI and game states.

I burnt through every last penny and it was worth it. The UI is better than anything I personally could I have dreamt up and it went above and beyond with tiny impactful UI flourishes. Lets talk through some of them.

How cute is this login screen? (the falling cats was my touch!)

![](attachments/chonk-poker-sc-1.png)

The theme is consistent into the signed in page.  I'm no UI designer, but this all just _feels_ comfy.

![](attachments/chonk-poker-sc-2.png)


And here is really where it really shone. I asked it to build out the UI for each of the game states. I cant remember the exact prompt, but it wasn't long, albeit I had pre-created the a shell of the React component already to go with the state machine object as the props.

With that alone, was enough for it flesh out all of this UI and I love it. The pulsing little pending orbs, the colour changes between ready and pending. Even some of the copy made me smile. It had built a pretty delightful UI (in my opinion). 

![](assets/rec_1.gif)

I've asked other models to create UIs in the past and have not been impressed, So whatever they trained Opus on, its working.

But before I give too much praise and credit, Its worth noting, I manually configured this project by hand. I chose centralise the game logic within a state machine, this let me confidently know the LLM was working on UI logic only without unintentionally messing up the game logic. So that all being said, archtecture still matters, organisation of code still matters and seperation of concerns ( where appropriate ), still matters! For me at least anyways. Perhaps the way I used the models was not the real definition of "vibe coding". I reviewed every diff as it went and  refined the organisation of the code too. If I didnt I would have had a terrible time reviewing spagetti.

I'm still forming my AI workflows in this new world we're living and even though I perhaps half of the code was not written by me, I still enjoyed making this app. Am still worried that AI is gonna take my job, yes. Am also not going to stop using these AI tools, also no. Who knows what the future is going hold for my coding career, nonetheless. I'm gonna keep building stupid stuff.