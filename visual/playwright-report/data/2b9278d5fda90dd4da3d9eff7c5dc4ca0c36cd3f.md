# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual/visual-regression.spec.ts >> Visual Regression Tests @visual-regression >> should match screenshot for /
- Location: tests/visual/visual-regression.spec.ts:191:9

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  Expected an image 390px by 9777px, received 390px by 10011px. 342439 pixels (ratio 0.09 of all image pixels) are different.

Call log:
  - Expect "toHaveScreenshot" with timeout 5000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - Expected an image 390px by 9777px, received 390px by 10011px. 342439 pixels (ratio 0.09 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - Expected an image 390px by 9777px, received 390px by 10011px. 342439 pixels (ratio 0.09 of all image pixels) are different.

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
        - link "TruGreen Logo" [ref=e14]:
          - /url: /
          - img "TruGreen Logo" [ref=e15]
        - generic [ref=e17]:
          - link "location_icon" [ref=e18]:
            - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
            - img "location_icon" [ref=e19]
          - link [ref=e20]:
            - /url: tel:1-844-436-8427
            - img [ref=e21]
          - link "hamMenu_icon" [ref=e22]:
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
      - link "sign up" [ref=e42]:
        - /url: /buy-online
      - text: online.
    - generic [ref=e44]:
      - generic [ref=e45]:
        - heading "The clear choice for a great looking lawn." [level=2] [ref=e46]
        - paragraph [ref=e47]: If you want a lawn that looks truly exceptional, you choose the pros who know how to deliver it.
      - generic [ref=e51]:
        - generic [ref=e53]:
          - generic [ref=e56]:
            - generic [ref=e58]:
              - img "Two TruGreen lawn care specialists collaborating in front of a suburban home." [ref=e59]
              - generic [ref=e60]:
                - heading "The Pro’s Choice" [level=5] [ref=e61]
                - paragraph [ref=e62]: As the Official Lawn Care Treatment Provider of the PGA TOUR® we bring pro-level expertise to your home.
            - img "PGA Logo" [ref=e63]
          - generic [ref=e68]:
            - img "Close-up macro view of a perfectly manicured, dense green lawn." [ref=e69]
            - generic [ref=e70]:
              - heading "Guaranteed Results" [level=5] [ref=e71]
              - paragraph [ref=e72]: If you’re not satisfied, we’ll make it right. That’s our commitment — and it’s backed by the TruGreen Guarantee. ◆
          - generic [ref=e77]:
            - img "A smiling TruGreen technician stands proudly on a healthy, vibrant green lawn." [ref=e78]
            - generic [ref=e79]:
              - heading "#1 in America" [level=5] [ref=e80]
              - paragraph [ref=e81]: Millions of Americans choose our locally tailored recipes for healthier, greener, better-looking lawns.
          - generic [ref=e84]:
            - generic [ref=e86]:
              - img "Two TruGreen lawn care specialists collaborating in front of a suburban home." [ref=e87]
              - generic [ref=e88]:
                - heading "The Pro’s Choice" [level=5] [ref=e89]
                - paragraph [ref=e90]: As the Official Lawn Care Treatment Provider of the PGA TOUR® we bring pro-level expertise to your home.
            - img "PGA Logo" [ref=e91]
          - generic [ref=e96]:
            - img "Close-up macro view of a perfectly manicured, dense green lawn." [ref=e97]
            - generic [ref=e98]:
              - heading "Guaranteed Results" [level=5] [ref=e99]
              - paragraph [ref=e100]: If you’re not satisfied, we’ll make it right. That’s our commitment — and it’s backed by the TruGreen Guarantee. ◆
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
        - generic [ref=e120]:
          - button "Backwards Navigation Arrow" [ref=e121]:
            - generic "Backwards Navigation Arrow"
          - button "Forward Navigation Arrow" [ref=e122]:
            - generic "Forward Navigation Arrow"
        - generic [ref=e123]:
          - button "Active Selection Indicator" [ref=e124] [cursor=pointer]
          - button "Inactive Selection Indicator" [ref=e126] [cursor=pointer]
          - button "Inactive Selection Indicator" [ref=e128] [cursor=pointer]
    - generic [ref=e132]:
      - heading "Golf course quality lawn starts with just a few clicks." [level=2] [ref=e134]
      - generic [ref=e135]:
        - button "Get Started" [ref=e136] [cursor=pointer]
        - button "Talk To a Pro" [ref=e137] [cursor=pointer]
    - generic [ref=e139]:
      - generic [ref=e140]:
        - heading "The difference local pros make." [level=2] [ref=e141]
        - paragraph [ref=e142]: Explore the differences and see why more homeowners are choosing TruGreen.
      - generic [ref=e143]:
        - generic [ref=e144]:
          - heading "TruGreen" [level=3] [ref=e145]:
            - img "TruGreen" [ref=e146]
          - generic [ref=e147]:
            - generic [ref=e148]:
              - term [ref=e149]: Custom for your lawn
              - definition [ref=e150]: A tailored plan designed for your region, your climate, and the results you want.
            - generic [ref=e151]:
              - term [ref=e152]: We do the work
              - definition [ref=e153]: Our trained specialists apply treatments with precision and adjust throughout the season to keep your lawn on track.
            - generic [ref=e154]:
              - term [ref=e155]: Pro-level results
              - definition [ref=e156]: A lawn that looks greener, feels thicker, and grows stronger — backed by the TruGreen Guarantee. ◆
        - generic [ref=e157]:
          - heading "DIY" [level=3] [ref=e158]
          - generic [ref=e159]:
            - generic [ref=e160]:
              - term [ref=e161]: One-size-fits-all
              - definition [ref=e162]: Store-bought products can’t account for local soil variations, seasonal timing, or your lawn’s specific challenges.
            - generic [ref=e163]:
              - term [ref=e164]: Your weekend, gone
              - definition [ref=e165]: Planning, hauling, spreading, spraying — every step takes time you’d rather spend elsewhere.
            - generic [ref=e166]:
              - term [ref=e167]: You’re on your own
              - definition [ref=e168]: If something goes wrong, there’s no expert to call and no safety net to get your lawn back on track.
        - generic [ref=e169]:
          - heading "Other Guys" [level=3] [ref=e170]
          - generic [ref=e171]:
            - generic [ref=e172]:
              - term [ref=e173]: Limited resources
              - definition [ref=e174]: Without nationwide insights or shared learnings, it becomes harder to adapt as pests, weather, and seasonal issues change.
            - generic [ref=e175]:
              - term [ref=e176]: Variable quality
              - definition [ref=e177]: Without a national training program or on-staff agronomists, the results can be unpredictable.
            - generic [ref=e178]:
              - term [ref=e179]: Limited accountability
              - definition [ref=e180]: Guarantees and fixes often depend on goodwill rather than a structured, nationwide commitment.
    - generic [ref=e183]:
      - heading "What homeowners are saying." [level=2] [ref=e186]
      - generic [ref=e189]:
        - generic [ref=e191]:
          - generic [ref=e195]:
            - generic [ref=e196]:
              - link "Google" [ref=e197]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@36.0578283,-79.9419767,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x8b6d6053f8023ed9!8m2!3d36.0578283!4d-79.9419767
                - img "Google" [ref=e198]
              - generic [ref=e199]:
                - heading "Vann B." [level=5] [ref=e200]
                - generic [ref=e201]:
                  - img "star" [ref=e202]
                  - img "star" [ref=e203]
                  - img "star" [ref=e204]
                  - img "star" [ref=e205]
                  - img "star" [ref=e206]
            - paragraph [ref=e207]: “Hands down the best in the business. Everyone is always telling me how good my yard looks.”
          - generic [ref=e211]:
            - generic [ref=e212]:
              - link "Google" [ref=e213]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@28.5861219,-81.4257494,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x9d36522fcc56e91e!8m2!3d28.5861219!4d-81.4257494
                - img "Google" [ref=e214]
              - generic [ref=e215]:
                - heading "Kaye C." [level=5] [ref=e216]
                - generic [ref=e217]:
                  - img "star" [ref=e218]
                  - img "star" [ref=e219]
                  - img "star" [ref=e220]
                  - img "star" [ref=e221]
                  - img "star" [ref=e222]
            - paragraph [ref=e223]: “My yard has never been healthier, lush and more beautiful since I hired TruGreen to service my lawn and garden! I have the prettiest exterior property in my neighborhood!”
          - generic [ref=e227]:
            - generic [ref=e228]:
              - link "Google" [ref=e229]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@31.8789019,-106.574386,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x1abb58088fbbf1b2!8m2!3d31.8789019!4d-106.574386
                - img "Google" [ref=e230]
              - generic [ref=e231]:
                - heading "William B." [level=5] [ref=e232]
                - generic [ref=e233]:
                  - img "star" [ref=e234]
                  - img "star" [ref=e235]
                  - img "star" [ref=e236]
                  - img "star" [ref=e237]
                  - img "star" [ref=e238]
            - paragraph [ref=e239]: “Great service. Great weed control. Very pleased with their service. Been using for 3 years now and very pleased”
          - generic [ref=e243]:
            - generic [ref=e244]:
              - link "Google" [ref=e245]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@38.9871646,-77.4444546,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xea7b1ea5320543d8!8m2!3d38.9871646!4d-77.4444546
                - img "Google" [ref=e246]
              - generic [ref=e247]:
                - heading "patricia S." [level=5] [ref=e248]
                - generic [ref=e249]:
                  - img "star" [ref=e250]
                  - img "star" [ref=e251]
                  - img "star" [ref=e252]
                  - img "star" [ref=e253]
                  - img "star" [ref=e254]
            - paragraph [ref=e255]: “Excellent service today!”
          - generic [ref=e259]:
            - generic [ref=e260]:
              - link "Google" [ref=e261]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@28.4595664,-82.4779008,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x583e06a16f3fb938!8m2!3d28.4595664!4d-82.4779008
                - img "Google" [ref=e262]
              - generic [ref=e263]:
                - heading "Manny L." [level=5] [ref=e264]
                - generic [ref=e265]:
                  - img "star" [ref=e266]
                  - img "star" [ref=e267]
                  - img "star" [ref=e268]
                  - img "star" [ref=e269]
                  - img "star" [ref=e270]
            - paragraph [ref=e271]: “TruGreen has been doing an outstanding job! Our lawn, shrubs, and trees have never looked better. The team is professional, knowledgeable, and always attentive to detail. We’ve seen a huge improvement in the overall health and appearance of our landscape. High...”
            - button "More..." [ref=e272] [cursor=pointer]
          - generic [ref=e276]:
            - generic [ref=e277]:
              - link "Google" [ref=e278]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@41.6635391,-81.3745714,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x406dd7e0b8b7c2c5!8m2!3d41.6635391!4d-81.3745714
                - img "Google" [ref=e279]
              - generic [ref=e280]:
                - heading "Katherine H." [level=5] [ref=e281]
                - generic [ref=e282]:
                  - img "star" [ref=e283]
                  - img "star" [ref=e284]
                  - img "star" [ref=e285]
                  - img "star" [ref=e286]
                  - img "star" [ref=e287]
            - paragraph [ref=e288]: “Thank You True Green. My yard hasn’t looked this Good in Years ! So Pretty ♥️”
          - generic [ref=e292]:
            - generic [ref=e293]:
              - link "Google" [ref=e294]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@29.2175962,-81.0709891,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x15b373965eecca3b!8m2!3d29.2175962!4d-81.0709891
                - img "Google" [ref=e295]
              - generic [ref=e296]:
                - heading "Bob F." [level=5] [ref=e297]
                - generic [ref=e298]:
                  - img "star" [ref=e299]
                  - img "star" [ref=e300]
                  - img "star" [ref=e301]
                  - img "star" [ref=e302]
                  - img "star" [ref=e303]
            - paragraph [ref=e304]: “I recently switched to TruGreen and I’m sure glad that I did. My old service just went through the motions, but TruGreen produced results. My lawn is weed free and looks as good as it can for February and our recent cold weather.”
          - generic [ref=e308]:
            - generic [ref=e309]:
              - link "Google" [ref=e310]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@27.4247983,-82.5339639,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xbac7ae41f00eadc3!8m2!3d27.4247983!4d-82.5339639
                - img "Google" [ref=e311]
              - generic [ref=e312]:
                - heading "Ron O." [level=5] [ref=e313]
                - generic [ref=e314]:
                  - img "star" [ref=e315]
                  - img "star" [ref=e316]
                  - img "star" [ref=e317]
                  - img "star" [ref=e318]
                  - img "star" [ref=e319]
            - paragraph [ref=e320]: “TruGreen has been taking care of my lawn and shrub/tree maintenance services over 10 years. Excellent work with trained personnel.”
          - generic [ref=e324]:
            - generic [ref=e325]:
              - link "Google" [ref=e326]:
                - /url: https://www.google.com/maps/place/TruGreen+Lawn+Care/@30.4206946,-86.6708452,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x9016e012c3ea4c8d!8m2!3d30.4206946!4d-86.6708452
                - img "Google" [ref=e327]
              - generic [ref=e328]:
                - heading "Tammi P." [level=5] [ref=e329]
                - generic [ref=e330]:
                  - img "star" [ref=e331]
                  - img "star" [ref=e332]
                  - img "star" [ref=e333]
                  - img "star" [ref=e334]
                  - img "star" [ref=e335]
            - paragraph [ref=e336]: “From my initial conversation with TruGreen their service is unmatched! It’s so nice dealing with a company who truly cares and understands how important quality customer service is. How Refreshing!!”
        - generic [ref=e337]:
          - button "Backwards Navigation Arrow" [ref=e338]
          - button "Forward Navigation Arrow" [ref=e339] [cursor=pointer]
        - generic [ref=e340]:
          - button "Active Selection Indicator" [ref=e341] [cursor=pointer]
          - button "Inactive Selection Indicator" [ref=e343] [cursor=pointer]
          - button "Inactive Selection Indicator" [ref=e345] [cursor=pointer]
          - button "Inactive Selection Indicator" [ref=e347] [cursor=pointer]
          - button "Inactive Selection Indicator" [ref=e349] [cursor=pointer]
          - button "Inactive Selection Indicator" [ref=e351] [cursor=pointer]
          - button "Inactive Selection Indicator" [ref=e353] [cursor=pointer]
          - button "Inactive Selection Indicator" [ref=e355] [cursor=pointer]
          - button "Inactive Selection Indicator" [ref=e357] [cursor=pointer]
    - generic [ref=e360]:
      - generic [ref=e361]:
        - heading "National strength meets local know-how." [level=2] [ref=e363]
        - generic [ref=e364]:
          - paragraph [ref=e365]: Coast to coast, TruGreen® teams deliver a trusted standard. Every visit is tailored and local. Every plan is backed by the strength of a national network. Find your local pros below.
          - link "Get Started" [ref=e366] [cursor=pointer]:
            - /url: "#"
      - generic [ref=e367]:
        - generic [ref=e368]:
          - spinbutton [ref=e369]
          - img "searchicon" [ref=e370] [cursor=pointer]
        - generic [ref=e372]:
          - generic:
            - button "Keyboard shortcuts"
          - region "Map" [ref=e373]
          - generic [ref=e374]:
            - generic [ref=e375]:
              - generic:
                - generic:
                  - generic [ref=e398]: "15"
                  - generic [ref=e403]: "27"
                  - generic [ref=e408]: "5"
                  - generic [ref=e413]: "11"
                  - generic [ref=e418]: "18"
                  - generic [ref=e423]: "4"
                  - generic [ref=e428]: "6"
                  - generic [ref=e433]: "10"
                  - generic [ref=e438]: "12"
                  - generic [ref=e443]: "6"
                  - generic [ref=e448]: "7"
                  - generic [ref=e453]: "2"
                  - generic [ref=e458]: "3"
                  - generic [ref=e463]: "4"
                  - generic [ref=e468]: "2"
                  - generic [ref=e473]: "11"
                  - generic [ref=e478]: "4"
                  - generic [ref=e483]: "14"
                  - generic [ref=e488]: "6"
                  - generic [ref=e493]: "4"
                  - generic [ref=e498]: "7"
                  - generic [ref=e503]: "4"
                  - generic [ref=e508]: "4"
                  - generic [ref=e513]: "2"
                  - generic [ref=e518]: "3"
                  - generic [ref=e523]: "2"
                  - generic [ref=e528]: "2"
                  - generic [ref=e533]: "3"
                  - generic [ref=e538]: "2"
                  - generic [ref=e543]: "4"
                  - generic [ref=e548]: "8"
                  - generic [ref=e553]: "5"
                  - generic [ref=e558]: "2"
                  - generic [ref=e563]: "4"
                  - generic [ref=e568]: "2"
                  - generic [ref=e573]: "2"
                  - generic [ref=e578]: "3"
                  - generic [ref=e583]: "4"
                  - generic [ref=e588]: "2"
              - generic [ref=e595]:
                - generic:
                  - generic:
                    - generic:
                      - button "branchIcon" [ref=e597] [cursor=pointer]:
                        - img "branchIcon" [ref=e598]
                      - button "branchIcon" [ref=e599] [cursor=pointer]:
                        - img "branchIcon" [ref=e600]
                      - button "branchIcon" [ref=e601] [cursor=pointer]:
                        - img "branchIcon" [ref=e602]
                      - button "branchIcon" [ref=e603] [cursor=pointer]:
                        - img "branchIcon" [ref=e604]
                      - button "branchIcon" [ref=e605] [cursor=pointer]:
                        - img "branchIcon" [ref=e606]
                      - button "branchIcon" [ref=e607] [cursor=pointer]:
                        - img "branchIcon" [ref=e608]
                      - button "branchIcon" [ref=e609] [cursor=pointer]:
                        - img "branchIcon" [ref=e610]
                      - button "branchIcon" [ref=e611] [cursor=pointer]:
                        - img "branchIcon" [ref=e612]
                      - button "branchIcon" [ref=e613] [cursor=pointer]:
                        - img "branchIcon" [ref=e614]
                      - button "branchIcon" [ref=e615] [cursor=pointer]:
                        - img "branchIcon" [ref=e616]
                      - button "branchIcon" [ref=e617] [cursor=pointer]:
                        - img "branchIcon" [ref=e618]
                      - button "branchIcon" [ref=e619] [cursor=pointer]:
                        - img "branchIcon" [ref=e620]
                      - button "branchIcon" [ref=e621] [cursor=pointer]:
                        - img "branchIcon" [ref=e622]
                      - button "branchIcon" [ref=e623] [cursor=pointer]:
                        - img "branchIcon" [ref=e624]
                      - button "branchIcon" [ref=e625] [cursor=pointer]:
                        - img "branchIcon" [ref=e626]
                      - button "branchIcon" [ref=e627] [cursor=pointer]:
                        - img "branchIcon" [ref=e628]
                      - button "branchIcon" [ref=e629] [cursor=pointer]:
                        - img "branchIcon" [ref=e630]
                      - button "branchIcon" [ref=e631] [cursor=pointer]:
                        - img "branchIcon" [ref=e632]
                    - button "15" [ref=e633] [cursor=pointer]
                    - button "27" [ref=e634] [cursor=pointer]
                    - button "5" [ref=e635] [cursor=pointer]
                    - button "11" [ref=e636] [cursor=pointer]
                    - button "18" [ref=e637] [cursor=pointer]
                    - button "4" [ref=e638] [cursor=pointer]
                    - button "6" [ref=e639] [cursor=pointer]
                    - button "10" [ref=e640] [cursor=pointer]
                    - button "12" [ref=e641] [cursor=pointer]
                    - button "6" [ref=e642] [cursor=pointer]
                    - button "7" [ref=e643] [cursor=pointer]
                    - button "2" [ref=e644] [cursor=pointer]
                    - button "3" [ref=e645] [cursor=pointer]
                    - button "4" [ref=e646] [cursor=pointer]
                    - button "2" [ref=e647] [cursor=pointer]
                    - button "11" [ref=e648] [cursor=pointer]
                    - button "4" [ref=e649] [cursor=pointer]
                    - button "14" [ref=e650] [cursor=pointer]
                    - button "6" [ref=e651] [cursor=pointer]
                    - button "4" [ref=e652] [cursor=pointer]
                    - button "7" [ref=e653] [cursor=pointer]
                    - button "4" [ref=e654] [cursor=pointer]
                    - button "4" [ref=e655] [cursor=pointer]
                    - button "2" [ref=e656] [cursor=pointer]
                    - button "3" [ref=e657] [cursor=pointer]
                    - button "2" [ref=e658] [cursor=pointer]
                    - button "2" [ref=e659] [cursor=pointer]
                    - button "3" [ref=e660] [cursor=pointer]
                    - button "2" [ref=e661] [cursor=pointer]
                    - button "4" [ref=e662] [cursor=pointer]
                    - button "8" [ref=e663] [cursor=pointer]
                    - button "5" [ref=e664] [cursor=pointer]
                    - button "2" [ref=e665] [cursor=pointer]
                    - button "4" [ref=e666] [cursor=pointer]
                    - button "2" [ref=e667] [cursor=pointer]
                    - button "2" [ref=e668] [cursor=pointer]
                    - button "3" [ref=e669] [cursor=pointer]
                    - button "4" [ref=e670] [cursor=pointer]
                    - button "2" [ref=e671] [cursor=pointer]
            - iframe [ref=e672]:
              
            - button "Map camera controls" [ref=e674] [cursor=pointer]
            - link "Open this area in Google Maps (opens a new window)" [ref=e676]:
              - /url: https://maps.google.com/maps?ll=36.966428,-95.844032&z=4&t=m&hl=en-US&gl=US&mapclient=apiv3
              - img "Google" [ref=e678]
            - generic [ref=e679]:
              - button "Keyboard shortcuts" [ref=e685] [cursor=pointer]
              - generic [ref=e690]: Map data ©2026 Google, INEGI
              - link "Terms (opens in new tab)" [ref=e695] [cursor=pointer]:
                - /url: https://www.google.com/intl/en-US_US/help/terms_maps.html
                - text: Terms
    - generic [ref=e697]:
      - heading "Let's talk lawn." [level=2] [ref=e699]
      - generic [ref=e701]:
        - generic [ref=e705]:
          - img "A friendly TruGreen customer service expert wearing a headset and smiling, ready to assist." [ref=e706]
          - generic [ref=e707]:
            - heading "We’ve got you covered." [level=3] [ref=e708]
            - list [ref=e709]:
              - listitem [ref=e710]:
                - generic [ref=e711]: Update your service schedule
              - listitem [ref=e712]:
                - generic [ref=e713]: Ask about treatments in your area
              - listitem [ref=e714]:
                - generic [ref=e715]: Make a payment
              - listitem [ref=e716]:
                - generic [ref=e717]: Add or change service
              - listitem [ref=e718]:
                - generic [ref=e719]: Login assistance
            - paragraph [ref=e720]: Our Virtual Assistant can handle most things and is available 24/7, or you can sign in to manage your account.
            - generic [ref=e721]:
              - link "Chat Now" [ref=e722] [cursor=pointer]:
                - /url: "#"
              - link "Log In" [ref=e723] [cursor=pointer]:
                - /url: /my-account/login
        - generic [ref=e726]:
          - generic [ref=e728]:
            - heading "Give us a call." [level=4] [ref=e730]
            - paragraph [ref=e731]: Drop us a line and let's connect.
            - paragraph [ref=e732]:
              - generic [ref=e733]:
                - text: "Mon – Fri: 7:30 AM – 10:00 PM ET"
                - text: "Sat: 8:30 AM – 8:00 PM ET"
                - text: "Sun: Closed"
            - link "1-844-436-8427" [ref=e734] [cursor=pointer]:
              - /url: tel:+18444115473
            - heading "Send us a text." [level=4] [ref=e736]
            - link "MYLAWN (695296)" [ref=e737] [cursor=pointer]:
              - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
          - generic [ref=e739]:
            - heading "Email us." [level=4] [ref=e740]
            - paragraph [ref=e741]: Send us your suggestions, questions, and feedback. We’ll get back to you in 1-2 business days.
            - link "Email us" [ref=e742] [cursor=pointer]:
              - /url: "#"
  - contentinfo [ref=e744]:
    - generic [ref=e745]:
      - generic [ref=e746]:
        - generic [ref=e748]:
          - heading "About US" [level=5] [ref=e749]
          - list:
            - listitem [ref=e750]:
              - link "About TruGreen" [ref=e751]:
                - /url: /newsroom/executive-staff#about
            - listitem [ref=e752]:
              - link "Executive Staff" [ref=e753]:
                - /url: /newsroom/executive-staff
            - listitem [ref=e754]:
              - link "Newsroom" [ref=e755]:
                - /url: /newsroom
            - listitem [ref=e756]:
              - link "Careers" [ref=e757]:
                - /url: https://www.trugreenjobs.com
        - generic [ref=e759]:
          - heading "Our Services" [level=5] [ref=e760]
          - list:
            - listitem [ref=e761]:
              - link "Lawn Care Plan Comparison" [ref=e762]:
                - /url: /products-and-services
            - listitem [ref=e763]:
              - link "Tree & Shrub Plan Overview" [ref=e764]:
                - /url: /products-and-services/trushrub-tree-and-shrub-care
            - listitem [ref=e765]:
              - link "Pest Control Plan Comparison" [ref=e766]:
                - /url: /pests-products-and-services
            - listitem [ref=e767]:
              - link "Branch Finder" [ref=e768]:
                - /url: /local-lawn-care
        - generic [ref=e770]:
          - heading "Resources" [level=5] [ref=e771]
          - list:
            - listitem [ref=e772]:
              - link "FAQs" [ref=e773]:
                - /url: /lawn-care-101/faqs
            - listitem [ref=e774]:
              - link "Military Discount" [ref=e775]:
                - /url: /military-discount
            - listitem [ref=e776]:
              - link "Learning Center" [ref=e777]:
                - /url: /lawn-care-101/learning-center
            - listitem [ref=e778]:
              - link "Blogs" [ref=e779]:
                - /url: /lawn-care-101/blog
            - listitem [ref=e780]:
              - link "Service Terms and Conditions" [ref=e781]:
                - /url: /service-terms-and-conditions
        - generic [ref=e784]:
          - heading "For new service" [level=5] [ref=e785]
          - list:
            - listitem [ref=e786]:
              - link "1-844-436-8427" [ref=e787]:
                - /url: tel:1-844-436-8427
            - listitem [ref=e788]:
              - link "Get a Call Back" [ref=e789]:
                - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        - generic [ref=e792]:
          - heading "For our Customer" [level=5] [ref=e793]
          - list:
            - listitem [ref=e794]:
              - link "Account Login & Register" [ref=e795]:
                - /url: /my-account/login
            - listitem [ref=e796]:
              - generic [ref=e797]: "Call:"
              - link "1-844-436-8427" [ref=e798]:
                - /url: tel:1-844-436-8427
            - listitem [ref=e799]:
              - 'link "Text: MYLAWN (695296)" [ref=e800]':
                - /url: sms:18887813135;?&body=Hello!%20I%20need%20some%20assistance%20with%20my%20TruGreen%20account.
            - listitem [ref=e801]:
              - link "Customer Support" [ref=e802]:
                - /url: /customer-support
            - listitem [ref=e803]:
              - link "Pay My Bill" [ref=e804]:
                - /url: /pay-your-bill
      - generic [ref=e807]:
        - paragraph [ref=e808]: "**Available to residential customers for Lawn, TruDefense Mosquito,TruBarrier Perimeter Pest, Flea, Tick & Outdoor Nuisance Pest Control and/or TruShrub Tree & Shrub services only. Requires purchase of annual plan using PrePay or EasyPay. Guarantee based on a matching quote from a Qualified Provider. Parameters include matching service address, number of applications, application price, services to be performed and areas to be treated. Not valid on quotes older than 120 days or one-day sales/seasonal promotions. TruGreen reserves the right to verify. For first year of service only. Limited time offer. Not to be combined with or used in conjunction with any other offer or discount. Valid at participating TruGreen locations. Additional restrictions may apply. Consumer responsible for all sales tax."
        - paragraph [ref=e809]: ¹ Special price of 50% off is for first Lawn application★, Tree & Shrub application✢, and/or Mosquito application★★ only. All other restrictions apply.
        - paragraph [ref=e810]: ◆ TruGreen will gladly visit your property as needed between scheduled visits to ensure your satisfaction. Guarantee applies to full program customers only. Excludes TruBasic and partial programs. Additional restrictions may apply.
        - paragraph [ref=e811]: ✦ Purchase of full lawn plan required for Healthy Lawn Analysis, which is performed at the first visit.
        - paragraph [ref=e812]: ★ Requires purchase of annual plan. Special price is for first application only. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount.
        - paragraph [ref=e813]: ✢ Requires purchase of annual plan. Special price is for first Tree & Shrub application only, for new residential EasyPay or PrePay customers only. TruGreen® Tree & Shrub includes fertilization of common trees and shrubs, and controls common foliar insects and diseases. It does not include treatment of specialty trees such as fruit or certain ornamentals, or assessment and treatment of trees over 25 ft. in height. For more details, go to TruGreen FAQs at TruGreen.com/FAQTREE. Not to be combined with or used in conjunction with any other offer or discount for the same service. Consumer responsible for all sales tax.
        - paragraph [ref=e814]: ★★ Requires purchase of full mosquito plan. Special price is for first mosquito application only, for new EasyPay or PrePay residential customers only. Valid at participating TruGreen locations. Valid at participating TruGreen locations. Availability of services may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax. ✧ Guarantee applies to full plan customers only.
        - paragraph [ref=e815]: ◆◆ Service does not include removal of webs higher than 10 ft. and application does not protect against termites and other wood-destroying organisms, bedbugs, bees, fleas, German cockroaches, hornets, pharaoh ants, rodents, or ticks. Valid at participating TruGreen locations. Not to be combined with or used in conjunction with any other oﬀer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
        - paragraph [ref=e816]:
          - text: "America’s #1 lawn care company based on U.S. market share of professional lawn care companies. 2023 MMR Brand Health Tracker."
          - link "PGATOUR.COM" [ref=e817]:
            - /url: https://pgatour.com/
          - text: ", PGA TOUR, TPC, SHOTLINK and the SWINGING GOLFER LOGO are trademarks of PGA TOUR, Inc. BBB accredited since 7/01/2012."
        - paragraph [ref=e818]:
          - superscript [ref=e819]: "5"
          - text: Special price is for first two regular lawn services only. Use code SUMMER. Special pricing is given in consideration of your commitment to receive and pay for all treatments under your annual plan. If you cancel before your plan renews, the discounted visits may be charged at full price. Requires purchase of annual Lawn plan, for new residential EasyPay or PrePay customers only. Offer unavailable for lawns larger than 20,000 square feet. Not valid on TruBasic or partial programs. Available 5/22/2026-6/23/2026. One time discount only. Valid at participating TruGreen locations. Availability of services and/or products may vary by geography. Not to be combined with or used in conjunction with any other offer or discount. Additional restrictions may apply. Consumer responsible for all sales tax.
      - generic [ref=e820]:
        - generic [ref=e822]:
          - generic [ref=e823]:
            - link "Facebook Icon" [ref=e824]:
              - /url: https://www.facebook.com/trugreen
              - img "Facebook Icon" [ref=e825]
            - link "X.com Icon" [ref=e826]:
              - /url: https://x.com/trugreen
              - img "X.com Icon" [ref=e827]
            - link "Instagram Icon" [ref=e828]:
              - /url: https://www.instagram.com/trugreen/
              - img "Instagram Icon" [ref=e829]
            - link "Youtube Icon" [ref=e830]:
              - /url: https://www.youtube.com/trugreen
              - img "Youtube Icon" [ref=e831]
            - link "TikTok Icon" [ref=e832]:
              - /url: https://www.tiktok.com/@trugreen_lawn?lang=en
              - img "TikTok Icon" [ref=e833]
            - link "Yelp Icon" [ref=e834]:
              - /url: https://www.yelp.com/
              - img "Yelp Icon" [ref=e835]
          - generic [ref=e836]:
            - 'link "BBB: Better Business Bureau, Accredited Business Badge" [ref=e837]':
              - /url: https://www.bbb.org/us/tn/memphis/profile/lawn-maintenance/trugreen-0543-1000545#bbbseal
              - 'img "BBB: Better Business Bureau, Accredited Business Badge" [ref=e838]'
            - 'link "NALP: National Association of Landscape Professionals Logo" [ref=e839]':
              - /url: "#"
              - 'img "NALP: National Association of Landscape Professionals Logo" [ref=e840]'
            - 'link "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e841]':
              - /url: https://www.trugreen.com/pga-tour
              - 'img "TGxPGA: TruGreen Partnership with PGA Tour Logo" [ref=e842]'
            - 'link "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e843]':
              - /url: "#"
              - 'img "#1 in America: America''s #1 Lawn Care Company Badge" [ref=e844]'
        - separator [ref=e845]
      - generic [ref=e848]:
        - paragraph [ref=e850]:
          - img "TruGreen Leaf Logo" [ref=e851]
          - text: © 2026 TruGreen Limited Partnership. All rights reserved.
        - list [ref=e853]:
          - listitem [ref=e854]:
            - link "SMS Terms and Conditions" [ref=e855]:
              - /url: /about/sms-terms
          - listitem [ref=e856]:
            - link "Terms and Conditions" [ref=e857]:
              - /url: /about/terms
          - listitem [ref=e858]:
            - link "Privacy Policy" [ref=e859]:
              - /url: /about/privacy-policy
          - listitem [ref=e860]:
            - link "California Privacy Notice" [ref=e861]:
              - /url: /about/california-privacy-policy
          - listitem [ref=e862]:
            - link "Your Privacy Choices privacyoptions" [ref=e863]:
              - /url: /about/privacy-policy#additionalStatePrivacyRights
              - text: Your Privacy Choices
              - img "privacyoptions" [ref=e864]
  - generic [ref=e865]:
    - paragraph [ref=e866]: Questions? Quote, Call or Chat Now.
    - link "1-844-436-8427" [ref=e867]:
      - /url: tel:+18444115473
  - img
  - generic: Cookie Settings
```

# Test source

```ts
  104 |       }
  105 |     : {};
  106 | }
  107 | 
  108 | async function waitForPageContent(page: any, path: string) {
  109 |   if (path !== "/") {
  110 |     return;
  111 |   }
  112 | 
  113 |   await page
  114 |     .waitForFunction(
  115 |       () => {
  116 |         const main = document.querySelector("main");
  117 |         const hasMainContent = Boolean(main && main.textContent?.trim());
  118 |         const pageIsTallerThanViewport =
  119 |           document.documentElement.scrollHeight > window.innerHeight + 200;
  120 | 
  121 |         return hasMainContent || pageIsTallerThanViewport;
  122 |       },
  123 |       { timeout: 10000 },
  124 |     )
  125 |     .catch(() => {});
  126 | 
  127 |   await page
  128 |     .evaluate(
  129 |       () =>
  130 |         new Promise((resolve) =>
  131 |           requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  132 |         ),
  133 |     )
  134 |     .catch(() => {});
  135 | }
  136 | 
  137 | function getElementScreenshotName(item: any) {
  138 |   return `${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
  139 | }
  140 | 
  141 | async function expectElementScreenshot(page: any, item: any) {
  142 |   for (const useCacheBust of [false, true]) {
  143 |     try {
  144 |       const element = await getHomePageElement(page, item, useCacheBust);
  145 | 
  146 |       await stabilizeElementForScreenshot(page, item);
  147 | 
  148 |       await expect(element).toHaveScreenshot(
  149 |         getElementScreenshotName(item),
  150 |         getElementScreenshotOptions(item),
  151 |       );
  152 |       return;
  153 |     } catch (error) {
  154 |       if (useCacheBust) {
  155 |         throw error;
  156 |       }
  157 | 
  158 |       await page.context().clearCookies();
  159 |       await page
  160 |         .evaluate(() => {
  161 |           window.localStorage.clear();
  162 |           window.sessionStorage.clear();
  163 |         })
  164 |         .catch(() => {});
  165 |     }
  166 |   }
  167 | }
  168 | 
  169 | async function removeElementIfExists(
  170 |   page: any,
  171 |   selector: string,
  172 |   name: string,
  173 | ) {
  174 |   const element = page.locator(selector);
  175 |   if ((await element.count()) > 0) {
  176 |     console.log(`Removing ${name} element...`);
  177 |     await element.evaluate((node: any) => node.remove());
  178 |   }
  179 | }
  180 | 
  181 | test.describe("Visual Regression Tests @visual-regression", () => {
  182 |   for (const item of elementScreenshotItems) {
  183 |     test(`should match screenshot for removed selector ${item.name}`, async ({
  184 |       page,
  185 |     }) => {
  186 |       await expectElementScreenshot(page, item);
  187 |     });
  188 |   }
  189 | 
  190 |   for (const path of paths) {
  191 |     test(`should match screenshot for ${path}`, async ({ page }) => {
  192 |       const url = getBaseUrl(path);
  193 |       await page.goto(url);
  194 | 
  195 |       await waitForPageContent(page, path);
  196 | 
  197 |       await emulateLazyLoadScroll(page);
  198 |       await page.waitForTimeout(5000);
  199 | 
  200 |       for (const item of selectorsToRemove) {
  201 |         await removeElementIfExists(page, item.selector, item.name);
  202 |       }
  203 | 
> 204 |       await expect(page).toHaveScreenshot({
      |                          ^ Error: expect(page).toHaveScreenshot(expected) failed
  205 |         fullPage: true,
  206 |         mask: selectorsToMask.map((item) => page.locator(item.selector)),
  207 |         maxDiffPixelRatio: 0.03,
  208 |       });
  209 |     });
  210 |   }
  211 | });
  212 | 
```