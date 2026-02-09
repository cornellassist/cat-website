import Image from "next/image";
import { BlogPost } from "@/app/Blog/blogData";

interface FeaturedBlogPostProps {
  post: BlogPost;
}

export function FeaturedBlogPost({ post }: FeaturedBlogPostProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[480px] lg:h-[480px] overflow-hidden rounded-lg">
      {/* Background Image */}
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay - bottom 30-40% */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/80 to-transparent" />

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-6 text-white">
        {/* Title */}
        <h2 className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold mb-3 md:mb-4 leading-tight">
          {post.title}
        </h2>

        {/* Metadata Row */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 lg:gap-8">
          {/* Author - Left */}
          <div className="flex items-center gap-3">
            <span className="text-xs md:text-sm text-white/90">Written by</span>
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-white/20">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-xs md:text-sm">
                {post.author.name}
              </span>
            </div>
          </div>

          {/* Date - Center */}
          <div className="flex items-center">
            <span className="text-xs md:text-sm text-white/90">
              Published on{" "}
              <span className="font-medium">
                {formatDate(post.publishDate)}
              </span>
            </span>
          </div>

          {/* Read Time - Right */}
          <div className="flex items-center md:ml-auto">
            <span className="text-xs md:text-sm font-medium">
              {post.readTime} min read
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
