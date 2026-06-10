// Build 10-slide PPTX for 笔记 (Notes) desktop app
// Using pptxgenjs from the runtime

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const PptxGenJS = require("pptxgenjs");
import fs from "node:fs";
import path from "node:path";

const SLIDE_W = 13.333;
const SLIDE_H = 7.5;

const PALETTE = {
  warmWhite: "FAF8F5",
  darkInk: "1A1A2E",
  terracotta: "E07B5A",
  dustyBlue: "4A7C96",
  sageGreen: "8B9D83",
  lightGray: "F0EDE8",
  darkSurface: "2A2A3E",
  bodyText: "3D3D4F",
  mutedText: "6B6B80",
  footerText: "9E9EB0",
  lightMuted: "B0B0C8",
  white: "FFFFFF",
  borderLight: "E8E3DB",
  borderMid: "E0DCD5",
};

const PPT = PptxGenJS;
const pptx = new PPT();
pptx.defineLayout({ name: "CUSTOM", width: SLIDE_W, height: SLIDE_H });
pptx.layout = "CUSTOM";

// Helpers
function addFooter(slide, num) {
  slide.addText("笔记 · Notes", {
    x: 0.83, y: 7.08, w: 2, h: 0.21,
    fontSize: 9, fontFace: "Segoe UI", color: PALETTE.footerText,
  });
  slide.addText(String(num).padStart(2, "0"), {
    x: 12.5, y: 7.08, w: 0.42, h: 0.21,
    fontSize: 9, fontFace: "Segoe UI", color: PALETTE.footerText,
    align: "right",
  });
}

function addKicker(slide, text, x, y) {
  slide.addText(text, {
    x: x || 0.83, y: y || 0.62, w: 4, h: 0.25,
    fontSize: 11, fontFace: "Segoe UI", bold: true,
    color: PALETTE.terracotta, charSpacing: 2,
  });
}

function addTitle(slide, text, x, y, w) {
  slide.addText(text, {
    x: x || 0.83, y: y || 0.95, w: w || 10.5, h: 0.55,
    fontSize: 30, fontFace: "Segoe UI", bold: true,
    color: PALETTE.darkInk, lineSpacingMultiple: 1.1,
  });
}

function rect(slide, opts) {
  return slide.addShape("roundRect" || "rect", opts);
}

// =====================================================
// SLIDE 1: Cover
// =====================================================
(function() {
  const s = pptx.addSlide();
  s.background = { fill: PALETTE.darkInk };

  s.addText("笔记", {
    x: 4.58, y: 1.8, w: 4.17, h: 0.85,
    fontSize: 56, fontFace: "Segoe UI", bold: true,
    color: PALETTE.white, align: "center",
  });

  s.addShape("rect", {
    x: 5.63, y: 3.05, w: 2.08, h: 0.022,
    fill: { color: PALETTE.terracotta },
  });

  s.addText("简洁的桌面笔记应用", {
    x: 3.54, y: 3.3, w: 6.25, h: 0.46,
    fontSize: 20, fontFace: "Segoe UI", color: PALETTE.lightMuted,
    align: "center",
  });

  s.addText("Product Design × Technical Architecture", {
    x: 3.54, y: 3.9, w: 6.25, h: 0.38,
    fontSize: 14, fontFace: "Segoe UI", color: "6B6B80",
    align: "center",
  });

  s.addShape("roundRect", {
    x: 5.73, y: 4.6, w: 1.67, h: 0.35,
    fill: { color: PALETTE.darkInk },
    line: { color: PALETTE.terracotta, width: 1 },
    rectRadius: 0.04,
  });
  s.addText("v1.0.0", {
    x: 5.73, y: 4.6, w: 1.67, h: 0.35,
    fontSize: 12, fontFace: "Segoe UI", color: PALETTE.terracotta,
    align: "center", valign: "middle",
  });

  s.addText("Electron · React · TypeScript · Markdown", {
    x: 3.54, y: 6.46, w: 6.25, h: 0.25,
    fontSize: 11, fontFace: "Segoe UI", color: "4A4A5E",
    align: "center",
  });

  console.log("Slide 1: Cover done");
})();

