# Personal project

A well-structured production-ready Next.js boilerplate with Typescript, Jest, React testing library, Storybook, Emotion, Tailwind, PostCSS, Fetch, Bundle Analyzer, Per page Layouts, Custom models 

![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/movahedan/49ff7044879e43a1daf430086b622c53/raw/next-boilerplate__heads_main.json)
![Build Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/movahedan/49ff7044879e43a1daf430086b622c53/raw/next-boilerplate__build_badge.json)

##### Project maintenance
- [x] Setup strong Linter, lint-staged, husky
- [x] Setup Jest and react-test-renderer
- [x] Setup Cypress
- [x] Setup GitHub actions
- [x] Deploy on vercel
##### Styling
- [x] Setup Emotion and PostCSS with fully-configured Tailwind
- [x] Setup UI library (Storybook installed with some helper functions)
-	[x] Setup MediaQuery module (supports Tailwind and SSR)
- [x] Setup optimized, easy to change, test and scale GoogleFont
-	Implement a minimal component library (with the help of headless ui)
##### Application development
- [x] Setup directory structure
- [x] Setup declaring global types
- [x] Setup Layout structure (supports PerPageLayout)
- [x] Setup SEO optimization (NextSeo, NextSitemap)
- [x] Setup Analytics tools with separate business level abstracting
-	Setup Error Handling and Reporting
- Setup Fetch and SWR

## Running

After cloning repository, go to the directory you've cloned it.

##### Run the development server:
```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

##### Run the storybook:
```bash
yarn storybook:dev
```
Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.

##### Run the cypress:
```bash
yarn cypress:dev
```


## Contributing

Fist change the thing you with to be changed and check your staged changes status with the following command.
```bash
yarn check
```

- [Note] If you've changed tailwind.config.js, please run the following command to sync it's config between CSS & JS.
```bash
yarn tailwind
```

## Build and deploy

```bash
yarn deploy:test
yarn deploy:e2e
yarn start
```

To build storybook, run the following command:
```bash
yarn storybook:build
```

### Features to have
- Resume page
- Blog (with comments)
- Authentication
- Show this codebase
- Introduce to machine learning and create an example
- PDF on the go (with paper css)
- Setup a cdn service for pictures (cloudflare)
- Setup a picture optimizer and integrate it with NextImage
- Setup a link preview service