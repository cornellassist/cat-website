import { useParams } from "react-router-dom";
import { blogPosts, BlogPost } from "../blogData";
import Image from "next/image";
import { convertDate } from "@/utils/convertDate";

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blogPost = blogPosts.find((post: BlogPost) => post.slug === slug);

  if (!blogPost) {
    return <h2>Page not found</h2>;
  }

  return (
    <div className="flex justify-center py-12 px-4">
      <div className="w-full max-w-4xl rounded-2xl p-8 flex flex-col">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 text-center">
          {blogPost.title}
        </h1>

        <div className="overflow-hidden rounded-xl mb-6">
          <Image
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full object-cover"
            width={700}
            height={300}
          />
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={blogPost.author.avatar}
              alt={blogPost.author.name}
              fill
              className="object-cover"
            />
          </div>
          <p className="font-bold">
            {blogPost.author.name}{" "}
            <span className="text-gray-500 font-normal">
              • {blogPost.publishDate}
            </span>
          </p>
        </div>

        <p className="text-gray-900">{convertDate(blogPost.content)}</p>
      </div>
    </div>
  );
}
