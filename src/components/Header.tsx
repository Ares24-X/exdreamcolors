"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface HeaderProps {
  locale?: "en" | "zh";
}

const navData = {
  en: {
    brand: "exdreamcolors",
    langSwitch: { label: "🇨🇳 中文", href: "/zh/" },
    tools: [
      { href: "/color-picker/", label: "Color Picker" },
      { href: "/palette-generator/", label: "Palette Generator" },
      { href: "/gradient-generator/", label: "Gradient Generator" },
      { href: "/contrast-checker/", label: "Contrast Checker" },
      { href: "/image-extractor/", label: "Image Extractor" },
      { href: "/tailwind-generator/", label: "Tailwind Colors" },
    ],
    blog: { href: "/blog/", label: "Blog" },
    about: { href: "/about/", label: "About" },
  },
  zh: {
    brand: "exdreamcolors",
    langSwitch: { label: "🇺🇸 English", href: "/" },
    tools: [
      { href: "/zh/color-picker/", label: "取色器" },
      { href: "/zh/palette-generator/", label: "调色板" },
      { href: "/zh/gradient-generator/", label: "渐变生成器" },
      { href: "/zh/contrast-checker/", label: "对比度检查" },
      { href: "/zh/image-extractor/", label: "图片取色" },
      { href: "/zh/tailwind-generator/", label: "Tailwind色系" },
    ],
    blog: { href: "/zh/blog/", label: "博客" },
    about: { href: "/zh/about/", label: "关于" },
  },
};

export function Header({ locale = "en" }: HeaderProps) {
  const t = navData[locale];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        menuRef.current && !menuRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={locale === "zh" ? "/zh/" : "/"} className="flex items-center gap-2 min-h-[44px]">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">🎨</span>
            </div>
            <span className="text-xl font-bold text-gray-900">{t.brand}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {t.tools.map(tool => (
              <Link key={tool.href} href={tool.href} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">{tool.label}</Link>
            ))}
            <Link href={t.blog.href} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">{t.blog.label}</Link>
            <Link href={t.about.href} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">{t.about.label}</Link>
            <Link href={t.langSwitch.href} className="ml-2 px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700 rounded-full transition-colors">{t.langSwitch.label}</Link>
          </nav>

          {/* Mobile hamburger */}
          <button ref={buttonRef} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg active:bg-gray-100 transition-colors"
            aria-expanded={mobileMenuOpen} aria-label="Toggle menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <div ref={menuRef} className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
          <nav className="flex flex-col gap-1 py-4 border-t border-gray-200">
            {t.tools.map(tool => (
              <Link key={tool.href} href={tool.href} onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-lg transition-colors min-h-[44px] flex items-center">{tool.label}</Link>
            ))}
            <Link href={t.blog.href} onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-lg transition-colors min-h-[44px] flex items-center">{t.blog.label}</Link>
            <Link href={t.about.href} onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-lg transition-colors min-h-[44px] flex items-center">{t.about.label}</Link>
            <div className="border-t border-gray-100 pt-2 mt-2">
              <Link href={t.langSwitch.href} onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-lg transition-colors min-h-[44px] flex items-center">{t.langSwitch.label}</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
