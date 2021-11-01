# Personal project

This project is created by Soheil Movahedan, feel free to leave
a comment or even better! A Pull request and make it better.

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run storybook:

```bash
yarn storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.


To check your staged changes status:
It runs `yarn type-check` and `yarn lint` and `yarn test`.

```bash
yarn commit-check
```

To do pre-release check:

```bash
yarn release-check
yarn after-check
```

### Tasks
-	Setup headless-ui
- Setup Fetch and SWR
- Setup a cdn service for pictures (cloudflare)
- Setup a picture optimizer and integrate it with NextImage
- Setup a link preview service
- Deploy on vercel
- Setup github actions
- [x] Setup directory structure
- [x] Setup well documented eslint config
- [x] Setup jest config
- [x] Setup cypress minimal config
- [x] Setup workflow, lint-staged, lint, tests
- [x] Setup styled-jsx, tailwind and postcss
- [x] Setup layout structuring per page
- [x] Setup declaring global types
-	[x] Setup Error Handling and Sentry
-	[x] Setup browser module (MediaQuery, Agent, tailwindConfig)
-	[x] Setup minimal storybook config
-	[x] Setup Jest mocking service
- [x] Setup optimized google font
- [x] Setup global CSS
- [x] Setup SEO optimization (NextSeo, NextSitemap)
- [x] Setup Analytics
- [x] Setup next-page-tester

### Features to have
- Resume page
- Blog (with comments)
- Authentication
- Show this codebase
- Introduce to machine learning and create an example
- PDF on the go (with paper css)