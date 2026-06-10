export async function slide06(presentation, ctx) {
  const slide = presentation.slides.add();
  slide.background = { fill: "#faf8f5" };

  // Kicker
  slide.addText("COMPONENT ARCHITECTURE", {
    x: 80, y: 60, w: 360, h: 24,
    fontSize: 13, fontFamily: "Segoe UI", bold: true,
    color: "#e07b5a", letterSpacing: "0.15em",
  });

  // Title
  slide.addText("组件树从 App 到叶子的分层清晰，每个模块职责单一。", {
    x: 80, y: 92, w: 1000, h: 50,
    fontSize: 32, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
  });

  // Component tree diagram - horizontal layered approach
  const drawBox = (x, y, w, h, label, fill, textColor = "#ffffff", fontSz = 12) => {
    slide.addShape("rect", { x, y, w, h, fill, borderRadius: 4 });
    slide.addText(label, {
      x, y, w, h, fontSize: fontSz, fontFamily: "Segoe UI", bold: true, color: textColor,
      align: "center", vertical: "middle",
    });
  };

  const drawConnector = (x1, y1, x2, y2) => {
    // Vertical then horizontal
    const midY = (y1 + y2) / 2;
    slide.addShape("rect", { x: x1 - 1, y: y1 + 36, w: 2, h: midY - y1 - 36, fill: "#b0b0c8" });
    slide.addShape("rect", { x: x1 - 1, y: midY - 1, w: x2 - x1, h: 2, fill: "#b0b0c8" });
    slide.addShape("rect", { x: x2 - 1, y: midY - 1, w: 2, h: y2 - midY, fill: "#b0b0c8" });
  };

  // Root level
  drawBox(500, 170, 280, 44, "App", "#1a1a2e", "#ffffff", 16);

  // Level 1: Main sections
  const l1y = 250;
  drawBox(140, l1y, 280, 44, "Sidebar", "#4a7c96");
  drawBox(500, l1y, 280, 44, "Editor", "#4a7c96");
  drawBox(860, l1y, 280, 44, "TestPanel", "#8b9d83");

  // Level 2: Sidebar children
  const l2y = 340;
  drawBox(80, l2y, 160, 38, "NoteList", "#e07b5a");
  drawBox(255, l2y, 160, 38, "SearchInput", "#e07b5a");
  drawBox(430, l2y, 160, 38, "ThemeToggle", "#8b9d83");

  // Level 2: Editor children
  drawBox(460, l2y + 60, 160, 38, "ContentArea", "#e07b5a");
  drawBox(635, l2y + 60, 160, 38, "TitleInput", "#e07b5a");
  drawBox(810, l2y + 60, 160, 38, "StatusBar", "#8b9d83");

  // Level 3: Sidebar leaf
  drawBox(80, l2y + 80, 160, 38, "NoteItem", "#f0ede8", "#3d3d4f");
  drawBox(430, l2y + 80, 160, 38, "SidebarHeader", "#f0ede8", "#3d3d4f");

  // Connectors
  drawConnector(640, 214, 280, 250);
  drawConnector(640, 214, 640, 250);
  drawConnector(640, 214, 1000, 250);

  // Right side: Hooks layer
  slide.addText("自定义 Hooks", {
    x: 880, y: 460, w: 200, h: 28,
    fontSize: 16, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
  });

  const hooks = [
    { name: "useNotes", desc: "笔记 CRUD + 持久化", color: "#4a7c96" },
    { name: "useKeyboard", desc: "全局快捷键", color: "#4a7c96" },
    { name: "useSearch", desc: "搜索过滤", color: "#8b9d83" },
    { name: "useTheme", desc: "主题切换", color: "#8b9d83" },
  ];

  let hy = 500;
  for (const h of hooks) {
    slide.addShape("rect", {
      x: 880, y: hy, w: 320, h: 32,
      fill: h.color, borderRadius: 4,
    });
    slide.addText(h.name, {
      x: 880, y: hy, w: 140, h: 32,
      fontSize: 12, fontFamily: "Consolas", bold: true, color: "#ffffff",
      align: "center", vertical: "middle",
    });
    slide.addText(h.desc, {
      x: 1020, y: hy, w: 180, h: 32,
      fontSize: 11, fontFamily: "Segoe UI", color: "#ffffff",
      vertical: "middle",
    });
    hy += 40;
  }

  // Footer
  slide.addText("笔记 · Notes", { x: 80, y: 680, w: 200, h: 20, fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0" });
  slide.addText("06", { x: 1200, y: 680, w: 40, h: 20, fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0", align: "right" });

  return slide;
}
