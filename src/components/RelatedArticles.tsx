/**
 * 相关文章组件
 * 根据当前页面的slug显示相关文章
 */

interface RelatedArticle {
  title: string;
  slug: string;
  description: string;
}

// 所有文章的数据库
const articleDatabase: RelatedArticle[] = [
  { slug: 'color-theory-basics', title: 'Color Theory Basics', description: 'Learn the fundamentals of color theory' },
  { slug: 'complementary-colors', title: 'Complementary Colors', description: 'Understanding complementary color schemes' },
  { slug: 'analogous-colors', title: 'Analogous Colors', description: 'Master analogous color harmonies' },
  { slug: 'triadic-color-scheme', title: 'Triadic Color Scheme', description: 'Create vibrant designs with triadic colors' },
  { slug: 'monochromatic-colors', title: 'Monochromatic Colors', description: 'Elegant designs with single hue palettes' },
  { slug: 'split-complementary-colors', title: 'Split Complementary Colors', description: 'Easy color harmony technique' },
  { slug: 'tetradic-colors', title: 'Tetradic Colors', description: 'Four-color harmony guide' },
  { slug: 'square-color-scheme', title: 'Square Color Scheme', description: 'Balanced four-color combinations' },
  { slug: 'color-picker-guide', title: 'Color Picker Guide', description: 'How to use the color picker effectively' },
  { slug: 'palette-generator-guide', title: 'Palette Generator Guide', description: 'Create perfect color palettes' },
  { slug: 'gradient-generator-guide', title: 'Gradient Generator Guide', description: 'Design beautiful gradients' },
  { slug: 'contrast-checker-guide', title: 'Contrast Checker Guide', description: 'Ensure accessible color combinations' },
  { slug: 'what-is-hex-color', title: 'What is HEX Color Code', description: 'Understanding HEX color values' },
  { slug: 'rgb-vs-hsl', title: 'RGB vs HSL Comparison', description: 'Choose the right color format' },
  { slug: 'color-trends-2025', title: 'Color Trends 2025', description: 'Latest color design trends' },
  { slug: 'brand-color-selection', title: 'Brand Color Selection', description: 'Choose colors for your brand' },
  { slug: 'wcag-color-accessibility', title: 'WCAG Accessibility', description: 'Make your site accessible' },
  { slug: 'extract-colors-from-image', title: 'Extract Colors from Image', description: 'Pull colors from any image' },
  { slug: 'saas-color-best-practices', title: 'SaaS Color Best Practices', description: 'Color strategies for SaaS products' },
  { slug: 'dark-mode-colors', title: 'Dark Mode Colors', description: 'Design for dark mode' },
  { slug: 'vintage-color-palette', title: 'Vintage Color Palette', description: 'Retro-inspired colors' },
  { slug: 'neon-color-palette', title: 'Neon Color Palette', description: 'Vibrant neon color schemes' },
  { slug: 'pastel-color-palette', title: 'Pastel Color Palette', description: 'Soft and dreamy colors' },
  { slug: 'earth-tone-color-palette', title: 'Earth Tone Color Palette', description: 'Natural, grounded colors' },
  { slug: 'ocean-color-palette', title: 'Ocean Color Palette', description: 'Cool blue-green hues' },
  { slug: 'sunset-color-palette', title: 'Sunset Color Palette', description: 'Warm sunset-inspired colors' },
  { slug: 'forest-color-palette', title: 'Forest Color Palette', description: 'Deep green tones' },
  { slug: 'desert-color-palette', title: 'Desert Color Palette', description: 'Warm desert hues' },
  { slug: 'hex-to-rgb-converter', title: 'HEX to RGB Converter', description: 'Convert color formats instantly' },
  { slug: 'rgb-to-hsl-converter', title: 'RGB to HSL Converter', description: 'Transform RGB to HSL colors' },
  { slug: 'color-code-converter', title: 'Color Code Converter', description: 'All color format conversions' },
  { slug: 'tailwind-colors-guide', title: 'Tailwind Colors Guide', description: 'Master Tailwind color utilities' },
  { slug: 'tailwind-color-palette-generator', title: 'Tailwind Color Palette Generator', description: 'Generate Tailwind palettes' },
  { slug: 'image-color-extractor-online', title: 'Image Color Extractor Online', description: 'Extract colors from any image' },
  { slug: 'wcag-contrast-checker-tool', title: 'WCAG Contrast Checker Tool', description: 'Check accessibility contrast' },
  { slug: 'best-color-picker-tools', title: 'Best Color Picker Tools', description: 'Top color picker recommendations' },
  { slug: 'how-to-choose-website-colors', title: 'How to Choose Website Colors', description: 'Professional color selection tips' },
  { slug: 'color-palette-generator-free', title: 'Color Palette Generator Free', description: 'Free palette generation tools' },
  { slug: 'css-gradient-generator-online', title: 'CSS Gradient Generator Online', description: 'Create CSS gradients easily' },
  { slug: 'css-color-variables', title: 'CSS Color Variables Guide', description: 'Use CSS custom properties' },
  { slug: 'sass-color-functions', title: 'Sass Color Functions', description: 'Advanced Sass color techniques' },
  { slug: 'css-custom-properties-colors', title: 'CSS Custom Properties Colors', description: 'Modern CSS color methods' },
  { slug: 'color-management-design-systems', title: 'Color Management in Design Systems', description: 'Systematic color management' },
  { slug: 'material-design-colors', title: 'Material Design Colors', description: 'Google Material color system' },
  { slug: 'ios-app-color-guidelines', title: 'iOS App Color Guidelines', description: 'Apple Human Interface colors' },
  { slug: 'android-color-guidelines', title: 'Android Color Guidelines', description: 'Material Design color theming' },
  { slug: 'web-app-color-best-practices', title: 'Web App Color Best Practices', description: 'Color for web applications' },
  { slug: 'ecommerce-color-psychology', title: 'E-commerce Color Psychology', description: 'Colors that sell' },
  { slug: 'landing-page-color-tips', title: 'Landing Page Color Tips', description: 'Optimize landing page colors' },
  { slug: 'color-blind-friendly-palettes', title: 'Color Blind Friendly Palettes', description: 'Accessible for everyone' },
  { slug: 'high-contrast-color-combinations', title: 'High Contrast Color Combinations', description: 'Maximum readability' },
  { slug: 'color-psychology-marketing', title: 'Color Psychology in Marketing', description: 'Psychology of color in business' },
  { slug: 'minimalist-color-palette', title: 'Minimalist Color Palette', description: 'Simple and elegant palettes' },
  { slug: 'faq', title: 'FAQ', description: 'Frequently asked questions' },
  { slug: 'tools-comparison', title: 'Tools Comparison', description: 'Compare our color tools' },
];

