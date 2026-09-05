# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: functional/homepage/homepage.spec.ts >> TruGreen homepage regression >> buy-online entry point navigates to the buy flow
- Location: tests/functional/homepage/homepage.spec.ts:239:9

# Error details

```
TimeoutError: page.waitForURL: Timeout 30000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
  navigated to "https://www.trugreen.com/?automation=true"
============================================================
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
            - link "hamMenu_icon" [ref=e19]:
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - img "hamMenu_icon" [ref=e20]
  - main [ref=e21]:
    - main [ref=e22]:
      - generic [ref=e24]:
        - img "Two people on lawn chairs on a green, flawless lawn." [ref=e25]
        - generic [ref=e29]:
          - heading "Nobody makes lawn care easier than TruGreen." [level=1] [ref=e30]
          - paragraph [ref=e31]: Every neighborhood lawn is different. Your certified specialists deliver science-backed care tailored to your area's specific soil, turf, and seasonal needs.
          - button "Get Started" [ref=e33] [cursor=pointer]
      - heading "Save 15% when you sign up online." [level=2] [ref=e37]:
        - text: Save 15% when you
        - link "sign up" [ref=e38]:
          - /url: /buy-online
        - text: online.
      - generic [ref=e40]:
        - generic [ref=e41]:
          - heading "The difference local pros make." [level=2] [ref=e42]
          - paragraph [ref=e43]: Explore the differences and see why more homeowners are choosing TruGreen.
        - generic [ref=e44]:
          - generic [ref=e45]:
            - heading "TruGreen TruGreen" [level=3] [ref=e46]:
              - img "TruGreen" [ref=e47]
              - generic [ref=e48]: TruGreen
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
        - heading "Golf course quality lawn starts with just a few clicks." [level=2] [ref=e85]
        - generic [ref=e86]:
          - button "Get Started" [ref=e87] [cursor=pointer]
          - button "Talk To a Pro" [ref=e88] [cursor=pointer]
      - generic [ref=e90]:
        - generic [ref=e91]:
          - heading "Why homeowners choose TruGreen." [level=2] [ref=e92]
          - paragraph [ref=e93]: If you want a lawn that looks truly exceptional, you choose the pros who know how to deliver it.
        - generic [ref=e97]:
          - generic [ref=e99]:
            - generic [ref=e102]:
              - generic [ref=e104]:
                - img "Two TruGreen lawn care specialists collaborating in front of a suburban home." [ref=e105]
                - generic [ref=e106]:
                  - heading "The Pro’s Choice" [level=3] [ref=e107]
                  - paragraph [ref=e108]: As the Official Lawn Care Treatment Provider of the PGA TOUR® we bring pro-level expertise to your home.
              - img "PGA Logo" [ref=e109]
            - generic [ref=e114]:
              - img "Close-up macro view of a perfectly manicured, dense green lawn." [ref=e115]
              - generic [ref=e116]:
                - heading "Guaranteed Results" [level=3] [ref=e117]
                - paragraph [ref=e118]: If you’re not satisfied, we’ll make it right. That’s our commitment — and it’s backed by the TruGreen Guarantee. ◆
            - generic [ref=e123]:
              - img "A smiling TruGreen technician stands proudly on a healthy, vibrant green lawn." [ref=e124]
              - generic [ref=e125]:
                - heading "#1 in America" [level=3] [ref=e126]
                - paragraph [ref=e127]: Millions of Americans choose our locally tailored recipes for healthier, greener, better-looking lawns.
            - generic [ref=e130]:
              - generic [ref=e132]:
                - img "Two TruGreen lawn care specialists collaborating in front of a suburban home." [ref=e133]
                - generic [ref=e134]:
                  - heading "The Pro’s Choice" [level=3] [ref=e135]
                  - paragraph [ref=e136]: As the Official Lawn Care Treatment Provider of the PGA TOUR® we bring pro-level expertise to your home.
              - img "PGA Logo" [ref=e137]
            - generic [ref=e142]:
              - img "Close-up macro view of a perfectly manicured, dense green lawn." [ref=e143]
              - generic [ref=e144]:
                - heading "Guaranteed Results" [level=3] [ref=e145]
                - paragraph [ref=e146]: If you’re not satisfied, we’ll make it right. That’s our commitment — and it’s backed by the TruGreen Guarantee. ◆
            - generic [ref=e151]:
              - img "A smiling TruGreen technician stands proudly on a healthy, vibrant green lawn." [ref=e152]
              - generic [ref=e153]:
                - heading "#1 in America" [level=3] [ref=e154]
                - paragraph [ref=e155]: Millions of Americans choose our locally tailored recipes for healthier, greener, better-looking lawns.
            - generic [ref=e158]:
              - generic [ref=e160]:
                - img "Two TruGreen lawn care specialists collaborating in front of a suburban home." [ref=e161]
                - generic [ref=e162]:
                  - heading "The Pro’s Choice" [level=3] [ref=e163]
                  - paragraph [ref=e164]: As the Official Lawn Care Treatment Provider of the PGA TOUR® we bring pro-level expertise to your home.
              - img "PGA Logo" [ref=e165]
          - generic [ref=e166]:
            - button "Active Selection Indicator" [ref=e167] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e169] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e171] [cursor=pointer]
      - generic [ref=e175]:
        - heading "What homeowners are saying." [level=2] [ref=e178]
        - generic [ref=e181]:
          - generic [ref=e183]:
            - generic [ref=e187]:
              - generic [ref=e188]:
                - link "Google" [ref=e189]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@29.2175962,-81.0709891,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x15b373965eecca3b!8m2!3d29.2175962!4d-81.0709891
                  - img "Google" [ref=e190]
                - generic [ref=e191]:
                  - heading "John Q." [level=3] [ref=e192]
                  - generic [ref=e193]:
                    - img "star" [ref=e194]
                    - img "star" [ref=e195]
                    - img "star" [ref=e196]
                    - img "star" [ref=e197]
                    - img "star" [ref=e198]
              - paragraph [ref=e199]: “The technicians are always professional and courteous. My lawn looks so good that my neighbor hired them.”
            - generic [ref=e203]:
              - generic [ref=e204]:
                - link "Google" [ref=e205]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@40.8546273,-96.6828367,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x3909c46d545c8017!8m2!3d40.8546273!4d-96.6828367
                  - img "Google" [ref=e206]
                - generic [ref=e207]:
                  - heading "Cindy K." [level=3] [ref=e208]
                  - generic [ref=e209]:
                    - img "star" [ref=e210]
                    - img "star" [ref=e211]
                    - img "star" [ref=e212]
                    - img "star" [ref=e213]
                    - img "star" [ref=e214]
              - paragraph [ref=e215]: “Our lawn has been uniformly green since we started with TruGreen this season. We recommended TruGreen to our neighbor who now is getting the service also”
            - generic [ref=e219]:
              - generic [ref=e220]:
                - link "Google" [ref=e221]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@41.2586263,-75.8304408,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x23b4475f75633edc!8m2!3d41.2586263!4d-75.8304408
                  - img "Google" [ref=e222]
                - generic [ref=e223]:
                  - heading "Jeffrey J." [level=3] [ref=e224]
                  - generic [ref=e225]:
                    - img "star" [ref=e226]
                    - img "star" [ref=e227]
                    - img "star" [ref=e228]
                    - img "star" [ref=e229]
                    - img "star" [ref=e230]
              - paragraph [ref=e231]: “Great results and customer service from our local TruGreen team!! Special thanks to Darron R our awesome lawn technician! Darron takes customer service to a whole new level… takes time to explain the treatment and answer any questions I may have about the lawn...”
              - button "More..." [ref=e232] [cursor=pointer]
            - generic [ref=e236]:
              - generic [ref=e237]:
                - link "Google" [ref=e238]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@42.1854098,-85.5975572,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x6decb18e9d110852!8m2!3d42.1854098!4d-85.5975572
                  - img "Google" [ref=e239]
                - generic [ref=e240]:
                  - heading "Janet R." [level=3] [ref=e241]
                  - generic [ref=e242]:
                    - img "star" [ref=e243]
                    - img "star" [ref=e244]
                    - img "star" [ref=e245]
                    - img "star" [ref=e246]
                    - img "star" [ref=e247]
              - paragraph [ref=e248]: “Our lawn has never looked this green and healthy!!! We have tried all the "Scotts"...other products as well like Sunday lawn...but chosing Tru Green was the best choice!!! They also sprayed for bugs so we got the best of both worlds!!!!!!”
            - generic [ref=e252]:
              - generic [ref=e253]:
                - link "Google" [ref=e254]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@38.7176116,-77.1907513,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xb6a69cd1abfda267!8m2!3d38.7176116!4d-77.1907513
                  - img "Google" [ref=e255]
                - generic [ref=e256]:
                  - heading "Carrie B." [level=3] [ref=e257]
                  - generic [ref=e258]:
                    - img "star" [ref=e259]
                    - img "star" [ref=e260]
                    - img "star" [ref=e261]
                    - img "star" [ref=e262]
                    - img "star" [ref=e263]
              - paragraph [ref=e264]: “Our lawn is lush, dark green, weed-free. Our neighbor’s lawn is patchy, yellowish-green, and weedy. We have TruGreen, the neighbors do not. Also, the technicians are efficient, friendly, and responsive. Thank you TruGreen!”
            - generic [ref=e268]:
              - generic [ref=e269]:
                - link "Google" [ref=e270]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@36.5492259,-82.5186668,17z/data=!3m1!4b1!4m6!3m5!1s0x885a927d49d9f3cf:0x2050b7ceacea6a60!8m2!3d36.5492259!4d-82.5186668!16s%2Fg%2F1q2w1fl8k?entry=ttu
                  - img "Google" [ref=e271]
                - generic [ref=e272]:
                  - heading "tnstedo" [level=3] [ref=e273]
                  - generic [ref=e274]:
                    - img "star" [ref=e275]
                    - img "star" [ref=e276]
                    - img "star" [ref=e277]
                    - img "star" [ref=e278]
                    - img "star" [ref=e279]
              - paragraph [ref=e280]: “I appreciate the professionalism of TruGreen especially compared to the local company I had been using. I can trust TG to actually do the entire lawn & back yard. Hunter came to the door today to explain they were targeting weeds versus a whole spray applicati...”
              - button "More..." [ref=e281] [cursor=pointer]
            - generic [ref=e285]:
              - generic [ref=e286]:
                - link "Google" [ref=e287]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@40.949684,-74.2156551,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xf458f867201d976a!8m2!3d40.949684!4d-74.2156551
                  - img "Google" [ref=e288]
                - generic [ref=e289]:
                  - heading "Kerry G." [level=3] [ref=e290]
                  - generic [ref=e291]:
                    - img "star" [ref=e292]
                    - img "star" [ref=e293]
                    - img "star" [ref=e294]
                    - img "star" [ref=e295]
                    - img "star" [ref=e296]
              - paragraph [ref=e297]: “My brother has been telling me to “go national” not local for years. He is a big fan of TruGreen, and now, I am too. Sometimes little brothers are so right!”
            - generic [ref=e301]:
              - generic [ref=e302]:
                - link "Google" [ref=e303]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@41.7178316,-86.3001254,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x517e1fb073e1265b!8m2!3d41.7178316!4d-86.3001254
                  - img "Google" [ref=e304]
                - generic [ref=e305]:
                  - heading "Mark S." [level=3] [ref=e306]
                  - generic [ref=e307]:
                    - img "star" [ref=e308]
                    - img "star" [ref=e309]
                    - img "star" [ref=e310]
                    - img "star" [ref=e311]
                    - img "star" [ref=e312]
              - paragraph [ref=e313]: “I do suggest to anyone reading this to use Trugreen. If for the simple fact life is very demanding. The use of local experts with the equipment time and materials. Is cost effective, and represents care for ones property.”
            - generic [ref=e317]:
              - generic [ref=e318]:
                - link "Google" [ref=e319]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@43.8747253,-78.8273545,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xb6c417757a9d6201!8m2!3d43.8747253!4d-78.8273545
                  - img "Google" [ref=e320]
                - generic [ref=e321]:
                  - heading "Neaz Mohammed C." [level=3] [ref=e322]
                  - generic [ref=e323]:
                    - img "star" [ref=e324]
                    - img "star" [ref=e325]
                    - img "star" [ref=e326]
                    - img "star" [ref=e327]
                    - img "star" [ref=e328]
              - paragraph [ref=e329]: “You get what you pay for. I was with weedman for 3 years, no change, i still had weeds. It's my 2nd year with TruGreen my lawn is now green, thick and I see less weeds. They say 7 visits but I am getting more than that. 😊 Just renewed my services for this yea...”
              - button "More..." [ref=e330] [cursor=pointer]
          - generic [ref=e331]:
            - button "Backwards Navigation Arrow" [ref=e332]
            - button "Forward Navigation Arrow" [ref=e333] [cursor=pointer]
          - generic [ref=e334]:
            - button "Active Selection Indicator" [ref=e335] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e337] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e339] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e341] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e343] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e345] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e347] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e349] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e351] [cursor=pointer]
      - generic [ref=e354]:
        - generic [ref=e355]:
          - heading "National strength meets local know-how." [level=2] [ref=e357]
          - generic [ref=e358]:
            - paragraph [ref=e359]: Coast to coast, TruGreen® teams deliver a trusted standard. Every visit is tailored and local. Every plan is backed by the strength of a national network. Find your local pros below.
            - link "Get Started" [ref=e360] [cursor=pointer]:
              - /url: "#"
        - generic [ref=e362]:
          - spinbutton [ref=e363]
          - img "searchicon" [ref=e364] [cursor=pointer]
      - generic [ref=e369]:
        - heading "Let's talk lawn." [level=2] [ref=e371]
        - generic [ref=e373]:
          - generic [ref=e377]:
            - img "A friendly TruGreen customer service expert wearing a headset and smiling, ready to assist."
            - generic [ref=e378]:
              - heading "We’ve got you covered." [level=3] [ref=e379]
              - list [ref=e380]:
                - listitem [ref=e381]:
                  - generic [ref=e382]: Update your service schedule
                - listitem [ref=e383]:
                  - generic [ref=e384]: Ask about treatments in your area
                - listitem [ref=e385]:
                  - generic [ref=e386]: Make a payment
                - listitem [ref=e387]:
                  - generic [ref=e388]: Add or change service
                - listitem [ref=e389]:
                  - generic [ref=e390]: Login assistance
              - paragraph [ref=e391]: Our Virtual Assistant can handle most things and is available 24/7, or you can sign in to manage your account.
              - generic [ref=e392]:
                - link "Chat Now" [ref=e393] [cursor=pointer]:
                  - /url: "#"
                - link "Log In" [ref=e394] [cursor=pointer]:
                  - /url: /my-account/login
          - generic [ref=e397]:
            - generic [ref=e399]:
              - heading "Give us a call." [level=3] [ref=e401]
              - paragraph [ref=e402]: Drop us a line and let's connect.
              - paragraph [ref=e403]:
                - generic [ref=e404]:
                  - text: "Mon – Fri:"
                  - time [ref=e405]: 7:30 AM
                  - text: –
                  - time [ref=e406]: 10:00 PM
                  - text: ET
                  - text: "Sat:"
                  - time [ref=e407]: 8:30 AM
                  - text: –
                  - time [ref=e408]: 8:00 PM
                  - text: ET
                  - text: "Sun: Closed"
              - link "1-844-787-4522" [ref=e409] [cursor=pointer]:
                - /url: tel:18447874522
              - heading "Send us a text." [level=3] [ref=e411]
              - link "MYLAWN (695296)" [ref=e412] [cursor=pointer]:
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - generic [ref=e414]:
              - heading "Email us." [level=3] [ref=e415]
              - paragraph [ref=e416]: Send us your suggestions, questions, and feedback. We’ll get back to you in 1-2 business days.
              - link "Email us" [ref=e417] [cursor=pointer]:
                - /url: "#"
  - contentinfo [ref=e419]:
    - generic [ref=e420]:
      - generic [ref=e421]:
        - generic [ref=e423]:
          - heading "About Us" [level=2] [ref=e424]
          - list:
            - listitem [ref=e425]:
              - link "About TruGreen" [ref=e426]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e427]:
              - link "Executive Staff" [ref=e428]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e429]:
              - link "Newsroom" [ref=e430]:
                - /url: /newsroom
            - listitem [ref=e431]:
              - link "Careers" [ref=e432]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e434]:
          - heading "Our Services" [level=2] [ref=e435]
          - list:
            - listitem [ref=e436]:
              - link "Lawn Care Plan Comparison" [ref=e437]:
                - /url: /products-and-services
            - listitem [ref=e438]:
              - link "Tree & Shrub Plan Overview" [ref=e439]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e440]:
              - link "Pest Control Plan Comparison" [ref=e441]:
                - /url: /pests-products-and-services
            - listitem [ref=e442]:
              - link "Branch Finder" [ref=e443]:
                - /url: /local-lawn-care
        - generic [ref=e445]:
          - heading "Resources" [level=2] [ref=e446]
          - list:
            - listitem [ref=e447]:
              - link "FAQs" [ref=e448]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e449]:
              - link "Military Discount" [ref=e450]:
                - /url: /military-discount
            - listitem [ref=e451]:
              - link "Learning Center" [ref=e452]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e453]:
              - link "Blogs" [ref=e454]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e455]:
              - link "Service Terms and Conditions" [ref=e456]:
                - /url: /service-terms-and-conditions
        - generic [ref=e459]:
          - heading "For new service" [level=2] [ref=e460]
          - list:
            - listitem [ref=e461]:
              - link "1-844-787-4522" [ref=e462]:
                - /url: tel:1-844-787-4522
            - listitem [ref=e463]:
              - link "Get a Call Back" [ref=e464]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e467]:
          - heading "For our Customer" [level=2] [ref=e468]
          - list:
            - listitem [ref=e469]:
              - link "Account Login & Register" [ref=e470]:
                - /url: /my-account/login
            - listitem [ref=e471]:
              - generic [ref=e472]: "Call:"
              - link "1-844-787-4522" [ref=e473]:
                - /url: tel:1-844-787-4522
            - listitem [ref=e474]:
              - 'link "Text: MYLAWN (695296)" [ref=e475]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e476]:
              - link "Customer Support" [ref=e477]:
                - /url: /customer-support
            - listitem [ref=e478]:
              - link "Pay My Bill" [ref=e479]:
                - /url: /pay-your-bill
      - generic [ref=e482]:
        - paragraph [ref=e483]: We may apply a surcharge not to exceed 3% to cover all or part of our costs of accepting your credit card. For Oklahoma-based consumers, the fee will be 2%.
        - paragraph [ref=e484]: "**Available to residential customers for Lawn, TruDefense Mosquito,TruBarrier Perimeter Pest, Flea, Tick & Outdoor Nuisance Pest Control and/or TruShrub Tree & Shrub services only. Requires purchase of annual plan using PrePay or EasyPay. Guarantee based on a matching quote from a Qualified Provider. Parameters include matching service address, number of applications, application price, services to be performed and areas to be treated. Not valid on quotes older than 120 days or one-day sales/seasonal promotions. TruGreen reserves the right to verify. For first year of service only. Limited time offer. Not to be combined with or used in conjunction with any other offer or discount. Valid at participating TruGreen locations. Additional restrictions may apply. Consumer responsible for all sales tax."
        - paragraph [ref=e485]: ◆ TruGreen will gladly visit your property as needed between scheduled visits to ensure your satisfaction. Guarantee applies to full program customers only. Excludes TruBasic and partial programs. Additional restrictions may apply.
        - paragraph [ref=e486]: ✦ Purchase of full lawn plan required for Healthy Lawn Analysis, which is performed at the first visit.
        - paragraph [ref=e487]: ★ Requires purchase of annual plan. Special price is for first application only. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount.
        - paragraph [ref=e488]: ✢ Requires purchase of annual plan. Special price is for first Tree & Shrub application only, for new residential EasyPay or PrePay customers only. TruGreen® Tree & Shrub includes fertilization of common trees and shrubs, and controls common foliar insects and diseases. It does not include treatment of specialty trees such as fruit or certain ornamentals, or assessment and treatment of trees over 25 ft. in height. For more details, go to TruGreen FAQs at TruGreen.com/FAQTREE. Not to be combined with or used in conjunction with any other offer or discount for the same service. Consumer responsible for all sales tax.
        - paragraph [ref=e489]: ★★ Requires purchase of full mosquito plan. Special price is for first mosquito application only, for new EasyPay or PrePay residential customers only. Valid at participating TruGreen locations. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax. ✧ Guarantee applies to full plan customers only.
        - paragraph [ref=e490]: ◆◆ Service does not include removal of webs higher than 10 ft. and application does not protect against termites and other wood-destroying organisms, bedbugs, bees, fleas, German cockroaches, hornets, pharaoh ants, rodents, or ticks. Valid at participating TruGreen locations. Not to be combined with or used in conjunction with any other oﬀer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
        - paragraph [ref=e491]:
          - text: "America’s #1 lawn care company based on U.S. market share of professional lawn care companies. 2023 MMR Brand Health Tracker."
          - link "PGATOUR.COM" [ref=e492]:
            - /url: https://pgatour.com/
          - text: ", PGA TOUR, TPC, SHOTLINK and the SWINGING GOLFER LOGO are trademarks of PGA TOUR, Inc. BBB accredited since 7/01/2012."
        - paragraph [ref=e493]:
          - superscript [ref=e494]: "3"
          - text: Special price is for first regular lawn service only. Use code SAVENOW. Special pricing is given in consideration of your commitment to receive all treatments under your annual plan. If you cancel before your plan renews, the discounted visit will be charged at full price. Requires purchase of annual Lawn plan, for new residential EasyPay or PrePay customers only. Offer unavailable for lawns larger than 20,000 square feet. Not valid on TruBasic or partial programs. Available 7/21/2026-9/15/2026. One time discount only. Valid at participating TruGreen locations. Availability of services and/or products may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax
      - generic [ref=e495]:
        - generic [ref=e497]:
          - generic [ref=e498]:
            - link "Facebook Icon" [ref=e499]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e500]
            - link "X.com Icon" [ref=e501]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e502]
            - link "Instagram Icon" [ref=e503]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e504]
            - link "Youtube Icon" [ref=e505]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e506]
            - link "TikTok Icon" [ref=e507]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e508]
            - link "Yelp Icon" [ref=e509]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e510]
          - generic [ref=e511]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e512]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e513]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e514]':
              - /url: "#"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e515]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e516]':
              - /url: /pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e517]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e518]':
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e519]'
        - separator [ref=e520]
      - generic [ref=e523]:
        - paragraph [ref=e525]:
          - img "TruGreen Leaf Logo" [ref=e526]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e528]:
          - listitem [ref=e529]:
            - link "SMS Terms and Conditions" [ref=e530]:
              - /url: /about/sms-terms
          - listitem [ref=e531]:
            - link "Terms and Conditions" [ref=e532]:
              - /url: /about/terms
          - listitem [ref=e533]:
            - link "Privacy Policy" [ref=e534]:
              - /url: /about/privacy-policy
          - listitem [ref=e535]:
            - link "California Privacy Notice" [ref=e536]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e537]:
            - link "Your Privacy Choices privacyoptions" [ref=e538]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e539]
  - generic [ref=e540]:
    - paragraph [ref=e541]: Questions? Quote, Call or Chat Now.
    - link "1-844-787-4522" [ref=e542]:
      - /url: tel:18447874522
  - alert [ref=e543]
  - img
  - generic:
    - dialog "Privacy" [ref=e545]:
      - generic [ref=e547]:
        - generic [ref=e550]:
          - text: We and third parties use cookies and similar tools to track your interactions with this site, perform analytics, and conduct targeted advertising. By using the site, you agree to our use of these technologies and our
          - link "Terms and Conditions" [ref=e551]:
            - /url: https://www.trugreen.com/about/terms
          - text: and our
          - link "Privacy Policy" [ref=e552]:
            - /url: https://www.trugreen.com/about/privacy-policy#cookiesandinterest-basedadvertising
          - text: . California residents, please see our
          - link "More information about your privacy, opens in a new tab" [ref=e553]:
            - /url: https://www.trugreen.com/about/california-privacy-policy
            - text: California Privacy Policy
        - generic [ref=e555]:
          - button "Cookie Settings, Opens the preference center dialog" [ref=e556] [cursor=pointer]: Cookie Settings
          - button "Reject All" [ref=e557] [cursor=pointer]
          - button "Accept All Cookies" [ref=e558] [cursor=pointer]
      - button "Close" [ref=e560] [cursor=pointer]
    - text: Cookie Settings
```

