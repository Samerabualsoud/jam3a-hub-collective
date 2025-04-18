
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/components/Header';
import { ArrowRight, CheckCircle2, ShoppingBag, Users, Zap } from 'lucide-react';

const StartJam3a = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('smartphones');

  const content = {
    en: {
      title: "Start Your Own Jam3a",
      subtitle: "Create a group buying deal and invite others to join",
      steps: [
        {
          number: "01",
          title: "Choose Product",
          description: "Select from our curated products or request a custom item"
        },
        {
          number: "02",
          title: "Set Group Size",
          description: "Define how many people need to join for the deal to activate"
        },
        {
          number: "03",
          title: "Share & Save",
          description: "Invite friends and watch the savings grow as more people join"
        }
      ],
      categories: [
        {
          id: "smartphones",
          name: "Smartphones",
          icon: "📱"
        },
        {
          id: "laptops",
          name: "Laptops",
          icon: "💻"
        },
        {
          id: "audio",
          name: "Audio",
          icon: "🎧"
        },
        {
          id: "wearables",
          name: "Wearables",
          icon: "⌚"
        }
      ],
      popularProducts: {
        smartphones: [
          {
            id: 1,
            name: "iPhone 16 Pro Max 256GB",
            image: "https://placehold.co/600x400/e9d5ff/6b21a8?text=iPhone+16+Pro+Max",
            originalPrice: 4999,
            discountPrice: 4199,
            discount: "16%",
            minPeople: 5
          },
          {
            id: 2,
            name: "Samsung Galaxy S25 Ultra",
            image: "https://placehold.co/600x400/e9d5ff/6b21a8?text=Samsung+S25+Ultra",
            originalPrice: 4599,
            discountPrice: 3899,
            discount: "15%",
            minPeople: 6
          },
          {
            id: 3,
            name: "Galaxy Z Fold 6",
            image: "https://placehold.co/600x400/e9d5ff/6b21a8?text=Galaxy+Z+Fold+6",
            originalPrice: 6999,
            discountPrice: 5799,
            discount: "17%",
            minPeople: 7
          }
        ],
        laptops: [
          {
            id: 1,
            name: "MacBook Pro 16\" M3 Pro",
            image: "https://placehold.co/600x400/e9d5ff/6b21a8?text=MacBook+Pro",
            originalPrice: 9999,
            discountPrice: 8499,
            discount: "15%",
            minPeople: 5
          },
          {
            id: 2,
            name: "Dell XPS 15",
            image: "https://placehold.co/600x400/e9d5ff/6b21a8?text=Dell+XPS+15",
            originalPrice: 7999,
            discountPrice: 6799,
            discount: "15%",
            minPeople: 6
          }
        ],
        audio: [
          {
            id: 1,
            name: "AirPods Pro 2",
            image: "https://placehold.co/600x400/e9d5ff/6b21a8?text=AirPods+Pro+2",
            originalPrice: 999,
            discountPrice: 799,
            discount: "20%",
            minPeople: 8
          }
        ],
        wearables: [
          {
            id: 1,
            name: "Apple Watch Ultra 2",
            image: "https://placehold.co/600x400/e9d5ff/6b21a8?text=Apple+Watch+Ultra",
            originalPrice: 3499,
            discountPrice: 2999,
            discount: "14%",
            minPeople: 7
          }
        ]
      },
      benefits: [
        {
          title: "Group Discount",
          description: "Get better prices when more people join your Jam3a"
        },
        {
          title: "No Risk Shopping",
          description: "You only pay when the group is complete"
        },
        {
          title: "Verified Authentic Products",
          description: "All products are sourced from authorized retailers"
        }
      ],
      requestProduct: "Can't find what you're looking for?",
      requestButtonText: "Request Custom Product",
      viewAllProducts: "View All Products"
    },
    ar: {
      title: "ابدأ جمعتك الخاصة",
      subtitle: "أنشئ صفقة شراء جماعية وادعُ الآخرين للانضمام",
      steps: [
        {
          number: "٠١",
          title: "اختر المنتج",
          description: "اختر من منتجاتنا المنتقاة أو اطلب عنصرًا مخصصًا"
        },
        {
          number: "٠٢",
          title: "حدد حجم المجموعة",
          description: "حدد عدد الأشخاص الذين يحتاجون للانضمام لتفعيل العرض"
        },
        {
          number: "٠٣",
          title: "شارك ووفر",
          description: "ادعُ الأصدقاء وشاهد التوفير يزداد مع انضمام المزيد من الأشخاص"
        }
      ],
      categories: [
        {
          id: "smartphones",
          name: "الهواتف الذكية",
          icon: "📱"
        },
        {
          id: "laptops",
          name: "أجهزة الكمبيوتر المحمولة",
          icon: "💻"
        },
        {
          id: "audio",
          name: "الصوتيات",
          icon: "🎧"
        },
        {
          id: "wearables",
          name: "الأجهزة القابلة للارتداء",
          icon: "⌚"
        }
      ],
      popularProducts: {
        smartphones: [
          {
            id: 1,
            name: "آيفون 16 برو ماكس 256 جيجابايت",
            image: "https://placehold.co/600x400/e9d5ff/6b21a8?text=iPhone+16+Pro+Max",
            originalPrice: 4999,
            discountPrice: 4199,
            discount: "16%",
            minPeople: 5
          },
          {
            id: 2,
            name: "سامسونج جالاكسي S25 ألترا",
            image: "https://placehold.co/600x400/e9d5ff/6b21a8?text=Samsung+S25+Ultra",
            originalPrice: 4599,
            discountPrice: 3899,
            discount: "15%",
            minPeople: 6
          },
          {
            id: 3,
            name: "جالاكسي Z فولد 6",
            image: "https://placehold.co/600x400/e9d5ff/6b21a8?text=Galaxy+Z+Fold+6",
            originalPrice: 6999,
            discountPrice: 5799,
            discount: "17%",
            minPeople: 7
          }
        ],
        laptops: [
          {
            id: 1,
            name: "ماك بوك برو 16 بوصة M3 برو",
            image: "https://placehold.co/600x400/e9d5ff/6b21a8?text=MacBook+Pro",
            originalPrice: 9999,
            discountPrice: 8499,
            discount: "15%",
            minPeople: 5
          },
          {
            id: 2,
            name: "ديل إكس بي إس 15",
            image: "https://placehold.co/600x400/e9d5ff/6b21a8?text=Dell+XPS+15",
            originalPrice: 7999,
            discountPrice: 6799,
            discount: "15%",
            minPeople: 6
          }
        ],
        audio: [
          {
            id: 1,
            name: "إيربودز برو 2",
            image: "https://placehold.co/600x400/e9d5ff/6b21a8?text=AirPods+Pro+2",
            originalPrice: 999,
            discountPrice: 799,
            discount: "20%",
            minPeople: 8
          }
        ],
        wearables: [
          {
            id: 1,
            name: "ساعة أبل ألترا 2",
            image: "https://placehold.co/600x400/e9d5ff/6b21a8?text=Apple+Watch+Ultra",
            originalPrice: 3499,
            discountPrice: 2999,
            discount: "14%",
            minPeople: 7
          }
        ]
      },
      benefits: [
        {
          title: "خصم جماعي",
          description: "احصل على أسعار أفضل عندما ينضم المزيد من الأشخاص إلى جمعتك"
        },
        {
          title: "تسوق بدون مخاطر",
          description: "تدفع فقط عندما تكتمل المجموعة"
        },
        {
          title: "منتجات أصلية موثقة",
          description: "جميع المنتجات مصدرها من تجار معتمدين"
        }
      ],
      requestProduct: "لا تجد ما تبحث عنه؟",
      requestButtonText: "طلب منتج مخصص",
      viewAllProducts: "عرض جميع المنتجات"
    }
  };

  const currentContent = content[language];
  const currentProducts = currentContent.popularProducts[selectedCategory] || [];

  const ProductCard = ({ product }) => (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-all">
      <div className="aspect-video bg-gray-100 relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-royal-blue text-white text-sm font-medium px-3 py-1 rounded-full">
          {product.discount} OFF
        </div>
      </div>
      <CardContent className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-3">{product.name}</h3>
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-xl font-bold text-royal-blue">{product.discountPrice} SAR</span>
            <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice} SAR</span>
          </div>
          <div className="text-sm text-muted-foreground bg-royal-blue-50 px-2 py-1 rounded-full">
            {language === 'en' ? `Min ${product.minPeople} people` : `الحد الأدنى ${product.minPeople} أشخاص`}
          </div>
        </div>
        <div className="mt-auto">
          <Button 
            variant="green"
            size="wide" 
            className="group"
            asChild
          >
            <Link to={`/join-jam3a?product=${encodeURIComponent(product.name)}&price=${product.discountPrice} SAR&discount=${product.discount}&category=${encodeURIComponent(selectedCategory)}`} className="flex items-center justify-center">
              {language === 'en' ? 'Start Jam3a' : 'ابدأ جمعة'}
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-royal-blue to-royal-blue-dark py-16 px-4">
          <div className="container mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {currentContent.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {currentContent.subtitle}
            </p>
            
            {/* Process Steps */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
              {currentContent.steps.map((step, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                  <div className="text-3xl font-bold text-royal-blue-light mb-3">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-white/80">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Selection Section */}
        <section className="py-16 px-4 bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {language === 'en' ? 'Select a Product to Start Your Jam3a' : 'اختر منتجًا لبدء جمعتك'}
            </h2>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {currentContent.categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-5 py-3 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-royal-blue text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Products */}
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="text-center mt-8 space-y-4">
              <p className="text-gray-600">{currentContent.requestProduct}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" className="border-royal-blue text-royal-blue hover:bg-royal-blue-50">
                  {currentContent.requestButtonText}
                </Button>
                <Link to="/shop-all-deals">
                  <Button variant="green" className="text-white flex items-center gap-2 group">
                    {currentContent.viewAllProducts}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-royal-blue-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {language === 'en' ? 'Why Start a Jam3a?' : 'لماذا تبدأ جمعة؟'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {currentContent.benefits.map((benefit, index) => (
                <Card key={index} className="border-2 border-royal-blue/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-royal-blue/10 mr-4">
                        <CheckCircle2 className="h-6 w-6 text-royal-blue" />
                      </div>
                      <h3 className="text-xl font-semibold">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default StartJam3a;
