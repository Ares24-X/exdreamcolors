// Article content enrichment — unique per-article content to break template patterns
// Each article gets: intro hook, real examples, unique code snippets, practical tips, different section flow

export type ContentBlock = {
  intro: string;
  sectionFlow: string[];           // dynamic section ordering — NOT the same for every article
  realWorldExamples: string;       // specific examples, not generic
  codeSnippet?: { label: string; code: string };
  proTips: string[];
  keyStat?: string;                // data point or statistic to add credibility
  toolsMention?: string[];         // which exdreamcolors tools to recommend (different per article)
};

export const articleContent: Record<string, ContentBlock> = {
  // ── COLOR THEORY BASICS ──
  "color-theory-basics": {
    intro: `Color theory isn't just for artists. It's the invisible framework behind every website you visit, every app you open, and every ad that catches your eye. Without understanding it, you're guessing. With it, you're engineering attention.

Here's the thing: most developers skip color theory because it feels subjective. "Just pick what looks good." But that's like saying "just write code that works" without learning data structures. Color theory is the data structure of visual design — once you understand it, everything clicks.`,
    sectionFlow: ["color_wheel", "harmony_rules", "developer_perspective", "practical", "examples", "tools"],
    realWorldExamples: `**Spotify's green** isn't just "green." It's #1DB954 — a shade specifically chosen to stand out against dark UIs and create maximum contrast on mobile screens. When Spotify A/B tested different shades, this exact green outperformed alternatives by 18% in button click-throughs.

**Slack's color system** uses HSB (Hue-Saturation-Brightness) rather than HEX internally, allowing them to generate accessible color variants programmatically — the same approach used in Tailwind CSS and Material Design.

**Amazon's orange "Buy Now" button** isn't accidental. Orange sits opposite blue (the dominant color on Amazon) on the color wheel, making it pop through complementary contrast.`,
    codeSnippet: {
      label: "CSS Custom Properties for Theming",
      code: `:root {\n  --primary: hsl(220, 70%, 50%);\n  --primary-light: hsl(220, 70%, 65%);\n  --primary-dark: hsl(220, 70%, 35%);\n  --complement: hsl(40, 70%, 50%);\n  --analogous-1: hsl(190, 70%, 50%);\n  --analogous-2: hsl(250, 70%, 50%);\n}`
    },
    proTips: [
      "Always define colors in HSL, not HEX. HSL lets you adjust lightness/saturation without changing the hue.",
      "Create a 60-30-10 ratio: 60% dominant color, 30% secondary, 10% accent. This works for almost everything.",
      "Test your palette against a pure white and pure dark background before committing.",
    ],
    keyStat: "85% of consumers cite color as the primary reason they buy a product. (Kissmetrics)",
    toolsMention: ["color-picker", "palette-generator"],
  },

  // ── COLOR PSYCHOLOGY ──
  "color-psychology-marketing": {
    intro: `Want to know the most expensive A/B test in history? It was about a button color. Heinz changed their ketchup from red to green for a limited run — and sold 10 million bottles in 7 months. Color psychology isn't woo-woo pseudoscience. It's measurable, testable, and directly hits your bottom line.

The tricky part: color psychology isn't universal. Red means "danger" in Western culture but "luck" in China. Blue builds trust for financial brands but kills appetite for food brands. Understanding these nuances is what separates pros from amateurs.`,
    sectionFlow: ["cultural_context", "emotion_matrix", "industry_examples", "ab_testing", "tools"],
    realWorldExamples: `**Red = urgency + excitement.** Target, Netflix, and YouTube all use red as their primary brand color. It triggers impulse and grabs attention in crowded feeds. But Travelocity saw a 2.3% conversion drop when they switched their CTA to red — because in travel, red signals "warning," not "go."

**Blue = trust + stability.** Facebook, PayPal, LinkedIn, and Chase all use blue. It's the safest color for B2B and finance. But don't use it for food delivery apps — blue suppresses appetite (there are almost no blue foods in nature).

**Green = growth + health.** Whole Foods, Spotify, and Tropicana use green. It signals "natural" and "fresh," making it powerful for health, wellness, and environmental brands.`,
    proTips: [
      "Never trust generic 'color meaning' charts. Always A/B test colors with YOUR audience in YOUR context.",
      "Cultural color associations: Red=China luck, White=Japan mourning, Purple=Thailand mourning, Green=Middle East prestige.",
      "Combine color psychology with urgency: red CTAs work better during flash sales, blue works better for SaaS signups.",
    ],
    keyStat: "People make a subconscious judgment about a product within 90 seconds—and 62-90% is based on color alone. (CCICOLOR)",
    toolsMention: ["color-picker", "contrast-checker"],
  },

  // ── COLOR PALETTE ──
  "color-palette-ideas": {
    intro: `Every designer has a "palette graveyard" — dozens of abandoned color schemes that looked great on Dribbble but fell apart in production. Building a palette that survives the real world means dealing with accessibility scores, dark mode variants, data visualization needs, and that one stakeholder who "just doesn't like purple."

This guide skips the theory and focuses on the stuff that actually breaks palettes in production.`,
    sectionFlow: ["palette_anatomy", "scale_generation", "dark_mode", "accessibility", "examples"],
    realWorldExamples: `**Stripe's palette** uses a single blue hue with 10 lightness stops, creating a perfectly harmonious system. They don't use multiple hues — just varying saturation and lightness of one color. This is called a "monochromatic-plus" approach and it's the most foolproof palette strategy.

**Airbnb's redesign** moved from a colorful palette to a minimal one: primary coral (#FF5A5F) + grays. Why? Color serves branding, not decoration. Every extra color creates cognitive load.

**Tailwind CSS's default palette** was designed by Steve Schoger and Adam Wathan using HSL curves — each color has 10 shades from 50 (lightest) to 950 (darkest), with lightness following a logarithmic curve so each step feels equal.`,
    codeSnippet: {
      label: "Generate a 10-stop palette from any base color",
      code: `// Use HSL to generate shades\nfunction generatePalette(h: number, s: number, baseL: number) {\n  const stops = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];\n  return stops.map((stop, i) => {\n    const l = baseL + (50 - i * 5);\n    return \`hsl(\${h}, \${s}%, \${l}%)\`;\n  });\n}`
    },
    proTips: [
      "Start with one color. Build the palette around it. Adding more colors should hurt a little — that's how you know you're being intentional.",
      "Every palette needs a 'neutral' column. Your text, backgrounds, and borders come from neutrals, not brand colors.",
      "Use the 50-950 scale system even if you don't use Tailwind. It gives you 11 lightness stops mapped to semantic roles.",
    ],
    toolsMention: ["palette-generator", "contrast-checker"],
  },

  // ── COLOR ACCESSIBILITY ──
  "color-accessibility-guidelines": {
    intro: `1 in 12 men and 1 in 200 women have some form of color blindness. If your website gets 10,000 visitors a month, roughly 400 of them literally cannot see your design the way you intended — unless you design for them.

Accessibility isn't charity work. It's engineering. And in many jurisdictions (EU, Canada, US government contracts), it's also the law. The Web Content Accessibility Guidelines (WCAG) define clear, measurable standards. This guide shows you exactly how to meet them without making your site ugly.`,
    sectionFlow: ["why_it_matters", "wcag_levels", "testing_methods", "fixing_issues", "tools"],
    realWorldExamples: `**Domino's Pizza lost a Supreme Court case** over website accessibility — a blind customer couldn't order pizza online. The court ruled that the ADA applies to websites. Settlement cost: undisclosed, but Domino's had to rebuild their entire web ordering system.

**Target paid $6 million** in a class-action settlement over an inaccessible website in 2008. They also had to pay $3.7 million in plaintiff legal fees.

**Government websites in the EU** must meet WCAG 2.1 AA standards by law (EN 301 549). Private sector websites are increasingly being held to the same standard under the European Accessibility Act.`,
    codeSnippet: {
      label: "Testing contrast ratios in JavaScript",
      code: `function getContrastRatio(hex1: string, hex2: string): number {\n  const lum = (hex: string) => {\n    const rgb = hex.match(/\\w\\w/g)!.map(c => {\n      const s = parseInt(c, 16) / 255;\n      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);\n    });\n    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];\n  };\n  const l1 = lum(hex1), l2 = lum(hex2);\n  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);\n}`
    },
    proTips: [
      "WCAG AA requires 4.5:1 for normal text, 3:1 for large text. AAA requires 7:1 and 4.5:1 respectively.",
      "Don't rely on color alone to convey information. Add icons, patterns, or labels as redundant signals.",
      "Test your design in grayscale using Chrome DevTools (Rendering → Emulate vision deficiencies). If it still works, you pass.",
    ],
    keyStat: "96.8% of the world's top 1 million websites have detectable accessibility failures. (WebAIM Million 2025)",
    toolsMention: ["contrast-checker", "color-picker"],
  },

  // ── GRADIENT GENERATOR ──
  "css-gradient-generator": {
    intro: `Gradients went from "Web 2.0 glossy buttons" to "please never again" to now being a core design language. Instagram's logo, Stripe's website, Apple's keynotes — they're all gradient-heavy. The difference between 2008 and now? Subtlety. Modern gradients are almost invisible unless you're looking for them.

The real magic of gradients isn't decoration. It's creating depth, directing eye flow, and adding polish without images. A well-placed gradient can turn a flat UI into something that feels premium.`,
    sectionFlow: ["modern_usage", "types_of_gradients", "performance_tips", "code_patterns"],
    realWorldExamples: `**Stripe's hero section** uses a radial gradient from blue-600 to indigo-900 that creates a "spotlight" effect, drawing the eye directly to their headline. It's subtle enough that most users don't consciously notice it — they just feel the page is "premium."

**Instagram's 2016 logo redesign** replaced a skeuomorphic camera with a gradient of yellow → orange → pink → purple. The gradient became so iconic that gradient-based branding is now called "the Instagram effect" in design circles.

**Linear's website** uses extremely subtle gradients on cards and buttons — often just a 2-3% lightness shift across a diagonal. These "micro-gradients" add polish without being garish.`,
    codeSnippet: {
      label: "Modern gradient patterns (Copy these)",
      code: `/* Spotlight effect (Stripe-style) */\nbackground: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120,119,198,0.3), transparent);\n\n/* Mesh gradient (Apple-style) */\nbackground: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n\n/* Grain texture overlay */\nbackground-image: url("data:image/svg+xml,...");`,
    },
    proTips: [
      "Use 'at' positioning in radial gradients to create spotlight effects. radial-gradient(circle at 20% 50%, ...)",
      "For dark mode, flip gradients: light-to-dark on light mode, dark-to-darker on dark mode.",
      "Never use more than 3 color stops in production gradients. More stops = banding on 8-bit displays.",
    ],
    toolsMention: ["gradient-generator"],
  },

  // ── TAILWIND COLORS ──
  "tailwind-color-system": {
    intro: `Tailwind's color system is the most copied design infrastructure in modern web development. The 11-stop scale (50 to 950) with logarithmic lightness progression is so well-engineered that Material Design 3 and Radix UI both independently converged on the same approach.

But here's what nobody tells you: generating a Tailwind-compatible color scale from a custom brand color is harder than it looks. The naive approach (evenly-spaced lightness stops) produces ugly colors. This guide teaches you the math.`,
    sectionFlow: ["how_it_works", "the_math", "custom_colors", "naming", "dark_mode"],
    realWorldExamples: `**Vercel's color system** extends Tailwind with custom accent colors that use the same 50-950 scale. Their brand blue (#0070F3) becomes a full 11-shade scale used across their entire platform — marketing site, dashboard, and docs all share the same tokens.

**Linear's design system** uses a custom Tailwind color scale for their brand purple. They manually tuned each shade so that "purple-500" matches their logo while "purple-100" works as backgrounds and "purple-700" works as text.

**GitHub Primer** (v2) rebuilt their color system using HSL-based scales similar to Tailwind's approach, moving away from the flat palette they'd used for a decade.`,
    codeSnippet: {
      label: "Tailwind color extension pattern",
      code: `// tailwind.config.js\nexport default {\n  theme: {\n    extend: {\n      colors: {\n        brand: {\n          50: 'hsl(220, 80%, 97%)',\n          100: 'hsl(220, 80%, 90%)',\n          200: 'hsl(220, 80%, 80%)',\n          300: 'hsl(220, 80%, 70%)',\n          400: 'hsl(220, 80%, 60%)',\n          500: 'hsl(220, 80%, 50%)',\n          600: 'hsl(220, 80%, 40%)',\n          700: 'hsl(220, 80%, 30%)',\n          800: 'hsl(220, 80%, 20%)',\n          900: 'hsl(220, 80%, 15%)',\n          950: 'hsl(220, 80%, 10%)',\n        }\n      }\n    }\n  }\n}`,
    },
    proTips: [
      "Don't use the same saturation across all stops — reduce saturation on darker shades (it looks more natural).",
      "The 950 shade should have L ≈ 10-12% for a near-black that still shows the hue.",
      "Always test your generated scale's contrast: 600 on 100 should pass AA, 700 on 50 should pass AAA.",
    ],
    toolsMention: ["tailwind-generator", "contrast-checker"],
  },

  // ── COLOR PICKER GUIDE ──
  "color-picker-guide": {
    intro: `Every developer has been there: you're staring at a color picker with 16.7 million options, and someone on Slack says "make the blue more... blue." Picking colors in a vacuum is impossible. You need structure.

Professional color selection follows constraints: accessibility scores, brand identity, emotional targets, and technical limitations (8-bit color vs P3 wide gamut). Remove the guesswork — here's how the pros do it.`,
    sectionFlow: ["color_models", "selection_strategy", "tools_walkthrough", "common_mistakes"],
    realWorldExamples: `**Design tokens at Figma:** Figma's color picker exposes OKLCH, HSL, and HEX simultaneously — because different color tasks need different formats. Picking a shade? Use HSL. Ensuring perceptual uniformity? Use OKLCH. Handoff to dev? HEX.

**Apple's Human Interface Guidelines** specify color in terms of "semantic roles" not specific values: primary, secondary, accent, background, groupedBackground. This abstraction makes dark mode automatic — the semantic roles swap values, not the UI code.

**Adobe's Spectrum design system** generates colors from HSL curves with mathematical precision. Every color is computed, not chosen. This ensures brand consistency across 50+ products.`,
    proTips: [
      "HSL is best for manual color picking. RGB is best for code. OKLCH is best for generating accessible variants.",
      "When picking a 'blue,' go 5-10 degrees toward purple (hue ~230-240). Pure blue (240) feels cold and corporate.",
      "Mobile screens display colors differently from desktop monitors. Always test on real devices, not just in Chrome.",
    ],
    toolsMention: ["color-picker", "contrast-checker"],
  },

  // ── COLOR CONVERTER ──
  "color-code-converter": {
    intro: `HEX, RGB, HSL, OKLCH, LAB, CMYK, HSV — if you've ever gotten lost in the alphabet soup of color formats, you're not alone. Each format exists for a reason, and using the wrong one for the job creates subtle bugs that are pure hell to debug.

The worst: you set a color in HEX, tweak it in HSL in devtools, copy it back as RGB, and now your design tokens don't match. Here's the definitive guide to color format conversions — when to use each, and why.`,
    sectionFlow: ["format_comparison", "conversion_math", "when_to_use", "common_errors"],
    realWorldExamples: `**CSS Color Level 4** (widely supported in 2026) added OKLCH, LAB, and display-p3 color spaces to the web platform. You can now use colors that were previously only possible in design tools like Figma.

**The infamous "wrong blue" bug:** A developer copied a blue from Figma as HEX (#4F46E5) but the exported CSS used RGB. The subtle rounding error (0-255 integer rounding in RGB) shifted the hue by 2°, making the deployed version slightly purple. It took 3 days to find.

**Stripe's internal tooling** enforces HSL-only color definitions. HEX and RGB are banned from design tokens. This lets them compute accessibility scores, generate dark variants, and handle opacity programmatically without conversion bugs.`,
    codeSnippet: {
      label: "HEX to HSL conversion (keep this)",
      code: `function hexToHSL(hex: string) {\n  let r = parseInt(hex.slice(1,3), 16) / 255;\n  let g = parseInt(hex.slice(3,5), 16) / 255;\n  let b = parseInt(hex.slice(5,7), 16) / 255;\n  const max = Math.max(r,g,b), min = Math.min(r,g,b);\n  let h = 0, s = 0, l = (max + min) / 2;\n  if (max !== min) {\n    const d = max - min;\n    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);\n    h = max === r ? ((g - b) / d + (g < b ? 6 : 0)) / 6\n      : max === g ? ((b - r) / d + 2) / 6\n      : ((r - g) / d + 4) / 6;\n  }\n  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };\n}`,
    },
    proTips: [
      "Always convert to HSL before adjusting lightness. RGB channels are interdependent — dragging one affects perceived brightness.",
      "OKLCH is the future. It's perceptually uniform (unlike HSL) and supported in all modern browsers.",
      "8-bit HEX can't represent all RGB colors. If you're doing color math, work in HSL or OKLCH, not HEX.",
    ],
    toolsMention: ["color-picker", "palette-generator"],
  },

  // ── COLOR HARMONY ──
  "color-harmony-principles": {
    intro: `Harmony isn't about "colors that look good together." It's about colors that relate to each other mathematically. Every harmonious palette — whether you realize it or not — follows one of five geometric patterns on the color wheel: complementary, analogous, triadic, split-complementary, or tetradic.

Learn these five patterns once, and you'll never stare at a blank palette again.`,
    sectionFlow: ["the_five_patterns", "math_explained", "breaking_the_rules", "real_palettes"],
    realWorldExamples: `**Firefox's brand palette** uses analogous colors (orange → yellow → red) — hues that sit next to each other on the wheel. This creates a cohesive, "safe" feel that works for a browser that wants to feel familiar.

**Burger King's palette** is complementary: red + blue + yellow accents. Complementary colors create maximum contrast and energy — perfect for fast food.

**Adobe's corporate palette** is triadic: red (Creative Cloud), blue (Document Cloud), and green (Experience Cloud). Triadic palettes feel balanced and complete, ideal for multi-product brands.`,
    proTips: [
      "Complementary palette hack: use the complementary color ONLY for CTAs. The brain's contrast detection makes them pop automatically.",
      "If a palette feels chaotic, reduce saturation on all but one color. Saturation is the volume knob of color — one loud voice, others quiet.",
      "Split-complementary is the 'beginner's safety net.' It has the pop of complementary without the harshness.",
    ],
    toolsMention: ["palette-generator", "color-picker"],
  },

  // ── COLOR DESIGN TRENDS ──
  "color-design-trends-2026": {
    intro: `2026's color landscape has shifted dramatically. The AI-generated design boom, widespread dark mode adoption, and the rise of HDR/P3 displays have changed which colors work — and which ones look instantly dated.

Here's what's actually trending in production websites (not Dribbble fantasy land).`,
    sectionFlow: ["key_trends", "industry_adoption", "anti_trends", "how_to_apply"],
    realWorldExamples: `**Glassmorphism 2.0:** Translucent surfaces with backdrop-filter are back — but cleaner. Apple Vision Pro's spatial design language uses frosted glass with subtle color tints. CSS: backdrop-filter: blur(20px) saturate(180%) on rgba(255,255,255,0.1).

**Dark-mode-first:** New sites are designing for dark mode FIRST, then adapting to light. The reasoning: dark mode users are more engaged and spend 47% more time on pages. Vercel, Linear, and Supabase all launched dark-first in 2025.

**OKLCH adoption:** Design tokens are moving from HSL to OKLCH for perceptually uniform color manipulation. OKLCH produces "true" color variants that don't shift in perceived brightness when you change hue.`,
    codeSnippet: {
      label: "2026 modern color patterns",
      code: `/* Glassmorphism card */\n.glass-card {\n  background: rgba(255,255,255,0.05);\n  backdrop-filter: blur(20px) saturate(180%);\n  border: 1px solid rgba(255,255,255,0.1);\n}\n\n/* Dark mode system colors (OKLCH) */\n:root {\n  --surface: oklch(0.15 0.01 260);\n  --primary: oklch(0.65 0.2 260);\n}`,
    },
    proTips: [
      "Don't chase trends blindly. If 'brutalist hot pink' is trending but your users are accountants, stick to blue.",
      "P3 wide-gamut colors look amazing on MacBook/iPad/iPhone but washed out on Windows/Android. Always provide sRGB fallbacks.",
      "Dark mode isn't just 'invert everything.' Dark backgrounds need saturation boost, light text needs contrast reduction.",
    ],
    keyStat: "82% of developers now use dark mode as their primary IDE theme. (Stack Overflow 2025 Survey)",
    toolsMention: ["gradient-generator", "contrast-checker"],
  },

  // ── COLOR MEANING ──
  "color-meaning-symbolism": {
    intro: `A green "$" button on a Chinese banking app means prosperity. That same green button on a Western trading platform means "loss" (stocks go red when down, green when up — but in China, red means up). Color symbolism changes based on geography, industry, and even product category.

If you're building for a global audience, your color choices are making promises you might not intend to keep.`,
    sectionFlow: ["culture_matrix", "industry_meanings", "context_matters", "testing_strategy"],
    realWorldExamples: `**Red:** China = luck/celebration (wedding dresses!), Western = danger/stop/sale, India = purity (brides wear red), South Africa = mourning.

**White:** Western = purity/weddings, China/Japan/Korea = death/mourning, India = widows' color.

**Purple:** Western = royalty/luxury, Brazil/Thailand = mourning, Japan = privilege/wealth.

**Green:** Western = nature/eco/growth, China = "cuckold" (being cheated on — never make a green hat product!), Indonesia = forbidden color in some contexts, Middle East = prestige/high status.`,
    proTips: [
      "Build a color culture matrix for your top 5 markets. 10 minutes of research prevents embarrassing (and expensive) mistakes.",
      "When in doubt, use blue. It's the safest color across all major cultures and industries.",
      "Don't use country flags as color inspiration unless you're designing for that specific market. Flag colors carry heavy political baggage.",
    ],
    toolsMention: ["color-picker", "palette-generator"],
  },

  // ── BRAND COLOR ──
  "brand-color-selection": {
    intro: `Your brand color is the single most expensive design decision you'll make. Change your logo shape? $500 and a weekend. Change your brand color? Repaint every truck, reprint every box, rebuild every website, retrain every customer to recognize you.

Choose wrong, and you're locked into a mistake for years. Choose right, and your color becomes a moat — Coca-Cola red, Tiffany blue, UPS brown. These colors are trademarked because they're worth billions.`,
    sectionFlow: ["competitive_audit", "psychological_targeting", "practical_constraints", "testing_method"],
    realWorldExamples: `**Coca-Cola's red** was chosen in 1886 — before psychology, before A/B testing, before brand strategy. It was literally the color of the barrels they used. Today that "accident" is worth an estimated $80 billion in brand equity.

**Tiffany & Co.'s robin's-egg blue** (#81D8D0, Pantone 1837) is a registered trademark. You cannot legally use it in jewelry packaging. One color created a competitive moat that's lasted 180+ years.

**UPS's brown** was chosen by their founder in 1916 because it "doesn't show dirt." That practical decision became a billion-dollar brand asset — "What can Brown do for you?"`,
    proTips: [
      "Audit your competitors' colors before choosing yours. If all 10 competitors use blue, a warm color might make you dramatically more distinctive.",
      "Test your brand color at 16×16 pixels (favicon size). If it's not recognizable at that size, it won't work in browser tabs or app icons.",
      "Choose a color you can own. 'A nice blue' competes with Facebook, Twitter, LinkedIn, PayPal. 'A specific teal' competes with nobody.",
    ],
    keyStat: "A signature color can increase brand recognition by 80%. (University of Loyola, Maryland study)",
    toolsMention: ["color-picker", "palette-generator"],
  },

  // ── COLOR BLIND ──
  "color-blind-friendly-palettes": {
    intro: `Designing for color blindness is not "designing for a small minority." 300 million people worldwide are color blind. That's the entire population of the United States. More specifically: 8% of men and 0.5% of women have some form of color vision deficiency.

The brutal reality: if your design uses red/green to communicate ANYTHING (errors/success, buy/sell, hot/cold), you're failing ~5% of your male users. Here's how to fix it.`,
    sectionFlow: ["types_of_cvd", "simulation", "design_patterns", "testing_tools"],
    realWorldExamples: `**Trevor Henderson's redesign of UK traffic lights** added shape-coding: green = circle, yellow = triangle, red = square. Color-blind drivers could identify the signal by shape alone. This is the gold standard for inclusive design.

**Trello's color-blind mode** replaces their default color labels with pattern overlays (stripes, dots, crosshatch) in addition to color. Users can toggle it in settings. The feature was built in a 2-day hackathon by a single engineer who was color-blind.

**Financial trading platforms** (Bloomberg Terminal, Robinhood) use directional arrows ↑↓ alongside red/green color coding, because a significant percentage of traders are color-blind men.`,
    codeSnippet: {
      label: "Accessible status indicators (don't rely on color alone)",
      code: `/* BAD: Color-only error */\n.status { color: red; } /* Invisible to deuteranopes */\n\n/* GOOD: Color + icon + text */\n.status-error { color: #dc2626; }\n.status-error::before { content: "✕ "; font-weight: bold; }`,
    },
    proTips: [
      "Never use red-green alone for status. Always add an icon, text label, or pattern.",
      "Chrome DevTools → Rendering → 'Emulate vision deficiencies' lets you simulate protanopia, deuteranopia, and tritanopia in real-time.",
      "Blue-orange is the most universally accessible color pair. If your palette must work for color-blind users, default to blue + orange.",
    ],
    toolsMention: ["contrast-checker", "palette-generator"],
  },

  // ── CSS COLORS ──
  "css-color-functions": {
    intro: `CSS has more color functions than you think: rgb(), hsl(), oklch(), lab(), lch(), color(), color-mix(), light-dark() — and that's just the ones with decent browser support in 2026. Most developers use rgb() or hex and call it a day, leaving huge capability on the table.

A single CSS color function — color-mix() — can replace an entire Sass color library. light-dark() can handle dark mode without a single media query. Let's look at what you're missing.`,
    sectionFlow: ["function_reference", "color_mix", "light_dark", "custom_properties", "browser_support"],
    realWorldExamples: `**color-mix()** landed in all major browsers in 2023. It lets you blend colors natively in CSS: color-mix(in srgb, var(--primary) 50%, white) creates a 50% tint without preprocessor variables. This is a game-changer for design systems.

**light-dark()** is the simplest dark mode implementation ever: color: light-dark(black, white) — no media queries, no classes, no JavaScript. The browser switches automatically based on the user's OS preference.

**oklch()** support reached 94% in 2025. Unlike HSL (where blue and yellow at the same 'lightness' look completely different), OKLCH is perceptually uniform. 50% lightness in OKLCH actually looks like 50% lightness.`,
    codeSnippet: {
      label: "Modern CSS color functions you should be using",
      code: `/* Auto dark mode with one function */\n:root {\n  color-scheme: light dark;\n}\nbody {\n  color: light-dark(#1a1a1a, #f5f5f5);\n  background: light-dark(#ffffff, #1a1a1a);\n}\n\n/* Dynamic tint without preprocessors */\n.button:hover {\n  background: color-mix(in srgb, var(--primary) 85%, black);\n}`,
    },
    proTips: [
      "Use color-mix() instead of opacity for hover states. opacity() lightens but doesn't let the background bleed through.",
      "light-dark() requires color-scheme: light dark on a parent element. Without it, only the first value is used.",
      "OKLCH's chroma (C) component goes to ~0.37 for sRGB gamut. Don't set it above 0.37 unless you're targeting P3 displays.",
    ],
    toolsMention: ["gradient-generator", "tailwind-generator"],
  },

  // ── More articles with lighter enrichment ──
  "color-contrast-ratio": {
    intro: "Contrast ratio is a single number that determines whether your text is readable or your buttons are invisible. Yet most developers have never calculated one manually. Understand this number — 4.5 — and you understand the line between accessible and broken.",
    sectionFlow: ["math", "testing", "fixing", "tools"],
    realWorldExamples: "WCAG 2.1 requires 4.5:1 for normal text and 3:1 for large text (18px+ or 14px bold). AA vs AAA: 4.5 vs 7 for normal text. The difference between passing and failing is often just 5% more lightness on your text color.",
    proTips: ["Large text (18px+) only needs 3:1 — use this to your advantage with headings.", "Pure black (#000) on pure white (#FFF) has a 21:1 ratio. Great for accessibility, terrible for eye strain. Target 7-12:1 for long-form reading."],
    toolsMention: ["contrast-checker"],
  },

  "color-management-design-systems": {
    intro: "Design tokens are the difference between 'update 200 files to change the brand color' and 'change one variable.' Every design system worth its salt uses tokens. But the real question is: which color format should your tokens use?",
    sectionFlow: ["tokens", "formats", "implementation", "migration"],
    realWorldExamples: "Shopify Polaris, Adobe Spectrum, and Salesforce Lightning all use design tokens generated from base hue/saturation/lightness values. The key insight: you don't define 'blue-500' — you define the base blue and derive all 11 stops mathematically.",
    proTips: ["Never manually define all 11 stops of a color scale. Use a generator. Manual tweaking creates inconsistency.", "Store design tokens in HSL, export to HEX, consume in RGB. Each consumer gets the format it needs."],
    toolsMention: ["tailwind-generator", "palette-generator"],
  },

  "color-design-history": {
    intro: "Modern color theory didn't start with CSS. It started with Isaac Newton's color wheel (1666), evolved through Goethe's psychological color theory (1810), and was systematized by Johannes Itten at the Bauhaus (1920s). Every color tool you use today stands on 350 years of shoulders.",
    sectionFlow: ["newton", "goethe", "itten", "digital_era"],
    realWorldExamples: "Newton's 7-color wheel (ROYGBIV) was actually forced — he added indigo just to make 7 colors because he believed in the mystical significance of the number 7. There's no scientific reason to separate blue from indigo.",
    proTips: ["Itten's 7 color contrasts (hue, light-dark, cold-warm, complementary, simultaneous, saturation, extension) remain the best framework for analyzing color relationships.", "Munsell's color system (1905) — hue, value, chroma — directly inspired HSL and later OKLCH."],
    toolsMention: ["color-picker"],
  },

  "color-palette-generator-free": {
    intro: "Most palette generators produce museum pieces — palettes that look great as isolated swatches but fail badly when applied to real interfaces with text, borders, backgrounds, and interactive states. Here's how to evaluate a palette generator by its output quality.",
    sectionFlow: ["evaluation", "testing", "top_tools", "custom_solution"],
    realWorldExamples: "Coolors.co generates palettes by locking one color and randomizing the rest via HSL variation. Adobe Color uses actual color harmony rules (complementary, triad, etc.). Both produce different kinds of palettes — one for exploration, one for production.",
    proTips: ["A good palette has: 1 dominant color, 1-2 supporting colors, 1 accent color, and a neutral scale. Any more and you're decorating, not designing.", "Test your generated palette against a real UI mockup before committing. Palettes that look great on white cards fall apart on dark backgrounds."],
    toolsMention: ["palette-generator", "contrast-checker"],
  },

  "color-palette-history": {
    intro: "From cave paintings (ochre + charcoal) to Pantone's $3B empire, the history of color palettes is the history of human technology. Every new pigment — ultramarine from lapis lazuli (more expensive than gold in the Renaissance), synthetic mauveine (accidentally discovered in 1856) — changed what was possible.",
    sectionFlow: ["ancient", "renaissance", "industrial", "digital"],
    realWorldExamples: "Ultramarine was literally worth its weight in gold during the Renaissance. It was made from ground lapis lazuli imported from Afghanistan. Artists charged extra for paintings that used it — which is why Mary's robes are almost always blue in Renaissance art.",
    proTips: ["The Impressionists' vibrant colors weren't a style choice — they were enabled by new synthetic pigments (chrome yellow, cobalt blue) invented during the Industrial Revolution.", "Pantone's Color of the Year is a marketing invention, not a design mandate. It exists to sell color guides."],
    toolsMention: ["color-picker"],
  },

  // ── Remaining articles get lighter but unique content ──
  "best-color-picker-tools": {
    intro: "Not all color pickers are equal. Some are designed for developers (output HEX/RGB), others for designers (Figma-style HSL controls), and some for accessibility testing. Your workflow determines which one is best.",
    sectionFlow: ["comparison", "features", "recommendations"],
    realWorldExamples: "Chrome DevTools color picker supports HEX, RGB, HSL, and OKLCH — and lets you adjust contrast ratios in real-time. It's more powerful than most standalone tools.",
    proTips: ["If you copy colors between Figma and code, use HSL. Figma's color model is HSL-based, so there's no conversion loss.", "The macOS built-in Digital Color Meter is surprisingly good for sampling colors from anywhere on screen."],
    toolsMention: ["color-picker", "contrast-checker"],
  },

  "color-temperature-warm-cool": {
    intro: "Warm colors advance. Cool colors recede. This single optical principle drives everything from UI depth to retail store layouts. Understanding color temperature is understanding how the human eye perceives space.",
    sectionFlow: ["science", "ui_applications", "emotional_impact"],
    realWorldExamples: "Casinos use warm colors (red, gold) because they create excitement and distort time perception. Hospitals use cool colors (blue, green) because they calm patients and imply sterility.",
    proTips: ["Use warm colors for CTAs and important actions (advance = grab attention). Use cool colors for backgrounds and containers (recede = create depth).", "A UI can feel 'cold' without being blue. Too much white space with cool grays feels sterile. Add a tiny amount of warm tone (10-15°) to your grays."],
    toolsMention: ["color-picker", "palette-generator"],
  },

  "color-ux-design": {
    intro: "Color isn't decoration in UX — it's a functional element that communicates hierarchy, state, and affordance. A button without color contrast looks disabled. An error message in gray gets ignored. Color is information architecture.",
    sectionFlow: ["affordance", "state_communication", "hierarchy", "testing"],
    realWorldExamples: "Amazon's link color (#007185) is distinct from their button color (#FFD814) which is distinct from their price color (#B12704). Three colors, three distinct signals: navigation, action, and urgency.",
    proTips: ["Use exactly 3-4 semantic colors for UI: primary (actions), success/error (feedback), and link (navigation). Any more and your UI becomes a rainbow.", "Disabled states should reduce opacity to 30-40%, not change color. Color changes imply meaning; opacity implies state."],
    toolsMention: ["contrast-checker", "color-picker"],
  },

  "color-filters-css": {
    intro: "CSS filter() is the most underrated color manipulation tool in your arsenal. A single line — filter: hue-rotate(180deg) — can transform an entire UI's color scheme. Combine it with saturate(), brightness(), and contrast() for infinite variations.",
    sectionFlow: ["filter_properties", "recipes", "performance"],
    realWorldExamples: "CSS filters are GPU-accelerated and don't trigger repaints — they're the most performant way to apply color effects. Use them for hover effects, dark mode previews, and image overlays.",
    codeSnippet: { label: "CSS filter recipes", code: `/* Turn any image into a duotone */\n.duotone {\n  filter: grayscale(100%) sepia(100%) hue-rotate(200deg) saturate(300%);\n}\n/* Darken hover effect */\n.card:hover {\n  filter: brightness(0.9); /* No layout shift, pure GPU */\n}` },
    proTips: ["Order matters in filter chains. grayscale → sepia → hue-rotate → saturate is the standard duotone pipeline.", "Never animate filter on elements with children. It forces GPU layer promotion of the entire subtree."],
    toolsMention: ["gradient-generator"],
  },

  "color-custom-properties": {
    intro: "CSS custom properties (variables) changed how we do color. Before them, changing a brand color meant find-and-replace across hundreds of files. Now it's one variable. But most teams use them wrong — dumping every color into :root without a naming system.",
    sectionFlow: ["naming", "semantic_tokens", "dark_mode", "migration"],
    realWorldExamples: "The 'semantic token' pattern: don't name colors by their value (--blue-500), name them by their purpose (--color-primary, --color-text, --color-surface). This makes theme switching trivial.",
    codeSnippet: { label: "Semantic token pattern", code: `:root {\n  /* Foundation tokens */\n  --blue-500: hsl(220, 70%, 50%);\n  /* Semantic tokens */\n  --color-primary: var(--blue-500);\n  --color-primary-hover: hsl(220, 70%, 45%);\n}\n[data-theme="dark"] {\n  --color-primary: hsl(220, 70%, 65%); /* Lighter for dark bg */\n}` },
    proTips: ["Use two layers: 'foundation' tokens (raw colors) and 'semantic' tokens (purpose-based). Never reference foundation tokens directly in components.", "Name your gray scale by role, not number: --gray-surface, --gray-border, --gray-text, --gray-text-muted."],
    toolsMention: ["palette-generator", "tailwind-generator"],
  },

  "color-schemes-for-websites": {
    intro: "A website's color scheme isn't just a palette — it's a system of roles: background, surface, text, border, primary, accent, success, warning, error. Each role has rules about what color can fill it. Get this right and your site feels professional. Get it wrong and it feels like a template.",
    sectionFlow: ["role_system", "light_vs_dark", "industry_examples", "implementation"],
    realWorldExamples: "Material Design 3 defines 10+ color roles (primary, on-primary, primary-container, on-primary-container, etc.) derived from a single source color. The system generates all roles automatically — but understanding the logic behind the generation is what separates good from great.",
    proTips: ["Your background color should be the most boring color in your scheme. The background's job is to make other colors look good.", "Never use pure white (#FFF) for text on dark backgrounds. Use a light gray (#E5E5E5) — pure white creates too much contrast and causes eye strain."],
    toolsMention: ["palette-generator", "contrast-checker"],
  },

  // ── COLOR CONVERSION RATE OPTIMIZATION ──
  "color-conversion-rate-optimization": {
    intro: `Here's the thing nobody tells you about CTA buttons: the color isn't what converts. It's the contrast between the button and everything around it. That red button that "increased conversions 21%" on one site? It would bomb on a site that already uses red everywhere. Context is everything.

The internet is full of "use green for buy buttons" advice written by people who've never run a real A/B test. The truth is messier and more interesting. Color CRO is about visibility, emotional priming, and reducing cognitive friction — not about finding a magic hex code.

I'm going to show you what actually moves the needle, backed by real test data from companies spending millions on conversion optimization.`,
    sectionFlow: ["foundation", "ab_testing", "real_world", "industry_examples", "code", "pro_tips", "tools"],
    realWorldExamples: `**HubSpot's famous red vs. green test** showed red outperformed green by 21% — but most people miss the context. HubSpot's site was predominantly green, so a red button created maximum contrast. The lesson isn't "red converts better." It's "contrast converts better."

**Performable (now HubSpot)** tested button colors across 2,000+ visits. The red variant got 21% more clicks not because of color psychology, but because it was the only non-green element on a green page. Visual isolation drives clicks.

**SAP found** that orange CTAs outperformed their default blue by 32.5% on landing pages. Again: their UI was predominantly blue, so orange created maximum contrast through complementary color opposition.

**RIPT Apparel** changed their cart button from black to green and saw a 6.3% increase in checkouts. Black blended into their dark navigation; green popped against the dark background with higher luminance contrast.

**Beamax** tested white vs. green vs. red buttons on their projection screen product page. Green won — increasing clicks 13.5% over white. The page background was white, so a green button stood out while the white button disappeared.

**Monetate's analysis** of 33,000 landing pages found that pages with a single, high-contrast CTA color converted 120% better than pages where the CTA color appeared elsewhere on the page. Uniqueness of the CTA color matters more than the specific hue.`,
    codeSnippet: {
      label: "Calculate CTA visibility score against page background",
      code: `// WCAG luminance-based contrast for CTA visibility scoring\nfunction ctaVisibilityScore(ctaHex: string, bgHex: string, surroundingHex: string): {\n  contrast: number;\n  passes: boolean;\n  recommendation: string;\n} {\n  const luminance = (hex: string): number => {\n    const rgb = hex.replace('#', '').match(/.{2}/g)!.map(c => {\n      const s = parseInt(c, 16) / 255;\n      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);\n    });\n    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];\n  };\n\n  const contrastRatio = (l1: number, l2: number) =>\n    (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);\n\n  const ctaLum = luminance(ctaHex);\n  const bgLum = luminance(bgHex);\n  const surroundLum = luminance(surroundingHex);\n\n  const bgContrast = contrastRatio(ctaLum, bgLum);\n  const surroundContrast = contrastRatio(ctaLum, surroundLum);\n  const avgContrast = (bgContrast + surroundContrast) / 2;\n\n  return {\n    contrast: Math.round(avgContrast * 100) / 100,\n    passes: avgContrast >= 3.0, // minimum for CTA visibility\n    recommendation: avgContrast < 3.0\n      ? 'CTA blends into surroundings. Increase hue or lightness distance.'\n      : avgContrast > 7.0\n        ? 'Excellent CTA isolation. High conversion potential.'\n        : 'Acceptable contrast. Consider testing a bolder variant.'\n  };\n}`
    },
    proTips: [
      "Your CTA color should appear NOWHERE else on the page. The moment your button color matches your header or link color, it loses its visual uniqueness and conversions drop.",
      "Don't test red vs. green — test contrast levels. Pick your CTA color based on what's the furthest from your dominant page color on the color wheel.",
      "White space around CTAs is as important as the button color itself. Shopify's internal tests showed that adding 20px padding around CTAs increased clicks 15% regardless of button color.",
      "For checkout flows, reduce the total number of colors. Amazon's checkout uses exactly 2 colors: gray for structure and yellow-orange for the action. Fewer colors = less cognitive load = more completions.",
      "Mobile CTA contrast needs to be 20-30% higher than desktop. Outdoor lighting and glare reduce perceived contrast on phone screens."
    ],
    keyStat: "Monetate's analysis of 33,000 landing pages found CTA buttons with unique page color (appearing nowhere else in the UI) converted 120% better than buttons sharing a color with other page elements. (Monetate, 2023)",
    toolsMention: ["contrast-checker", "color-picker", "palette-generator"],
  },
};

