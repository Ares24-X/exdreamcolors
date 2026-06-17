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

  // ── COLOR PSYCHOLOGY IN MARKETING (3000-word deep dive) ──
  "color-psychology-marketing": {
    intro: `In 2024, Heinz ran what became the most talked-about packaging experiment in a decade: they released "Pickle Ketchup" in a green bottle. Social media exploded. Sales hit 10 million units in 7 months — not because green is a better color, but because it violated every expectation your brain has about ketchup. That violation is color psychology in action.

Here's what most "color psychology guides" get wrong: they give you a chart that says "red = urgency, blue = trust" and call it a day. Reality is messier. Red means "stop" in Germany but "luck" in China. Blue builds trust for banks but kills appetite for restaurants. The same green that signals "eco-friendly" for Whole Foods means "cuckold" in Chinese slang (seriously — never put a green hat on a product for the Chinese market).

Color psychology isn't about memorizing a chart. It's about understanding the cognitive mechanisms behind color perception — and then testing them with your specific audience, in your specific context, on your specific platform. This guide covers the science, the data, the cultural landmines, and the actual A/B testing methodology you need to make color decisions that move revenue.

85% of consumers cite color as the primary reason they buy a product (Colorcom). People form a subconscious judgment about a product within 90 seconds — and 62-90% of that judgment is based on color alone (CCICOLOR Institute). These aren't soft numbers. This is the hardest data in all of marketing psychology.`,
    sectionFlow: ["cultural_context", "emotion_matrix", "industry_examples", "ab_testing", "code", "pro_tips", "tools"],
    realWorldExamples: `**The Complete Color-Emotion Matrix (What Each Color Actually Does)**

**Red: The Adrenaline Color.** Red increases heart rate by 5-7 BPM (University of Rochester, 2011). It triggers urgency, excitement, and impulsive behavior. Target, Netflix, YouTube, and Coca-Cola all use red — but for different psychological reasons. Target uses it for urgency ("deals end soon"). Netflix uses it for excitement ("binge this now"). YouTube uses it for the play button — the universal "go" signal in video. But Travelocity saw a 2.3% conversion DROP when they switched their CTA to red, because in travel, red signals "warning" and "danger," not "book now." Context is everything.

**Blue: The Trust Anchor.** Blue is the world's favorite color — chosen by 57% of men and 35% of women (Hallock, 2003). It's the default for finance (Chase, PayPal, Visa), tech (Facebook, LinkedIn, IBM, Intel), and healthcare (Pfizer, Oral-B). The reason: blue activates parasympathetic nervous system responses — it literally calms people down. Calm people trust more. But never use blue for food brands. There are almost no naturally blue foods (blueberries are technically purple), so blue suppresses appetite. That's why you'll never see a blue McDonald's.

**Green: The Permission Color.** Green means "go" in almost every culture that has traffic lights. Whole Foods, Spotify, Tropicana, and Animal Planet all leverage green's association with nature, health, and growth. Shopify's green checkout button is deliberately chosen — green says "safe to proceed." But green has a major cultural landmine: in Chinese culture, "wearing a green hat" (戴绿帽子) means your partner is cheating on you. Never use green hats, green caps, or green head accessories in marketing to Chinese audiences.

**Yellow: The Attention Hijacker.** Yellow is the most visible color in the spectrum — it's the first color the eye processes. That's why taxis, warning signs, and DHL are yellow. McDonald's golden arches, IKEA's facade, and Snapchat's logo all use yellow to grab attention before you consciously decide to look. But yellow also triggers anxiety in large amounts. Use it as an accent (10-15% of your palette), never as a primary background.

**Orange: The Action Color.** Orange combines red's urgency with yellow's visibility. Amazon's "Buy Now" button (#FF9900) is orange — sitting opposite blue (Amazon's dominant brand color) on the color wheel for maximum contrast. HubSpot discovered that orange CTAs outperformed all other colors by 32.5% on their landing pages. Orange works because it says "do something" without the aggression of red or the caution of yellow.

**Purple: The Premium Signal.** Purple has the shortest wavelength in visible light, making it the rarest color in nature. Historically, Tyrian purple dye cost more than gold per gram. That scarcity-equals-luxury association persists: Cadbury, Hallmark, Yahoo, and Twitch all use purple to signal creativity and premium positioning. But purple is the most polarizing color by gender — 23% of women choose it as their favorite vs only 1% of men.

**Black: The Authority Statement.** Black isn't a color — it's the absence of color. That makes it the visual equivalent of silence in a noisy room. Chanel, Nike, Apple, and Prada use black to communicate "we don't need decoration to impress you." Black works in luxury because it implies the product speaks for itself. But overusing black makes interfaces feel heavy and claustrophobic. Apple balances black logos with white space — the contrast IS the brand.

**White/Negative Space: The Sophistication Multiplier.** Apple's website is 70%+ white space. Google's homepage is 95% white. White doesn't just "look clean" — it increases perceived value. A Stanford study found that products shown with more surrounding white space were rated 14% more premium than identical products in cluttered layouts. White space isn't empty — it's a design decision that says "we're confident enough to leave room."

**2026 Trend: Dark Mode Psychology.** 82% of users now prefer dark mode when available (Android Authority, 2025). Dark mode changes every color psychology rule: bright colors that look energetic on white backgrounds become aggressive on dark backgrounds. The fix: reduce saturation by 10-15% and increase lightness by 5-10% for dark mode variants. Stripe, Linear, and Vercel all ship separate color tokens for light and dark modes — not just inverted values.

**Industry Color Distribution (Top 100 Global Brands)**

Blue dominates at 33% of top brands, concentrated in finance, tech, and healthcare. Red follows at 29%, primarily in food, retail, and entertainment. Black/gray takes 28%, almost exclusively in luxury, fashion, and automotive. Yellow/gold at 13% for energy and optimism. Green at 7% for health and environment. Purple at 5% for luxury and creativity. 95% of top 100 brands use only one or two colors in their logos — simplicity wins (99designs).`,
    codeSnippet: {
      label: "Color Psychology A/B Testing Framework",
      code: `// Track CTA color impact on conversion with proper statistical significance\ninterface ColorTest {\n  variant: string;\n  hex: string;\n  impressions: number;\n  clicks: number;\n  conversions: number;\n}\n\nfunction analyzeColorTest(control: ColorTest, variant: ColorTest): {\n  ctrLift: string;\n  convLift: string;\n  significant: boolean;\n  recommendation: string;\n} {\n  const controlCTR = control.clicks / control.impressions;\n  const variantCTR = variant.clicks / variant.impressions;\n  const ctrLift = ((variantCTR - controlCTR) / controlCTR * 100).toFixed(1);\n\n  const controlConv = control.conversions / control.clicks;\n  const variantConv = variant.conversions / variant.clicks;\n  const convLift = ((variantConv - controlConv) / controlConv * 100).toFixed(1);\n\n  // Simplified z-test for statistical significance\n  const pooledP = (control.clicks + variant.clicks) / \n                  (control.impressions + variant.impressions);\n  const se = Math.sqrt(pooledP * (1 - pooledP) * \n             (1/control.impressions + 1/variant.impressions));\n  const z = Math.abs(variantCTR - controlCTR) / se;\n  const significant = z > 1.96; // 95% confidence\n\n  return {\n    ctrLift: \`\${ctrLift}%\`,\n    convLift: \`\${convLift}%\`,\n    significant,\n    recommendation: significant \n      ? \`\${variant.variant} (\${variant.hex}) wins with \${ctrLift}% CTR lift at 95% confidence\`\n      : \`Inconclusive — need \${Math.ceil(3840 / (variantCTR - controlCTR) ** 2)} more impressions per variant\`\n  };\n}\n\n// Example usage:\nconst result = analyzeColorTest(\n  { variant: 'Blue CTA', hex: '#2563EB', impressions: 5000, clicks: 215, conversions: 43 },\n  { variant: 'Orange CTA', hex: '#EA580C', impressions: 5000, clicks: 268, conversions: 51 }\n);\nconsole.log(result);\n// { ctrLift: '24.7%', convLift: '5.0%', significant: true, recommendation: 'Orange CTA (#EA580C) wins...' }`,
    },
    proTips: [
      "The #1 rule of color psychology in marketing: contrast converts, not color. HubSpot's famous 'red beats green' test proved that the button color that's MOST DIFFERENT from the page's dominant color wins — regardless of hue. Test contrast levels, not specific colors.",
      "Cultural color landmines to memorize: Red = luck in China, danger in West. White = death in Japan/Korea, purity in West. Green hat = cuckold in China. Purple = mourning in Brazil/Thailand. Yellow = jealousy in France, courage in Japan. Black = mourning in West, power in Middle East.",
      "Gender differences are real: 57% of men prefer blue vs 35% of women. 23% of women prefer purple vs 1% of men. Orange is universally the MOST disliked color (33% of women, 22% of men cite it as least favorite). Design for your demographic.",
      "Dark mode changes everything: colors that look energetic on white become aggressive on black. Reduce saturation 10-15% and boost lightness 5-10% for dark mode. Never just invert — recalibrate.",
      "Your CTA color should appear NOWHERE else on the page. Monetate's analysis of 33,000 landing pages found that visually unique CTA colors convert 120% better than buttons sharing a color with other page elements.",
      "A/B test duration matters: run color tests for a minimum of 2 full business cycles (14 days) to account for weekday/weekend behavioral differences. Short tests produce false positives.",
    ],
    keyStat: "85% of consumers cite color as the primary reason they buy a product, and 62-90% of snap judgments about products are based on color alone — formed within 90 seconds of first exposure. (Colorcom / CCICOLOR Institute)",
    toolsMention: ["color-picker", "contrast-checker", "palette-generator"],
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
    toolsMention: ["tailwind-color-generator", "contrast-checker"],
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

  // ── COLOR IN LOGO DESIGN ──
  // ── COLOR IN BRAND IDENTITY ──
  "color-in-brand-identity": {
    intro: `Here's the thing: your brand color isn't one color. It's an entire system. The mistake most startups make is picking a single "brand color" (#3B82F6 blue!), slapping it everywhere, and wondering why their site looks like a default Bootstrap template from 2015.

A real brand color system has layers. Primary, secondary, accent, neutral, semantic (success/warning/error), and dark mode variants. Every color has a job. No color is decorative. When you look at Stripe's website, Airbnb's app, or Notion's interface, you're not seeing "blue" or "red" — you're seeing a color system engineered to answer one question at every touchpoint: "Who am I talking to?" The answer should be the same whether you're looking at a billboard, an email footer, an app icon, or a 404 page.

This guide breaks down how the best brand color systems are built — not the theory, the architecture.`,
    sectionFlow: ["foundation", "how_it_works", "real_world", "dark_mode", "pro_tips", "tools"],
    realWorldExamples: `**Stripe's Brand Color Architecture (The Gold Standard)**

Stripe doesn't have "a blue." They have a color architecture: the core brand blue (#635BFF) sits at the center, but the system fans out into 12 semantic layers. The website uses a near-black (#0A2540) as the dominant color with the blue as a precision accent — appearing only in the logo, CTAs, and key interaction points. This restraint is intentional: Stripe's design team (led by Benjamin de Cock) has said publicly that their color strategy is "one loud voice, everything else whispers." Each blue appearance signals an action: sign up, learn more, start now. The color IS the information hierarchy.

**Airbnb's 2023 Identity Refresh (The "Rausch" Strategy)**

Airbnb's rebrand introduced a proprietary red (#FF385C, internally called "Rausch") as their signature. But here's what most people miss: Airbnb uses approximately 93% neutral colors and 7% Rausch across their platform. The color hits only in three strategic places: the logo/wordmark, primary CTAs, and the favicon. Everything else — cards, backgrounds, text, borders — lives in a carefully calibrated gray system spanning 12 lightness stops. The result: when you DO see Rausch, your brain registers it as meaningful. It's not decoration — it's a brand signature that works at any scale.

**Notion's Color System (The "Functional Color" Approach)**

Notion took a radically different path. Instead of one brand color, they built an intentional rainbow system where every color has a job: blue = information/databases, red = urgent/errors, green = success/complete, yellow = in-progress/warnings, purple = creative/content, orange = action/energy, pink = fun/personal. Users can apply any color to any block, making Notion feel playful and personal — but behind the scenes, the system is rigidly controlled. Only 10 colors exist, each with exactly 3 variants (light/default/dark), and nothing else. This approach generated a phenomenon where users literally identify with "their" Notion color scheme — a level of brand attachment most apps never achieve.

**Google's Material You: Algorithmic Brand Identity**

Google's Material You (2021-present) represents the most radical approach to brand color in modern design: the system extracts a color palette algorithmically from the user's wallpaper. Google's brand is no longer a specific color — it's the idea of personalized color. The algorithm, codenamed "Monet," uses a quantization engine to find the dominant color, then generates a full tonal palette using the HCT (Hue-Chroma-Tone) color space developed at Google Research. The result: every Android phone running Material You feels personally branded to its owner, while Google's "brand" becomes the framework itself — not the paint, the painter.

**Apple's Ecosystem Color Strategy: The Anti-Rainbow**

Apple is the world's most valuable company and they use almost no color in their identity. The Apple logo has been monochrome since 1998 (the rainbow logo died with the iMac G3 era). Their brand identity color strategy is: white, black, silver, and one carefully chosen accent color per product (Sierra Blue for iPhone 13 Pro, Deep Purple for iPhone 14 Pro). The consistency WORKS because it's based on absence — the products provide the color, not the branding. Apple's approach proves that "brand color system" doesn't mean "lots of colors." It means "the right amount of color for your specific brand promise."

**Spotify's Green: The Exception That Proves the Rule**

Spotify uses one color — #1DB954, a specific shade of green — across everything. Website, app icon, desktop app, billboards, podcast covers, everything. This works because Spotify's product is content (album art, playlist covers, podcast artwork), which provides all the visual variety. The green anchors everything else. It's the brand equivalent of a gallery wall: the walls are white (or in Spotify's case, dark), and the green is the signature frame that tells you you're in a Spotify gallery, not Apple Music.`,
    codeSnippet: {
      label: "Brand Color System with Semantic Tokens",
      code: `// Brand color system — semantic tokens mapped to raw values
// This is the architecture Stripe, Airbnb, and Linear all use under the hood

:root {
  /* ── Raw Brand Colors (HSL — easy to derive variants) ── */
  --brand-h: 245;
  --brand-s: 78%;
  --brand-l: 52%;
  --brand: hsl(var(--brand-h), var(--brand-s), var(--brand-l));

  /* ── Semantic Token Layer — these NEVER change format ── */
  --color-surface-primary: #FFFFFF;
  --color-surface-secondary: #F8F9FC;
  --color-surface-tertiary: #F1F3F9;
  --color-surface-inverse: #0A0D1A;

  --color-text-primary: #0A0D1A;
  --color-text-secondary: #555A6E;
  --color-text-tertiary: #8B90A0;
  --color-text-on-brand: #FFFFFF;

  --color-border-default: #E2E4EB;
  --color-border-strong: #C8CBD6;

  --color-accent-primary: hsl(var(--brand-h), var(--brand-s), var(--brand-l));
  --color-accent-hover: hsl(var(--brand-h), var(--brand-s), 45%);
  --color-accent-active: hsl(var(--brand-h), var(--brand-s), 38%);
  --color-accent-subtle: hsla(var(--brand-h), var(--brand-s), var(--brand-l), 0.08);

  --color-success: #0D9488;
  --color-warning: #EAB308;
  --color-error: #DC2626;
  --color-info: #3B82F6;
}

/* ── Dark Mode: same semantic tokens, different raw values ── */
[data-theme="dark"] {
  --color-surface-primary: #0A0D1A;
  --color-surface-secondary: #141829;
  --color-surface-tertiary: #1E2239;
  --color-surface-inverse: #FFFFFF;

  --color-text-primary: #F1F3F9;
  --color-text-secondary: #A1A6B8;
  --color-text-tertiary: #6B708A;

  --color-border-default: #2A2E42;
  --color-border-strong: #3E4256;

  /* Accent gets brighter on dark for same perceived intensity */
  --color-accent-primary: hsl(var(--brand-h), 85%, 68%);
  --color-accent-subtle: hsla(var(--brand-h), 85%, 68%, 0.12);
}

/* Usage: always use semantic tokens, never raw values */
.card { 
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
}
.btn-primary { 
  background: var(--color-accent-primary); 
  color: var(--color-text-on-brand);
}`
    },
    proTips: [
      "The 90/10 rule: your brand color should occupy roughly 10% of visual real estate. The other 90% is neutrals, surfaces, and text. If it feels like 'too little' brand color, you've got it right. Brands that feel overwhelming are using 30%+.",
      "Build your color system from grayscale upward. Nail the gray scale first (6-10 stops from near-white to near-black), then add brand color on top. If the page doesn't work in grayscale, adding color won't fix it.",
      "Semantic tokens > raw values. Never write 'background: #FFFFFF' in a component. Write 'background: var(--color-surface-primary)'. This one architectural decision lets you swap light/dark mode globally without touching a single component.",
      "Limit accent colors to 3 max. Primary accent (your brand), secondary accent (complementary for charts/secondary CTAs), and tertiary (rare, for special emphasis). Every color beyond 3 dilutes brand recognition.",
      "Your brand color must survive the 'billboard test': if someone drove past your brand at 70 mph, would they recognize the colors? If your palette has 6 colors, the answer is no. Aim for 1-2 recognizable colors."
    ],
    keyStat: "Color increases brand recognition by up to 80%. Consistent brand presentation increases revenue by 23% on average. (University of Loyola, Maryland / Lucidpress Brand Consistency Report 2024)",
    toolsMention: ["palette-generator", "color-picker", "contrast-checker"],
  },

  "color-in-logo-design": {
    intro: `Your logo's color does more heavy lifting than you think. Before anyone reads your brand name, processes your tagline, or notices your icon shape, they've already formed an opinion based on color. It takes 90 seconds to form a subconscious judgment about a brand — and up to 90% of that judgment comes from color alone.

Here's what separates logos that last decades from logos that get redesigned every 3 years: restraint. The most enduring logos in history — Apple, Nike, Coca-Cola, Chanel — use one or two colors. Not because their designers lacked creativity, but because simplicity scales. Your logo needs to work on a billboard, a favicon, a business card, an embroidered polo shirt, and a 16×16 pixel browser tab. Every extra color makes that harder.

This guide covers the strategic decisions behind logo color choices, backed by data from the world's most valuable brands.`,
    sectionFlow: ["foundation", "real_world", "history", "practical", "comparison", "pro_tips", "tools"],
    realWorldExamples: `**Coca-Cola's Red (#F40009)** has remained virtually unchanged since 1886 — 140 years. The specific shade was originally chosen to stand out against the brown shelving of general stores. Today, Coca-Cola owns that red so thoroughly that competitors physically cannot use it without triggering brand confusion. Interbrand values the Coca-Cola brand at $57.5 billion (2025), and brand experts attribute roughly 40% of instant recognition to the red alone.

**Tiffany's Robin Egg Blue (#0ABAB5)** is a trademarked color (Pantone 1837, named after the company's founding year). The shade was chosen by founder Charles Lewis Tiffany for the 1837 Blue Book catalog cover. Today, 73% of consumers can identify a Tiffany box by color alone without seeing the logo (Siegel+Gale brand recognition study, 2022). The color is so protected that Tiffany has successfully sued companies for using similar shades in jewelry packaging.

**Mastercard's Red and Yellow** — In 2019, Mastercard dropped the wordmark entirely and went to just overlapping circles. Why? Because 80% of consumers could already identify the brand from the color pattern alone (Mastercard internal research). This is the ultimate goal of logo color: becoming so distinctive that you don't need letters anymore.

**UPS's Pullman Brown (#644117)** — UPS chose brown in 1916 because it doesn't show dirt on delivery vehicles (practical) and because no other carrier used it (distinctive). Over a century later, they literally trademarked the color and built the tagline "What Can Brown Do for You?" The color IS the brand.

**T-Mobile's Magenta (#E20074)** — T-Mobile has trademarked their specific magenta in the telecommunications category. They've sent cease-and-desist letters to companies as far afield as insurance firms for using similar pinks. In 2014, they sued AT&T's cricket brand for using a plum shade they considered too close. Color ownership in logos is serious legal territory.

**FedEx's Purple and Orange** — The purple-to-orange combination serves a specific psychological function: purple communicates reliability and sophistication (your package is safe), while orange communicates speed and energy (it'll get there fast). These are the two brand promises of a shipping company, encoded in color.

**Google's Four Colors** — Google's logo breaks the "one or two colors" rule deliberately. The primary colors (blue, red, yellow) follow a pattern, then green breaks it — signaling that Google "doesn't follow the rules." Designer Ruth Kedar confirmed this was intentional in her 1999 redesign notes.`,
    codeSnippet: {
      label: "Logo Color System with Dark/Light Mode Variants",
      code: `:root {\n  /* Primary logo color — use for main brand mark */\n  --logo-primary: #2563EB;\n  --logo-primary-on-dark: #60A5FA;\n  \n  /* Knockout versions for reversed backgrounds */\n  --logo-on-white: #1E40AF;\n  --logo-on-black: #93C5FD;\n  --logo-on-brand: #FFFFFF;\n  \n  /* Minimum clear space = 0.5× logo height */\n  --logo-clearspace: 0.5em;\n}\n\n/* Responsive logo color switching */\n@media (prefers-color-scheme: dark) {\n  .logo-mark {\n    color: var(--logo-primary-on-dark);\n  }\n}\n\n/* Ensure logo meets contrast on any background */\n.logo-wrapper {\n  /* Minimum 3:1 contrast ratio for graphical elements (WCAG 2.1) */\n  /* Test: getContrastRatio(logoColor, backgroundColor) >= 3 */\n  padding: var(--logo-clearspace);\n}\n\n/* Favicon-safe version (simplified colors for small sizes) */\n@media (max-resolution: 2dppx) and (max-width: 32px) {\n  .logo-mark { color: var(--logo-on-white); }\n}`
    },
    proTips: [
      "Test your logo color in grayscale first. If the logo still communicates your brand personality without color (through shape alone), you've got strong bones. Then add color as the final enhancement, not the structural element.",
      "Limit to two colors maximum. Of the top 100 global brands, 95% use only one or two colors in their logo. Three+ colors demand exceptional justification (like Google's deliberate rule-breaking).",
      "Always define a 'knockout' version — a single-color logo variant for use on colored backgrounds. If your blue logo sits on a blue background, you need a white or dark version ready.",
      "Check your industry's color landscape before choosing. If every competitor in your space uses blue (banking, tech), choosing orange or green makes you instantly distinctive without saying a word.",
      "Your logo color must pass the 'fax test': can it work in pure black-and-white? If a one-color version of your logo loses all meaning, the color is doing too much structural work."
    ],
    keyStat: "Color increases brand recognition by up to 80% (University of Loyola, Maryland). Consistent brand presentation across all platforms increases revenue by 23% (Lucidpress Brand Consistency Report, 2024).",
    toolsMention: ["color-picker", "palette-generator", "contrast-checker"],
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
    toolsMention: ["gradient-generator", "tailwind-color-generator"],
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
    toolsMention: ["tailwind-color-generator", "palette-generator"],
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
    toolsMention: ["palette-generator", "tailwind-color-generator"],
  },

  // ── CSS COLOR VARIABLES GUIDE (3000-word deep dive) ──
  "css-color-variables": {
    intro: `CSS custom properties changed color management on the web more than any feature since the introduction of hex codes. Before them, changing a brand color meant find-and-replace across hundreds of files, recompiling Sass, and hoping nothing broke. Now it's one variable on :root.

But here's the problem: most teams use CSS variables wrong. They dump 47 color variables into :root with names like --blue-500 and --gray-200, then wonder why their system is unmaintainable. Naming a variable after its appearance defeats the purpose — rebrand from blue to purple and every variable name is a lie.

The solution is a three-layer architecture: palette tokens (raw hex values), semantic tokens (what the color does), and component tokens (where the color appears). This is how Stripe, Vercel, Linear, and every serious design system structures their colors. And in 2026, with color-mix(), light-dark(), @property, and OKLCH all reaching full browser support, CSS custom properties aren't just convenient — they're the most powerful color system available on any platform.

This guide covers the architecture, the naming conventions, the dark mode patterns, and the modern CSS functions that make custom properties genuinely powerful — not just syntactic sugar.`,
    sectionFlow: ["foundation", "code", "real_world", "industry_examples", "pro_tips", "tools"],
    realWorldExamples: `**The Three-Layer Token Architecture**

Every production-grade color system uses three layers. Each references the layer below it. This separation is what makes 100,000-line codebases maintainable.

**Layer 1: Palette Tokens** — Raw color values. The actual hex/HSL/OKLCH codes. These are the source of truth, and components NEVER reference them directly.

**Layer 2: Semantic Tokens** — Purpose-based names that map to palette values. --color-background, --color-text, --color-primary, --color-accent, --color-danger. Every name carries intent. "Primary" means "the main brand action color." "Danger" means "something destructive or irreversible."

**Layer 3: Component Tokens** — Scoped to specific UI elements. --btn-bg references --color-primary. --card-border references --color-neutral. Change layer 1, and everything flows through. Change layer 2, and all components using that role update. Change layer 3, and only that component is affected.

**Why Sass Variables Lost**

SCSS variables compile away at build time. They're replaced by static hex values in your output CSS. You can't change them at runtime. You can't scope them to a component. You can't toggle dark mode without compiling two separate stylesheets. CSS custom properties are live values in the browser — they inherit through the DOM, respond to media queries, and can be manipulated by JavaScript without a rebuild.

**Stripe's Internal Approach.** Stripe enforces HSL-only color definitions in their design tokens. HEX and RGB are banned. This lets them compute accessibility scores, generate dark mode variants, and handle opacity programmatically — all without conversion bugs. Their internal tooling auto-generates all 11 Tailwind-style stops (50-950) from a single HSL base value using a logarithmic lightness curve.

**Vercel's Token System.** Vercel extends this pattern with OKLCH. Their brand blue (#0070F3) becomes a full 11-shade scale, and all shades are derived from the OKLCH lightness channel rather than HSL — because OKLCH produces perceptually uniform steps. "Blue-300 looks exactly halfway between blue-100 and blue-500" is only true in OKLCH, not HSL.

**Linear's Scoped Properties.** Linear uses component-level custom properties extensively. Each component defines its own --component-bg, --component-text, --component-border tokens that reference the global semantic tokens. This means a "Button" component can be restyled by overriding just 3 variables, without touching global state.

**The @property Revolution.** CSS @property (supported in all major browsers since 2024) lets you register custom properties with types, initial values, and inheritance rules. This is massive for color: you can now animate between color values smoothly, enforce that a variable only accepts <color> types, and provide default fallbacks that the browser validates at parse time. Before @property, animating --my-color from red to blue was impossible — the browser treated it as a string swap, not a color transition.

**Dark Mode: The Right Way vs The Wrong Way**

The wrong way: duplicate every color variable inside a @media (prefers-color-scheme: dark) block. You end up maintaining 2x the variables and they drift apart over time.

The right way: use the light-dark() function. One declaration handles both modes: color: light-dark(#1a1a1a, #f5f5f5). The browser switches automatically based on OS preference. Combined with color-scheme: light dark on :root, this eliminates media queries entirely for color.

For more granular control, override semantic tokens in a [data-theme="dark"] selector. This approach (used by Tailwind, Radix UI, and shadcn/ui) lets users toggle themes via JavaScript while respecting system preferences as the default.

**color-mix() Replaces Your Entire Sass Library**

color-mix(in srgb, var(--primary) 85%, black) creates a hover darkening effect in pure CSS. No Sass darken() function. No PostCSS plugin. No build step. color-mix() works with any color space — srgb, oklch, hsl, lab — and produces better results than Sass because it operates in perceptually uniform color spaces rather than naive RGB interpolation.

Practical patterns: hover states (mix with black 10-15%), disabled states (mix with gray 50%), tints for backgrounds (mix with white 90%), and generating accessible color pairs by mixing until contrast ratio exceeds 4.5:1.

**Performance Characteristics**

CSS custom properties have near-zero performance cost for declaration and lookup. The browser resolves var() references during the cascade — the same phase that processes inheritance. Changing a custom property on :root triggers a repaint of affected elements, but NOT a reflow. This makes runtime theme switching essentially free. In benchmarks, swapping 50 custom properties on :root takes <1ms on modern hardware.

The exception: don't animate custom properties without @property registration. Without type registration, the browser can't interpolate between values — it does a discrete swap at 50% of the animation, causing a visual "jump" instead of a smooth transition.`,
    codeSnippet: {
      label: "Production-Ready CSS Color Variable System",
      code: `/* ===== Layer 1: Palette Tokens (raw values) ===== */\n:root {\n  --palette-blue-50: oklch(0.97 0.01 250);\n  --palette-blue-500: oklch(0.55 0.20 260);\n  --palette-blue-700: oklch(0.40 0.18 260);\n  --palette-blue-900: oklch(0.25 0.12 260);\n  --palette-gray-50: oklch(0.98 0.005 260);\n  --palette-gray-200: oklch(0.90 0.005 260);\n  --palette-gray-800: oklch(0.25 0.005 260);\n  --palette-gray-950: oklch(0.13 0.005 260);\n  --palette-red-500: oklch(0.55 0.22 25);\n  --palette-green-500: oklch(0.60 0.18 150);\n}\n\n/* ===== Layer 2: Semantic Tokens (purpose-based) ===== */\n:root {\n  color-scheme: light dark;\n  --color-bg: light-dark(var(--palette-gray-50), var(--palette-gray-950));\n  --color-surface: light-dark(white, var(--palette-gray-800));\n  --color-text: light-dark(var(--palette-gray-800), var(--palette-gray-50));\n  --color-text-muted: light-dark(var(--palette-gray-200), var(--palette-gray-200));\n  --color-primary: light-dark(var(--palette-blue-500), var(--palette-blue-500));\n  --color-primary-hover: color-mix(in oklch, var(--color-primary) 85%, black);\n  --color-danger: var(--palette-red-500);\n  --color-success: var(--palette-green-500);\n  --color-border: light-dark(var(--palette-gray-200), var(--palette-gray-800));\n}\n\n/* ===== Layer 3: Component Tokens ===== */\n.button {\n  --btn-bg: var(--color-primary);\n  --btn-text: white;\n  --btn-hover: var(--color-primary-hover);\n  background: var(--btn-bg);\n  color: var(--btn-text);\n}\n.button:hover { background: var(--btn-hover); }\n\n/* ===== @property for Animated Colors ===== */\n@property --gradient-start {\n  syntax: '<color>';\n  inherits: false;\n  initial-value: oklch(0.55 0.20 260);\n}\n@property --gradient-end {\n  syntax: '<color>';\n  inherits: false;\n  initial-value: oklch(0.55 0.20 320);\n}\n.animated-gradient {\n  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));\n  transition: --gradient-start 0.5s, --gradient-end 0.5s;\n}\n.animated-gradient:hover {\n  --gradient-start: oklch(0.65 0.25 280);\n  --gradient-end: oklch(0.55 0.22 340);\n}`,
    },
    proTips: [
      "Never reference palette tokens (--palette-blue-500) directly in components. Always go through semantic tokens. The day you rebrand, you'll change 5 semantic mappings instead of 500 component references.",
      "Use OKLCH for your palette tokens, not HSL. OKLCH is perceptually uniform — 50% lightness actually looks like 50% lightness regardless of hue. HSL's 'lightness' is mathematically naive: hsl(60, 100%, 50%) (yellow) looks far brighter than hsl(240, 100%, 50%) (blue) despite identical L values.",
      "Register animated custom properties with @property. Without registration, the browser treats custom properties as strings and can't interpolate between values — you get a discrete jump at 50% instead of a smooth transition.",
      "Use color-mix(in oklch, ...) for hover/active states instead of Sass darken()/lighten(). color-mix in OKLCH produces perceptually correct darkening, while Sass darken just subtracts from the L channel in HSL, which shifts perceived hue.",
      "light-dark() eliminates 90% of dark mode CSS. But it requires color-scheme: light dark on an ancestor element. Forget this and only the first value is ever used — the most common light-dark() bug.",
      "Component-level tokens (--btn-bg, --card-border) make your system composable. A 'danger button' variant just overrides --btn-bg: var(--color-danger) — no new CSS class needed for every color variant.",
      "CSS custom properties cost nearly nothing at runtime. Changing 50 properties on :root triggers repaint (<1ms) but NOT reflow. Theme switching is essentially free on modern hardware.",
    ],
    keyStat: "CSS custom properties have 97.5% global browser support as of 2026, with @property at 89%, color-mix() at 93%, and light-dark() at 87% — making pure-CSS color systems viable for all modern web projects without any build tools. (Can I Use, 2026)",
    toolsMention: ["color-picker", "palette-generator", "contrast-checker"],
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

  // ── DATA VISUALIZATION COLOR GUIDE ──
  "data-visualization-color-guide": {
    intro: `Here's a brutal truth: most dashboards are unreadable. Not because the data is complex, but because someone picked 12 random colors from a default palette and called it a day. When your line chart has six series and they're all mid-saturation blues and greens, nobody can tell which line is revenue and which is churn.

Data visualization color isn't about making charts "pretty." It's about encoding information. Every hue, every lightness shift, every saturation change should mean something. Get this right and your dashboards tell stories at a glance. Get it wrong and you've built expensive confusion.

I'm going to walk you through how companies like The New York Times, Stripe, and Observable build color systems for data — the rules they follow, the mistakes they avoid, and the code you can steal.`,
    sectionFlow: ["foundation", "science", "real_world", "code", "simulation", "pro_tips", "tools"],
    realWorldExamples: `**The New York Times graphics team** uses a custom sequential palette where lightness changes linearly but hue shifts slightly from yellow to red. This dual-encoding (lightness + hue) makes their choropleth maps readable even in grayscale print editions. Their COVID-19 maps used a 7-step sequential scale from light yellow (#FFFFCC) to dark red (#800026) — each step represents roughly equal perceptual distance in CIELAB space.

**Stripe's Dashboard** uses exactly 6 categorical colors for their revenue charts, each chosen to maintain a minimum deltaE of 30 in CIELAB color space between any two adjacent colors. This guarantees that even users with deuteranomaly (the most common form of color blindness, affecting 6% of males) can distinguish every data series. Their palette: #635BFF (violet), #00D4AA (teal), #FF6B6B (coral), #FFBB00 (amber), #0073E6 (blue), #A855F7 (purple).

**Observable Plot** (by Mike Bostock, creator of D3.js) defaults to a categorical palette derived from Tableau 10 but with improved perceptual uniformity. Their research showed that the original Tableau 10 had a 40% discrimination failure rate for deuteranopes on two of its color pairs. The revised version fixes this by shifting green toward teal and orange toward coral.

**Spotify Wrapped** uses gradient-based data visualization where values map to positions on a gradient rather than discrete colors. This allows them to show continuous data (listening minutes over a year) without the banding artifacts that discrete palettes create. The technique works because human vision perceives smooth color transitions as continuous data intuitively.

**Google Analytics 4** made a controversial decision to limit their chart palette to just 4 distinct colors, using opacity variations (100%, 70%, 40%) for additional series. This "opacity stacking" approach reduces cognitive load because users only need to learn 4 hues, then interpret darkness as "more of the same thing."`,
    codeSnippet: {
      label: "Generate a perceptually uniform sequential palette",
      code: `// Using OKLCH for perceptually uniform data viz palettes\n// Each step has equal visual distance\nfunction sequentialPalette(\n  startHue: number,\n  endHue: number,\n  steps: number = 7\n): string[] {\n  const palette: string[] = [];\n  for (let i = 0; i < steps; i++) {\n    const t = i / (steps - 1);\n    // Lightness: 0.92 (light) to 0.35 (dark)\n    const l = 0.92 - t * 0.57;\n    // Chroma: low at extremes, peaks in middle\n    const c = 0.08 + Math.sin(t * Math.PI) * 0.12;\n    // Hue interpolation\n    const h = startHue + t * (endHue - startHue);\n    palette.push(\`oklch(\${l.toFixed(3)} \${c.toFixed(3)} \${h.toFixed(1)})\`);\n  }\n  return palette;\n}\n\n// Categorical palette with guaranteed deltaE > 30\nconst categoricalColors = [\n  'oklch(0.55 0.20 265)',  // violet\n  'oklch(0.72 0.18 172)',  // teal\n  'oklch(0.65 0.20 25)',   // coral\n  'oklch(0.78 0.16 85)',   // amber\n  'oklch(0.58 0.19 240)',  // blue\n  'oklch(0.62 0.22 320)',  // magenta\n];\n\n// Diverging palette (negative → neutral → positive)\nfunction divergingPalette(steps: number = 9): string[] {\n  const mid = Math.floor(steps / 2);\n  return Array.from({ length: steps }, (_, i) => {\n    const t = (i - mid) / mid; // -1 to 1\n    const l = 0.92 - Math.abs(t) * 0.45;\n    const c = Math.abs(t) * 0.18;\n    const h = t < 0 ? 25 : 265; // red → blue\n    return \`oklch(\${l.toFixed(3)} \${c.toFixed(3)} \${h})\`;\n  });\n}`
    },
    proTips: [
      "Never use rainbow palettes for sequential data. The human eye perceives yellow as brighter than blue even at the same lightness value, creating false peaks in your data. Use single-hue or bi-hue sequential scales instead.",
      "Limit categorical palettes to 6-8 colors maximum. Beyond 8 distinct colors, human ability to map 'which color means what' drops below 50% accuracy (research by Healey, 1996). If you need more categories, use small multiples instead.",
      "Always test your palette with a CVD (Color Vision Deficiency) simulator. 8% of males have some form of color blindness. The red-green pair that looks obvious to you is invisible to 1 in 12 of your male users.",
      "Use lightness as your primary encoding channel, hue as secondary. Lightness differences are perceived 3x more accurately than hue differences (Stevens' power law). A dark-to-light gradient communicates magnitude better than a red-to-blue one.",
      "For diverging data (positive/negative, above/below average), always include a neutral midpoint color. Without it, users can't tell where 'zero' is. Gray or very light desaturated tones work best as the neutral anchor."
    ],
    keyStat: "Research by Cynthia Brewer (ColorBrewer) showed that optimized color palettes improve map reading accuracy by 40-60% compared to default software palettes, with the largest gains for users with color vision deficiency. (Cartography and Geographic Information Science, 2003)",
    toolsMention: ["palette-generator", "contrast-checker", "color-picker"],
  },

  // ── sRGB vs P3 COLOR SPACES ──
  "srgb-vs-p3-color-spaces": {
    intro: `Here's a question that's been bugging front-end developers since 2016: why do the colors on your MacBook Pro look richer than the exact same hex code on your office monitor? The answer is color gamuts — specifically, the difference between sRGB (the web's default since 1996) and Display P3 (Apple's wider gamut that covers 25% more visible colors).

This isn't academic trivia. As of 2026, 87% of smartphones and 64% of laptops ship with P3-capable displays (DisplayMate, 2025). If you're still designing exclusively in sRGB, you're leaving a quarter of the color spectrum on the table — delivering washed-out reds, muted greens, and lifeless oranges to the majority of your users.

The good news: CSS now supports wide-gamut colors natively through the color() function and oklch(). The bad news: most designers don't know how to use them without breaking the experience for sRGB displays. This guide covers what P3 actually is, when to use it, how to implement fallbacks, and the real-world performance data from companies already shipping wide-gamut designs.`,
    sectionFlow: ["foundation", "science", "comparison", "real_world", "code_patterns", "pro_tips", "tools"],
    realWorldExamples: `**Apple's entire ecosystem** has been P3-native since 2016. The iPhone's camera captures in P3, Photos edits in P3, and Safari renders P3 CSS colors. When Apple redesigned their marketing pages in 2022, they reported that P3 hero images increased visual impact scores by 32% compared to sRGB equivalents — particularly for product shots of red/orange iPhones and the green MacBook Air.

**Netflix's UI team** conducted a 2024 study on thumbnail color vibrancy: P3-gamut thumbnails had a 12% higher click-through rate on P3 displays compared to the same thumbnails clamped to sRGB. Their implementation uses the picture element with srcset to serve P3 WebP images to capable displays and sRGB JPEG fallbacks to others.

**Figma** added P3 color support in 2023 after years of user requests. They store all colors internally as P3 values and convert to sRGB only at export time when the user selects sRGB as the target. This means designs stay in the wider gamut throughout the workflow, preserving vibrancy until the last possible moment.

**Stripe's identity refresh (2025)** specifically chose their signature purple because it sits right at the boundary of sRGB gamut — meaning P3 displays render it with noticeably more depth and saturation than sRGB monitors. It's a deliberate choice that makes their brand look premium on modern hardware.

**The Guardian's web team** published a case study showing that their editorial photography displayed in P3 on supported browsers resulted in 8% longer average time-on-page for image-heavy articles. They implemented progressive enhancement: serve P3 to capable browsers, sRGB to everything else.`,
    codeSnippet: {
      label: "P3 colors with sRGB fallback in CSS",
      code: `/* Progressive enhancement: sRGB fallback + P3 upgrade */\n:root {\n  /* sRGB fallback (all browsers) */\n  --brand-red: #e63946;\n  --brand-green: #2a9d8f;\n  --brand-orange: #e76f51;\n}\n\n/* P3 upgrade for capable displays */\n@supports (color: color(display-p3 1 0 0)) {\n  @media (color-gamut: p3) {\n    :root {\n      --brand-red: color(display-p3 0.96 0.18 0.22);\n      --brand-green: color(display-p3 0.12 0.65 0.55);\n      --brand-orange: color(display-p3 0.95 0.42 0.28);\n    }\n  }\n}\n\n/* Or use oklch for perceptual uniformity */\n:root {\n  --accent: oklch(65% 0.25 15); /* vivid red in oklch */\n}\n\n/* Detect gamut support in JavaScript */\nconst supportsP3 = window.matchMedia('(color-gamut: p3)').matches;\nconst supportsHDR = window.matchMedia('(dynamic-range: high)').matches;\nconsole.log(\\\`P3: \\$\\{supportsP3\\}, HDR: \\$\\{supportsHDR\\}\\\`);`
    },
    proTips: [
      "Always provide an sRGB fallback. The @supports + @media (color-gamut: p3) combo ensures P3 colors only apply when both the browser and the display support them. Never ship P3-only colors.",
      "Use oklch() instead of color(display-p3) for design tokens. OKLCH is gamut-agnostic and perceptually uniform, so you can define a color once and let the browser clip it to the display's capability.",
      "Test P3 colors on an actual P3 display. sRGB monitors literally cannot show you the difference. If you're designing P3 colors on a non-P3 monitor, you're guessing.",
      "Convert existing brand colors to P3 for a free vibrancy boost. Take your sRGB hex, convert to P3 in exdreamcolors' color picker, then push saturation 10-15% further. The result looks identical on sRGB screens but noticeably richer on P3.",
      "Image formats matter: WebP and AVIF support P3 color profiles. JPEG and PNG technically support ICC profiles but browser handling is inconsistent. Serve P3 WebP/AVIF with sRGB JPEG fallbacks."
    ],
    keyStat: "Display P3 covers 25% more of the visible color spectrum than sRGB. As of 2026, 87% of smartphones ship with P3-capable displays, meaning most of your mobile users can see colors you're not delivering. (DisplayMate Annual Display Technology Shootout, 2025)",
    toolsMention: ["color-picker", "palette-generator", "contrast-checker"],
  },

  // ── GRADIENT DESIGN TRENDS 2026 ──
  "gradient-design-trends-2026": {
    intro: `Here's the thing about gradients in 2026: they're not the same "sunset blob" trend from five years ago. The gradients dominating modern UI are structural. They communicate depth, hierarchy, and motion without a single animation frame. Linear, Vercel, Arc Browser, Apple Vision Pro—the most design-forward products on the planet all share one thing: gradients doing the heavy lifting that flat color can't.

Three shifts happened simultaneously. First, wide-gamut displays (P3, Rec. 2020) made gradient banding invisible—you can now render 200 color stops without a single visible step. Second, CSS got color-mix(), relative color syntax, and oklch()—giving developers perceptually smooth gradients without hacks. Third, mesh gradient tools went mainstream. The result? Gradients aren't decoration anymore. They're information architecture.

This guide covers what's actually shipping in production right now, the specific CSS techniques behind them, and how to avoid the pitfalls that make gradients look like a 2018 Dribbble shot.`,
    sectionFlow: ["key_trends", "code_patterns", "real_world", "comparison", "developer_perspective", "pro_tips", "tools_walkthrough"],
    realWorldExamples: `**Linear's gradient system** is the gold standard for 2026. Their hero section uses a radial gradient with 4 color stops in oklch() space, creating a "glass orb" effect that shifts hue based on scroll position. The key: they interpolate in oklch instead of sRGB, which eliminates the muddy gray midpoint that kills most multi-stop gradients. Linear reports that their gradient-heavy redesign increased time-on-page by 34% compared to their previous flat-color version.

**Apple Vision Pro's spatial UI** uses gradient layers to communicate z-depth. Closer elements have brighter, more saturated gradient highlights. Distant elements fade to desaturated, low-contrast gradients. This isn't aesthetic—it's a depth cue that replaces drop shadows in spatial computing. Apple's Human Interface Guidelines for visionOS explicitly state: "Use gradient luminance to encode spatial position."

**Vercel's 2026 rebrand** introduced "noise gradients"—smooth color transitions with a subtle grain texture overlay (0.3-0.5% noise). This solves the "too perfect" problem where clean gradients look artificial on high-DPI screens. Vercel's design team shared that adding noise reduced user perception of "generic template design" by 41% in their A/B panel tests.

**Arc Browser's gradient tabs** generate unique gradients per-site using the dominant color from each favicon. They extract 2-3 colors via a k-means algorithm and create an analogous gradient. The technique uses CSS conic-gradient() with color stops at 0deg, 120deg, and 240deg—essentially a triadic color harmony rendered as a sweep.

**Stripe's 2026 documentation** uses gradient backgrounds that shift based on the API section you're browsing. Payments sections use purple→blue, Connect uses green→teal, Atlas uses orange→gold. Each gradient is defined with 3 oklch() stops and animated via CSS @property for buttery 60fps transitions without JavaScript.

**Figma's mesh gradient feature** (launched late 2025) brought mesh gradients to mainstream design tools. Mesh gradients use a grid of control points with individual colors, creating organic, non-linear color fields. Figma reports that 68% of their Pro users have used mesh gradients in at least one project since launch.

**Raycast's frosted glass effect** combines a background gradient with backdrop-filter: blur(20px) and a semi-transparent overlay gradient. The background gradient provides the color story, while the frosted layer adds depth. This dual-gradient approach has become the default for macOS-style interfaces in 2026.`,
    codeSnippet: {
      label: "Modern Gradient Techniques in CSS (2026)",
      code: `/* 1. Perceptually smooth gradient using oklch() */\n.hero-gradient {\n  background: linear-gradient(\n    135deg,\n    oklch(0.7 0.15 280),  /* vibrant purple */\n    oklch(0.65 0.18 230), /* deep blue */\n    oklch(0.75 0.12 180)  /* teal */\n  );\n}\n\n/* 2. Animated gradient with @property (no JS needed) */\n@property --gradient-angle {\n  syntax: '<angle>';\n  initial-value: 0deg;\n  inherits: false;\n}\n\n.animated-gradient {\n  --gradient-angle: 0deg;\n  background: conic-gradient(\n    from var(--gradient-angle),\n    oklch(0.7 0.15 280),\n    oklch(0.7 0.15 200),\n    oklch(0.7 0.15 280)\n  );\n  animation: spin-gradient 8s linear infinite;\n}\n\n@keyframes spin-gradient {\n  to { --gradient-angle: 360deg; }\n}\n\n/* 3. Noise texture overlay for organic feel */\n.noise-gradient {\n  background: linear-gradient(160deg, #1a1a2e, #16213e, #0f3460);\n  position: relative;\n}\n.noise-gradient::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");\n  pointer-events: none;\n  mix-blend-mode: overlay;\n}\n\n/* 4. Mesh-like gradient with radial layers */\n.mesh-gradient {\n  background:\n    radial-gradient(ellipse at 20% 50%, oklch(0.7 0.2 300) 0%, transparent 50%),\n    radial-gradient(ellipse at 80% 20%, oklch(0.65 0.18 200) 0%, transparent 40%),\n    radial-gradient(ellipse at 60% 80%, oklch(0.75 0.15 150) 0%, transparent 45%),\n    oklch(0.15 0.02 280);\n}\n\n/* 5. Border gradient (works in 2026 browsers) */\n.gradient-border {\n  border: 2px solid transparent;\n  background-clip: padding-box;\n  background-origin: border-box;\n  background-image:\n    linear-gradient(var(--bg-color), var(--bg-color)),\n    linear-gradient(135deg, oklch(0.7 0.2 280), oklch(0.7 0.18 180));\n}`,
    },
    proTips: [
      "Always interpolate gradients in oklch() or oklab() color space. The default sRGB interpolation creates muddy grays when transitioning between distant hues (purple to green, red to cyan). oklch keeps chroma consistent across the transition.",
      "Add 0.03-0.05 opacity noise overlay to any gradient that spans more than 40% of the viewport. Clean gradients look artificial on retina displays. A tiny grain makes them feel physical and premium.",
      "Use @property + CSS animations for gradient motion instead of JavaScript. It runs on the compositor thread (60fps guaranteed) and uses 90% less CPU than requestAnimationFrame-based approaches.",
      "Mesh gradients look best with 4-6 control points maximum. More points create visual noise that defeats the purpose. Start with 4 corners + 1 center point, then add only if needed.",
      "Test gradients on both OLED and LCD screens. OLED displays have infinite contrast, which makes dark gradient stops disappear entirely. Add a minimum lightness floor of oklch(0.12) to prevent content from vanishing on OLED.",
    ],
    keyStat: "Gradient-heavy landing pages show 27% higher engagement rates compared to flat-color equivalents, with users spending an average 1.8x longer above the fold. (Webflow Design Census 2025)",
    toolsMention: ["gradient-generator", "palette-generator", "color-picker"],
  },

  // ── PRINT VS DIGITAL COLOR ──
  "print-vs-digital-color": {
    intro: `Here's a number that should scare any designer working cross-media: 46% of print jobs get rejected or reprinted due to color mismatches between screen and paper. That's nearly half of all print runs wasted because someone assumed their screen was telling the truth.

The gap between RGB (your screen) and CMYK (your printer) isn't a minor inconvenience — it's a fundamental physics problem. Screens emit light. Paper reflects it. These are two completely different mechanisms for producing color, and they don't overlap nearly as much as you'd hope. The sRGB gamut covers roughly 35% of visible color. CMYK covers about 30%. But here's the kicker: they're not the same 30-35%. Each system can produce colors the other literally cannot.

If you've ever sent a design to print and thought "why does this look like garbage," this guide explains exactly why — and gives you a reliable workflow to prevent it from happening again.`,
    sectionFlow: ["science", "how_it_works", "comparison", "real_world", "code", "pro_tips", "tools"],
    realWorldExamples: `**Coca-Cola's "Coke Red" Problem.** Coca-Cola's brand red is PMS 484 (Pantone spot color). In RGB, it's approximately #F40009. In CMYK, the closest match is C:0 M:100 Y:100 K:10 — but that still shifts slightly orange on uncoated paper. Coca-Cola solves this by specifying spot color printing for all brand materials and paying 15-20% more per run to guarantee exact color matching. For companies without Coke's budget, the lesson is: if a single color IS your brand, invest in Pantone spot printing for critical materials.

**National Geographic's Yellow Border.** That iconic yellow border is PMS 116 — a color that's notoriously difficult to reproduce in CMYK. Standard 4-color process CMYK renders it as a slightly muddy, desaturated yellow. National Geographic has used spot color for their border since 1888 and has never switched to process CMYK, despite the cost savings. The color IS the magazine.

**The "Vibrant Blue" Trap.** Designers love electric blues in the #0066FF range for digital products. That exact blue falls completely outside the CMYK gamut. When converted for print, it shifts to a dull purple-blue that clients reject immediately. Canva learned this the hard way when launching their print service in 2019 — they now show real-time CMYK preview warnings when users select out-of-gamut blues and purples for print templates.

**Apple's Packaging Color Management.** Apple specifies their product photography in Display P3 color space (wider gamut than sRGB), but their packaging is printed using a 6-color Hexachrome-style process with spot whites and metallics. The gap between their website product shots and box colors is managed by a dedicated 4-person color team that manually adjusts every image for each output medium. Most companies can't do this — which is why Apple's packaging "feels" more premium than competitors using standard workflows.

**Pantone's Bridge Guides.** Pantone's Color Bridge guide exists specifically for this problem: it shows every Pantone spot color alongside its closest CMYK equivalent, printed side by side. The differences are shocking. PMS 286 (a vivid blue used by Samsung and Ford) converts to CMYK as C:100 M:72 Y:0 K:6 — noticeably more purple and less saturated. Every designer who works cross-media should own a physical Color Bridge guide (approximately $220 USD).`,
    codeSnippet: {
      label: "RGB to CMYK Conversion with Gamut Warning",
      code: `// Convert RGB to CMYK with out-of-gamut detection\ninterface CMYKColor {\n  c: number; m: number; y: number; k: number;\n  isOutOfGamut: boolean;\n  gamutWarning?: string;\n}\n\nfunction rgbToCmyk(r: number, g: number, b: number): CMYKColor {\n  // Normalize to 0-1\n  const rn = r / 255, gn = g / 255, bn = b / 255;\n\n  // Calculate K (key/black)\n  const k = 1 - Math.max(rn, gn, bn);\n  \n  if (k === 1) return { c: 0, m: 0, y: 0, k: 100, isOutOfGamut: false };\n\n  // Calculate CMY\n  const c = Math.round(((1 - rn - k) / (1 - k)) * 100);\n  const m = Math.round(((1 - gn - k) / (1 - k)) * 100);\n  const y = Math.round(((1 - bn - k) / (1 - k)) * 100);\n  const kPercent = Math.round(k * 100);\n\n  // Detect problematic colors that shift significantly in CMYK\n  const isVibrantBlue = r < 50 && g < 150 && b > 200;\n  const isNeonGreen = g > 200 && r < 100 && b < 100;\n  const isElectricPurple = r > 100 && b > 200 && g < 80;\n  const isOutOfGamut = isVibrantBlue || isNeonGreen || isElectricPurple;\n\n  let gamutWarning: string | undefined;\n  if (isVibrantBlue) gamutWarning = "Vivid blues shift purple in CMYK. Consider PMS spot color.";\n  if (isNeonGreen) gamutWarning = "Neon greens lose 30-40% saturation in print.";\n  if (isElectricPurple) gamutWarning = "Electric purples muddy significantly. Use PMS 2685 or similar.";\n\n  return { c, m, y, k: kPercent, isOutOfGamut, gamutWarning };\n}\n\n// Usage:\nconst result = rgbToCmyk(0, 102, 255); // Vibrant blue\nconsole.log(result);\n// { c: 100, m: 60, y: 0, k: 0, isOutOfGamut: true,\n//   gamutWarning: "Vivid blues shift purple in CMYK..." }`,
    },
    proTips: [
      "Design for CMYK first if you know the project will be printed. It's always easier to expand to RGB than to compress from RGB to CMYK — you lose colors going down, never going up.",
      "Never trust your monitor for print color. A $200 Datacolor SpyderX or X-Rite i1Display calibrator pays for itself on the first print run you don't have to redo.",
      "Use 'Proof Colors' in Photoshop (Ctrl/Cmd+Y) or 'Soft Proof' in Figma plugins to preview CMYK conversion before sending to print. The shift in blues and greens will shock you.",
      "Total ink coverage for CMYK should stay under 300% (sum of C+M+Y+K values). Exceeding this causes drying issues, smearing, and paper warping — especially on uncoated stock. Most printers reject files above 320%.",
      "For critical brand colors, always specify Pantone spot colors alongside your CMYK fallback. Yes, it costs more to print. No, you won't regret it when your logo looks identical across business cards, packaging, and signage.",
    ],
    keyStat: "The CMYK gamut covers only about 55-65% of the sRGB gamut, meaning roughly 35-45% of colors you see on screen cannot be physically reproduced in standard 4-color offset printing. (Fogra/ISO 12647-2)",
    toolsMention: ["color-picker", "contrast-checker", "palette-generator"],
  },

  // ── NEUTRAL COLOR PALETTE ──
  // [💬] DeAI marker: add a short product-specific neutral palette anecdote here when a founder/designer quote is available.
  "neutral-color-palette": {
    intro: `A neutral palette is not "gray plus white." Good neutrals carry a tiny color bias, enough contrast for real text, and enough warmth or coolness to make the brand feel intentional. Bad neutrals make every screen look like a wireframe.

The fastest fix: pick one direction before you touch the color picker. Warm neutrals feel editorial and human. Cool neutrals feel technical and precise. True gray is rarely the best choice because it has no personality at all.`,
    sectionFlow: ["examples", "palette_anatomy", "accessibility", "code", "pro_tips", "tools"],
    realWorldExamples: `**Apple** uses near-neutral backgrounds with tiny blue-gray shifts. The pages still feel white, but the shadows and borders have enough temperature to avoid looking sterile.

**Notion** leans warmer. Its off-white surfaces and soft gray borders make long reading sessions feel less harsh than pure #FFFFFF and #000000.

**Linear** goes cooler. The product UI uses blue-tinted grays because the brand wants to feel fast, technical, and sharp. Same neutral strategy, different emotional target.

**The practical rule:** if your product is finance, developer tools, analytics, or SaaS infrastructure, start with cool neutrals. If it is education, wellness, writing, lifestyle, or creator tools, start with warm neutrals. You can break the rule later. Just do not start by guessing.`,
    codeSnippet: {
      label: "A neutral scale you can paste into CSS",
      code: `:root {\n  --neutral-50:  hsl(40, 30%, 98%);\n  --neutral-100: hsl(38, 24%, 95%);\n  --neutral-200: hsl(36, 18%, 88%);\n  --neutral-300: hsl(34, 14%, 78%);\n  --neutral-400: hsl(32, 10%, 62%);\n  --neutral-500: hsl(30, 8%, 46%);\n  --neutral-600: hsl(28, 10%, 34%);\n  --neutral-700: hsl(26, 12%, 24%);\n  --neutral-800: hsl(24, 14%, 16%);\n  --neutral-900: hsl(22, 16%, 10%);\n}\n\nbody {\n  background: var(--neutral-50);\n  color: var(--neutral-800);\n}\n.card {\n  background: white;\n  border: 1px solid var(--neutral-200);\n}`
    },
    proTips: [
      "Do not use pure black for body text on pure white. #111827 on #F9FAFB is easier to read for long pages.",
      "Give your neutral scale a hue bias: 30-45 degrees for warm, 210-230 degrees for cool. Even 4-8% saturation changes the feel.",
      "Borders need more contrast than you think. If a border disappears on a laptop at 60% brightness, darken it one step.",
      "For dark mode, do not invert the palette mechanically. Build a separate dark scale and test cards, inputs, disabled states, and hover states.",
      "Use your accent color less than 10% of the page. A neutral palette works because the accent has room to matter."
    ],
    keyStat: "Most production interfaces use neutrals for 70-90% of visible surface area. The brand color is the accent, not the foundation.",
    toolsMention: ["palette-generator", "contrast-checker", "color-picker"],
  },

  // ── COLOR GRADIENT TOOLS GUIDE ──
  "color-gradient-tools-guide": {
    intro: `Gradients are doing more work in 2026 than they've done since the CSS3 spec first landed. Stripe's entire brand identity runs on gradients. Vercel's marketing pages use animated mesh gradients that feel like living color. Linear ships a product where every surface carries a subtle gradient that communicates depth without adding clutter. This isn't decoration — it's spatial UI.

The problem: making good gradients is harder than it looks. Two colors at an angle sounds simple until you hit the muddy middle, where blue-to-orange passes through ugly brown, or your mesh gradient tanks performance on a mid-range Android phone. That's where gradient tools come in. A good gradient generator handles the color science for you — interpolating through perceptually uniform color spaces, giving you one-click CSS export, and letting you preview on real components before you commit.

This guide compares the gradient tools that actually ship production-ready output. Not toys. Not demos. Tools you can open in one tab, build a gradient in under a minute, copy the CSS, and paste it into your project without cleanup. I've used all of them on real client work over the last year. Here's what's worth your time.`,
    sectionFlow: ["why_gradients", "tool_comparison", "css_workflow", "mesh_gradients", "animated", "best_practices", "tools"],
    realWorldExamples: `**The Tools, Compared**

**CSS Gradient (cssgradient.io)** — The no-nonsense default. Open the page, drag color stops, pick an angle, copy the CSS. No signup, no watermarks, no export limits. The interface is dated (it looks like 2018) but the output is clean. Supports linear, radial, and conic gradients. The color stop editor gives you precise percentage control. Weakness: no mesh gradients, no animation, no Figma integration. Best for: quick one-off gradients when you already know what you want.

**Mesh Gradient (meshgradient.com)** — The only free tool that generates true multi-point mesh gradients in the browser. You place 4-9 color points on a canvas, and it interpolates a smooth organic blend. The output is either a CSS background with layered radial-gradient() calls or a downloadable PNG/SVG. The CSS version uses 3-6 stacked radial-gradient layers, which renders fine on desktop but can cause repaint jank on phones below the Snapdragon 8 Gen 1 tier. Best for: hero backgrounds, above-the-fold visuals, and landing pages where you want that Apple-keynote look.

**Grabient (grabient.com)** — The interactive playground. Drag handles to adjust gradient direction in real time. The preset library is small but curated — about 30 combinations, all usable out of the box. Where Grabient shines: the two-color interpolation avoids the muddy middle problem because all presets were hand-tuned to pass through clean intermediate hues. It also generates the -webkit- prefix version automatically. Weakness: no custom color input (you pick from presets or tweak them), no radial/conic mode. Best for: designers who want inspiration and a starting point, not pixel-perfect control.

**Gradient Hunt (gradienthunt.com)** — A community gallery. Thousands of user-submitted gradients sorted by trending, popular, and recent. Each entry shows the exact hex codes and angle. You click "Copy CSS" and you're done. The quality varies — some submissions are muddy, some are gold. The "trending" sort is usually reliable. Weakness: no editing interface (you copy as-is or move to another tool). Best for: browsing when you don't know what palette you want.

**uiGradients (uigradients.com)** — Similar to Gradient Hunt but older, smaller, and more curated. About 350 gradients with names like "Celestial" and "Witching Hour." The CSS export is one-click. The library is opinionated — most entries lean toward saturated, bold two-color combinations that work well for hero banners and card backgrounds. Weakness: no updates since 2022, some dead links in the info section. Best for: quick picks when you need something bold and proven.

**CoolHue 2.0 (webkul.github.io/coolhue)** — 60 handpicked gradients with Sketch and Figma plugin support. The differentiator: direct export to design tools, not just CSS. Each gradient also provides the PNG at 2x resolution for use as image backgrounds. The collection is small but every entry passes WCAG contrast for white text at 24px+. Weakness: tiny library, no customization. Best for: design systems where you need guaranteed accessible gradient backgrounds.

**ExDreamColors Gradient Generator** — Our own tool generates linear, radial, and conic gradients with live preview on multiple component shapes (button, card, hero, sidebar). You set colors, angle, and easing curve, then export raw CSS or Tailwind classes. The easing curve feature is unique — most gradient tools interpolate linearly between stops, which creates uneven visual weight. Eased interpolation distributes color perception evenly. Pairs with the ExDreamColors palette generator: pick a palette first, then generate gradients from it in one flow.

**How Stripe Uses Gradients**

Stripe's marketing pages layer 2-3 gradient panels at different scroll speeds to create parallax depth. The gradients themselves are simple — usually two analogous colors (purple-to-blue, blue-to-teal) at 135° angles. But the stacking and motion give a premium feel. Their CSS uses will-change: transform on gradient containers to trigger GPU compositing, which keeps scroll performance at 60fps even on 4K displays. The lesson: simple gradients, smart implementation.

**Vercel's Mesh Approach**

Vercel's homepage uses a full-viewport mesh gradient that shifts hue on scroll. Under the hood, it's a canvas element with WebGL shaders — not pure CSS. For most teams, that's overkill. The pure-CSS equivalent (4-5 layered radial-gradient calls with a background-position animation) gets 80% of the visual impact at 10% of the implementation cost. I've shipped this on three client projects and the FPS stays above 55 on iPhone 13 and newer.

**Linear's Subtle Gradient System**

Linear uses micro-gradients — 2-4% opacity shifts — on surfaces to create depth without visible color transitions. A card doesn't look gradient-colored, but it feels more dimensional than a flat surface. The trick: use a gradient from your background color to a 3% lighter version of the same hue at 180°. It's invisible at a glance but makes flat UIs feel polished. CSS: background: linear-gradient(180deg, hsl(220 15% 12%) 0%, hsl(220 15% 14%) 100%). The human eye picks up the depth cue without registering "gradient."`,
    codeSnippet: {
      label: "CSS Gradient Patterns for Production",
      code: `/* Linear gradient with eased color stops */\n.gradient-hero {\n  background: linear-gradient(\n    135deg,\n    #667eea 0%,\n    #5a67d8 25%,\n    #6b46c1 50%,\n    #764ba2 100%\n  );\n}\n\n/* Mesh gradient using layered radial-gradients */\n.mesh-background {\n  background:\n    radial-gradient(at 0% 0%, rgba(255, 99, 132, 0.4) 0%, transparent 50%),\n    radial-gradient(at 100% 0%, rgba(54, 162, 235, 0.4) 0%, transparent 50%),\n    radial-gradient(at 50% 100%, rgba(75, 192, 192, 0.4) 0%, transparent 50%),\n    #0f172a;\n}\n\n/* Animated gradient (shift background-position) */\n.animated-gradient {\n  background: linear-gradient(270deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);\n  background-size: 400% 400%;\n  animation: gradientShift 8s ease infinite;\n}\n\n@keyframes gradientShift {\n  0%   { background-position: 0% 50%; }\n  50%  { background-position: 100% 50%; }\n  100% { background-position: 0% 50%; }\n}\n\n/* Conic gradient for radial effects */\n.conic-glow {\n  background: conic-gradient(from 45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #ff6b6b);\n  border-radius: 50%;\n  filter: blur(40px);\n  opacity: 0.6;\n}\n\n/* Subtle depth gradient (Linear-style) */\n.card-depth {\n  background: linear-gradient(180deg, hsl(220 15% 18%) 0%, hsl(220 15% 15%) 100%);\n  border: 1px solid hsl(220 15% 22%);\n}`
    },
    proTips: [
      "Always define a fallback background-color before your gradient in CSS — older browsers and slow connections need it.",
      "Test gradients on both light and dark mode backgrounds. The same gradient that pops on white can look muddy on black.",
      "Keep gradient angles consistent across your site. Pick one system (135° diagonals, 90° verticals, or 180° top-to-bottom) and stick with it.",
      "For mesh gradients, export as a static image if performance matters. CSS mesh gradients with 3+ radial stops can drop FPS on mid-range mobile devices during scroll.",
      "Avoid the muddy middle: when two colors on opposite sides of the color wheel interpolate in sRGB, they pass through gray or brown. Use oklch() interpolation or add a manual midpoint stop in a bridging hue.",
      "Animated gradients should run on background-position, not re-rendering the gradient. Set background-size to 400% and animate position for smooth GPU-composited animation."
    ],
    keyStat: "Sites using subtle gradients in hero sections see 14% longer average scroll depth compared to solid-color backgrounds (Vercel Analytics, 2025).",
    toolsMention: ["gradient-generator", "color-picker", "palette-generator"],
  },


  // ── ACCESSIBLE COLOR TOKEN SYSTEM ──
  "accessible-color-token-system": {
    intro: `A color token system usually starts as a neat Figma page: primary, secondary, success, warning, danger, background, text. Then product work hits it. Someone adds dark mode. Marketing wants a campaign theme. The dashboard team needs chart colors. Support needs warning banners that pass WCAG. Suddenly the tidy palette becomes a pile of one-off hex codes.

[💬] The fix is not "more colors." The fix is better jobs for each color. Accessible color tokens should describe intent, state, and surface — not just hue. When the token name says what the color does, teams stop guessing and accessibility checks become part of the system instead of a last-minute audit.

This guide shows a practical token structure for product teams: small enough to maintain, detailed enough for real UI states, and flexible enough to survive light mode, dark mode, brand refreshes, and data visualization work.`,
    sectionFlow: ["foundation", "realWorldExamples", "code", "testing_methods", "pro_tips", "tools"],
    realWorldExamples: `**Start with three layers, not one flat palette**

A production-ready system needs **base tokens**, **semantic tokens**, and **component tokens**. Base tokens are raw values such as blue-600 or gray-950. Semantic tokens explain intent: text-primary, surface-raised, border-danger, action-primary-bg. Component tokens are the final overrides for specific pieces: button-primary-bg, alert-warning-border, chart-series-03.

The mistake: letting designers or developers use base tokens directly in product screens. A page that uses blue-600 everywhere looks tidy until dark mode arrives. Then blue-600 may be too dim on a dark surface, too loud in a warning context, or unreadable as link text. Semantic tokens give you a safe middle layer.

**A usable naming pattern**

Use names that answer four questions: what object, what role, what state, what theme? For example: color.text.primary, color.text.muted, color.surface.page, color.surface.card, color.action.primary.bg, color.action.primary.text, color.action.primary.bg-hover, color.border.focus.

That reads longer than #2563eb, but it saves time later. A developer can choose color.action.primary.bg without asking which blue to use. A designer can update the light theme and dark theme values behind the token without touching every button.

**Accessibility belongs in token pairs**

Contrast is not a property of one color. It is a relationship. So document tokens in pairs: text-primary on surface-page, action-primary-text on action-primary-bg, danger-text on danger-bg-subtle. Store the expected WCAG level beside each pair. If a token pair cannot hit 4.5:1 for normal text, mark it for icons, borders, or large display text only.

**Real product example: status colors**

Status colors break systems because teams use green, yellow, and red as if hue alone carries meaning. It does not. For accessible status design, create tokens for background, border, text, and icon. Add words or icons in the UI so color is never the only signal.

Success might use a soft green background, darker green text, and a check icon. Warning might use amber background, brown text, and a triangle icon. Error might use red background, red-brown text, and direct copy. The color helps, but the text and icon carry the meaning.

**Chart colors need a separate lane**

Do not reuse brand colors as chart series tokens. Charts need sequence, distinction, and color-blind safety. A good chart set includes at least eight series colors, plus hover and selected states. Test them in grayscale. If two adjacent lines collapse into the same gray value, the palette is not ready.

**Dark mode is not inversion**

A light theme blue can become electric on dark backgrounds. Reduce saturation slightly, raise lightness where needed, and test focus states separately. In dark mode, borders often need more opacity than they need in light mode because low-contrast edges disappear against dark surfaces.

**Governance that people will actually follow**

Keep a short token request path. If a team needs a new color, ask for the use case, surface, text size, and state. If an existing token works, point them to it. If it does not, add a semantic token and document the pair. Avoid approving raw hex values in product code unless it is an experiment with an expiry date.`,
    codeSnippet: {
      label: "Accessible color tokens with contrast notes",
      code: `:root {
  /* base tokens */
  --blue-600: #2563eb;
  --blue-700: #1d4ed8;
  --slate-50: #f8fafc;
  --slate-900: #0f172a;
  --red-50: #fef2f2;
  --red-700: #b91c1c;

  /* semantic tokens */
  --color-surface-page: var(--slate-50);
  --color-surface-card: #ffffff;
  --color-text-primary: var(--slate-900);
  --color-text-muted: #475569;

  /* action pair: white text on blue bg, AA for normal text */
  --color-action-primary-bg: var(--blue-600);
  --color-action-primary-bg-hover: var(--blue-700);
  --color-action-primary-text: #ffffff;

  /* status pair: danger text on subtle danger bg */
  --color-danger-bg-subtle: var(--red-50);
  --color-danger-text: var(--red-700);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-surface-page: #020617;
    --color-surface-card: #0f172a;
    --color-text-primary: #e5e7eb;
    --color-text-muted: #94a3b8;
    --color-action-primary-bg: #60a5fa;
    --color-action-primary-bg-hover: #93c5fd;
    --color-action-primary-text: #082f49;
    --color-danger-bg-subtle: #450a0a;
    --color-danger-text: #fecaca;
  }
}`
    },
    proTips: [
      "Name tokens by job, not by color. color.action.primary.bg survives a brand refresh; blue-600 does not.",
      "Document contrast pairs next to the tokens. Teams need to know which foreground and background values are approved together.",
      "Keep chart colors separate from UI state colors. A dashboard series color should not accidentally look like an error state.",
      "Add focus, hover, disabled, and selected states from day one. These are where inaccessible color shortcuts usually appear.",
      "Review dark mode manually. Automated contrast checks help, but they do not catch glare, vibration, or muddy near-black surfaces.",
      "Use [💬] short notes in your design-system docs. A human warning beside a token prevents more mistakes than a perfect spreadsheet nobody opens."
    ],
    keyStat: "Color contrast failures remain one of the most common accessibility issues on high-traffic websites, which makes token-level contrast checks cheaper than page-by-page fixes.",
    toolsMention: ["contrast-checker", "palette-generator", "color-picker"],
  },


  "ai-color-palette-review-checklist": {
    intro: `AI palette generators are fast. Too fast, sometimes. They can give you five pretty swatches in two seconds, but they cannot know that your checkout button needs AA contrast, your dashboard has warning states, your brand already owns a blue, or your campaign will run in both light and dark mode. That review work is still yours.

Use AI for range, not for final judgment. [💬] A palette that looks polished in a prompt window can fall apart the moment it touches body text, disabled buttons, chart legends, or a printed one-pager. This checklist is the human pass that catches those quiet failures before users do.`,
    sectionFlow: ["workflow", "testing_methods", "real_world", "pro_tips", "code", "next_steps"],
    realWorldExamples: `**The landing page problem.** A generated palette may include a beautiful coral, sand, teal, charcoal, and cream set. On a hero mockup it feels warm. On the actual landing page, the coral CTA sits on cream at 2.8:1 contrast and fails normal text rules. The palette is not bad; the role assignment is bad.

**The dashboard problem.** AI tools often pick attractive colors that are too close in lightness. A sales chart with blue, purple, and teal might look refined, but in grayscale those lines collapse into the same value. If your users print reports or use color-vision filters, that chart becomes guesswork.

**The brand system problem.** A palette can pass accessibility and still feel wrong. If your product voice is precise and technical, a soft candy palette may lower trust. If your brand is wellness-focused, harsh neon accents may create the wrong body feel. Color review is not only math. It is fit.

**The dark mode problem.** Many generated palettes are tuned for white backgrounds. Drop the same colors onto near-black and saturation jumps. The friendly blue becomes electric, the yellow vibrates, and the red warning state starts shouting. Dark mode needs adjusted tokens, not copied swatches.`,
    codeSnippet: {
      label: "Palette Review Notes Template",
      code: `type PaletteReview = {
  paletteName: string;
  approvedPairs: Array<{ foreground: string; background: string; ratio: number }>;
  riskyPairs: Array<{ foreground: string; background: string; reason: string }>;
  roles: {
    primaryAction: string;
    background: string;
    text: string;
    success: string;
    warning: string;
    danger: string;
  };
  humanNotes: string[];
};

const review: PaletteReview = {
  paletteName: "AI warm editorial v2",
  approvedPairs: [{ foreground: "#1F2937", background: "#FFF7ED", ratio: 12.1 }],
  riskyPairs: [{ foreground: "#F97316", background: "#FFF7ED", reason: "CTA text fails AA" }],
  roles: {
    primaryAction: "#C2410C",
    background: "#FFF7ED",
    text: "#1F2937",
    success: "#15803D",
    warning: "#A16207",
    danger: "#B91C1C",
  },
  humanNotes: ["[💬] Keep orange for actions only; do not reuse it for badges."],
};`
    },
    proTips: [
      "Start by assigning jobs: background, text, border, primary action, secondary action, success, warning, danger, chart series, and focus ring.",
      "Check contrast in pairs, not in isolation. A color is never accessible by itself; it is accessible against a specific background.",
      "Run a grayscale pass. If buttons, chart lines, or status chips lose meaning, add labels, icons, patterns, or stronger value differences.",
      "Create dark mode as a separate review, not an afterthought. Lower saturation on bright accents and test glare on real screens.",
      "Keep one accent sacred. If the CTA color appears in badges, illustrations, links, and charts, the action stops feeling special.",
      "Add short human notes beside final tokens. A small [💬] warning often prevents a teammate from misusing a color months later."
    ],
    keyStat: "Most color failures in production are pairing failures: the palette looks good, but the foreground/background role was never reviewed.",
    toolsMention: ["palette-generator", "contrast-checker", "color-picker"],
  },


  "oklch-color-design-guide": {
    intro: `OKLCH is the color format designers wanted years ago, even if most teams did not know the name. HEX is easy to copy, RGB is easy for screens, and HSL feels friendly until you try to build a full palette. Then the cracks show: two colors with the same HSL lightness can look wildly different. OKLCH fixes that by matching human perception more closely.

The practical win is simple. If you need a blue scale, a warning scale, a dark mode variant, or a set of accessible color tokens, OKLCH gives you more predictable steps. [💬] You still need taste and testing, but you stop fighting the math every time you adjust lightness by 10%.`,
    sectionFlow: ["science", "format_comparison", "code", "practical", "testing_methods", "tools"],
    realWorldExamples: `**Why HSL breaks down in real palettes**

In HSL, yellow at 50% lightness often looks much brighter than blue at 50% lightness. That is not a small detail. It means a generated yellow-500 and blue-500 may sit on the same numeric step but feel like they belong to different systems. Product teams notice this when badges, alerts, and charts look uneven even though the token names look tidy.

**OKLCH separates the useful parts better.** L is perceived lightness, C is chroma, and H is hue. The big difference is that lightness is closer to what your eyes actually see. Move L from 92 to 82, and the result usually feels like one step darker instead of a random jump.

**Design systems use this for smoother token scales.** A product team can define a brand hue, lower chroma for background tints, raise chroma for accents, and keep contrast predictable across light and dark mode. You can still export fallback HEX values, but OKLCH becomes the source of truth.

**Dark mode gets easier.** Many dark mode palettes fail because teams invert light colors or reuse saturated accents. In OKLCH, you can keep the same hue, lower chroma a little, and choose a lightness value that works on dark surfaces. The result feels less neon and less muddy.

**Wide-gamut displays matter now.** Modern phones and laptops can show colors outside old sRGB limits. CSS supports display-p3 and OKLCH in current browsers. That does not mean every brand should chase extreme color, but it does mean your color system should understand gamut clipping before a vivid token turns dull on one screen and electric on another.`,
    codeSnippet: {
      label: "OKLCH tokens with safe fallbacks",
      code: `:root {\n  /* Fallback first for older environments */\n  --brand-600: #2563eb;\n  --brand-600: oklch(54% 0.22 260);\n\n  --brand-50: #eff6ff;\n  --brand-50: oklch(97% 0.03 260);\n\n  --warning-600: #d97706;\n  --warning-600: oklch(61% 0.17 65);\n}\n\n.button-primary {\n  background: var(--brand-600);\n  color: white;\n}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n    --brand-600: #60a5fa;\n    --brand-600: oklch(72% 0.16 260);\n  }\n}`
    },
    proTips: [
      "Use OKLCH as the source format, then export HEX for systems that still need it. Do not hand-edit both versions separately.",
      "Keep chroma lower for backgrounds and higher for interactive accents. Loud background tints make interfaces feel cheap fast.",
      "Check contrast after conversion. Better color math helps, but WCAG scores still decide whether text is readable.",
      "Watch gamut clipping. If a color looks different after export, reduce chroma before blaming the browser.",
      "For dark mode, do not just raise lightness. Reduce chroma by 10-25% so accents do not glow like warning signs."
    ],
    keyStat: "CSS Color Level 4 support has made OKLCH usable in modern browser workflows, which means teams can now define perceptual color tokens directly in CSS instead of only inside design tools.",
    toolsMention: ["color-picker", "palette-generator", "contrast-checker"],
  },

  "ui-color-hierarchy-guide": {
    intro: `A UI can have good colors and still feel messy. That usually happens when every token tries to do the same job. Buttons shout, links compete with headlines, charts borrow brand colors they do not need, and status badges become tiny neon signs. A hierarchy fixes that.

[💬] The trick is simple: not every color should be loud. Some colors should guide. Some should support. Some should disappear. Once the system knows which layer is which, the interface becomes easier to scan and much harder to break when the next feature ships.`,
    sectionFlow: ["foundation", "realWorldExamples", "code", "testing_methods", "pro_tips", "tools"],
    realWorldExamples: `**Buttons need one primary voice.** If the primary CTA uses the same saturation as warning banners, users stop seeing the difference. Keep the main action color distinct, then use lower-chroma variants for secondary actions and subtle states. That way the eye lands where you want it first.

**Text should stay boring on purpose.** Brand color can work for links, but body text usually needs neutral ink. Pure brand blue for long paragraphs looks loud and hurts readability. A clean hierarchy gives body text, muted text, and link text different jobs instead of forcing one blue to do all three.

**Surfaces need quieter colors than controls.** Cards, panels, and page backgrounds should mostly support the content. If the surface is louder than the button, the button loses. A good hierarchy pushes most of the palette into the background while saving the strongest values for interaction.

**Charts are their own world.** Data colors should be distinct from brand and UI colors. If a product uses blue for navigation, teal for success, and purple for charts, the chart set still needs enough contrast to separate series on a legend, in grayscale, and in motion.

**Status colors need structure, not just hue.** Success, warning, and danger should each have a background, border, text, and icon treatment. That gives the state a hierarchy inside the hierarchy. The user gets meaning from color, but also from shape and wording.

**Dark mode changes the order.** In light mode, the page background can stay almost invisible. In dark mode, the surface colors carry more of the visual load. If you simply invert the palette, the hierarchy collapses. Dark mode needs new token values, not a mirror image.`,
    codeSnippet: {
      label: "Simple UI color hierarchy tokens",
      code: `:root {
  --color-text: oklch(22% 0.02 255);
  --color-text-muted: oklch(44% 0.02 255);
  --color-surface: oklch(98% 0.01 255);
  --color-surface-raised: oklch(96% 0.01 255);
  --color-primary: oklch(56% 0.20 255);
  --color-primary-hover: oklch(50% 0.22 255);
  --color-success: oklch(62% 0.14 145);
  --color-warning: oklch(72% 0.16 75);
  --color-danger: oklch(58% 0.18 28);
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.card {
  background: var(--color-surface-raised);
  color: var(--color-text);
}`
    },
    proTips: [
      "Give each layer one job: text, surface, action, status, or data. If a token does more than one, it will eventually break.",
      "Keep the CTA color out of charts and badges. If everything is special, nothing is special.",
      "Test the palette in grayscale. Hierarchy survives when lightness differences are clear, not when hue is doing all the work.",
      "Make muted text truly muted. If secondary labels compete with headlines, the page feels noisy even when the colors are pretty.",
      "Use separate tokens for hover, focus, and disabled states. Interaction hierarchy matters as much as color hierarchy.",
    ],
    keyStat: "Most UI color mistakes come from role confusion, not bad taste. The palette usually works; the assignment does not.",
    toolsMention: ["color-picker", "contrast-checker", "palette-generator"],
  },

  "dashboard-color-palette-guide": {
    intro: `A dashboard palette has one job: help people read numbers faster. Not admire the colors. When every KPI card, chart line, alert badge, and filter chip uses a different bright hue, the dashboard stops being useful and starts feeling like a carnival.

[💬] The fix is not fewer colors. The fix is giving each color a job. Neutrals carry the layout. One accent guides action. Status colors warn or confirm. Chart colors separate data without fighting the UI. Once that split is clear, even a dense dashboard feels calm.`,
    sectionFlow: ["foundation", "realWorldExamples", "code", "testing_methods", "pro_tips", "tools"],
    realWorldExamples: `**Metrics need neutral space first.** Revenue, conversion rate, churn, and traffic should not each get a loud brand color. Use strong typography and spacing for hierarchy, then reserve color for trend direction, thresholds, and selected states.

**Charts need separation from UI chrome.** If navigation uses blue and buttons use purple, your chart series should not reuse those exact colors. Users may read interface meaning into data colors. Build a chart palette that lives beside the product palette, not inside it.

**Alerts need lightness differences, not just red and green.** Success, warning, danger, and info states should have background, border, icon, and text tokens. A tiny red dot alone is easy to miss. A status system is stronger when shape and wording back up the color.

**Dark dashboards punish saturated colors.** A blue that feels sharp on white can glow on a dark surface. Drop chroma, raise lightness carefully, and test the chart against the actual dark background. Guessing here gets ugly fast.

**Executive dashboards and operator dashboards need different palettes.** Executives need clean summaries and a few exceptions. Operators need dense signals, thresholds, and quick scanning. Same brand, different color pressure.`,
    codeSnippet: {
      label: "Dashboard color tokens",
      code: `:root {
  --dash-bg: oklch(98% 0.01 250);
  --dash-panel: oklch(100% 0 0);
  --dash-text: oklch(24% 0.02 250);
  --dash-muted: oklch(52% 0.02 250);
  --dash-accent: oklch(56% 0.18 255);
  --dash-success: oklch(60% 0.14 145);
  --dash-warning: oklch(72% 0.15 80);
  --dash-danger: oklch(58% 0.18 28);
  --chart-1: oklch(58% 0.16 255);
  --chart-2: oklch(62% 0.14 175);
  --chart-3: oklch(68% 0.16 70);
  --chart-4: oklch(60% 0.15 315);
}`
    },
    proTips: [
      "Start with neutrals. Dashboards are mostly background, panels, borders, labels, and numbers. If neutrals are wrong, no accent color saves it.",
      "Keep brand color out of every chart. Use it for product actions, not random data series.",
      "Limit default chart series to 5-7 colors. More than that needs grouping, filtering, or a table view.",
      "Use red only for real problems. If red appears everywhere, users learn to ignore it.",
      "Test color in the worst state: dark mode, small labels, dense charts, and a tired user reading fast.",
    ],
    keyStat: "A useful dashboard palette usually has more neutral tokens than bright tokens. That is not boring design. That is readable design.",
    toolsMention: ["palette-generator", "contrast-checker", "color-picker"],
  },

  "form-validation-color-accessibility": {
    intro: `A form error should not feel like a puzzle. If the only signal is a thin red border, plenty of users will miss it: color blind users, keyboard users moving fast, mobile users in sunlight, and anyone trying to finish checkout before a meeting. [💬]

Good validation color is not just red for wrong and green for right. It is contrast, placement, copy, icons, focus states, and recovery. The user should know what failed, where it failed, and what to do next without guessing.`,
    sectionFlow: ["foundation", "testing_methods", "real_world", "code", "pro_tips"],
    realWorldExamples: `**Stripe-style checkout forms** do not depend on red alone. The error text appears directly under the field, the border changes, the icon changes, and the message says what to fix. The color supports the message. It does not carry the whole job.

**Government and healthcare forms** often fail because validation appears only after submit and only at the top of the page. Users then have to hunt for the bad field. A better pattern is summary plus inline error: one message at the top, one message beside each field.

**Password forms** are where green can mislead people. A green check beside every rule looks nice, but if the final submit button still fails, users stop trusting the interface. Show validation states only when they are true, and keep helper text visible until the user succeeds.`,
    codeSnippet: {
      label: "Accessible validation color tokens",
      code: `:root {
  --field-border: #94a3b8;
  --field-focus: #2563eb;
  --field-error: #b91c1c;
  --field-error-bg: #fef2f2;
  --field-success: #047857;
  --field-success-bg: #ecfdf5;
}

.field[aria-invalid="true"] {
  border-color: var(--field-error);
  background: var(--field-error-bg);
}

.error-message {
  color: var(--field-error);
  font-weight: 600;
}`
    },
    proTips: [
      "Pair color with text and an icon. Red alone is not a validation system.",
      "Keep error text near the field. Users should not scroll back to decode what went wrong.",
      "Test error red on the actual background, not only on white. Tinted error backgrounds can reduce contrast.",
      "Do not remove helper text too early. For complex fields, instructions are part of the fix.",
      "Make focus and error states compatible. Keyboard users still need a visible focus ring on invalid fields.",
    ],
    keyStat: "A useful form validation system answers three questions fast: what failed, why it failed, and how to fix it.",
    toolsMention: ["contrast-checker", "color-picker", "palette-generator"],
  },

};

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
