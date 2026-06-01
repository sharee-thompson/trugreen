# GitHub Actions EOL for Node 20

## As of June 16th, Node24 will be the forced version in Actions, so operations will not work as expected.

- Actions to update:
    - actions/checkout@v4
    - actions/setup-node@v4
    - actions/upload-artifact@v4
    - peaceiris/actions-gh-pages@v3

- Options:
    1. Make updates that are supported by Node24 & test by setting the FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true environment variable on the runner or in your workflow file.
    2. Inversely, temporarily opt out by setting ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION=true environment variable on the runner or in your workflow file BUT will only be an option until September 2026.

### Updates supported by Node24:
    - actions/checkout@v4
        - actions/checkout@v5 or 6
    - actions/setup-node@v4
        ```
        - name: Set up Node.js 24
            uses: actions/setup-node@v6
            with:
                node-version: '24'
                ```
    - actions/upload-artifact@v4
        - actions/upload-artifact@v6
    - peaceiris/actions-gh-pages@v3
        - peaceiris/actions-gh-pages@v4

## Current GitHub Actions Runner version is 2.334.0, upgrading to v5 or v6 requires v2.327.1