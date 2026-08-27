# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: functional/homepage/homepage.spec.ts >> TruGreen homepage regression >> testimonials carousel shows rated reviews and advances
- Location: tests/functional/homepage/homepage.spec.ts:290:9

# Error details

```
TimeoutError: locator.waitFor: Timeout 30000ms exceeded.
Call log:
  - waiting for getByRole('heading', { name: /What homeowners are saying/i }).first()

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner:
    - generic [ref=e2]:
      - paragraph [ref=e7] [cursor=pointer]:
        - 'link "$9.95 First Application. Use Code: SAVENOW at Checkout." [ref=e8]':
          - /url: /buy-online
          - text: "$9.95 First Application. Use Code: SAVENOW at Checkout."
          - superscript [ref=e9]: "3"
      - navigation "Mobile navigation" [ref=e10]:
        - generic [ref=e11]:
          - link "TruGreen Logo" [ref=e13]:
            - /url: /
            - img "TruGreen Logo" [ref=e14]
          - generic [ref=e16]:
            - link "location_icon" [ref=e17]:
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - img "location_icon" [ref=e18]
            - link "Call customer service" [ref=e19]:
              - /url: tel:1-844-396-6596
              - img "Call customer service" [ref=e20]
            - link "hamMenu_icon" [ref=e21]:
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - img "hamMenu_icon" [ref=e22]
  - main [ref=e23]:
    - main [ref=e24]:
      - generic [ref=e26]:
        - img "TruGreen promotional banner featuring a TruGreen specialist on a lawn." [ref=e28]
        - generic [ref=e32]:
          - heading "Don’t let summer heat and weeds ruin your yard." [level=1] [ref=e33]
          - paragraph [ref=e34]:
            - text: Late-summer weeds, brown patches, and heat stress hit every neighborhood differently and your local TruGreen team is ready to help. Get your first application for just
            - strong [ref=e35]: $9.95
            - superscript [ref=e36]: "3"
            - text: with promo code
            - strong [ref=e37]: SAVENOW
            - text: by September 15
            - superscript [ref=e38]: th
            - text: .
          - button "Start Today" [ref=e40] [cursor=pointer]
      - heading "Save 15% when you sign up online." [level=2] [ref=e44]:
        - text: Save 15% when you
        - link "sign up" [ref=e45]:
          - /url: /buy-online
        - text: online.
      - generic [ref=e47]:
        - generic [ref=e48]:
          - heading "The difference local pros make." [level=2] [ref=e49]
          - paragraph [ref=e50]: Explore the differences and see why more homeowners are choosing TruGreen.
        - generic [ref=e51]:
          - generic [ref=e52]:
            - heading "TruGreen" [level=3] [ref=e53]:
              - img "TruGreen" [ref=e54]
            - generic [ref=e55]:
              - generic [ref=e56]:
                - term [ref=e57]: Custom for your lawn
                - definition [ref=e58]: A tailored plan designed for your region, your climate, and the results you want.
              - generic [ref=e59]:
                - term [ref=e60]: We do the work
                - definition [ref=e61]: Our trained specialists apply treatments with precision and adjust throughout the season to keep your lawn on track.
              - generic [ref=e62]:
                - term [ref=e63]: Pro-level results
                - definition [ref=e64]: A lawn that looks greener, feels thicker, and grows stronger — backed by the TruGreen Guarantee. ◆
          - generic [ref=e65]:
            - heading "DIY" [level=3] [ref=e66]
            - generic [ref=e67]:
              - generic [ref=e68]:
                - term [ref=e69]: One-size-fits-all
                - definition [ref=e70]: Store-bought products can’t account for local soil variations, seasonal timing, or your lawn’s specific challenges.
              - generic [ref=e71]:
                - term [ref=e72]: Your weekend, gone
                - definition [ref=e73]: Planning, hauling, spreading, spraying — every step takes time you’d rather spend elsewhere.
              - generic [ref=e74]:
                - term [ref=e75]: You’re on your own
                - definition [ref=e76]: If something goes wrong, there’s no expert to call and no safety net to get your lawn back on track.
          - generic [ref=e77]:
            - heading "Other Guys" [level=3] [ref=e78]
            - generic [ref=e79]:
              - generic [ref=e80]:
                - term [ref=e81]: Limited resources
                - definition [ref=e82]: Without nationwide insights or shared learnings, it becomes harder to adapt as pests, weather, and seasonal issues change.
              - generic [ref=e83]:
                - term [ref=e84]: Variable quality
                - definition [ref=e85]: Without a national training program or on-staff agronomists, the results can be unpredictable.
              - generic [ref=e86]:
                - term [ref=e87]: Limited accountability
                - definition [ref=e88]: Guarantees and fixes often depend on goodwill rather than a structured, nationwide commitment.
      - generic [ref=e90]:
        - heading "Golf course quality lawn starts with just a few clicks." [level=2] [ref=e91]
        - generic [ref=e92]:
          - button "Get Started" [ref=e93] [cursor=pointer]
          - button "Talk To a Pro" [ref=e94] [cursor=pointer]
      - generic [ref=e96]:
        - generic [ref=e97]:
          - heading "Why homeowners choose TruGreen." [level=2] [ref=e98]
          - paragraph [ref=e99]: If you want a lawn that looks truly exceptional, you choose the pros who know how to deliver it.
        - generic [ref=e103]:
          - generic [ref=e105]:
            - generic [ref=e108]:
              - generic [ref=e110]:
                - img "Two TruGreen lawn care specialists collaborating in front of a suburban home." [ref=e111]
                - generic [ref=e112]:
                  - heading "The Pro’s Choice" [level=5] [ref=e113]
                  - paragraph [ref=e114]: As the Official Lawn Care Treatment Provider of the PGA TOUR® we bring pro-level expertise to your home.
              - img "PGA Logo" [ref=e115]
            - generic [ref=e120]:
              - img "Close-up macro view of a perfectly manicured, dense green lawn." [ref=e121]
              - generic [ref=e122]:
                - heading "Guaranteed Results" [level=5] [ref=e123]
                - paragraph [ref=e124]: If you’re not satisfied, we’ll make it right. That’s our commitment — and it’s backed by the TruGreen Guarantee. ◆
            - generic [ref=e129]:
              - img "A smiling TruGreen technician stands proudly on a healthy, vibrant green lawn." [ref=e130]
              - generic [ref=e131]:
                - heading "#1 in America" [level=5] [ref=e132]
                - paragraph [ref=e133]: Millions of Americans choose our locally tailored recipes for healthier, greener, better-looking lawns.
            - generic [ref=e136]:
              - generic [ref=e138]:
                - img "Two TruGreen lawn care specialists collaborating in front of a suburban home." [ref=e139]
                - generic [ref=e140]:
                  - heading "The Pro’s Choice" [level=5] [ref=e141]
                  - paragraph [ref=e142]: As the Official Lawn Care Treatment Provider of the PGA TOUR® we bring pro-level expertise to your home.
              - img "PGA Logo" [ref=e143]
            - generic [ref=e148]:
              - img "Close-up macro view of a perfectly manicured, dense green lawn." [ref=e149]
              - generic [ref=e150]:
                - heading "Guaranteed Results" [level=5] [ref=e151]
                - paragraph [ref=e152]: If you’re not satisfied, we’ll make it right. That’s our commitment — and it’s backed by the TruGreen Guarantee. ◆
            - generic [ref=e157]:
              - img "A smiling TruGreen technician stands proudly on a healthy, vibrant green lawn." [ref=e158]
              - generic [ref=e159]:
                - heading "#1 in America" [level=5] [ref=e160]
                - paragraph [ref=e161]: Millions of Americans choose our locally tailored recipes for healthier, greener, better-looking lawns.
            - generic [ref=e164]:
              - generic [ref=e166]:
                - img "Two TruGreen lawn care specialists collaborating in front of a suburban home." [ref=e167]
                - generic [ref=e168]:
                  - heading "The Pro’s Choice" [level=5] [ref=e169]
                  - paragraph [ref=e170]: As the Official Lawn Care Treatment Provider of the PGA TOUR® we bring pro-level expertise to your home.
              - img "PGA Logo" [ref=e171]
          - generic [ref=e172]:
            - button "Active Selection Indicator" [ref=e173] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e175] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e177] [cursor=pointer]
      - generic [ref=e180]:
        - generic [ref=e181]:
          - heading "National strength meets local know-how." [level=2] [ref=e183]
          - generic [ref=e184]:
            - paragraph [ref=e185]: Coast to coast, TruGreen® teams deliver a trusted standard. Every visit is tailored and local. Every plan is backed by the strength of a national network. Find your local pros below.
            - link "Get Started" [ref=e186] [cursor=pointer]:
              - /url: "#"
        - generic [ref=e187]:
          - generic [ref=e188]:
            - spinbutton [ref=e189]
            - img "searchicon" [ref=e190] [cursor=pointer]
          - generic [ref=e192]:
            - region "Map" [ref=e193]
            - generic [ref=e194]:
              - generic [ref=e195]:
                - generic:
                  - generic:
                    - generic [ref=e218]: "15"
                    - generic [ref=e223]: "27"
                    - generic [ref=e228]: "5"
                    - generic [ref=e233]: "11"
                    - generic [ref=e238]: "18"
                    - generic [ref=e243]: "4"
                    - generic [ref=e248]: "6"
                    - generic [ref=e253]: "10"
                    - generic [ref=e258]: "12"
                    - generic [ref=e263]: "6"
                    - generic [ref=e268]: "7"
                    - generic [ref=e273]: "2"
                    - generic [ref=e278]: "3"
                    - generic [ref=e283]: "4"
                    - generic [ref=e288]: "2"
                    - generic [ref=e293]: "11"
                    - generic [ref=e298]: "4"
                    - generic [ref=e303]: "14"
                    - generic [ref=e308]: "6"
                    - generic [ref=e313]: "4"
                    - generic [ref=e318]: "7"
                    - generic [ref=e323]: "4"
                    - generic [ref=e328]: "4"
                    - generic [ref=e333]: "2"
                    - generic [ref=e338]: "3"
                    - generic [ref=e343]: "2"
                    - generic [ref=e348]: "2"
                    - generic [ref=e353]: "3"
                    - generic [ref=e358]: "2"
                    - generic [ref=e363]: "4"
                    - generic [ref=e368]: "8"
                    - generic [ref=e373]: "5"
                    - generic [ref=e378]: "2"
                    - generic [ref=e383]: "4"
                    - generic [ref=e388]: "2"
                    - generic [ref=e393]: "2"
                    - generic [ref=e398]: "3"
                    - generic [ref=e403]: "4"
                    - generic [ref=e408]: "2"
                - generic [ref=e410]:
                  - generic:
                    - generic:
                      - generic:
                        - button "branchIcon" [ref=e412] [cursor=pointer]:
                          - img "branchIcon" [ref=e413]
                        - button "branchIcon" [ref=e414] [cursor=pointer]:
                          - img "branchIcon" [ref=e415]
                        - button "branchIcon" [ref=e416] [cursor=pointer]:
                          - img "branchIcon" [ref=e417]
                        - button "branchIcon" [ref=e418] [cursor=pointer]:
                          - img "branchIcon" [ref=e419]
                        - button "branchIcon" [ref=e420] [cursor=pointer]:
                          - img "branchIcon" [ref=e421]
                        - button "branchIcon" [ref=e422] [cursor=pointer]:
                          - img "branchIcon" [ref=e423]
                        - button "branchIcon" [ref=e424] [cursor=pointer]:
                          - img "branchIcon" [ref=e425]
                        - button "branchIcon" [ref=e426] [cursor=pointer]:
                          - img "branchIcon" [ref=e427]
                        - button "branchIcon" [ref=e428] [cursor=pointer]:
                          - img "branchIcon" [ref=e429]
                        - button "branchIcon" [ref=e430] [cursor=pointer]:
                          - img "branchIcon" [ref=e431]
                        - button "branchIcon" [ref=e432] [cursor=pointer]:
                          - img "branchIcon" [ref=e433]
                        - button "branchIcon" [ref=e434] [cursor=pointer]:
                          - img "branchIcon" [ref=e435]
                        - button "branchIcon" [ref=e436] [cursor=pointer]:
                          - img "branchIcon" [ref=e437]
                        - button "branchIcon" [ref=e438] [cursor=pointer]:
                          - img "branchIcon" [ref=e439]
                        - button "branchIcon" [ref=e440] [cursor=pointer]:
                          - img "branchIcon" [ref=e441]
                        - button "branchIcon" [ref=e442] [cursor=pointer]:
                          - img "branchIcon" [ref=e443]
                        - button "branchIcon" [ref=e444] [cursor=pointer]:
                          - img "branchIcon" [ref=e445]
                        - button "branchIcon" [ref=e446] [cursor=pointer]:
                          - img "branchIcon" [ref=e447]
                      - button "15" [ref=e448] [cursor=pointer]
                      - button "27" [ref=e449] [cursor=pointer]
                      - button "5" [ref=e450] [cursor=pointer]
                      - button "11" [ref=e451] [cursor=pointer]
                      - button "18" [ref=e452] [cursor=pointer]
                      - button "4" [ref=e453] [cursor=pointer]
                      - button "6" [ref=e454] [cursor=pointer]
                      - button "10" [ref=e455] [cursor=pointer]
                      - button "12" [ref=e456] [cursor=pointer]
                      - button "6" [ref=e457] [cursor=pointer]
                      - button "7" [ref=e458] [cursor=pointer]
                      - button "2" [ref=e459] [cursor=pointer]
                      - button "3" [ref=e460] [cursor=pointer]
                      - button "4" [ref=e461] [cursor=pointer]
                      - button "2" [ref=e462] [cursor=pointer]
                      - button "11" [ref=e463] [cursor=pointer]
                      - button "4" [ref=e464] [cursor=pointer]
                      - button "14" [ref=e465] [cursor=pointer]
                      - button "6" [ref=e466] [cursor=pointer]
                      - button "4" [ref=e467] [cursor=pointer]
                      - button "7" [ref=e468] [cursor=pointer]
                      - button "4" [ref=e469] [cursor=pointer]
                      - button "4" [ref=e470] [cursor=pointer]
                      - button "2" [ref=e471] [cursor=pointer]
                      - button "3" [ref=e472] [cursor=pointer]
                      - button "2" [ref=e473] [cursor=pointer]
                      - button "2" [ref=e474] [cursor=pointer]
                      - button "3" [ref=e475] [cursor=pointer]
                      - button "2" [ref=e476] [cursor=pointer]
                      - button "4" [ref=e477] [cursor=pointer]
                      - button "8" [ref=e478] [cursor=pointer]
                      - button "5" [ref=e479] [cursor=pointer]
                      - button "2" [ref=e480] [cursor=pointer]
                      - button "4" [ref=e481] [cursor=pointer]
                      - button "2" [ref=e482] [cursor=pointer]
                      - button "2" [ref=e483] [cursor=pointer]
                      - button "3" [ref=e484] [cursor=pointer]
                      - button "4" [ref=e485] [cursor=pointer]
                      - button "2" [ref=e486] [cursor=pointer]
              - iframe [ref=e487]:
                
      - generic [ref=e489]:
        - heading "Let's talk lawn." [level=2] [ref=e491]
        - generic [ref=e493]:
          - generic [ref=e497]:
            - img "A friendly TruGreen customer service expert wearing a headset and smiling, ready to assist."
            - generic [ref=e498]:
              - heading "We’ve got you covered." [level=3] [ref=e499]
              - list [ref=e500]:
                - listitem [ref=e501]:
                  - generic [ref=e502]: Update your service schedule
                - listitem [ref=e503]:
                  - generic [ref=e504]: Ask about treatments in your area
                - listitem [ref=e505]:
                  - generic [ref=e506]: Make a payment
                - listitem [ref=e507]:
                  - generic [ref=e508]: Add or change service
                - listitem [ref=e509]:
                  - generic [ref=e510]: Login assistance
              - paragraph [ref=e511]: Our Virtual Assistant can handle most things and is available 24/7, or you can sign in to manage your account.
              - generic [ref=e512]:
                - link "Chat Now" [ref=e513] [cursor=pointer]:
                  - /url: "#"
                - link "Log In" [ref=e514] [cursor=pointer]:
                  - /url: /my-account/login
          - generic [ref=e517]:
            - generic [ref=e519]:
              - heading "Give us a call." [level=4] [ref=e521]
              - paragraph [ref=e522]: Drop us a line and let's connect.
              - paragraph [ref=e523]:
                - generic [ref=e524]:
                  - text: "Mon – Fri: 7:30 AM – 10:00 PM ET"
                  - text: "Sat: 8:30 AM – 8:00 PM ET"
                  - text: "Sun: Closed"
              - link "1-844-396-6596" [ref=e525] [cursor=pointer]:
                - /url: tel:18443966596
              - heading "Send us a text." [level=4] [ref=e527]
              - link "MYLAWN (695296)" [ref=e528] [cursor=pointer]:
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - generic [ref=e530]:
              - heading "Email us." [level=4] [ref=e531]
              - paragraph [ref=e532]: Send us your suggestions, questions, and feedback. We’ll get back to you in 1-2 business days.
              - link "Email us" [ref=e533] [cursor=pointer]:
                - /url: "#"
  - contentinfo [ref=e535]:
    - generic [ref=e536]:
      - generic [ref=e537]:
        - generic [ref=e539]:
          - heading "About US" [level=5] [ref=e540]
          - list:
            - listitem [ref=e541]:
              - link "About TruGreen" [ref=e542]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e543]:
              - link "Executive Staff" [ref=e544]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e545]:
              - link "Newsroom" [ref=e546]:
                - /url: /newsroom
            - listitem [ref=e547]:
              - link "Careers" [ref=e548]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e550]:
          - heading "Our Services" [level=5] [ref=e551]
          - list:
            - listitem [ref=e552]:
              - link "Lawn Care Plan Comparison" [ref=e553]:
                - /url: /products-and-services
            - listitem [ref=e554]:
              - link "Tree & Shrub Plan Overview" [ref=e555]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e556]:
              - link "Pest Control Plan Comparison" [ref=e557]:
                - /url: /pests-products-and-services
            - listitem [ref=e558]:
              - link "Branch Finder" [ref=e559]:
                - /url: /local-lawn-care
        - generic [ref=e561]:
          - heading "Resources" [level=5] [ref=e562]
          - list:
            - listitem [ref=e563]:
              - link "FAQs" [ref=e564]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e565]:
              - link "Military Discount" [ref=e566]:
                - /url: /military-discount
            - listitem [ref=e567]:
              - link "Learning Center" [ref=e568]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e569]:
              - link "Blogs" [ref=e570]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e571]:
              - link "Service Terms and Conditions" [ref=e572]:
                - /url: /service-terms-and-conditions
        - generic [ref=e575]:
          - heading "For new service" [level=5] [ref=e576]
          - list:
            - listitem [ref=e577]:
              - link "1-844-396-6596" [ref=e578]:
                - /url: tel:1-844-396-6596
            - listitem [ref=e579]:
              - link "Get a Call Back" [ref=e580]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e583]:
          - heading "For our Customer" [level=5] [ref=e584]
          - list:
            - listitem [ref=e585]:
              - link "Account Login & Register" [ref=e586]:
                - /url: /my-account/login
            - listitem [ref=e587]:
              - generic [ref=e588]: "Call:"
              - link "1-844-396-6596" [ref=e589]:
                - /url: tel:1-844-396-6596
            - listitem [ref=e590]:
              - 'link "Text: MYLAWN (695296)" [ref=e591]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e592]:
              - link "Customer Support" [ref=e593]:
                - /url: /customer-support
            - listitem [ref=e594]:
              - link "Pay My Bill" [ref=e595]:
                - /url: /pay-your-bill
      - generic [ref=e598]:
        - paragraph [ref=e599]: We may apply a surcharge not to exceed 3% to cover all or part of our costs of accepting your credit card. For Oklahoma-based consumers, the fee will be 2%.
        - paragraph [ref=e600]: "**Available to residential customers for Lawn, TruDefense Mosquito,TruBarrier Perimeter Pest, Flea, Tick & Outdoor Nuisance Pest Control and/or TruShrub Tree & Shrub services only. Requires purchase of annual plan using PrePay or EasyPay. Guarantee based on a matching quote from a Qualified Provider. Parameters include matching service address, number of applications, application price, services to be performed and areas to be treated. Not valid on quotes older than 120 days or one-day sales/seasonal promotions. TruGreen reserves the right to verify. For first year of service only. Limited time offer. Not to be combined with or used in conjunction with any other offer or discount. Valid at participating TruGreen locations. Additional restrictions may apply. Consumer responsible for all sales tax."
        - paragraph [ref=e601]: ◆ TruGreen will gladly visit your property as needed between scheduled visits to ensure your satisfaction. Guarantee applies to full program customers only. Excludes TruBasic and partial programs. Additional restrictions may apply.
        - paragraph [ref=e602]: ✦ Purchase of full lawn plan required for Healthy Lawn Analysis, which is performed at the first visit.
        - paragraph [ref=e603]: ★ Requires purchase of annual plan. Special price is for first application only. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount.
        - paragraph [ref=e604]: ✢ Requires purchase of annual plan. Special price is for first Tree & Shrub application only, for new residential EasyPay or PrePay customers only. TruGreen® Tree & Shrub includes fertilization of common trees and shrubs, and controls common foliar insects and diseases. It does not include treatment of specialty trees such as fruit or certain ornamentals, or assessment and treatment of trees over 25 ft. in height. For more details, go to TruGreen FAQs at TruGreen.com/FAQTREE. Not to be combined with or used in conjunction with any other offer or discount for the same service. Consumer responsible for all sales tax.
        - paragraph [ref=e605]: ★★ Requires purchase of full mosquito plan. Special price is for first mosquito application only, for new EasyPay or PrePay residential customers only. Valid at participating TruGreen locations. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax. ✧ Guarantee applies to full plan customers only.
        - paragraph [ref=e606]: ◆◆ Service does not include removal of webs higher than 10 ft. and application does not protect against termites and other wood-destroying organisms, bedbugs, bees, fleas, German cockroaches, hornets, pharaoh ants, rodents, or ticks. Valid at participating TruGreen locations. Not to be combined with or used in conjunction with any other oﬀer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
        - paragraph [ref=e607]:
          - text: "America’s #1 lawn care company based on U.S. market share of professional lawn care companies. 2023 MMR Brand Health Tracker."
          - link "PGATOUR.COM" [ref=e608]:
            - /url: https://pgatour.com/
          - text: ", PGA TOUR, TPC, SHOTLINK and the SWINGING GOLFER LOGO are trademarks of PGA TOUR, Inc. BBB accredited since 7/01/2012."
        - paragraph [ref=e609]:
          - superscript [ref=e610]: "3"
          - text: Special price is for first regular lawn service only. Use code SAVENOW. Special pricing is given in consideration of your commitment to receive all treatments under your annual plan. If you cancel before your plan renews, the discounted visit will be charged at full price. Requires purchase of annual Lawn plan, for new residential EasyPay or PrePay customers only. Offer unavailable for lawns larger than 20,000 square feet. Not valid on TruBasic or partial programs. Available 7/21/2026-9/15/2026. One time discount only. Valid at participating TruGreen locations. Availability of services and/or products may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax
      - generic [ref=e611]:
        - generic [ref=e613]:
          - generic [ref=e614]:
            - link "Facebook Icon" [ref=e615]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e616]
            - link "X.com Icon" [ref=e617]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e618]
            - link "Instagram Icon" [ref=e619]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e620]
            - link "Youtube Icon" [ref=e621]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e622]
            - link "TikTok Icon" [ref=e623]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e624]
            - link "Yelp Icon" [ref=e625]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e626]
          - generic [ref=e627]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e628]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e629]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e630]':
              - /url: "#"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e631]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e632]':
              - /url: /pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e633]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e634]':
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e635]'
        - separator [ref=e636]
      - generic [ref=e639]:
        - paragraph [ref=e641]:
          - img "TruGreen Leaf Logo" [ref=e642]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e644]:
          - listitem [ref=e645]:
            - link "SMS Terms and Conditions" [ref=e646]:
              - /url: /about/sms-terms
          - listitem [ref=e647]:
            - link "Terms and Conditions" [ref=e648]:
              - /url: /about/terms
          - listitem [ref=e649]:
            - link "Privacy Policy" [ref=e650]:
              - /url: /about/privacy-policy
          - listitem [ref=e651]:
            - link "California Privacy Notice" [ref=e652]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e653]:
            - link "Your Privacy Choices privacyoptions" [ref=e654]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e655]
  - generic [ref=e656]:
    - paragraph [ref=e657]: Questions? Quote, Call or Chat Now.
    - link "1-844-396-6596" [ref=e658]:
      - /url: tel:18443966596
  - alert [ref=e659]
  - img
  - generic:
    - dialog "Privacy" [ref=e661]:
      - generic [ref=e663]:
        - generic [ref=e666]:
          - text: We and third parties use cookies and similar tools to track your interactions with this site, perform analytics, and conduct targeted advertising. By using the site, you agree to our use of these technologies and our
          - link "Terms and Conditions" [ref=e667]:
            - /url: https://www.trugreen.com/about/terms
          - text: and our
          - link "Privacy Policy" [ref=e668]:
            - /url: https://www.trugreen.com/about/privacy-policy#cookiesandinterest-basedadvertising
          - text: . California residents, please see our
          - link "More information about your privacy, opens in a new tab" [ref=e669]:
            - /url: https://www.trugreen.com/about/california-privacy-policy
            - text: California Privacy Policy
        - generic [ref=e671]:
          - button "Cookie Settings, Opens the preference center dialog" [ref=e672] [cursor=pointer]: Cookie Settings
          - button "Reject All" [ref=e673] [cursor=pointer]
          - button "Accept All Cookies" [ref=e674] [cursor=pointer]
      - button "Close" [ref=e676] [cursor=pointer]
    - text: Cookie Settings
```

