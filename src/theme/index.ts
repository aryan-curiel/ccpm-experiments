import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Brand palette
        brand: {
          300: { value: "#4d79ff" },
          500: { value: "#003CFF" },
          900: { value: "rgba(0,60,255,0.12)" },
        },
        accent: {
          300: { value: "#ffca3a" },
          500: { value: "#FEB517" },
          900: { value: "rgba(254,181,23,0.13)" },
        },
        amber: {
          300: { value: "#FEB517" },
          500: { value: "#e09a00" },
          900: { value: "rgba(224,154,0,0.12)" },
        },
        rose: {
          500: { value: "#dc2626" },
          900: { value: "rgba(220,38,38,0.10)" },
        },
        mint: {
          500: { value: "#059669" },
          900: { value: "rgba(5,150,105,0.10)" },
        },
        sky: {
          500: { value: "#2563eb" },
          900: { value: "rgba(37,99,235,0.10)" },
        },
        teal: {
          500: { value: "#0891b2" },
          900: { value: "rgba(8,145,178,0.10)" },
        },
        violet: {
          500: { value: "#7c3aed" },
          900: { value: "rgba(124,58,237,0.10)" },
        },
      },
      fonts: {
        heading: { value: "'Syne', system-ui, sans-serif" },
        body: { value: "'Plus Jakarta Sans', system-ui, sans-serif" },
        mono: { value: "'JetBrains Mono', monospace" },
      },
    },
    semanticTokens: {
      colors: {
        // Surface palette — auto-switches dark/light
        "bg.canvas": {
          value: { base: "#eff3ff", _dark: "#04070e" },
        },
        "bg.alt": {
          value: { base: "#e6ecff", _dark: "#070c18" },
        },
        "surface.1": {
          value: { base: "#ffffff", _dark: "#0a1020" },
        },
        "surface.2": {
          value: { base: "#f5f8ff", _dark: "#0e1628" },
        },
        "surface.3": {
          value: { base: "#eaefff", _dark: "#131d32" },
        },
        "border.1": {
          value: { base: "#d0daff", _dark: "#1a2540" },
        },
        "border.2": {
          value: { base: "#b8c6f0", _dark: "#233050" },
        },
        "text.primary": {
          value: { base: "#020c28", _dark: "#dce8ff" },
        },
        "text.secondary": {
          value: { base: "#3a507a", _dark: "#7a96c8" },
        },
        "text.muted": {
          value: { base: "#7288b8", _dark: "#445070" },
        },
        // Status tokens — same in both modes
        "status.breach": {
          value: { base: "#dc2626", _dark: "#dc2626" },
        },
        "status.nearBreach": {
          value: { base: "#e09a00", _dark: "#e09a00" },
        },
        "status.onTrack": {
          value: { base: "#059669", _dark: "#059669" },
        },
        "status.info": {
          value: { base: "#2563eb", _dark: "#2563eb" },
        },
        "status.insight": {
          value: { base: "#7c3aed", _dark: "#7c3aed" },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
