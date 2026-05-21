/**
 * 自动内容生成脚本
 * 根据30天计划自动生成页面内容
 */

const fs = require('fs');
const path = require('path');

// 30天内容计划
const contentPlan = {
  week1: [
    { day: 1, type: 'policy', title: 'Privacy Policy', slug: 'privacy-policy' },
    { day: 1, type: 'policy', title: 'Terms of Service', slug: 'terms' },
    { day: 1, type: 'policy', title: 'Cookie Policy', slug: 'cookie-policy' },
    { day: 1, type: 'page', title: 'Contact Us', slug: 'contact' },
    { day: 2, type: 'tutorial', title: 'Color Picker Guide', slug: 'color-picker-guide' },
    { day: 2, type: 'tutorial', title: 'Palette Generator Guide', slug: 'palette-generator-guide' },
    { day: 3, type: 'tutorial', title: 'Gradient Generator Guide', slug: 'gradient-generator-guide' },
    { day: 3, type: 'tutorial', title: 'Contrast Checker Guide', slug: 'contrast-checker-guide' },
    { day: 4, type: 'article', title: 'What is HEX Color Code', slug: 'what-is-hex-color' },
    { day: 4, type: 'article', title: 'RGB vs HSL Comparison', slug: 'rgb-vs-hsl' },
    { day: 5, type: 'article', title: 'Color Trends 2025', slug: 'color-trends-2025' },
    { day: 6, type: 'article', title: 'Brand Color Selection', slug: 'brand-color-selection' },
  ],
  week2: [
    { day: 8, type: 'article', title: 'Color Theory Basics', slug: 'color-theory-basics' },
    { day: 8, type: 'article', title: 'Complementary Colors', slug: 'complementary-colors' },
    { day: 9, type: 'article', title: 'Tailwind Colors Guide', slug: 'tailwind-colors-guide' },
    { day: 10, type: 'article', title: 'WCAG Accessibility', slug: 'wcag-color-accessibility' },
    { day: 11, type: 'article', title: 'Extract Colors from Image', slug: 'extract-colors-from-image' },
    { day: 12, type: 'article', title: 'SaaS Color Best Practices', slug: 'saas-color-best-practices' },
    { day: 13, type: 'article', title: 'Dark Mode Colors', slug: 'dark-mode-colors' },
  ],
  week3: [
    { day: 15, type: 'longtail', count: 5 },
    { day: 16, type: 'longtail', count: 5 },
    { day: 17, type: 'page', title: 'FAQ', slug: 'faq' },
    { day: 17, type: 'page', title: 'Tools Comparison', slug: 'tools-comparison' },
  ]
};

