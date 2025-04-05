
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { ImagePlus, X } from "lucide-react";

const CreatePostPage = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isProduct, setIsProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setImage(null);
  };
  
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase();
      
      if (tag && !tags.includes(tag) && tags.length < 5) {
        setTags([...tags, tag]);
        setTagInput("");
      }
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content) {
      toast({
        title: "Content required",
        description: "Please add some text to your post.",
        variant: "destructive"
      });
      return;
    }
    
    if (isProduct && (!productName || !productPrice)) {
      toast({
        title: "Product details required",
        description: "Please add a name and price for your product.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would send data to the backend
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Post created!",
        description: "Your post has been published successfully.",
      });
      navigate("/feed");
    }, 1000);
  };
  
  return (
    <div className="max-w-xl mx-auto animate-in-custom">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Create Post</h1>
        <Button onClick={() => navigate(-1)} variant="outline">Cancel</Button>
      </div>
      
      <Card className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Post Content */}
          <div>
            <Textarea
              placeholder="What do you want to share about your business or products?"
              className="min-h-32 text-base"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          {/* Image Upload */}
          <div>
            {image ? (
              <div className="relative rounded-md overflow-hidden">
                <img 
                  src={image} 
                  alt="Post preview" 
                  className="w-full h-auto max-h-80 object-cover"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-90"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <Label 
                  htmlFor="image-upload" 
                  className="flex flex-col items-center cursor-pointer"
                >
                  <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-gray-500">Add Image</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</span>
                </Label>
                <Input 
                  id="image-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            )}
          </div>
          
          {/* Product Toggle */}
          <div className="flex items-center space-x-2">
            <Switch 
              checked={isProduct} 
              onCheckedChange={setIsProduct} 
              id="product-mode"
            />
            <Label htmlFor="product-mode">Add Product Details</Label>
          </div>
          
          {/* Product Details (conditional) */}
          {isProduct && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-md">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-price">Price</Label>
                <Input
                  id="product-price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="$0.00"
                />
              </div>
            </div>
          )}
          
          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (up to 5)</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <Badge 
                  key={index}
                  className="bg-bizconnect-light-orange flex items-center gap-1 py-1.5"
                >
                  #{tag}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add tags (press Enter or comma to add)"
              disabled={tags.length >= 5}
            />
            <p className="text-xs text-gray-500">
              Add relevant tags to help others discover your post
            </p>
          </div>
          
          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-bizconnect-orange hover:bg-bizconnect-orange/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreatePostPage;

import { Badge } from "@/components/ui/badge";
