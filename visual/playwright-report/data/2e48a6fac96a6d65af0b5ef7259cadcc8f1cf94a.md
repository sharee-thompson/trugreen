# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/visual-regression.spec.ts >> Visual Regression Tests >> element: Header Wrapper
- Location: tests/visual/visual-regression.spec.ts:86:11

# Error details

```
Error: A snapshot doesn't exist at /home/runner/work/trugreen/trugreen/snaps/visual/prod/chromium/header-wrapper.png, writing actual.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner:
    - generic [ref=e2]:
      - paragraph [ref=e7] [cursor=pointer]:
        - link "Save time and unlock exclusive online pricing - get started today." [ref=e8]:
          - /url: /buy-online
      - navigation "Mobile navigation" [ref=e9]:
        - generic [ref=e10]:
          - link "TruGreen Logo" [ref=e12] [cursor=pointer]:
            - /url: /
            - img "TruGreen Logo" [ref=e13]
          - generic [ref=e15]:
            - link "location_icon" [ref=e16] [cursor=pointer]:
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - img "location_icon" [ref=e17]
            - link "Call customer service" [ref=e18] [cursor=pointer]:
              - /url: tel:1-844-567-9909
              - img "Call customer service" [ref=e19]
            - link "hamMenu_icon" [ref=e20] [cursor=pointer]:
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - img "hamMenu_icon" [ref=e21]
  - main [ref=e22]:
    - main [ref=e23]:
      - generic [ref=e25]:
        - img "Two people on lawn chairs on a green, flawless lawn." [ref=e26]
        - generic [ref=e30]:
          - heading "Nobody makes lawn care easier than TruGreen." [level=1] [ref=e31]
          - paragraph [ref=e32]: Every neighborhood lawn is different. Your certified specialists deliver science-backed care tailored to your area's specific soil, turf, and seasonal needs.
          - button "Get Started" [ref=e34] [cursor=pointer]
      - heading "Save 15% when you sign up online." [level=2] [ref=e38]:
        - text: Save 15% when you
        - link "sign up" [ref=e39] [cursor=pointer]:
          - /url: /buy-online
        - text: online.
      - generic [ref=e41]:
        - generic [ref=e42]:
          - heading "The difference local pros make." [level=2] [ref=e43]
          - paragraph [ref=e44]: Explore the differences and see why more homeowners are choosing TruGreen.
        - generic [ref=e45]:
          - generic [ref=e46]:
            - heading "TruGreen" [level=3] [ref=e47]:
              - img "TruGreen" [ref=e48]
            - generic [ref=e49]:
              - generic [ref=e50]:
                - term [ref=e51]: Custom for your lawn
                - definition [ref=e52]: A tailored plan designed for your region, your climate, and the results you want.
              - generic [ref=e53]:
                - term [ref=e54]: We do the work
                - definition [ref=e55]: Our trained specialists apply treatments with precision and adjust throughout the season to keep your lawn on track.
              - generic [ref=e56]:
                - term [ref=e57]: Pro-level results
                - definition [ref=e58]: A lawn that looks greener, feels thicker, and grows stronger — backed by the TruGreen Guarantee. ◆
          - generic [ref=e59]:
            - heading "DIY" [level=3] [ref=e60]
            - generic [ref=e61]:
              - generic [ref=e62]:
                - term [ref=e63]: One-size-fits-all
                - definition [ref=e64]: Store-bought products can’t account for local soil variations, seasonal timing, or your lawn’s specific challenges.
              - generic [ref=e65]:
                - term [ref=e66]: Your weekend, gone
                - definition [ref=e67]: Planning, hauling, spreading, spraying — every step takes time you’d rather spend elsewhere.
              - generic [ref=e68]:
                - term [ref=e69]: You’re on your own
                - definition [ref=e70]: If something goes wrong, there’s no expert to call and no safety net to get your lawn back on track.
          - generic [ref=e71]:
            - heading "Other Guys" [level=3] [ref=e72]
            - generic [ref=e73]:
              - generic [ref=e74]:
                - term [ref=e75]: Limited resources
                - definition [ref=e76]: Without nationwide insights or shared learnings, it becomes harder to adapt as pests, weather, and seasonal issues change.
              - generic [ref=e77]:
                - term [ref=e78]: Variable quality
                - definition [ref=e79]: Without a national training program or on-staff agronomists, the results can be unpredictable.
              - generic [ref=e80]:
                - term [ref=e81]: Limited accountability
                - definition [ref=e82]: Guarantees and fixes often depend on goodwill rather than a structured, nationwide commitment.
      - generic [ref=e84]:
        - heading "Your TruGreen team is ready to transform your lawn." [level=2] [ref=e85]:
          - link "Your TruGreen team is ready to transform your lawn." [ref=e86] [cursor=pointer]:
            - /url: /buy-online
        - generic [ref=e87]:
          - button "Get Started" [ref=e88] [cursor=pointer]
          - button "Talk To a Pro" [ref=e89] [cursor=pointer]
      - generic [ref=e91]:
        - generic [ref=e92]:
          - heading "Why homeowners choose TruGreen." [level=2] [ref=e93]
          - paragraph [ref=e94]: If you want a lawn that looks truly exceptional, you choose the pros who know how to deliver it.
        - generic [ref=e100]:
          - generic [ref=e105]:
            - img "A smiling TruGreen technician stands proudly on a healthy, vibrant green lawn." [ref=e106]
            - generic [ref=e107]:
              - heading "#1 in America" [level=5] [ref=e108]
              - paragraph [ref=e109]: Millions of Americans choose our locally tailored recipes for healthier, greener, better-looking lawns.
          - generic [ref=e112]:
            - generic [ref=e114]:
              - img "Two TruGreen lawn care specialists collaborating in front of a suburban home." [ref=e115]
              - generic [ref=e116]:
                - heading "The Pro’s Choice" [level=5] [ref=e117]
                - paragraph [ref=e118]: As the Official Lawn Care Treatment Provider of the PGA TOUR® we bring pro-level expertise to your home.
            - img "PGA Logo" [ref=e119]
          - generic [ref=e124]:
            - img "Close-up macro view of a perfectly manicured, dense green lawn." [ref=e125]
            - generic [ref=e126]:
              - heading "Guaranteed Results" [level=5] [ref=e127]
              - paragraph [ref=e128]: If you’re not satisfied, we’ll make it right. That’s our commitment — and it’s backed by the TruGreen Guarantee. ◆
      - generic [ref=e131]:
        - heading "What homeowners are saying." [level=2] [ref=e134]
        - generic [ref=e137]:
          - generic [ref=e139]:
            - generic [ref=e143]:
              - generic [ref=e144]:
                - link "Google" [ref=e145] [cursor=pointer]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@29.2175962,-81.0709891,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x15b373965eecca3b!8m2!3d29.2175962!4d-81.0709891
                  - img "Google" [ref=e146]
                - generic [ref=e147]:
                  - heading "John Q." [level=5] [ref=e148]
                  - generic [ref=e149]:
                    - img "star" [ref=e150]
                    - img "star" [ref=e151]
                    - img "star" [ref=e152]
                    - img "star" [ref=e153]
                    - img "star" [ref=e154]
              - paragraph [ref=e155]: “The technicians are always professional and courteous. My lawn looks so good that my neighbor hired them.”
            - generic [ref=e159]:
              - generic [ref=e160]:
                - link "Google" [ref=e161] [cursor=pointer]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@40.8546273,-96.6828367,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x3909c46d545c8017!8m2!3d40.8546273!4d-96.6828367
                  - img "Google" [ref=e162]
                - generic [ref=e163]:
                  - heading "Cindy K." [level=5] [ref=e164]
                  - generic [ref=e165]:
                    - img "star" [ref=e166]
                    - img "star" [ref=e167]
                    - img "star" [ref=e168]
                    - img "star" [ref=e169]
                    - img "star" [ref=e170]
              - paragraph [ref=e171]: “Our lawn has been uniformly green since we started with TruGreen this season. We recommended TruGreen to our neighbor who now is getting the service also”
            - generic [ref=e175]:
              - generic [ref=e176]:
                - link "Google" [ref=e177] [cursor=pointer]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@43.088793,-77.5999546,15z/data=!4m5!3m4!1s0x0:0x5d8b8446da3158e2!8m2!3d43.088793!4d-77.5999546
                  - img "Google" [ref=e178]
                - generic [ref=e179]:
                  - heading "Rick N." [level=5] [ref=e180]
                  - generic [ref=e181]:
                    - img "star" [ref=e182]
                    - img "star" [ref=e183]
                    - img "star" [ref=e184]
                    - img "star" [ref=e185]
                    - img "star" [ref=e186]
              - paragraph [ref=e187]: “Simply put… TruGreen is truly the best. I’ve tried other services over the years and I always come back to TruGreen. In fact, my neighbor just stopped me the other day to tell me my lawn is so beautiful and wanted to know what I was doing. Simple answer.,. T...”
              - button "More..." [ref=e188] [cursor=pointer]
            - generic [ref=e192]:
              - generic [ref=e193]:
                - link "Google" [ref=e194] [cursor=pointer]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@41.2586263,-75.8304408,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x23b4475f75633edc!8m2!3d41.2586263!4d-75.8304408
                  - img "Google" [ref=e195]
                - generic [ref=e196]:
                  - heading "Jeffrey J." [level=5] [ref=e197]
                  - generic [ref=e198]:
                    - img "star" [ref=e199]
                    - img "star" [ref=e200]
                    - img "star" [ref=e201]
                    - img "star" [ref=e202]
                    - img "star" [ref=e203]
              - paragraph [ref=e204]: “Great results and customer service from our local TruGreen team!! Special thanks to Darron R our awesome lawn technician! Darron takes customer service to a whole new level… takes time to explain the treatment and answer any questions I may have about the lawn...”
              - button "More..." [ref=e205] [cursor=pointer]
            - generic [ref=e209]:
              - generic [ref=e210]:
                - link "Google" [ref=e211] [cursor=pointer]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@42.1854098,-85.5975572,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x6decb18e9d110852!8m2!3d42.1854098!4d-85.5975572
                  - img "Google" [ref=e212]
                - generic [ref=e213]:
                  - heading "Janet R." [level=5] [ref=e214]
                  - generic [ref=e215]:
                    - img "star" [ref=e216]
                    - img "star" [ref=e217]
                    - img "star" [ref=e218]
                    - img "star" [ref=e219]
                    - img "star" [ref=e220]
              - paragraph [ref=e221]: “Our lawn has never looked this green and healthy!!! We have tried all the "Scotts"...other products as well like Sunday lawn...but chosing Tru Green was the best choice!!! They also sprayed for bugs so we got the best of both worlds!!!!!!”
            - generic [ref=e225]:
              - generic [ref=e226]:
                - link "Google" [ref=e227] [cursor=pointer]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@38.7176116,-77.1907513,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xb6a69cd1abfda267!8m2!3d38.7176116!4d-77.1907513
                  - img "Google" [ref=e228]
                - generic [ref=e229]:
                  - heading "Carrie B." [level=5] [ref=e230]
                  - generic [ref=e231]:
                    - img "star" [ref=e232]
                    - img "star" [ref=e233]
                    - img "star" [ref=e234]
                    - img "star" [ref=e235]
                    - img "star" [ref=e236]
              - paragraph [ref=e237]: “Our lawn is lush, dark green, weed-free. Our neighbor’s lawn is patchy, yellowish-green, and weedy. We have TruGreen, the neighbors do not. Also, the technicians are efficient, friendly, and responsive. Thank you TruGreen!”
            - generic [ref=e241]:
              - generic [ref=e242]:
                - link "Google" [ref=e243] [cursor=pointer]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@36.5492259,-82.5186668,17z/data=!3m1!4b1!4m6!3m5!1s0x885a927d49d9f3cf:0x2050b7ceacea6a60!8m2!3d36.5492259!4d-82.5186668!16s%2Fg%2F1q2w1fl8k?entry=ttu
                  - img "Google" [ref=e244]
                - generic [ref=e245]:
                  - heading "tnstedo" [level=5] [ref=e246]
                  - generic [ref=e247]:
                    - img "star" [ref=e248]
                    - img "star" [ref=e249]
                    - img "star" [ref=e250]
                    - img "star" [ref=e251]
                    - img "star" [ref=e252]
              - paragraph [ref=e253]: “I appreciate the professionalism of TruGreen especially compared to the local company I had been using. I can trust TG to actually do the entire lawn & back yard. Hunter came to the door today to explain they were targeting weeds versus a whole spray applicati...”
              - button "More..." [ref=e254] [cursor=pointer]
            - generic [ref=e258]:
              - generic [ref=e259]:
                - link "Google" [ref=e260] [cursor=pointer]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@40.949684,-74.2156551,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xf458f867201d976a!8m2!3d40.949684!4d-74.2156551
                  - img "Google" [ref=e261]
                - generic [ref=e262]:
                  - heading "Kerry G." [level=5] [ref=e263]
                  - generic [ref=e264]:
                    - img "star" [ref=e265]
                    - img "star" [ref=e266]
                    - img "star" [ref=e267]
                    - img "star" [ref=e268]
                    - img "star" [ref=e269]
              - paragraph [ref=e270]: “My brother has been telling me to “go national” not local for years. He is a big fan of TruGreen, and now, I am too. Sometimes little brothers are so right!”
            - generic [ref=e274]:
              - generic [ref=e275]:
                - link "Google" [ref=e276] [cursor=pointer]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@41.7178316,-86.3001254,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x517e1fb073e1265b!8m2!3d41.7178316!4d-86.3001254
                  - img "Google" [ref=e277]
                - generic [ref=e278]:
                  - heading "Mark S." [level=5] [ref=e279]
                  - generic [ref=e280]:
                    - img "star" [ref=e281]
                    - img "star" [ref=e282]
                    - img "star" [ref=e283]
                    - img "star" [ref=e284]
                    - img "star" [ref=e285]
              - paragraph [ref=e286]: “I do suggest to anyone reading this to use Trugreen. If for the simple fact life is very demanding. The use of local experts with the equipment time and materials. Is cost effective, and represents care for ones property.”
          - generic [ref=e287]:
            - button "Backwards Navigation Arrow" [ref=e288]
            - button "Forward Navigation Arrow" [ref=e289] [cursor=pointer]
          - generic [ref=e290]:
            - button "Active Selection Indicator" [ref=e291] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e293] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e295] [cursor=pointer]
      - spinbutton [ref=e301]
      - generic [ref=e304]:
        - heading "Let's talk lawn." [level=2] [ref=e306]
        - generic [ref=e308]:
          - generic [ref=e310]:
            - generic [ref=e313]:
              - heading "We’ve got you covered." [level=3] [ref=e314]
              - list [ref=e315]:
                - listitem [ref=e316]:
                  - generic [ref=e317]: Update your service schedule
                - listitem [ref=e318]:
                  - generic [ref=e319]: Ask about treatments in your area
                - listitem [ref=e320]:
                  - generic [ref=e321]: Make a payment
                - listitem [ref=e322]:
                  - generic [ref=e323]: Add or change service
                - listitem [ref=e324]:
                  - generic [ref=e325]: Login assistance
              - paragraph [ref=e326]: Our Virtual Assistant can handle most things and is available 24/7, or you can sign in to manage your account.
              - generic [ref=e327]:
                - link "Chat Now" [ref=e328] [cursor=pointer]:
                  - /url: "#"
                - link "Log In" [ref=e329] [cursor=pointer]:
                  - /url: /my-account/login
            - img "A friendly TruGreen customer service expert wearing a headset and smiling, ready to assist." [ref=e331]
          - generic [ref=e333]:
            - generic [ref=e335]:
              - heading "Give us a call." [level=4] [ref=e337]
              - paragraph [ref=e338]: Drop us a line and let's connect.
              - paragraph [ref=e339]:
                - generic [ref=e340]:
                  - text: "Mon – Fri: 7:30 AM – 10:00 PM ET"
                  - text: "Sat: 8:30 AM – 8:00 PM ET"
                  - text: "Sun: Closed"
              - link "1-844-567-9909" [ref=e341] [cursor=pointer]:
                - /url: tel:18445679909
              - heading "Send us a text." [level=4] [ref=e343]
              - link "MYLAWN (695296)" [ref=e344] [cursor=pointer]:
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - generic [ref=e346]:
              - heading "Email us." [level=4] [ref=e347]
              - paragraph [ref=e348]: Send us your suggestions, questions, and feedback. We’ll get back to you in 1-2 business days.
              - link "Email us" [ref=e349] [cursor=pointer]:
                - /url: "#"
  - contentinfo [ref=e350]:
    - generic [ref=e351]:
      - generic [ref=e352]:
        - generic [ref=e354]:
          - heading "About US" [level=5] [ref=e355]
          - list [ref=e356]:
            - listitem [ref=e357]:
              - link "About TruGreen" [ref=e358] [cursor=pointer]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e359]:
              - link "Executive Staff" [ref=e360] [cursor=pointer]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e361]:
              - link "Newsroom" [ref=e362] [cursor=pointer]:
                - /url: /newsroom
            - listitem [ref=e363]:
              - link "Careers" [ref=e364] [cursor=pointer]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e366]:
          - heading "Our Services" [level=5] [ref=e367]
          - list [ref=e368]:
            - listitem [ref=e369]:
              - link "Lawn Care Plan Comparison" [ref=e370] [cursor=pointer]:
                - /url: /products-and-services
            - listitem [ref=e371]:
              - link "Tree & Shrub Plan Overview" [ref=e372] [cursor=pointer]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e373]:
              - link "Pest Control Plan Comparison" [ref=e374] [cursor=pointer]:
                - /url: /pests-products-and-services
            - listitem [ref=e375]:
              - link "Branch Finder" [ref=e376] [cursor=pointer]:
                - /url: /local-lawn-care
        - generic [ref=e378]:
          - heading "Resources" [level=5] [ref=e379]
          - list [ref=e380]:
            - listitem [ref=e381]:
              - link "FAQs" [ref=e382] [cursor=pointer]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e383]:
              - link "Military Discount" [ref=e384] [cursor=pointer]:
                - /url: /military-discount
            - listitem [ref=e385]:
              - link "Learning Center" [ref=e386] [cursor=pointer]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e387]:
              - link "Blogs" [ref=e388] [cursor=pointer]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e389]:
              - link "Service Terms and Conditions" [ref=e390] [cursor=pointer]:
                - /url: /service-terms-and-conditions
        - generic [ref=e393]:
          - heading "For new service" [level=5] [ref=e394]
          - list [ref=e395]:
            - listitem [ref=e396]:
              - link "1-844-567-9909" [ref=e397] [cursor=pointer]:
                - /url: tel:1-844-567-9909
            - listitem [ref=e398]:
              - link "Get a Call Back" [ref=e399] [cursor=pointer]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e402]:
          - heading "For our Customer" [level=5] [ref=e403]
          - list [ref=e404]:
            - listitem [ref=e405]:
              - link "Account Login & Register" [ref=e406] [cursor=pointer]:
                - /url: /my-account/login
            - listitem [ref=e407]:
              - generic [ref=e408]: "Call:"
              - link "1-844-768-0421" [ref=e409] [cursor=pointer]:
                - /url: tel:1-844-768-0421
            - listitem [ref=e410]:
              - 'link "Text: MYLAWN (695296)" [ref=e411] [cursor=pointer]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e412]:
              - link "Customer Support" [ref=e413] [cursor=pointer]:
                - /url: /customer-support
            - listitem [ref=e414]:
              - link "Pay My Bill" [ref=e415] [cursor=pointer]:
                - /url: /pay-your-bill
      - generic [ref=e418]:
        - paragraph [ref=e419]: We may apply a surcharge not to exceed 3% to cover all or part of our costs of accepting your credit card. For Oklahoma-based consumers, the fee will be 2%.
        - paragraph [ref=e420]: "**Available to residential customers for Lawn, TruDefense Mosquito,TruBarrier Perimeter Pest, Flea, Tick & Outdoor Nuisance Pest Control and/or TruShrub Tree & Shrub services only. Requires purchase of annual plan using PrePay or EasyPay. Guarantee based on a matching quote from a Qualified Provider. Parameters include matching service address, number of applications, application price, services to be performed and areas to be treated. Not valid on quotes older than 120 days or one-day sales/seasonal promotions. TruGreen reserves the right to verify. For first year of service only. Limited time offer. Not to be combined with or used in conjunction with any other offer or discount. Valid at participating TruGreen locations. Additional restrictions may apply. Consumer responsible for all sales tax."
        - paragraph [ref=e421]: ◆ TruGreen will gladly visit your property as needed between scheduled visits to ensure your satisfaction. Guarantee applies to full program customers only. Excludes TruBasic and partial programs. Additional restrictions may apply.
        - paragraph [ref=e422]: ✦ Purchase of full lawn plan required for Healthy Lawn Analysis, which is performed at the first visit.
        - paragraph [ref=e423]: ★ Requires purchase of annual plan. Special price is for first application only. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount.
        - paragraph [ref=e424]: ✢ Requires purchase of annual plan. Special price is for first Tree & Shrub application only, for new residential EasyPay or PrePay customers only. TruGreen® Tree & Shrub includes fertilization of common trees and shrubs, and controls common foliar insects and diseases. It does not include treatment of specialty trees such as fruit or certain ornamentals, or assessment and treatment of trees over 25 ft. in height. For more details, go to TruGreen FAQs at TruGreen.com/FAQTREE. Not to be combined with or used in conjunction with any other offer or discount for the same service. Consumer responsible for all sales tax.
        - paragraph [ref=e425]: ★★ Requires purchase of full mosquito plan. Special price is for first mosquito application only, for new EasyPay or PrePay residential customers only. Valid at participating TruGreen locations. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax. ✧ Guarantee applies to full plan customers only.
        - paragraph [ref=e426]: ◆◆ Service does not include removal of webs higher than 10 ft. and application does not protect against termites and other wood-destroying organisms, bedbugs, bees, fleas, German cockroaches, hornets, pharaoh ants, rodents, or ticks. Valid at participating TruGreen locations. Not to be combined with or used in conjunction with any other oﬀer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
        - paragraph [ref=e427]:
          - text: "America’s #1 lawn care company based on U.S. market share of professional lawn care companies. 2023 MMR Brand Health Tracker."
          - link "PGATOUR.COM" [ref=e428] [cursor=pointer]:
            - /url: https://pgatour.com/
          - text: ", PGA TOUR, TPC, SHOTLINK and the SWINGING GOLFER LOGO are trademarks of PGA TOUR, Inc. BBB accredited since 7/01/2012."
      - generic [ref=e429]:
        - generic [ref=e431]:
          - generic [ref=e432]:
            - link "Facebook Icon" [ref=e433] [cursor=pointer]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e434]
            - link "X.com Icon" [ref=e435] [cursor=pointer]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e436]
            - link "Instagram Icon" [ref=e437] [cursor=pointer]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e438]
            - link "Youtube Icon" [ref=e439] [cursor=pointer]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e440]
            - link "TikTok Icon" [ref=e441] [cursor=pointer]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e442]
            - link "Yelp Icon" [ref=e443] [cursor=pointer]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e444]
          - generic [ref=e445]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e446] [cursor=pointer]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e447]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e448]':
              - /url: "#"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e449]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e450] [cursor=pointer]':
              - /url: /pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e451]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e452] [cursor=pointer]':
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e453]'
        - separator [ref=e454]
      - generic [ref=e457]:
        - paragraph [ref=e459]:
          - img "TruGreen Leaf Logo" [ref=e460]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e462]:
          - listitem [ref=e463]:
            - link "SMS Terms and Conditions" [ref=e464] [cursor=pointer]:
              - /url: /about/sms-terms
          - listitem [ref=e465]:
            - link "Terms and Conditions" [ref=e466] [cursor=pointer]:
              - /url: /about/terms
          - listitem [ref=e467]:
            - link "Privacy Policy" [ref=e468] [cursor=pointer]:
              - /url: /about/privacy-policy
          - listitem [ref=e469]:
            - link "California Privacy Notice" [ref=e470] [cursor=pointer]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e471]:
            - link "Your Privacy Choices privacyoptions" [ref=e472] [cursor=pointer]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e473]
  - alert [ref=e474]
```

