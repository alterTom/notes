export async function slide05(presentation, ctx) {
  const slide = presentation.slides.add();
  slide.background = { fill: "#faf8f5" };

  // Kicker
  slide.addText("DATA FLOW & STATE", {
    x: 80, y: 60, w: 300, h: 24,
    fontSize: 13, fontFamily: "Segoe UI", bold: true,
    color: "#e07b5a", letterSpacing: "0.15em",
  });

  // Title
  slide.addText("useReducer + Context 的单向数据流，让状态变化可追踪。", {
    x: 80, y: 92, w: 1000, h: 50,
    fontSize: 32, fontFamily: "Segoe UI", bold: true, color: "#1a1a2e",
  });

  // Architecture diagram
  const box = (id, label, x, y, w, h, fillColor, textColor = "#ffffff") => {
    slide.addShape("rect", { x, y, w, h, fill: fillColor, borderRadius: 4 });
    slide.addText(label, {
      x, y, w, h,
      fontSize: 12, fontFamily: "Segoe UI", bold: true, color: textColor,
      align: "center", vertical: "middle",
    });
  };

  const arrowH = (x1, x2, y) => {
    slide.addShape("rect", { x: x1, y: y - 1, w: x2 - x1, h: 2, fill: "#9e9eb0" });
    // Arrow head
    slide.addText("▶", {
      x: x2 - 10, y: y - 14, w: 20, h: 28,
      fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0",
    });
  };

  const arrowV = (x, y1, y2) => {
    slide.addShape("rect", { x: x - 1, y: y1 + 30, w: 2, h: y2 - y1 - 60, fill: "#9e9eb0" });
  };

  // Top layer: Actions
  box("actions", "Actions", 440, 170, 400, 44, "#e07b5a");
  slide.addText("SET_NOTES  ADD_NOTE  UPDATE_NOTE  DELETE_NOTE  SELECT_NOTE  SET_SEARCH_QUERY", {
    x: 440, y: 220, w: 400, h: 22,
    fontSize: 9, fontFamily: "Consolas", color: "#6b6b80", align: "center",
  });

  // Middle: useReducer
  arrowV(640, 248, 280);
  box("reducer", "useReducer  (notesReducer)", 240, 290, 400, 44, "#4a7c96");
  arrowV(640, 330, 370);

  // Bottom: State
  box("state", "NotesState", 240, 380, 400, 44, "#1a1a2e");
  
  slide.addText("{ notes, selectedId, searchQuery, showTestPanel }", {
    x: 140, y: 430, w: 600, h: 22,
    fontSize: 11, fontFamily: "Consolas", color: "#6b6b80", align: "center",
  });

  // Right side: Context Provider
  arrowH(640, 800, 310);
  box("context", "NotesContext.Provider", 800, 288, 280, 44, "#8b9d83");

  // Consumers
  box("consumer1", "useNotes()", 820, 370, 240, 36, "#2a2a3e");
  arrowV(940, 400, 440);
  box("consumer2", "useNotesContext()", 820, 450, 240, 36, "#2a2a3e");

  // Left side: Storage
  arrowV(200, 425, 460);
  box("storage", "localStorage", 100, 460, 280, 44, "#f0ede8", "#3d3d4f");
  slide.addText("自动序列化 / 反序列化", {
    x: 100, y: 510, w: 280, h: 22,
    fontSize: 11, fontFamily: "Segoe UI", color: "#6b6b80", align: "center",
  });

  // Labels
  slide.addText("用户操作", {
    x: 860, y: 210, w: 200, h: 20,
    fontSize: 12, fontFamily: "Segoe UI", bold: true, color: "#e07b5a",
  });
  slide.addText("状态机", {
    x: 330, y: 262, w: 200, h: 20,
    fontSize: 12, fontFamily: "Segoe UI", bold: true, color: "#4a7c96",
  });
  slide.addText("全局共享", {
    x: 900, y: 262, w: 200, h: 20,
    fontSize: 12, fontFamily: "Segoe UI", bold: true, color: "#8b9d83",
  });
  slide.addText("持久化", {
    x: 160, y: 554, w: 200, h: 20,
    fontSize: 12, fontFamily: "Segoe UI", bold: true, color: "#6b6b80",
  });

  // Footer
  slide.addText("笔记 · Notes", { x: 80, y: 680, w: 200, h: 20, fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0" });
  slide.addText("05", { x: 1200, y: 680, w: 40, h: 20, fontSize: 10, fontFamily: "Segoe UI", color: "#9e9eb0", align: "right" });

  return slide;
}
