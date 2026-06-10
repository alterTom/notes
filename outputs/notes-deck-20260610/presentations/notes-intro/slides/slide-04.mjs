export async function slide04(presentation, ctx) {
  const slide = presentation.slides.add();
  slide.background = { fill: "#faf8f5" };

  // Kicker
  slide.addText("EDITING EXPERIENCE", {
    x: 80, y: 60, w: 300, h: 24,
    fontSize: 13, fontFamily: "Segoe UI", bold: true,
    color: "#e07b5a", letterSpacing: "0.15em",
  });

  // Title
  slide.addText("编辑即预览：实时 Markdown 语法高亮让写作和阅读合为一体。", {
    x: 80, y: 92, w: 960, h: 50,
    fontSize: 32, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
  });

  // Main editor mockup
  slide.addShape("rect", {
    x: 80, y: 170, w: 720, h: 480,
    fill: "#ffffff", borderRadius: 6,
    borderColor: "#e0dcd5", borderWidth: 1,
  });

  // Title area
  slide.addShape("rect", {
    x: 96, y: 186, w: 688, h: 44,
    fill: "#faf8f5", borderRadius: 3,
  });
  slide.addText("产品设计笔记", {
    x: 96, y: 186, w: 688, h: 44,
    fontSize: 18, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
    vertical: "middle",
    insets: { left: 16 },
  });

  // Content area with markdown
  slide.addShape("rect", {
    x: 96, y: 242, w: 688, h: 340,
    fill: "#faf8f5", borderRadius: 3,
    borderColor: "#e8e3db", borderWidth: 1,
  });

  // Markdown content
  const lines = [
    { text: "## 核心设计原则", cls: "heading", x: 112, y: 258 },
    { text: "", cls: "spacer", x: 0, y: 0 },
    { text: "1. **双栏布局** — 侧边栏管理，编辑器专注", cls: "body", x: 112, y: 294 },
    { text: "2. **即时保存** — 每次修改自动持久化", cls: "body", x: 112, y: 318 },
    { text: "3. **Markdown 原生** — 无外部渲染依赖", cls: "body", x: 112, y: 342 },
    { text: "", cls: "spacer", x: 0, y: 0 },
    { text: "> 设计哲学：让工具退后，让内容向前", cls: "quote", x: 112, y: 376 },
    { text: "", cls: "spacer", x: 0, y: 0 },
    { text: "`const notes = useNotes()`", cls: "code", x: 112, y: 418 },
  ];

  for (const line of lines) {
    if (line.cls === "spacer") continue;
    if (line.cls === "heading") {
      slide.addText(line.text, {
        x: line.x, y: line.y, w: 656, h: 24,
        fontSize: 16, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
      });
    } else if (line.cls === "body") {
      slide.addText(line.text, {
        x: line.x, y: line.y, w: 656, h: 22,
        fontSize: 14, fontFamily: "Segoe UI", color: "#3d3d4f",
      });
    } else if (line.cls === "quote") {
      slide.addShape("rect", {
        x: 112, y: line.y - 4, w: 4, h: 28,
        fill: "#e07b5a", borderRadius: 2,
      });
      slide.addText(line.text, {
        x: 128, y: line.y, w: 640, h: 24,
        fontSize: 14, fontFamily: "Segoe UI", color: "#6b6b80",
        italic: true,
      });
    } else if (line.cls === "code") {
      slide.addShape("rect", {
        x: 112, y: line.y - 4, w: 656, h: 34,
        fill: "#f0ede8", borderRadius: 4,
      });
      slide.addText(line.text, {
        x: 112, y: line.y, w: 656, h: 26,
        fontSize: 13, fontFamily: "Consolas", color: "#4a7c96",
        vertical: "middle",
        insets: { left: 12 },
      });
    }
  }

  // Callouts on the right
  const callouts = [
    { label: "标题栏", desc: "独立输入区，自动作为文档标题", y: 186, cy: 220 },
    { label: "Markdown 高亮", desc: "语法结构实时着色，零渲染延迟", y: 242, cy: 340 },
    { label: "引用块", desc: "以竖线标记，灰字斜体区分层级", y: 376, cy: 400 },
    { label: "行内代码", desc: "等宽字体 + 暖灰背景，清晰可辨", y: 418, cy: 440 },
  ];

  for (const co of callouts) {
    const calloutX = 830;
    // Connector line
    slide.addShape("rect", {
      x: calloutX - 30, y: co.cy - 1, w: 30, h: 2,
      fill: "#e07b5a",
    });
    // Dot
    slide.addShape("ellipse", {
      x: calloutX - 38, y: co.cy - 4, w: 8, h: 8,
      fill: "#e07b5a",
    });

    slide.addText(co.label, {
      x: calloutX, y: co.y, w: 360, h: 22,
      fontSize: 13, fontFamily: "Segoe UI", bold: true, color: "#e07b5a",
    });
    slide.addText(co.desc, {
      x: calloutX, y: co.y + 22, w: 360, h: 20,
      fontSize: 12, fontFamily: "Segoe UI", color: "#6b6b80",
    });
  }

  // Footer
  slide.addText("笔记 · Notes", { x: 80, y: 680, w: 200, h: 20, fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0" });
  slide.addText("04", { x: 1200, y: 680, w: 40, h: 20, fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0", align: "right" });

  return slide;
}