# Test source

```ts
  1   | import { Page, expect } from "@playwright/test";
  2   | import { selectorsToMask, VisualElement } from "./selectors";
  3   | import { getHomePageElement } from "./legacy-waits";
  4   | 
  5   | const DEFAULT_VISUAL_MAX_DIFF_PIXEL_RATIO = 0.05;
  6   | 
  7   | function parseVisualMaxDiffPixelRatio() {
  8   |   if (process.env.CI) {
  9   |     return DEFAULT_VISUAL_MAX_DIFF_PIXEL_RATIO;
  10  |   }
  11  | 
  12  |   const rawValue = process.env.VISUAL_MAX_DIFF_PIXEL_RATIO?.trim();
  13  | 
  14  |   if (!rawValue) {
  15  |     return DEFAULT_VISUAL_MAX_DIFF_PIXEL_RATIO;
  16  |   }
  17  | 
  18  |   const parsedValue = Number(rawValue);
  19  | 
  20  |   if (!Number.isFinite(parsedValue) || parsedValue < 0 || parsedValue > 1) {
  21  |     return DEFAULT_VISUAL_MAX_DIFF_PIXEL_RATIO;
  22  |   }
  23  | 
  24  |   return parsedValue;
  25  | }
  26  | 
  27  | export const visualMaxDiffPixelRatio = parseVisualMaxDiffPixelRatio();
  28  | 
  29  | export async function takeFullPageScreenshot(page: Page, stylePath?: string) {
  30  |   await expect(page).toHaveScreenshot({
  31  |     fullPage: true,
  32  |     scale: "css",
  33  |     stylePath,
  34  |     mask: selectorsToMask.map((item) => page.locator(item.selector)),
  35  |     maskColor: "#FF7F50",
  36  |     maxDiffPixelRatio: visualMaxDiffPixelRatio,
  37  |   });
  38  | }
  39  | 
  40  | export async function stabilizeElementForScreenshot(
  41  |   page: Page,
  42  |   item: VisualElement,
  43  | ) {
  44  |   //This is just special treatment for the cookie banner
  45  |   if (item.selector === "#onetrust-banner-sdk") {
  46  |     await page
  47  |       .evaluate(async () => {
  48  |         if (document.fonts?.ready) {
  49  |           await document.fonts.ready;
  50  |         }
  51  |       })
  52  |       .catch(() => {});
  53  | 
  54  |     await page.evaluate(
  55  |       () =>
  56  |         new Promise<void>((resolve) =>
  57  |           requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  58  |         ),
  59  |     );
  60  |   }
  61  | }
  62  | 
  63  | export function getElementScreenshotOptions(item: VisualElement) {
  64  |   return item.selector === "#onetrust-banner-sdk"
  65  |     ? {
  66  |         animations: "disabled" as const,
  67  |         caret: "hide" as const,
  68  |         scale: "css" as const,
  69  |         maxDiffPixelRatio: visualMaxDiffPixelRatio,
  70  |       }
  71  |     : {};
  72  | }
  73  | 
  74  | export function getElementScreenshotName(item: VisualElement): string {
  75  |   const allowed = "abcdefghijklmnopqrstuvwxyz0123456789";
  76  |   const slug = Array.from(item.name.toLowerCase())
  77  |     .map((char) => (allowed.includes(char) ? char : " "))
  78  |     .join("")
  79  |     .split(" ")
  80  |     .filter(Boolean)
  81  |     .join("-");
  82  |   return `${slug}.png`;
  83  | }
  84  | 
  85  | export async function expectElementScreenshot(page: Page, item: VisualElement) {
  86  |   for (const useCacheBust of [false, true]) {
  87  |     try {
  88  |       const element = await getHomePageElement(page, item, useCacheBust);
  89  |       await stabilizeElementForScreenshot(page, item);
> 90  |       await expect(element).toHaveScreenshot(
      |       ^ Error: A snapshot doesn't exist at /home/runner/work/trugreen/trugreen/snaps/visual/prod/chromium/header-wrapper.png, writing actual.
  91  |         getElementScreenshotName(item),
  92  |         getElementScreenshotOptions(item),
  93  |       );
  94  |       return;
  95  |     } catch (error) {
  96  |       if (useCacheBust) {
  97  |         throw error;
  98  |       }
  99  |       await page.context().clearCookies();
  100 |       await page
  101 |         .evaluate(() => {
  102 |           window.localStorage.clear();
  103 |           window.sessionStorage.clear();
  104 |         })
  105 |         .catch(() => {});
  106 |     }
  107 |   }
  108 | }
  109 | 
```