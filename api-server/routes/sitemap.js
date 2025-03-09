const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://aloa.kr</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://aloa.kr/capture</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://aloa.kr/notice</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    </urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(sitemap);
});

module.exports = router;
