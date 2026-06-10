export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  
  // Dark ink background
  slide.background = { fill: "#1a1a2e" };

  // Logo area - placeholder at top center
  slide.addText("笔记", {
    x: 440, y: 200, w: 400, h: 80,
    fontSize: 64,
    fontFamily: "Segoe UI",
    bold: true,
    color: "#ffffff",
    align: "center",
    vertical: "middle",
  });

  // Divider line
  slide.addShape("rect", {
    x: 540, y: 295, w: 200, h: 2,
    fill: "#e07b5a",
  });

  // Subtitle
  slide.addText("简洁的桌面笔记应用", {
    x: 340, y: 320, w: 600, h: 44,
    fontSize: 22,
    fontFamily: "Segoe UI",
    color: "#b0b0c8",
    align: "center",
    vertical: "middle",
  });

  // Secondary tagline
  slide.addText("Product Design × Technical Architecture", {
    x: 340, y: 380, w: 600, h: 36,
    fontSize: 16,
    fontFamily: "Segoe UI",
    color: "#6b6b80",
    align: "center",
    vertical: "middle",
  });

  // Version badge
  slide.addText("v1.0.0", {
    x: 560, y: 450, w: 160, h: 32,
    fontSize: 13,
    fontFamily: "Segoe UI",
    color: "#e07b5a",
    align: "center",
    vertical: "middle",
    borderColor: "#e07b5a",
    borderWidth: 1,
    borderRadius: 4,
  });

  // Footer
  slide.addText("Electron · React · TypeScript · Markdown", {
    x: 340, y: 620, w: 600, h: 24,
    fontSize: 12,
    fontFamily: "Segoe UI",
    color: "#4a4a5e",
    align: "center",
    vertical: "middle",
  });

  return slide;
}
