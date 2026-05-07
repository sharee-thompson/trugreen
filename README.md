# Trugreen Automation Suite
Created by Sharee Thompson, VML

Contributor Jess Zager, VML

## Quick Links
[Automation Dashboard](https://sharee-thompson.github.io/trugreen/)

[Repo](https://github.com/sharee-thompson/trugreen)

[Confluence Documentation](https://confluence.uhub.biz/display/VMLGLOBAL/TruGreen+AQ+Automation+Dashboard)

## Table of Contents
1. [Testing Capabilities](#testing-capabilities)
2. [Setup](#setup)
3. [Running Tests](#running-tests)
4. [Contributing Guidelines](#contributing-guidelines)

## Testing Capabilities
This is a comprehensive suite that offers a wide range of testing:
- Accessibility via Axe Core
- Link Validation
- Performance that incorporates Lighthouse & a breakdown of the Core Web Vitals scores
- API Validation
- Analytics such as GA4, dataLayer, & outbound tracking
- Functional testing for smoke & user flows
- Visual Regression for the site & its standalone Storybook instance

Each capability has a thorough explanation on its card on the dashboard.

## Setup
1. Request contribution permissions from the Lead
2. Clone repo locally
3. Ensure you have the right packages installed & updated (npm install)
4. Follow the Contributing Guidelines below before beginning any work

### Running Tests
#### Locally
You can elect to run the whole suite or by capability.

##### Everything, & Testing Your Integration
To run the whole suite, you should use this command that will also create a log for debugging:
```
npx playwright test 2>&1 | tee test-output.log
```
The log created has already been added to the gitignore file to prevent it's tracking.

##### By Capability
In package.json, there are configured commands, such as:
```
performance:audit
test:storybook
test:a11y
test:link
test:visual
```
There are several scripts in there, so be sure to check out what is quickly available! And be sure to add your own as needed.

You can run any of these with "npm run", for example:
```
npm run test:storybook
```

#### Github Actions
These are handled by the Lead at this time

## Contributing Guidelines
1. Only the Lead has permission to push to main directly
2. Always begin by pulling the latest changes from main
3. Always create a new branch before working
4. Branch naming convention is "Your Initials/Short Description", ex: "jz/READMEUpdates"
5. Commit each file with a meaningful message, "WIP" is not sufficient
6. If you made a large change or any change to the dependencies, run the whole suite locally to test your integration
7. Push all commits to your branch, then create a PR for review