// =====================================================
// SLIDE 2: Product Overview
// =====================================================
(function() {
  const s = pptx.addSlide();
  s.background = { fill: PALETTE.warmWhite };

  addKicker(s, "PRODUCT OVERVIEW");
  addTitle(s, "双栏架构将导航与编辑解耦，让聚焦成为默认状态。");

  s.addText("核心交互模式", {
    x: 0.83, y: 1.85, w: 5, h: 0.3,
    fontSize: 18, fontFace: "Segoe UI", bold: true, color: PALETTE.darkInk,
  });

  const features = [
    { label: "侧边栏", desc: "笔记列表、搜索、暗色/亮色主题切换" },
    { label: "编辑器", desc: "实时 Markdown 高亮，标题与正文分离" },
    { label: "快捷键", desc: "Ctrl+N 新建，Ctrl+T 切换主题" },
    { label: "持久化", desc: "localStorage 自动保存，无服务端依赖" },
  ];

  let fy = 2.3;
  for (const f of features) {
    s.addText(f.label, {
      x: 0.83, y: fy, w: 1.25, h: 0.28,
      fontSize: 14, fontFace: "Segoe UI", bold: true, color: PALETTE.dustyBlue,
    });
    s.addText(f.desc, {
      x: 2.17, y: fy, w: 3.67, h: 0.28,
      fontSize: 14, fontFace: "Segoe UI", color: PALETTE.bodyText,
    });
    fy += 0.46;
  }

  // Right column - layout diagram container
  s.addShape("roundRect", {
    x: 6.25, y: 1.85, w: 6.25, h: 4.8,
    fill: { color: PALETTE.lightGray },
    rectRadius: 0.08,
  });

  // Sidebar
  s.addShape("roundRect", {
    x: 6.46, y: 2.05, w: 2.3, h: 4.38,
    fill: { color: PALETTE.white },
    line: { color: PALETTE.borderMid, width: 0.5 },
    rectRadius: 0.04,
  });
  s.addText("Sidebar", {
    x: 6.67, y: 2.1, w: 1.88, h: 0.25,
    fontSize: 11, fontFace: "Segoe UI", bold: true, color: PALETTE.mutedText,
  });

  const sidebarItems = ["搜索框", "新建按钮", "笔记列表", "主题切换"];
  let sy = 2.55;
  for (const item of sidebarItems) {
    s.addShape("roundRect", {
      x: 6.62, y: sy, w: 1.96, h: 0.32,
      fill: { color: PALETTE.lightGray },
      rectRadius: 0.03,
    });
    s.addText(item, {
      x: 6.62, y: sy, w: 1.96, h: 0.32,
      fontSize: 10, fontFace: "Segoe UI", color: PALETTE.bodyText,
      align: "center", valign: "middle",
    });
    sy += 0.42;
  }

  // Editor
  s.addShape("roundRect", {
    x: 8.96, y: 2.05, w: 3.33, h: 4.38,
    fill: { color: PALETTE.white },
    line: { color: PALETTE.borderMid, width: 0.5 },
    rectRadius: 0.04,
  });
  s.addText("Editor", {
    x: 9.17, y: 2.1, w: 2.92, h: 0.25,
    fontSize: 11, fontFace: "Segoe UI", bold: true, color: PALETTE.mutedText,
  });

  s.addShape("roundRect", {
    x: 9.12, y: 2.55, w: 3.0, h: 0.42,
    fill: { color: PALETTE.lightGray },
    rectRadius: 0.03,
  });
  s.addText("标题输入", {
    x: 9.12, y: 2.55, w: 3.0, h: 0.42,
    fontSize: 10, fontFace: "Segoe UI", color: PALETTE.bodyText,
    align: "center", valign: "middle",
  });

  s.addShape("roundRect", {
    x: 9.12, y: 3.15, w: 3.0, h: 2.1,
    fill: { color: PALETTE.warmWhite },
    line: { color: PALETTE.borderLight, width: 0.5 },
    rectRadius: 0.03,
  });
  s.addText("正文编辑区\n（Markdown 实时高亮）", {
    x: 9.12, y: 3.15, w: 3.0, h: 2.1,
    fontSize: 10, fontFace: "Segoe UI", color: PALETTE.bodyText,
    align: "center", valign: "middle",
  });

  s.addShape("roundRect", {
    x: 9.12, y: 5.38, w: 3.0, h: 0.25,
    fill: { color: PALETTE.lightGray },
    rectRadius: 0.03,
  });
  s.addText("状态栏", {
    x: 9.12, y: 5.38, w: 3.0, h: 0.25,
    fontSize: 9, fontFace: "Segoe UI", color: PALETTE.mutedText,
    align: "center", valign: "middle",
  });

  addFooter(s, 2);
  console.log("Slide 2: Product Overview done");
})();

