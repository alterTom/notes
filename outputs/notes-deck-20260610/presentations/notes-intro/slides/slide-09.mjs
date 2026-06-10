export async function slide09(presentation, ctx) {
  const slide = presentation.slides.add();
  slide.background = { fill: "#faf8f5" };

  // Kicker
  slide.addText("IPC & NATIVE INTEGRATION", {
    x: 80, y: 60, w: 360, h: 24,
    fontSize: 13, fontFamily: "Segoe UI", bold: true,
    color: "#e07b5a", letterSpacing: "0.15em",
  });

  // Title
  slide.addText("主进程负责文件系统和原生菜单，渲染进程专注 UI。", {
    x: 80, y: 92, w: 1000, h: 50,
    fontSize: 32, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
  });

  // Main Process panel
  slide.addShape("rect", {
    x: 80, y: 180, w: 520, h: 440,
    fill: "#1a1a2e", borderRadius: 8,
  });
  slide.addText("Main Process  (Node.js)", {
    x: 80, y: 190, w: 520, h: 30,
    fontSize: 15, fontFamily: "Segoe UI", bold: true, color: "#ffffff",
    align: "center",
  });

  const mainItems = [
    { label: "BrowserWindow", desc: "创建窗口、设置尺寸、加载页面" },
    { label: "Menu.buildFromTemplate", desc: "文件 / 编辑 / 视图 / 帮助菜单" },
    { label: "dialog.showOpenDialog", desc: "导入 .txt / .md 文件" },
    { label: "dialog.showSaveDialog", desc: "导出笔记为文件" },
    { label: "ipcMain.handle", desc: "响应渲染进程的 IPC 调用" },
    { label: "webContents.send", desc: "推送菜单动作到渲染进程" },
  ];

  let my = 238;
  for (const item of mainItems) {
    slide.addShape("rect", {
      x: 96, y: my, w: 488, h: 46,
      fill: "#2a2a3e", borderRadius: 4,
    });
    slide.addText(item.label, {
      x: 96, y: my, w: 488, h: 22,
      fontSize: 12, fontFamily: "Consolas", bold: true, color: "#e07b5a",
      vertical: "middle",
      insets: { left: 12 },
    });
    slide.addText(item.desc, {
      x: 96, y: my + 22, w: 488, h: 20,
      fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0",
      insets: { left: 12 },
    });
    my += 56;
  }

  // Renderer Process panel
  slide.addShape("rect", {
    x: 680, y: 180, w: 520, h: 440,
    fill: "#2a2a3e", borderRadius: 8,
  });
  slide.addText("Renderer Process  (Chromium)", {
    x: 680, y: 190, w: 520, h: 30,
    fontSize: 15, fontFamily: "Segoe UI", bold: true, color: "#ffffff",
    align: "center",
  });

  const rendererItems = [
    { label: "React App", desc: "组件树、Hooks、Context 状态管理" },
    { label: "window.electronAPI", desc: "Preload 暴露的安全 API 接口" },
    { label: "menu-action 监听", desc: "响应原生菜单的 IPC 事件" },
    { label: "export-note 调用", desc: "触发主进程文件保存对话框" },
    { label: "localStorage", desc: "笔记数据本地持久化" },
    { label: "index.css", desc: "亮色/暗色双主题样式系统" },
  ];

  my = 238;
  for (const item of rendererItems) {
    slide.addShape("rect", {
      x: 696, y: my, w: 488, h: 46,
      fill: "#3d3d4f", borderRadius: 4,
    });
    slide.addText(item.label, {
      x: 696, y: my, w: 488, h: 22,
      fontSize: 12, fontFamily: "Consolas", bold: true, color: "#8b9d83",
      vertical: "middle",
      insets: { left: 12 },
    });
    slide.addText(item.desc, {
      x: 696, y: my + 22, w: 488, h: 20,
      fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0",
      insets: { left: 12 },
    });
    my += 56;
  }

  // IPC arrows in the middle
  const ipcArrows = [
    { from: 600, to: 680, label: "contextBridge", y: 290 },
    { from: 680, to: 600, label: "ipcMain.handle", y: 370 },
    { from: 600, to: 680, label: "webContents.send", y: 450 },
  ];

  slide.addText("IPC", {
    x: 605, y: 260, w: 70, h: 24,
    fontSize: 14, fontFamily: "Segoe UI", bold: true, color: "#e07b5a", align: "center",
  });

  for (const arrow of ipcArrows) {
    const leftToRight = arrow.from < arrow.to;
    slide.addShape("rect", {
      x: Math.min(arrow.from, arrow.to), y: arrow.y - 1,
      w: Math.abs(arrow.to - arrow.from), h: 2,
      fill: "#e07b5a",
    });
    const headX = leftToRight ? arrow.to - 10 : arrow.from;
    slide.addText(leftToRight ? "▶" : "◀", {
      x: headX - 5, y: arrow.y - 12, w: 20, h: 24,
      fontSize: 10, fontFamily: "Segoe UI", color: "#e07b5a",
      align: "center",
    });
    slide.addText(arrow.label, {
      x: 612, y: arrow.y + 8, w: 56, h: 14,
      fontSize: 7, fontFamily: "Segoe UI", color: "#e07b5a", align: "center",
    });
  }

  // Security note
  slide.addShape("rect", {
    x: 80, y: 638, w: 1120, h: 24,
    fill: "#f0ede8", borderRadius: 4,
  });
  slide.addText("安全隔离：contextIsolation: true  ·  nodeIntegration: false", {
    x: 80, y: 638, w: 1120, h: 24,
    fontSize: 11, fontFamily: "Segoe UI", color: "#6b6b80",
    align: "center", vertical: "middle",
  });

  // Footer
  slide.addText("笔记 · Notes", { x: 80, y: 680, w: 200, h: 20, fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0" });
  slide.addText("09", { x: 1200, y: 680, w: 40, h: 20, fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0", align: "right" });

  return slide;
}