# Test source

```ts
  1   | import { test, expect, Page } from "@playwright/test";
  2   | import { getBaseUrl } from "../../../utils/config";
  3   | 
  4   | const HOME_URL = getBaseUrl();
  5   | 
  6   | // The homepage runs personalization/A-B variants, so hero copy, promo banners and
  7   | // offer codes change between renders. Assertions below target structure and
  8   | // destinations rather than marketing copy.
  9   | 
  10  | const isMobileViewport = (page: Page) =>
  11  |   (page.viewportSize()?.width ?? 0) < 900;
  12  | 
  13  | // The footer only lays out once scrolled into range, so it cannot be targeted
  14  | // with scrollIntoViewIfNeeded while it still has zero height.
  15  | const scrollToFooter = async (page: Page) => {
  16  |   await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  17  |   await page
  18  |     .locator("footer")
  19  |     .first()
  20  |     .waitFor({ state: "visible", timeout: 30000 });
  21  | };
  22  | 
  23  | // QA remounts the app after load, detaching the server-rendered nodes, so scroll
  24  | // by resolving the element fresh instead of holding a handle across the remount.
  25  | const revealSection = async (
  26  |   locator: ReturnType<Page["locator"]>,
  27  |   timeout = 30000,
  28  | ) => {
> 29  |   await locator.waitFor({ state: "attached", timeout });
      |                 ^ TimeoutError: locator.waitFor: Timeout 30000ms exceeded.
  30  |   await expect(locator).toBeVisible({ timeout });
  31  |   await locator.scrollIntoViewIfNeeded().catch(async () => {
  32  |     await locator.scrollIntoViewIfNeeded();
  33  |   });
  34  | };
  35  | 
  36  | const dismissCookieBanner = async (page: Page) => {
  37  |   const accept = page.getByRole("button", { name: /Accept All Cookies/i });
  38  |   if (await accept.count()) {
  39  |     await accept
  40  |       .first()
  41  |       .click({ timeout: 5000 })
  42  |       .catch(() => {});
  43  |   }
  44  | };
  45  | 
  46  | const gotoHome = async (page: Page) => {
  47  |   const response = await page.goto(HOME_URL, { waitUntil: "domcontentloaded" });
  48  |   await dismissCookieBanner(page);
  49  |   await page.waitForLoadState("load").catch(() => {});
  50  |   await page.locator("main").first().waitFor({ state: "visible" });
  51  |   return response;
  52  | };
  53  | 
  54  | // React attaches the click handlers after hydration, so an early click silently
  55  | // no-ops. Retry until the expected result appears.
  56  | const clickUntil = async (
  57  |   trigger: ReturnType<Page["locator"]>,
  58  |   result: ReturnType<Page["locator"]>,
  59  |   attempts = 3,
  60  | ) => {
  61  |   for (let attempt = 1; attempt <= attempts; attempt++) {
  62  |     await trigger.click();
  63  |     try {
  64  |       await result.waitFor({ state: "visible", timeout: 8000 });
  65  |       return;
  66  |     } catch (error) {
  67  |       if (attempt === attempts) throw error;
  68  |     }
  69  |   }
  70  | };
  71  | 
  72  | test.describe(
  73  |   "TruGreen homepage regression",
  74  |   { tag: ["@homepage", "@functional"] },
  75  |   () => {
  76  |     test.slow();
  77  | 
  78  |     let homeStatus: number | undefined;
  79  | 
  80  |     test.beforeEach(async ({ page }) => {
  81  |       const response = await gotoHome(page);
  82  |       homeStatus = response?.status();
  83  |     });
  84  | 
  85  |     test("responds 200 with indexable title and canonical URL", async ({
  86  |       page,
  87  |     }) => {
  88  |       expect(homeStatus).toBe(200);
  89  | 
  90  |       await expect(page).toHaveTitle(/TruGreen/i);
  91  |       expect(new URL(page.url()).pathname).toBe("/");
  92  | 
  93  |       const head = await page.evaluate(() => ({
  94  |         canonical:
  95  |           document
  96  |             .querySelector('link[rel="canonical"]')
  97  |             ?.getAttribute("href") ?? null,
  98  |         description:
  99  |           document
  100 |             .querySelector('meta[name="description"]')
  101 |             ?.getAttribute("content") ?? "",
  102 |         robots:
  103 |           document
  104 |             .querySelector('meta[name="robots"]')
  105 |             ?.getAttribute("content") ?? "index",
  106 |       }));
  107 | 
  108 |       expect(head.canonical).toMatch(/trugreen\.com\/?$/i);
  109 |       expect(head.description.length).toBeGreaterThan(50);
  110 |       expect(head.robots).not.toMatch(/noindex/i);
  111 |     });
  112 | 
  113 |     test("renders exactly one non-empty H1 hero with a primary CTA", async ({
  114 |       page,
  115 |     }) => {
  116 |       const h1 = page.locator("h1");
  117 |       await expect(h1).toHaveCount(1);
  118 | 
  119 |       const heroText = (await h1.first().innerText()).trim();
  120 |       expect(heroText.length).toBeGreaterThan(10);
  121 | 
  122 |       await expect(
  123 |         page.getByRole("button", { name: /^Get Started$/i }).first(),
  124 |       ).toBeVisible();
  125 |     });
  126 | 
  127 |     test("header exposes logo, phone and buy-online entry points", async ({
  128 |       page,
  129 |     }) => {
```