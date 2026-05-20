// Palette generation utilities
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from './colorUtils'

export type PaletteType = 'complementary' | 'analogous' | 'triadic' | 'split-complementary' | 'tetradic' | 'monochromatic'

export interface ColorPalette {
  hex: string
  name: string
  role: string
}

// Generate complementary colors
export function generateComplementary(baseColor: string): ColorPalette[] {
  const rgb = hexToRgb(baseColor)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  
  const complementaryHue = (hsl.h + 180) % 360
  
  const color1 = hslToRgb((hsl.h + 15) % 360, hsl.s, hsl.l)
  const color2 = hslToRgb((hsl.h - 15 + 360) % 360, hsl.s, hsl.l)
  const color3 = hslToRgb(complementaryHue, hsl.s, hsl.l)
  const color4 = hslToRgb((complementaryHue + 180) % 360, hsl.s * 0.7, (hsl.l + 30) % 100)
  
  return [
    { hex: baseColor, name: 'Base', role: 'primary' },
    { hex: rgbToHex(color1.r, color1.g, color1.b), name: 'Analogous Light', role: 'light' },
    { hex: rgbToHex(color2.r, color2.g, color2.b), name: 'Analogous Dark', role: 'dark' },
    { hex: rgbToHex(color3.r, color3.g, color3.b), name: 'Complementary', role: 'accent' },
    { hex: rgbToHex(color4.r, color4.g, color4.b), name: 'Dark Accent', role: 'text' }
  ]
}

// Generate analogous colors
export function generateAnalogous(baseColor: string): ColorPalette[] {
  const rgb = hexToRgb(baseColor)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  
  const color1 = hslToRgb((hsl.h - 30 + 360) % 360, hsl.s, hsl.l)
  const color2 = hslToRgb((hsl.h - 15 + 360) % 360, hsl.s, hsl.l)
  const color3 = hslToRgb((hsl.h + 15) % 360, hsl.s, hsl.l)
  const color4 = hslToRgb((hsl.h + 30) % 360, hsl.s, hsl.l)
  
  return [
    { hex: rgbToHex(color1.r, color1.g, color1.b), name: 'Left', role: 'one' },
    { hex: rgbToHex(color2.r, color2.g, color2.b), name: 'Left Light', role: 'two' },
    { hex: baseColor, name: 'Base', role: 'primary' },
    { hex: rgbToHex(color3.r, color3.g, color3.b), name: 'Right Light', role: 'three' },
    { hex: rgbToHex(color4.r, color4.g, color4.b), name: 'Right', role: 'four' }
  ]
}

// Generate triadic colors
export function generateTriadic(baseColor: string): ColorPalette[] {
  const rgb = hexToRgb(baseColor)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  
  const hue2 = (hsl.h + 120) % 360
  const hue3 = (hsl.h + 240) % 360
  
  const color1 = hslToRgb(hsl.h, hsl.s * 0.7, Math.min(hsl.l + 20, 100))
  const color2 = hslToRgb(hue2, hsl.s, hsl.l)
  const color3 = hslToRgb(hue3, hsl.s, hsl.l)
  const color4 = hslToRgb((hue2 + 180) % 360, hsl.s * 0.5, (hsl.l + 30) % 100)
  
  return [
    { hex: baseColor, name: 'Base', role: 'primary' },
    { hex: rgbToHex(color1.r, color1.g, color1.b), name: 'Light Variant', role: 'light' },
    { hex: rgbToHex(color2.r, color2.g, color2.b), name: 'Triadic 1', role: 'accent1' },
    { hex: rgbToHex(color3.r, color3.g, color3.b), name: 'Triadic 2', role: 'accent2' },
    { hex: rgbToHex(color4.r, color4.g, color4.b), name: 'Dark Variant', role: 'dark' }
  ]
}

// Generate split-complementary colors
export function generateSplitComplementary(baseColor: string): ColorPalette[] {
  const rgb = hexToRgb(baseColor)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  
  const color1 = hslToRgb((hsl.h + 150) % 360, hsl.s, hsl.l)
  const color2 = hslToRgb((hsl.h + 210) % 360, hsl.s, hsl.l)
  const color3 = hslToRgb(hsl.h, hsl.s * 0.5, Math.max(hsl.l - 20, 0))
  const color4 = hslToRgb((hsl.h + 180) % 360, hsl.s * 0.6, 90)
  
  return [
    { hex: baseColor, name: 'Base', role: 'primary' },
    { hex: rgbToHex(color1.r, color1.g, color1.b), name: 'Split 1', role: 'accent1' },
    { hex: rgbToHex(color2.r, color2.g, color2.b), name: 'Split 2', role: 'accent2' },
    { hex: rgbToHex(color3.r, color3.g, color3.b), name: 'Dark Base', role: 'dark' },
    { hex: rgbToHex(color4.r, color4.g, color4.b), name: 'Light Accent', role: 'light' }
  ]
}

// Generate tetradic (square) colors
export function generateTetradic(baseColor: string): ColorPalette[] {
  const rgb = hexToRgb(baseColor)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  
  const color1 = hslToRgb((hsl.h + 90) % 360, hsl.s, hsl.l)
  const color2 = hslToRgb((hsl.h + 180) % 360, hsl.s, hsl.l)
  const color3 = hslToRgb((hsl.h + 270) % 360, hsl.s, hsl.l)
  
  return [
    { hex: baseColor, name: 'Base', role: 'primary' },
    { hex: rgbToHex(color1.r, color1.g, color1.b), name: 'Angle 90°', role: 'accent1' },
    { hex: rgbToHex(color2.r, color2.g, color2.b), name: 'Angle 180°', role: 'accent2' },
    { hex: rgbToHex(color3.r, color3.g, color3.b), name: 'Angle 270°', role: 'accent3' }
  ]
}

// Generate monochromatic colors
export function generateMonochromatic(baseColor: string): ColorPalette[] {
  const rgb = hexToRgb(baseColor)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  
  const color1 = hslToRgb(hsl.h, hsl.s, 95)
  const color2 = hslToRgb(hsl.h, hsl.s, 80)
  const color3 = hslToRgb(hsl.h, hsl.s, 40)
  const color4 = hslToRgb(hsl.h, hsl.s, 20)
  
  return [
    { hex: rgbToHex(color1.r, color1.g, color1.b), name: 'Lightest', role: 'lightest' },
    { hex: rgbToHex(color2.r, color2.g, color2.b), name: 'Light', role: 'light' },
    { hex: baseColor, name: 'Base', role: 'primary' },
    { hex: rgbToHex(color3.r, color3.g, color3.b), name: 'Dark', role: 'dark' },
    { hex: rgbToHex(color4.r, color4.g, color4.b), name: 'Darkest', role: 'darkest' }
  ]
}

// Generate palette based on type
export function generatePalette(baseColor: string, type: PaletteType): ColorPalette[] {
  switch (type) {
    case 'complementary':
      return generateComplementary(baseColor)
    case 'analogous':
      return generateAnalogous(baseColor)
    case 'triadic':
      return generateTriadic(baseColor)
    case 'split-complementary':
      return generateSplitComplementary(baseColor)
    case 'tetradic':
      return generateTetradic(baseColor)
    case 'monochromatic':
      return generateMonochromatic(baseColor)
    default:
      return generateComplementary(baseColor)
  }
}
