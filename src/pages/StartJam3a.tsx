import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Share2, Clock, Users } from 'lucide-react';

const StartJam3a = () => {
  const { language } = useLanguage();
  const isRtl = language === 'ar';
  const [step, setStep] = useState(1);

  const content = {
    en: {
      title: "Start Your Own Jam3a",
      subtitle: "Create a group-buying deal and save together",
      description: "Starting a Jam3a is easy! Select a product, set your group size, and share with friends to unlock exclusive discounts.",
      steps: [
        {
          title: "Select a Product",
          description: "Choose from our curated selection of premium products or request a custom product."
        },
        {
          title: "Set Group Details",
          description: "Decide how many people you want in your group and set a time limit."
        },
        {
          title: "Share & Save",
          description: "Share your unique Jam3a link and watch the group fill up to unlock your discount."
        }
      ],
      productSelection: {
        title: "Select a Product",
        searchPlaceholder: "Search for products...",
        categories: ["All Categories", "Smartphones", "Laptops", "Audio", "Wearables", "Home Tech"],
        categoryLabel: "Category",
        priceRange: "Price Range",
        customProduct: "Can't find what you're looking for?",
        requestCustom: "Request Custom Product",
        next: "Next: Set Group Details"
      },
      groupDetails: {
        title: "Set Group Details",
        groupSize: "Group Size",
        groupSizeDescription: "Choose how many people need to join your Jam3a. Larger groups = bigger discounts!",
        timeLimit: "Time Limit",
        timeLimitDescription: "Set how long your Jam3a will be active. The group must fill within this time.",
        timeLimitOptions: ["24 hours", "3 days", "7 days", "14 days"],
        visibility: "Jam3a Visibility",
        visibilityDescription: "Public Jam3as appear in our marketplace. Private ones are only accessible via your link.",
        public: "Public",
        private: "Private",
        back: "Back: Select Product",
        next: "Next: Review & Share"
      },
      review: {
        title: "Review & Share Your Jam3a",
        productDetails: "Product Details",
        groupDetails: "Group Details",
        groupSize: "Group Size",
        timeLimit: "Time Limit",
        visibility: "Visibility",
        pricing: "Pricing Breakdown",
        retailPrice: "Retail Price",
        groupDiscount: "Group Discount",
        finalPrice: "Final Price (if group fills)",
        shareTitle: "Ready to Share Your Jam3a",
        shareDescription: "Share your unique link with friends and family to start saving together!",
        shareOptions: "Share via",
        whatsapp: "WhatsApp",
        twitter: "Twitter",
        facebook: "Facebook",
        copyLink: "Copy Link",
        linkCopied: "Link copied to clipboard!",
        back: "Back: Group Details",
        create: "Create My Jam3a"
      },
      success: {
        title: "Your Jam3a is Live!",
        description: "Your group-buying deal has been created successfully. Share it now to start filling your group!",
        groupCode: "Your Jam3a Code",
        shareNow: "Share Now",
        viewDetails: "View Jam3a Details"
      },
      products: [
        {
          id: 1,
          name: "iPhone 16 Pro Max 256GB",
          image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80",
          retailPrice: 4999,
          groupPrice: 4199,
          discount: "16%",
          description: "Experience the latest innovation with revolutionary camera and A18 Pro chip"
        },
        {
          id: 2,
          name: "Samsung Galaxy S25 Ultra",
          image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1600&q=80",
          retailPrice: 4599,
          groupPrice: 3899,
          discount: "15%",
          description: "Unleash creativity with AI-powered tools and 200MP camera system"
        },
        {
          id: 3,
          name: "Galaxy Z Fold 6",
          image: "https://images.unsplash.com/photo-1615380547903-c456276b7702?auto=format&fit=crop&w=1600&q=80",
          retailPrice: 6999,
          groupPrice: 5799,
          discount: "17%",
          description: "Multitask like never before with a stunning foldable display"
        },
        {
          id: 4,
          name: "MacBook Pro 16\" M3 Pro",
          image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=1600&q=80",
          retailPrice: 9999,
          groupPrice: 8499,
          discount: "15%",
          description: "Supercharged for professionals with the M3 Pro chip"
        }
      ]
    },
    ar: {
      title: "ابدأ جمعتك الخاصة",
      subtitle: "أنشئ صفقة شراء جماعي ووفر مع الآخرين",
      description: "بدء جمعة سهل! اختر منتجًا، وحدد حجم المجموعة، وشارك مع الأصدقاء للحصول على خصومات حصرية.",
      steps: [
        {
          title: "اختر منتجًا",
          description: "اختر من مجموعتنا المنتقاة من المنتجات المميزة أو اطلب منتجًا مخصصًا."
        },
        {
          title: "حدد تفاصيل المجموعة",
          description: "قرر عدد الأشخاص الذين تريدهم في مجموعتك وحدد مهلة زمنية."
        },
        {
          title: "شارك ووفر",
          description: "شارك رابط جمعتك الفريد وراقب امتلاء المجموعة لفتح الخصم الخاص بك."
        }
      ],
      productSelection: {
        title: "اختر منتجًا",
        searchPlaceholder: "ابحث عن منتجات...",
        categories: ["جميع الفئات", "الهواتف الذكية", "أجهزة الكمبيوتر المحمولة", "الصوتيات", "الأجهزة القابلة للارتداء", "تقنيات المنزل"],
        categoryLabel: "الفئة",
        priceRange: "نطاق السعر",
        customProduct: "لا يمكنك العثور على ما تبحث عنه؟",
        requestCustom: "طلب منتج مخصص",
        next: "التالي: تعيين تفاصيل المجموعة"
      },
      groupDetails: {
        title: "تعيين تفاصيل المجموعة",
        groupSize: "حجم المجموعة",
        groupSizeDescription: "اختر عدد الأشخاص الذين يحتاجون للانضمام إلى جمعتك. المجموعات الأكبر = خصومات أكبر!",
        timeLimit: "المهلة الزمنية",
        timeLimitDescription: "حدد المدة التي ستكون فيها جمعتك نشطة. يجب أن تمتلئ المجموعة خلال هذا الوقت.",
        timeLimitOptions: ["24 ساعة", "3 أيام", "7 أيام", "14 يوم"],
        visibility: "رؤية الجمعة",
        visibilityDescription: "تظهر الجمعات العامة في سوقنا. الخاصة يمكن الوصول إليها فقط عبر الرابط الخاص بك.",
        public: "عام",
        private: "خاص",
        back: "رجوع: اختيار المنتج",
        next: "التالي: المراجعة والمشاركة"
      },
      review: {
        title: "مراجعة ومشاركة جمعتك",
        productDetails: "تفاصيل المنتج",
        groupDetails: "تفاصيل المجموعة",
        groupSize: "حجم المجموعة",
        timeLimit: "المهلة الزمنية",
        visibility: "الرؤية",
        pricing: "تفاصيل التسعير",
        retailPrice: "سعر التجزئة",
        groupDiscount: "خصم المجموعة",
        finalPrice: "السعر النهائي (إذا امتلأت المجموعة)",
        shareTitle: "جاهز لمشاركة جمعتك",
        shareDescription: "شارك رابطك الفريد مع الأصدقاء والعائلة لبدء التوفير معًا!",
        shareOptions: "مشاركة عبر",
        whatsapp: "واتساب",
        twitter: "تويتر",
        facebook: "فيسبوك",
        copyLink: "نسخ الرابط",
        linkCopied: "تم نسخ الرابط إلى الحافظة!",
        back: "رجوع: تفاصيل المجموعة",
        create: "إنشاء جمعتي"
      },
      success: {
        title: "جمعتك نشطة الآن!",
        description: "تم إنشاء صفقة الشراء الجماعي الخاصة بك بنجاح. شاركها الآن لبدء ملء مجموعتك!",
        groupCode: "رمز جمعتك",
        shareNow: "شارك الآن",
        viewDetails: "عرض تفاصيل الجمعة"
      },
      products: [
        {
          id: 1,
          name: "آيفون 16 برو ماكس 256 جيجابايت",
          image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80",
          retailPrice: 4999,
          groupPrice: 4199,
          discount: "16%",
          description: "استمتع بأحدث الابتكارات مع كاميرا ثورية وشريحة A18 Pro"
        },
        {
          id: 2,
          name: "سامسونج جالاكسي S25 ألترا",
          image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1600&q=80",
          retailPrice: 4599,
          groupPrice: 3899,
          discount: "15%",
          description: "أطلق العنان للإبداع مع أدوات مدعومة بالذكاء الاصطناعي ونظام كاميرا بدقة 200 ميجابكسل"
        },
        {
          id: 3,
          name: "جالاكسي Z فولد 6",
          image: "https://images.unsplash.com/photo-1615380547903-c456276b7702?auto=format&fit=crop&w=1600&q=80",
          retailPrice: 6999,
          groupPrice: 5799,
          discount: "17%",
          description: "تعدد المهام كما لم يحدث من قبل مع شاشة قابلة للطي مذهلة"
        },
        {
          id: 4,
          name: "ماك بوك برو 16 بوصة M3 برو",
          image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=1600&q=80",
          retailPrice: 9999,
          groupPrice: 8499,
          discount: "15%",
          description: "معزز للمحترفين مع شريحة M3 Pro"
        }
      ]
    }
  };

  const currentContent = content[language];
  const [selectedProduct, setSelectedProduct] = useState(currentContent.products[0]);
  const [groupSize, setGroupSize] = useState(5);
  const [timeLimit, setTimeLimit] = useState(currentContent.groupDetails.timeLimitOptions[1]);
  const [isPublic, setIsPublic] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = () => {
    // In a real implementation, this would copy an actual link
    navigator.clipboard.writeText("https://jam3a.sa/j/ABC123");
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          {[1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              <div 
                className={`rounded-full h-10 w-10 flex items-center justify-center ${
                  step >= i ? 'bg-jam3a-purple text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i}
              </div>
              {i < 3 && (
                <div 
                  className={`h-1 w-12 ${
                    step > i ? 'bg-jam3a-purple' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderProductSelection = () => {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{currentContent.productSelection.title}</h2>
          <div className="relative">
            <Input 
              placeholder={currentContent.productSelection.searchPlaceholder} 
              className="pl-10"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{currentContent.productSelection.categoryLabel}</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder={currentContent.productSelection.categories[0]} />
                </SelectTrigger>
                <SelectContent>
                  {currentContent.productSelection.categories.map((category, index) => (
                    <SelectItem key={index} value={category.toLowerCase().replace(/\s+/g, '-')}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>{currentContent.productSelection.priceRange}</Label>
              <div className="pt-4 pb-2">
                <Slider defaultValue={[0, 10000]} min={0} max={10000} step={100} />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0 SAR</span>
                <span>10,000 SAR</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {currentContent.products.map((product) => (
            <Card 
              key={product.id} 
              className={`cursor-pointer overflow-hidden transition-all ${
                selectedProduct.id === product.id ? 'ring-2 ring-jam3a-purple' : ''
              }`}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-jam3a-purple text-white px-2 py-1 rounded-md text-sm font-medium">
                  {product.discount} OFF
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <span className="font-bold text-lg">{product.groupPrice} SAR</span>
                    <span className="text-muted-foreground line-through text-sm ml-2">{product.retailPrice} SAR</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">{currentContent.productSelection.customProduct}</h3>
          <Button variant="outline">{currentContent.productSelection.requestCustom}</Button>
        </div>
        
        <div className="flex justify-end">
          <Button 
            className="bg-jam3a-purple hover:bg-jam3a-deep-purple"
            onClick={() => setStep(2)}
          >
            {currentContent.productSelection.next}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  const renderGroupDetails = () => {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">{currentContent.groupDetails.title}</h2>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full md:w-1/3 h-48 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{selectedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{selectedProduct.description}</p>
                  <div className="flex items-center mb-3">
                    <span className="font-bold text-lg">{selectedProduct.groupPrice} SAR</span>
                    <span className="text-muted-foreground line-through text-sm ml-2">{selectedProduct.retailPrice} SAR</span>
                    <span className="ml-2 bg-jam3a-purple text-white px-2 py-1 rounded-md text-xs font-medium">
                      {selectedProduct.discount} OFF
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">{currentContent.groupDetails.groupSize}</h3>
              <p className="text-sm text-muted-foreground mb-4">{currentContent.groupDetails.groupSizeDescription}</p>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">2</span>
                  <span className="font-medium">10</span>
                </div>
                <Slider 
                  value={[groupSize]} 
                  min={2} 
                  max={10} 
                  step={1} 
                  onValueChange={(value) => setGroupSize(value[0])}
                />
                <div className="text-center">
                  <span className="text-2xl font-bold text-jam3a-purple">{groupSize} people</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[3, 5, 8].map((size) => (
                    <Button 
                      key={size} 
                      variant={groupSize === size ? "default" : "outline"}
                      className={groupSize === size ? "bg-jam3a-purple" : ""}
                      onClick={() => setGroupSize(size)}
                    >
                      {size} people
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">{currentContent.groupDetails.timeLimit}</h3>
              <p className="text-sm text-muted-foreground mb-4">{currentContent.groupDetails.timeLimitDescription}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {currentContent.groupDetails.timeLimitOptions.map((option) => (
                  <Button 
                    key={option} 
                    variant={timeLimit === option ? "default" : "outline"}
                    className={timeLimit === option ? "bg-jam3a-purple" : ""}
                    onClick={() => setTimeLimit(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">{currentContent.groupDetails.visibility}</h3>
              <p className="text-sm text-muted-foreground mb-4">{currentContent.groupDetails.visibilityDescription}</p>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="public" 
                    checked={isPublic} 
                    onCheckedChange={setIsPublic}
                  />
                  <Label htmlFor="public">{currentContent.groupDetails.public}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="private" 
                    checked={!isPublic} 
                    onCheckedChange={(checked) => setIsPublic(!checked)}
                  />
                  <Label htmlFor="private">{currentContent.groupDetails.private}</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => setStep(1)}
          >
            {currentContent.groupDetails.back}
          </Button>
          <Button 
            className="bg-jam3a-purple hover:bg-jam3a-deep-purple"
            onClick={() => setStep(3)}
          >
            {currentContent.groupDetails.next}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  const renderReviewAndShare = () => {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">{currentContent.review.title}</h2>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full md:w-1/3 h-48 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{selectedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{selectedProduct.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">{currentContent.review.groupDetails}</h4>
                      <ul className="space-y-1">
                        <li className="flex justify-between">
                          <span>{currentContent.review.groupSize}:</span>
                          <span className="font-medium">{groupSize} people</span>
                        </li>
                        <li className="flex justify-between">
                          <span>{currentContent.review.timeLimit}:</span>
                          <span className="font-medium">{timeLimit}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>{currentContent.review.visibility}:</span>
                          <span className="font-medium">{isPublic ? currentContent.groupDetails.public : currentContent.groupDetails.private}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">{currentContent.review.pricing}</h4>
                      <ul className="space-y-1">
                        <li className="flex justify-between">
                          <span>{currentContent.review.retailPrice}:</span>
                          <span className="font-medium">{selectedProduct.retailPrice} SAR</span>
                        </li>
                        <li className="flex justify-between text-jam3a-purple">
                          <span>{currentContent.review.groupDiscount}:</span>
                          <span className="font-medium">-{selectedProduct.discount}</span>
                        </li>
                        <li className="flex justify-between font-bold">
                          <span>{currentContent.review.finalPrice}:</span>
                          <span>{selectedProduct.groupPrice} SAR</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">{currentContent.review.shareTitle}</h3>
              <p className="text-muted-foreground mb-6">{currentContent.review.shareDescription}</p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                  <span className="text-sm font-medium flex-1">https://jam3a.sa/j/ABC123</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCopyLink}
                  >
                    {linkCopied ? currentContent.review.linkCopied : currentContent.review.copyLink}
                  </Button>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">{currentContent.review.shareOptions}</h4>
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-green-500 hover:bg-green-600">
                      {currentContent.review.whatsapp}
                    </Button>
                    <Button className="flex-1 bg-blue-400 hover:bg-blue-500">
                      {currentContent.review.twitter}
                    </Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      {currentContent.review.facebook}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => setStep(2)}
          >
            {currentContent.review.back}
          </Button>
          <Button 
            className="bg-jam3a-purple hover:bg-jam3a-deep-purple"
            onClick={() => setStep(4)}
          >
            {currentContent.review.create}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  const renderSuccess = () => {
    return (
      <div className="text-center space-y-8 py-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-2">{currentContent.success.title}</h2>
          <p className="text-muted-foreground">{currentContent.success.description}</p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{currentContent.success.groupCode}</h3>
            <div className="text-3xl font-bold tracking-wide">JAM3A-ABC123</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button className="bg-jam3a-purple hover:bg-jam3a-deep-purple">
              <Share2 className="mr-2 h-4 w-4" />
              {currentContent.success.shareNow}
            </Button>
            <Button variant="outline">
              {currentContent.success.viewDetails}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex min-h-screen flex-col ${isRtl ? 'rtl' : 'ltr'}`}>
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-purple-50 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-2">{currentContent.title}</h1>
              <p className="text-xl text-muted-foreground">{currentContent.subtitle}</p>
              <p className="mt-4 max-w-2xl mx-auto">{currentContent.description}</p>
            </div>
            
            {step < 4 && renderStepIndicator()}
            
            <div className="max-w-4xl mx-auto">
              {step === 1 && renderProductSelection()}
              {step === 2 && renderGroupDetails()}
              {step === 3 && renderReviewAndShare()}
              {step === 4 && renderSuccess()}
            </div>
          </div>
        </section>
        
        {step < 4 && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {currentContent.steps.map((step, index) => (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-jam3a-purple text-white mb-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default StartJam3a;