// =====================================================
// SLIDE 3: Design System
// =====================================================
(function() {
  const s = pptx.addSlide();
  s.background = { fill: PALETTE.warmWhite };

  addKicker(s, "DESIGN SYSTEM");
  addTitle(s, "明暗双主题 + 零依赖Markdown渲染，用克制而非功能取胜。");

  // Left: Light theme preview
  s.addShape("roundRect", {
    x: 0.83, y: 1.85, w: 5.0, h: 4.5,
    fill: { color: PALETTE.white },
    line: { color: PALETTE.borderLight, width: 0.5 },
    rectRadius: 0.06,
  });
  s.addText("Light Theme", {
    x: 1.04, y: 1.95, w: 4.58, h: 0.25,
    fontSize: 11, fontFace: "Segoe UI", bold: true, color: PALETTE.mutedText,
  });
  // Mini sidebar mock
  s.addShape("roundRect", {
    x: 1.04, y: 2.35, w: 2.0, h: 3.5,
    fill: { color: PALETTE.lightGray },
    rectRadius: 0.03,
  });
  s.addShape("roundRect", {
    x: 3.2, y: 2.35, w: 2.42, h: 1.5,
    fill: { color: PALETTE.warmWhite },
    line: { color: PALETTE.borderLight, width: 0.5 },
    rectRadius: 0.03,
  });
  s.addShape("roundRect", {
    x: 3.2, y: 3.95, w: 2.42, h: 1.9,
    fill: { color: PALETTE.warmWhite },
    line: { color: PALETTE.borderLight, width: 0.5 },
    rectRadius: 0.03,
  });
  s.addText("Markdown\n编辑区", {
    x: 3.2, y: 3.95, w: 2.42, h: 1.9,
    fontSize: 10, fontFace: "Segoe UI", color: PALETTE.mutedText,
    align: "center", valign: "middle",
  });

  // Right: Dark theme preview
  s.addShape("roundRect", {
    x: 6.25, y: 1.85, w: 5.0, h: 4.5,
    fill: { color: PALETTE.darkInk },
    line: { color: "3A3A4E", width: 0.5 },
    rectRadius: 0.06,
  });
  s.addText("Dark Theme", {
    x: 6.46, y: 1.95, w: 4.58, h: 0.25,
    fontSize: 11, fontFace: "Segoe UI", bold: true, color: PALETTE.lightMuted,
  });
  // Mini sidebar mock
  s.addShape("roundRect", {
    x: 6.46, y: 2.35, w: 2.0, h: 3.5,
    fill: { color: PALETTE.darkSurface },
    rectRadius: 0.03,
  });
  s.addShape("roundRect", {
    x: 8.62, y: 2.35, w: 2.42, h: 1.5,
    fill: { color: PALETTE.darkSurface },
    line: { color: "3A3A4E", width: 0.5 },
    rectRadius: 0.03,
  });
  s.addShape("roundRect", {
    x: 8.62, y: 3.95, w: 2.42, h: 1.9,
    fill: { color: PALETTE.darkSurface },
    line: { color: "3A3A4E", width: 0.5 },
    rectRadius: 0.03,
  });
  s.addText("Markdown\n编辑区", {
    x: 8.62, y: 3.95, w: 2.42, h: 1.9,
    fontSize: 10, fontFace: "Segoe UI", color: PALETTE.mutedText,
    align: "center", valign: "middle",
  });

  // Labels
  s.addText("🌙", {
    x: 11.5, y: 2.0, w: 0.4, h: 0.3,
    fontSize: 14, align: "center",
  });
  s.addText("☀", {
    x: 6.0, y: 2.0, w: 0.4, h: 0.3,
    fontSize: 14, align: "center",
  });

  // Design token table below
  s.addText("设计令牌", {
    x: 0.83, y: 6.55, w: 2, h: 0.28,
    fontSize: 14, fontFace: "Segoe UI", bold: true, color: PALETTE.darkInk,
  });

  const tokens = [
    { name: "Warm White BG", color: "FAF8F5", swatch: PALETTE.warmWhite },
    { name: "Dark Ink", color: "1A1A2E", swatch: PALETTE.darkInk },
    { name: "Terracotta", color: "E07B5A", swatch: PALETTE.terracotta },
    { name: "Dusty Blue", color: "4A7C96", swatch: PALETTE.dustyBlue },
    { name: "Sage Green", color: "8B9D83", swatch: PALETTE.sageGreen },
  ];

  let tx = 0.83;
  for (const tok of tokens) {
    s.addShape("roundRect", {
      x: tx, y: 6.85, w: 0.29, h: 0.21,
      fill: { color: tok.swatch },
      line: { color: PALETTE.borderLight, width: 0.3 },
      rectRadius: 0.02,
    });
    s.addText(tok.color, {
      x: tx + 0.35, y: 6.85, w: 1.15, h: 0.21,
      fontSize: 8, fontFace: "Consolas", color: PALETTE.mutedText,
      valign: "middle",
    });
    s.addText(tok.name, {
      x: tx, y: 6.62, w: 1.5, h: 0.18,
      fontSize: 8, fontFace: "Segoe UI", color: PALETTE.mutedText,
    });
    tx += 1.85;
  }

  addFooter(s, 3);
  console.log("Slide 3: Design System done");
})();

// =====================================================
// SLIDE 4: Editing Experience
// =====================================================
(function() {
  const s = pptx.addSlide();
  s.background = { fill: PALETTE.warmWhite };

  addKicker(s, "EDITING EXPERIENCE");
  addTitle(s, "编辑即预览：实时Markdown语法高亮让写作和阅读合为一体。");

  // Editor mockup
  s.addShape("roundRect", {
    x: 0.83, y: 1.85, w: 7.5, h: 4.8,
    fill: { color: PALETTE.white },
    line: { color: PALETTE.borderMid, width: 0.5 },
    rectRadius: 0.06,
  });

  // Title field
  s.addShape("roundRect", {
    x: 1.04, y: 2.0, w: 7.08, h: 0.42,
    fill: { color: PALETTE.lightGray },
    rectRadius: 0.03,
  });
  s.addText("我的第一篇笔记", {
    x: 1.14, y: 2.0, w: 6.88, h: 0.42,
    fontSize: 14, fontFace: "Segoe UI", bold: true, color: PALETTE.bodyText,
    valign: "middle",
  });

  // Markdown content with syntax highlighting illustration
  s.addText(
    "# 欢迎使用笔记\n\n" +
    "这是一个 **Markdown** 编辑器。\n\n" +
    "- 支持 **粗体** 和 *斜体*\n" +
    "- 支持 `行内代码`\n" +
    "- 支持 [链接](https://example.com)\n" +
    "- 支持 > 引用块\n\n" +
    "```js\n" +
    "const note = createNote({\n" +
    "  title: \"Hello\",\n" +
    "  content: \"World\"\n" +
    "})\n" +
    "```",
    {
      x: 1.04, y: 2.6, w: 7.08, h: 3.8,
      fontSize: 13, fontFace: "Consolas", color: PALETTE.bodyText,
      lineSpacingMultiple: 1.3, valign: "top",
    }
  );

  // Right column - callouts
  s.addText("关键特性", {
    x: 8.75, y: 1.85, w: 3.75, h: 0.3,
    fontSize: 16, fontFace: "Segoe UI", bold: true, color: PALETTE.darkInk,
  });

  const callouts = [
    { title: "实时高亮", desc: "输入时即时反馈语法结构" },
    { title: "零依赖", desc: "自研 Markdown 渲染器，约300行" },
    { title: "块级解析", desc: "标题、代码块、引用、列表独立处理" },
    { title: "行内解析", desc: "粗体、斜体、代码、链接并行解析" },
    { title: "代码着色", desc: "基于关键字的内置语法高亮" },
  ];

  let cy = 2.35;
  for (const c of callouts) {
    // Accent dot
    s.addShape("ellipse", {
      x: 8.75, y: cy + 0.08, w: 0.12, h: 0.12,
      fill: { color: PALETTE.terracotta },
    });
    s.addText(c.title, {
      x: 8.98, y: cy, w: 3.52, h: 0.22,
      fontSize: 13, fontFace: "Segoe UI", bold: true, color: PALETTE.dustyBlue,
    });
    s.addText(c.desc, {
      x: 8.98, y: cy + 0.22, w: 3.52, h: 0.2,
      fontSize: 11, fontFace: "Segoe UI", color: PALETTE.mutedText,
    });
    cy += 0.58;
  }

  addFooter(s, 4);
  console.log("Slide 4: Editing Experience done");
})();

