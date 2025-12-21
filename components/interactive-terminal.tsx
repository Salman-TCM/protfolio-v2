"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Send, Cpu, Zap, Shield, Globe, Github, Mail, User, HelpCircle } from "lucide-react"

/**
 * InteractiveTerminal - Advanced command-line interface with easter eggs
 * Features autocomplete, command history, and interactive responses
 */

// Command definitions with responses
const commands = {
  // Basic commands
  help: {
    description: "Show available commands",
    response: `╔════════════════════════════════════════════════════════════════╗
║                        AVAILABLE COMMANDS                        ║
╠══════════════════════════════════════════════════════════════╣
║ about          - Display information about Salman Hossain              ║
║ skills         - Show technical skills and expertise                ║
║ projects       - List featured projects                            ║
║ contact        - Display contact information                        ║
║ social         - Show social media links                           ║
║ status         - System status and metrics                         ║
║ matrix         - Toggle matrix rain effect                        ║
║ sound          - Toggle sound effects                              ║
║ clear          - Clear terminal screen                            ║
║ theme          - Change color theme (dark/light/cyberpunk)       ║
║ easter         - 🔥 SECRET EASTER EGGS 🔥                        ║
║ hacker         - Enter hacker mode                                ║
║ matrix-code    - 🐱‍🚀 SPECIAL CODE 🐱‍🚀                             ║
║ sudo           - 🚫 ACCESS DENIED 🚫                               ║
╚══════════════════════════════════════════════════════════════╝`,
    color: "cyan"
  },

  about: {
    description: "About Salman Hossain",
    response: `╔════════════════════════════════════════════════════════════╗
║                      MD. SALMAN HOSSAIN                        ║
╠════════════════════════════════════════════════════════════╣
║                                                              ║
║ 🎯 ROLE: Software Engineer @ TECHNOMETRICS LTD               ║
║ 📍 LOCATION: Dhaka, Bangladesh                              ║
║ 💼 EXPERIENCE: 3+ Years in Full-Stack Development           ║
║                                                              ║
║ 🚀 SPECIALIZATIONS:                                         ║
║   • Web Scraping & Data Extraction                           ║
║   • RESTful APIs & Microservices                            ║
║   • NLP & Machine Learning                                 ║
║   • Cloud Architecture & DevOps                             ║
║                                                              ║
║ 🎯 CORE COMPETENCIES:                                        ║
║   Python • Django • React • Node.js • Docker • AWS            ║
║                                                              ║
║ 📊 ACHIEVEMENTS:                                           ║
║   • Built scraping systems processing 1M+ requests/day        ║
║   • Developed NLP models with 98.7% accuracy               ║
║   • Architected scalable microservice infrastructure            ║
║                                                              ║
║ ⚡ CURRENT STATUS: AVAILABLE FOR FREELANCE PROJECTS         ║
║                                                              ║
╚════════════════════════════════════════════════════════════╝`,
    color: "magenta"
  },

  skills: {
    description: "Technical skills",
    response: `╔════════════════════════════════════════════════════════════╗
║                         TECHNICAL SKILLS                          ║
╠════════════════════════════════════════════════════════════╣
║                                                              ║
║ 🔥 PROGRAMMING LANGUAGES:                                     ║
║   [██████████░] PYTHON (95%)                                  ║
║   [████████░░░] JAVASCRIPT (80%)                              ║
║   [███████░░░░] JAVA (70%)                                    ║
║   [████████░░░] TYPESCRIPT (80%)                               ║
║                                                              ║
║ 🌐 BACKEND TECHNOLOGIES:                                      ║
║   [██████████░] DJANGO (95%)                                   ║
║   [████████░░░] NODE.JS (80%)                                 ║
║   [█████████░░] FASTAPI (90%)                                   ║
║   [███████░░░░] EXPRESS (75%)                                   ║
║                                                              ║
║ 🎨 FRONTEND TECHNOLOGIES:                                      ║
║   [████████░░░] REACT (85%)                                    ║
║   [███████░░░░] VUE.JS (75%)                                    ║
║   [█████████░░] HTML/CSS (90%)                                  ║
║                                                              ║
║ 🤖 AI/ML & DATA SCIENCE:                                     ║
║   [██████████░] SCIKIT-LEARN (95%)                               ║
║   [████████░░░] TENSORFLOW (80%)                                 ║
║   [████████░░░] NLTK (85%)                                      ║
║   [█████████░░] PANDAS (90%)                                    ║
║                                                              ║
║ ☁️ CLOUD & DEVOPS:                                           ║
║   [████████░░░] AWS (80%)                                       ║
║   [████████░░░] DOCKER (85%)                                    ║
║   [███████░░░░] KUBERNETES (70%)                                 ║
║   [█████████░░] GIT (90%)                                       ║
║                                                              ║
╚════════════════════════════════════════════════════════════╝`,
    color: "green"
  },

  projects: {
    description: "Featured projects",
    response: `╔════════════════════════════════════════════════════════════╗
║                        FEATURED PROJECTS                        ║
╠════════════════════════════════════════════════════════════╣
║                                                              ║
║ 🚀 WEB SCRAPING SYSTEM                                       ║
║   • Multi-threaded scraping infrastructure                      ║
║   • Proxy rotation & CAPTCHA bypass                            ║
║   • 1M+ requests/day processing capacity                      ║
║   • Tech: Python, Scrapy, Redis, Docker                      ║
║                                                              ║
║ 🤖 NLP CLASSIFICATION ENGINE                                   ║
║   • 98.7% accuracy text classification                        ║
║   • Real-time API with 120ms latency                         ║
║   • Multi-language support                                   ║
║   • Tech: Python, TensorFlow, FastAPI                        ║
║                                                              ║
║ 🌐 MICROSERVICES GATEWAY                                     ║
║   • High-performance API gateway                              ║
║   • Rate limiting & authentication                           ║
║   • 1M+ requests/day, 99.95% uptime                     ║
║   • Tech: Node.js, Express, MongoDB                          ║
║                                                              ║
║ 📊 REAL-TIME ANALYTICS DASHBOARD                                ║
║   • Interactive data visualization                           ║
║   • Live updates with WebSocket                               ║
║   • 50K+ users, 1M+ data points                          ║
║   • Tech: React, D3.js, WebSocket                          ║
║                                                              ║
║ 🛡️ SECURITY SCANNER                                           ║
║   • Automated vulnerability scanning                           ║
║   • Comprehensive reporting                                   ║
║   • 1000+ scans completed                                  ║
║   • Tech: Python, Nmap, Metasploit                         ║
║                                                              ║
║ 📱 BLOCKCHAIN WALLET                                          ║
║   • Multi-chain cryptocurrency support                       ║
║   • Hardware wallet integration                              ║
║   • DeFi & NFT support                                     ║
║   • Tech: Solidity, Web3.js, React                          ║
║                                                              ║
║ 💡 TYPE 'project [NAME]' FOR MORE DETAILS                      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`,
    color: "yellow"
  },

  contact: {
    description: "Contact information",
    response: `╔════════════════════════════════════════════════════════════╗
║                       CONTACT INFORMATION                       ║
╠════════════════════════════════════════════════════════════╣
║                                                              ║
║ 📧 EMAIL:                                                    ║
║   → salmann.hossain@gmail.com                              ║
║                                                              ║
║ 🔗 SOCIAL MEDIA:                                              ║
║   → GitHub: github.com/Salman-TCM                          ║
║   → LinkedIn: linkedin.com/in/salman                        ║
║   → Twitter: @salman_tech                                   ║
║                                                              ║
║ 💼 PROFESSIONAL:                                             ║
║   → Company: TECHNOMETRICS LTD                              ║
║   → Position: Software Engineer                               ║
║   → Location: Dhaka, Bangladesh                             ║
║                                                              ║
║ ⏰ AVAILABILITY:                                             ║
║   → Status: AVAILABLE FOR FREELANCE PROJECTS                ║
║   → Response Time: < 24 hours                              ║
║   → Preferred Contact: Email                                 ║
║                                                              ║
║ 🚀 READY TO COLLABORATE ON EXCITING PROJECTS!             ║
║                                                              ║
╚════════════════════════════════════════════════════════════════╝`,
    color: "purple"
  },

  social: {
    description: "Social media links",
    response: `╔════════════════════════════════════════════════════════════╗
║                         SOCIAL LINKS                            ║
╠════════════════════════════════════════════════════════════╣
║                                                              ║
║ 🐙 GITHUB:                                                   ║
║   → github.com/Salman-TCM                                   ║
║   📊 150+ repositories, 500+ stars                          ║
║   🔧 Active in open source development                         ║
║                                                              ║
║ 💼 LINKEDIN:                                                 ║
║   → linkedin.com/in/salman                                  ║
║   👥 1000+ professional connections                           ║
║   🏆 Endorsements in Python, Django, React                   ║
║                                                              ║
║ 🐦 TWITTER:                                                  ║
║   → @salman_tech                                            ║
║   💬 Tech tips & project updates                           ║
║   🤝 Active in developer community                          ║
║                                                              ║
║ 💬 DISCORD:                                                   ║
║   → SalmanTech#1337                                          ║
║   🎮 Gaming & tech discussions                            ║
║   🌟 Member of 50+ tech servers                           ║
║                                                              ║
║ 📱 INSTAGRAM:                                                 ║
║   → @salman.tech                                            ║
║   📸 Behind-the-scenes content                           ║
║   💻 Tech lifestyle & gadgets                             ║
║                                                              ║
║ 🔴 YOUTUBE:                                                  ║
║   → Coming Soon...                                           ║
║   🎥 Tech tutorials & project walkthroughs                ║
║   📅 Subscribe for updates                                   ║
║                                                              ║
╚════════════════════════════════════════════════════════════════╝`,
    color: "blue"
  },

  status: {
    description: "System status",
    response: `╔══════════════════════════════════════════════════════════════╗
║                          SYSTEM STATUS                            ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║ 🖥️ SYSTEM INFORMATION:                                         ║
║   → OS: Linux Ubuntu 22.04                                   ║
║   → CPU: Intel Core i7-12700K                                ║
║   → RAM: 32GB DDR4                                          ║
║   → Storage: 1TB NVMe SSD                                    ║
║                                                              ║
║ 📊 PERFORMANCE METRICS:                                         ║
║   → CPU Usage: 15%                                          ║
║   → Memory Usage: 8GB / 32GB                                 ║
║   → Network: 1Gbps Fiber                                     ║
║   → Uptime: 45 days, 12 hours, 30 minutes                   ║
║                                                              ║
║ 🌐 NETWORK STATUS:                                             ║
║   → Connection: STABLE                                         ║
║   → Latency: 12ms                                            ║
║   → Bandwidth: 950 Mbps                                       ║
║   → Status: ONLINE                                            ║
║                                                              ║
║ 🔧 DEVELOPMENT ENVIRONMENT:                                     ║
║   → Node.js: v18.17.0                                       ║
║   → Python: 3.11.4                                          ║
║   → Docker: 24.0.6                                           ║
║   → Git: 2.40.1                                               ║
║                                                              ║
║ ⚡ ACTIVE SERVICES:                                            ║
║   → Web Server: NGINX                                         ║
║   → Database: PostgreSQL 15                                      ║
║   → Cache: Redis 7.0                                          ║
║   → Monitoring: Prometheus + Grafana                             ║
║                                                              ║
║ 🟢 ALL SYSTEMS OPERATIONAL                                     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════════╝`,
    color: "green"
  },

  clear: {
    description: "Clear terminal",
    response: "",
    color: "white"
  },

  // Easter eggs
  easter: {
    description: "🔥 SECRET EASTER EGGS 🔥",
    response: `🎉 CONGRATULATIONS! YOU FOUND THE SECRET COMMAND! 🎉

╔══════════════════════════════════════════════════════════════╗
║                     🏆 EASTER EGG UNLOCKED 🏆                    ║
╠════════════════════════════════════════════════════════════════╣
║                                                              ║
║ 🐱‍🚀 TRY THESE SECRET COMMANDS:                                  ║
║                                                              ║
║ → sudo rm -rf /        - 💀 DANGER! DON'T TRY! 💀          ║
║ → matrix                 - 🌪️ ENTER THE MATRIX                ║
║ → hacker                 - 🎩 BECOME A HACKER                ║
║ → rickroll               - 🎵 NEVER GONNA GIVE YOU UP       ║
║ → ascii                  - 🎨 ASCII ART SHOW                  ║
║ → fortune                - 🔮 YOUR TECH FORTUNE             ║
║ → hackerman               - 💪 I'M IN! MAINFRAME ACCESS!      ║
║ → neo                    - 🕶️ FOLLOW THE WHITE RABBIT          ║
║ → trinity                - 💜 WAKE UP, NEO...               ║
║ → agent                  - 🔫 MR. ANDERSON...                  ║
║                                                              ║
║ 🎁 BONUS: Try 'matrix-code' for something special!          ║
║                                                              ║
║ 🤫 SHH... DON'T TELL ANYONE ABOUT THESE COMMANDS!           ║
║                                                              ║
╚════════════════════════════════════════════════════════════════╝`,
    color: "rainbow"
  },

  // Secret commands
  hacker: {
    description: "Enter hacker mode",
    response: `🎩 HACKER MODE ACTIVATED! 🎩

╔══════════════════════════════════════════════════════════════╗
║                    🚀 HACKER MODE ENABLED 🚀                      ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║ 💻 ACCESSING MAINFRAME...                                        ║
║ 🔓 BYPASSING FIREWALLS...                                      ║
║ 🌐 SCANNING NETWORK...                                          ║
║ 💾 DECRYPTING FILES...                                           ║
║                                                              ║
║ 🎯 TARGET ACQUIRED:                                            ║
║   → Pentagon Mainframe                                        ║
║   → Area 51 Servers                                          ║
║   → Alien Technology Database                                 ║
║                                                              ║
║ ⚡ INITIATING QUANTUM HACK...                                   ║
║ 🎮 LOADING MINIGAME...                                        ║
║                                                              ║
║ 🏁 RACE AGAINST TIME:                                          ║
║   [████████░░] 80% COMPLETE                                ║
║   TIME REMAINING: 00:60                                      ║
║                                                              ║
║ 🔥 YOU'RE THE CHOSEN ONE! 🔥                                   ║
║                                                              ║
║ 👾 INSERT COIN TO CONTINUE...                                    ║
║                                                              ║
╚════════════════════════════════════════════════════════════════╝`,
    color: "red"
  },

  matrix: {
    description: "Enter the matrix",
    response: `🌪️ WELCOME TO THE MATRIX 🌪️

╔══════════════════════════════════════════════════════════════╗
║                    🌐 MATRIX INTERFACE 🌐                       ║
╠════════════════════════════════════════════════════════════╣
║                                                              ║
║ 🕶️ REALITY DISTORTION DETECTED...                              ║
║ 🌊 ACTIVATING DIGITAL RAIN...                                  ║
║ 💊 BLUE PILL OR RED PILL?                                     ║
║                                                              ║
║ 🔴 RED PILL: Stay in wonderland                                 ║
║ 🔵 BLUE PILL: Believe whatever you want to believe            ║
║                                                              ║
║ 🐰 FOLLOW THE WHITE RABBIT...                                   ║
║ 🕳️ DOWN THE RABBIT HOLE WE GO...                               ║
║                                                              ║
║ 📞 PHONE RINGING...                                            ║
║ 👨‍💻 MORPHEUS: "The Matrix has you..."                         ║
║                                                              ║
║ 🎯 WAKE UP, NEO...                                             ║
║ 💪 THERE IS NO SPOON...                                        ║
║                                                              ║
║ 🏃‍♂️ RUN, NEO, RUN!                                            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════════╝`,
    color: "green"
  },

  "matrix-code": {
    description: "🐱‍🚀 SPECIAL CODE 🐱‍🚀",
    response: `🎉🎉🎉 LEGENDARY CODE ACTIVATED! 🎉🎉🎉

╔══════════════════════════════════════════════════════════════╗
║                🏆 YOU'RE A TRUE LEGEND! 🏆                   ║
╠══════════════════════════════════════════════════════════════════╣
║                                                              ║
║ 🐱‍🚀 CONGRATULATIONS, MASTER HACKER! 🐱‍🚀                     ║
║                                                              ║
 👏 YOU'VE UNLOCKED THE ULTIMATE SECRET! 👏
║                                                              ║
 💎 ACHIEVEMENT UNLOCKED: "MATRIX MASTER"                    ║
║                                                              ║
 🎁 REWARD: You now have admin access to this terminal!         ║
║                                                              ║
 🔧 NEW COMMANDS AVAILABLE:                                      ║
║   → god-mode              - Toggle god mode                     ║
║   → speed-hack             - 10x speed boost                   ║
║   → invisible              - Become invisible                  ║
║   → fly                   - Enable flight mode                 ║
║   → time-travel           - Travel through time               ║
║                                                              ║
 🌟 YOU'VE BECOME ONE WITH THE MATRIX! 🌟                   ║
║                                                              ║
 📞 MORPHEUS: "He's the one..."                               ║
║ 👑 THE CHOSEN ONE HAS ARRIVED!                               ║
║                                                              ║
 💪 WELCOME TO THE ELITE CLUB, NEO! 💪                   ║
║                                                              ║
╚════════════════════════════════════════════════════════════════════╝`,
    color: "gold"
  },

  ascii: {
    description: "ASCII art show",
    response: `
╔══════════════════════════════════════════════════════════════╗
║                        🎨 ASCII ART GALLERY 🎨                ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║ 🐱 ASCII CAT:                                                ║
║    /\\_/\\                                                     ║
║   ( o.o )                                                    ║
║    > ^ <                                                      ║
║                                                              ║
║ 🚀 ASCII ROCKET:                                             ║
║       |                                                       ║
║      /|\\                                                      ║
║     / | \\                                                     ║
║    |  |  |                                                    ║
║   /   |   \\                                                   ║
║  ---/ ---\\---                                                ║
║                                                              ║
║ 💻 ASCII COMPUTER:                                            ║
║   .--.                                                       ║
║  |o_o |                                                      ║
║  |:_/ |                                                      ║
║ //   \\ \\                                                     ║
║(|     | )                                                    ║
║/'\\_   _/\`\\                                                  ║
║ \\___)=(___/                                                   ║
║                                                              ║
║ 🎮 ASCII GAME:                                                ║
║   ██████╗  █████╗ ████████╗██╗  ██╗██╗     ██╗███╗   ██╗ █████╗  ║
║   ██╔══██╗██╔══██╗╚══██╔══╝██║  ██║██║     ██║████╗  ██║██╔══██╗ ║
║   ██║  ██║███████║   ██║   ███████║██║ █╗ ██║██╔██╗ ██║███████║ ║
║   ██║  ██║██╔══██║   ██║   ██╔══██║██║███╗██║██║╚██╗██║██╔══██║ ║
║   ██████╔╝██║  ██║   ██║   ██║  ██║╚███╔███╔╝██║ ╚████║██║  ██║ ║
║   ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝  ╚══╝╚══╝  ╚═╝  ╚═╝╚═╝  ╚═╝ ║
║                                                              ║
║ 🌟 ASCII STAR:                                               ║
║      *                                                       ║
║     ***                                                      ║
║    *****                                                     ║
║   *******                                                    ║
║    *****                                                     ║
║     ***                                                      ║
║      *                                                       ║
║                                                              ║
╚════════════════════════════════════════════════════════════════╝`,
    color: "magenta"
  },

  fortune: {
    description: "Tech fortune",
    response: `🔮 YOUR TECH FORTUNE 🔮

💫 The digital spirits have spoken... 💫

🌟 YOUR CODE WILL BE BUG-FREE TODAY! 🌟

🎯 TODAY'S LUCKY LANGUAGE: PYTHON 🎯

🚀 OPPORTUNITY KNOCKS: NEW PROJECT INCOMING! 🚀

💡 WISDOM: "First, solve the problem. Then, write the code." 💡

🔥 MOTIVATION: You're not just coding, you're creating magic! 🔥

🌈 TECH-VIBES: High performance, clean architecture, happy users! 🌈

🎊 CELEBRATE: You're doing amazing! Keep building! 🎊

⚡ POWER-UP: Your next commit will be legendary! ⚡

🏆 ACHIEVEMENT UNLOCKED: "Fortune Finder" 🏆

💫 MAY YOUR COMPILE TIMES BE SHORT AND YOUR COFFEE BE STRONG! 💫`,
    color: "cyan"
  },

  sudo: {
    description: "Admin access denied",
    response: `🚫 ACCESS DENIED 🚫

╔══════════════════════════════════════════════════════════════╗
║                     🛡️ SECURITY ALERT 🛡️                      ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║ ❌ UNAUTHORIZED SUDO ACCESS ATTEMPT DETECTED!                    ║
║                                                              ║
 👮‍♂️ ADMIN ONLY COMMAND                                        ║
║ 🔒 ACCESS LEVEL: INSUFFICIENT                                ║
║ 🚫 PERMISSION DENIED                                         ║
║                                                              ║
 🚨 SECURITY PROTOCOLS ACTIVATED:                              ║
║   → IP Address logged                                       ║
║   → Attempt timestamp recorded                              ║
║   → Admin notification sent                                ║
║                                                              ║
 ⚠️ WARNING: Continued attempts may result in:                     ║
║   → Terminal lockout                                       ║
║   → Network ban                                           ║
║   → Blacklist listing                                      ║
║                                                              ║
 🎯 SUGGESTION: Try 'help' for available commands                  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════════╝`,
    color: "red"
  },

  rickroll: {
    description: "🎵 Never gonna give you up!",
    response: `🎵🎶🎤 NEVER GONNA GIVE YOU UP! 🎤🎶🎵

╔══════════════════════════════════════════════════════════════╗
║                    🎪 RICKROLL PARTY! 🎪                       ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║ 🎤 NEVER GONNA GIVE YOU UP!                                    ║
║ 🎶 NEVER GONNA LET YOU DOWN!                                    ║
║ 🎵 NEVER GONNA RUN AROUND AND DESERT YOU!                     ║
║ 🎤 NEVER GONNA MAKE YOU CRY!                                    ║
║ 🎶 NEVER GONNA SAY GOODBYE!                                     ║
║ 🎵 NEVER GONNA TELL A LIE AND HURT YOU!                        ║
║                                                              ║
║ 🕺 DANCE MOVES:                                               ║
║   → 🕺💃 LEFT LEG IN, RIGHT LEG OUT                        ║
║   → 🤸‍♂️ SPIN AROUND, JUMP AROUND                           ║
║   → 🕺 SHAKE IT ALL ABOUT                                        ║
║                                                              ║
║ 🎮 MINIGAME: DANCE BATTLE!                                   ║
║   → YOUR SCORE: 9000+                                        ║
║   → RICK ASTLEY SCORE: 8000                                  ║
║   → RESULT: YOU WIN!                                         ║
║                                                              ║
║ 🏆 ACHIEVEMENT: "RICKROLL MASTER"                            ║
║                                                              ║
║ 😂 YOU GOT RICKROLLED! 😂                                       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════════╝`,
    color: "rainbow"
  }
}

