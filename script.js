/* ── GIF stages: swap these URLs with your own gifs/images if you want ── */
const gifStages = [
    "https://media1.tenor.com/m/_yOoMlrZ-4MAAAAd/happy-birthday.gif",   // 0 happy / start
    "https://media1.tenor.com/m/Vutvpp5uOiMAAAAd/wut-huh.gif", // 1 confused (No #1)
    "https://media1.tenor.com/m/0QfKDsSs-woAAAAd/puppy-eyes-staffie.gif",            // 2 pleading (No #2)
    "https://media1.tenor.com/m/STjTuyHNVmwAAAAC/dog-crying-meme-doggo-crys.gif",            // 3 sad (No #3)
    "https://media1.tenor.com/m/62FcJu-Cmc4AAAAd/sad-dog.gif",      // 4 sadder (No #4)
    "https://media1.tenor.com/m/NdyTDbwj2LIAAAAC/crying-dog.gif",            // 5 devastated (No #5 → runaway)
]

/* ── Phrases that go inside the No button ── */
const noPhrases = [
    "No",
    "Are you sure mai lob?",
    "Please go out with me baby",
    "You're going to make me cry baby",
    "Please beautiful",
    "Last chance amor 🥺",
]

const RUNAWAY_AT = 5   // which No click triggers runaway

let noClickCount   = 0
let runawayEnabled = false
let ytFrame        = null
let musicPlaying   = false

const mainGif = document.getElementById('main-gif')
const yesBtn  = document.getElementById('yes-btn')
const noBtn   = document.getElementById('no-btn')

/* ── Generate falling hearts ── */
const heartsBg = document.querySelector('.hearts-bg')
const symbols  = ['💜','🩵','💙','🌸','✨','💫','🫶','💕','🌷','⭐']
for (let i = 0; i < 30; i++) {
    const el = document.createElement('div')
    el.style.cssText = `
        position: absolute;
        top: -60px;
        left: ${Math.random() * 97}%;
        font-size: ${13 + Math.random() * 16}px;
        opacity: 0;
        animation: fall ${5 + Math.random() * 9}s ${Math.random() * 12}s linear infinite;
        user-select: none;
        pointer-events: none;
    `
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)]
    heartsBg.appendChild(el)
}

/* Keyframes injected via JS so the CSS file stays clean */
const styleTag = document.createElement('style')
styleTag.textContent = `
@keyframes fall {
    0%   { transform: translateY(0) rotate(0deg);    opacity: 0; }
    8%   { opacity: 0.9; }
    92%  { opacity: 0.7; }
    100% { transform: translateY(110vh) rotate(20deg); opacity: 0; }
}
`
document.head.appendChild(styleTag)

/* ── Yes button ── */
function handleYesClick() {
    window.location.href = 'yes.html'
}

/* ── No button ── */
function handleNoClick() {
    noClickCount++

    /* Swap gif */
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    /* Update No button text */
    const phraseIndex = Math.min(noClickCount, noPhrases.length - 1)
    noBtn.textContent = noPhrases[phraseIndex]

    /* Yes button grows */
    const curSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${curSize * 1.3}px`
    const padY = Math.min(16 + noClickCount * 6, 64)
    const padX = Math.min(44 + noClickCount * 12, 130)
    yesBtn.style.padding = `${padY}px ${padX}px`

    /* No button shrinks */
    const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
    noBtn.style.fontSize = `${Math.max(noSize * 0.82, 9)}px`
    const noPadY = Math.max(12 - noClickCount * 2, 4)
    const noPadX = Math.max(28 - noClickCount * 3, 8)
    noBtn.style.padding = `${noPadY}px ${noPadX}px`

    /* Enable runaway */
    if (noClickCount >= RUNAWAY_AT && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    mainGif.style.opacity = '0'
    setTimeout(() => {
        mainGif.src = src
        mainGif.style.opacity = '1'
    }, 220)
}

/* ── Runaway No button ── */
function enableRunaway() {
    noBtn.style.position = 'fixed'
    dodge()
    noBtn.addEventListener('mouseover',  dodge)
    noBtn.addEventListener('touchstart', dodge, { passive: true })
    /* Keep moving on mobile every 800ms */
    setInterval(() => { if (runawayEnabled) dodge() }, 800)
}

function dodge() {
    const margin = 20
    const maxX = window.innerWidth  - noBtn.offsetWidth  - margin
    const maxY = window.innerHeight - noBtn.offsetHeight - margin
    noBtn.style.left   = `${Math.random() * maxX + margin / 2}px`
    noBtn.style.top    = `${Math.random() * maxY + margin / 2}px`
    noBtn.style.zIndex = '50'
}
}
