export const dictionaries = {
  en: {
    site: {
      title: 'exdreamcolors - Free Online Color Tools for Developers',
      subtitle: 'Free Color Tools for Developers & Designers',
      description: 'Color picker, palette generator, gradient maker, contrast checker, and more. No registration required.',
      nav: {
        home: 'Home',
        tools: 'Tools',
        blog: 'Blog',
        about: 'About',
        contact: 'Contact',
      },
      footer: {
        copyright: '© 2026 exdreamcolors. Free online color tools for everyone.',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        cookies: 'Cookie Policy',
      },
      tools: {
        colorPicker: 'Pick any color from the color wheel',
        paletteGenerator: 'Generate beautiful color palettes',
        gradientGenerator: 'Create stunning CSS gradients',
        contrastChecker: 'Check WCAG color contrast ratios',
        imageExtractor: 'Extract colors from any image',
        tailwindGenerator: 'Generate Tailwind color palettes',
      },
    },
    blog: {
      title: 'Blog',
      subtitle: 'Color Theory, Design Tips & Tools',
      readMore: 'Read More',
      allCategories: 'All',
      readTime: 'min read',
    },
    article: {
      breadcrumb: {
        home: 'Home',
        blog: 'Blog',
      },
      readTime: 'min read',
      updated: 'Updated',
      whatIs: 'What is',
      whyMatters: 'Why',
      matters: 'Matters',
      keyConcepts: 'Key Concepts',
      practicalApps: 'Practical Applications',
      commonMistakes: 'Common Mistakes to Avoid',
      tools: 'Tools to Help You',
      conclusion: 'Conclusion',
    },
    about: {
      title: 'About exdreamcolors',
      subtitle: 'Free Color Tools for Developers & Designers',
      content: [
        'exdreamcolors is a collection of free, browser-based color tools designed for web developers, UI/UX designers, and anyone who works with colors.',
        'All our tools run entirely in your browser. No data is uploaded to any server.',
        'Built with Next.js and Tailwind CSS, deployed on Cloudflare Pages for global performance.',
      ],
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Have a question or suggestion? We would love to hear from you.',
      email: 'contact@exdreamcolors.win',
      response: 'We typically respond within 24-48 hours on business days.',
    },
    toolsList: {
      'color-picker': { name: 'Color Picker', desc: 'Pick HEX, RGB, HSL colors with an intuitive color wheel. Copy color codes with one click.' },
      'palette-generator': { name: 'Palette Generator', desc: 'Generate beautiful, harmonious color palettes for your next project.' },
      'gradient-generator': { name: 'Gradient Generator', desc: 'Create stunning CSS gradients with a visual editor. Copy the code instantly.' },
      'contrast-checker': { name: 'Contrast Checker', desc: 'Check color contrast ratios against WCAG 2.1 AA/AAA standards.' },
      'image-extractor': { name: 'Image Color Extractor', desc: 'Extract dominant colors from any image. Upload and get instant palette.' },
      'tailwind-generator': { name: 'Tailwind Generator', desc: 'Generate Tailwind CSS color shades from a base color.' },
    },
  },

  zh: {
    site: {
      title: 'exdreamcolors - 免费在线颜色工具',
      subtitle: '面向开发者和设计师的免费颜色工具',
      description: '取色器、调色板、渐变色、对比度检查等免费工具，无需注册。',
      nav: {
        home: '首页',
        tools: '工具',
        blog: '博客',
        about: '关于',
        contact: '联系',
      },
      footer: {
        copyright: '© 2026 exdreamcolors. 为每个人提供免费在线颜色工具。',
        privacy: '隐私政策',
        terms: '服务条款',
        cookies: 'Cookie 政策',
      },
      tools: {
        colorPicker: '从色轮中选取任意颜色',
        paletteGenerator: '生成漂亮的配色方案',
        gradientGenerator: '创建惊艳的CSS渐变色',
        contrastChecker: '检查WCAG色彩对比度',
        imageExtractor: '从图片中提取颜色',
        tailwindGenerator: '生成Tailwind色系',
      },
    },
    blog: {
      title: '博客',
      subtitle: '色彩理论、设计技巧和工具',
      readMore: '阅读更多',
      allCategories: '全部',
      readTime: '分钟阅读',
    },
    about: {
      title: '关于 exdreamcolors',
      subtitle: '面向开发者和设计师的免费颜色工具',
      content: [
        'exdreamcolors 是一组免费的浏览器端颜色工具，专为网页开发者、UI/UX设计师和所有与颜色打交道的人设计。',
        '所有工具完全在你的浏览器中运行，不会上传任何数据到服务器。',
        '使用 Next.js 和 Tailwind CSS 构建，部署在 Cloudflare Pages 上，全球快速访问。',
      ],
    },
    contact: {
      title: '联系我们',
      subtitle: '有问题或建议？我们很乐意听取你的意见。',
      email: 'contact@exdreamcolors.win',
      response: '我们通常在工作日24-48小时内回复。',
    },
    article: {
      breadcrumb: { home: '首页', blog: '博客' },
      readTime: '分钟阅读',
      updated: '更新于',
      whatIs: '什么是',
      whyMatters: '为什么',
      matters: '很重要',
      keyConcepts: '核心概念',
      practicalApps: '实际应用',
      commonMistakes: '常见误区',
      tools: '实用工具推荐',
      conclusion: '总结',
    },
    toolsList: {
      'color-picker': { name: '取色器', desc: '用直观的色轮选取HEX、RGB、HSL颜色，一键复制颜色代码。' },
      'palette-generator': { name: '调色板生成器', desc: '为你的下一个项目生成漂亮的和谐配色方案。' },
      'gradient-generator': { name: '渐变生成器', desc: '用可视化编辑器创建惊艳的CSS渐变，即时复制代码。' },
      'contrast-checker': { name: '对比度检查器', desc: '检查WCAG 2.1 AA/AAA色彩对比度标准。' },
      'image-extractor': { name: '图片取色器', desc: '从任意图片中提取主色调，上传即得配色方案。' },
      'tailwind-generator': { name: 'Tailwind生成器', desc: '从基础色生成Tailwind CSS完整色系。' },
    },
  },
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof dictionaries.en & typeof dictionaries.zh;

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale as Locale] || dictionaries.en;
}
