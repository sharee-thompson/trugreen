# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: functional/homepage/homepage.spec.ts >> TruGreen homepage regression >> page loads without console errors or failed requests
- Location: tests/functional/homepage/homepage.spec.ts:449:9

# Error details

```
Error: 503 https://api.trugreen.com/ecommerce/V1/cms/scriptblock

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "503 https://api.trugreen.com/ecommerce/V1/cms/scriptblock",
+ ]
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
          - link "TruGreen Logo" [ref=e12]:
            - /url: /
            - img "TruGreen Logo" [ref=e13]
          - generic [ref=e15]:
            - link "location_icon" [ref=e16]:
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - img "location_icon" [ref=e17]
            - link "Call customer service" [ref=e18]:
              - /url: tel:1-844-567-9909
              - img "Call customer service" [ref=e19]
            - link "hamMenu_icon" [ref=e20]:
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
        - link "sign up" [ref=e39]:
          - /url: /buy-online
        - text: online.
      - generic [ref=e41]:
        - generic [ref=e42]:
          - heading "The difference local pros make." [level=2] [ref=e43]
          - paragraph [ref=e44]: Explore the differences and see why more homeowners are choosing TruGreen.
        - generic [ref=e45]:
          - generic [ref=e46]:
            - heading "TruGreen TruGreen" [level=3] [ref=e47]:
              - img "TruGreen" [ref=e48]
              - generic [ref=e49]: TruGreen
            - generic [ref=e50]:
              - generic [ref=e51]:
                - term [ref=e52]: Custom for your lawn
                - definition [ref=e53]: A tailored plan designed for your region, your climate, and the results you want.
              - generic [ref=e54]:
                - term [ref=e55]: We do the work
                - definition [ref=e56]: Our trained specialists apply treatments with precision and adjust throughout the season to keep your lawn on track.
              - generic [ref=e57]:
                - term [ref=e58]: Pro-level results
                - definition [ref=e59]: A lawn that looks greener, feels thicker, and grows stronger — backed by the TruGreen Guarantee. ◆
          - generic [ref=e60]:
            - heading "DIY" [level=3] [ref=e61]
            - generic [ref=e62]:
              - generic [ref=e63]:
                - term [ref=e64]: One-size-fits-all
                - definition [ref=e65]: Store-bought products can’t account for local soil variations, seasonal timing, or your lawn’s specific challenges.
              - generic [ref=e66]:
                - term [ref=e67]: Your weekend, gone
                - definition [ref=e68]: Planning, hauling, spreading, spraying — every step takes time you’d rather spend elsewhere.
              - generic [ref=e69]:
                - term [ref=e70]: You’re on your own
                - definition [ref=e71]: If something goes wrong, there’s no expert to call and no safety net to get your lawn back on track.
          - generic [ref=e72]:
            - heading "Other Guys" [level=3] [ref=e73]
            - generic [ref=e74]:
              - generic [ref=e75]:
                - term [ref=e76]: Limited resources
                - definition [ref=e77]: Without nationwide insights or shared learnings, it becomes harder to adapt as pests, weather, and seasonal issues change.
              - generic [ref=e78]:
                - term [ref=e79]: Variable quality
                - definition [ref=e80]: Without a national training program or on-staff agronomists, the results can be unpredictable.
              - generic [ref=e81]:
                - term [ref=e82]: Limited accountability
                - definition [ref=e83]: Guarantees and fixes often depend on goodwill rather than a structured, nationwide commitment.
      - generic [ref=e85]:
        - heading "Your TruGreen team is ready to transform your lawn." [level=2] [ref=e86]:
          - link "Your TruGreen team is ready to transform your lawn." [ref=e87]:
            - /url: /buy-online
        - generic [ref=e88]:
          - button "Get Started" [ref=e89] [cursor=pointer]
          - button "Talk To a Pro" [ref=e90] [cursor=pointer]
      - generic [ref=e92]:
        - generic [ref=e93]:
          - heading "Why homeowners choose TruGreen." [level=2] [ref=e94]
          - paragraph [ref=e95]: If you want a lawn that looks truly exceptional, you choose the pros who know how to deliver it.
        - generic [ref=e99]:
          - generic [ref=e101]:
            - generic [ref=e104]:
              - generic [ref=e106]:
                - img "Two TruGreen lawn care specialists collaborating in front of a suburban home." [ref=e107]
                - generic [ref=e108]:
                  - heading "The Pro’s Choice" [level=3] [ref=e109]
                  - paragraph [ref=e110]: As the Official Lawn Care Treatment Provider of the PGA TOUR® we bring pro-level expertise to your home.
              - img "PGA Logo" [ref=e111]
            - generic [ref=e116]:
              - img "Close-up macro view of a perfectly manicured, dense green lawn." [ref=e117]
              - generic [ref=e118]:
                - heading "Guaranteed Results" [level=3] [ref=e119]
                - paragraph [ref=e120]: If you’re not satisfied, we’ll make it right. That’s our commitment — and it’s backed by the TruGreen Guarantee. ◆
            - generic [ref=e125]:
              - img "A smiling TruGreen technician stands proudly on a healthy, vibrant green lawn." [ref=e126]
              - generic [ref=e127]:
                - heading "#1 in America" [level=3] [ref=e128]
                - paragraph [ref=e129]: Millions of Americans choose our locally tailored recipes for healthier, greener, better-looking lawns.
            - generic [ref=e132]:
              - generic [ref=e134]:
                - img "Two TruGreen lawn care specialists collaborating in front of a suburban home." [ref=e135]
                - generic [ref=e136]:
                  - heading "The Pro’s Choice" [level=3] [ref=e137]
                  - paragraph [ref=e138]: As the Official Lawn Care Treatment Provider of the PGA TOUR® we bring pro-level expertise to your home.
              - img "PGA Logo" [ref=e139]
            - generic [ref=e144]:
              - img "Close-up macro view of a perfectly manicured, dense green lawn." [ref=e145]
              - generic [ref=e146]:
                - heading "Guaranteed Results" [level=3] [ref=e147]
                - paragraph [ref=e148]: If you’re not satisfied, we’ll make it right. That’s our commitment — and it’s backed by the TruGreen Guarantee. ◆
            - generic [ref=e153]:
              - img "A smiling TruGreen technician stands proudly on a healthy, vibrant green lawn." [ref=e154]
              - generic [ref=e155]:
                - heading "#1 in America" [level=3] [ref=e156]
                - paragraph [ref=e157]: Millions of Americans choose our locally tailored recipes for healthier, greener, better-looking lawns.
            - generic [ref=e160]:
              - generic [ref=e162]:
                - img "Two TruGreen lawn care specialists collaborating in front of a suburban home." [ref=e163]
                - generic [ref=e164]:
                  - heading "The Pro’s Choice" [level=3] [ref=e165]
                  - paragraph [ref=e166]: As the Official Lawn Care Treatment Provider of the PGA TOUR® we bring pro-level expertise to your home.
              - img "PGA Logo" [ref=e167]
          - generic [ref=e168]:
            - button "Active Selection Indicator" [ref=e169] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e171] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e173] [cursor=pointer]
      - generic [ref=e177]:
        - heading "What homeowners are saying." [level=2] [ref=e180]
        - generic [ref=e183]:
          - generic [ref=e185]:
            - generic [ref=e189]:
              - generic [ref=e190]:
                - link "Google" [ref=e191]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@29.2175962,-81.0709891,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x15b373965eecca3b!8m2!3d29.2175962!4d-81.0709891
                  - img "Google" [ref=e192]
                - generic [ref=e193]:
                  - heading "John Q." [level=3] [ref=e194]
                  - generic [ref=e195]:
                    - img "star" [ref=e196]
                    - img "star" [ref=e197]
                    - img "star" [ref=e198]
                    - img "star" [ref=e199]
                    - img "star" [ref=e200]
              - paragraph [ref=e201]: “The technicians are always professional and courteous. My lawn looks so good that my neighbor hired them.”
            - generic [ref=e205]:
              - generic [ref=e206]:
                - link "Google" [ref=e207]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@40.8546273,-96.6828367,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x3909c46d545c8017!8m2!3d40.8546273!4d-96.6828367
                  - img "Google" [ref=e208]
                - generic [ref=e209]:
                  - heading "Cindy K." [level=3] [ref=e210]
                  - generic [ref=e211]:
                    - img "star" [ref=e212]
                    - img "star" [ref=e213]
                    - img "star" [ref=e214]
                    - img "star" [ref=e215]
                    - img "star" [ref=e216]
              - paragraph [ref=e217]: “Our lawn has been uniformly green since we started with TruGreen this season. We recommended TruGreen to our neighbor who now is getting the service also”
            - generic [ref=e221]:
              - generic [ref=e222]:
                - link "Google" [ref=e223]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@41.2586263,-75.8304408,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x23b4475f75633edc!8m2!3d41.2586263!4d-75.8304408
                  - img "Google" [ref=e224]
                - generic [ref=e225]:
                  - heading "Jeffrey J." [level=3] [ref=e226]
                  - generic [ref=e227]:
                    - img "star" [ref=e228]
                    - img "star" [ref=e229]
                    - img "star" [ref=e230]
                    - img "star" [ref=e231]
                    - img "star" [ref=e232]
              - paragraph [ref=e233]: “Great results and customer service from our local TruGreen team!! Special thanks to Darron R our awesome lawn technician! Darron takes customer service to a whole new level… takes time to explain the treatment and answer any questions I may have about the lawn...”
              - button "More..." [ref=e234] [cursor=pointer]
            - generic [ref=e238]:
              - generic [ref=e239]:
                - link "Google" [ref=e240]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@42.1854098,-85.5975572,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x6decb18e9d110852!8m2!3d42.1854098!4d-85.5975572
                  - img "Google" [ref=e241]
                - generic [ref=e242]:
                  - heading "Janet R." [level=3] [ref=e243]
                  - generic [ref=e244]:
                    - img "star" [ref=e245]
                    - img "star" [ref=e246]
                    - img "star" [ref=e247]
                    - img "star" [ref=e248]
                    - img "star" [ref=e249]
              - paragraph [ref=e250]: “Our lawn has never looked this green and healthy!!! We have tried all the "Scotts"...other products as well like Sunday lawn...but chosing Tru Green was the best choice!!! They also sprayed for bugs so we got the best of both worlds!!!!!!”
            - generic [ref=e254]:
              - generic [ref=e255]:
                - link "Google" [ref=e256]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@38.7176116,-77.1907513,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xb6a69cd1abfda267!8m2!3d38.7176116!4d-77.1907513
                  - img "Google" [ref=e257]
                - generic [ref=e258]:
                  - heading "Carrie B." [level=3] [ref=e259]
                  - generic [ref=e260]:
                    - img "star" [ref=e261]
                    - img "star" [ref=e262]
                    - img "star" [ref=e263]
                    - img "star" [ref=e264]
                    - img "star" [ref=e265]
              - paragraph [ref=e266]: “Our lawn is lush, dark green, weed-free. Our neighbor’s lawn is patchy, yellowish-green, and weedy. We have TruGreen, the neighbors do not. Also, the technicians are efficient, friendly, and responsive. Thank you TruGreen!”
            - generic [ref=e270]:
              - generic [ref=e271]:
                - link "Google" [ref=e272]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@36.5492259,-82.5186668,17z/data=!3m1!4b1!4m6!3m5!1s0x885a927d49d9f3cf:0x2050b7ceacea6a60!8m2!3d36.5492259!4d-82.5186668!16s%2Fg%2F1q2w1fl8k?entry=ttu
                  - img "Google" [ref=e273]
                - generic [ref=e274]:
                  - heading "tnstedo" [level=3] [ref=e275]
                  - generic [ref=e276]:
                    - img "star" [ref=e277]
                    - img "star" [ref=e278]
                    - img "star" [ref=e279]
                    - img "star" [ref=e280]
                    - img "star" [ref=e281]
              - paragraph [ref=e282]: “I appreciate the professionalism of TruGreen especially compared to the local company I had been using. I can trust TG to actually do the entire lawn & back yard. Hunter came to the door today to explain they were targeting weeds versus a whole spray applicati...”
              - button "More..." [ref=e283] [cursor=pointer]
            - generic [ref=e287]:
              - generic [ref=e288]:
                - link "Google" [ref=e289]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@40.949684,-74.2156551,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xf458f867201d976a!8m2!3d40.949684!4d-74.2156551
                  - img "Google" [ref=e290]
                - generic [ref=e291]:
                  - heading "Kerry G." [level=3] [ref=e292]
                  - generic [ref=e293]:
                    - img "star" [ref=e294]
                    - img "star" [ref=e295]
                    - img "star" [ref=e296]
                    - img "star" [ref=e297]
                    - img "star" [ref=e298]
              - paragraph [ref=e299]: “My brother has been telling me to “go national” not local for years. He is a big fan of TruGreen, and now, I am too. Sometimes little brothers are so right!”
            - generic [ref=e303]:
              - generic [ref=e304]:
                - link "Google" [ref=e305]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@41.7178316,-86.3001254,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x517e1fb073e1265b!8m2!3d41.7178316!4d-86.3001254
                  - img "Google" [ref=e306]
                - generic [ref=e307]:
                  - heading "Mark S." [level=3] [ref=e308]
                  - generic [ref=e309]:
                    - img "star" [ref=e310]
                    - img "star" [ref=e311]
                    - img "star" [ref=e312]
                    - img "star" [ref=e313]
                    - img "star" [ref=e314]
              - paragraph [ref=e315]: “I do suggest to anyone reading this to use Trugreen. If for the simple fact life is very demanding. The use of local experts with the equipment time and materials. Is cost effective, and represents care for ones property.”
            - generic [ref=e319]:
              - generic [ref=e320]:
                - link "Google" [ref=e321]:
                  - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@43.8747253,-78.8273545,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xb6c417757a9d6201!8m2!3d43.8747253!4d-78.8273545
                  - img "Google" [ref=e322]
                - generic [ref=e323]:
                  - heading "Neaz Mohammed C." [level=3] [ref=e324]
                  - generic [ref=e325]:
                    - img "star" [ref=e326]
                    - img "star" [ref=e327]
                    - img "star" [ref=e328]
                    - img "star" [ref=e329]
                    - img "star" [ref=e330]
              - paragraph [ref=e331]: “You get what you pay for. I was with weedman for 3 years, no change, i still had weeds. It's my 2nd year with TruGreen my lawn is now green, thick and I see less weeds. They say 7 visits but I am getting more than that. 😊 Just renewed my services for this yea...”
              - button "More..." [ref=e332] [cursor=pointer]
          - generic [ref=e333]:
            - button "Backwards Navigation Arrow" [ref=e334]
            - button "Forward Navigation Arrow" [ref=e335] [cursor=pointer]
          - generic [ref=e336]:
            - button "Active Selection Indicator" [ref=e337] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e339] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e341] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e343] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e345] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e347] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e349] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e351] [cursor=pointer]
            - button "Inactive Selection Indicator" [ref=e353] [cursor=pointer]
      - spinbutton [ref=e359]
      - generic [ref=e362]:
        - heading "Let's talk lawn." [level=2] [ref=e364]
        - generic [ref=e366]:
          - generic [ref=e370]:
            - img "A friendly TruGreen customer service expert wearing a headset and smiling, ready to assist."
            - generic [ref=e371]:
              - heading "We’ve got you covered." [level=3] [ref=e372]
              - list [ref=e373]:
                - listitem [ref=e374]:
                  - generic [ref=e375]: Update your service schedule
                - listitem [ref=e376]:
                  - generic [ref=e377]: Ask about treatments in your area
                - listitem [ref=e378]:
                  - generic [ref=e379]: Make a payment
                - listitem [ref=e380]:
                  - generic [ref=e381]: Add or change service
                - listitem [ref=e382]:
                  - generic [ref=e383]: Login assistance
              - paragraph [ref=e384]: Our Virtual Assistant can handle most things and is available 24/7, or you can sign in to manage your account.
              - generic [ref=e385]:
                - link "Chat Now" [ref=e386] [cursor=pointer]:
                  - /url: "#"
                - link "Log In" [ref=e387] [cursor=pointer]:
                  - /url: /my-account/login
          - generic [ref=e390]:
            - generic [ref=e392]:
              - heading "Give us a call." [level=3] [ref=e394]
              - paragraph [ref=e395]: Drop us a line and let's connect.
              - paragraph [ref=e396]:
                - generic [ref=e397]:
                  - text: "Mon – Fri:"
                  - time [ref=e398]: 7:30 AM
                  - text: –
                  - time [ref=e399]: 10:00 PM
                  - text: ET
                  - text: "Sat:"
                  - time [ref=e400]: 8:30 AM
                  - text: –
                  - time [ref=e401]: 8:00 PM
                  - text: ET
                  - text: "Sun: Closed"
              - link "1-844-567-9909" [ref=e402] [cursor=pointer]:
                - /url: tel:18445679909
              - heading "Send us a text." [level=3] [ref=e404]
              - link "MYLAWN (695296)" [ref=e405] [cursor=pointer]:
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - generic [ref=e407]:
              - heading "Email us." [level=3] [ref=e408]
              - paragraph [ref=e409]: Send us your suggestions, questions, and feedback. We’ll get back to you in 1-2 business days.
              - link "Email us" [ref=e410] [cursor=pointer]:
                - /url: "#"
  - contentinfo [ref=e412]:
    - generic [ref=e413]:
      - generic [ref=e414]:
        - generic [ref=e416]:
          - heading "About Us" [level=2] [ref=e417]
          - list:
            - listitem [ref=e418]:
              - link "About TruGreen" [ref=e419]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e420]:
              - link "Executive Staff" [ref=e421]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e422]:
              - link "Newsroom" [ref=e423]:
                - /url: /newsroom
            - listitem [ref=e424]:
              - link "Careers" [ref=e425]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e427]:
          - heading "Our Services" [level=2] [ref=e428]
          - list:
            - listitem [ref=e429]:
              - link "Lawn Care Plan Comparison" [ref=e430]:
                - /url: /products-and-services
            - listitem [ref=e431]:
              - link "Tree & Shrub Plan Overview" [ref=e432]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e433]:
              - link "Pest Control Plan Comparison" [ref=e434]:
                - /url: /pests-products-and-services
            - listitem [ref=e435]:
              - link "Branch Finder" [ref=e436]:
                - /url: /local-lawn-care
        - generic [ref=e438]:
          - heading "Resources" [level=2] [ref=e439]
          - list:
            - listitem [ref=e440]:
              - link "FAQs" [ref=e441]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e442]:
              - link "Military Discount" [ref=e443]:
                - /url: /military-discount
            - listitem [ref=e444]:
              - link "Learning Center" [ref=e445]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e446]:
              - link "Blogs" [ref=e447]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e448]:
              - link "Service Terms and Conditions" [ref=e449]:
                - /url: /service-terms-and-conditions
        - generic [ref=e452]:
          - heading "For new service" [level=2] [ref=e453]
          - list:
            - listitem [ref=e454]:
              - link "1-844-567-9909" [ref=e455]:
                - /url: tel:1-844-567-9909
            - listitem [ref=e456]:
              - link "Get a Call Back" [ref=e457]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e460]:
          - heading "For our Customer" [level=2] [ref=e461]
          - list:
            - listitem [ref=e462]:
              - link "Account Login & Register" [ref=e463]:
                - /url: /my-account/login
            - listitem [ref=e464]:
              - generic [ref=e465]: "Call:"
              - link "1-844-768-0421" [ref=e466]:
                - /url: tel:1-844-768-0421
            - listitem [ref=e467]:
              - 'link "Text: MYLAWN (695296)" [ref=e468]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e469]:
              - link "Customer Support" [ref=e470]:
                - /url: /customer-support
            - listitem [ref=e471]:
              - link "Pay My Bill" [ref=e472]:
                - /url: /pay-your-bill
      - generic [ref=e475]:
        - paragraph [ref=e476]: We may apply a surcharge not to exceed 3% to cover all or part of our costs of accepting your credit card. For Oklahoma-based consumers, the fee will be 2%.
        - paragraph [ref=e477]: "**Available to residential customers for Lawn, TruDefense Mosquito,TruBarrier Perimeter Pest, Flea, Tick & Outdoor Nuisance Pest Control and/or TruShrub Tree & Shrub services only. Requires purchase of annual plan using PrePay or EasyPay. Guarantee based on a matching quote from a Qualified Provider. Parameters include matching service address, number of applications, application price, services to be performed and areas to be treated. Not valid on quotes older than 120 days or one-day sales/seasonal promotions. TruGreen reserves the right to verify. For first year of service only. Limited time offer. Not to be combined with or used in conjunction with any other offer or discount. Valid at participating TruGreen locations. Additional restrictions may apply. Consumer responsible for all sales tax."
        - paragraph [ref=e478]: ◆ TruGreen will gladly visit your property as needed between scheduled visits to ensure your satisfaction. Guarantee applies to full program customers only. Excludes TruBasic and partial programs. Additional restrictions may apply.
        - paragraph [ref=e479]: ✦ Purchase of full lawn plan required for Healthy Lawn Analysis, which is performed at the first visit.
        - paragraph [ref=e480]: ★ Requires purchase of annual plan. Special price is for first application only. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount.
        - paragraph [ref=e481]: ✢ Requires purchase of annual plan. Special price is for first Tree & Shrub application only, for new residential EasyPay or PrePay customers only. TruGreen® Tree & Shrub includes fertilization of common trees and shrubs, and controls common foliar insects and diseases. It does not include treatment of specialty trees such as fruit or certain ornamentals, or assessment and treatment of trees over 25 ft. in height. For more details, go to TruGreen FAQs at TruGreen.com/FAQTREE. Not to be combined with or used in conjunction with any other offer or discount for the same service. Consumer responsible for all sales tax.
        - paragraph [ref=e482]: ★★ Requires purchase of full mosquito plan. Special price is for first mosquito application only, for new EasyPay or PrePay residential customers only. Valid at participating TruGreen locations. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax. ✧ Guarantee applies to full plan customers only.
        - paragraph [ref=e483]: ◆◆ Service does not include removal of webs higher than 10 ft. and application does not protect against termites and other wood-destroying organisms, bedbugs, bees, fleas, German cockroaches, hornets, pharaoh ants, rodents, or ticks. Valid at participating TruGreen locations. Not to be combined with or used in conjunction with any other oﬀer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
        - paragraph [ref=e484]:
          - text: "America’s #1 lawn care company based on U.S. market share of professional lawn care companies. 2023 MMR Brand Health Tracker."
          - link "PGATOUR.COM" [ref=e485]:
            - /url: https://pgatour.com/
          - text: ", PGA TOUR, TPC, SHOTLINK and the SWINGING GOLFER LOGO are trademarks of PGA TOUR, Inc. BBB accredited since 7/01/2012."
      - generic [ref=e486]:
        - generic [ref=e488]:
          - generic [ref=e489]:
            - link "Facebook Icon" [ref=e490]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e491]
            - link "X.com Icon" [ref=e492]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e493]
            - link "Instagram Icon" [ref=e494]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e495]
            - link "Youtube Icon" [ref=e496]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e497]
            - link "TikTok Icon" [ref=e498]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e499]
            - link "Yelp Icon" [ref=e500]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e501]
          - generic [ref=e502]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e503]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e504]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e505]':
              - /url: "#"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e506]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e507]':
              - /url: /pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e508]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e509]':
              - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e510]'
        - separator [ref=e511]
      - generic [ref=e514]:
        - paragraph [ref=e516]:
          - img "TruGreen Leaf Logo" [ref=e517]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e519]:
          - listitem [ref=e520]:
            - link "SMS Terms and Conditions" [ref=e521]:
              - /url: /about/sms-terms
          - listitem [ref=e522]:
            - link "Terms and Conditions" [ref=e523]:
              - /url: /about/terms
          - listitem [ref=e524]:
            - link "Privacy Policy" [ref=e525]:
              - /url: /about/privacy-policy
          - listitem [ref=e526]:
            - link "California Privacy Notice" [ref=e527]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e528]:
            - link "Your Privacy Choices privacyoptions" [ref=e529]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e530]
  - generic [ref=e531]:
    - paragraph [ref=e532]: Questions? Quote, Call or Chat Now.
    - link "1-844-567-9909" [ref=e533]:
      - /url: tel:1-844-567-9909
  - alert [ref=e534]
```

