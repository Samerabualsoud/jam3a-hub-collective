
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from "react-hook-form";
import { Clock, Lock, Bell } from "lucide-react";

interface GroupDetailsFormProps {
  initialValues: {
    groupSize: number;
    duration: number;
    isPublic: boolean;
    paymentType: string;
    notificationPreference: string;
  };
  onValuesChange: (values: any) => void;
  maxGroupSize: number;
  product: any;
}

const GroupDetailsForm = ({ initialValues, onValuesChange, maxGroupSize, product }: GroupDetailsFormProps) => {
  const { language } = useLanguage();

  // Make sure paymentType is always 'upfront'
  const modifiedInit = { ...initialValues, paymentType: "upfront" };
  const form = useForm({
    defaultValues: modifiedInit
  });

  const watchAllFields = form.watch();

  React.useEffect(() => {
    onValuesChange({ ...watchAllFields, paymentType: "upfront" });
    // eslint-disable-next-line
  }, [watchAllFields, onValuesChange]);

  const content = {
    en: {
      title: "Configure Your Jam3a",
      description: "Set up your group buying experience",
      groupSize: {
        label: "Group Size",
        description: "How many people would you like in your group?",
      },
      duration: {
        label: "Duration",
        description: "How long will your Jam3a be open for joining?",
        options: ["24 hours", "3 days", "7 days", "14 days"]
      },
      visibility: {
        label: "Visibility",
        description: "Who can see and join your Jam3a?",
        public: "Public - Anyone can discover and join",
        private: "Private - Only people with your link can join"
      },
      notifications: {
        label: "Notifications",
        description: "Get notified about your Jam3a activity",
        email: "Email",
        push: "Push notifications",
        sms: "SMS"
      },
      pricePreview: {
        title: "Price Preview",
        original: "Original Price:",
        discounted: "Jam3a Price:",
        savings: "Your Savings:",
        message: "The more people join, the more you save!"
      },
      upfrontLabel: "Pay upfront (required)"
    },
    ar: {
      title: "تكوين الجمعة الخاصة بك",
      description: "إعداد تجربة الشراء الجماعي",
      groupSize: {
        label: "حجم المجموعة",
        description: "كم عدد الأشخاص الذين تريدهم في مجموعتك؟",
      },
      duration: {
        label: "المدة",
        description: "ما هي المدة التي ستظل فيها الجمعة الخاصة بك مفتوحة للانضمام؟",
        options: ["24 ساعة", "3 أيام", "7 أيام", "14 يوم"]
      },
      visibility: {
        label: "الرؤية",
        description: "من يمكنه رؤية جمعتك والانضمام إليها؟",
        public: "عام - يمكن لأي شخص اكتشافها والانضمام إليها",
        private: "خاص - فقط الأشخاص الذين لديهم رابطك يمكنهم الانضمام"
      },
      notifications: {
        label: "الإشعارات",
        description: "الحصول على إشعارات حول نشاط الجمعة الخاصة بك",
        email: "البريد الإلكتروني",
        push: "إشعارات الدفع",
        sms: "الرسائل القصيرة"
      },
      pricePreview: {
        title: "معاينة السعر",
        original: "السعر الأصلي:",
        discounted: "سعر الجمعة:",
        savings: "توفيرك:",
        message: "كلما انضم المزيد من الأشخاص، كلما وفرت أكثر!"
      },
      upfrontLabel: "الدفع مقدمًا (إجباري)"
    }
  };

  // Find current discount based on group size
  const currentDiscount = product?.discounts?.find(
    (d: any) => watchAllFields.groupSize >= d.minCount
  ) || { price: product?.price, savings: "0%" };

  const originalPrice = product?.price || 0;
  const discountedPrice = currentDiscount.price;
  const savings = originalPrice - discountedPrice;
  const savingsPercentage = (originalPrice > 0) ? (savings / originalPrice * 100).toFixed(0) : "0";

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">{content[language].title}</h2>
        <p className="text-muted-foreground mt-2">{content[language].description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-md border-2 border-royal-blue/10">
            <CardContent className="p-6">
              <Form {...form}>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="groupSize"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <div className="flex justify-between">
                          <FormLabel>{content[language].groupSize.label}</FormLabel>
                          <span className="text-royal-blue font-medium">{field.value} people</span>
                        </div>
                        <FormControl>
                          <Slider
                            min={2}
                            max={maxGroupSize}
                            step={1}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="py-4"
                          />
                        </FormControl>
                        <FormDescription>
                          {content[language].groupSize.description}
                        </FormDescription>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>2</span>
                          <span>{maxGroupSize}</span>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-royal-blue" />
                          <FormLabel>{content[language].duration.label}</FormLabel>
                        </div>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value.toString()}
                          className="grid grid-cols-2 gap-2"
                        >
                          {content[language].duration.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <RadioGroupItem value={(index + 1).toString()} id={`duration-${index}`} />
                              <Label htmlFor={`duration-${index}`}>{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                        <FormDescription>
                          {content[language].duration.description}
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isPublic"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-royal-blue" />
                            <FormLabel>{content[language].visibility.label}</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </div>
                        <FormDescription>
                          {field.value
                            ? content[language].visibility.public
                            : content[language].visibility.private}
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  {/* Remove paymentType radio/selection and just display single label */}
                  <div className="space-y-2 flex items-center gap-2">
                    <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" className="h-4 w-4 text-royal-blue" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M2 10h20" stroke="currentColor" strokeWidth="2"/><path d="M6 16h.01" stroke="currentColor" strokeWidth="2"/></svg>
                    <span className="font-semibold text-royal-blue">
                      {content[language].upfrontLabel}
                    </span>
                  </div>

                  <FormField
                    control={form.control}
                    name="notificationPreference"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-royal-blue" />
                          <FormLabel>{content[language].notifications.label}</FormLabel>
                        </div>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 gap-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="email" />
                            <Label htmlFor="email">{content[language].notifications.email}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="push" id="push" />
                            <Label htmlFor="push">{content[language].notifications.push}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sms" id="sms" />
                            <Label htmlFor="sms">{content[language].notifications.sms}</Label>
                          </div>
                        </RadioGroup>
                        <FormDescription>
                          {content[language].notifications.description}
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gradient-to-br from-royal-blue-50 to-white shadow-md border-2 border-royal-blue/10">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">{content[language].pricePreview.title}</h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{content[language].pricePreview.original}</span>
                  <span>{originalPrice} SAR</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-royal-blue font-medium">{content[language].pricePreview.discounted}</span>
                  <span className="text-royal-blue font-bold">{discountedPrice} SAR</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-green-600">{content[language].pricePreview.savings}</span>
                  <span className="text-green-600 font-bold">{savings} SAR ({savingsPercentage}%)</span>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                  <p className="text-sm italic">{content[language].pricePreview.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailsForm;
