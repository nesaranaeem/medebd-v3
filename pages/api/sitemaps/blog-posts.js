// pages/api/sitemaps/blog-posts.js

import { generateSitemap } from "@/utils/sitemap";

export default async function handler(req, res) {
  const perPage = 100; // Adjust as needed
  let page = 1;
  let totalPosts = [];
  let postsData;

  do {
    const postsResponse = await fetch(
      `https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_embed`
    );
    postsData = await postsResponse.json();
    totalPosts = totalPosts.concat(postsData);
    page++;
  } while (postsData.length === perPage);

  const urlSet = totalPosts.map((post) => ({
    loc: `https://medebd.com/blog/${post.slug}`,
    lastmod: new Date(post.modified).toISOString(),
  }));

  const sitemap = generateSitemap(urlSet);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
}
