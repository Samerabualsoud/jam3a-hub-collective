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
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
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
  Component,
  AlertTriangle
} from 'lucide-react';

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState("sections");
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const api = useSupabaseApi();
  const { supabaseClient } = useSessionContext();

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
    type: 'section'
  });

  const { 
    data: contentSections = [], 
    isLoading: sectionsLoading, 
    error: sectionsError,
    refetch: refetchSections
  } = useQuery({
    queryKey: ['content-sections'],
    queryFn: async () => {
      try {
        const { data, error } = await supabaseClient
          .from('content_sections')
          .select('*');
        
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error("Error fetching content sections:", error);
        return [];
      }
    }
  });

  const { 
    data: banners = [], 
    isLoading: bannersLoading,
    refetch: refetchBanners
  } = useQuery({
    queryKey: ['content-banners'],
    queryFn: async () => {
      try {
        const { data, error } = await supabaseClient
          .from('banners')
          .select('*');
        
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error("Error fetching banners:", error);
        return [];
      }
    }
  });

  const { 
    data: pages = [], 
    isLoading: pagesLoading,
    refetch: refetchPages
  } = useQuery({
    queryKey: ['content-pages'],
    queryFn: async () => {
      try {
        const { data, error } = await supabaseClient
          .from('pages')
          .select('*');
        
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error("Error fetching pages:", error);
        return [];
      }
    }
  });

  const { 
    data: faqs = [], 
    isLoading: faqsLoading,
    refetch: refetchFaqs
  } = useQuery({
    queryKey: ['content-faqs'],
    queryFn: async () => {
      try {
        const { data, error } = await supabaseClient
          .from('faqs')
          .select('*');
        
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        return [];
      }
    }
  });

  const getIconForContentType = (type) => {
    switch (type) {
      case 'page': return <FileText className="h-5 w-5" />;
      case 'section': return <Layout className="h-5 w-5" />;
      case 'component': return <Component className="h-5 w-5" />;
      default: return <Palette className="h-5 w-5" />;
    }
  };

  const handleBannerSelect = (banner) => {
    setSelectedBanner(banner);
    setBannerForm({
      title: banner.title,
      image: banner.image_url || '',
      active: banner.active || false,
      link: banner.link || '',
    });
    setIsEditing(true);
  };

  const handlePageSelect = (page) => {
    setSelectedPage(page);
    setPageForm({
      title: page.title,
      slug: page.slug,
      content: page.content || '',
    });
    setIsEditing(true);
  };

  const handleFAQSelect = (faq) => {
    setSelectedFAQ(faq);
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
    });
    setIsEditing(true);
  };

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setSectionForm({
      name: section.name,
      path: section.path || '/',
      content: section.content || '',
      type: section.type || 'section'
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
        type: 'section'
      });
    }
  };

  const handleSave = async () => {
    try {
      if (activeTab === 'sections') {
        if (selectedSection) {
          const { error } = await supabaseClient
            .from('content_sections')
            .update({
              name: sectionForm.name,
              path: sectionForm.path,
              content: sectionForm.content,
              type: sectionForm.type,
              updated_at: new Date().toISOString()
            })
            .eq('id', selectedSection.id);
          
          if (error) throw error;
        } else {
          const { error } = await supabaseClient
            .from('content_sections')
            .insert({
              name: sectionForm.name,
              path: sectionForm.path,
              content: sectionForm.content,
              type: sectionForm.type,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
          
          if (error) throw error;
        }
        refetchSections();
      } else if (activeTab === 'banners') {
        if (selectedBanner) {
          const { error } = await supabaseClient
            .from('banners')
            .update({
              title: bannerForm.title,
              image_url: bannerForm.image,
              active: bannerForm.active,
              link: bannerForm.link,
              updated_at: new Date().toISOString()
            })
            .eq('id', selectedBanner.id);
          
          if (error) throw error;
        } else {
          const { error } = await supabaseClient
            .from('banners')
            .insert({
              title: bannerForm.title,
              image_url: bannerForm.image,
              active: bannerForm.active,
              link: bannerForm.link,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
          
          if (error) throw error;
        }
        refetchBanners();
      } else if (activeTab === 'pages') {
        if (selectedPage) {
          const { error } = await supabaseClient
            .from('pages')
            .update({
              title: pageForm.title,
              slug: pageForm.slug,
              content: pageForm.content,
              updated_at: new Date().toISOString()
            })
            .eq('id', selectedPage.id);
          
          if (error) throw error;
        } else {
          const { error } = await supabaseClient
            .from('pages')
            .insert({
              title: pageForm.title,
              slug: pageForm.slug,
              content: pageForm.content,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
          
          if (error) throw error;
        }
        refetchPages();
      } else if (activeTab === 'faqs') {
        if (selectedFAQ) {
          const { error } = await supabaseClient
            .from('faqs')
            .update({
              question: faqForm.question,
              answer: faqForm.answer,
              updated_at: new Date().toISOString()
            })
            .eq('id', selectedFAQ.id);
          
          if (error) throw error;
        } else {
          const { error } = await supabaseClient
            .from('faqs')
            .insert({
              question: faqForm.question,
              answer: faqForm.answer,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
          
          if (error) throw error;
        }
        refetchFaqs();
      }
      
      toast({
        title: "Content saved",
        description: "Your changes have been saved successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Error",
        description: "Failed to save content. The content table might not exist in the database.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedBanner(null);
    setSelectedPage(null);
    setSelectedFAQ(null);
    setSelectedSection(null);
  };

  const isLoading = sectionsLoading || bannersLoading || pagesLoading || faqsLoading;
  const noTablesExist = 
    contentSections.length === 0 && 
    banners.length === 0 && 
    pages.length === 0 && 
    faqs.length === 0;

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

      {noTablesExist && !isLoading && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 text-amber-600 mb-4">
              <AlertTriangle />
              <h3 className="text-lg font-semibold">Content Tables Not Found</h3>
            </div>
            <p className="mb-4">
              It appears that the necessary content tables don't exist in your database yet. 
              To manage website content, you need to create the following tables in your Supabase database:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><code>content_sections</code> - For managing website sections</li>
              <li><code>banners</code> - For managing banners</li>
              <li><code>pages</code> - For managing pages</li>
              <li><code>faqs</code> - For managing FAQs</li>
            </ul>
            <p>
              Please create these tables first to enable content management functionality.
            </p>
          </CardContent>
        </Card>
      )}

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

        <TabsContent value="sections">
          {!isEditing ? (
            <div className="space-y-4">
              {sectionsLoading ? (
                <Card>
                  <CardContent className="flex justify-center p-6">
                    <p>Loading sections...</p>
                  </CardContent>
                </Card>
              ) : sectionsError ? (
                <Card>
                  <CardContent className="p-6">
                    <p className="text-red-500">Error loading sections: {
                      sectionsError instanceof Error ? sectionsError.message : 'Unknown error'
                    }</p>
                    <p className="mt-2">
                      Make sure you have created the 'content_sections' table in your database.
                    </p>
                  </CardContent>
                </Card>
              ) : contentSections.length > 0 ? (
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
                            Last updated: {new Date(section.updated_at).toLocaleDateString()}
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
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p>No website sections found. Click "Add New" to create your first website section.</p>
                  </CardContent>
                </Card>
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
                  <Select 
                    value={sectionForm.type}
                    onValueChange={(value) => setSectionForm({...sectionForm, type: value})}
                  >
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

        <TabsContent value="banners">
          {!isEditing ? (
            <div>
              {bannersLoading ? (
                <Card>
                  <CardContent className="flex justify-center p-6">
                    <p>Loading banners...</p>
                  </CardContent>
                </Card>
              ) : banners.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {banners.map((banner) => (
                    <Card key={banner.id} className="overflow-hidden">
                      <div className="relative h-40">
                        <img 
                          src={banner.image_url} 
                          alt={banner.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x150?text=Banner+Image';
                          }}
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
                  <CardContent className="p-6 text-center">
                    <p>No banners found. Click "Add New" to create your first banner.</p>
                  </CardContent>
                </Card>
              )}
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
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x150?text=Banner+Preview';
                      }}
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

        <TabsContent value="pages">
          {!isEditing ? (
            <div className="space-y-4">
              {pagesLoading ? (
                <Card>
                  <CardContent className="flex justify-center p-6">
                    <p>Loading pages...</p>
                  </CardContent>
                </Card>
              ) : pages.length > 0 ? (
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
                      {pages.map((page) => (
                        <tr key={page.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{page.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{page.slug}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{new Date(page.updated_at).toLocaleDateString()}</td>
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
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p>No pages found. Click "Add New" to create your first page.</p>
                  </CardContent>
                </Card>
              )}
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

        <TabsContent value="faqs">
          {!isEditing ? (
            <div className="space-y-4">
              {faqsLoading ? (
                <Card>
                  <CardContent className="flex justify-center p-6">
                    <p>Loading FAQs...</p>
                  </CardContent>
                </Card>
              ) : faqs.length > 0 ? (
                faqs.map((faq) => (
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
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p>No FAQs found. Click "Add New" to create your first FAQ.</p>
                  </CardContent>
                </Card>
              )}
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
