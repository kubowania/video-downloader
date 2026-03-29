let currentVideos = []

async function search() {
    const q = document.getElementById("query").value.trim()
    const count = document.getElementById("count").value

    if (!q) return

    const btn = document.getElementById("searchBtn")
    btn.disabled = true
    btn.textContent = "Searching..."
    setStatus("Searching...")
    document.getElementById("results").innerHTML = ""
    document.getElementById("download").style.display = "none"

    try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&count=${count}`)
        const data = await res.json()
        currentVideos = data.videos || []

        if (currentVideos.length === 0) {
            setStatus("no videos found.")
            return
        }

        setStatus(`Found ${currentVideos.length} video(s)`)
        document.getElementById("download").style.display = "block"
        renderVideos()
    } catch (err) {
        setStatus("Error: " + err.message)
    } finally {
        btn.disabled = false
        btn.textContent = "Search"
    }
}

function renderVideos() {
    const grid = document.getElementById("results")
    grid.innerHTML = currentVideos.map((v, i) => `
                    <div class="card" id="card-${i}">
                    <img src="${v.thumbnail || ''}"
                        alt="${v.title || 'Video'}"
                        onerror="this.style.background='#333'" />
                    <div class="card-body">
                        <h3>${v.title || 'Untitled'}</h3>
                        <p class="source">${v.source || ''}
                            · ${v.duration || ''}</p>
                        <button id="btn-${i}"
                        onclick="downloadOne(${i})">Download</button>
                    </div>
                </div>
    `).join("")
}

const searchButton = document.getElementById("searchBtn")
searchButton.addEventListener("click", search)

async function downloadOne(index) {
    const video = currentVideos[index]
    const btn = document.getElementById(`btn-${index}`)

    btn.disabled = true
    btn.textContent = "Downloading..."

    try {
        const res = await fetch('/api/download', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: video.link, title: video.title })
        })
        const data = await res.json()

        if (data.success) {
            btn.textContent = "✓ Done"
            btn.classList.add("done")
        } else {
            btn.textContent = "✗ Failed"
            btn.classList.add("error")
            console.error(`Download failed for: ${video.link}`, data.error, data.details)
        }
    } catch (err) {
        btn.textContent = "✗ Failed"
        btn.classList.add("error")
        console.error(`Download error for: ${video.link}`, err)
    }
}

async function downloadAll() {
    setStatus("Downloading All videos...")
    for (let i = 0; i < currentVideos.length; i++) {
        const btn = document.getElementById(`btn-${i}`)
        if (btn && btn.classList.contains("done")) continue
        try {
            await downloadOne(i)
        } catch (err) {
            console.error(`Failed to download video ${i}:`, err)
        }
        setStatus(`Downloaded ${i + 1} of ${currentVideos.length}`)
    }
    setStatus("All downloads complete!")
}

const downloadAllBtn = document.getElementById("download")
downloadAllBtn.addEventListener("click", downloadAll)

function setStatus(msg) {
    document.getElementById("status").textContent = msg
}