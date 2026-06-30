//Global or functional
export { getBaseUrl } from "./config";
export { getFullUrl } from "./config"
export { getLandingPageUrl } from "./config";
export { getQaUrl } from "./config";
export { closeCookieBanner } from "./helpers";
export { getRandomAddress } from "./address";
//Visual
export { takeFullPageScreenshot } from "./visual/helpers";
export { stabilizeElementForScreenshot } from "./visual/helpers";
export { getElementScreenshotOptions } from "./visual/helpers";
export { getElementScreenshotName } from "./visual/helpers";
export { expectElementScreenshot } from "./visual/helpers";
export { gotoHomePage } from "./visual/legacy-waits";
export { waitForStickyChat } from "./visual/legacy-waits";
export { getHomePageElement } from "./visual/legacy-waits";
export { waitForPageContent } from "./visual/legacy-waits";
export { emulateLazyLoadScroll } from "./visual/scrolling-legacy";
export { settleDrupalPage } from "./visual/settle";
export { settleNextPage } from "./visual/settle";
export { selectorsToRemove } from "./visual/selectors";
export { selectorsToMask } from "./visual/selectors";
export { elementScreenshotItems } from "./visual/selectors";
export { removeElementIfExists } from "./visual/selectors";
//Axe
