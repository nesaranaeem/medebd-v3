// pages/api/sitemaps/blog-categories.js

import { generateSitemap } from "@/utils/sitemap";

export default async function handler(req, res) {
  const categoriesResponse = await fetch(
    "https://slateblue-barracuda-231194.hostingersite.com/wp-json/wp/v2/categories"
  );
  const categoriesData = await categoriesResponse.json();

  const urlSet = categoriesData.map((category) => ({
    loc: `https://medebd.com/blog/category/${category.slug}`,
    lastmod: new Date().toISOString(),
  }));

  const sitemap = generateSitemap(urlSet);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
}