# Test source

```ts
  144 |     });
  145 | 
  146 |     test("primary navigation links point at expected destinations", async ({
  147 |       page,
  148 |     }) => {
  149 |       const header = page.locator("header").first();
  150 | 
  151 |       for (const href of [
  152 |         "/products-and-services/trushrub-tree-and-shrub-care",
  153 |         "/lawn-care-101",
  154 |         "/why-choose-trugreen/testimonials-and-ratings",
  155 |         "/customer-support",
  156 |         "/buy-online",
  157 |         "/pay-your-bill",
  158 |         "/my-account/login",
  159 |       ]) {
  160 |         await expect(
  161 |           header.locator(`a[href="${href}"]`).first(),
  162 |           `nav link ${href}`,
  163 |         ).toHaveCount(1);
  164 |       }
  165 |     });
  166 | 
  167 |     test("navigation exposes the full lawn plan and service catalog", async ({
  168 |       page,
  169 |     }) => {
  170 |       const header = page.locator("header").first();
  171 | 
  172 |       // The flyout is rendered eagerly and only revealed on interaction, so the
  173 |       // catalog is verified structurally rather than through a fragile hover/click.
  174 |       for (const href of [
  175 |         "/products-and-services",
  176 |         "/products-and-services/trupro",
  177 |         "/products-and-services/trucore",
  178 |         "/products-and-services/natural-lawn-care",
  179 |         "/products-and-services/trubasic",
  180 |         "/products-and-services/lawn-fertilization",
  181 |         "/products-and-services/weed-control",
  182 |         "/products-and-services/aeration",
  183 |         "/products-and-services/grub-control",
  184 |         "/products-and-services/lawn-disease",
  185 |         "/pests-products-and-services",
  186 |         "/products-and-services/trudefense-mosquito-control",
  187 |         "/products-and-services/trubarrier-perimeter-pest-control",
  188 |         "/products-and-services/fire-ant-control",
  189 |       ]) {
  190 |         await expect(
  191 |           header.locator(`a[href="${href}"]`).first(),
  192 |           `catalog link ${href}`,
  193 |         ).toHaveCount(1);
  194 |       }
  195 |     });
  196 | 
  197 |     test("mobile header collapses to logo, call and hamburger controls", async ({
  198 |       page,
  199 |     }) => {
  200 |       test.skip(!isMobileViewport(page), "Mobile-only navigation layout");
  201 | 
  202 |       const nav = page.getByRole("navigation", { name: /Mobile navigation/i });
  203 |       await expect(nav).toBeVisible();
  204 |       await expect(
  205 |         nav.getByRole("link", { name: /TruGreen Logo/i }),
  206 |       ).toBeVisible();
  207 |       await expect(
  208 |         nav.getByRole("link", { name: /Call customer service/i }),
  209 |       ).toBeVisible();
  210 |       await expect(
  211 |         nav.getByRole("link", { name: /hamMenu_icon/i }),
  212 |       ).toBeVisible();
  213 |     });
  214 | 
  215 |     test("hero Get Started opens the plan modal with Buy Online and Talk To A Pro", async ({
  216 |       page,
  217 |     }) => {
  218 |       const modal = page.locator(".modal.show").first();
  219 |       // Some hero variants route straight to the buy flow instead of prompting.
  220 |       await clickUntil(
  221 |         page.getByRole("button", { name: /^Get Started$/i }).first(),
  222 |         modal.or(page.locator('main:has-text("Enter your home address")')),
  223 |       );
  224 | 
  225 |       if (!(await modal.isVisible().catch(() => false))) {
  226 |         await expect(page).toHaveURL(/\/buy-online/);
  227 |         return;
  228 |       }
  229 | 
  230 |       await expect(modal).toContainText(/Let's talk lawn/i);
  231 |       await expect(
  232 |         modal.getByRole("button", { name: /Talk To A Pro/i }).first(),
  233 |       ).toBeVisible();
  234 |       await expect(
  235 |         modal.locator('a[href="/buy-online"]').first(),
  236 |       ).toBeVisible();
  237 |     });
  238 | 
  239 |     test("buy-online entry point navigates to the buy flow", async ({
  240 |       page,
  241 |     }) => {
  242 |       await page.locator('a[href="/buy-online"]:visible').first().click();
  243 | 
> 244 |       await page.waitForURL(/\/buy-online/, { timeout: 30000 });
      |                  ^ TimeoutError: page.waitForURL: Timeout 30000ms exceeded.
  245 |       await expect(page).toHaveURL(/\/buy-online/);
  246 |       await expect(page).toHaveTitle(/TruGreen|Pricing/i);
  247 |     });
  248 | 
  249 |     test("value proposition carousel renders three differentiator cards", async ({
  250 |       page,
  251 |     }) => {
  252 |       // Prod and QA ship different copy for this section's heading.
  253 |       const heading = page.getByRole("heading", {
  254 |         name: /clear choice for a great looking lawn|why homeowners choose trugreen/i,
  255 |       });
  256 |       await revealSection(heading.first());
  257 | 
  258 |       for (const card of [
  259 |         /The Pro’s Choice/i,
  260 |         /Guaranteed Results/i,
  261 |         /#1 in America/i,
  262 |       ]) {
  263 |         await expect(
  264 |           page.getByRole("heading", { name: card }).first(),
  265 |         ).toBeVisible();
  266 |       }
  267 | 
  268 |       await expect(
  269 |         page.getByRole("button", { name: /Selection Indicator/i }).first(),
  270 |       ).toBeVisible();
  271 |     });
  272 | 
  273 |     test("comparison section contrasts TruGreen, DIY and Other Guys", async ({
  274 |       page,
  275 |     }) => {
  276 |       const heading = page
  277 |         .getByRole("heading", { name: /difference local pros make/i })
  278 |         .first();
  279 |       await revealSection(heading);
  280 | 
  281 |       await expect(page.getByRole("heading", { name: /^DIY$/ })).toBeVisible();
  282 |       await expect(
  283 |         page.getByRole("heading", { name: /^Other Guys$/i }),
  284 |       ).toBeVisible();
  285 |       await expect(
  286 |         page.getByRole("img", { name: /^TruGreen$/ }).first(),
  287 |       ).toBeVisible();
  288 |     });
  289 | 
  290 |     test("testimonials carousel shows rated reviews and advances", async ({
  291 |       page,
  292 |     }) => {
  293 |       const heading = page
  294 |         .getByRole("heading", { name: /What homeowners are saying/i })
  295 |         .first();
  296 |       await revealSection(heading);
  297 | 
  298 |       const stars = page.getByRole("img", { name: /^star$/i });
  299 |       await expect(stars.first()).toBeVisible({ timeout: 20000 });
  300 |       expect(await stars.count()).toBeGreaterThanOrEqual(4);
  301 | 
  302 |       const firstQuote = await page
  303 |         .locator("p")
  304 |         .filter({ hasText: /^[“"]/ })
  305 |         .first()
  306 |         .innerText();
  307 |       expect(firstQuote.length).toBeGreaterThan(20);
  308 | 
  309 |       const forward = page
  310 |         .getByRole("button", { name: /Forward Navigation Arrow/i })
  311 |         .first();
  312 |       if (await forward.isVisible().catch(() => false)) {
  313 |         await forward.click();
  314 |         await expect(
  315 |           page
  316 |             .getByRole("button", { name: /Backwards Navigation Arrow/i })
  317 |             .first(),
  318 |         ).toBeEnabled();
  319 |       }
  320 |     });
  321 | 
  322 |     test("branch locator accepts a ZIP code and resolves local coverage", async ({
  323 |       page,
  324 |     }) => {
  325 |       const zip = page.locator("#pac-input").first();
  326 |       await revealSection(zip);
  327 | 
  328 |       await zip.fill("38018");
  329 |       await zip.press("Enter");
  330 | 
  331 |       // Either a branch result or an explicit unserviced message is acceptable;
  332 |       // the regression guard is that the lookup responds instead of hanging.
  333 |       await expect(page.locator("body")).toContainText(
  334 |         /branch|ZIP Code|service/i,
  335 |         { timeout: 20000 },
  336 |       );
  337 |     });
  338 | 
  339 |     test("contact section exposes phone, SMS and account entry points", async ({
  340 |       page,
  341 |     }) => {
  342 |       const heading = page
  343 |         .getByRole("heading", { name: /Let's talk lawn/i })
  344 |         .first();
```