// =====================================================
// SLIDE 5: Data Flow & State
// =====================================================
(function() {
  const s = pptx.addSlide();
  s.background = { fill: PALETTE.warmWhite };

  addKicker(s, "DATA FLOW & STATE");
  addTitle(s, "useReducer + Context 的单向数据流，让状态变化可追踪。");

  // Architecture diagram boxes
  function addBox(slide, label, sub, x, y, w, h, fill, textColor) {
    slide.addShape("roundRect", {
      x, y, w, h,
      fill: { color: fill },
      rectRadius: 0.04,
    });
    slide.addText(label, {
      x, y, w, h,
      fontSize: 12, fontFace: "Segoe UI", bold: true, color: textColor || PALETTE.white,
      align: "center", valign: "middle",
    });
  }

  function addArrow(slide, x1, y1, x2, y2) {
    slide.addText("→", {
      x: x1, y: y1, w: x2 - x1 + 0.2, h: 0.4,
      fontSize: 16, color: PALETTE.footerText,
      align: "center", valign: "middle",
    });
  }

  function addVArrow(slide, x, y1, y2) {
    slide.addText("↓", {
      x: x - 0.15, y: y1, w: 0.3, h: y2 - y1,
      fontSize: 14, color: PALETTE.footerText,
      align: "center", valign: "middle",
    });
  }

  // Top: user actions
  addBox(s, "Actions (dispatch)", null, 3.54, 1.8, 6.25, 0.46, PALETTE.terracotta);
  s.addText("SET_NOTES  ADD_NOTE  UPDATE_NOTE  DELETE_NOTE  SELECT_NOTE  SET_SEARCH_QUERY", {
    x: 3.54, y: 2.3, w: 6.25, h: 0.22,
    fontSize: 9, fontFace: "Consolas", color: PALETTE.mutedText, align: "center",
  });

  // Arrow down
  addVArrow(s, 6.67, 2.55, 2.95);

  // Middle: useReducer
  addBox(s, "useReducer (notesReducer)", null, 3.54, 3.05, 6.25, 0.46, PALETTE.dustyBlue);

  // Arrow down
  addVArrow(s, 6.67, 3.5, 3.9);

  // State
  addBox(s, "NotesState", null, 3.54, 4.0, 6.25, 0.46, PALETTE.darkInk);
  s.addText("{ notes, selectedId, searchQuery, showTestPanel }", {
    x: 2.5, y: 4.5, w: 8.33, h: 0.22,
    fontSize: 11, fontFace: "Consolas", color: PALETTE.mutedText, align: "center",
  });

  // Context Provider
  addBox(s, "NotesContext.Provider", null, 1.25, 3.05, 2.08, 0.46, PALETTE.sageGreen);

  // Consumers
  addBox(s, "useNotes()", null, 0.83, 3.8, 2.5, 0.36, PALETTE.darkSurface);
  addBox(s, "useNotesContext()", null, 0.83, 4.3, 2.5, 0.36, PALETTE.darkSurface);

  // Storage
  addBox(s, "localStorage", "自动序列化/反序列化", 0.83, 5.2, 2.9, 0.46, PALETTE.lightGray, PALETTE.bodyText);

  // Labels
  s.addText("用户操作", {
    x: 10.1, y: 2.1, w: 2, h: 0.2,
    fontSize: 12, fontFace: "Segoe UI", bold: true, color: PALETTE.terracotta,
  });
  s.addText("状态机", {
    x: 10.1, y: 3.05, w: 2, h: 0.2,
    fontSize: 12, fontFace: "Segoe UI", bold: true, color: PALETTE.dustyBlue,
  });
  s.addText("全局共享", {
    x: 0.4, y: 3.05, w: 1.5, h: 0.2,
    fontSize: 10, fontFace: "Segoe UI", bold: true, color: PALETTE.sageGreen,
  });
  s.addText("持久化", {
    x: 0.4, y: 5.1, w: 1.3, h: 0.2,
    fontSize: 10, fontFace: "Segoe UI", bold: true, color: PALETTE.mutedText,
  });

  // Arrow from state to provider
  addArrow(s, 3.5, 4.0, 1.3, 3.3);

  addFooter(s, 5);
  console.log("Slide 5: Data Flow done");
})();

