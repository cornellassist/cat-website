import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { BlogPost } from "@/app/Blog/blogData";
import Link from "next/link";
import { ClockIcon } from "@heroicons/react/24/outline";
import { convertDate } from "@/utils/convertDate";

export interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/Blog/${post.slug}`}>
      <div className="bg-white rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_16px_32px_rgba(0,0,0,0.12)] transition-shadow duration-200">
        {/* Image */}
        <div className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden">
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex flex-col h-full">
          {/* Title with Icon */}
          <div className="flex items-start gap-2 mb-3">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-text-dk-grey flex-1 leading-tight">
              {post.title}
            </h3>
            <ArrowUpRightIcon className="w-5 h-5 text-text-grey flex-shrink-0 mt-1" />
          </div>

          {/* Excerpt */}
          <p className="text-sm md:text-base text-text-grey-muted line-clamp-3 flex-1 mb-2 md:mb-4">
            {post.excerpt}
          </p>
          <div className="flex gap-2 items-center mb-4 md:mb-6">
            <ClockIcon className="h-5 w-5 text-text-grey-muted" />
            <p className="text-m md: text-lg text-text-grey-muted line-clamp-3 flex-1">
              {post.readTime} Min
            </p>
          </div>

          {/* Author and Date */}
          <div className="flex items-center gap-3 pt-4 border-t border-bg-lt-grey">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-bg-lt-grey flex-shrink-0">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-semibold text-text-dk-grey truncate">
                {post.author.name}
              </span>
              <span className="text-xs text-text-grey-muted">
                {convertDate(post.publishDate)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
