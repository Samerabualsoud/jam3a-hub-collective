
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseApi } from "@/lib/supabase/api";
import {
  PlusCircle,
  ImagePlus,
  Save,
  Trash2,
  Edit,
  Eye,
  Layout,
  FileText,
  Palette,
  Component
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for content items
const mockBanners = [
  { id: 1, title: 'Welcome Banner', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80', active: true },
  { id: 2, title: 'Summer Sale', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1600&q=80', active: false },
  { id: 3, title: 'New Products', image: 'https://images.unsplash.com/photo-1615380547903-c456276b7702?auto=format&fit=crop&w=1600&q=80', active: false },
];

const mockPages = [
  { id: 1, title: 'About Us', slug: 'about', lastUpdated: '2025-03-28' },
  { id: 2, title: 'FAQ', slug: 'faq', lastUpdated: '2025-03-29' },
  { id: 3, title: 'Terms of Service', slug: 'terms', lastUpdated: '2025-03-30' },
  { id: 4, title: 'Privacy Policy', slug: 'privacy', lastUpdated: '2025-03-30' },
];

const mockFAQs = [
  { id: 1, question: 'What is Jam3a?', answer: 'Jam3a is a social shopping platform where people team up to get better prices on products.' },
  { id: 2, question: 'How does a Jam3a deal work?', answer: 'A Jam3a starts when someone selects a product and shares it with others. Once enough people join the deal within a set time, everyone gets the discounted price.' },
  { id: 3, question: 'Can I start my own Jam3a?', answer: 'Yes! You can start your own Jam3a by picking a product, setting the group size, and inviting others to join.' },
];

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState("sections");
  const [selectedBanner, setSelectedBanner] = useState<any>(null);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [selectedFAQ, setSelectedFAQ] = useState<any>(null);
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [contentSections, setContentSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const api = useSupabaseApi();

  // Form states
  const [bannerForm, setBannerForm] = useState({
    title: '',
    image: '',
    active: false,
    link: '',
  });

  const [pageForm, setPageForm] = useState({
    title: '',
    slug: '',
    content: '',
  });

  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
  });

  const [sectionForm, setSectionForm] = useState({
    name: '',
    content: '',
    path: '',
  });

  useEffect(() => {
    loadContentSections();
  }, []);

  const loadContentSections = async () => {
    setLoading(true);
    try {
      const sections = await api.getContentSections();
      setContentSections(sections);
    } catch (error) {
      toast({
        title: "Error loading content sections",
        description: "Failed to load website sections. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getIconForContentType = (type) => {
    switch (type) {
      case 'page': return <FileText className="h-5 w-5" />;
      case 'section': return <Layout className="h-5 w-5" />;
      case 'component': return <Component className="h-5 w-5" />;
      default: return <Palette className="h-5 w-5" />;
    }
  };

  const handleBannerSelect = (banner: any) => {
    setSelectedBanner(banner);
    setBannerForm({
      title: banner.title,
      image: banner.image,
      active: banner.active,
      link: banner.link || '',
    });
    setIsEditing(true);
  };

  const handlePageSelect = (page: any) => {
    setSelectedPage(page);
    setPageForm({
      title: page.title,
      slug: page.slug,
      content: 'This is the content for ' + page.title + '. In a real implementation, this would be loaded from a database or CMS.',
    });
    setIsEditing(true);
  };

  const handleFAQSelect = (faq: any) => {
    setSelectedFAQ(faq);
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
    });
    setIsEditing(true);
  };

  const handleSectionSelect = (section: any) => {
    setSelectedSection(section);
    setSectionForm({
      name: section.name,
      path: section.path,
      content: `Content for the ${section.name} section. This would be loaded from database in a real implementation.`,
    });
    setIsEditing(true);
  };

  const handleNewItem = () => {
    setIsEditing(true);
    if (activeTab === 'banners') {
      setSelectedBanner(null);
      setBannerForm({
        title: '',
        image: '',
        active: false,
        link: '',
      });
    } else if (activeTab === 'pages') {
      setSelectedPage(null);
      setPageForm({
        title: '',
        slug: '',
        content: '',
      });
    } else if (activeTab === 'faqs') {
      setSelectedFAQ(null);
      setFaqForm({
        question: '',
        answer: '',
      });
    } else if (activeTab === 'sections') {
      setSelectedSection(null);
      setSectionForm({
        name: '',
        content: '',
        path: '/',
      });
    }
  };

  const handleSave = () => {
    // In a real implementation, this would save to a database or API
    toast({
      title: "Content saved",
      description: "Your changes have been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedBanner(null);
    setSelectedPage(null);
    setSelectedFAQ(null);
    setSelectedSection(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Content Management</h2>
        {!isEditing && (
          <Button onClick={handleNewItem}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New
          </Button>
        )}
      </div>

      <Tabs defaultValue="sections" value={activeTab} onValueChange={(value) => {
        setActiveTab(value);
        setIsEditing(false);
        setSelectedBanner(null);
        setSelectedPage(null);
        setSelectedFAQ(null);
        setSelectedSection(null);
      }} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sections">Website Sections</TabsTrigger>
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        {/* Website Sections Tab */}
        <TabsContent value="sections">
          {!isEditing ? (
            <div className="space-y-4">
              {loading ? (
                <Card>
                  <CardContent className="flex justify-center p-6">
                    <p>Loading sections...</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contentSections.map((section) => (
                    <Card key={section.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          {getIconForContentType(section.type)}
                          <CardTitle className="text-lg">{section.name}</CardTitle>
                        </div>
                        <CardDescription>
                          {section.type === 'page' ? 'Full Page' : 
                           section.type === 'section' ? 'Content Section' : 'UI Component'}
                          {section.path !== '*' && ` - Path: ${section.path}`}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-2 pb-4">
                        <div className="flex justify-between w-full">
                          <div className="text-sm text-muted-foreground">
                            Last updated: {section.lastUpdated}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleSectionSelect(section)}>
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" /> Preview
                            </Button>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{selectedSection ? `Edit ${selectedSection.name}` : 'Add New Section'}</CardTitle>
                <CardDescription>Manage website sections and components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="section-name">Section Name</Label>
                  <Input 
                    id="section-name" 
                    value={sectionForm.name} 
                    onChange={(e) => setSectionForm({...sectionForm, name: e.target.value})}
                    placeholder="Enter section name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="section-path">Path</Label>
                  <Input 
                    id="section-path" 
                    value={sectionForm.path} 
                    onChange={(e) => setSectionForm({...sectionForm, path: e.target.value})}
                    placeholder="Enter path (e.g., / or /about)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="section-type">Section Type</Label>
                  <Select defaultValue="section">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="section">Content Section</SelectItem>
                      <SelectItem value="page">Full Page</SelectItem>
                      <SelectItem value="component">UI Component</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="section-content">Content</Label>
                  <Textarea 
                    id="section-content" 
                    value={sectionForm.content} 
                    onChange={(e) => setSectionForm({...sectionForm, content: e.target.value})}
                    placeholder="Enter section content or HTML"
                    className="min-h-[200px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" /> Save Section
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        {/* Banners Tab */}
        <TabsContent value="banners">
          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockBanners.map((banner) => (
                <Card key={banner.id} className="overflow-hidden">
                  <div className="relative h-40">
                    <img 
                      src={banner.image} 
                      alt={banner.title} 
                      className="w-full h-full object-cover"
                    />
                    {banner.active && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                        Active
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{banner.title}</CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleBannerSelect(banner)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{selectedBanner ? 'Edit Banner' : 'Add New Banner'}</CardTitle>
                <CardDescription>Manage homepage and promotional banners</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="banner-title">Banner Title</Label>
                  <Input 
                    id="banner-title" 
                    value={bannerForm.title} 
                    onChange={(e) => setBannerForm({...bannerForm, title: e.target.value})}
                    placeholder="Enter banner title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="banner-image">Banner Image URL</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="banner-image" 
                      value={bannerForm.image} 
                      onChange={(e) => setBannerForm({...bannerForm, image: e.target.value})}
                      placeholder="Enter image URL or upload"
                      className="flex-1"
                    />
                    <Button variant="outline">
                      <ImagePlus className="h-4 w-4 mr-1" /> Upload
                    </Button>
                  </div>
                </div>
                
                {bannerForm.image && (
                  <div className="border rounded-md overflow-hidden h-40 mt-2">
                    <img 
                      src={bannerForm.image} 
                      alt="Banner preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="banner-link">Link URL (optional)</Label>
                  <Input 
                    id="banner-link" 
                    value={bannerForm.link} 
                    onChange={(e) => setBannerForm({...bannerForm, link: e.target.value})}
                    placeholder="Enter URL for banner link"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="banner-active"
                    checked={bannerForm.active}
                    onChange={(e) => setBannerForm({...bannerForm, active: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="banner-active">Set as active</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" /> Save Banner
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        {/* Pages Tab */}
        <TabsContent value="pages">
          {!isEditing ? (
            <div className="space-y-4">
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockPages.map((page) => (
                      <tr key={page.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{page.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{page.slug}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{page.lastUpdated}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Button variant="ghost" size="sm" className="mr-2" onClick={() => handlePageSelect(page)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{selectedPage ? 'Edit Page' : 'Add New Page'}</CardTitle>
                <CardDescription>Manage website pages and content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="page-title">Page Title</Label>
                  <Input 
                    id="page-title" 
                    value={pageForm.title} 
                    onChange={(e) => setPageForm({...pageForm, title: e.target.value})}
                    placeholder="Enter page title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="page-slug">Page Slug</Label>
                  <Input 
                    id="page-slug" 
                    value={pageForm.slug} 
                    onChange={(e) => setPageForm({...pageForm, slug: e.target.value})}
                    placeholder="Enter page slug (e.g., about-us)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="page-content">Page Content</Label>
                  <Textarea 
                    id="page-content" 
                    value={pageForm.content} 
                    onChange={(e) => setPageForm({...pageForm, content: e.target.value})}
                    placeholder="Enter page content"
                    className="min-h-[200px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" /> Save Page
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs">
          {!isEditing ? (
            <div className="space-y-4">
              {mockFAQs.map((faq) => (
                <Card key={faq.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{faq.answer}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleFAQSelect(faq)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{selectedFAQ ? 'Edit FAQ' : 'Add New FAQ'}</CardTitle>
                <CardDescription>Manage frequently asked questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="faq-question">Question</Label>
                  <Input 
                    id="faq-question" 
                    value={faqForm.question} 
                    onChange={(e) => setFaqForm({...faqForm, question: e.target.value})}
                    placeholder="Enter question"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="faq-answer">Answer</Label>
                  <Textarea 
                    id="faq-answer" 
                    value={faqForm.answer} 
                    onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})}
                    placeholder="Enter answer"
                    className="min-h-[150px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" /> Save FAQ
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;
