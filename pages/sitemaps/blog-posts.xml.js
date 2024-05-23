// pages/sitemaps/blog-posts.xml.js

export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const sitemapResponse = await fetch('https://medebd.com/api/sitemaps/blog-posts');
  const sitemap = await sitemapResponse.text();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
