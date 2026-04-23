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