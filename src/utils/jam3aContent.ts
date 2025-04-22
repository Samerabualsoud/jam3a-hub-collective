
export const getContent = (language: string) => ({
  en: {
    title: "Start Your Own Jam3a",
    subtitle: "Group buying made simple and rewarding",
    stepTitles: [
      "Select Category",
      "Choose Product",
      "Set Group Size",
      "Payment & Publish"
    ],
    categories: [
      { id: "smartphones", name: "Smartphones", icon: "📱" },
      { id: "laptops", name: "Laptops", icon: "💻" },
      { id: "audio", name: "Audio", icon: "🎧" },
      { id: "tvs", name: "TVs", icon: "📺" },
      { id: "wearables", name: "Wearables", icon: "⌚" }
    ],
    products: {
      smartphones: [
        { id: 1, name: "iPhone 16 Pro Max 256GB", image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80", price: 4999, discounts: [
          { minCount: 3, price: 4799, savings: "4%" },
          { minCount: 5, price: 4599, savings: "8%" },
          { minCount: 10, price: 4199, savings: "16%" }
        ]},
        { id: 2, name: "Samsung Galaxy S25 Ultra", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1600&q=80", price: 4599, discounts: [
          { minCount: 3, price: 4399, savings: "4%" },
          { minCount: 5, price: 4199, savings: "9%" },
          { minCount: 10, price: 3899, savings: "15%" }
        ]}
      ],
      laptops: [
        { id: 3, name: "MacBook Pro 16\" M3 Max", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=80", price: 11999, discounts: [
          { minCount: 2, price: 11399, savings: "5%" },
          { minCount: 3, price: 10799, savings: "10%" },
          { minCount: 5, price: 9999, savings: "17%" }
        ]},
        { id: 4, name: "Dell XPS 15", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1600&q=80", price: 7999, discounts: [
          { minCount: 3, price: 7599, savings: "5%" },
          { minCount: 5, price: 7299, savings: "9%" },
          { minCount: 10, price: 6799, savings: "15%" }
        ]}
      ],
      tvs: [
        { id: 5, name: "Samsung 75\" 4K QLED TV", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81", price: 7999, discounts: [
          { minCount: 3, price: 7599, savings: "5%" },
          { minCount: 5, price: 7199, savings: "10%" },
          { minCount: 10, price: 6399, savings: "20%" }
        ]},
        { id: 6, name: "LG 65\" OLED TV", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=80", price: 5999, discounts: [
          { minCount: 3, price: 5699, savings: "5%" },
          { minCount: 5, price: 5399, savings: "10%" },
          { minCount: 10, price: 4799, savings: "20%" }
        ]}
      ],
      audio: [
        { id: 7, name: "AirPods Pro 2", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1600&q=80", price: 1099, discounts: [
          { minCount: 5, price: 999, savings: "9%" },
          { minCount: 10, price: 949, savings: "14%" },
          { minCount: 20, price: 879, savings: "20%" }
        ]}
      ],
      wearables: [
        { id: 8, name: "Apple Watch Ultra 2", image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=1600&q=80", price: 3499, discounts: [
          { minCount: 3, price: 3299, savings: "6%" },
          { minCount: 5, price: 3149, savings: "10%" },
          { minCount: 10, price: 2799, savings: "20%" }
        ]}
      ]
    },
    successTitle: "Jam3a Created Successfully!",
    successText: "Your Jam3a has been created and is now visible to others. Share the link to invite others to join.",
    viewJam3a: "View My Jam3a",
    createAnother: "Create Another Jam3a",
    selectCategoryText: "Select a product category to start your Jam3a",
    selectProductText: "Choose the product you want to create a group for",
    paymentTitle: "Payment & Publication",
    paymentText: "Pay the deposit fee (SAR 50) to create your Jam3a. This amount will be deducted from your final purchase.",
    serviceFeesText: "Service fee (refundable):",
    totalText: "Total to pay now:",
    publishButton: "Pay & Publish Jam3a",
    nextButton: "Continue",
    backButton: "Back",
    groupSizeTitle: "Set Your Group Size",
    groupSizeText: "Select how many people need to join for the deal to activate. Larger groups lead to better discounts!",
    originalPriceText: "Original price:",
    savingsText: "Group discount:",
    finalPriceText: "Your final price:",
    minPeopleText: "Minimum people:"
  },
  ar: {
    title: "ابدأ جمعتك الخاصة",
    subtitle: "الشراء الجماعي بسيط ومجزٍ",
    stepTitles: [
      "اختر الفئة",
      "اختر المنتج",
      "حدد حجم المجموعة",
      "الدفع والنشر"
    ],
    categories: [
      { id: "smartphones", name: "الهواتف الذكية", icon: "📱" },
      { id: "laptops", name: "أجهزة الكمبيوتر المحمولة", icon: "💻" },
      { id: "audio", name: "الصوتيات", icon: "🎧" },
      { id: "tvs", name: "التلفزيونات", icon: "📺" },
      { id: "wearables", name: "الأجهزة القابلة للارتداء", icon: "⌚" }
    ],
    products: {
      smartphones: [
        { id: 1, name: "آيفون 16 برو ماكس 256 جيجابايت", image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80", price: 4999, discounts: [
          { minCount: 3, price: 4799, savings: "4%" },
          { minCount: 5, price: 4599, savings: "8%" },
          { minCount: 10, price: 4199, savings: "16%" }
        ]},
        { id: 2, name: "سامسونج جالاكسي S25 ألترا", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1600&q=80", price: 4599, discounts: [
          { minCount: 3, price: 4399, savings: "4%" },
          { minCount: 5, price: 4199, savings: "9%" },
          { minCount: 10, price: 3899, savings: "15%" }
        ]}
      ],
      laptops: [
        { id: 3, name: "ماك بوك برو 16 بوصة M3 ماكس", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=80", price: 11999, discounts: [
          { minCount: 2, price: 11399, savings: "5%" },
          { minCount: 3, price: 10799, savings: "10%" },
          { minCount: 5, price: 9999, savings: "17%" }
        ]},
        { id: 4, name: "ديل إكس بي إس 15", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1600&q=80", price: 7999, discounts: [
          { minCount: 3, price: 7599, savings: "5%" },
          { minCount: 5, price: 7299, savings: "9%" },
          { minCount: 10, price: 6799, savings: "15%" }
        ]}
      ],
      tvs: [
        { id: 5, name: "تلفاز سامسونج 75 بوصة QLED 4K", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81", price: 7999, discounts: [
          { minCount: 3, price: 7599, savings: "5%" },
          { minCount: 5, price: 7199, savings: "10%" },
          { minCount: 10, price: 6399, savings: "20%" }
        ]},
        { id: 6, name: "تلفاز إل جي 65 بوصة OLED", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=80", price: 5999, discounts: [
          { minCount: 3, price: 5699, savings: "5%" },
          { minCount: 5, price: 5399, savings: "10%" },
          { minCount: 10, price: 4799, savings: "20%" }
        ]}
      ],
      audio: [
        { id: 7, name: "إيربودز برو 2", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1600&q=80", price: 1099, discounts: [
          { minCount: 5, price: 999, savings: "9%" },
          { minCount: 10, price: 949, savings: "14%" },
          { minCount: 20, price: 879, savings: "20%" }
        ]}
      ],
      wearables: [
        { id: 8, name: "ساعة أبل ألترا 2", image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=1600&q=80", price: 3499, discounts: [
          { minCount: 3, price: 3299, savings: "6%" },
          { minCount: 5, price: 3149, savings: "10%" },
          { minCount: 10, price: 2799, savings: "20%" }
        ]}
      ]
    },
    successTitle: "تم إنشاء الجمعة بنجاح!",
    successText: "تم إنشاء الجمعة وهي الآن مرئية للآخرين. شارك الرابط لدعوة الآخرين للانضمام.",
    viewJam3a: "عرض جمعتي",
    createAnother: "إنشاء جمعة أخرى",
    selectCategoryText: "اختر فئة المنتج لبدء الجمعة",
    selectProductText: "اختر المنتج الذي تريد إنشاء مجموعة له",
    paymentTitle: "الدفع والنشر",
    paymentText: "ادفع رسوم التأمين (50 ريال) لإنشاء الجمعة. سيتم خصم هذا المبلغ من مشترياتك النهائية.",
    serviceFeesText: "رسوم الخدمة (قابلة للاسترداد):",
    totalText: "المجموع للدفع الآن:",
    publishButton: "دفع ونشر الجمعة",
    nextButton: "متابعة",
    backButton: "رجوع",
    groupSizeTitle: "حدد حجم مجموعتك",
    groupSizeText: "حدد عدد الأشخاص المطلوب انضمامهم لتفعيل الصفقة. المجموعات الأكبر تؤدي إلى خصومات أفضل!",
    originalPriceText: "السعر الأصلي:",
    savingsText: "خصم المجموعة:",
    finalPriceText: "السعر النهائي لك:",
    minPeopleText: "الحد الأدنى للأشخاص:"
  }
})[language];
