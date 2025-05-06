document.addEventListener("DOMContentLoaded", function () {
    // Enhanced product data with all attributes needed for the product page
    const products = [
      {
        id: 1,
        name: "UA Harper 9 Pro ST",
        model: "UA Harper",
        brand: "UnderArmour",
        price: 95,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3027445-001_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688",
        gender: ["Men"],
        sport: ["Baseball"],
        color: "black",
        colors: ["black", "white", "blue", "purple","grey","pink"],
        sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        rating: 4.5,
        trending: true,
        new: false,
        videosets: {
          "black": [
            "videos/vid1 (1).mp4"
          ],
          "white": [
            "videos/vid1 (2).mp4"
          ],
          "blue": [
            "videos/vid1 (3).mp4"
          ],
          "purple": [
            "videos/vid1 (4).mp4"
          ],
          "grey": [
            "videos/vid1 (5).mp4"
          ],
          "pink": [
            "videos/vid1 (6).mp4"
          ]
          
        },
        details: [
          "UA IntelliKnit upper is breathable & provides premium stretch & compression where you need it",
          "Engineered fit for increased comfort & reduced flex pressure with bootie design for locked-in support",
          "Synthetic leather in the forefoot for added durability",
          "Lightweight, hybrid cleat plate with front UA Microtips metal spikes for speed & ultimate traction",
          "Molded TPU back cleats for all-game comfort"
        ]
      },
      {
        id: 2,
        name: "UA Leadoff Mid 3.0",
        model: "UA Leadoff",
        brand: "UnderArmour",
        price: 45,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3027446-600_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688",
        gender: ["Men"],
        sport: ["Baseball"],
        color: "Red",
        colors: ["red", "blue", "black"],
        sizes: [38, 39, 40, 41, 42, 43, 44],
        rating: 4.7,
        trending: true,
        new: true,
        videosets: {
          "blue": [
            "videos/vid 2 (2).mp4"
          ],
          "black": [
            "videos/vid 2 (1).mp4"
          ],
          "red": [
            "videos/vid 2 (3).mp4"
          ]
        },
        details: [
          "Synthetic upper is lightweight & durable",
          "Padded collar & heel construction for ultimate step-in comfort",
          "Mid-top design for added ankle support",
          "Full-length EVA midsole cushioning that evenly distributes cleat pressure underfoot for added comfort",
          "Rubber molded cleats provide optimal traction & durability on all field surfaces"
        ]
      },
      {
        id: 3,
        name: "UA Harper 9 RM",
        model: "UA Harper",
        brand: "UnderArmour",
        price: 50,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3027442-103_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688",
        gender: ["Men"],
        sport: ["Baseball"],
        color: "blue",
        colors: ["blue","grey","red","white"],
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 4.6,
        trending: false,
        new: false,
        videosets: {
          "blue": [
            "videos/vid 3 (3).mp4"
          ],
          "grey": [
            "videos/vid 3 (1).mp4"
          ],
          "red": [
            "videos/vid 3 (5).mp4"
          ],
          "white": [
            "videos/vid 3 (2).mp4"
          ]
        },
        details: [
          "Synthetic upper is light, breathable & super-durable",
          "Full-length EVA midsole for underfoot cushioning & comfort",
          "New rubber molded outsole is more comfortable & provides traction & durability on all field surfaces"
        ]
      },
      {
        id: 4,
        name: "UA Drive Pro Spikeless",
        model: "UA Drive",
        brand: "UnderArmour",
        price: 150,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3026920-002_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688",
        gender: ["Men"],
        sport: ["Golf"],
        color: "Black",
        colors: ["black", "white"],
        sizes: [37, 38, 39, 40, 41, 42, 43],
        rating: 4.3,
        trending: true,
        new: false,
        videosets: {
          "black": [
            "videos/vid 4 (1).mp4"
          ],
          "white": [
            "videos/vid 4 (2).mp4"
          ]
        },
        details: [
          "UA Swing Support System (S3) provides smarter traction, dual-foam cushioning & lockdown lacing",
          "Swing Support Strap combines with reinforcement in the upper to provide biomechanically correct lock-in",
          "Energy-returning UA HOVR™ foam + supportive Charged Cushioning® guides natural motion of the foot in a golf swing",
          "Hybrid TPU + rubber outsole for ideal combination of penetrating traction & underfoot comfort",
          "Outsole has strategic flex grooves, directional traction & rubber up the side for added support at impact"
        ]
      },
      {
        id: 5,
        name: "UA Drive Fade Spikeless",
        model: "UA Drive",
        brand: "UnderArmour",
        price: 120,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3027085-001_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688",
        gender: ["Men"],
        sport: ["Golf"],
        color: "Black",
        colors: ["black", "grey"],
        sizes: [39, 40, 41, 42, 43, 44, 45],
        rating: 4.8,
        trending: false,
        new: true,
        videosets: {
          "black": [
            "videos/vid 5 (1).mp4"
          ],
          "grey": [
            "videos/vid 5 (2).mp4"
          ]
        },
        details: [
          "Breathable, supportive engineered microfiber upper & full waterproof membrane with 1-year warranty",
          "Molded sockliner for enhanced fit & comfort",
          "UA HOVR™ cushioning in the heel helps eliminate impact",
          "UA Rotational Resistance outsole for lightweight lockdown traction to support your swing",
          "Spikeless outsole for a lighter, more flexible feel without any compromise in traction"
        ]
      },
      {
        id: 6,
        name: "UA Spotlight 4 MC",
        model: "UA Spotlight",
        brand: "UnderArmour",
        price: 130,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3028705-100_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688",
        gender: ["Men"],
        sport: ["Football"],
        color: "White",
        colors: ["white"],
        sizes: [38, 39, 40, 41, 42, 43],
        rating: 4.2,
        trending: false,
        new: false,
        videosets: {
          "white": [
            "videos/vid 6.mp4"
          ]
        },
        details: [
          "UA CLONE upper provides a truly customized fit, no matter your foot shape",
          "An internal layer of flexible, auxetic material molds around the foot for a custom, precise, glove-like fit & feel",
          "Anatomical 3D-bootie collar for ultimate comfort & superior ankle lockdown",
          "SuperFoam insole forms to the shape of your foot for better fit & shock-absorption",
          "Bladed & conical molded studs for optimal multidirectional traction"
        ]
      },
      {
        id: 7,
        name: "UA Spotlight Turf",
        model: "UA Spotlight",
        brand: "UnderArmour",
        price: 110,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3028706-100_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688",
        gender: ["Men"],
        sport: ["Laorosse",],
        color: "White",
        colors: ["white"],
        sizes: [37, 38, 39, 40, 41, 42],
        rating: 4.4,
        trending: true,
        new: false,
        videosets: {
          "white": [
            "videos/vid 7.mp4"
          ]
        },
        details: [
          "UA CLONE upper provides a truly customized fit, no matter your foot shape",
          "An internal layer of flexible, auxetic material molds around the foot for a custom, precise, glove-like fit & feel",
          "Anatomical 3D-bootie collar for ultimate comfort & superior ankle lockdown",
          "3D-molded sockliner for added comfort & support",
          "Rubber outsole with mini-lugs for incredible grip & traction on artificial turf & dry natural fields"
        ]
      },
      {
        id: 8,
        name: "UA Highlight 2 MC",
        model: "UA Highlight",
        brand: "UnderArmour",
        price: 140,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3028659-100_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688",
        gender: ["Men"],
        sport: ["Laorosse"],
        color: "White",
        colors: ["white"],
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 4.1,
        trending: false,
        new: true,
        videosets: {
          "white": [
            "videos/vid 8.mp4"
          ]
        },
        details: [
          "Easy-entry UA IntelliKnit upper is breathable, light & comfortable with stretch & support where you need it",
          "Updated, high-rebound SuperFoam® insole with more foam provides optimal comfort & reduced stud pressure",
          "Charged cushioning midsole",
          "Lightweight UA Scatter Traction cleat plate supports powerful movements in every direction"
        ]
      },
      {
        id: 9,
        name: "UA Shadow Turf 3",
        model: "UA Shadow",
        brand: "UnderArmour",
        price: 80,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3028293-016_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688",
        gender: ["Men"],
        sport: ["Soccer"],
        color: "Black",
        colors: ["black"],
        sizes: [37, 38, 39, 40, 41, 42, 43],
        rating: 4.3,
        trending: true,
        new: false,
        videosets: {
          "black": [
            "videos/vid 9.mp4"
          ]
        },
        details: [
          "Super-soft, durable synthetic upper delivers a second-skin fit & feel",
          "Durable synthetic suede toe & heel caps for added abrasion resistance",
          "Premium foam on internal collar for heel hold & comfort",
          "Ultra-responsive, Charged Cushioning® midsole absorbs impact & converts it into responsive quickness",
          "Durable rubber outsole with strategic lugs for maximum grip on artificial turf & hard ground surfaces"
        ]
      },
      {
        id: 10,
        name: "UA Magnetico Select 4 FG",
        model: "UA Magnetico",
        brand: "UnderArmour",
        price: 72.97,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3027707-800_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688",
        gender: ["Men"],
        sport: ["Soccer"],
        color: "Orange",
        colors: ["orange", "black"],
        sizes: [39, 40, 41, 42, 43, 44, 45],
        rating: 4.8,
        trending: false,
        new: true,
        videosets: {
          "orange": [
            "videos/vid 10 (2).mp4"
          ],
          "black": [
            "videos/vid 10 (1).mp4"
          ]
        },
        details: [
          "Super-soft synthetic leather upper provides a snug fit",
          "3D print & mudguard for additional touch & control",
          "Ortholite X-40 sockliner",
          "Textile collar & tongue for a sock-like fit with premium internal foam for heel hold & added comfort",
          "TPU outsole with conical studs provides ideal traction"
        ]
      },
      {
        id: 11,
        name: "UA Bandit Trail 3",
        model: "UA Bandit",
        brand: "UnderArmour",
        price: 90,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3028657-014_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688",
        gender: ["Men"],
        sport: ["Running"],
        color: "Grey",
        colors: ["grey", "black","orange"],
        sizes: [38, 39, 40, 41, 42, 43],
        rating: 4.2,
        trending: false,
        new: false,
        videosets: {
          "grey": [
            "videos/vid 11 (3).mp4"
          ],
          "black": [
            "videos/vid 11 (1).mp4"
          ],
          "orange": [
            "videos/vid 11 (2).mp4"
          ]
        },
        details: [
          "Lightweight, engineered two-toned mesh upper construction for increased ventilation",
          "Strategic overlays for added durability & protection in high-abrasion areas",
          "Molded sockliner forms to the foot, eliminating slippage & providing ideal underfoot comfort",
          "Charged Cushioning® midsole uses compression molded foam for ultimate responsiveness & durability",
          "Durable outsole with technical trail lugs for ultimate traction when going up & down the trails​"
        ]
      },
      {
        id: 12,
        name: "UA Charged Maven Trek Waterproof",
        model: "UA Charged",
        brand: "UnderArmour",
        price: 125,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3026735-001_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688",
        gender: ["Men"],
        sport: ["Outdoor"],
        color: "Black",
        colors: ["black"],
        sizes: [37, 38, 39, 40, 41, 42],
        rating: 4.4,
        trending: true,
        new: false,
        videosets: {
          "black": [
            "videos/vid 12.mp4"
          ]
        },
        details: [
          "Canvas and suede upper",
          "Reinforced toe caps",
          "Padded collars",
          "Waffle outsole",
          "Signature Vans style"
        ]
      },
      {
        id: 13,
        name: "CUSHION CREW",
        model: "Crew",
        brand: "Under Armour",
        price: 60,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3027524-001_DEFAULT?rp=standard-30pad%7CgridTileDesktop&scl=1&fmt=jpg&qlt=50&resMode=sharp2&cache=on%2Con&bgc=F0F0F0&wid=512&hei=640&size=472%2C600",
        gender: ["Men"],
        sport: ["Training", "Gym"],
        color: "Black",
        colors: ["black", "grey"],
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 4.1,
        trending: false,
        new: true,
        videosets: {
          "black": [
            "videos/vid 2 (1).mp4"
          ]
        },
        details: [
          "Lightweight mesh upper",
          "EVA sockliner",
          "Charged cushioning midsole",
          "Rubber outsole",
          "Breathable design"
        ]
      },
      {
        id: 14,
        name: "CHUCK 70",
        model: "Chuck Taylor",
        brand: "Converse",
        price: 85,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3028384-101_A?rp=standard-30pad|gridTileDesktop&scl=1&fmt=jpg&qlt=50&resMode=sharp2&cache=on,on&bgc=F0F0F0&wid=512&hei=640&size=472,600",
        gender: ["Men"],
        sport: ["Casual", "Skate"],
        color: "Black",
        colors: ["black", "white", "red"],
        sizes: [37, 38, 39, 40, 41, 42, 43],
        rating: 4.3,
        trending: true,
        new: false,
        videosets: {
          "black": [
            "videos/vid 2 (2).mp4"
          ]
        },
        details: [
          "Canvas upper",
          "OrthoLite insole",
          "Vulcanized rubber sole",
          "Classic Chuck Taylor design",
          "Reinforced toe cap"
        ]
      },
      {
        id: 15,
        name: "GEL-KAYANO 28",
        model: "Kayano 28",
        brand: "ASICS",
        price: 160,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3027523-044_A?rp=standard-30pad|gridTileDesktop&scl=1&fmt=jpg&qlt=50&resMode=sharp2&cache=on,on&bgc=F0F0F0&wid=512&hei=640&size=472,600",
        gender: ["Men"],
        sport: ["Running"],
        color: "Blue",
        colors: ["blue", "black"],
        sizes: [39, 40, 41, 42, 43, 44, 45],
        rating: 4.8,
        trending: false,
        new: true,
        videosets: {
          "blue": [
            "videos/vid 2 (3).mp4"
          ]
        },
        details: [
          "Dynamic DUOMAX support system",
          "FF BLAST cushioning",
          "Ortholite X-40 sockliner",
          "AHAR outsole rubber",
          "Engineered mesh upper"
        ]
      },
      {
        id: 16,
        name: "CLASSIC LEATHER",
        model: "Classic",
        brand: "Reebok",
        price: 75,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3027767-114_A?rp=standard-30pad|gridTileDesktop&scl=1&fmt=jpg&qlt=50&resMode=sharp2&cache=on,on&bgc=F0F0F0&wid=512&hei=640&size=472,600",
        gender: ["Men"],
        sport: ["Casual", "Lifestyle"],
        color: "White",
        colors: ["white", "black"],
        sizes: [38, 39, 40, 41, 42, 43],
        rating: 4.2,
        trending: false,
        new: false,
        videosets: {
          "white": [
            "videos/vid 2 (2).mp4"
          ]
        },
        details: [
          "Leather upper",
          "EVA midsole",
          "Rubber outsole",
          "Classic Reebok design",
          "Padded collar"
        ]
      },
      {
        id: 17,
        name: "SK8-HI",
        model: "Sk8-Hi",
        brand: "Vans",
        price: 75,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3028168-014_A?rp=standard-30pad|gridTileDesktop&scl=1&fmt=jpg&qlt=50&resMode=sharp2&cache=on,on&bgc=F0F0F0&wid=512&hei=640&size=472,600",
        gender: ["Men"],
        sport: ["Skate", "Casual"],
        color: "Black",
        colors: ["black", "checkerboard"],
        sizes: [37, 38, 39, 40, 41, 42],
        rating: 4.4,
        trending: true,
        new: false,
        videosets: {
          "black": [
            "videos/vid 2 (3).mp4"
          ]
        },
        details: [
          "Canvas and suede upper",
          "Reinforced toe caps",
          "Padded collars",
          "Waffle outsole",
          "Signature Vans style"
        ]
      },
      {
        id: 18,
        name: "CUSHION CREW",
        model: "Crew",
        brand: "Under Armour",
        price: 60,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3027524-001_DEFAULT?rp=standard-30pad%7CgridTileDesktop&scl=1&fmt=jpg&qlt=50&resMode=sharp2&cache=on%2Con&bgc=F0F0F0&wid=512&hei=640&size=472%2C600",
        gender: ["Men"],
        sport: ["Training", "Gym"],
        color: "Black",
        colors: ["black", "grey"],
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 4.1,
        trending: false,
        new: true,
        videosets: {
          "black": [
            "videos/ua_black_1.mp4",
            "videos/ua_black_2.mp4"
          ],
          "grey": [
            "videos/ua_grey_1.mp4",
            "videos/ua_grey_2.mp4"
          ]
        },
        details: [
          "Lightweight mesh upper",
          "EVA sockliner",
          "Charged cushioning midsole",
          "Rubber outsole",
          "Breathable design"
        ]
      },
      {
        id: 19,
        name: "CHUCK 70",
        model: "Chuck Taylor",
        brand: "Converse",
        price: 85,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3027585-348_A?rp=standard-30pad|gridTileDesktop&scl=1&fmt=jpg&qlt=50&resMode=sharp2&cache=on,on&bgc=F0F0F0&wid=512&hei=640&size=472,600",
        gender: ["Men"],
        sport: ["Casual", "Skate"],
        color: "Black",
        colors: ["black", "white", "red"],
        sizes: [37, 38, 39, 40, 41, 42, 43],
        rating: 4.3,
        trending: true,
        new: false,
        videosets: {
          "black": [
            "videos/chuck_black_1.mp4",
            "videos/chuck_black_2.mp4"
          ],
          "white": [
            "videos/chuck_white_1.mp4",
            "videos/chuck_white_2.mp4",
            "videos/chuck_white_3.mp4"
          ],
          "red": [
            "videos/chuck_red_1.mp4",
            "videos/chuck_red_2.mp4"
          ]
        },
        details: [
          "Canvas upper",
          "OrthoLite insole",
          "Vulcanized rubber sole",
          "Classic Chuck Taylor design",
          "Reinforced toe cap"
        ]
      },
      {
        id: 20,
        name: "GEL-KAYANO 28",
        model: "Kayano 28",
        brand: "ASICS",
        price: 160,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3027205-102_A?rp=standard-30pad|gridTileDesktop&scl=1&fmt=jpg&qlt=50&resMode=sharp2&cache=on,on&bgc=F0F0F0&wid=512&hei=640&size=472,600",
        gender: ["Men"],
        sport: ["Running"],
        color: "Blue",
        colors: ["blue", "black"],
        sizes: [39, 40, 41, 42, 43, 44, 45],
        rating: 4.8,
        trending: false,
        new: true,
        videosets: {
          "blue": [
            "videos/kayano_blue_1.mp4",
            "videos/kayano_blue_2.mp4",
            "videos/kayano_blue_3.mp4"
          ],
          "black": [
            "videos/kayano_black_1.mp4",
            "videos/kayano_black_2.mp4"
          ]
        },
        details: [
          "Dynamic DUOMAX support system",
          "FF BLAST cushioning",
          "Ortholite X-40 sockliner",
          "AHAR outsole rubber",
          "Engineered mesh upper"
        ]
      },
      {
        id: 21,
        name: "CLASSIC LEATHER",
        model: "Classic",
        brand: "Reebok",
        price: 75,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3027202-498_A?rp=standard-30pad|gridTileDesktop&scl=1&fmt=jpg&qlt=50&resMode=sharp2&cache=on,on&bgc=F0F0F0&wid=512&hei=640&size=472,600",
        gender: ["Men"],
        sport: ["Casual", "Lifestyle"],
        color: "White",
        colors: ["white", "black"],
        sizes: [38, 39, 40, 41, 42, 43],
        rating: 4.2,
        trending: false,
        new: false,
        videosets: {
          "white": [
            "videos/reebok_white_1.mp4",
            "videos/reebok_white_2.mp4"
          ],
          "black": [
            "videos/reebok_black_1.mp4",
            "videos/reebok_black_2.mp4",
            "videos/reebok_black_3.mp4"
          ]
        },
        details: [
          "Leather upper",
          "EVA midsole",
          "Rubber outsole",
          "Classic Reebok design",
          "Padded collar"
        ]
      },
      {
        id: 22,
        name: "SK8-HI",
        model: "Sk8-Hi",
        brand: "Vans",
        price: 75,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3027595-007_A?rp=standard-30pad|gridTileDesktop&scl=1&fmt=jpg&qlt=50&resMode=sharp2&cache=on,on&bgc=F0F0F0&wid=512&hei=640&size=472,600",
        gender: ["Men"],
        sport: ["Skate", "Casual"],
        color: "Black",
        colors: ["black", "checkerboard"],
        sizes: [37, 38, 39, 40, 41, 42],
        rating: 4.4,
        trending: true,
        new: false,
        videosets: {
          "black": [
            "videos/vans_black_1.mp4",
            "videos/vans_black_2.mp4"
          ],
          "checkerboard": [
            "videos/vans_check_1.mp4",
            "videos/vans_check_2.mp4",
            "videos/vans_check_3.mp4"
          ]
        },
        details: [
          "Canvas and suede upper",
          "Reinforced toe caps",
          "Padded collars",
          "Waffle outsole",
          "Signature Vans style"
        ]
      },
      {
        id: 23,
        name: "CUSHION CREW",
        model: "Crew",
        brand: "Under Armour",
        price: 60,
        image: "https://underarmour.scene7.com/is/image/Underarmour/3027524-001_DEFAULT?rp=standard-30pad%7CgridTileDesktop&scl=1&fmt=jpg&qlt=50&resMode=sharp2&cache=on%2Con&bgc=F0F0F0&wid=512&hei=640&size=472%2C600",
        gender: ["Men"],
        sport: ["Training", "Gym"],
        color: "Black",
        colors: ["black", "grey"],
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 4.1,
        trending: false,
        new: true,
        videosets: {
          "black": [
            "videos/ua_black_1.mp4",
            "videos/ua_black_2.mp4"
          ],
          "grey": [
            "videos/ua_grey_1.mp4",
            "videos/ua_grey_2.mp4"
          ]
        },
        details: [
          "Lightweight mesh upper",
          "EVA sockliner",
          "Charged cushioning midsole",
          "Rubber outsole",
          "Breathable design"
        ]
      },
    ];
  
    const productGrid = document.getElementById("product-grid");
    const pagination = document.getElementById("pagination");
    const clearBtn = document.querySelector(".clear-btn");
  
    // Filter elements
    const sortOptions = document.querySelectorAll('input[name="sort"]');
    const genderFilters = document.querySelectorAll('input[name="gender"]');
    const sportFilters = document.querySelectorAll('input[name="sport"]');
    const colorFilters = document.querySelectorAll('input[name="color"]');
    const brandFilters = document.querySelectorAll('input[name="brand"]');
    const sizeButtons = document.querySelectorAll(".size-btn");
    const minPriceInput = document.querySelector('input[name="minPrice"]');
    const maxPriceInput = document.querySelector('input[name="maxPrice"]');
    const priceOkBtn = document.querySelector(".ok-btn");
  
    // Filter state
    let currentFilters = {
      sort: null,
      genders: [],
      sports: [],
      colors: [],
      brands: [],
      sizes: [],
      minPrice: null,
      maxPrice: null,
    };
  
    // Pagination state
    const productsPerPage = 12;
    let currentPage = 1;
  
    // Initialize with all filter sections collapsed
    function initFilterSections() {
      document.querySelectorAll(".filter-options").forEach((section) => {
        section.style.display = "none";
      });
      document.querySelectorAll(".toggle-icon").forEach((icon) => {
        icon.textContent = "+";
      });
    }
  
    // Initialize
    initFilterSections();
    renderProducts(products);
    setupEventListeners();
  
    function setupEventListeners() {
      // Sort options
      sortOptions.forEach((option) => {
        option.addEventListener("change", (e) => {
          currentFilters.sort = e.target.value;
          applyFilters();
        });
      });
  
      // Gender filters
      genderFilters.forEach((filter) => {
        filter.addEventListener("change", (e) => {
          if (e.target.checked) {
            currentFilters.genders.push(e.target.value);
          } else {
            currentFilters.genders = currentFilters.genders.filter(
              (g) => g !== e.target.value
            );
          }
          applyFilters();
        });
      });
  
      // Sport filters
      sportFilters.forEach((filter) => {
        filter.addEventListener("change", (e) => {
          if (e.target.checked) {
            currentFilters.sports.push(e.target.value);
          } else {
            currentFilters.sports = currentFilters.sports.filter(
              (s) => s !== e.target.value
            );
          }
          applyFilters();
        });
      });
  
      // Color filters
      colorFilters.forEach((filter) => {
        filter.addEventListener("change", (e) => {
          if (e.target.checked) {
            currentFilters.colors.push(e.target.value);
          } else {
            currentFilters.colors = currentFilters.colors.filter(
              (c) => c !== e.target.value
            );
          }
          applyFilters();
        });
      });
  
      // Brand filters
      brandFilters.forEach((filter) => {
        filter.addEventListener("change", (e) => {
          if (e.target.checked) {
            currentFilters.brands.push(e.target.value);
          } else {
            currentFilters.brands = currentFilters.brands.filter(
              (b) => b !== e.target.value
            );
          }
          applyFilters();
        });
      });
  
      // Size filters
      sizeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const size = parseInt(e.target.dataset.size);
          if (e.target.classList.contains("active")) {
            e.target.classList.remove("active");
            currentFilters.sizes = currentFilters.sizes.filter((s) => s !== size);
          } else {
            e.target.classList.add("active");
            currentFilters.sizes.push(size);
          }
          applyFilters();
        });
      });
  
      // Price filter
      priceOkBtn.addEventListener("click", () => {
        currentFilters.minPrice = minPriceInput.value
          ? parseInt(minPriceInput.value)
          : null;
        currentFilters.maxPrice = maxPriceInput.value
          ? parseInt(maxPriceInput.value)
          : null;
        applyFilters();
      });
  
      // Clear all filters
      clearBtn.addEventListener("click", clearAllFilters);
  
      // Filter section toggles
      document.querySelectorAll(".filter-header").forEach((header) => {
        header.addEventListener("click", function () {
          const options = this.nextElementSibling;
          const icon = this.querySelector(".toggle-icon");
  
          if (options.style.display === "none" || !options.style.display) {
            options.style.display = "block";
            icon.textContent = "-";
            this.setAttribute("aria-expanded", "true");
          } else {
            options.style.display = "none";
            icon.textContent = "+";
            this.setAttribute("aria-expanded", "false");
          }
        });
      });
    }
  
    function applyFilters() {
      let filteredProducts = [...products];
  
      // Apply gender filter
      if (currentFilters.genders.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          product.gender.some((g) => currentFilters.genders.includes(g))
        );
      }
  
      // Apply sport filter
      if (currentFilters.sports.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          product.sport.some((s) => currentFilters.sports.includes(s))
        );
      }
  
      // Apply color filter
      if (currentFilters.colors.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          currentFilters.colors.includes(product.color)
        );
      }
  
      // Apply brand filter
      if (currentFilters.brands.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          currentFilters.brands.includes(product.brand)
        );
      }
  
      // Apply size filter
      if (currentFilters.sizes.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          product.sizes.some((s) => currentFilters.sizes.includes(s))
        );
      }
  
      // Apply price filter
      if (currentFilters.minPrice !== null) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= currentFilters.minPrice
        );
      }
      if (currentFilters.maxPrice !== null) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price <= currentFilters.maxPrice
        );
      }
  
      // Apply sorting
      if (currentFilters.sort) {
        switch (currentFilters.sort) {
          case "price-low-high":
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case "price-high-low":
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case "trending":
            filteredProducts = filteredProducts.filter((p) => p.trending);
            break;
          case "bestsellers":
            filteredProducts = filteredProducts.filter((p) => p.rating > 4.5);
            break;
          case "top-rated":
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
          case "newest":
            filteredProducts = filteredProducts.filter((p) => p.new);
            break;
        }
      }
  
      // Reset to page 1 when filters change
      currentPage = 1;
  
      // Render filtered products
      renderProducts(filteredProducts);
    }
  
    function clearAllFilters() {
      // Reset filter state
      currentFilters = {
        sort: null,
        genders: [],
        sports: [],
        colors: [],
        brands: [],
        sizes: [],
        minPrice: null,
        maxPrice: null,
      };
  
      // Uncheck all checkboxes
      document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.checked = false;
      });
  
      // Uncheck all radio buttons
      document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.checked = false;
      });
  
      // Clear size selections
      sizeButtons.forEach((button) => {
        button.classList.remove("active");
      });
  
      // Clear price inputs
      minPriceInput.value = "";
      maxPriceInput.value = "";
  
      // Reset to original products
      renderProducts(products);
    }
  
    function renderProducts(productsToRender) {
      // Calculate pagination
      const totalPages = Math.ceil(productsToRender.length / productsPerPage);
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const paginatedProducts = productsToRender.slice(startIndex, endIndex);
  
      // Clear existing products
      productGrid.innerHTML = "";
  
      // Render products
      if (paginatedProducts.length === 0) {
        productGrid.innerHTML =
          '<div class="no-results">No products match your filters.</div>';
      } else {
        paginatedProducts.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.className = "product-card";
          
          // Prepare product data for the product page
          const productData = {
            id: product.id,
            name: product.name,
            brand: product.brand,
            model: product.model,
            price: product.price,
            colors: product.colors,
            sizes: product.sizes,
            videosets: product.videosets,
            details: product.details,
            rating: product.rating,
            trending: product.trending,
            new: product.new,
            image: product.image
          };
  
          productCard.innerHTML = `
            <div class="product-image">
              <a href="a.html" class="product-link" data-product='${JSON.stringify(productData)}'>
                <img src="${product.image}" alt="${product.name}" loading="lazy">
              </a>
            </div>
            <div class="product-info">
              <div class="product-name">${product.name}</div>
              <div class="product-price">$${product.price}</div>
            </div>
          `;
          productGrid.appendChild(productCard);
        });
  
        // Add click handlers to product links
        document.querySelectorAll('.product-link').forEach(link => {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            const productData = JSON.parse(this.getAttribute('data-product'));
            localStorage.setItem('currentProduct', JSON.stringify(productData));
            window.location.href = this.getAttribute('href');
          });
        });
      }
  
      // Render pagination
      renderPagination(totalPages);
    }
  
    function renderPagination(totalPages) {
      pagination.innerHTML = "";
  
      if (totalPages <= 1) return;
  
      // Previous button
      const prevButton = document.createElement("button");
      prevButton.className = "pagination-btn";
      prevButton.innerHTML = "&laquo;";
      prevButton.disabled = currentPage === 1;
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          applyFilters();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
      pagination.appendChild(prevButton);
  
      // Page numbers
      const maxVisiblePages = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
  
      if (startPage > 1) {
        const firstPageButton = document.createElement("button");
        firstPageButton.className = "pagination-btn";
        firstPageButton.textContent = "1";
        firstPageButton.addEventListener("click", () => {
          currentPage = 1;
          applyFilters();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
        pagination.appendChild(firstPageButton);
  
        if (startPage > 2) {
          const ellipsis = document.createElement("span");
          ellipsis.className = "pagination-ellipsis";
          ellipsis.textContent = "...";
          pagination.appendChild(ellipsis);
        }
      }
  
      for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement("button");
        pageButton.className = `pagination-btn ${
          currentPage === i ? "active" : ""
        }`;
        pageButton.textContent = i;
        pageButton.addEventListener("click", () => {
          currentPage = i;
          applyFilters();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
        pagination.appendChild(pageButton);
      }
  
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          const ellipsis = document.createElement("span");
          ellipsis.className = "pagination-ellipsis";
          ellipsis.textContent = "...";
          pagination.appendChild(ellipsis);
        }
  
        const lastPageButton = document.createElement("button");
        lastPageButton.className = "pagination-btn";
        lastPageButton.textContent = totalPages;
        lastPageButton.addEventListener("click", () => {
          currentPage = totalPages;
          applyFilters();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
        pagination.appendChild(lastPageButton);
      }
  
      // Next button
      const nextButton = document.createElement("button");
      nextButton.className = "pagination-btn";
      nextButton.innerHTML = "&raquo;";
      nextButton.disabled = currentPage === totalPages;
      nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          applyFilters();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
      pagination.appendChild(nextButton);
    }
  });