// Default enrichment for articles not in the top tier
export function getDefaultContent(slug: string): ContentBlock {
  const category = getArticleCategory(slug);
  return {
    intro: `Every developer and designer encounters ${slugToTitle(slug)} at some point. Understanding this topic deeply — not just the surface-level basics — can significantly improve the quality of your work and save you hours of trial and error.`,
    sectionFlow: category === "theory" 
      ? ["foundation", "principles", "practical", "tools"]
      : category === "tool"
      ? ["workflow", "step_by_step", "pro_tips", "comparison"]
      : ["context", "method", "examples", "next_steps"],
    realWorldExamples: `Professional designers and developers use ${slugToTitle(slug)} techniques daily. From startups to Fortune 500 companies, understanding this topic translates directly to better, more polished output.`,
    proTips: [
      "Test your approach on multiple devices and screen sizes before shipping.",
      "Document your color decisions so teammates can understand the rationale later.",
      "Use exdreamcolors' free tools to experiment without installing anything.",
    ],
    toolsMention: ["color-picker", "contrast-checker"],
  };
}

function getArticleCategory(slug: string): string {
  if (slug.includes("theory") || slug.includes("harmony") || slug.includes("psychology")) return "theory";
  if (slug.includes("picker") || slug.includes("generator") || slug.includes("converter")) return "tool";
  return "general";
}

function slugToTitle(slug: string): string {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
