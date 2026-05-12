# Future Refinements
As the project grows, we will encounter more stories that require a click to reveal the component under test. Additionally, we will need to include some behavior validation, like hover states. This note is to hold details on ensuring test maintainability.

## Table of Contents
1. [Required Click](#required-click)
2. [Useful Additional Validations](#additional-validation)
3. [Build Webhook](#storybook-build-webhook)

## Required Click
Currently, we will maintain a list of stories whose components will require a click before the screenshot is taken.

In the future, we should request developers add a tag to the stories in addition to "test" & "dev", like "click-to-reveal". Example:
```
// PhoneContact.stories.js
export const WithDropdown = {
tags: ["test", "click-to-reveal"],
// ...
};
```
Then in the index.json file will show:
```
"components-example--default": {
      "type": "story",
      "id": "components-example--default",
      "name": "Default",
      "title": "Components/Example",
      "importPath": "./src/_components/example/stories/example.stories.js",
      "componentPath": "./src/_components/example/example.js",
      "tags": [
        "dev",
        "test", 
        "click-to-reveal"
      ]
    },
```

## Additional Validation
Here, I'll add a list of behavior to validate while creating these components.
1. Buttons, hover state
    - Phone CTA not currently button, just a href wrapping the parts. This also needs that validation.

## Storybook Build Webhook
We want the ability to automate testing when a new Storybook build occurs, as well as preserve the scheduler & on-demand testing.

### Options
1. Consolidate the two workflows into the existing Storybook yml file
2. Use two separate yml files for each purpose, preserving the exisitng Storybook workflow

### TODO
Access the Netlify account via Jacob, then select HTTP POST request under Deploy Notifications.
In GitHub, Generate a GitHub Token: Create a Personal Access Token (classic) with repo scope so Netlify can trigger your workflow.
Back in Netlify:
Click Add notification and select Outgoing webhook.
Event: Choose Deploy succeeded (or Deploy failed if needed).
URL: Use the GitHub API endpoint for your repo:
https://github.com
Configure Headers: You must pass authorization for GitHub to accept the request.
Authorization: Bearer YOUR_GITHUB_TOKEN
Accept: application/vnd.github.v3+json
