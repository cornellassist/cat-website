export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: Date;
  categories: string[];
  readTime: number; // minutes
  image: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Sophia Mesabhi from Untitled Ventures on Sustainable and Profitable Growth & What We Can Learn From the Gumroad Mess",
    excerpt: "An in-depth interview with Sophia Mesabhi discussing sustainable growth strategies, profitability, and lessons learned from recent industry events.",
    author: {
      name: "Frankie Sullivan",
      avatar: "https://static.wixstatic.com/media/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg/v1/fill/w_1110,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg"
    },
    publishDate: new Date("2025-04-10"),
    categories: ["Design", "Retail", "Interviews"],
    readTime: 12,
    image: "https://static.wixstatic.com/media/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg/v1/fill/w_1110,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg",
    slug: "sophia-mesabhi-sustainable-growth"
  },
  {
    id: "2",
    title: "Interview with Photographer & UX Designer, Viola LeBlanc",
    excerpt: "Viola LeBlanc is an Photographer and UX Designer from New York. She has worked with Spotify, Nike, Chews, Makr, and Square. Mia de Silva sat down with Viola to discuss her journey, creative process, and insights into the intersection of photography and UX design.",
    author: {
      name: "Demi Wilkinson",
      avatar: "https://static.wixstatic.com/media/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg/v1/fill/w_1110,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg"
    },
    publishDate: new Date("2025-01-16"),
    categories: ["Design", "Photography", "Interviews"],
    readTime: 8,
    image: "https://static.wixstatic.com/media/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg/v1/fill/w_1110,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg",
    slug: "interview-viola-leblanc"
  },
  {
    id: "3",
    title: "Improve Your Design Skills: Develop an \"Eye\" for Design",
    excerpt: "The design industry is constantly evolving, but good design is timeless. Learn how to quickly develop an \"eye\" for UI design and improve your design skills through practical exercises and real-world examples.",
    author: {
      name: "Candice Wu",
      avatar: "https://static.wixstatic.com/media/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg/v1/fill/w_1110,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg"
    },
    publishDate: new Date("2025-01-15"),
    categories: ["Design", "Education"],
    readTime: 6,
    image: "https://static.wixstatic.com/media/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg/v1/fill/w_1110,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg",
    slug: "develop-eye-for-design"
  },
  {
    id: "4",
    title: "A Relentless Pursuit of Perfection in Product Design",
    excerpt: "I began to notice that there was a sharp contrast between well-made, crafted products and poorly made ones, and an even greater distinction between the products that truly serve their users and those that merely exist.",
    author: {
      name: "Lana Steiner",
      avatar: "https://static.wixstatic.com/media/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg/v1/fill/w_1110,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg"
    },
    publishDate: new Date("2025-01-18"),
    categories: ["Design", "Product"],
    readTime: 5,
    image: "https://static.wixstatic.com/media/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg/v1/fill/w_1110,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg",
    slug: "pursuit-perfection-product-design"
  },
  {
    id: "5",
    title: "A Continually Unfolding History - Made by Hand",
    excerpt: "A single building occupies the hillside at Hillview, a historic 240-hectare former sheep farm on Tasmania's Bruny Island. The much-lauded work of Made by Hand represents a masterful blend of traditional craftsmanship and modern design principles.",
    author: {
      name: "Alex Morgan",
      avatar: "https://static.wixstatic.com/media/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg/v1/fill/w_1110,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg"
    },
    publishDate: new Date("2025-01-12"),
    categories: ["Architecture", "Craftsmanship"],
    readTime: 7,
    image: "https://static.wixstatic.com/media/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg/v1/fill/w_1110,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg",
    slug: "made-by-hand-history"
  },
  {
    id: "6",
    title: "How Remote Collaboration Makes Us Better Designers",
    excerpt: "Collaboration can make our teams stronger, and our individual designs better. Remote work has brought new challenges to remote collaboration, but also unique opportunities for growth and innovation in the design process.",
    author: {
      name: "Jordan Kim",
      avatar: "https://static.wixstatic.com/media/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg/v1/fill/w_1110,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg"
    },
    publishDate: new Date("2025-01-10"),
    categories: ["Design", "Collaboration"],
    readTime: 9,
    image: "https://static.wixstatic.com/media/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg/v1/fill/w_1110,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg",
    slug: "remote-collaboration-designers"
  },
  {
    id: "7",
    title: "Best Books on Scaling Your Early-Stage Startup",
    excerpt: "This collection of the best startup books for scaling your startup are packed full of valuable and actionable advice to take your business to the next level. From growth strategies to team building, these reads are essential for any founder.",
    author: {
      name: "Sam Chen",
      avatar: "https://static.wixstatic.com/media/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg/v1/fill/w_1110,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg"
    },
    publishDate: new Date("2025-01-08"),
    categories: ["Business", "Startups"],
    readTime: 10,
    image: "https://static.wixstatic.com/media/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg/v1/fill/w_1110,h_740,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c387f1_fe2b15fbd9514cc299b74afb6df7017e~mv2.jpg",
    slug: "best-books-scaling-startup"
  }
];