export function InteractiveTerminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [theme, setTheme] = useState("cyberpunk")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Available commands for autocomplete
  const availableCommands = Object.keys(commands)

  // Process command
  const processCommand = useCallback(async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    
    if (!trimmedCmd) return

    setIsProcessing(true)

    // Add command to history
    setHistory(prev => [...prev, `> ${cmd}`])
    setInput("")

    // Parse command and arguments
    const [command, ...args] = trimmedCmd.split(" ")

    // Handle special commands
    if (command === "clear") {
      setHistory([])
      setIsProcessing(false)
      return
    }

    if (command === "theme" && args[0]) {
      setTheme(args[0])
      setHistory(prev => [...prev, `Theme changed to: ${args[0]}`])
      setIsProcessing(false)
      return
    }

    if (command === "matrix" || command === "m") {
      // Toggle matrix rain
      const event = new CustomEvent('toggleMatrix')
      window.dispatchEvent(event)
      setHistory(prev => [...prev, "Matrix rain toggled"])
      setIsProcessing(false)
      return
    }

    if (command === "sound") {
      setSoundEnabled(!soundEnabled)
      setHistory(prev => [...prev, `Sound effects ${!soundEnabled ? 'enabled' : 'disabled'}`])
      setIsProcessing(false)
      return
    }

    // Find command response
    const commandInfo = commands[command as keyof typeof commands]
    
    if (commandInfo) {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 500))
      setHistory(prev => [...prev, commandInfo.response])
    } else {
      // Unknown command
      await new Promise(resolve => setTimeout(resolve, 300))
      setHistory(prev => [
        ...prev,
        `❌ Command not found: ${command}`,
        `💡 Type 'help' for available commands`
      ])
    }

    setIsProcessing(false)
  }, [soundEnabled])

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        setCommandHistory(prev => [...prev, input])
        setHistoryIndex(-1)
        processCommand(input)
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      // Simple autocomplete
      const matchingCommands = availableCommands.filter(cmd => 
        cmd.startsWith(input.toLowerCase())
      )
      
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0])
      } else if (matchingCommands.length > 1) {
        setHistory(prev => [
          ...prev,
          `Available commands: ${matchingCommands.join(", ")}`
        ])
      }
    }
  }

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Get color class based on theme
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      cyan: "text-cyan-400",
      magenta: "text-magenta-400",
      purple: "text-purple-400",
      green: "text-green-400",
      yellow: "text-yellow-400",
      red: "text-red-400",
      blue: "text-blue-400",
      white: "text-white",
      gold: "text-yellow-300",
      rainbow: "bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent"
    }
    return colorMap[color] || colorMap.white
  }

  return (
    <div className="relative">
      {/* Terminal Container */}
      <div 
        className="bg-black border-2 border-green-400 rounded-none shadow-2xl shadow-green-400/20 overflow-hidden"
        style={{
          boxShadow: "0 0 30px rgba(34, 197, 94, 0.3), inset 0 0 20px rgba(34, 197, 94, 0.1)"
        }}
      >
        {/* Terminal Header */}
        <div className="bg-green-400/10 border-b border-green-400/30 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-mono text-sm font-bold">
              SALMAN-TERMINAL v2.0.1
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-mono">ONLINE</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="h-96 overflow-y-auto custom-scrollbar p-4 font-mono text-sm"
          style={{ minHeight: "400px" }}
        >
          {/* Welcome Message */}
          {history.length === 0 && (
            <div className="mb-4">
              <div className="text-green-400 font-bold mb-2">
                ╔══════════════════════════════════════════════════════════╗
                ║              🚀 WELCOME TO SALMAN'S TERMINAL! 🚀               ║
                ╠════════════════════════════════════════════════════════════╣
                ║                                                              ║
                ║ 💻 Type 'help' to see available commands                    ║
                ║ 🎮 Try easter eggs like 'hacker', 'matrix', 'ascii'           ║
                ║ 🌟 Discover secret commands by experimenting!                ║
                ║                                                              ║
                ║ 🔥 Ready to explore? Let's begin! 🔥                       ║
                ║                                                              ║
                ╚══════════════════════════════════════════════════════════════╝
              </div>
              <div className="text-gray-400 text-xs mt-2">
                System: {theme} mode | Sound: {soundEnabled ? "ON" : "OFF"} | Ready for input...
              </div>
            </div>
          )}

          {/* Command History */}
          <AnimatePresence>
            {history.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-1 whitespace-pre-wrap break-words"
              >
                {line.startsWith("> ") ? (
                  <span className="text-green-400">{line}</span>
                ) : line.includes("❌") ? (
                  <span className="text-red-400">{line}</span>
                ) : line.includes("💡") ? (
                  <span className="text-yellow-400">{line}</span>
                ) : line.includes("🔥") || line.includes("🚀") || line.includes("🎉") ? (
                  <span className="text-yellow-300">{line}</span>
                ) : line.includes("🛡️") || line.includes("🚫") ? (
                  <span className="text-red-400">{line}</span>
                ) : (
                  <span className="text-green-300">{line}</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Processing Indicator */}
          {isProcessing && (
            <motion.div
              className="text-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Processing...
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-green-400/30 px-4 py-3 bg-black/50">
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-mono">></span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-400 font-mono text-sm outline-none placeholder-green-400/50"
              placeholder="Enter command..."
              disabled={isProcessing}
              autoFocus
            />
            <Send className="w-4 h-4 text-green-400 opacity-70" />
          </div>
        </div>
      </div>

      {/* Terminal Effects Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scanlines */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              rgba(34, 197, 94, 0.1) 0px,
              transparent 1px,
              transparent 2px,
              rgba(34, 197, 94, 0.1) 3px
            )`,
            animation: 'scanlines 8s linear infinite'
          }}
        />
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0"
          style={{
            boxShadow: "inset 0 0 20px rgba(34, 197, 94, 0.2)"
          }}
        />
      </div>
    </div>
  )
}