// 根据slug获取相关文章
function getRelatedArticles(currentSlug: string, count: number = 4): RelatedArticle[] {
  const others = articleDatabase.filter(a => a.slug !== currentSlug);
  const shuffled = others.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const related = getRelatedArticles(currentSlug, 4);
  
  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {related.map((article) => (
          <a
            key={article.slug}
            href={`/${article.slug}`}
            className="block p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <h3 className="font-semibold text-blue-600 group-hover:text-blue-700 mb-1">
              {article.title}
            </h3>
            <p className="text-sm text-gray-600">{article.description}</p>
          </a>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Try Our Free Tools</h3>
        <div className="flex flex-wrap gap-2">
          <a href="/color-picker" className="px-4 py-2 bg-white rounded-full text-sm border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors">
            Color Picker
          </a>
          <a href="/palette-generator" className="px-4 py-2 bg-white rounded-full text-sm border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors">
            Palette Generator
          </a>
          <a href="/gradient-generator" className="px-4 py-2 bg-white rounded-full text-sm border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors">
            Gradient Generator
          </a>
          <a href="/contrast-checker" className="px-4 py-2 bg-white rounded-full text-sm border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors">
            Contrast Checker
          </a>
        </div>
      </div>
    </div>
  );
}

export { getRelatedArticles, articleDatabase };
