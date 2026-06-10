export async function slide07(presentation, ctx) {
  const slide = presentation.slides.add();
  slide.background = { fill: "#faf8f5" };

  // Kicker
  slide.addText("TECHNOLOGY STACK", {
    x: 80, y: 60, w: 300, h: 24,
    fontSize: 13, fontFamily: "Segoe UI", bold: true,
    color: "#e07b5a", letterSpacing: "0.15em",
  });

  // Title
  slide.addText("Electron + React + TypeScript + Vite — 现代桌面应用技术栈。", {
    x: 80, y: 92, w: 1100, h: 50,
    fontSize: 32, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
  });

  // Three-tier architecture
  const layers = [
    {
      label: "桌面壳层  Electron Shell",
      y: 180,
      items: [
        { name: "Main Process", desc: "窗口管理 · 原生菜单 · 文件导入/导出 · IPC 通信", accent: "#e07b5a" },
        { name: "Preload", desc: "contextBridge 安全暴露 API · 沙箱隔离", accent: "#e07b5a" },
      ],
      fill: "#1a1a2e",
    },
    {
      label: "渲染层  React Renderer",
      y: 320,
      items: [
        { name: "React 18", desc: "Hooks 驱动 · Context + useReducer 状态管理", accent: "#4a7c96" },
        { name: "TypeScript", desc: "全量类型覆盖 · NotesState / NotesAction 联合类型", accent: "#4a7c96" },
        { name: "electron-vite", desc: "HMR 热更新 · 主进程/预加载/渲染三端构建", accent: "#4a7c96" },
      ],
      fill: "#2a2a3e",
    },
    {
      label: "核心库层  Core Libraries",
      y: 500,
      items: [
        { name: "Markdown 引擎", desc: "自研零依赖渲染器 · 语法高亮 · HTML 输出", accent: "#8b9d83" },
        { name: "存储层", desc: "localStorage 封装 · JSON 序列化 / 反序列化", accent: "#8b9d83" },
        { name: "测试框架", desc: "Vitest + Testing Library · jsdom 模拟 DOM", accent: "#8b9d83" },
      ],
      fill: "#3d3d4f",
    },
  ];

  for (const layer of layers) {
    // Layer label
    slide.addShape("rect", {
      x: 80, y: layer.y, w: 260, h: layer.items.length * 56 + 24,
      fill: layer.fill, borderRadius: "6,0,0,6",
    });
    slide.addText(layer.label, {
      x: 80, y: layer.y + 16, w: 260, h: layer.items.length * 56 - 8,
      fontSize: 16, fontFamily: "Segoe UI", bold: true, color: "#ffffff",
      align: "center", vertical: "middle",
    });

    // Items
    let iy = layer.y + 8;
    for (const item of layer.items) {
      slide.addShape("rect", {
        x: 340, y: iy, w: 860, h: 48,
        fill: "#f0ede8", borderRadius: 4,
        borderColor: "#e8e3db", borderWidth: 1,
      });
      
      // Accent bar
      slide.addShape("rect", {
        x: 340, y: iy, w: 4, h: 48,
        fill: item.accent, borderRadius: "2,0,0,2",
      });

      slide.addText(item.name, {
        x: 360, y: iy, w: 200, h: 24,
        fontSize: 15, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
        vertical: "middle",
      });
      slide.addText(item.desc, {
        x: 360, y: iy + 24, w: 820, h: 20,
        fontSize: 12, fontFamily: "Segoe UI", color: "#6b6b80",
      });
      iy += 56;
    }
  }

  // Footer
  slide.addText("笔记 · Notes", { x: 80, y: 680, w: 200, h: 20, fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0" });
  slide.addText("07", { x: 1200, y: 680, w: 40, h: 20, fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0", align: "right" });

  return slide;
}
