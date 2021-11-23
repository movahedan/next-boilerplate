# Analytics

## Subject description

If you ask me to list the things I don't love, analytics-procedures is on the top. They are hidden in the UI, although they need to match the exact documentation that we are given, as we change the structure of the project, or develop it, we might forget about them, so they will send the wrong data to the analytics provider.

Another noisy thing, we shall not send repetitive reports, in the API calls, it might be just a matter of lowering resources and being optimized, but in the analytics, it's different! You send a report 2 times on every page view, and the whole statistics of your organization would be full of wrong data!

And... imagine you are designing a component like `Header`. You polish it and make it works and you make it awesome. It would be just perfect when you have the analytic task of it in your hand. Great! Now you need to add so many callbacks!

> [PM]: When the user clicks on the first one, fire this.

> [PM]: When the user clicks on the other, fire that.

> [PM]: Hey! can you fire a report when the user scrolls to the bottom and think for a little bit and scrolls to the top again? Cool! thanks! by the way, send me this HUGE object too so I can get to know about the context.

And suddenly, your beautiful `Header` component starts to get dirty, and you would be in sorrow for that, me too. By the way, lots of business-level logic would be put on in the `ui` directory...

I have good news too, almost every organization I've worked for has asked me to send analytics reports. And you know, the architecture is always the same, you have a `dataLayer` (or whatever you would call it) as an array and push the reports into it. (It might be different if you are working with a SaaS to collect analytics reports, you might be calling some APIs for it, and it's ok, you can watch that array and call yours)

## Development description

As we have mentioned in [Directories documentation](https://github.com/movahedan/next-boilerplate/blob/main/docs/directories.md "Rule 9") we should not write business level logic in `lib` directory, thus, we have 2 directories to handle analytics.

`lib/analytics`:
    First of all, you have a pre-declared head script waiting for a `url` as a prop to be ready to start. Put the script in your `_app.tsx` to be able to send real requests.
    Lets take a look at the main file: There we have a nice analytics module to work with. It gives us a single hook named `useAnalytics`, it's a regular custom hook with a callback as the first argument and a dependency list as the second one, just like useEffect, with the main difference that you can customize it by sending different values as the result of the callback.
    You can use it in 2 ways, either you want to fire analytic report automatically by sending the `eventType` and the `data` of it, that is normal, Or you want to report it directly, in that case, you will need the firing method of the analytic module.
    
> ATTENTION: You must not import the firing method declared in `_analytics.ts` directly, it will be given to you if you know how to work with `useAnalytics`
> You can read in detail about it on the top of the hook declaration: `src/lib/analytics/analytics.ts`.
    
`entry/analytics`:
    By now, we have the tools we want, now we have to turn/copy the documentation into the code. You have this directory to fill. You can create a directory for each `eventType` you have. For instance, `pageView` and `interaction`. Each of them has these files:
       - `getter.ts`: 
          This helps us to get a default clear object as the data of the event.
       - `documents.ts`: 
          It's just a type declaration of the event data, but you may add comments or anything to be clear about each attribute of the event data.
       - `your-normal-event.ts`: 
          That is the file you actually write your event into it. It gets help from the `getter` and returns the event properties. (Be careful, don't trigger the event, just return the props and connect it to the `useAnalytics` at the usage time)
       - `your-direct-event.ts`: 
          You might want to send the report in very complex circumstances, so you can create an `AnalyticTracker` and equip your component with a `ref` around it. Now the component DOM is all yours to do your action. You CAN trigger the report in such files because it has been given to you through `useAnalytics`

## Rules and Conventions

0. Never import the `analytic-event-firer` directly from `_analytics.ts`. We have come from C++ ages.
1. Always create `getter.ts` for each event type, so we can always be sure about the default values.
2. Always create well-documented `documents.ts` for each event type, so we can always be sure about what these attributes really are.
3. Always unit test your reports :)