// React组件模板
const templates = {
  policy: (title, slug) => `export const metadata = {
  title: '${title} | exdreamcolors',
  description: '${title} for exdreamcolors',
};

export default function ${slug.replace(/-/g, '').charAt(0).toUpperCase() + slug.replace(/-/g, '').slice(1)}Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">${title}</h1>
      <div className="prose prose-lg max-w-none">
        <p>This page contains the ${title.toLowerCase()} for exdreamcolors.</p>
        
        <h2>Last Updated</h2>
        <p>${new Date().toISOString().split('T')[0]}</p>
        
        <h2>Contact Information</h2>
        <p>If you have any questions about this ${title.toLowerCase()}, please contact us at:</p>
        <p>Email: contact@exdreamcolors.win</p>
      </div>
    </div>
  );
}`,

  page: (title, slug) => `export const metadata = {
  title: '${title} | exdreamcolors',
  description: '${title} for exdreamcolors',
};

export default function ${slug.replace(/-/g, '').charAt(0).toUpperCase() + slug.replace(/-/g, '').slice(1)}Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">${title}</h1>
      <div className="prose prose-lg max-w-none">
        <p>Welcome to the ${title} page.</p>
        <p>Last updated: ${new Date().toISOString().split('T')[0]}</p>
      </div>
    </div>
  );
}`,

  tutorial: (title, slug) => `export const metadata = {
  title: '${title} - Complete Guide | exdreamcolors',
  description: 'Learn how to use ${title} effectively. Step-by-step tutorial with examples.',
};

export default function ${slug.replace(/-/g, '').charAt(0).toUpperCase() + slug.replace(/-/g, '').slice(1)}Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">${title}</h1>
      
      <div className="prose prose-lg max-w-none">
        <h2>Introduction</h2>
        <p>Welcome to the complete guide for ${title}.</p>
        
        <h2>How to Use</h2>
        <h3>Step 1: Access the Tool</h3>
        <p>Navigate to the tool page.</p>
        
        <h3>Step 2: Select Your Colors</h3>
        <p>Use the color picker to choose your base color.</p>
        
        <h3>Step 3: Generate Results</h3>
        <p>Click the generate button to see results.</p>
        
        <h3>Step 4: Copy Code</h3>
        <p>Copy the generated code for your project.</p>
        
        <h2>Examples</h2>
        <pre className="bg-gray-100 p-4 rounded">
{/* Example CSS */}
.color-primary {'{'}
  color: #3B82F6;
{'}'}
        </pre>
        
        <h2>Tips and Tricks</h2>
        <ul>
          <li>Save your favorite colors</li>
          <li>Use keyboard shortcuts</li>
          <li>Export in multiple formats</li>
        </ul>
        
        <h2>Related Tools</h2>
        <ul>
          <li><a href="/color-picker">Color Picker</a></li>
          <li><a href="/palette-generator">Palette Generator</a></li>
          <li><a href="/gradient-generator">Gradient Generator</a></li>
        </ul>
      </div>
    </div>
  );
}`,

  article: (title, slug) => `export const metadata = {
  title: '${title} | exdreamcolors',
  description: 'Comprehensive guide about ${title.toLowerCase()}. Learn best practices and tips.',
};

export default function ${slug.replace(/-/g, '').charAt(0).toUpperCase() + slug.replace(/-/g, '').slice(1)}Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">${title}</h1>
      
      <div className="prose prose-lg max-w-none">
        <h2>What is ${title}?</h2>
        <p>${title} is an important concept in web design and development.</p>
        
        <h2>Why ${title} Matters</h2>
        <p>Understanding ${title} helps you create better designs.</p>
        
        <h2>Key Concepts</h2>
        <h3>Concept 1: Basics</h3>
        <p>The fundamentals of ${title}.</p>
        
        <h3>Concept 2: Applications</h3>
        <p>How to apply ${title} in real projects.</p>
        
        <h3>Concept 3: Best Practices</h3>
        <p>Tips for using ${title} effectively.</p>
        
        <h2>Practical Examples</h2>
        <pre className="bg-gray-100 p-4 rounded">
{/* CSS Example */}
.example {'{'}
  /* Your code here */
{'}'}
        </pre>
        
        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li>Not considering accessibility</li>
          <li>Using too many colors</li>
          <li>Ignoring contrast ratios</li>
        </ul>
        
        <h2>Tools to Help</h2>
        <ul>
          <li><a href="/color-picker">exdreamcolors Color Picker</a></li>
          <li><a href="/contrast-checker">Contrast Checker</a></li>
          <li><a href="/palette-generator">Palette Generator</a></li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Master ${title} to improve your web design skills.</p>
      </div>
    </div>
  );
}`
};

// 所有内容合并
const allContent = [
  ...contentPlan.week1,
  ...contentPlan.week2,
  ...contentPlan.week3,
];

// 主函数
async function generateContent() {
  const today = new Date();
  const dayOfMonth = today.getDate();
  
  console.log(`Generating content for Day ${dayOfMonth}...`);
  
  // 读取已生成记录
  const progressFile = 'data/content-progress.json';
  let progress = { generated: [] };
  if (fs.existsSync(progressFile)) {
    progress = JSON.parse(fs.readFileSync(progressFile, 'utf-8'));
  }
  
  // 确定今天要生成的内容
  let contentToGenerate = [];
  
  // 先尝试按日期匹配
  const allDays = [contentPlan.week1, contentPlan.week2, contentPlan.week3];
  for (const week of allDays) {
    const dayItems = week.filter(item => item.day === dayOfMonth);
    contentToGenerate.push(...dayItems);
  }
  
  // 如果当天没有匹配的内容，从未生成的队列中取2篇
  if (contentToGenerate.length === 0) {
    const pending = allContent.filter(item => !progress.generated.includes(item.slug));
    contentToGenerate = pending.slice(0, 2);
    console.log(`No specific plan for day ${dayOfMonth}, generating ${contentToGenerate.length} pending items`);
  }
  
  // 生成内容
  let generatedCount = 0;
  for (const item of contentToGenerate) {
    if (progress.generated.includes(item.slug)) {
      console.log(`⊘ Skipped (already exists): ${item.slug}`);
      continue;
    }
    
    const template = templates[item.type];
    if (!template) continue;
    
    const content = template(item.title, item.slug);
    const filePath = `src/app/${item.slug}/page.tsx`;
    
    // 确保目录存在
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // 写入文件
    fs.writeFileSync(filePath, content);
    progress.generated.push(item.slug);
    generatedCount++;
    console.log(`✓ Generated: ${filePath}`);
  }
  
  // 保存进度
  if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
  }
  fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2));
  
  console.log(`Content generation complete! Generated ${generatedCount} new items. Total: ${progress.generated.length}`);
}

generateContent().catch(console.error);
