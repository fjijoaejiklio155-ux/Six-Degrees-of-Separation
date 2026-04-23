const goal = "松本人志";
let current = "自分";
let steps = 6;

const data = {
  "自分": {
    desc: "一般人。友人や同僚がいる。",
    links: ["友人A", "同僚B"]
  },
  "友人A": {
    desc: "SNSが広い。YouTuberとつながりあり。",
    links: ["YouTuber"]
  },
  "同僚B": {
    desc: "会社員。社長と知り合い。",
    links: ["社長"]
  },
  "YouTuber": {
    desc: "影響力あり。芸能人と交流あり。",
    links: ["芸能人"]
  },
  "社長": {
    desc: "経営者。広告代理店とつながりあり。",
    links: ["広告代理店"]
  },
  "広告代理店": {
    desc: "メディアに強い。",
    links: ["芸能人"]
  },
  "芸能人": {
    desc: "テレビ出演多数。",
    links: ["松本人志"]
  },
  "松本人志": {
    desc: "ゴール！",
    links: []
  }
};

function render() {
  document.getElementById("header").innerText =
    `目標：${goal} ｜ 残り手数：${steps}`;

  const node = data[current];

  document.getElementById("info").innerHTML = `
    <h2>${current}</h2>
    <p>${node.desc}</p>
  `;

  // 選択肢
  const choicesHTML = node.links.map(name =>
    `<button onclick="move('${name}')">${name}</button>`
  ).join("");

  document.getElementById("choices").innerHTML = choicesHTML;

  drawGraph();
}

function move(name) {
  current = name;
  steps--;

  if (current === goal) {
    alert("クリア！");
    location.reload();
    return;
  }

  if (steps <= 0) {
    alert("ゲームオーバー");
    location.reload();
    return;
  }

  render();
}

function drawGraph() {
  const graph = document.getElementById("graph");
  graph.innerHTML = "";

  const centerX = 200;
  const centerY = 150;
  const radius = 100;

  // 中央（現在地）
  createNode(graph, current, centerX, centerY, true);

  const links = data[current].links;
  const angleStep = (Math.PI * 2) / links.length;

  links.forEach((name, i) => {
    const angle = i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    createNode(graph, name, x, y);
  });
}

function createNode(graph, name, x, y, isCenter = false) {
  const el = document.createElement("div");
  el.className = "node" + (isCenter ? " center" : "");
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.innerText = name;

  graph.appendChild(el);
}

// 初期描画
render();

const characters = [
  {
    id: "you",
    name: "自分",
    zone: "日常",
    desc: "ごく普通の社会人。趣味はカフェ巡りと軽い運動。",
    neighbors: ["student", "office"],
    links: ["student"] // 紹介できる
  },

  {
    id: "student",
    name: "学生リョウ",
    zone: "学生",
    desc: "大学生。バンド活動とイベント運営をしている。",
    neighbors: ["you", "creator", "eventer"],
    links: ["creator", "eventer"]
  },

  {
    id: "office",
    name: "会社員ミカ",
    zone: "企業",
    desc: "広告代理店勤務。企業案件を多く扱う。",
    neighbors: ["you", "ceo", "planner"],
    links: ["ceo"]
  },

  {
    id: "creator",
    name: "配信者ユウ",
    zone: "ネット",
    desc: "動画配信者。イベント出演経験あり。",
    neighbors: ["student", "eventer", "artist"],
    links: ["eventer", "artist"]
  },

  {
    id: "eventer",
    name: "イベント主催サラ",
    zone: "イベント",
    desc: "音楽イベントの主催者。幅広い人脈を持つ。",
    neighbors: ["student", "creator", "artist"],
    links: ["artist"]
  },

  {
    id: "ceo",
    name: "経営者タケシ",
    zone: "企業",
    desc: "IT企業の社長。広告業界とも関係あり。",
    neighbors: ["office", "planner"],
    links: ["planner"]
  },

  {
    id: "planner",
    name: "企画屋ケン",
    zone: "企業",
    desc: "企画会社所属。イベントや広告を横断的に担当。",
    neighbors: ["office", "ceo", "artist"],
    links: ["artist"]
  },

  {
    id: "artist",
    name: "アーティストレン",
    zone: "芸能",
    desc: "インディーズ出身のミュージシャン。イベント出演多数。",
    neighbors: ["creator", "eventer", "planner", "idol"],
    links: ["idol"]
  },

  {
    id: "idol",
    name: "アイドルナナ",
    zone: "芸能",
    desc: "人気上昇中のアイドル。メディア露出が増えている。",
    neighbors: ["artist", "actor"],
    links: ["actor"]
  },

  {
    id: "actor",
    name: "俳優ハル",
    zone: "芸能",
    desc: "映画やドラマに出演する実力派俳優。",
    neighbors: ["idol"],
    links: []
  }
];

const zones = {
  "学生": { x: 100, y: 100 },
  "日常": { x: 200, y: 200 },
  "企業": { x: 400, y: 200 },
  "ネット": { x: 200, y: 100 },
  "イベント": { x: 300, y: 150 },
  "芸能": { x: 500, y: 100 }
};