# Test source

```ts
  377 |         "/local-lawn-care",
  378 |         "/lawn-care-101/faqs",
  379 |         "/military-discount",
  380 |         "/lawn-care-101/blog",
  381 |         "/customer-support",
  382 |         "/pay-your-bill",
  383 |         "/my-account/login",
  384 |       ]) {
  385 |         await expect(
  386 |           footer.locator(`a[href="${href}"]`).first(),
  387 |           `footer link ${href}`,
  388 |         ).toHaveCount(1);
  389 |       }
  390 |     });
  391 | 
  392 |     test("footer legal, social and copyright content is present", async ({
  393 |       page,
  394 |     }) => {
  395 |       await scrollToFooter(page);
  396 |       const footer = page.locator("footer").first();
  397 | 
  398 |       for (const href of [
  399 |         "/about/sms-terms",
  400 |         "/about/terms",
  401 |         "/about/privacy-policy",
  402 |         "/about/california-privacy-policy",
  403 |       ]) {
  404 |         await expect(footer.locator(`a[href="${href}"]`).first()).toHaveCount(
  405 |           1,
  406 |         );
  407 |       }
  408 | 
  409 |       for (const domain of [
  410 |         "facebook.com/trugreen",
  411 |         "x.com/trugreen",
  412 |         "instagram.com/trugreen",
  413 |         "youtube.com/trugreen",
  414 |         "tiktok.com",
  415 |       ]) {
  416 |         await expect(
  417 |           footer.locator(`a[href*="${domain}"]`).first(),
  418 |           `social link ${domain}`,
  419 |         ).toHaveCount(1);
  420 |       }
  421 | 
  422 |       await expect(footer).toContainText(
  423 |         new RegExp(`©\\s*\\d{4}\\s*TruGreen`, "i"),
  424 |       );
  425 |     });
  426 | 
  427 |     test("all rendered images expose alt text", async ({ page }) => {
  428 |       await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  429 |       await page.waitForTimeout(2000);
  430 | 
  431 |       const missingAlt = await page.evaluate(() =>
  432 |         Array.from(document.querySelectorAll("img"))
  433 |           .filter((img) => {
  434 |             const rect = img.getBoundingClientRect();
  435 |             const rendered = rect.width > 1 && rect.height > 1;
  436 |             const decorative = img.getAttribute("aria-hidden") === "true";
  437 |             return rendered && !decorative && !img.getAttribute("alt");
  438 |           })
  439 |           .map((img) => img.currentSrc || img.src)
  440 |           .slice(0, 10),
  441 |       );
  442 | 
  443 |       expect(
  444 |         missingAlt,
  445 |         `images missing alt: ${missingAlt.join(", ")}`,
  446 |       ).toEqual([]);
  447 |     });
  448 | 
  449 |     test("page loads without console errors or failed requests", async ({
  450 |       page,
  451 |     }) => {
  452 |       const consoleErrors: string[] = [];
  453 |       const failedRequests: string[] = [];
  454 | 
  455 |       page.on("console", (msg) => {
  456 |         if (msg.type() === "error") consoleErrors.push(msg.text());
  457 |       });
  458 |       page.on("response", (response) => {
  459 |         const url = response.url();
  460 |         if (
  461 |           response.status() >= 500 &&
  462 |           new URL(url).hostname.endsWith("trugreen.com")
  463 |         ) {
  464 |           failedRequests.push(`${response.status()} ${url}`);
  465 |         }
  466 |       });
  467 | 
  468 |       // QA self-navigates to the same URL on load, which aborts a concurrent goto.
  469 |       await gotoHome(page).catch(async (error) => {
  470 |         if (!/interrupted by another navigation/i.test(String(error)))
  471 |           throw error;
  472 |         await page.locator("main").first().waitFor({ state: "visible" });
  473 |       });
  474 |       await page.waitForLoadState("load");
  475 |       await page.waitForTimeout(5000);
  476 | 
> 477 |       expect(failedRequests, failedRequests.join("\n")).toEqual([]);
      |                                                         ^ Error: 503 https://api.trugreen.com/ecommerce/V1/cms/scriptblock
  478 | 
  479 |       // Third-party tags routinely log noise, and chunk fetches fail transiently on
  480 |       // slow connections; only fail on first-party script errors.
  481 |       const firstPartyErrors = consoleErrors.filter(
  482 |         (text) =>
  483 |           /trugreen\.com\/_next|Uncaught|Hydration/i.test(text) &&
  484 |           !/ChunkLoadError/i.test(text),
  485 |       );
  486 |       expect(firstPartyErrors, firstPartyErrors.join("\n")).toEqual([]);
  487 |     });
  488 |   },
  489 | );
  490 | 
```