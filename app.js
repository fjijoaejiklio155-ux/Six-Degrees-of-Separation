// ========================
// ■ 人物データ
// ========================
const characters = [
  { id: "you", name: "自分", desc: "ごく普通の社会人。趣味はカフェ巡り。", neighbors: ["student", "office"], links: ["student"] },
  { id: "student", name: "学生リョウ", desc: "大学生。バンドとイベント活動。", neighbors: ["you", "creator", "eventer"], links: ["creator", "eventer"] },
  { id: "office", name: "会社員ミカ", desc: "広告代理店勤務。", neighbors: ["you", "ceo", "planner"], links: ["ceo"] },
  { id: "creator", name: "配信者ユウ", desc: "動画配信者。", neighbors: ["student", "eventer", "artist"], links: ["eventer", "artist"] },
  { id: "eventer", name: "イベント主催サラ", desc: "音楽イベント主催。", neighbors: ["student", "creator", "artist"], links: ["artist"] },
  { id: "ceo", name: "経営者タケシ", desc: "IT企業の社長。", neighbors: ["office", "planner"], links: ["planner"] },
  { id: "planner", name: "企画屋ケン", desc: "企画会社所属。", neighbors: ["office", "ceo", "artist"], links: ["artist"] },
  { id: "artist", name: "アーティストレン", desc: "ミュージシャン。", neighbors: ["creator", "eventer", "planner", "idol"], links: ["idol"] },
  { id: "idol", name: "アイドルナナ", desc: "人気上昇中のアイドル。", neighbors: ["artist", "actor"], links: ["actor"] },
  { id: "actor", name: "俳優ハル", desc: "映画やドラマで活躍。", neighbors: ["idol"], links: [] }
];

// ========================
// ■ 状態
// ========================
let current = "you";

// ========================
// ■ ユーティリティ
// ========================
function getChar(id) {
  return characters.find(c => c.id === id);
}

// ========================
// ■ 描画
// ========================
function drawGraph() {
  const graph = document.getElementById("graph");
  graph.innerHTML = "";

  const width = graph.clientWidth || 600;
  const height = graph.clientHeight || 400;

  // ▼ SVG生成（線用）
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  graph.appendChild(svg);

  // ========================
  // ■ ★固定配置（まずはこれで確実に表示）
  // ========================
  const positions = {};
  let i = 0;

  characters.forEach(c => {
    positions[c.id] = {
      x: 100 + (i % 5) * 120,
      y: 100 + Math.floor(i / 5) * 120
    };
    i++;
  });

  // ========================
  // ■ 線描画（neighbors）
  // ========================
  characters.forEach(c => {
    c.neighbors.forEach(n => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

      line.setAttribute("x1", positions[c.id].x);
      line.setAttribute("y1", positions[c.id].y);
      line.setAttribute("x2", positions[n].x);
      line.setAttribute("y2", positions[n].y);

      line.setAttribute("stroke", "#64748b");
      line.setAttribute("stroke-width", "2");

      svg.appendChild(line);
    });
  });

  // ========================
  // ■ ノード描画
  // ========================
  const currentChar = getChar(current);

  characters.forEach(c => {
    const pos = positions[c.id];

    const el = document.createElement("div");
    el.className = "node";
    el.style.left = pos.x + "px";
    el.style.top = pos.y + "px";
    el.innerText = c.name;

    // 現在地
    if (c.id === current) {
      el.classList.add("center");
    }

    // 行けるノードを強調
    if (currentChar.links.includes(c.id)) {
      el.classList.add("available");
    }

    // クリック
    el.onclick = () => tryMove(c.id);

    graph.appendChild(el);
  });
}

// ========================
// ■ 移動処理
// ========================
function tryMove(targetId) {
  const currentChar = getChar(current);

  if (currentChar.links.includes(targetId)) {
    current = targetId;
    render();
  } else {
    alert("その人には紹介してもらえない");
  }
}

// ========================
// ■ UI更新
// ========================
function render() {
  const char = getChar(current);

  document.getElementById("info").innerHTML = `
    <h2>${char.name}</h2>
    <p>${char.desc}</p>
  `;

  drawGraph();
}

// ========================
// ■ 初期実行
// ========================
render();