// =====================================================
// SLIDE 6: Component Architecture
// =====================================================
(function() {
  const s = pptx.addSlide();
  s.background = { fill: PALETTE.warmWhite };

  addKicker(s, "COMPONENT ARCHITECTURE");
  addTitle(s, "组件树从App到叶子的分层清晰，每个模块职责单一。");

  // Component tree
  function addComp(slide, label, x, y, w, fill, textColor) {
    slide.addShape("roundRect", {
      x, y, w, h: 0.38,
      fill: { color: fill },
      rectRadius: 0.04,
    });
    slide.addText(label, {
      x, y, w, h: 0.38,
      fontSize: 11, fontFace: "Segoe UI", bold: true, color: textColor || PALETTE.white,
      align: "center", valign: "middle",
    });
  }

  function addLeaf(slide, label, x, y, w, fill) {
    slide.addShape("roundRect", {
      x, y, w, h: 0.32,
      fill: { color: fill },
      line: { color: PALETTE.borderLight, width: 0.5 },
      rectRadius: 0.03,
    });
    slide.addText(label, {
      x, y, w, h: 0.32,
      fontSize: 9, fontFace: "Segoe UI", color: PALETTE.bodyText,
      align: "center", valign: "middle",
    });
  }

  // Root
  addComp(s, "App (NotesProvider + Layout)", 3.54, 1.85, 6.25, PALETTE.darkInk);

  // Level 1
  addComp(s, "Sidebar", 0.83, 2.8, 5.0, PALETTE.dustyBlue);
  addComp(s, "Editor", 6.25, 2.8, 3.75, PALETTE.dustyBlue);
  addComp(s, "TestPanel", 10.42, 2.8, 2.5, PALETTE.dustyBlue);

  // Level 2 - Sidebar children
  addLeaf(s, "SearchBar", 0.83, 3.65, 2.29, PALETTE.lightGray);
  addLeaf(s, "NoteList", 3.33, 3.65, 2.29, PALETTE.lightGray);

  // Level 2 - Editor children
  addLeaf(s, "TitleInput", 6.25, 3.65, 2.08, PALETTE.lightGray);
  addLeaf(s, "MarkdownEditor", 8.54, 3.65, 2.5, PALETTE.lightGray);

  // Level 2 - TestPanel children (none shown)

  // Hooks section
  s.addText("自定义 Hooks", {
    x: 0.83, y: 4.5, w: 3, h: 0.3,
    fontSize: 16, fontFace: "Segoe UI", bold: true, color: PALETTE.darkInk,
  });

  const hooks = [
    { name: "useNotes", role: "笔记 CRUD 操作 + 列表查询" },
    { name: "useNotesContext", role: "访问全局状态" },
    { name: "useKeyboard", role: "全局快捷键绑定" },
    { name: "useSearch", role: "搜索过滤逻辑" },
    { name: "useTheme", role: "主题切换 + 持久化" },
    { name: "useEditorSync", role: "编辑器与状态同步" },
  ];

  let hx = 0.83;
  let hy = 4.95;
  let col = 0;
  for (const hook of hooks) {
    s.addShape("roundRect", {
      x: hx, y: hy, w: 3.75, h: 0.52,
      fill: { color: PALETTE.lightGray },
      rectRadius: 0.04,
    });
    s.addText(hook.name + "()", {
      x: hx + 0.15, y: hy, w: 3.45, h: 0.28,
      fontSize: 12, fontFace: "Consolas", bold: true, color: PALETTE.terracotta,
      valign: "bottom",
    });
    s.addText(hook.role, {
      x: hx + 0.15, y: hy + 0.28, w: 3.45, h: 0.2,
      fontSize: 9, fontFace: "Segoe UI", color: PALETTE.mutedText,
      valign: "top",
    });

    col++;
    if (col % 2 === 0) {
      hx = 0.83;
      hy += 0.62;
    } else {
      hx = 6.67;
    }
  }

  addFooter(s, 6);
  console.log("Slide 6: Component Architecture done");
})();

// =====================================================
// SLIDE 7: Technology Stack
// =====================================================
(function() {
  const s = pptx.addSlide();
  s.background = { fill: PALETTE.warmWhite };

  addKicker(s, "TECHNOLOGY STACK");
  addTitle(s, "Electron + React + TypeScript + Vite，现代桌面应用技术栈。");

  // Three-tier layers
  const layers = [
    {
      label: "Electron Shell",
      items: ["Main Process  (electron/main.ts)", "Native Menus", "File I/O  (IPC Handlers)", "Window Management"],
      color: PALETTE.darkInk,
    },
    {
      label: "React Renderer",
      items: ["React 18 + TypeScript", "Vite  (electron-vite)", "CSS Variables + Classnames", "Custom Hooks"],
      color: PALETTE.dustyBlue,
    },
    {
      label: "Core Libraries",
      items: ["Markdown Parser  (~300 lines)", "Syntax Highlighter", "Notes CRUD Logic", "localStorage Adapter"],
      color: PALETTE.sageGreen,
    },
  ];

  let ly = 1.85;
  for (const layer of layers) {
    // Layer header
    s.addShape("roundRect", {
      x: 0.83, y: ly, w: 3.33, h: 0.4,
      fill: { color: layer.color },
      rectRadius: 0.04,
    });
    s.addText(layer.label, {
      x: 0.83, y: ly, w: 3.33, h: 0.4,
      fontSize: 14, fontFace: "Segoe UI", bold: true, color: PALETTE.white,
      align: "center", valign: "middle",
    });

    // Items
    let iy = ly;
    let ix = 4.38;
    let first = true;
    for (const item of layer.items) {
      s.addShape("roundRect", {
        x: ix, y: iy, w: 4.17, h: 0.4,
        fill: { color: PALETTE.lightGray },
        rectRadius: first ? 0.03 : 0.03,
      });
      s.addText(item, {
        x: ix + 0.2, y: iy, w: 3.77, h: 0.4,
        fontSize: 12, fontFace: "Consolas", color: PALETTE.bodyText,
        valign: "middle",
      });
      iy += 0.53;
      first = false;
    }

    s.addShape("roundRect", {
      x: 8.75, y: ly, w: 0.04, h: iy - ly,
      fill: { color: layer.color },
    });

    ly = iy + 0.15;
  }

  addFooter(s, 7);
  console.log("Slide 7: Technology Stack done");
})();

