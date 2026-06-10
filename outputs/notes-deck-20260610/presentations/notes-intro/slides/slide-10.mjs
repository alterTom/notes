export async function slide10(presentation, ctx) {
  const slide = presentation.slides.add();
  slide.background = { fill: "#faf8f5" };

  // Kicker
  slide.addText("TESTING & QUALITY", {
    x: 80, y: 60, w: 300, h: 24,
    fontSize: 13, fontFamily: "Segoe UI", bold: true,
    color: "#e07b5a", letterSpacing: "0.15em",
  });

  // Title
  slide.addText("Vitest + Testing Library 覆盖核心模块和组件行为。", {
    x: 80, y: 92, w: 1000, h: 50,
    fontSize: 32, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
  });

  // Test architecture diagram
  slide.addText("测试架构", {
    x: 80, y: 170, w: 200, h: 28,
    fontSize: 16, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
  });

  const layers = [
    { label: "单元测试", items: ["formatters.test.ts", "notes.test.ts", "test-runner.test.ts"], color: "#4a7c96", x: 80 },
    { label: "组件测试", items: ["components/ __tests__"], color: "#e07b5a", x: 460 },
    { label: "测试基础设施", items: ["setup.ts", "define-tests.ts"], color: "#8b9d83", x: 840 },
  ];

  for (const layer of layers) {
    slide.addShape("rect", {
      x: layer.x, y: 210, w: 340, h: 40,
      fill: layer.color, borderRadius: "6,6,0,0",
    });
    slide.addText(layer.label, {
      x: layer.x, y: 210, w: 340, h: 40,
      fontSize: 14, fontFamily: "Segoe UI", bold: true, color: "#ffffff",
      align: "center", vertical: "middle",
    });

    let iy = 250;
    for (let i = 0; i < layer.items.length; i++) {
      const last = i === layer.items.length - 1;
      slide.addShape("rect", {
        x: layer.x, y: iy, w: 340, h: 34,
        fill: "#f0ede8", borderRadius: last ? "0,0,6,6" : "0",
        borderColor: "#e8e3db", borderWidth: 1,
      });
      slide.addText(layer.items[i], {
        x: layer.x, y: iy, w: 340, h: 34,
        fontSize: 12, fontFamily: "Consolas", color: "#3d3d4f",
        align: "center", vertical: "middle",
      });
      iy += 34;
    }
  }

  // Test coverage details
  slide.addText("核心测试覆盖", {
    x: 80, y: 360, w: 200, h: 28,
    fontSize: 16, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
  });

  const testCoverage = [
    { module: "notes.ts", tests: "createNote / updateNote / deleteNote / findNote / getFilteredNotes / sortNotes", focus: "纯函数正确性" },
    { module: "formatters.ts", tests: "日期格式化 / 文本截断 / 字符计数", focus: "边界情况" },
    { module: "test-runner.ts", tests: "测试套件执行 / 结果收集 / 状态报告", focus: "内置测试框架" },
    { module: "组件测试", tests: "渲染验证 / 用户交互 / 状态变化", focus: "行为驱动" },
  ];

  const tH = ["模块", "测试用例", "关注点"];
  const tW = [160, 520, 160];
  let ty = 400;

  // Header
  let tx = 80;
  for (let c = 0; c < tH.length; c++) {
    let br = "0";
    if (c === 0) br = "4,0,0,0";
    else if (c === tH.length - 1) br = "0,4,0,0";
    slide.addShape("rect", { x: tx, y: ty, w: tW[c], h: 30, fill: "#1a1a2e", borderRadius: br });
    slide.addText(tH[c], { x: tx, y: ty, w: tW[c], h: 30, fontSize: 11, fontFamily: "Segoe UI", bold: true, color: "#ffffff", align: "center", vertical: "middle" });
    tx += tW[c];
  }

  for (let r = 0; r < testCoverage.length; r++) {
    tx = 80;
    const row = testCoverage[r];
    const bg = r % 2 === 0 ? "#f0ede8" : "#faf8f5";
    const lastRow = r === testCoverage.length - 1;

    const vals = [row.module, row.tests, row.focus];
    for (let c = 0; c < vals.length; c++) {
      let br = "0";
      if (lastRow) {
        if (c === 0) br = "0,0,0,4";
        else if (c === vals.length - 1) br = "0,0,4,0";
      }
      slide.addShape("rect", { x: tx, y: ty + 30 + r * 34, w: tW[c], h: 34, fill: bg, borderRadius: br });
      slide.addText(vals[c], {
        x: tx, y: ty + 30 + r * 34, w: tW[c], h: 34,
        fontSize: 10,
        fontFamily: c === 0 ? "Consolas" : "Segoe UI",
        bold: c === 0,
        color: c === 0 ? "#4a7c96" : "#3d3d4f",
        align: c === 0 ? "center" : "left",
        vertical: "middle",
        insets: c > 0 ? { left: 8, right: 8 } : undefined,
      });
      tx += tW[c];
    }
  }

  // Tool badges
  slide.addText("测试工具链", {
    x: 80, y: 600, w: 200, h: 24,
    fontSize: 14, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
  });

  const tools = [
    { name: "Vitest", role: "测试运行器", color: "#4a7c96" },
    { name: "Testing Library", role: "组件渲染 & 查询", color: "#e07b5a" },
    { name: "jsdom", role: "浏览器环境模拟", color: "#8b9d83" },
    { name: "user-event", role: "用户交互模拟", color: "#6b6b80" },
  ];

  let bx = 80;
  for (const tool of tools) {
    slide.addShape("rect", { x: bx, y: 636, w: 240, h: 36, fill: tool.color, borderRadius: 4 });
    slide.addText(tool.name, {
      x: bx, y: 636, w: 240, h: 20,
      fontSize: 12, fontFamily: "Segoe UI", bold: true, color: "#ffffff",
      align: "center", vertical: "middle",
    });
    slide.addText(tool.role, {
      x: bx, y: 656, w: 240, h: 16,
      fontSize: 9, fontFamily: "Segoe UI", color: "rgba(255,255,255,0.75)",
      align: "center",
    });
    bx += 260;
  }

  // Footer
  slide.addText("笔记 · Notes", { x: 80, y: 680, w: 200, h: 20, fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0" });
  slide.addText("10", { x: 1200, y: 680, w: 40, h: 20, fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0", align: "right" });

  return slide;
}
