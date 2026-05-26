/**
 * 自动内容生成脚本
 * 根据26天计划自动生成页面内容（5月26日-6月20日）
 */

const fs = require('fs');
const path = require('path');

// 26天内容计划（60篇内容，5月26日-6月20日）
const contentPlan = {
  // 第1阶段：基础完善（5月26日-5月28日，3天，12篇）
  phase1: [
    // Day 1 (5月26日): 4篇
    { day: 1, type: 'policy', title: 'Privacy Policy', slug: 'privacy-policy' },
    { day: 1, type: 'policy', title: 'Terms of Service', slug: 'terms' },
    { day: 1, type: 'policy', title: 'Cookie Policy', slug: 'cookie-policy' },
    { day: 1, type: 'page', title: 'Contact Us', slug: 'contact' },
    // Day 2 (5月27日): 4篇
    { day: 2, type: 'tutorial', title: 'Color Picker Guide', slug: 'color-picker-guide' },
    { day: 2, type: 'tutorial', title: 'Palette Generator Guide', slug: 'palette-generator-guide' },
    { day: 2, type: 'tutorial', title: 'Gradient Generator Guide', slug: 'gradient-generator-guide' },
    { day: 2, type: 'tutorial', title: 'Contrast Checker Guide', slug: 'contrast-checker-guide' },
    // Day 3 (5月28日): 4篇
    { day: 3, type: 'article', title: 'What is HEX Color Code', slug: 'what-is-hex-color' },
    { day: 3, type: 'article', title: 'RGB vs HSL Comparison', slug: 'rgb-vs-hsl' },
    { day: 3, type: 'article', title: 'Color Trends 2025', slug: 'color-trends-2025' },
    { day: 3, type: 'article', title: 'Brand Color Selection', slug: 'brand-color-selection' },
  ],
  // 第2阶段：内容爆发（5月29日-6月2日，5天，15篇）
  phase2: [
    // Day 4 (5月29日): 3篇
    { day: 4, type: 'article', title: 'Color Theory Basics', slug: 'color-theory-basics' },
    { day: 4, type: 'article', title: 'Complementary Colors', slug: 'complementary-colors' },
    { day: 4, type: 'article', title: 'Analogous Colors', slug: 'analogous-colors' },
    // Day 5 (5月30日): 3篇
    { day: 5, type: 'article', title: 'Triadic Color Scheme', slug: 'triadic-color-scheme' },
    { day: 5, type: 'article', title: 'Monochromatic Colors', slug: 'monochromatic-colors' },
    { day: 5, type: 'article', title: 'Split Complementary Colors', slug: 'split-complementary-colors' },
    // Day 6 (5月31日): 3篇
    { day: 6, type: 'article', title: 'Tetradic Colors', slug: 'tetradic-colors' },
    { day: 6, type: 'article', title: 'Square Color Scheme', slug: 'square-color-scheme' },
    { day: 6, type: 'article', title: 'Tailwind Colors Guide', slug: 'tailwind-colors-guide' },
    // Day 7 (6月1日): 3篇
    { day: 7, type: 'article', title: 'WCAG Accessibility', slug: 'wcag-color-accessibility' },
    { day: 7, type: 'article', title: 'Extract Colors from Image', slug: 'extract-colors-from-image' },
    { day: 7, type: 'article', title: 'SaaS Color Best Practices', slug: 'saas-color-best-practices' },
    // Day 8 (6月2日): 3篇
    { day: 8, type: 'article', title: 'Dark Mode Colors', slug: 'dark-mode-colors' },
    { day: 8, type: 'article', title: 'Color Psychology in Marketing', slug: 'color-psychology-marketing' },
    { day: 8, type: 'article', title: 'Minimalist Color Palette', slug: 'minimalist-color-palette' },
  ],
  // 第3阶段：长尾内容（6月3日-6月8日，6天，18篇）
  phase3: [
    // Day 9 (6月3日): 3篇
    { day: 9, type: 'article', title: 'Vintage Color Palette', slug: 'vintage-color-palette' },
    { day: 9, type: 'article', title: 'Neon Color Palette', slug: 'neon-color-palette' },
    { day: 9, type: 'article', title: 'Pastel Color Palette', slug: 'pastel-color-palette' },
    // Day 10 (6月4日): 3篇
    { day: 10, type: 'article', title: 'Earth Tone Color Palette', slug: 'earth-tone-color-palette' },
    { day: 10, type: 'article', title: 'Ocean Color Palette', slug: 'ocean-color-palette' },
    { day: 10, type: 'article', title: 'Sunset Color Palette', slug: 'sunset-color-palette' },
    // Day 11 (6月5日): 3篇
    { day: 11, type: 'article', title: 'Forest Color Palette', slug: 'forest-color-palette' },
    { day: 11, type: 'article', title: 'Desert Color Palette', slug: 'desert-color-palette' },
    { day: 11, type: 'article', title: 'Best Color Picker Tools for Designers', slug: 'best-color-picker-tools' },
    // Day 12 (6月6日): 3篇
    { day: 12, type: 'article', title: 'How to Choose Website Colors', slug: 'how-to-choose-website-colors' },
    { day: 12, type: 'article', title: 'Color Palette Generator Free', slug: 'color-palette-generator-free' },
    { day: 12, type: 'article', title: 'CSS Gradient Generator Online', slug: 'css-gradient-generator-online' },
    // Day 13 (6月7日): 3篇
    { day: 13, type: 'article', title: 'WCAG Contrast Checker Tool', slug: 'wcag-contrast-checker-tool' },
    { day: 13, type: 'article', title: 'Tailwind Color Palette Generator', slug: 'tailwind-color-palette-generator' },
    { day: 13, type: 'article', title: 'Image Color Extractor Online', slug: 'image-color-extractor-online' },
    // Day 14 (6月8日): 3篇
    { day: 14, type: 'article', title: 'Hex to RGB Converter', slug: 'hex-to-rgb-converter' },
    { day: 14, type: 'article', title: 'RGB to HSL Converter', slug: 'rgb-to-hsl-converter' },
    { day: 14, type: 'article', title: 'Color Code Converter Tool', slug: 'color-code-converter' },
  ],
  // 第4阶段：技术SEO（6月9日-6月13日，5天，10篇）
  phase4: [
    // Day 15 (6月9日): 2篇
    { day: 15, type: 'page', title: 'FAQ', slug: 'faq' },
    { day: 15, type: 'page', title: 'Tools Comparison', slug: 'tools-comparison' },
    // Day 16 (6月10日): 2篇
    { day: 16, type: 'article', title: 'CSS Color Variables Guide', slug: 'css-color-variables' },
    { day: 16, type: 'article', title: 'Sass Color Functions', slug: 'sass-color-functions' },
    // Day 17 (6月11日): 2篇
    { day: 17, type: 'article', title: 'CSS Custom Properties Colors', slug: 'css-custom-properties-colors' },
    { day: 17, type: 'article', title: 'Color Management in Design Systems', slug: 'color-management-design-systems' },
    // Day 18 (6月12日): 2篇
    { day: 18, type: 'article', title: 'Material Design Colors', slug: 'material-design-colors' },
    { day: 18, type: 'article', title: 'iOS App Color Guidelines', slug: 'ios-app-color-guidelines' },
    // Day 19 (6月13日): 2篇
    { day: 19, type: 'article', title: 'Android Color Guidelines', slug: 'android-color-guidelines' },
    { day: 19, type: 'article', title: 'Web App Color Best Practices', slug: 'web-app-color-best-practices' },
  ],
  // 第5阶段：最终冲刺（6月14日-6月20日，7天，5篇）
  phase5: [
    // Day 20 (6月14日): 1篇
    { day: 20, type: 'article', title: 'E-commerce Color Psychology', slug: 'ecommerce-color-psychology' },
    // Day 21 (6月15日): 1篇
    { day: 21, type: 'article', title: 'Landing Page Color Tips', slug: 'landing-page-color-tips' },
    // Day 22 (6月16日): 1篇
    { day: 22, type: 'article', title: 'Color Blind Friendly Palettes', slug: 'color-blind-friendly-palettes' },
    // Day 23 (6月17日): 1篇
    { day: 23, type: 'article', title: 'High Contrast Color Combinations', slug: 'high-contrast-color-combinations' },
    // Day 24-26 (6月18-20日): 检查和优化，不再生成新内容
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

// 所有内容合并（60篇）
const allContent = [
  ...contentPlan.phase1,
  ...contentPlan.phase2,
  ...contentPlan.phase3,
  ...contentPlan.phase4,
  ...contentPlan.phase5,
];

// 计算当前是第几天（5月26日=Day 1，6月20日=Day 26）
function getCurrentDay() {
  const startDate = new Date('2026-05-26');
  const today = new Date();
  const diffTime = today - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, Math.min(diffDays, 26)); // 限制在1-26天
}

// 主函数
async function generateContent() {
  const currentDay = getCurrentDay();
  const today = new Date();
  
  console.log(`Generating content for Day ${currentDay} (${today.toISOString().split('T')[0]})...`);
  
  // 读取已生成记录
  const progressFile = 'data/content-progress.json';
  let progress = { generated: [], startDate: '2026-05-26', currentDay: currentDay };
  if (fs.existsSync(progressFile)) {
    progress = JSON.parse(fs.readFileSync(progressFile, 'utf-8'));
  }
  
  // 确定今天要生成的内容
  let contentToGenerate = [];
  
  // 按当前天数匹配
  const allPhases = [contentPlan.phase1, contentPlan.phase2, contentPlan.phase3, contentPlan.phase4, contentPlan.phase5];
  for (const phase of allPhases) {
    const dayItems = phase.filter(item => item.day === currentDay);
    contentToGenerate.push(...dayItems);
  }
  
  // 如果当天没有匹配的内容（Day 24-26），提示检查和优化
  if (contentToGenerate.length === 0) {
    console.log(`Day ${currentDay}: No new content to generate. Time for review and optimization!`);
    console.log('建议任务：');
    console.log('- 检查所有页面是否正常');
    console.log('- 更新Sitemap');
    console.log('- 优化内链结构');
    console.log('- 准备AdSense申请材料');
    return;
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
  progress.currentDay = currentDay;
  if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
  }
  fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2));
  
  console.log(`Content generation complete! Generated ${generatedCount} new items. Total: ${progress.generated.length}/60`);
  
  // 显示进度
  const remaining = 60 - progress.generated.length;
  const endDate = new Date('2026-06-20');
  const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
  console.log(`Progress: ${progress.generated.length}/60 (${((progress.generated.length/60)*100).toFixed(1)}%)`);
  console.log(`Remaining: ${remaining} items, ${daysLeft} days left`);
}

generateContent().catch(console.error);
