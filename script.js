// サンプルデータ（後で events.json に分離してもOK）
const events = [
  { id:1, title:"コンサート", date:"2025-09-10", place:"市民ホール", desc:"18:30 開場 / 19:00 開演" },
  { id:2, title:"ワークショップ", date:"2025-09-20", place:"クリエイティブスペース", desc:"ハンズオン形式" },
  { id:3, title:"地域祭り", date:"2025-10-05", place:"中央広場", desc:"屋台・ステージあり" }
];

function formatDateYMD(iso){
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("ja-JP", { month:"numeric", day:"numeric", weekday:"short" });
}
function escapeHtml(str=""){ return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s])); }

function renderList(list){
  const root = document.getElementById("events");
  if(!root) return;
  if(!list.length){ root.innerHTML = "<p>該当するイベントがありません。</p>"; return; }
  root.innerHTML = list.map(ev => `
    <article class="event-card">
      <div class="event-date">${formatDateYMD(ev.date)}</div>
      <div class="event-body">
        <h2>${escapeHtml(ev.title)}</h2>
        <div class="event-meta">${escapeHtml(ev.place)} ・ ${escapeHtml(ev.desc || "")}</div>
      </div>
    </article>
  `).join("");
}

function init(){
  const sorted = [...events].sort((a,b) => new Date(a.date) - new Date(b.date));
  renderList(sorted);
  const input = document.getElementById("search");
  input.addEventListener("input", e => {
    const q = e.target.value.trim().toLowerCase();
    if(!q) return renderList(sorted);
    renderList(sorted.filter(ev => ev.title.toLowerCase().includes(q) || ev.place.toLowerCase().includes(q) || (ev.desc||"").toLowerCase().includes(q)));
  });
}
document.addEventListener("DOMContentLoaded", init);
