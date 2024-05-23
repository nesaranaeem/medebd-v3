// utils/sitemap.js

export const generateSitemap = (urlSet) => {
  const urls = urlSet.map(
    (url) =>
      `<url>
         <loc>${url.loc}</loc>
         <lastmod>${url.lastmod}</lastmod>
       </url>`
  ).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urls}
          </urlset>`;
};
