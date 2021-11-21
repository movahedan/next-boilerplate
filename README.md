# Next.js opinionated boilerplate

A well-structured production-ready Next.js boilerplate with a well-documented directory structuring that supports Typescript, Jest, react-testing-library, Cypress, configurable Fetch and SWR, and a configured component library using Emotion, Tailwind, PostCSS, and Storybook. Plus, taking advantage of NextSeo and NextSitemap for SEO. 

![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/movahedan/49ff7044879e43a1daf430086b622c53/raw/next-boilerplate__heads_main.json)
![Build Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/movahedan/49ff7044879e43a1daf430086b622c53/raw/next-boilerplate__build_badge.json)

## Benefits

### Project maintenance
- [x] Setup strong Linter, lint-staged, husky
- [x] Setup Jest and react-test-renderer
- [x] Setup Cypress
- [x] Setup GitHub actions
- [x] Deploy on vercel
- Dockerize it
### Application development
- [x] Setup directory structure and global types
- [x] Setup configurable Fetch and SWR
- [x] Setup Analytics tools with separate business level abstracting
- [x] Setup SEO optimization (NextSeo, NextSitemap)
-	Setup Error Handling and Reporting
- Setup Redux
### Styling
- [x] Setup Emotion and PostCSS with fully-configured Tailwind
- [x] Setup UI library (Storybook installed with some helper functions)
-	[x] Setup MediaQuery module (supports Tailwind and SSR)
- [x] Setup optimized, easy to change, testable Google font
- [x] Setup Layout structure (supports per page layout)
-	Implement a minimal component library (with the help of headless ui)
### Additional hooks
  - [x] useAliveRef
  - [x] useCombinedRef
  - [x] useElementSize
  - [x] useIntersect
  - [x] useResizeEffect
  - [x] useScrollEffect
  - [x] useThrottleCallback
  - [x] useThrottleEffect
  - useInfiniteLoader
  - useClipboard
  - useLocalStorageState
  - useCookieState
  - useNetworkStatus
### Additional components
  - TruncatedText

## Running

After cloning repository, go to the directory you've cloned into.

##### Run the development server
```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

##### Run the storybook
```bash
yarn storybook:dev
```
Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.

##### Run the cypress
```bash
yarn cypress:dev
```

## Build and deploy

To check for a clean deployment and run the project run the following commands, they will take care of unit testing, e2e testing and create production-optimized build of application.

```bash
yarn deploy:test
yarn deploy:e2e
yarn start
```

To build storybook, run the following command:
```bash
yarn storybook:build
```

## Contributing

Fist change the thing you with to be changed and check your staged changes status with the following command.
```bash
yarn check
```

If you've changed `tailwind.config.js`, please run the following command to sync it's config between CSS & JS.
```bash
yarn tailwind
```