// =====================================================
// SLIDE 8: Core Libraries — Markdown Parser
// =====================================================
(function() {
  const s = pptx.addSlide();
  s.background = { fill: PALETTE.warmWhite };

  addKicker(s, "CORE LIBRARIES");
  addTitle(s, "零外部Markdown依赖的自研渲染器是项目的技术脊梁。");

  // Parser pipeline
  function addPipeStep(slide, label, x, y) {
    slide.addShape("roundRect", {
      x, y, w: 2.08, h: 0.42,
      fill: { color: PALETTE.dustyBlue },
      rectRadius: 0.04,
    });
    slide.addText(label, {
      x, y, w: 2.08, h: 0.42,
      fontSize: 11, fontFace: "Segoe UI", bold: true, color: PALETTE.white,
      align: "center", valign: "middle",
    });
  }

  addPipeStep(s, "Raw Markdown", 0.83, 1.85);
  s.addText("→", { x: 2.95, y: 1.85, w: 0.4, h: 0.42, fontSize: 16, color: PALETTE.footerText, align: "center", valign: "middle" });

  addPipeStep(s, "块级解析\n(lines → blocks)", 3.33, 1.85);
  s.addText("→", { x: 5.45, y: 1.85, w: 0.4, h: 0.42, fontSize: 16, color: PALETTE.footerText, align: "center", valign: "middle" });

  addPipeStep(s, "行内解析\n(inline tokens)", 5.83, 1.85);
  s.addText("→", { x: 7.95, y: 1.85, w: 0.4, h: 0.42, fontSize: 16, color: PALETTE.footerText, align: "center", valign: "middle" });

  addPipeStep(s, "HTML 生成", 8.33, 1.85);
  s.addText("→", { x: 10.45, y: 1.85, w: 0.4, h: 0.42, fontSize: 16, color: PALETTE.footerText, align: "center", valign: "middle" });

  addPipeStep(s, "语法高亮", 10.83, 1.85);

  // Markdown syntax support table
  s.addText("Markdown 语法支持矩阵", {
    x: 0.83, y: 2.7, w: 4, h: 0.3,
    fontSize: 16, fontFace: "Segoe UI", bold: true, color: PALETTE.darkInk,
  });

  const syntaxRows = [
    { syntax: "# H1 ~ ###### H6", type: "标题", support: "✓" },
    { syntax: "**粗体**", type: "粗体", support: "✓" },
    { syntax: "*斜体*", type: "斜体", support: "✓" },
    { syntax: "`行内代码`", type: "行内代码", support: "✓" },
    { syntax: "```代码块```", type: "围栏代码块", support: "✓" },
    { syntax: "> 引用", type: "引用块", support: "✓" },
    { syntax: "- 无序列表", type: "无序列表", support: "✓" },
    { syntax: "1. 有序列表", type: "有序列表", support: "✓" },
    { syntax: "[链接](url)", type: "链接", support: "✓" },
    { syntax: "--- 分割线", type: "水平线", support: "✓" },
  ];

  // Table header
  const thX = [0.83, 5.83, 9.17];
  const thW = [5.0, 3.33, 1.67];
  const headers = ["语法", "类型", "支持"];

  for (let i = 0; i < 3; i++) {
    s.addShape("roundRect", {
      x: thX[i], y: 3.1, w: thW[i], h: 0.32,
      fill: { color: PALETTE.darkInk },
      rectRadius: (i === 0 ? 0.04 : 0) + (i === 2 ? 0.04 : 0),
    });
    s.addText(headers[i], {
      x: thX[i], y: 3.1, w: thW[i], h: 0.32,
      fontSize: 10, fontFace: "Segoe UI", bold: true, color: PALETTE.white,
      align: "center", valign: "middle",
    });
  }

  for (let r = 0; r < syntaxRows.length; r++) {
    const row = syntaxRows[r];
    const bg = r % 2 === 0 ? PALETTE.lightGray : PALETTE.warmWhite;

    for (let c = 0; c < 3; c++) {
      const vals = [row.syntax, row.type, row.support];
      s.addShape("rect", {
        x: thX[c], y: 3.42 + r * 0.32, w: thW[c], h: 0.32,
        fill: { color: bg },
      });
      s.addText(vals[c], {
        x: thX[c] + 0.1, y: 3.42 + r * 0.32, w: thW[c] - 0.2, h: 0.32,
        fontSize: 9,
        fontFace: c === 0 ? "Consolas" : "Segoe UI",
        color: c === 0 ? PALETTE.bodyText : PALETTE.mutedText,
        valign: "middle",
      });
    }
  }

  // Stats
  s.addText("约300行 TypeScript", {
    x: 0.83, y: 6.7, w: 3, h: 0.25,
    fontSize: 11, fontFace: "Segoe UI", color: PALETTE.mutedText,
  });
  s.addText("零外部依赖", {
    x: 4.0, y: 6.7, w: 3, h: 0.25,
    fontSize: 11, fontFace: "Segoe UI", color: PALETTE.mutedText,
  });
  s.addText("10种块级元素", {
    x: 7.17, y: 6.7, w: 3, h: 0.25,
    fontSize: 11, fontFace: "Segoe UI", color: PALETTE.mutedText,
  });

  addFooter(s, 8);
  console.log("Slide 8: Core Libraries done");
})();

