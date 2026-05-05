//Did not include axe helper functions so I didn't break anything
export { getBaseUrl } from "./config";
export { emulateLazyLoadScroll } from "./helpers";
//Did not export runWhilePageOpen or isClosedPageError since above uses those
export { emulateLazyLoadScrollV2 } from "./visualAssistance";
export { forceFonts } from "./visualAssistance";