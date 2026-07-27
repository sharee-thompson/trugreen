# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/visual-regression.spec.ts >> Visual Regression Tests >> Next: home
- Location: tests/visual/visual-regression.spec.ts:72:9

# Error details

```
Error: A snapshot doesn't exist at /home/runner/work/trugreen/trugreen/snaps/visual/prod/chromium/fullpage-next-home.png, writing actual.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]
  - banner:
    - generic [ref=e3]:
      - paragraph [ref=e8] [cursor=pointer]:
        - link "Save time and unlock exclusive online pricing - get started today." [ref=e9]:
          - /url: /buy-online
      - generic [ref=e11]:
        - link "TruGreen Logo" [ref=e13] [cursor=pointer]:
          - /url: /
          - img "TruGreen Logo" [ref=e14]
        - generic [ref=e16]:
          - link "location_icon" [ref=e17] [cursor=pointer]:
            - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - img "location_icon" [ref=e18]
          - link [ref=e19] [cursor=pointer]:
            - /url: tel:1-844-417-3982
            - img [ref=e20]
          - link "hamMenu_icon" [ref=e21] [cursor=pointer]:
            - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - img "hamMenu_icon" [ref=e22]
  - main [ref=e24]:
    - generic [ref=e26]:
      - img "Two people on lawn chairs on a green, flawless lawn." [ref=e27]
      - generic [ref=e31]:
        - heading "Saving your lawn. And your weekends." [level=1] [ref=e32]
        - paragraph [ref=e33]: Locally tailored lawn care, delivered by the Official Lawn Care Treatment Provider of the PGA TOUR®.
        - button "Get Started" [ref=e35] [cursor=pointer]
    - heading "Save 15% when you sign up online." [level=2] [ref=e39]:
      - text: Save 15% when you
      - link "sign up" [ref=e40] [cursor=pointer]:
        - /url: /buy-online
      - text: online.
    - generic [ref=e42]:
      - generic [ref=e43]:
        - heading "The clear choice for a great looking lawn." [level=2] [ref=e44]
        - paragraph [ref=e45]: If you want a lawn that looks truly exceptional, you choose the pros who know how to deliver it.
      - generic [ref=e51]:
        - generic [ref=e56]:
          - img "A smiling TruGreen technician stands proudly on a healthy, vibrant green lawn." [ref=e57]
          - generic [ref=e58]:
            - heading "#1 in America" [level=5] [ref=e59]
            - paragraph [ref=e60]: Millions of Americans choose our locally tailored recipes for healthier, greener, better-looking lawns.
        - generic [ref=e63]:
          - generic [ref=e65]:
            - img "Two TruGreen lawn care specialists collaborating in front of a suburban home." [ref=e66]
            - generic [ref=e67]:
              - heading "The Pro’s Choice" [level=5] [ref=e68]
              - paragraph [ref=e69]: As the Official Lawn Care Treatment Provider of the PGA TOUR® we bring pro-level expertise to your home.
          - img "PGA Logo" [ref=e70]
        - generic [ref=e75]:
          - img "Close-up macro view of a perfectly manicured, dense green lawn." [ref=e76]
          - generic [ref=e77]:
            - heading "Guaranteed Results" [level=5] [ref=e78]
            - paragraph [ref=e79]: If you’re not satisfied, we’ll make it right. That’s our commitment — and it’s backed by the TruGreen Guarantee. ◆
    - generic [ref=e81]:
      - heading "Golf course quality lawn starts with just a few clicks." [level=2] [ref=e82]:
        - link "Golf course quality lawn starts with just a few clicks." [ref=e83] [cursor=pointer]:
          - /url: /buy-online
      - generic [ref=e84]:
        - button "Get Started" [ref=e85] [cursor=pointer]
        - button "Talk To a Pro" [ref=e86] [cursor=pointer]
    - generic [ref=e88]:
      - generic [ref=e89]:
        - heading "The difference local pros make." [level=2] [ref=e90]
        - paragraph [ref=e91]: Explore the differences and see why more homeowners are choosing TruGreen.
      - generic [ref=e92]:
        - generic [ref=e93]:
          - heading "TruGreen" [level=3] [ref=e94]:
            - img "TruGreen" [ref=e95]
          - generic [ref=e96]:
            - generic [ref=e97]:
              - term [ref=e98]: Custom for your lawn
              - definition [ref=e99]: A tailored plan designed for your region, your climate, and the results you want.
            - generic [ref=e100]:
              - term [ref=e101]: We do the work
              - definition [ref=e102]: Our trained specialists apply treatments with precision and adjust throughout the season to keep your lawn on track.
            - generic [ref=e103]:
              - term [ref=e104]: Pro-level results
              - definition [ref=e105]: A lawn that looks greener, feels thicker, and grows stronger — backed by the TruGreen Guarantee. ◆
        - generic [ref=e106]:
          - heading "DIY" [level=3] [ref=e107]
          - generic [ref=e108]:
            - generic [ref=e109]:
              - term [ref=e110]: One-size-fits-all
              - definition [ref=e111]: Store-bought products can’t account for local soil variations, seasonal timing, or your lawn’s specific challenges.
            - generic [ref=e112]:
              - term [ref=e113]: Your weekend, gone
              - definition [ref=e114]: Planning, hauling, spreading, spraying — every step takes time you’d rather spend elsewhere.
            - generic [ref=e115]:
              - term [ref=e116]: You’re on your own
              - definition [ref=e117]: If something goes wrong, there’s no expert to call and no safety net to get your lawn back on track.
        - generic [ref=e118]:
          - heading "Other Guys" [level=3] [ref=e119]
          - generic [ref=e120]:
            - generic [ref=e121]:
              - term [ref=e122]: Limited resources
              - definition [ref=e123]: Without nationwide insights or shared learnings, it becomes harder to adapt as pests, weather, and seasonal issues change.
            - generic [ref=e124]:
              - term [ref=e125]: Variable quality
              - definition [ref=e126]: Without a national training program or on-staff agronomists, the results can be unpredictable.
            - generic [ref=e127]:
              - term [ref=e128]: Limited accountability
              - definition [ref=e129]: Guarantees and fixes often depend on goodwill rather than a structured, nationwide commitment.
    - generic [ref=e132]:
      - heading "What homeowners are saying." [level=2] [ref=e135]
      - generic [ref=e138]:
        - generic [ref=e140]:
          - generic [ref=e144]:
            - generic [ref=e145]:
              - link "Google" [ref=e146] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@34.0356848,-84.0824706,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x38c7d4323d2b288c!8m2!3d34.0356848!4d-84.0824706
                - img "Google" [ref=e147]
              - generic [ref=e148]:
                - heading "Jerald F." [level=5] [ref=e149]
                - generic [ref=e150]:
                  - img "star" [ref=e151]
                  - img "star" [ref=e152]
                  - img "star" [ref=e153]
                  - img "star" [ref=e154]
                  - img "star" [ref=e155]
            - paragraph [ref=e156]: “”
          - generic [ref=e160]:
            - generic [ref=e161]:
              - link "Google" [ref=e162] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@40.0582599,-75.5360024,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xb660dda13e12db60!8m2!3d40.0582599!4d-75.5360024
                - img "Google" [ref=e163]
              - generic [ref=e164]:
                - heading "James M." [level=5] [ref=e165]
                - generic [ref=e166]:
                  - img "star" [ref=e167]
                  - img "star" [ref=e168]
                  - img "star" [ref=e169]
                  - img "star" [ref=e170]
                  - img "star" [ref=e171]
            - paragraph [ref=e172]: “”
          - generic [ref=e176]:
            - generic [ref=e177]:
              - link "Google" [ref=e178] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@42.9130935,-71.4155807,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x9de5bb11e03693ae!8m2!3d42.9130935!4d-71.4155807
                - img "Google" [ref=e179]
              - generic [ref=e180]:
                - heading "Dennis S." [level=5] [ref=e181]
                - generic [ref=e182]:
                  - img "star" [ref=e183]
                  - img "star" [ref=e184]
                  - img "star" [ref=e185]
                  - img "star" [ref=e186]
                  - img "star" [ref=e187]
            - paragraph [ref=e188]: “Sean Trainor is the best!!!”
          - generic [ref=e192]:
            - generic [ref=e193]:
              - link "Google" [ref=e194] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@34.0356848,-84.0824706,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x38c7d4323d2b288c!8m2!3d34.0356848!4d-84.0824706
                - img "Google" [ref=e195]
              - generic [ref=e196]:
                - heading "Jeffrey E." [level=5] [ref=e197]
                - generic [ref=e198]:
                  - img "star" [ref=e199]
                  - img "star" [ref=e200]
                  - img "star" [ref=e201]
                  - img "star" [ref=e202]
                  - img "star" [ref=e203]
            - paragraph [ref=e204]: “I returned late from a medical appointment, and was able to remotely allow access into gated community. The TruGreen Specialist, Justin H, had already treated the lawn. He pointed out the stubborn areas of crabgrass and the dedicated approach he took to addres...”
            - button "More..." [ref=e205] [cursor=pointer]
          - generic [ref=e209]:
            - generic [ref=e210]:
              - link "Google" [ref=e211] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@42.5830564,-114.3612038,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x69c526d3c080e23b!8m2!3d42.5830564!4d-114.3612038
                - img "Google" [ref=e212]
              - generic [ref=e213]:
                - heading "Liz J." [level=5] [ref=e214]
                - generic [ref=e215]:
                  - img "star" [ref=e216]
                  - img "star" [ref=e217]
                  - img "star" [ref=e218]
                  - img "star" [ref=e219]
                  - img "star" [ref=e220]
            - paragraph [ref=e221]: “Raul was amazing he listened to me and allowed me to address my concerns. He was thorough. Definitely appreciated all he did.”
          - generic [ref=e225]:
            - generic [ref=e226]:
              - link "Google" [ref=e227] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@42.4888421,-92.4555146,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x8e472c04412b40e6!8m2!3d42.4888421!4d-92.4555146
                - img "Google" [ref=e228]
              - generic [ref=e229]:
                - heading "Michael M." [level=5] [ref=e230]
                - generic [ref=e231]:
                  - img "star" [ref=e232]
                  - img "star" [ref=e233]
                  - img "star" [ref=e234]
                  - img "star" [ref=e235]
                  - img "star" [ref=e236]
            - paragraph [ref=e237]: “Good visit. Good service. Efficient agent. Carmen was great!”
          - generic [ref=e241]:
            - generic [ref=e242]:
              - link "Google" [ref=e243] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@32.3073531,-90.1690058,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xba94e240827a1200!8m2!3d32.3073531!4d-90.1690058
                - img "Google" [ref=e244]
              - generic [ref=e245]:
                - heading "Teresa Y." [level=5] [ref=e246]
                - generic [ref=e247]:
                  - img "star" [ref=e248]
                  - img "star" [ref=e249]
                  - img "star" [ref=e250]
                  - img "star" [ref=e251]
                  - img "star" [ref=e252]
            - paragraph [ref=e253]: “”
          - generic [ref=e257]:
            - generic [ref=e258]:
              - link "Google" [ref=e259] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@37.2471305,-93.2219728,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x3ed7c502ba7d6864!8m2!3d37.2471305!4d-93.2219728
                - img "Google" [ref=e260]
              - generic [ref=e261]:
                - heading "Elizabeth P." [level=5] [ref=e262]
                - generic [ref=e263]:
                  - img "star" [ref=e264]
                  - img "star" [ref=e265]
                  - img "star" [ref=e266]
                  - img "star" [ref=e267]
                  - img "star" [ref=e268]
            - paragraph [ref=e269]: “TruGreen has been doing a good job for our property for several years now. Always gives us a comprehensive report on what service was provided and what to expect in the future. This week the city we live in out a sign in our yard thanking us for the curb appea...”
            - button "More..." [ref=e270] [cursor=pointer]
          - generic [ref=e274]:
            - generic [ref=e275]:
              - link "Google" [ref=e276] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@41.134397,-85.1959446,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x7265fcbe693d7782!8m2!3d41.134397!4d-85.1959446
                - img "Google" [ref=e277]
              - generic [ref=e278]:
                - heading "Roger J." [level=5] [ref=e279]
                - generic [ref=e280]:
                  - img "star" [ref=e281]
                  - img "star" [ref=e282]
                  - img "star" [ref=e283]
                  - img "star" [ref=e284]
                  - img "star" [ref=e285]
            - paragraph [ref=e286]: “He does a fantastic job 👏 👍 😀”
        - generic [ref=e287]:
          - button "Backwards Navigation Arrow" [ref=e288]
          - button "Forward Navigation Arrow" [ref=e289] [cursor=pointer]
        - generic [ref=e290]:
          - button "Active Selection Indicator" [ref=e291] [cursor=pointer]
          - button "Inactive Selection Indicator" [ref=e293] [cursor=pointer]
          - button "Inactive Selection Indicator" [ref=e295] [cursor=pointer]
    - generic [ref=e298]:
      - generic [ref=e299]:
        - heading "National strength meets local know-how." [level=2] [ref=e301]
        - generic [ref=e302]:
          - paragraph [ref=e303]: Coast to coast, TruGreen® teams deliver a trusted standard. Every visit is tailored and local. Every plan is backed by the strength of a national network. Find your local pros below.
          - link "Get Started" [ref=e304] [cursor=pointer]:
            - /url: "#"
      - generic [ref=e306]:
        - spinbutton [ref=e307]
        - img "searchicon" [ref=e308] [cursor=pointer]
    - generic [ref=e312]:
      - heading "Let's talk lawn." [level=2] [ref=e314]
      - generic [ref=e316]:
        - generic [ref=e318]:
          - generic [ref=e321]:
            - heading "We’ve got you covered." [level=3] [ref=e322]
            - list [ref=e323]:
              - listitem [ref=e324]:
                - generic [ref=e325]: Update your service schedule
              - listitem [ref=e326]:
                - generic [ref=e327]: Ask about treatments in your area
              - listitem [ref=e328]:
                - generic [ref=e329]: Make a payment
              - listitem [ref=e330]:
                - generic [ref=e331]: Add or change service
              - listitem [ref=e332]:
                - generic [ref=e333]: Login assistance
            - paragraph [ref=e334]: Our Virtual Assistant can handle most things and is available 24/7, or you can sign in to manage your account.
            - generic [ref=e335]:
              - link "Chat Now" [ref=e336] [cursor=pointer]:
                - /url: "#"
              - link "Log In" [ref=e337] [cursor=pointer]:
                - /url: /my-account/login
          - img "A friendly TruGreen customer service expert wearing a headset and smiling, ready to assist." [ref=e339]
        - generic [ref=e341]:
          - generic [ref=e343]:
            - heading "Give us a call." [level=4] [ref=e345]
            - paragraph [ref=e346]: Drop us a line and let's connect.
            - paragraph [ref=e347]:
              - generic [ref=e348]:
                - text: "Mon – Fri: 7:30 AM – 10:00 PM ET"
                - text: "Sat: 8:30 AM – 8:00 PM ET"
                - text: "Sun: Closed"
            - link "1-844-417-3982" [ref=e349] [cursor=pointer]:
              - /url: tel:18444173982
            - heading "Send us a text." [level=4] [ref=e351]
            - link "MYLAWN (695296)" [ref=e352] [cursor=pointer]:
              - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
          - generic [ref=e354]:
            - heading "Email us." [level=4] [ref=e355]
            - paragraph [ref=e356]: Send us your suggestions, questions, and feedback. We’ll get back to you in 1-2 business days.
            - link "Email us" [ref=e357] [cursor=pointer]:
              - /url: "#"
  - contentinfo [ref=e358]:
    - generic [ref=e359]:
      - generic [ref=e360]:
        - generic [ref=e362]:
          - heading "About US" [level=5] [ref=e363]
          - list [ref=e364]:
            - listitem [ref=e365]:
              - link "About TruGreen" [ref=e366] [cursor=pointer]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e367]:
              - link "Executive Staff" [ref=e368] [cursor=pointer]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e369]:
              - link "Newsroom" [ref=e370] [cursor=pointer]:
                - /url: /newsroom
            - listitem [ref=e371]:
              - link "CA Climate Disclosure" [ref=e372] [cursor=pointer]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - listitem [ref=e373]:
              - link "Careers" [ref=e374] [cursor=pointer]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e376]:
          - heading "Our Services" [level=5] [ref=e377]
          - list [ref=e378]:
            - listitem [ref=e379]:
              - link "Lawn Care Plan Comparison" [ref=e380] [cursor=pointer]:
                - /url: /products-and-services
            - listitem [ref=e381]:
              - link "Tree & Shrub Plan Overview" [ref=e382] [cursor=pointer]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e383]:
              - link "Pest Control Plan Comparison" [ref=e384] [cursor=pointer]:
                - /url: /pests-products-and-services
            - listitem [ref=e385]:
              - link "Branch Finder" [ref=e386] [cursor=pointer]:
                - /url: /local-lawn-care
        - generic [ref=e388]:
          - heading "Resources" [level=5] [ref=e389]
          - list [ref=e390]:
            - listitem [ref=e391]:
              - link "FAQs" [ref=e392] [cursor=pointer]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e393]:
              - link "Military Discount" [ref=e394] [cursor=pointer]:
                - /url: /military-discount
            - listitem [ref=e395]:
              - link "Learning Center" [ref=e396] [cursor=pointer]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e397]:
              - link "Blogs" [ref=e398] [cursor=pointer]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e399]:
              - link "Service Terms and Conditions" [ref=e400] [cursor=pointer]:
                - /url: /service-terms-and-conditions
        - generic [ref=e403]:
          - heading "For new service" [level=5] [ref=e404]
          - list [ref=e405]:
            - listitem [ref=e406]:
              - link "1-844-417-3982" [ref=e407] [cursor=pointer]:
                - /url: tel:1-844-417-3982
            - listitem [ref=e408]:
              - link "Get a Call Back" [ref=e409] [cursor=pointer]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e412]:
          - heading "For our Customers" [level=5] [ref=e413]
          - list [ref=e414]:
            - listitem [ref=e415]:
              - link "Account Login & Register" [ref=e416] [cursor=pointer]:
                - /url: /my-account/login
            - listitem [ref=e417]:
              - generic [ref=e418]: "Call:"
              - link "1-844-417-3982" [ref=e419] [cursor=pointer]:
                - /url: tel:1-844-417-3982
            - listitem [ref=e420]:
              - 'link "Text: MYLAWN (695296)" [ref=e421] [cursor=pointer]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e422]:
              - link "Customer Support" [ref=e423] [cursor=pointer]:
                - /url: /customer-support
            - listitem [ref=e424]:
              - link "Pay My Bill" [ref=e425] [cursor=pointer]:
                - /url: /pay-your-bill
      - generic [ref=e428]:
        - paragraph [ref=e429]: We may apply a surcharge not to exceed 3% to cover all or part of our costs of accepting your credit card. For Oklahoma-based consumers, the fee will be 2%.
        - paragraph [ref=e430]: "**Available to residential customers for Lawn, TruDefense Mosquito,TruBarrier Perimeter Pest, Flea, Tick & Outdoor Nuisance Pest Control and/or TruShrub Tree & Shrub services only. Requires purchase of annual plan using PrePay or EasyPay. Guarantee based on a matching quote from a Qualified Provider. Parameters include matching service address, number of applications, application price, services to be performed and areas to be treated. Not valid on quotes older than 120 days or one-day sales/seasonal promotions. TruGreen reserves the right to verify. For first year of service only. Limited time offer. Not to be combined with or used in conjunction with any other offer or discount. Valid at participating TruGreen locations. Additional restrictions may apply. Consumer responsible for all sales tax."
        - paragraph [ref=e431]: ◆ TruGreen will gladly visit your property as needed between scheduled visits to ensure your satisfaction. Guarantee applies to full program customers only. Excludes TruBasic and partial programs. Additional restrictions may apply.
        - paragraph [ref=e432]: ✦ Purchase of full lawn plan required for Healthy Lawn Analysis, which is performed at the first visit.
        - paragraph [ref=e433]: ★ Requires purchase of annual plan. Special price is for first application only. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount.
        - paragraph [ref=e434]: ✢ Requires purchase of annual plan. Special price is for first Tree & Shrub application only, for new residential EasyPay or PrePay customers only. TruGreen® Tree & Shrub includes fertilization of common trees and shrubs, and controls common foliar insects and diseases. It does not include treatment of specialty trees such as fruit or certain ornamentals, or assessment and treatment of trees over 25 ft. in height. For more details, go to TruGreen FAQs at TruGreen.com/FAQTREE. Not to be combined with or used in conjunction with any other offer or discount for the same service. Consumer responsible for all sales tax.
        - paragraph [ref=e435]: ★★ Requires purchase of full mosquito plan. Special price is for first mosquito application only, for new EasyPay or PrePay residential customers only. Valid at participating TruGreen locations. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax. ✧ Guarantee applies to full plan customers only.
        - paragraph [ref=e436]: ◆◆ Service does not include removal of webs higher than 10 ft. and application does not protect against termites and other wood-destroying organisms, bedbugs, bees, fleas, German cockroaches, hornets, pharaoh ants, rodents, or ticks. Valid at participating TruGreen locations. Not to be combined with or used in conjunction with any other oﬀer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
        - paragraph [ref=e437]:
          - text: "America’s #1 lawn care company based on U.S. market share of professional lawn care companies. 2023 MMR Brand Health Tracker."
          - link "PGATOUR.COM" [ref=e438] [cursor=pointer]:
            - /url: https://pgatour.com/
          - text: ", PGA TOUR, TPC, SHOTLINK and the SWINGING GOLFER LOGO are trademarks of PGA TOUR, Inc. BBB accredited since 7/01/2012."
      - generic [ref=e439]:
        - generic [ref=e441]:
          - generic [ref=e442]:
            - link "Facebook Icon" [ref=e443] [cursor=pointer]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e444]
            - link "X.com Icon" [ref=e445] [cursor=pointer]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e446]
            - link "Instagram Icon" [ref=e447] [cursor=pointer]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e448]
            - link "Youtube Icon" [ref=e449] [cursor=pointer]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e450]
            - link "TikTok Icon" [ref=e451] [cursor=pointer]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e452]
            - link "Yelp Icon" [ref=e453] [cursor=pointer]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e454]
          - generic [ref=e455]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e456] [cursor=pointer]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e457]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e458]':
              - /url: "#"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e459]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e460] [cursor=pointer]':
              - /url: https://qa-trugreen.com/pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e461]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e462]':
              - /url: "#"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e463]'
        - separator [ref=e464]
      - generic [ref=e467]:
        - paragraph [ref=e469]:
          - img "TruGreen Leaf Logo" [ref=e470]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e472]:
          - listitem [ref=e473]:
            - link "SMS Terms and Conditions" [ref=e474] [cursor=pointer]:
              - /url: /about/sms-terms
          - listitem [ref=e475]:
            - link "Terms and Conditions" [ref=e476] [cursor=pointer]:
              - /url: /about/terms
          - listitem [ref=e477]:
            - link "Privacy Policy" [ref=e478] [cursor=pointer]:
              - /url: /about/privacy-policy
          - listitem [ref=e479]:
            - link "California Privacy Notice" [ref=e480] [cursor=pointer]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e481]:
            - link "Your Privacy Choices privacyoptions" [ref=e482] [cursor=pointer]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e483]
      - button "chat" [ref=e484] [cursor=pointer]:
        - img "chat" [ref=e485]
  - img
  - generic:
    - region "Cookie banner" [ref=e486]:
      - alertdialog "Privacy" [ref=e487]:
        - generic [ref=e489]:
          - generic [ref=e492]:
            - text: We and third parties use cookies and similar tools to track your interactions with this site, perform analytics, and conduct targeted advertising. By using the site, you agree to our use of these technologies and our
            - link "More information about your privacy, opens in a new tab" [ref=e493] [cursor=pointer]:
              - /url: https://www.trugreen.com/about/terms
              - text: Terms and Conditions
            - text: and our
            - link "Privacy Policy" [ref=e494] [cursor=pointer]:
              - /url: https://www.trugreen.com/about/privacy-policy#cookiesandinterest-basedadvertising
            - text: . California residents, please see our
            - link "California Privacy Policy" [ref=e495] [cursor=pointer]:
              - /url: https://www.trugreen.com/about/california-privacy-policy
          - generic [ref=e497]:
            - button "Cookie Settings" [ref=e498] [cursor=pointer]
            - button "Reject All" [ref=e499] [cursor=pointer]
            - button "Accept All Cookies" [ref=e500] [cursor=pointer]
        - button "Close" [ref=e502] [cursor=pointer]
    - text: Cookie Settings
  - button "Provide Feedback" [ref=e503] [cursor=pointer]:
    - generic [ref=e505]: Provide Feedback
  - dialog [ref=e506]:
    - button [ref=e508] [cursor=pointer]:
      - img [ref=e509]
  - iframe
```

