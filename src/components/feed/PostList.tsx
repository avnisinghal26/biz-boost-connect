
import Post, { PostData } from "./Post";

// Sample data for our feed
const samplePosts: PostData[] = [
  {
    id: "1",
    businessName: "Organic Delights",
    username: "organicdelights",
    avatar: "https://i.pravatar.cc/150?img=1",
    timestamp: "2h ago",
    content: "Just launched our new organic honey collection! Sourced from local beekeepers and 100% natural. Perfect for your morning toast or tea! 🍯",
    image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?q=80&w=1000&auto=format&fit=crop",
    likes: 42,
    comments: 8,
    product: {
      name: "Premium Organic Honey",
      price: "$12.99",
      available: true
    },
    tags: ["organic", "honey", "natural", "sustainable"]
  },
  {
    id: "2",
    businessName: "Handcrafted Gems",
    username: "craftedgems",
    avatar: "https://i.pravatar.cc/150?img=5",
    timestamp: "5h ago",
    content: "Looking for collaboration opportunities with other small businesses! We create handcrafted jewelry and are looking for boutiques to partner with. DM if interested! ✨",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000&auto=format&fit=crop",
    likes: 28,
    comments: 15,
    tags: ["smallbusiness", "jewelry", "handmade", "collaboration"]
  },
  {
    id: "3",
    businessName: "Green Thumb Plants",
    username: "greenthumb",
    avatar: "https://i.pravatar.cc/150?img=10",
    timestamp: "1d ago",
    content: "New shipment of indoor plants just arrived! Perfect for brightening up your home office. Limited quantities available - order now!",
    image: "https://images.unsplash.com/photo-1463320898484-cdee8141c787?q=80&w=1000&auto=format&fit=crop",
    likes: 76,
    comments: 23,
    product: {
      name: "Monstera Deliciosa",
      price: "$34.99",
      available: true
    },
    tags: ["plants", "homedecor", "greenery", "sustainability"]
  },
  {
    id: "4",
    businessName: "Artisan Bakery",
    username: "artisanbread",
    avatar: "https://i.pravatar.cc/150?img=15",
    timestamp: "2d ago",
    content: "We're expanding our delivery zones! Now serving the entire downtown area. Fresh bread delivered to your doorstep every morning. Order through our website!",
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=1000&auto=format&fit=crop",
    likes: 54,
    comments: 12,
    tags: ["bakery", "freshbread", "delivery", "local"]
  }
];

const PostList = () => {
  return (
    <div className="space-y-4">
      {samplePosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
