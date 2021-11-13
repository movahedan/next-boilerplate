# Personal project

This project is created by Soheil Movahedan, feel free to leave
a comment or even better! A Pull request and make it better.

## Running

After cloning repository, go to the directory you've cloned it and:

Run the development server:
```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Run the storybook:
```bash
yarn storybook:dev
```
Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.

Run the cypress:
```bash
yarn cypress:dev
```
The cypress application will comes up and you can test some flow.

## Contributing

Fist change the thing you with to be changed.

To check your staged changes status:
```bash
yarn deploy:check
```
It runs `yarn type-check`, `yarn lint` and `yarn test` together to see if there is any conflicts between the changes and the previous state of repo.

[Note:] If you change tailwind.config.js, please run the following command to sync tailwind config between JS and CSS.
```bash
yarn tailwind
```

## Build and deploy

```bash
yarn deploy:check
yarn deploy:build
yarn deploy:clean
```

To build storybook, run the following command:
```bash
yarn storybook:build
```

### Tasks

-	Implement a minimal component library (with the help of headless ui)
- Setup Fetch and SWR
- Setup a cdn service for pictures (cloudflare)
- Setup a picture optimizer and integrate it with NextImage
- Setup a link preview service
- Setup github actions
- [x] Setup directory structure
- [x] Setup well documented eslint config
- [x] Setup declaring global types
- [x] Setup Jest config and next-page-tester
- [x] Setup Cypress minimal config
- [x] Setup workflow, lint-staged, lint, tests
- [x] Setup Emotion and PostCSS with typography configured Tailwind
- [x] Setup UI library with Storybook
-	[x] Setup Media query module (synced with tailwind and support SSR)
- [x] Setup optimized google font
- [x] Setup layout structuring per page
-	[x] Setup Error Handling and Sentry
- [x] Setup SEO optimization (NextSeo, NextSitemap)
- [x] Setup Analytics
- [x] Deploy on vercel

### Features to have
- Resume page
- Blog (with comments)
- Authentication
- Show this codebase
- Introduce to machine learning and create an example
- PDF on the go (with paper css)