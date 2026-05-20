/**
 * SEO优化脚本
 * 自动优化所有页面的Meta标签和结构化数据
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// SEO优化配置
const seoConfig = {
  siteName: 'exdreamcolors',
  siteUrl: 'https://exdreamcolors.win',
  defaultDescription: 'Free online color tools for developers and designers',
  keywords: [
    'color picker', 'color palette generator', 'gradient generator',
    'contrast checker', 'tailwind colors', 'css colors', 'web colors',
    'color tools', 'design tools', 'developer tools'
  ]
};

// 生成Meta标签
function generateMetaTags(title, description, slug) {
  return `
export const metadata = {
  title: '${title} | ${seoConfig.siteName}',
  description: '${description || seoConfig.defaultDescription}',
  keywords: ${JSON.stringify(seoConfig.keywords)},
  openGraph: {
    title: '${title}',
    description: '${description || seoConfig.defaultDescription}',
    url: '${seoConfig.siteUrl}/${slug}',
    siteName: '${seoConfig.siteName}',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${title}',
    description: '${description || seoConfig.defaultDescription}',
  },
};
`;
}

// 生成结构化数据
function generateStructuredData(title, description, slug) {
  return `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "${title}",
  "description": "${description || seoConfig.defaultDescription}",
  "url": "${seoConfig.siteUrl}/${slug}",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
</script>
`;
}

// 优化页面
async function optimizePage(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const slug = path.basename(path.dirname(filePath));
  
  // 提取标题
  const titleMatch = content.match(/title:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : slug;
  
  // 提取描述
  const descMatch = content.match(/description:\s*"([^"]+)"/);
  const description = descMatch ? descMatch[1] : '';
  
  // 检查是否已有metadata
  if (!content.includes('export const metadata')) {
    const metaTags = generateMetaTags(title, description, slug);
    const newContent = metaTags + '\n' + content;
    fs.writeFileSync(filePath, newContent);
    console.log(`✓ Optimized: ${filePath}`);
  }
}

// 主函数
async function optimizeSEO() {
  console.log('Starting SEO optimization...');
  
  // 查找所有页面文件
  const pageFiles = glob.sync('src/app/**/page.tsx');
  
  for (const file of pageFiles) {
    await optimizePage(file);
  }
  
  console.log('SEO optimization complete!');
}

optimizeSEO().catch(console.error);
