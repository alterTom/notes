export async function slide02(presentation, ctx) {
  const slide = presentation.slides.add();
  slide.background = { fill: "#faf8f5" };

  // Kicker
  slide.addText("PRODUCT OVERVIEW", {
    x: 80, y: 60, w: 300, h: 24,
    fontSize: 13,
    fontFamily: "Segoe UI",
    bold: true,
    color: "#e07b5a",
    letterSpacing: "0.15em",
  });

  // Title
  slide.addText("双栏架构将导航与编辑解耦，让聚焦成为默认状态。", {
    x: 80, y: 92, w: 700, h: 50,
    fontSize: 36,
    fontFamily: "Segoe UI",
    bold: true,
    color: "#1a1a2e",
  });

  // Left column - description
  slide.addText("核心交互模式", {
    x: 80, y: 180, w: 480, h: 28,
    fontSize: 20,
    fontFamily: "Segoe UI",
    bold: true,
    color: "#1a1a2e",
  });

  const features = [
    { label: "侧边栏", desc: "笔记列表、搜索、暗色/亮色主题切换" },
    { label: "编辑器", desc: "实时 Markdown 高亮，标题与正文分离" },
    { label: "快捷键", desc: "Ctrl+N 新建，Ctrl+T 切换主题" },
    { label: "持久化", desc: "localStorage 自动保存，无服务端依赖" },
  ];

  let yPos = 224;
  for (const f of features) {
    slide.addText(f.label, {
      x: 80, y: yPos, w: 120, h: 26,
      fontSize: 15,
      fontFamily: "Segoe UI",
      bold: true,
      color: "#4a7c96",
    });
    slide.addText(f.desc, {
      x: 208, y: yPos, w: 352, h: 26,
      fontSize: 15,
      fontFamily: "Segoe UI",
      color: "#3d3d4f",
    });
    yPos += 44;
  }

  // Right column - layout diagram
  slide.addShape("rect", {
    x: 600, y: 180, w: 600, h: 460,
    fill: "#f0ede8",
    borderRadius: 8,
  });

  // Sidebar box
  slide.addShape("rect", {
    x: 620, y: 200, w: 220, h: 420,
    fill: "#ffffff",
    borderColor: "#e0dcd5",
    borderWidth: 1,
    borderRadius: 4,
  });

  slide.addText("Sidebar", {
    x: 640, y: 210, w: 180, h: 24,
    fontSize: 12,
    fontFamily: "Segoe UI",
    bold: true,
    color: "#6b6b80",
  });

  // Sidebar children
  const sbItems = ["搜索框", "新建按钮", "笔记列表", "主题切换"];
  let sy = 248;
  for (const item of sbItems) {
    slide.addShape("rect", {
      x: 636, y: sy, w: 188, h: 30,
      fill: "#f0ede8",
      borderRadius: 3,
    });
    slide.addText(item, {
      x: 636, y: sy, w: 188, h: 30,
      fontSize: 11,
      fontFamily: "Segoe UI",
      color: "#3d3d4f",
      align: "center",
      vertical: "middle",
    });
    sy += 40;
  }

  // Editor box
  slide.addShape("rect", {
    x: 860, y: 200, w: 320, h: 420,
    fill: "#ffffff",
    borderColor: "#e0dcd5",
    borderWidth: 1,
    borderRadius: 4,
  });

  slide.addText("Editor", {
    x: 880, y: 210, w: 280, h: 24,
    fontSize: 12,
    fontFamily: "Segoe UI",
    bold: true,
    color: "#6b6b80",
  });

  // Editor areas
  slide.addShape("rect", {
    x: 876, y: 248, w: 288, h: 40,
    fill: "#f0ede8",
    borderRadius: 3,
  });
  slide.addText("标题输入", {
    x: 876, y: 248, w: 288, h: 40,
    fontSize: 11,
    fontFamily: "Segoe UI",
    color: "#3d3d4f",
    align: "center",
    vertical: "middle",
  });

  slide.addShape("rect", {
    x: 876, y: 302, w: 288, h: 200,
    fill: "#faf8f5",
    borderColor: "#e8e3db",
    borderWidth: 1,
    borderRadius: 3,
  });
  slide.addText("正文编辑区\n（Markdown 实时高亮）", {
    x: 876, y: 302, w: 288, h: 200,
    fontSize: 11,
    fontFamily: "Segoe UI",
    color: "#3d3d4f",
    align: "center",
    vertical: "middle",
  });

  slide.addShape("rect", {
    x: 876, y: 516, w: 288, h: 24,
    fill: "#f0ede8",
    borderRadius: 3,
  });
  slide.addText("状态栏", {
    x: 876, y: 516, w: 288, h: 24,
    fontSize: 10,
    fontFamily: "Segoe UI",
    color: "#6b6b80",
    align: "center",
    vertical: "middle",
  });

  // Footer
  slide.addText("笔记 · Notes", {
    x: 80, y: 680, w: 200, h: 20,
    fontSize: 10,
    fontFamily: "Segoe UI",
    color: "#9e9eb0",
  });
  slide.addText("02", {
    x: 1200, y: 680, w: 40, h: 20,
    fontSize: 10,
    fontFamily: "Segoe UI",
    color: "#9e9eb0",
    align: "right",
  });

  return slide;
}
