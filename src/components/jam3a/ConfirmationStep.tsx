
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, CheckCircle, Users, Calendar, Copy, Share2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/hooks/useJam3aCreation';

interface ConfirmationStepProps {
  product: Product | null;
  groupSize: number;
  duration: number;
  isPublic: boolean;
  paymentType: string;
  onShare: () => void;
  isStartingJam3a?: boolean;
}

const ConfirmationStep = ({ 
  product, 
  groupSize, 
  duration, 
  isPublic, 
  paymentType, 
  onShare,
  isStartingJam3a = true
}: ConfirmationStepProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [shareUrl] = React.useState(`https://jam3a.app/join/${Math.random().toString(36).substring(2, 8)}`);
  
  const getDurationText = (duration: number) => {
    const options = {
      en: ["24 hours", "3 days", "7 days", "14 days"],
      ar: ["24 ساعة", "3 أيام", "7 أيام", "14 يوم"]
    };
    return options[language][duration - 1] || options[language][0];
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: language === 'en' ? "Link copied" : "تم نسخ الرابط",
      description: language === 'en' ? "Share it with your friends" : "شاركه مع أصدقائك",
    });
  };
  
  const content = {
    en: {
      title: isStartingJam3a ? "Your Jam3a is Ready!" : "Confirm Joining Jam3a",
      description: isStartingJam3a 
        ? "Share with friends and start saving together" 
        : "Review the details before joining this group",
      summary: {
        title: "Summary",
        product: "Product",
        groupSize: "Group Size",
        duration: "Duration",
        visibility: "Visibility",
        payment: "Payment",
        public: "Public",
        private: "Private",
        upfront: "Pay Upfront",
        completion: "Pay on Completion"
      },
      shareTitle: "Share with Friends",
      shareDescription: "The more friends join, the more everyone saves!",
      copyLink: "Copy Link",
      shareNow: "Share Now",
      benefits: [
        "Group discounts up to 25% off retail",
        "Safe and secure transactions",
        "Track your savings in real-time",
        "Cancel anytime before group completes"
      ],
      joinNow: "Join Now",
      startNow: "Start Jam3a"
    },
    ar: {
      title: isStartingJam3a ? "جمعتك جاهزة!" : "تأكيد الانضمام للجمعة",
      description: isStartingJam3a 
        ? "شارك مع الأصدقاء وابدأ التوفير معًا" 
        : "راجع التفاصيل قبل الانضمام إلى هذه المجموعة",
      summary: {
        title: "الملخص",
        product: "المنتج",
        groupSize: "حجم المجموعة",
        duration: "المدة",
        visibility: "الرؤية",
        payment: "الدفع",
        public: "عام",
        private: "خاص",
        upfront: "الدفع مقدمًا",
        completion: "الدفع عند الاكتمال"
      },
      shareTitle: "شارك مع الأصدقاء",
      shareDescription: "كلما انضم المزيد من الأصدقاء، كلما وفر الجميع أكثر!",
      copyLink: "نسخ الرابط",
      shareNow: "شارك الآن",
      benefits: [
        "خصومات جماعية تصل إلى 25% من سعر التجزئة",
        "معاملات آمنة ومضمونة",
        "تتبع التوفير في الوقت الحقيقي",
        "إلغاء في أي وقت قبل اكتمال المجموعة"
      ],
      joinNow: "انضم الآن",
      startNow: "ابدأ الجمعة"
    }
  };

  // Current discount based on group size
  const currentDiscount = product?.discounts?.find(d => groupSize >= d.minCount);
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">{content[language].title}</h2>
        <p className="text-muted-foreground mt-2">{content[language].description}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-4">{content[language].summary.title}</h3>
            
            {product && (
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <div className="flex items-baseline gap-2">
                    <p className="text-royal-blue font-bold">{currentDiscount?.price || product.price} SAR</p>
                    {currentDiscount && (
                      <p className="text-sm text-muted-foreground line-through">{product.price} SAR</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-3 divide-y">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">{content[language].summary.groupSize}</span>
                <span className="font-medium flex items-center">
                  <Users className="h-4 w-4 mr-1 text-royal-blue" />
                  {groupSize} people
                </span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">{content[language].summary.duration}</span>
                <span className="font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-royal-blue" />
                  {getDurationText(duration)}
                </span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">{content[language].summary.visibility}</span>
                <span className="font-medium">
                  {isPublic ? content[language].summary.public : content[language].summary.private}
                </span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">{content[language].summary.payment}</span>
                <span className="font-medium">
                  {paymentType === "upfront" ? content[language].summary.upfront : content[language].summary.completion}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {isStartingJam3a && (
          <Card className="bg-gradient-to-br from-royal-blue-50 to-white">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{content[language].shareTitle}</h3>
                <p className="text-muted-foreground">{content[language].shareDescription}</p>
                
                <div className="flex items-center gap-2 bg-white rounded-md border p-2">
                  <div className="flex-1 truncate text-sm p-2">
                    {shareUrl}
                  </div>
                  <Button variant="outline" size="sm" onClick={handleCopyLink}>
                    <Copy className="h-4 w-4 mr-2" />
                    {content[language].copyLink}
                  </Button>
                </div>
                
                <Button onClick={onShare} variant="green" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  {content[language].shareNow}
                </Button>
                
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium mb-2">Benefits:</h4>
                  <ul className="space-y-2">
                    {content[language].benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {!isStartingJam3a && (
        <Button variant="green" className="w-full max-w-md mx-auto py-6 text-lg">
          {content[language].joinNow}
        </Button>
      )}
    </div>
  );
};

export default ConfirmationStep;