// =====================================================
// SLIDE 9: IPC & Native Integration
// =====================================================
(function() {
  const s = pptx.addSlide();
  s.background = { fill: PALETTE.warmWhite };

  addKicker(s, "IPC & NATIVE INTEGRATION");
  addTitle(s, "主进程负责文件系统和原生菜单，渲染进程专注UI。");

  // Two-panel layout: Main Process + Renderer Process
  function addPanel(slide, label, x, y, w, h, fill) {
    slide.addShape("roundRect", {
      x, y, w, h,
      fill: { color: fill === PALETTE.warmWhite ? PALETTE.lightGray : fill },
      line: { color: PALETTE.borderMid, width: 0.5 },
      rectRadius: 0.06,
    });
    slide.addText(label, {
      x: x + 0.1, y: y + 0.05, w: w - 0.2, h: 0.25,
      fontSize: 12, fontFace: "Segoe UI", bold: true, color: PALETTE.white,
    });
  }

  function addIPCChip(slide, text, x, y, fill) {
    slide.addShape("roundRect", {
      x, y, w: 2.5, h: 0.32,
      fill: { color: fill },
      rectRadius: 0.04,
    });
    slide.addText(text, {
      x, y, w: 2.5, h: 0.32,
      fontSize: 10, fontFace: "Consolas", bold: true, color: PALETTE.white,
      align: "center", valign: "middle",
    });
  }

  function addFeature(slide, icon, title, desc, x, y) {
    slide.addShape("roundRect", {
      x, y, w: 3.12, h: 0.75,
      fill: { color: PALETTE.white },
      line: { color: PALETTE.borderLight, width: 0.5 },
      rectRadius: 0.04,
    });
    slide.addText(icon, {
      x: x + 0.1, y: y + 0.15, w: 0.2, h: 0.2,
      fontSize: 10, align: "center",
    });
    slide.addText(title, {
      x: x + 0.4, y: y + 0.08, w: 2.5, h: 0.22,
      fontSize: 11, fontFace: "Segoe UI", bold: true, color: PALETTE.darkInk,
    });
    slide.addText(desc, {
      x: x + 0.4, y: y + 0.32, w: 2.5, h: 0.18,
      fontSize: 9, fontFace: "Segoe UI", color: PALETTE.mutedText,
    });
  }

  // Main Process panel
  addPanel(s, "Main Process", 0.83, 1.85, 5.83, 4.5, PALETTE.darkInk);

  const mainFeatures = [
    { icon: "🪟", title: "Window Management", desc: "BrowserWindow 创建与生命周期" },
    { icon: "📋", title: "Native Menus", desc: "应用菜单 + 上下文菜单" },
    { icon: "📥", title: "File Import", desc: "从 .md 文件导入笔记" },
    { icon: "📤", title: "File Export", desc: "导出笔记为 .md 文件" },
    { icon: "🔗", title: "IPC Handlers", desc: "ipcMain.handle() 处理请求" },
  ];

  let my = 2.25;
  for (const f of mainFeatures) {
    addFeature(s, f.icon, f.title, f.desc, 0.94, my);
    my += 0.85;
  }

  // Renderer Process panel
  addPanel(s, "Renderer Process", 7.08, 1.85, 5.83, 4.5, PALETTE.dustyBlue);

  const rendererFeatures = [
    { icon: "🖥", title: "React App", desc: "组件树挂载到 DOM" },
    { icon: "📝", title: "Editor Component", desc: "Markdown 编辑与渲染" },
    { icon: "🔄", title: "State Management", desc: "useReducer + Context" },
    { icon: "💾", title: "localStorage Persistence", desc: "自动保存笔记内容" },
    { icon: "📡", title: "IPC Invokers", desc: "ipcRenderer.invoke() 调用主进程" },
  ];

  let ry = 2.25;
  for (const f of rendererFeatures) {
    addFeature(s, f.icon, f.title, f.desc, 7.19, ry);
    ry += 0.85;
  }

  // IPC arrows between panels
  s.addText("IPC\n→\n←", {
    x: 6.5, y: 3.5, w: 0.83, h: 1.5,
    fontSize: 18, color: PALETTE.dustyBlue,
    align: "center", valign: "middle",
    fontFace: "Segoe UI",
  });

  // IPC channel labels at bottom
  addIPCChip(s, "dialogs:openFile", 3.0, 6.6, PALETTE.terracotta);
  addIPCChip(s, "file:exportNote", 7.5, 6.6, PALETTE.terracotta);

  addFooter(s, 9);
  console.log("Slide 9: IPC done");
})();