# Test source

```ts
  1  | import { test, expect, type Page } from "@playwright/test";
  2  | import { getBaseUrl } from "../../utils/config";
  3  | import { visualDrupalPaths, visualNextPaths } from "../../utils/paths";
  4  | import {
  5  |   selectorsToRemove,
  6  |   selectorsToMask,
  7  |   elementScreenshotItems,
  8  |   expectElementScreenshot,
  9  |   settleDrupalPage,
  10 |   settleNextPage,
  11 | } from "../../utils/index";
  12 | import fs from "fs";
  13 | import path from "path";
  14 | 
  15 | const hideCssPath = path.join(__dirname, "visual-hide.css");
  16 | 
  17 | async function runFullPageVisualCheck(
  18 |   page: Page,
  19 |   name: string,
  20 |   visualPath: string,
  21 |   prefix: "drupal" | "next",
  22 |   settle: (page: Page) => Promise<void>,
  23 | ) {
  24 |   const targetUrl = getBaseUrl(visualPath);
  25 |   await page.goto(targetUrl, { waitUntil: "domcontentloaded" });
  26 | 
  27 |   await settle(page);
  28 | 
> 29 |   await expect(page).toHaveScreenshot(`fullpage-${prefix}-${name}.png`, {
     |   ^ Error: A snapshot doesn't exist at /home/runner/work/trugreen/trugreen/snaps/visual/prod/chromium/fullpage-next-home.png, writing actual.
  30 |     fullPage: true,
  31 |     stylePath: hideCssPath,
  32 |     mask: selectorsToMask.map((item) => page.locator(item.selector)),
  33 |     maskColor: "#FF7F50",
  34 |     maxDiffPixelRatio: 0.03,
  35 |   });
  36 | }
  37 | 
  38 | test.describe("Visual Regression Tests", {tag: ["@visual-regression", "@visual"]}, () => {
  39 | 
  40 |   test.beforeAll(() => {
  41 |     const css =
  42 |       selectorsToRemove.map((item) => item.selector).join(", ") +
  43 |       " { display: none !important; }";
  44 |     fs.writeFileSync(hideCssPath, css);
  45 |     console.log(
  46 |       `\nVisual Regression Tests - Environment: ${process.env.ENV || "prod"}\n`,
  47 |     );
  48 |   });
  49 | 
  50 |   // STEP 1 — element screenshots of removable selectors, once each (home page).
  51 |   for (const item of elementScreenshotItems) {
  52 |     test(`element: ${item.name}`, async ({ page }) => {
  53 |       await expectElementScreenshot(page, item);
  54 |     });
  55 |   }
  56 | 
  57 |   // STEP 2 — Drupal full pages (lazy-image settle).
  58 |   for (const [name, visualPath] of Object.entries(visualDrupalPaths)) {
  59 |     test(`Drupal: ${name}`, async ({ page }) => {
  60 |       await runFullPageVisualCheck(
  61 |         page,
  62 |         name,
  63 |         visualPath,
  64 |         "drupal",
  65 |         settleDrupalPage,
  66 |       );
  67 |     });
  68 |   }
  69 | 
  70 |   // STEP 3 — Next.js full pages (hydration settle).
  71 |   for (const [name, visualPath] of Object.entries(visualNextPaths)) {
  72 |     test(`Next: ${name}`, async ({ page }) => {
  73 |       await runFullPageVisualCheck(
  74 |         page,
  75 |         name,
  76 |         visualPath,
  77 |         "next",
  78 |         settleNextPage,
  79 |       );
  80 |     });
  81 |   }
  82 | });
  83 | 
```