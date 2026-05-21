/**
 * 自动内容生成脚本
 * 根据30天计划自动生成博客文章
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

// 内容模板
const templates = {
  policy: (title) => `---
title: "${title}"
description: "${title} for exdreamcolors"
---

# ${title}

This page contains the ${title.toLowerCase()} for exdreamcolors.

Last updated: ${new Date().toISOString().split('T')[0]}
`,

  tutorial: (title, slug) => `---
title: "${title} - Complete Guide"
description: "Learn how to use ${title} effectively. Step-by-step tutorial with examples."
keywords: ["${slug}", "color tools", "tutorial"]
---

# ${title}

## Introduction

Welcome to the complete guide for ${title}.

## How to Use

### Step 1: Access the Tool
Navigate to the tool page.

### Step 2: Select Your Colors
Use the color picker to choose your base color.

### Step 3: Generate Results
Click the generate button to see results.

### Step 4: Copy Code
Copy the generated code for your project.

## Examples

### Example 1: Basic Usage
\`\`\`css
/* Example CSS */
.color-primary {
  color: #3B82F6;
}
\`\`\`

### Example 2: Advanced Usage
\`\`\`css
/* Advanced example */
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
\`\`\`

## Tips and Tricks

1. Tip 1: Save your favorite colors
2. Tip 2: Use keyboard shortcuts
3. Tip 3: Export in multiple formats

## Related Tools

- [Color Picker](/color-picker)
- [Palette Generator](/palette-generator)
- [Gradient Generator](/gradient-generator)

## Conclusion

${title} is a powerful tool for developers and designers.
`,

  article: (title, slug) => `---
title: "${title}"
description: "Comprehensive guide about ${title.toLowerCase()}. Learn best practices and tips."
keywords: ["${slug}", "color theory", "web design"]
---

# ${title}

## What is ${title}?

${title} is an important concept in web design and development.

## Why ${title} Matters

Understanding ${title} helps you create better designs.

## Key Concepts

### Concept 1: Basics
The fundamentals of ${title}.

### Concept 2: Applications
How to apply ${title} in real projects.

### Concept 3: Best Practices
Tips for using ${title} effectively.

## Practical Examples

### Example 1
\`\`\`css
.example {
  /* CSS example */
}
\`\`\`

### Example 2
\`\`\`javascript
// JavaScript example
const colors = {
  primary: '#3B82F6'
};
\`\`\`

## Common Mistakes to Avoid

1. Mistake 1: Not considering accessibility
2. Mistake 2: Using too many colors
3. Mistake 3: Ignoring contrast ratios

## Tools to Help

- [exdreamcolors Color Picker](/color-picker)
- [Contrast Checker](/contrast-checker)
- [Palette Generator](/palette-generator)

## Conclusion

Master ${title} to improve your web design skills.

## FAQ

**Q: How do I get started with ${title}?**
A: Start with the basics and practice regularly.

**Q: What tools do I need?**
A: Use exdreamcolors for all your color needs.
`
};

// 所有内容合并为一个完整队列，按顺序执行
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
  
  // 确定今天要生成的内容：优先按日期匹配，否则从未生成的队列中取
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
    const filePath = item.type === 'policy' || item.type === 'page' 
      ? `src/app/${item.slug}/page.tsx`
      : `src/app/blog/${item.slug}/page.mdx`;
    
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
