# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/visual-regression.spec.ts >> Visual Regression Tests @visual-regression >> should match screenshot for /
- Location: tests/visual/visual-regression.spec.ts:31:9

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  Expected an image 1280px by 6554px, received 1280px by 6419px. 835628 pixels (ratio 0.10 of all image pixels) are different.

Call log:
  - Expect "toHaveScreenshot" with timeout 5000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 1280px by 6554px, received 1280px by 6419px. 832774 pixels (ratio 0.10 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 1280px by 6554px, received 1280px by 6419px. 835628 pixels (ratio 0.10 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]
  - banner:
    - generic [ref=e3]:
      - paragraph [ref=e8] [cursor=pointer]:
        - 'link "Save Like a Pro, Get 50% Off. Use Code: SUMMER." [ref=e9]':
          - /url: /buy-online
          - text: Get 50% Off This Summer.
          - superscript [ref=e10]: "5"
          - text: "Use Code: SUMMER at Checkout."
      - generic [ref=e12]:
        - link "TruGreen Logo" [ref=e14] [cursor=pointer]:
          - /url: /
          - img "TruGreen Logo" [ref=e15]
        - generic [ref=e17]:
          - link "location_icon" [ref=e18] [cursor=pointer]:
            - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - img "location_icon" [ref=e19]
          - link [ref=e20] [cursor=pointer]:
            - /url: tel:1-844-683-7832
            - img [ref=e21]
          - link "hamMenu_icon" [ref=e22] [cursor=pointer]:
            - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - img "hamMenu_icon" [ref=e23]
  - main [ref=e25]:
    - generic [ref=e27]:
      - img "Two people on lawn chairs on a green, flawless lawn." [ref=e28]
      - generic [ref=e32]:
        - heading "Saving your lawn. And your weekends." [level=1] [ref=e33]
        - paragraph [ref=e34]: Locally tailored lawn care, delivered by the Official Lawn Care Treatment Provider of the PGA TOUR®.
        - button "Get Started" [ref=e36] [cursor=pointer]
    - heading "Save 15% when you sign up online." [level=2] [ref=e41]:
      - text: Save 15% when you
      - link "sign up" [ref=e42] [cursor=pointer]:
        - /url: /buy-online
      - text: online.
    - generic [ref=e44]:
      - generic [ref=e45]:
        - heading "The clear choice for a great looking lawn." [level=2] [ref=e46]
        - paragraph [ref=e47]: If you want a lawn that looks truly exceptional, you choose the pros who know how to deliver it.
      - generic [ref=e53]:
        - generic [ref=e58]:
          - img "A smiling TruGreen technician stands proudly on a healthy, vibrant green lawn." [ref=e59]
          - generic [ref=e60]:
            - heading "#1 in America" [level=5] [ref=e61]
            - paragraph [ref=e62]: Millions of Americans choose our locally tailored recipes for healthier, greener, better-looking lawns.
        - generic [ref=e65]:
          - generic [ref=e67]:
            - img "Two TruGreen lawn care specialists collaborating in front of a suburban home." [ref=e68]
            - generic [ref=e69]:
              - heading "The Pro’s Choice" [level=5] [ref=e70]
              - paragraph [ref=e71]: As the Official Lawn Care Treatment Provider of the PGA TOUR® we bring pro-level expertise to your home.
          - img "PGA Logo" [ref=e72]
        - generic [ref=e77]:
          - img "Close-up macro view of a perfectly manicured, dense green lawn." [ref=e78]
          - generic [ref=e79]:
            - heading "Guaranteed Results" [level=5] [ref=e80]
            - paragraph [ref=e81]: If you’re not satisfied, we’ll make it right. That’s our commitment — and it’s backed by the TruGreen Guarantee. ◆
    - generic [ref=e84]:
      - heading "Golf course quality lawn starts with just a few clicks." [level=2] [ref=e86]
      - generic [ref=e87]:
        - button "Get Started" [ref=e88] [cursor=pointer]
        - button "Talk To a Pro" [ref=e89] [cursor=pointer]
    - generic [ref=e91]:
      - generic [ref=e92]:
        - heading "The difference local pros make." [level=2] [ref=e93]
        - paragraph [ref=e94]: Explore the differences and see why more homeowners are choosing TruGreen.
      - generic [ref=e95]:
        - generic [ref=e96]:
          - heading "TruGreen" [level=3] [ref=e97]:
            - img "TruGreen" [ref=e98]
          - generic [ref=e99]:
            - generic [ref=e100]:
              - term [ref=e101]: Custom for your lawn
              - definition [ref=e102]: A tailored plan designed for your region, your climate, and the results you want.
            - generic [ref=e103]:
              - term [ref=e104]: We do the work
              - definition [ref=e105]: Our trained specialists apply treatments with precision and adjust throughout the season to keep your lawn on track.
            - generic [ref=e106]:
              - term [ref=e107]: Pro-level results
              - definition [ref=e108]: A lawn that looks greener, feels thicker, and grows stronger — backed by the TruGreen Guarantee. ◆
        - generic [ref=e109]:
          - heading "DIY" [level=3] [ref=e110]
          - generic [ref=e111]:
            - generic [ref=e112]:
              - term [ref=e113]: One-size-fits-all
              - definition [ref=e114]: Store-bought products can’t account for local soil variations, seasonal timing, or your lawn’s specific challenges.
            - generic [ref=e115]:
              - term [ref=e116]: Your weekend, gone
              - definition [ref=e117]: Planning, hauling, spreading, spraying — every step takes time you’d rather spend elsewhere.
            - generic [ref=e118]:
              - term [ref=e119]: You’re on your own
              - definition [ref=e120]: If something goes wrong, there’s no expert to call and no safety net to get your lawn back on track.
        - generic [ref=e121]:
          - heading "Other Guys" [level=3] [ref=e122]
          - generic [ref=e123]:
            - generic [ref=e124]:
              - term [ref=e125]: Limited resources
              - definition [ref=e126]: Without nationwide insights or shared learnings, it becomes harder to adapt as pests, weather, and seasonal issues change.
            - generic [ref=e127]:
              - term [ref=e128]: Variable quality
              - definition [ref=e129]: Without a national training program or on-staff agronomists, the results can be unpredictable.
            - generic [ref=e130]:
              - term [ref=e131]: Limited accountability
              - definition [ref=e132]: Guarantees and fixes often depend on goodwill rather than a structured, nationwide commitment.
    - generic [ref=e135]:
      - heading "What homeowners are saying." [level=2] [ref=e138]
      - generic [ref=e141]:
        - generic [ref=e143]:
          - generic [ref=e147]:
            - generic [ref=e148]:
              - link "Google" [ref=e149] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@47.2087195,-122.30243,15z/data=!4m5!3m4!1s0x0:0x283e21cf2f89b6ee!8m2!3d47.2087195!4d-122.30243
                - img "Google" [ref=e150]
              - generic [ref=e151]:
                - heading "Franklyn B." [level=5] [ref=e152]
                - generic [ref=e153]:
                  - img "star" [ref=e154]
                  - img "star" [ref=e155]
                  - img "star" [ref=e156]
                  - img "star" [ref=e157]
                  - img "star" [ref=e158]
            - paragraph [ref=e159]: “”
          - generic [ref=e163]:
            - generic [ref=e164]:
              - link "Google" [ref=e165] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@41.0469616,-74.115191,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x8045252de246b452!8m2!3d41.0469616!4d-74.115191
                - img "Google" [ref=e166]
              - generic [ref=e167]:
                - heading "David T." [level=5] [ref=e168]
                - generic [ref=e169]:
                  - img "star" [ref=e170]
                  - img "star" [ref=e171]
                  - img "star" [ref=e172]
                  - img "star" [ref=e173]
                  - img "star" [ref=e174]
            - paragraph [ref=e175]: “”
          - generic [ref=e179]:
            - generic [ref=e180]:
              - link "Google" [ref=e181] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@41.03715,-77.515633,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x1ecc9be6048c1ffa!8m2!3d41.03715!4d-77.515633
                - img "Google" [ref=e182]
              - generic [ref=e183]:
                - heading "Tom H." [level=5] [ref=e184]
                - generic [ref=e185]:
                  - img "star" [ref=e186]
                  - img "star" [ref=e187]
                  - img "star" [ref=e188]
                  - img "star" [ref=e189]
                  - img "star" [ref=e190]
            - paragraph [ref=e191]: “Good experience. Technician was cheerful professional and knowledgeable.”
          - generic [ref=e195]:
            - generic [ref=e196]:
              - link "Google" [ref=e197] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@43.5155982,-84.1158447,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x515ce98f5e26bdaa!8m2!3d43.5155982!4d-84.1158447
                - img "Google" [ref=e198]
              - generic [ref=e199]:
                - heading "Daniel S." [level=5] [ref=e200]
                - generic [ref=e201]:
                  - img "star" [ref=e202]
                  - img "star" [ref=e203]
                  - img "star" [ref=e204]
                  - img "star" [ref=e205]
                  - img "star" [ref=e206]
            - paragraph [ref=e207]: “”
          - generic [ref=e211]:
            - generic [ref=e212]:
              - link "Google" [ref=e213] [cursor=pointer]:
                - /url: https://maps.google.com/maps?cid=2602837138649269435
                - img "Google" [ref=e214]
              - generic [ref=e215]:
                - heading "John V." [level=5] [ref=e216]
                - generic [ref=e217]:
                  - img "star" [ref=e218]
                  - img "star" [ref=e219]
                  - img "star" [ref=e220]
                  - img "star" [ref=e221]
                  - img "star" [ref=e222]
            - paragraph [ref=e223]: “Always professional and engaging. Answered all my questions and concerns.”
          - generic [ref=e227]:
            - generic [ref=e228]:
              - link "Google" [ref=e229] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@45.3995014,-122.7353071,15z/data=!4m5!3m4!1s0x0:0x87c506d38042e335!8m2!3d45.3995014!4d-122.7353071
                - img "Google" [ref=e230]
              - generic [ref=e231]:
                - heading "Shira S." [level=5] [ref=e232]
                - generic [ref=e233]:
                  - img "star" [ref=e234]
                  - img "star" [ref=e235]
                  - img "star" [ref=e236]
                  - img "star" [ref=e237]
                  - img "star" [ref=e238]
            - paragraph [ref=e239]: “Good price, on time, did what they said they'd do l.”
          - generic [ref=e243]:
            - generic [ref=e244]:
              - link "Google" [ref=e245] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@37.6959241,-77.4514305,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x53c50ccb687a2a5d!8m2!3d37.6959241!4d-77.4514305
                - img "Google" [ref=e246]
              - generic [ref=e247]:
                - heading "Milton S." [level=5] [ref=e248]
                - generic [ref=e249]:
                  - img "star" [ref=e250]
                  - img "star" [ref=e251]
                  - img "star" [ref=e252]
                  - img "star" [ref=e253]
                  - img "star" [ref=e254]
            - paragraph [ref=e255]: “Johnnie Chow did a great job. Very courteous and professional Looking forward to working with him.”
          - generic [ref=e259]:
            - generic [ref=e260]:
              - link "Google" [ref=e261] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@27.9861926,-82.1145831,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x19e3038038b30e46!8m2!3d27.9861926!4d-82.1145831
                - img "Google" [ref=e262]
              - generic [ref=e263]:
                - heading "Al L." [level=5] [ref=e264]
                - generic [ref=e265]:
                  - img "star" [ref=e266]
                  - img "star" [ref=e267]
                  - img "star" [ref=e268]
                  - img "star" [ref=e269]
                  - img "star" [ref=e270]
            - paragraph [ref=e271]: “”
          - generic [ref=e275]:
            - generic [ref=e276]:
              - link "Google" [ref=e277] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@27.9861926,-82.1145831,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x19e3038038b30e46!8m2!3d27.9861926!4d-82.1145831
                - img "Google" [ref=e278]
              - generic [ref=e279]:
                - heading "Wismaemanuel W." [level=5] [ref=e280]
                - generic [ref=e281]:
                  - img "star" [ref=e282]
                  - img "star" [ref=e283]
                  - img "star" [ref=e284]
                  - img "star" [ref=e285]
                  - img "star" [ref=e286]
            - paragraph [ref=e287]: “EXCELLENT SERVICE HAPPY 😊”
        - generic [ref=e288]:
          - button "Backwards Navigation Arrow" [ref=e289]
          - button "Forward Navigation Arrow" [ref=e290] [cursor=pointer]
        - generic [ref=e291]:
          - button "Active Selection Indicator" [ref=e292] [cursor=pointer]
          - button "Inactive Selection Indicator" [ref=e294] [cursor=pointer]
          - button "Inactive Selection Indicator" [ref=e296] [cursor=pointer]
    - generic [ref=e299]:
      - generic [ref=e300]:
        - heading "National strength meets local know-how." [level=2] [ref=e302]
        - generic [ref=e303]:
          - paragraph [ref=e304]: Coast to coast, TruGreen® teams deliver a trusted standard. Every visit is tailored and local. Every plan is backed by the strength of a national network. Find your local pros below.
          - link "Get Started" [ref=e305] [cursor=pointer]:
            - /url: "#"
      - generic [ref=e307]:
        - spinbutton [ref=e308]
        - img "searchicon" [ref=e309] [cursor=pointer]
    - generic [ref=e313]:
      - heading "Let's talk lawn." [level=2] [ref=e315]
      - generic [ref=e317]:
        - generic [ref=e319]:
          - generic [ref=e322]:
            - heading "We’ve got you covered." [level=3] [ref=e323]
            - list [ref=e324]:
              - listitem [ref=e325]:
                - generic [ref=e326]: Update your service schedule
              - listitem [ref=e327]:
                - generic [ref=e328]: Ask about treatments in your area
              - listitem [ref=e329]:
                - generic [ref=e330]: Make a payment
              - listitem [ref=e331]:
                - generic [ref=e332]: Add or change service
              - listitem [ref=e333]:
                - generic [ref=e334]: Login assistance
            - paragraph [ref=e335]: Our Virtual Assistant can handle most things and is available 24/7, or you can sign in to manage your account.
            - generic [ref=e336]:
              - link "Chat Now" [ref=e337] [cursor=pointer]:
                - /url: "#"
              - link "Log In" [ref=e338] [cursor=pointer]:
                - /url: /my-account/login
          - img "A friendly TruGreen customer service expert wearing a headset and smiling, ready to assist." [ref=e340]
        - generic [ref=e342]:
          - generic [ref=e344]:
            - heading "Give us a call." [level=4] [ref=e346]
            - paragraph [ref=e347]: Drop us a line and let's connect.
            - paragraph [ref=e348]:
              - generic [ref=e349]:
                - text: "Mon – Fri: 7:30 AM – 10:00 PM ET"
                - text: "Sat: 8:30 AM – 8:00 PM ET"
                - text: "Sun: Closed"
            - link "1-844-683-7832" [ref=e350] [cursor=pointer]:
              - /url: tel:+18443833397
            - heading "Send us a text." [level=4] [ref=e352]
            - link "MYLAWN (695296)" [ref=e353] [cursor=pointer]:
              - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
          - generic [ref=e355]:
            - heading "Email us." [level=4] [ref=e356]
            - paragraph [ref=e357]: Send us your suggestions, questions, and feedback. We’ll get back to you in 1-2 business days.
            - link "Email us" [ref=e358] [cursor=pointer]:
              - /url: "#"
  - contentinfo [ref=e359]:
    - generic [ref=e360]:
      - generic [ref=e361]:
        - generic [ref=e363]:
          - heading "About US" [level=5] [ref=e364]
          - list [ref=e365]:
            - listitem [ref=e366]:
              - link "About TruGreen" [ref=e367] [cursor=pointer]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e368]:
              - link "Executive Staff" [ref=e369] [cursor=pointer]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e370]:
              - link "Newsroom" [ref=e371] [cursor=pointer]:
                - /url: /newsroom
            - listitem [ref=e372]:
              - link "Careers" [ref=e373] [cursor=pointer]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e375]:
          - heading "Our Services" [level=5] [ref=e376]
          - list [ref=e377]:
            - listitem [ref=e378]:
              - link "Lawn Care Plan Comparison" [ref=e379] [cursor=pointer]:
                - /url: /products-and-services
            - listitem [ref=e380]:
              - link "Tree & Shrub Plan Overview" [ref=e381] [cursor=pointer]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e382]:
              - link "Pest Control Plan Comparison" [ref=e383] [cursor=pointer]:
                - /url: /pests-products-and-services
            - listitem [ref=e384]:
              - link "Branch Finder" [ref=e385] [cursor=pointer]:
                - /url: /local-lawn-care
        - generic [ref=e387]:
          - heading "Resources" [level=5] [ref=e388]
          - list [ref=e389]:
            - listitem [ref=e390]:
              - link "FAQs" [ref=e391] [cursor=pointer]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e392]:
              - link "Military Discount" [ref=e393] [cursor=pointer]:
                - /url: /military-discount
            - listitem [ref=e394]:
              - link "Learning Center" [ref=e395] [cursor=pointer]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e396]:
              - link "Blogs" [ref=e397] [cursor=pointer]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e398]:
              - link "Service Terms and Conditions" [ref=e399] [cursor=pointer]:
                - /url: /service-terms-and-conditions
        - generic [ref=e402]:
          - heading "For new service" [level=5] [ref=e403]
          - list [ref=e404]:
            - listitem [ref=e405]:
              - link "1-844-683-7832" [ref=e406] [cursor=pointer]:
                - /url: tel:1-844-683-7832
            - listitem [ref=e407]:
              - link "Get a Call Back" [ref=e408] [cursor=pointer]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e411]:
          - heading "For our Customer" [level=5] [ref=e412]
          - list [ref=e413]:
            - listitem [ref=e414]:
              - link "Account Login & Register" [ref=e415] [cursor=pointer]:
                - /url: /my-account/login
            - listitem [ref=e416]:
              - generic [ref=e417]: "Call:"
              - link "1-844-683-7832" [ref=e418] [cursor=pointer]:
                - /url: tel:1-844-683-7832
            - listitem [ref=e419]:
              - 'link "Text: MYLAWN (695296)" [ref=e420] [cursor=pointer]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e421]:
              - link "Customer Support" [ref=e422] [cursor=pointer]:
                - /url: /customer-support
            - listitem [ref=e423]:
              - link "Pay My Bill" [ref=e424] [cursor=pointer]:
                - /url: /pay-your-bill
      - generic [ref=e427]:
        - paragraph [ref=e428]: "**Available to residential customers for Lawn, TruDefense Mosquito,TruBarrier Perimeter Pest, Flea, Tick & Outdoor Nuisance Pest Control and/or TruShrub Tree & Shrub services only. Requires purchase of annual plan using PrePay or EasyPay. Guarantee based on a matching quote from a Qualified Provider. Parameters include matching service address, number of applications, application price, services to be performed and areas to be treated. Not valid on quotes older than 120 days or one-day sales/seasonal promotions. TruGreen reserves the right to verify. For first year of service only. Limited time offer. Not to be combined with or used in conjunction with any other offer or discount. Valid at participating TruGreen locations. Additional restrictions may apply. Consumer responsible for all sales tax."
        - paragraph [ref=e429]: ¹ Special price of 50% off is for first Lawn application★, Tree & Shrub application✢, and/or Mosquito application★★ only. All other restrictions apply.
        - paragraph [ref=e430]: ◆ TruGreen will gladly visit your property as needed between scheduled visits to ensure your satisfaction. Guarantee applies to full program customers only. Excludes TruBasic and partial programs. Additional restrictions may apply.
        - paragraph [ref=e431]: ✦ Purchase of full lawn plan required for Healthy Lawn Analysis, which is performed at the first visit.
        - paragraph [ref=e432]: ★ Requires purchase of annual plan. Special price is for first application only. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount.
        - paragraph [ref=e433]: ✢ Requires purchase of annual plan. Special price is for first Tree & Shrub application only, for new residential EasyPay or PrePay customers only. TruGreen® Tree & Shrub includes fertilization of common trees and shrubs, and controls common foliar insects and diseases. It does not include treatment of specialty trees such as fruit or certain ornamentals, or assessment and treatment of trees over 25 ft. in height. For more details, go to TruGreen FAQs at TruGreen.com/FAQTREE. Not to be combined with or used in conjunction with any other offer or discount for the same service. Consumer responsible for all sales tax.
        - paragraph [ref=e434]: ★★ Requires purchase of full mosquito plan. Special price is for first mosquito application only, for new EasyPay or PrePay residential customers only. Valid at participating TruGreen locations. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax. ✧ Guarantee applies to full plan customers only.
        - paragraph [ref=e435]: ◆◆ Service does not include removal of webs higher than 10 ft. and application does not protect against termites and other wood-destroying organisms, bedbugs, bees, fleas, German cockroaches, hornets, pharaoh ants, rodents, or ticks. Valid at participating TruGreen locations. Not to be combined with or used in conjunction with any other oﬀer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
        - paragraph [ref=e436]:
          - text: "America’s #1 lawn care company based on U.S. market share of professional lawn care companies. 2023 MMR Brand Health Tracker."
          - link "PGATOUR.COM" [ref=e437] [cursor=pointer]:
            - /url: https://pgatour.com/
          - text: ", PGA TOUR, TPC, SHOTLINK and the SWINGING GOLFER LOGO are trademarks of PGA TOUR, Inc. BBB accredited since 7/01/2012."
        - paragraph [ref=e438]:
          - superscript [ref=e439]: "5"
          - text: Special price is for first two regular lawn services only. Use code SUMMER. Special pricing is given in consideration of your commitment to receive and pay for all treatments under your annual plan. If you cancel before your plan renews, the discounted visits may be charged at full price. Requires purchase of annual Lawn plan, for new residential EasyPay or PrePay customers only. Offer unavailable for lawns larger than 20,000 square feet. Not valid on TruBasic or partial programs. Available 5/22/2026-6/23/2026. One time discount only. Valid at participating TruGreen locations. Availability of services and/or products may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
      - generic [ref=e440]:
        - generic [ref=e442]:
          - generic [ref=e443]:
            - link "Facebook Icon" [ref=e444] [cursor=pointer]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e445]
            - link "X.com Icon" [ref=e446] [cursor=pointer]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e447]
            - link "Instagram Icon" [ref=e448] [cursor=pointer]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e449]
            - link "Youtube Icon" [ref=e450] [cursor=pointer]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e451]
            - link "TikTok Icon" [ref=e452] [cursor=pointer]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e453]
            - link "Yelp Icon" [ref=e454] [cursor=pointer]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e455]
          - generic [ref=e456]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e457] [cursor=pointer]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e458]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e459]':
              - /url: "#"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e460]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e461] [cursor=pointer]':
              - /url: https://www.trugreen.com/pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e462]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e463]':
              - /url: "#"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e464]'
        - separator [ref=e465]
      - generic [ref=e468]:
        - paragraph [ref=e470]:
          - img "TruGreen Leaf Logo" [ref=e471]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e473]:
          - listitem [ref=e474]:
            - link "SMS Terms and Conditions" [ref=e475] [cursor=pointer]:
              - /url: /about/sms-terms
          - listitem [ref=e476]:
            - link "Terms and Conditions" [ref=e477] [cursor=pointer]:
              - /url: /about/terms
          - listitem [ref=e478]:
            - link "Privacy Policy" [ref=e479] [cursor=pointer]:
              - /url: /about/privacy-policy
          - listitem [ref=e480]:
            - link "California Privacy Notice" [ref=e481] [cursor=pointer]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e482]:
            - link "Your Privacy Choices privacyoptions" [ref=e483] [cursor=pointer]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e484]
      - button "chat" [ref=e485] [cursor=pointer]:
        - img "chat" [ref=e486]
  - img
  - generic: Cookie Settings
  - button "Provide Feedback" [ref=e487] [cursor=pointer]:
    - generic [ref=e489]: Provide Feedback
  - dialog [ref=e490]:
    - button [ref=e492] [cursor=pointer]:
      - img [ref=e493]
  - iframe
