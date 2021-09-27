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

### Todo
- Deploy on vercel
-	Add headless-ui
-	Jest mocking service
- Develop server-side, Structure for features/models/queries
- Develop react-query
- Blog (with comments)
- Authentication
- Show this codebase
- Introduce to machine learning and create an example
- Notification

### Done
- Create directory structure
- Implement well documented eslint config
- Implement jest config
- Implement cypress minimal config
- Complete workflow, lint-staged, lint, tests
- Implement styled-jsx, tailwind and postcss
- Implement layout structuring per page
- Implement minimal react-query
- Implement minimal analytics
- Declare clean types
-	Implement Error Handling and Sentry!
-	Implement browser module (MediaQuery, Agent, tailwindConfig)
-	Add minimal storybook config
-	Connect with mongoose
