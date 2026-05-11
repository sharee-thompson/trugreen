# Future Refinements
As the project grows, we will encounter more stories that require a click to reveal the component under test. Additionally, we will need to include some behavior validation, like hover states. This note is to hold details on ensuring test maintainability.

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