import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, LineChart, PieChart, Save, RefreshCw } from 'lucide-react';

const AnalyticsIntegration = () => {
  const [activeTab, setActiveTab] = useState("google");
  const { toast } = useToast();
  
  // Form states
  const [googleAnalytics, setGoogleAnalytics] = useState({
    measurementId: 'G-XXXXXXXXXX',
    enabled: true,
    trackPageViews: true,
    trackEvents: true,
    anonymizeIp: true
  });
  
  const [metaPixel, setMetaPixel] = useState({
    pixelId: '123456789012345',
    enabled: true,
    trackPageViews: true,
    trackEvents: true
  });
  
  const handleSaveGoogleAnalytics = () => {
    // In a real implementation, this would save to a database or API
    toast({
      title: "Google Analytics settings saved",
      description: "Your Google Analytics configuration has been updated.",
    });
  };
  
  const handleSaveMetaPixel = () => {
    // In a real implementation, this would save to a database or API
    toast({
      title: "Meta Pixel settings saved",
      description: "Your Meta Pixel configuration has been updated.",
    });
  };
  
  // Mock analytics data
  const mockAnalyticsData = {
    pageViews: 12487,
    uniqueVisitors: 5823,
    bounceRate: '42.3%',
    avgSessionDuration: '3m 12s',
    topPages: [
      { page: 'Homepage', views: 4521 },
      { page: 'iPhone 16 Pro Max', views: 2134 },
      { page: 'Samsung Galaxy S25', views: 1876 },
      { page: 'About Us', views: 982 },
      { page: 'FAQ', views: 745 }
    ],
    conversionRate: '3.8%',
    totalConversions: 221
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Analytics Integration</h2>
      </div>
      
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{mockAnalyticsData.pageViews.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <LineChart className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{mockAnalyticsData.uniqueVisitors.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <PieChart className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold">{mockAnalyticsData.conversionRate}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="google" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="google">Google Analytics</TabsTrigger>
          <TabsTrigger value="meta">Meta Pixel</TabsTrigger>
        </TabsList>
        
        {/* Google Analytics Tab */}
        <TabsContent value="google">
          <Card>
            <CardHeader>
              <CardTitle>Google Analytics Configuration</CardTitle>
              <CardDescription>Configure Google Analytics 4 for your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="ga-enabled" className="flex flex-col space-y-1">
                  <span>Enable Google Analytics</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Turn on to start collecting analytics data
                  </span>
                </Label>
                <Switch 
                  id="ga-enabled" 
                  checked={googleAnalytics.enabled}
                  onCheckedChange={(checked) => setGoogleAnalytics({...googleAnalytics, enabled: checked})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ga-measurement-id">Measurement ID</Label>
                <Input 
                  id="ga-measurement-id" 
                  value={googleAnalytics.measurementId} 
                  onChange={(e) => setGoogleAnalytics({...googleAnalytics, measurementId: e.target.value})}
                  placeholder="G-XXXXXXXXXX"
                />
                <p className="text-xs text-muted-foreground">
                  Find your Measurement ID in your Google Analytics property settings
                </p>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="font-medium">Tracking Options</h3>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="ga-track-pageviews" className="flex flex-col space-y-1">
                    <span>Track Page Views</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Automatically track when users view pages
                    </span>
                  </Label>
                  <Switch 
                    id="ga-track-pageviews" 
                    checked={googleAnalytics.trackPageViews}
                    onCheckedChange={(checked) => setGoogleAnalytics({...googleAnalytics, trackPageViews: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="ga-track-events" className="flex flex-col space-y-1">
                    <span>Track Events</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Track user interactions like button clicks and form submissions
                    </span>
                  </Label>
                  <Switch 
                    id="ga-track-events" 
                    checked={googleAnalytics.trackEvents}
                    onCheckedChange={(checked) => setGoogleAnalytics({...googleAnalytics, trackEvents: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="ga-anonymize-ip" className="flex flex-col space-y-1">
                    <span>Anonymize IP Addresses</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Enhance user privacy by anonymizing IP addresses
                    </span>
                  </Label>
                  <Switch 
                    id="ga-anonymize-ip" 
                    checked={googleAnalytics.anonymizeIp}
                    onCheckedChange={(checked) => setGoogleAnalytics({...googleAnalytics, anonymizeIp: checked})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGoogleAnalytics}>
                <Save className="h-4 w-4 mr-2" /> Save Configuration
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Meta Pixel Tab */}
        <TabsContent value="meta">
          <Card>
            <CardHeader>
              <CardTitle>Meta Pixel Configuration</CardTitle>
              <CardDescription>Configure Meta Pixel (formerly Facebook Pixel) for your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="meta-enabled" className="flex flex-col space-y-1">
                  <span>Enable Meta Pixel</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Turn on to start collecting data for Meta advertising
                  </span>
                </Label>
                <Switch 
                  id="meta-enabled" 
                  checked={metaPixel.enabled}
                  onCheckedChange={(checked) => setMetaPixel({...metaPixel, enabled: checked})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-pixel-id">Pixel ID</Label>
                <Input 
                  id="meta-pixel-id" 
                  value={metaPixel.pixelId} 
                  onChange={(e) => setMetaPixel({...metaPixel, pixelId: e.target.value})}
                  placeholder="123456789012345"
                />
                <p className="text-xs text-muted-foreground">
                  Find your Pixel ID in your Meta Business Manager
                </p>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="font-medium">Tracking Options</h3>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="meta-track-pageviews" className="flex flex-col space-y-1">
                    <span>Track Page Views</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Automatically track PageView events
                    </span>
                  </Label>
                  <Switch 
                    id="meta-track-pageviews" 
                    checked={metaPixel.trackPageViews}
                    onCheckedChange={(checked) => setMetaPixel({...metaPixel, trackPageViews: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="meta-track-events" className="flex flex-col space-y-1">
                    <span>Track Standard Events</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Track standard events like AddToCart, InitiateCheckout, and Purchase
                    </span>
                  </Label>
                  <Switch 
                    id="meta-track-events" 
                    checked={metaPixel.trackEvents}
                    onCheckedChange={(checked) => setMetaPixel({...metaPixel, trackEvents: checked})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveMetaPixel}>
                <Save className="h-4 w-4 mr-2" /> Save Configuration
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Analytics Data Preview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Analytics Overview</CardTitle>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh Data
            </Button>
          </div>
          <CardDescription>Last 30 days of website analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Performance Metrics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bounce Rate:</span>
                  <span className="font-medium">{mockAnalyticsData.bounceRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg. Session Duration:</span>
                  <span className="font-medium">{mockAnalyticsData.avgSessionDuration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Conversions:</span>
                  <span className="font-medium">{mockAnalyticsData.totalConversions}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Top Pages</h3>
              <div className="space-y-2">
                {mockAnalyticsData.topPages.map((page, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">{page.page}:</span>
                    <span className="font-medium">{page.views.toLocaleString()} views</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsIntegration;