```

# Test source

```ts
  1  | // @ts-nocheck
  2  | import { test, expect } from "@playwright/test";
  3  | import { getBaseUrl } from "../../utils/config";
  4  | import paths from "../../utils/paths";
  5  | import { emulateLazyLoadScroll } from "../../utils";
  6  | import {
  7  |   selectorsToRemove,
  8  |   selectorsToMask,
  9  |   elementScreenshotItems,
  10 |   expectElementScreenshot,
  11 |   waitForPageContent,
  12 |   removeElementIfExists,
  13 | } from "../../utils/visualAssistance";
  14 | 
  15 | test.describe("Visual Regression Tests @visual-regression", () => {
  16 |   test.beforeAll(() => {
  17 |     console.log(
  18 |       `\nVisual Regression Tests - Environment: ${process.env.ENV || "prod"}\n`,
  19 |     );
  20 |   });
  21 | 
  22 |   for (const item of elementScreenshotItems) {
  23 |     test(`should match screenshot for removed selector ${item.name}`, async ({
  24 |       page,
  25 |     }) => {
  26 |       await expectElementScreenshot(page, item);
  27 |     });
  28 |   }
  29 | 
  30 |   for (const path of paths) {
  31 |     test(`should match screenshot for ${path}`, async ({ page }) => {
  32 |       const url = getBaseUrl(path);
  33 |       await page.goto(url);
  34 | 
  35 |       await waitForPageContent(page, path);
  36 | 
  37 |       await emulateLazyLoadScroll(page);
  38 |       await page.waitForTimeout(5000);
  39 | 
  40 |       for (const item of selectorsToRemove) {
  41 |         await removeElementIfExists(page, item.selector, item.name);
  42 |       }
  43 | 
> 44 |       await expect(page).toHaveScreenshot({
     |                          ^ Error: expect(page).toHaveScreenshot(expected) failed
  45 |         fullPage: true,
  46 |         mask: selectorsToMask.map((item) => page.locator(item.selector)),
  47 |         maxDiffPixelRatio: 0.03,
  48 |       });
  49 |     });
  50 |   }
  51 | });
  52 | 
```