# Buy Flow Step File Update Instructions

**Centralized URL Helper**

- We now use `getBaseUrl(path)` from `utils/config.ts` to build all URLs for navigation in tests.

**How to Use**

- Instead of hardcoding URLs like `"https://qa-trugreen.com/buy-online-e"` or using `getBaseUrl() + "/buy-online-e"`,
- Use: `getBaseUrl("/buy-online-e")`

**Why**

- This ensures the `?automation=true` param is always appended correctly.
- It keeps all URL logic in one place, making future changes easy.

**What to Update**

- In all step files, replace any hardcoded URLs or manual base + path combinations with `getBaseUrl(path)`.

**Example**

Before:

```js
await page.goto("https://qa-trugreen.com/buy-online-e");
```

After:

```js
import { getBaseUrl } from "../../../utils/config";
await page.goto(getBaseUrl("/buy-online-e"));
```

---

If you have questions, ask Sharee or check `utils/config.ts` for the helper details.
