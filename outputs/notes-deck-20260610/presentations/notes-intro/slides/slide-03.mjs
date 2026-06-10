export async function slide03(presentation, ctx) {
  const slide = presentation.slides.add();
  slide.background = { fill: "#faf8f5" };

  // Kicker
  slide.addText("DESIGN SYSTEM", {
    x: 80, y: 60, w: 300, h: 24,
    fontSize: 13, fontFamily: "Segoe UI", bold: true,
    color: "#e07b5a", letterSpacing: "0.15em",
  });

  // Title
  slide.addText("明暗双主题 + 零依赖 Markdown 渲染，用克制而非功能取胜。", {
    x: 80, y: 92, w: 1120, h: 50,
    fontSize: 32, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
  });

  // Theme comparison side-by-side
  const lightX = 80;
  const darkX = 440;

  // Light theme preview
  slide.addText("亮色主题", {
    x: lightX, y: 170, w: 320, h: 28,
    fontSize: 16, fontFamily: "Segoe UI", bold: true, color: "#4a7c96",
  });
  slide.addShape("rect", {
    x: lightX, y: 206, w: 340, h: 200,
    fill: "#f0ede8", borderRadius: 6,
    borderColor: "#e8e3db", borderWidth: 1,
  });
  slide.addShape("rect", {
    x: lightX + 16, y: 220, w: 308, h: 40,
    fill: "#ffffff", borderRadius: 3,
  });
  slide.addText("笔记列表 —— 亮色", {
    x: lightX + 16, y: 220, w: 308, h: 40,
    fontSize: 12, fontFamily: "Segoe UI", color: "#1a1a2e",
    align: "center", vertical: "middle",
  });
  slide.addShape("rect", {
    x: lightX + 16, y: 274, w: 308, h: 118,
    fill: "#ffffff", borderRadius: 3,
    borderColor: "#e8e3db", borderWidth: 1,
  });
  slide.addText("# 标题\n正文内容预览…", {
    x: lightX + 16, y: 274, w: 308, h: 118,
    fontSize: 12, fontFamily: "Segoe UI", color: "#3d3d4f",
    vertical: "middle",
    insets: { left: 12, right: 12, top: 8, bottom: 8 },
  });

  // Dark theme preview
  slide.addText("暗色主题", {
    x: darkX, y: 170, w: 320, h: 28,
    fontSize: 16, fontFamily: "Segoe UI", bold: true, color: "#4a7c96",
  });
  slide.addShape("rect", {
    x: darkX, y: 206, w: 340, h: 200,
    fill: "#2a2a3e", borderRadius: 6,
    borderColor: "#3d3d4f", borderWidth: 1,
  });
  slide.addShape("rect", {
    x: darkX + 16, y: 220, w: 308, h: 40,
    fill: "#1a1a2e", borderRadius: 3,
  });
  slide.addText("笔记列表 —— 暗色", {
    x: darkX + 16, y: 220, w: 308, h: 40,
    fontSize: 12, fontFamily: "Segoe UI", color: "#e0dcd5",
    align: "center", vertical: "middle",
  });
  slide.addShape("rect", {
    x: darkX + 16, y: 274, w: 308, h: 118,
    fill: "#1a1a2e", borderRadius: 3,
    borderColor: "#3d3d4f", borderWidth: 1,
  });
  slide.addText("# 标题\n正文内容预览…", {
    x: darkX + 16, y: 274, w: 308, h: 118,
    fontSize: 12, fontFamily: "Segoe UI", color: "#d0d0d8",
    vertical: "middle",
    insets: { left: 12, right: 12, top: 8, bottom: 8 },
  });

  // Design tokens table
  slide.addText("设计令牌", {
    x: 80, y: 430, w: 200, h: 28,
    fontSize: 16, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
  });

  const tableY = 470;
  const colWidths = [120, 120, 120, 120];
  const headers = ["元素", "亮色主题", "暗色主题", "说明"];
  const rows = [
    ["背景色", "#FAF8F5", "#1A1A2E", "主背景"],
    ["表面色", "#F0EDE8", "#2A2A3E", "卡片/面板"],
    ["主文字", "#1A1A2E", "#FAF8F5", "标题/正文"],
    ["次级文字", "#6B6B80", "#9E9EB0", "辅助信息"],
    ["强调色", "#E07B5A", "#E07B5A", "统一强调"],
  ];

  // Table headers
  let hx = 80;
  for (let i = 0; i < headers.length; i++) {
    slide.addShape("rect", {
      x: hx, y: tableY, w: colWidths[i], h: 30,
      fill: "#1a1a2e", borderRadius: i === 0 ? "4,0,0,0" : (i === 3 ? "0,4,0,0" : "0"),
    });
    slide.addText(headers[i], {
      x: hx, y: tableY, w: colWidths[i], h: 30,
      fontSize: 11, fontFamily: "Segoe UI", bold: true, color: "#ffffff",
      align: "center", vertical: "middle",
    });
    hx += colWidths[i];
  }

  // Table rows
  for (let r = 0; r < rows.length; r++) {
    let rx = 80;
    const bg = r % 2 === 0 ? "#f0ede8" : "#faf8f5";
    const lastRow = r === rows.length - 1;
    for (let c = 0; c < rows[r].length; c++) {
      let br = "0";
      if (lastRow) {
        if (c === 0) br = "0,0,0,4";
        else if (c === 3) br = "0,0,4,0";
      }
      slide.addShape("rect", {
        x: rx, y: tableY + 30 + r * 30, w: colWidths[c], h: 30,
        fill: bg, borderRadius: br,
      });
      const isColor = c === 1 || c === 2;
      slide.addText(rows[r][c], {
        x: rx, y: tableY + 30 + r * 30, w: colWidths[c], h: 30,
        fontSize: 10, fontFamily: isColor ? "Consolas" : "Segoe UI",
        color: isColor ? "#4a7c96" : "#3d3d4f",
        align: "center", vertical: "middle",
      });
      rx += colWidths[c];
    }
  }

  // Footer
  slide.addText("笔记 · Notes", { x: 80, y: 680, w: 200, h: 20, fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0" });
  slide.addText("03", { x: 1200, y: 680, w: 40, h: 20, fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0", align: "right" });

  return slide;
}
