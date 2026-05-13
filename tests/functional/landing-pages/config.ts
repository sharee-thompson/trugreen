import { getBaseUrl } from "../../../utils"

type Intent = "high" | "med" | "low" | "forNow";

const lpPaths: Record <Intent, string> = {

    high: getBaseUrl + '/highIntentPath',
    med: getBaseUrl + '/medIntentPath',
    low: getBaseUrl + '/lowIntentPath',
   
    forNow:
     "https://tru-g-2025.netlify.app/iframe.html?id=pages-landing-test--default&viewMode=story"


}
    


export function getlpPath(): string {
    const inte = (process.env.INTE as Intent | undefined) || "forNow";
    return lpPaths[inte] || lpPaths.forNow;
}
