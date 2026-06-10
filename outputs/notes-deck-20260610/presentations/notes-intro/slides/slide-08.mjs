export async function slide08(presentation, ctx) {
  const slide = presentation.slides.add();
  slide.background = { fill: "#faf8f5" };

  // Kicker
  slide.addText("CORE LIBRARIES", {
    x: 80, y: 60, w: 300, h: 24,
    fontSize: 13, fontFamily: "Segoe UI", bold: true,
    color: "#e07b5a", letterSpacing: "0.15em",
  });

  // Title
  slide.addText("零外部 Markdown 依赖的自研渲染器是项目的技术脊梁。", {
    x: 80, y: 92, w: 1000, h: 50,
    fontSize: 32, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
  });

  // Left: Syntax support table
  const synY = 180;
  const synCols = [200, 280];
  const synHeaders = ["语法元素", "支持状态"];

  // Table headers
  slide.addShape("rect", { x: 80, y: synY, w: synCols[0], h: 32, fill: "#1a1a2e", borderRadius: "4,0,0,0" });
  slide.addText(synHeaders[0], { x: 80, y: synY, w: synCols[0], h: 32, fontSize: 11, fontFamily: "Segoe UI", bold: true, color: "#ffffff", align: "center", vertical: "middle" });
  slide.addShape("rect", { x: 280, y: synY, w: synCols[1], h: 32, fill: "#1a1a2e", borderRadius: "0,4,0,0" });
  slide.addText(synHeaders[1], { x: 280, y: synY, w: synCols[1], h: 32, fontSize: 11, fontFamily: "Segoe UI", bold: true, color: "#ffffff", align: "center", vertical: "middle" });

  const syntaxRows = [
    ["标题 (H1–H6)", "✓ 完全支持"],
    ["粗体 / 斜体 / 删除线", "✓ 完全支持"],
    ["行内代码 / 代码块", "✓ 带语言标注"],
    ["无序 / 有序列表", "✓ 完全支持"],
    ["引用块 (Blockquote)", "✓ 支持嵌套"],
    ["链接 / 图片", "✓ 完全支持"],
    ["水平分割线", "✓ 完全支持"],
    ["表格", "— 后续规划"],
    ["任务列表", "— 后续规划"],
  ];

  for (let r = 0; r < syntaxRows.length; r++) {
    const bg = r % 2 === 0 ? "#f0ede8" : "#faf8f5";
    const lastRow = r === syntaxRows.length - 1;
    let br0 = "0", br1 = "0";
    if (lastRow) { br0 = "0,0,0,4"; br1 = "0,0,4,0"; }
    slide.addShape("rect", { x: 80, y: synY + 32 + r * 28, w: synCols[0], h: 28, fill: bg, borderRadius: br0 });
    slide.addText(syntaxRows[r][0], { x: 80, y: synY + 32 + r * 28, w: synCols[0], h: 28, fontSize: 11, fontFamily: "Segoe UI", color: "#3d3d4f", align: "center", vertical: "middle" });
    
    const isCheck = syntaxRows[r][1].startsWith("✓");
    slide.addShape("rect", { x: 280, y: synY + 32 + r * 28, w: synCols[1], h: 28, fill: bg, borderRadius: br1 });
    slide.addText(syntaxRows[r][1], { x: 280, y: synY + 32 + r * 28, w: synCols[1], h: 28, fontSize: 11, fontFamily: "Segoe UI", color: isCheck ? "#8b9d83" : "#9e9eb0", align: "center", vertical: "middle" });
  }

  // Right: Parser architecture
  slide.addText("渲染管线", {
    x: 560, y: 170, w: 200, h: 28,
    fontSize: 16, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
  });

  const pipeline = [
    { label: "原始 Markdown 文本", color: "#1a1a2e", y: 210 },
    { label: "按行分割 → 逐行解析", color: "#4a7c96", y: 262 },
    { label: "块级识别", color: "#e07b5a", y: 314 },
    { label: "内联解析", color: "#e07b5a", y: 366 },
    { label: "HTML 组装", color: "#8b9d83", y: 418 },
    { label: "dangerouslySetInnerHTML", color: "#1a1a2e", y: 470 },
  ];

  for (let i = 0; i < pipeline.length; i++) {
    const p = pipeline[i];
    slide.addShape("rect", {
      x: 580, y: p.y, w: 600, h: 40,
      fill: p.color, borderRadius: 4,
    });
    slide.addText(p.label, {
      x: 580, y: p.y, w: 600, h: 40,
      fontSize: 13, fontFamily: "Segoe UI", bold: true, color: "#ffffff",
      align: "center", vertical: "middle",
    });

    if (i < pipeline.length - 1) {
      slide.addText("↓", {
        x: 870, y: p.y + 40, w: 20, h: 12,
        fontSize: 14, fontFamily: "Segoe UI", bold: true, color: "#9e9eb0",
        align: "center",
      });
    }
  }

  // Right bottom stats
  slide.addText("自研渲染器", {
    x: 580, y: 540, w: 200, h: 24,
    fontSize: 16, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
  });

  const stats = [
    { value: "0", label: "外部依赖" },
    { value: "~300", label: "行代码" },
    { value: "2", label: "导出函数" },
    { value: "13", label: "语法高亮规则" },
  ];

  let sx = 580;
  for (const stat of stats) {
    slide.addShape("rect", { x: sx, y: 576, w: 130, h: 60, fill: "#f0ede8", borderRadius: 6 });
    slide.addText(stat.value, {
      x: sx, y: 578, w: 130, h: 34,
      fontSize: 22, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
      align: "center", vertical: "middle",
    });
    slide.addText(stat.label, {
      x: sx, y: 612, w: 130, h: 20,
      fontSize: 10, fontFamily: "Segoe UI", color: "#6b6b80",
      align: "center",
    });
    sx += 150;
  }

  // Footer
  slide.addText("笔记 · Notes", { x: 80, y: 680, w: 200, h: 20, fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0" });
  slide.addText("08", { x: 1200, y: 680, w: 40, h: 20, fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0", align: "right" });

  return slide;
}
