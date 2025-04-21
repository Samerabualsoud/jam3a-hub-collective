
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { fetchContentSections, fetchBanners, fetchPages, fetchFAQs } from "@/components/admin/content/contentUtils";
import ContentEditor from "./content/ContentEditor";
import ContentList from "./content/ContentList";

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState("sections");
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [contentItems, setContentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      let data = [];
      switch (activeTab) {
        case "sections":
          data = await fetchContentSections();
          break;
        case "banners":
          data = await fetchBanners();
          break;
        case "pages":
          data = await fetchPages();
          break;
        case "faqs":
          data = await fetchFAQs();
          break;
        default:
          data = [];
      }
      setContentItems(data);
    } catch (err) {
      console.error(`Error loading ${activeTab}:`, err);
      setError(err.message || `Failed to load ${activeTab}`);
      toast({
        title: "Error loading content",
        description: err.message || "Failed to load content data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContent = async (content) => {
    setIsAddingContent(false);
    setEditingContent(null);
    await loadData();
    toast({
      title: "Content Saved",
      description: "The content has been saved successfully",
      variant: "default",
    });
  };

  const handleDeleteContent = async () => {
    // Deletion functionality would be implemented here
    await loadData();
    toast({
      title: "Content Deleted",
      description: "The content has been deleted successfully",
      variant: "default",
    });
  };

  const filteredContent = contentItems.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.question?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isAddingContent) {
    return (
      <ContentEditor 
        onSave={handleSaveContent}
        onCancel={() => setIsAddingContent(false)}
      />
    );
  }

  if (editingContent) {
    return (
      <ContentEditor
        section={editingContent}
        onSave={handleSaveContent}
        onCancel={() => setEditingContent(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Button onClick={() => setIsAddingContent(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Content
        </Button>
      </div>

      <Tabs defaultValue="sections" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sections">Content Sections</TabsTrigger>
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center p-6">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : error ? (
          <Card>
            <CardHeader>
              <CardTitle>Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive">{error}</p>
              <Button onClick={loadData} className="mt-4">Retry</Button>
            </CardContent>
          </Card>
        ) : (
          <ContentList 
            items={filteredContent}
            type={activeTab}
            onEdit={(item) => setEditingContent(item)}
            onDelete={handleDeleteContent}
          />
        )}
      </Tabs>
    </div>
  );
};

export default ContentManager;
