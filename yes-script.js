/* ── Same YouTube song continues on the Yes page ── */
const YT_VIDEO_ID = 'v5Wl9_14GTY'
let ytFrame      = null
let musicPlaying = false

window.addEventListener('load', () => {
    launchConfetti()
    /* Auto-start music on yes page since user already clicked */
    startMusic()
})

function startMusic() {
    ytFrame = document.createElement('iframe')
    ytFrame.src = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&loop=1&playlist=${YT_VIDEO_ID}&controls=0&enablejsapi=0`
    ytFrame.allow = 'autoplay'
    ytFrame.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;bottom:0;right:0;border:none;'
    document.body.appendChild(ytFrame)
    musicPlaying = true
    document.getElementById('music-toggle').textContent = '🎵 Pause Music'
}

function toggleMusic() {
    const btn = document.getElementById('music-toggle')
    if (musicPlaying) {
        ytFrame.src = ''
        btn.textContent = '🎵 Play Music'
        musicPlaying = false
    } else {
        ytFrame.src = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&loop=1&playlist=${YT_VIDEO_ID}&controls=0&enablejsapi=0`
        btn.textContent = '🎵 Pause Music'
        musicPlaying = true
    }
}

function launchConfetti() {
    const colors = ['#9370db','#b39ddb','#7ec8e3','#ce93d8','#ffffff','#7b57c4','#c3b1e8','#e8d5ff']
    const duration = 6000
    const end = Date.now() + duration

    confetti({
        particleCount: 160,
        spread: 110,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    const interval = setInterval(() => {
        if (Date.now() > end) { clearInterval(interval); return }
        confetti({ particleCount: 40, angle: 60,  spread: 55, origin: { x: 0, y: 0.6 }, colors })
        confetti({ particleCount: 40, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors })
    }, 300)
}