// =====================================================
// SLIDE 10: Testing & Quality
// =====================================================
(function() {
  const s = pptx.addSlide();
  s.background = { fill: PALETTE.warmWhite };

  addKicker(s, "TESTING & QUALITY");
  addTitle(s, "Vitest + Testing Library 覆盖核心模块和组件行为。", null, null, 11);

  // Test architecture layers
  s.addText("测试架构", {
    x: 0.83, y: 1.85, w: 4, h: 0.3,
    fontSize: 16, fontFace: "Segoe UI", bold: true, color: PALETTE.darkInk,
  });

  const testLayers = [
    { label: "单元测试", items: ["formatters.test.ts", "notes.test.ts", "test-runner.test.ts"], color: PALETTE.dustyBlue, x: 0.83 },
    { label: "组件测试", items: ["components/__tests__"], color: PALETTE.terracotta, x: 4.58 },
    { label: "测试基础设施", items: ["setup.ts", "define-tests.ts"], color: PALETTE.sageGreen, x: 8.33 },
  ];

  for (const layer of testLayers) {
    // Header
    s.addShape("roundRect", {
      x: layer.x, y: 2.25, w: 3.33, h: 0.4,
      fill: { color: layer.color },
      rectRadius: 0.04,
    });
    s.addText(layer.label, {
      x: layer.x, y: 2.25, w: 3.33, h: 0.4,
      fontSize: 13, fontFace: "Segoe UI", bold: true, color: PALETTE.white,
      align: "center", valign: "middle",
    });

    let iy = 2.65;
    for (let i = 0; i < layer.items.length; i++) {
      s.addShape("roundRect", {
        x: layer.x, y: iy, w: 3.33, h: 0.36,
        fill: { color: PALETTE.lightGray },
        rectRadius: 0.03,
      });
      s.addText(layer.items[i], {
        x: layer.x, y: iy, w: 3.33, h: 0.36,
        fontSize: 11, fontFace: "Consolas", color: PALETTE.bodyText,
        align: "center", valign: "middle",
      });
      iy += 0.36;
    }
  }

  // Coverage table
  s.addText("核心测试覆盖", {
    x: 0.83, y: 3.85, w: 4, h: 0.3,
    fontSize: 16, fontFace: "Segoe UI", bold: true, color: PALETTE.darkInk,
  });

  const coverage = [
    { module: "notes.ts", tests: "createNote / updateNote / deleteNote / findNote / getFilteredNotes / sortNotes", focus: "纯函数正确性" },
    { module: "formatters.ts", tests: "日期格式化 / 文本截断 / 字符计数", focus: "边界情况" },
    { module: "test-runner.ts", tests: "测试套件执行 / 结果收集 / 状态报告", focus: "内置测试框架" },
    { module: "组件测试", tests: "渲染验证 / 用户交互 / 状态变化", focus: "行为驱动" },
  ];

  const ctW = [1.67, 5.42, 1.67];
  const ctH = ["模块", "测试用例", "关注点"];
  let cY = 4.25;

  // Header
  let cX = 0.83;
  for (let i = 0; i < 3; i++) {
    s.addShape("roundRect", {
      x: cX, y: cY, w: ctW[i], h: 0.3,
      fill: { color: PALETTE.darkInk },
      rectRadius: 0.03,
    });
    s.addText(ctH[i], {
      x: cX, y: cY, w: ctW[i], h: 0.3,
      fontSize: 10, fontFace: "Segoe UI", bold: true, color: PALETTE.white,
      align: "center", valign: "middle",
    });
    cX += ctW[i];
  }

  for (let r = 0; r < coverage.length; r++) {
    const row = coverage[r];
    const bg = r % 2 === 0 ? PALETTE.lightGray : PALETTE.warmWhite;
    cX = 0.83;

    const vals = [row.module, row.tests, row.focus];
    for (let c = 0; c < 3; c++) {
      s.addShape("rect", {
        x: cX, y: cY + 0.3 + r * 0.34, w: ctW[c], h: 0.34,
        fill: { color: bg },
      });
      s.addText(vals[c], {
        x: cX + 0.08, y: cY + 0.3 + r * 0.34, w: ctW[c] - 0.16, h: 0.34,
        fontSize: 9,
        fontFace: c === 0 ? "Consolas" : "Segoe UI",
        bold: c === 0,
        color: c === 0 ? PALETTE.dustyBlue : PALETTE.bodyText,
        valign: "middle",
      });
      cX += ctW[c];
    }
  }

  // Tool badges
  s.addText("测试工具链", {
    x: 0.83, y: 6.15, w: 3, h: 0.28,
    fontSize: 14, fontFace: "Segoe UI", bold: true, color: PALETTE.darkInk,
  });

  const tools = [
    { name: "Vitest", role: "测试运行器", color: PALETTE.dustyBlue },
    { name: "Testing Library", role: "组件渲染 & 查询", color: PALETTE.terracotta },
    { name: "jsdom", role: "浏览器环境模拟", color: PALETTE.sageGreen },
    { name: "user-event", role: "用户交互模拟", color: PALETTE.mutedText },
  ];

  let bx = 0.83;
  for (const tool of tools) {
    s.addShape("roundRect", {
      x: bx, y: 6.5, w: 2.6, h: 0.38,
      fill: { color: tool.color },
      rectRadius: 0.04,
    });
    s.addText(tool.name, {
      x: bx, y: 6.5, w: 2.6, h: 0.22,
      fontSize: 11, fontFace: "Segoe UI", bold: true, color: PALETTE.white,
      align: "center", valign: "bottom",
    });
    s.addText(tool.role, {
      x: bx, y: 6.72, w: 2.6, h: 0.16,
      fontSize: 8, fontFace: "Segoe UI", color: PALETTE.white,
      align: "center", valign: "top",
    });
    bx += 2.81;
  }

  addFooter(s, 10);
  console.log("Slide 10: Testing done");
})();

// === WRITE OUTPUT ===
const outputPath = "D:\\work\\ai\\Codex\\notes\\outputs\\notes-deck-20260610\\presentations\\notes-intro\\output\\notes-product-design.pptx";
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

await pptx.writeFile({ fileName: outputPath });
console.log("PPTX written to: " + outputPath);
console.log("Total slides: " + pptx.slides.length);

const stat = fs.statSync(outputPath);
console.log("File size: " + (stat.size / 1024).toFixed(1) + " KB");
