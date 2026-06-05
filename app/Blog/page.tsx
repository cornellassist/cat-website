import { blogPosts } from "./blogData";
import { FeaturedBlogPost } from "@/app/components/FeaturedBlogPost";
import { BlogPostCard } from "@/app/components/BlogPostCard";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

export default function Blog() {
  // Sort posts by date (most recent first) and get the featured post
  const sortedPosts = [...blogPosts].sort((a, b) =>
    b.publishDate.localeCompare(a.publishDate),
  );
  const featuredPost = sortedPosts[0];
  const remainingPosts = sortedPosts.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Featured Post Section */}
      <div className="universepad mt-16 sm:mt-20 md:mt-30 mb-12 md:mb-16 lg:mb-20">
        <FeaturedBlogPost post={featuredPost} />
      </div>

      {/* Featured Blog Posts Grid Section */}
      <div className="universepad pb-12 md:pb-16 lg:pb-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 md:mb-10 lg:mb-12">
          <h2 className="heading mb-4 sm:mb-0">All Blog Posts</h2>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {remainingPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
