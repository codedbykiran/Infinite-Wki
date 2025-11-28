const summaryBox = document.getElementById("summaryBox");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const randomBox = document.getElementById("randomBox");

async function fetchWiki(topic) {
    try {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`;
        const res = await fetch(url);
        const data = await res.json();
        return data.extract || "No information found.";
    } catch {
        return "No info found.";
    }
}
function renderSummary(text) {
    summaryBox.innerHTML = ""; 

    let words = text.split(" ");

    words.forEach(w => {
        let clean = w.replace(/[^\w]/g, "");

        let span = document.createElement("span");
        span.innerText = w + " ";
        span.classList.add("word");

        span.onclick = () => loadTopic(clean);

        summaryBox.appendChild(span);
    });
}

async function loadTopic(topic) {
    if (!topic) return;
    const text = await fetchWiki(topic);
    renderSummary(text);
}

const randomWords = ["India", "Universe", "Computer", "Music", "Physics", "Tiger", "Water", "Mountain"];

function showRandom() {
    const random = randomWords[Math.floor(Math.random() * randomWords.length)];
    randomBox.innerHTML = `Random: <b>${random}</b>`;
    randomBox.onclick = () => loadTopic(random);
}

searchBtn.onclick = () => {
    let topic = searchInput.value.trim();
    if (topic.length > 0) loadTopic(topic);
};

showRandom();
