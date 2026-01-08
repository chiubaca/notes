---
title: Leaning into the vibes
publish_date: 2026-01-07
last_updated: 2026-01-08
description: Reflections on embracing AI with a side project
status: live
tags:
  - ai
  - musings
---

As with most developers right now, I've been feeling really anxious about the state of software engineering and AI impacts it. My colleagues and friends are on all spectrums with how they feel about how AI change things. Some totally skeptical and find it useless. Others are complete maximalist and are all in. So with me, I'm trying to strike somewhere in the middle.  

Listening to [Ilya Sutskever](https://www.reddit.com/r/ControlProblem/comments/1ptter6/ilya_sutskever_the_moment_ai_can_do_every_job/) on the subject matter. Now is the time to simply use these tools, build the intuition and understand the ergonomics. In some ways, nothing has changed. We look at problems and see how we can resolve them with sofware. It's just how we get there has significantly changed. 

Over the xmas break I've finally had some time to test Claude Code and Open Code with various models and truthfully, its been more fun than I thought it would be. The hype I've seen online is real. I've had my "oh-shit wow" moment , felt a bit scared but mostly impressed.

I built my new app [chonk-poker](https://chonk-poker.chiubaca.com/). Its a planning poker game that uses the [chonk scale](https://www.reddit.com/r/cats/comments/99lc07/where_is_your_kitty_on_the_chonk_chart/). This is is how we size tickets at work now and its hilarious because every one keeps forgetting what size is what and  the way play planning poker  is via a google meet chat, we count to three and post it at the same time. This stupid app is to make our planning session just a little bit smoother. 

It was good opportunity to appy [skill-stacking](permanent-notes/skill-stacking.md) and learn a bunch of new things, namely Tanstack Start/Query/Form, Cloudflare durable objects and revise state machine concepts with XState.

I started slow. I scaffolded all the technology touch points by hand which I still think is invaluable. Though if you are to believe the noise on twitter, AI can do this well too. I personally just wanted to 100% understand and verify how my frontend connected to the cloudflare workers and durable objects and how these connect to the database. 

The next core mechanic was the state machine. I've used Xstate for my [big-two](https://github.com/chiubaca/big-two-app) card game. I used the Big Pickle model that is currently free in Open Code to verify my patterns used in that that project made sense here too, which it was. I'm really chuffed I figured all of the xstate mechanics in a different project all by myself pre-AI.  And on that point of being proud that you can figure something out and implement by hand. I'm slowly realising that mindset of being precious about code could be the very thing might make some developers left behind. Yes you can slog out writing code by hand and reading every error and hit your head against the wall until it works. Having the grit to persevere through hard bugs is a trait that I used to take pride in. But LLMs are so good at resolving errors now, you're just down right being stubborn to not take advantage of it. I'm a Dad with with a one year old now. I get very little sleep and I only have one or two hours in the middle of the night to tinker with this stuff. Even though I _want_ to code everything by hand and debug thing manually, I've learnt to swallow my pride and lean into these AI tool move the project along quicker. These AI tools are letting me build and ship things whilst totally sleep deprived. What a time to be alive...!(?).

Over several weeks of tinkering with this stack on and off during my sacared 2 hours in the evening. I the core mechanics working, realtime, auth  some fugly UI. I used open code to  refactor  and organise the project architecture until I was happy and now i was ready to give the app the polish it needed. This is often the stage where my side projects go to die. I've done the hard bit and the last 20% I lose all motivation. This was when I decided to see what the fuss around Opus 4.5 was. So I topped up 5 British pounds of Anthropic credits, installed Claude Code and let Opus loose to polish off the rest of the app. I burnt through all the credits and it was worth every penny.  

This was my "holy-shit" moment. 

The UI is better than anything I personally could I have dreamt up and it went above and beyond with tiny impactful UI flourishes. Lets talk through some of them.

How cute is this login screen? (the falling cats was my touch which prompted for afterwards).

![](attachments/chonk-poker-sc-1.png)

The theme is consistent into the signed in page.  I'm no UI designer, but this all just _feels_ comfy.

![](attachments/chonk-poker-sc-2.png)


And here is really where it really shone. I asked it to build out the UI for each of the game states. I cant remember the exact prompt, but it wasn't long, albeit I had pre-created the a shell of the React component already to go with the state machine object as the props.

With that alone, was enough for it flesh out all of this UI and I love it. The pulsing little pending orbs, the colour changes between ready and pending. Even some of the copy made me smile. It had built a pretty delightful UI (in my opinion). 

![](attachments/rec_1.gif)

But before I give too much praise and credit to Opus 4.5, I think its worth remembering I manually configured this project by hand. I chose to centralise the game logic within a state machine, this let me confidently know the LLM was working on UI logic only without unintentionally messing up the game logic. 

So that all being said, architecture _still matters_, organisation of code _still matters_ and seperation of concerns, gosh danm it, _still matters_! 

Maybe its skill issue, but If I didnt organise the project in a sane way, I feel like I would have had a terrible time reviewing some spagetti mess.

Perhaps the way I built this was not the true definition of "vibe coding". I reviewed every diff and refined the organisation of the code too. But this is the first project I really leant into AI hard.

I'm still forming my AI workflows in this new world we're living and even though a good chunk of the code was not written by me, I still enjoyed making this app. Like with a lot of developers right, [this feeling is complicated].

 Am I impressed with the current state of these tools, yes. 
 Am I still worried that AI is gonna take my job, yes. 
 Am I not going to stop using these AI tools, also yes. 
 
 Who knows what the future holds for all of our coding careers. What we can do is just carry on building, enjoy it whilst it lasts and maybe try to have some fun along the way.