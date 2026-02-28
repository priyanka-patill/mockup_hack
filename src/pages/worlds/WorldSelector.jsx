import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import princess from "../../assets/princess.png";
import marvel from "../../assets/marvel.png";
import pixar from "../../assets/pixar.png";
import castle from "../../assets/castle.png";
import soundFile from "../../assets/select.mp3";

// ── SVG Characters (unchanged) ────────────────────────────────────────────────

const MickeySVG = ({ walk }) => (
  <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
    <circle cx="14" cy="18" r="12" fill="#1a1a1a"/>
    <circle cx="46" cy="18" r="12" fill="#1a1a1a"/>
    <circle cx="30" cy="28" r="18" fill="#1a1a1a"/>
    <ellipse cx="30" cy="30" rx="13" ry="11" fill="#f4c2a1"/>
    <ellipse cx="24" cy="25" rx="3.5" ry="4" fill="white"/>
    <ellipse cx="36" cy="25" rx="3.5" ry="4" fill="white"/>
    <circle cx="25" cy="26" r="2" fill="#1a1a1a"/>
    <circle cx="37" cy="26" r="2" fill="#1a1a1a"/>
    <circle cx="26" cy="25" r="0.7" fill="white"/>
    <circle cx="38" cy="25" r="0.7" fill="white"/>
    <ellipse cx="30" cy="32" rx="4" ry="2.5" fill="#1a1a1a"/>
    <path d="M24 36 Q30 41 36 36" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <circle cx="20" cy="33" r="4" fill="#f4a0a0" opacity="0.6"/>
    <circle cx="40" cy="33" r="4" fill="#f4a0a0" opacity="0.6"/>
    <rect x="18" y="46" width="24" height="18" rx="4" fill="#cc0000"/>
    <circle cx="30" cy="52" r="2" fill="#ffcc00"/>
    <circle cx="30" cy="59" r="2" fill="#ffcc00"/>
    <circle cx="12" cy="55" r="7" fill="white" stroke="#ccc" strokeWidth="1"/>
    <circle cx="48" cy="55" r="7" fill="white" stroke="#ccc" strokeWidth="1"/>
    <ellipse cx={walk ? "20" : "22"} cy="70" rx="8" ry="4" fill="#f4c200"/>
    <ellipse cx={walk ? "40" : "38"} cy="73" rx="8" ry="4" fill="#f4c200"/>
  </svg>
);

const ElsaSVG = ({ walk }) => (
  <svg width="55" height="85" viewBox="0 0 55 85" fill="none">
    <ellipse cx="27" cy="22" rx="16" ry="20" fill="#a8d8f0"/>
    <ellipse cx="27" cy="20" rx="13" ry="15" fill="#fde8d8"/>
    <ellipse cx="22" cy="17" rx="3" ry="3.5" fill="#5bb8e8"/>
    <ellipse cx="32" cy="17" rx="3" ry="3.5" fill="#5bb8e8"/>
    <circle cx="23" cy="18" r="1.5" fill="#1a1a2e"/>
    <circle cx="33" cy="18" r="1.5" fill="#1a1a2e"/>
    <circle cx="23.5" cy="17" r="0.6" fill="white"/>
    <circle cx="33.5" cy="17" r="0.6" fill="white"/>
    <path d="M19 13 Q22 11 25 13" stroke="#c8a87a" strokeWidth="1.2" fill="none"/>
    <path d="M29 13 Q32 11 35 13" stroke="#c8a87a" strokeWidth="1.2" fill="none"/>
    <circle cx="27" cy="21" r="1.2" fill="#e8b89a"/>
    <path d="M23 25 Q27 28 31 25" stroke="#e87070" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <circle cx="19" cy="23" r="3.5" fill="#f4a0a0" opacity="0.5"/>
    <circle cx="35" cy="23" r="3.5" fill="#f4a0a0" opacity="0.5"/>
    <path d="M40 25 Q44 35 42 50 Q40 60 38 70" stroke="#a8d8f0" strokeWidth="7" strokeLinecap="round"/>
    <path d="M14 35 Q8 50 10 70 Q20 75 27 75 Q34 75 44 70 Q46 50 40 35 Z" fill="#6dd5f0"/>
    <circle cx="22" cy="50" r="1.5" fill="white" opacity="0.8"/>
    <circle cx="32" cy="55" r="1" fill="white" opacity="0.7"/>
    <rect x={walk ? "20" : "22"} y="72" width="5" height="10" rx="2" fill="#fde8d8"/>
    <rect x={walk ? "30" : "28"} y="75" width="5" height="8" rx="2" fill="#fde8d8"/>
    <ellipse cx={walk ? "22" : "24"} cy="82" rx="5" ry="3" fill="#5bb8e8"/>
    <ellipse cx={walk ? "32" : "30"} cy="83" rx="5" ry="3" fill="#5bb8e8"/>
  </svg>
);

const SpidermanSVG = ({ walk }) => (
  <svg width="55" height="82" viewBox="0 0 55 82" fill="none">
    <circle cx="27" cy="20" r="16" fill="#cc0000"/>
    <ellipse cx="21" cy="18" rx="6" ry="5" fill="white" stroke="#800000" strokeWidth="0.5"/>
    <ellipse cx="33" cy="18" rx="6" ry="5" fill="white" stroke="#800000" strokeWidth="0.5"/>
    <ellipse cx="21" cy="18" rx="4.5" ry="3.8" fill="#e8e8e8"/>
    <ellipse cx="33" cy="18" rx="4.5" ry="3.8" fill="#e8e8e8"/>
    <path d="M14 36 Q10 50 12 68 Q20 72 27 72 Q34 72 42 68 Q44 50 40 36 Z" fill="#cc0000"/>
    <path d="M14 36 Q10 50 12 65 L18 68 L18 36 Z" fill="#1144cc"/>
    <path d="M40 36 L36 36 L36 68 L42 65 Q44 50 40 36 Z" fill="#1144cc"/>
    <path d={walk ? "M14 40 Q5 52 8 62" : "M14 40 Q4 50 6 60"} stroke="#cc0000" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d={walk ? "M40 40 Q49 48 47 60" : "M40 40 Q50 50 48 60"} stroke="#cc0000" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M18 70 Q16 76 15 82" stroke="#1144cc" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M36 70 Q38 76 39 82" stroke="#1144cc" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <ellipse cx={walk ? "14" : "15"} cy="80" rx="7" ry="4" fill="#cc0000"/>
    <ellipse cx={walk ? "40" : "39"} cy="80" rx="7" ry="4" fill="#cc0000"/>
  </svg>
);

const WoodySVG = ({ walk }) => (
  <svg width="52" height="82" viewBox="0 0 52 82" fill="none">
    <ellipse cx="26" cy="8" rx="18" ry="4" fill="#8B4513"/>
    <rect x="16" y="2" width="20" height="8" rx="2" fill="#8B4513"/>
    <ellipse cx="26" cy="22" rx="13" ry="14" fill="#f4d4a0"/>
    <ellipse cx="21" cy="19" rx="3" ry="3.5" fill="white"/>
    <ellipse cx="31" cy="19" rx="3" ry="3.5" fill="white"/>
    <circle cx="22" cy="20" r="1.8" fill="#4a3000"/>
    <circle cx="32" cy="20" r="1.8" fill="#4a3000"/>
    <path d="M12 40 Q8 55 10 72 Q18 76 26 76 Q34 76 42 72 Q44 55 40 40 Z" fill="#f4c840"/>
    <path d="M18 40 L16 72 L26 74 L36 72 L34 40 Z" fill="#cc4400"/>
    <path d="M18 40 L22 72 L26 74 L30 72 L34 40 Z" fill="#f4c840"/>
    <polygon points="26,44 27.5,48 31,48 28.5,51 29.5,55 26,52.5 22.5,55 23.5,51 21,48 24.5,48" fill="#f4c840" stroke="#c8a000" strokeWidth="0.5"/>
    <rect x={walk ? "14" : "16"} y="73" width="8" height="9" rx="2" fill="#4a6fa5"/>
    <rect x={walk ? "30" : "28"} y="76" width="8" height="7" rx="2" fill="#4a6fa5"/>
    <ellipse cx={walk ? "18" : "20"} cy="82" rx="7" ry="4" fill="#8B4513"/>
    <ellipse cx={walk ? "34" : "32"} cy="82" rx="7" ry="4" fill="#8B4513"/>
  </svg>
);

const NemoSVG = () => (
  <svg width="70" height="50" viewBox="0 0 70 50" fill="none">
    <ellipse cx="32" cy="28" rx="22" ry="16" fill="#ff6b2b"/>
    <path d="M28 12 Q30 28 28 44" stroke="white" strokeWidth="5" fill="none"/>
    <path d="M42 13 Q44 28 42 43" stroke="white" strokeWidth="4" fill="none"/>
    <path d="M10 20 Q0 10 2 28 Q0 45 10 36 Z" fill="#ff6b2b"/>
    <ellipse cx="20" cy="32" rx="7" ry="4" fill="#e85a1a" transform="rotate(-20 20 32)"/>
    <circle cx="46" cy="22" r="7" fill="white"/>
    <circle cx="47" cy="22" r="4.5" fill="#1a6030"/>
    <circle cx="47" cy="22" r="2.5" fill="#0a3018"/>
    <circle cx="48.5" cy="20.5" r="1.2" fill="white"/>
    <circle cx="58" cy="14" r="3" fill="none" stroke="rgba(150,220,255,0.8)" strokeWidth="1.5"/>
    <circle cx="64" cy="8" r="2" fill="none" stroke="rgba(150,220,255,0.7)" strokeWidth="1.2"/>
  </svg>
);

const WalleSVG = ({ walk }) => (
  <svg width="58" height="75" viewBox="0 0 58 75" fill="none">
    <rect x="4" y="58" width="18" height="12" rx="3" fill="#8B7355"/>
    <rect x="36" y="58" width="18" height="12" rx="3" fill="#8B7355"/>
    <rect x="10" y="35" width="38" height="28" rx="4" fill="#c8a870"/>
    <path d="M27 53 Q29 50 32 53 Q35 50 37 53 Q37 57 32 61 Q27 57 27 53 Z" fill="#e84040" opacity="0.9"/>
    <rect x="22" y="20" width="14" height="18" rx="3" fill="#b09060"/>
    <rect x="12" y="6" width="34" height="18" rx="5" fill="#c8a870"/>
    <rect x="15" y="9" width="10" height="10" rx="3" fill="#1a2a3a"/>
    <rect x="33" y="9" width="10" height="10" rx="3" fill="#1a2a3a"/>
    <circle cx="20" cy="14" r="3" fill="#60c0ff"/>
    <circle cx="38" cy="14" r="3" fill="#60c0ff"/>
    <circle cx="21" cy="13" r="1.2" fill="white" opacity="0.8"/>
    <circle cx="39" cy="13" r="1.2" fill="white" opacity="0.8"/>
    <rect x={walk ? "0" : "2"} y="38" width="10" height="5" rx="2" fill="#b09060"/>
    <rect x={walk ? "48" : "46"} y="42" width="10" height="5" rx="2" fill="#b09060"/>
    <rect x="25" y="0" width="3" height="8" rx="1" fill="#a08850"/>
    <circle cx="26.5" cy="0" r="3" fill="#f4c840"/>
  </svg>
);

const BuzzSVG = ({ walk }) => (
  <svg width="56" height="82" viewBox="0 0 56 82" fill="none">
    <circle cx="28" cy="20" r="16" fill="#f4d4a0"/>
    <ellipse cx="22" cy="19" rx="3.5" ry="4" fill="white"/>
    <ellipse cx="34" cy="19" rx="3.5" ry="4" fill="white"/>
    <circle cx="23" cy="20" r="2" fill="#2a2a2a"/>
    <circle cx="35" cy="20" r="2" fill="#2a2a2a"/>
    <path d="M12 36 Q8 52 10 70 Q18 74 28 74 Q38 74 46 70 Q48 52 44 36 Z" fill="#e8e8e8"/>
    <path d="M16 36 L14 68 L22 72 L22 40 Z" fill="#40a840"/>
    <path d="M40 36 L42 68 L34 72 L34 40 Z" fill="#40a840"/>
    <circle cx="28" cy="48" r="6" fill="#2a5fa0"/>
    <circle cx="28" cy="48" r="4" fill="#60aaff"/>
    <circle cx="22" cy="56" r="3" fill="#cc0000"/>
    <circle cx="28" cy="56" r="3" fill="#40a840"/>
    <circle cx="34" cy="56" r="3" fill="#f4c840"/>
    <path d="M8 42 Q0 36 4 52 Q6 58 12 54 Z" fill="#a0d4f4" opacity="0.7"/>
    <path d="M48 42 Q56 36 52 52 Q50 58 44 54 Z" fill="#a0d4f4" opacity="0.7"/>
    <rect x={walk ? "14" : "16"} y="71" width="9" height="10" rx="3" fill="#2a5fa0"/>
    <rect x={walk ? "33" : "31"} y="74" width="9" height="8" rx="3" fill="#2a5fa0"/>
    <ellipse cx={walk ? "18" : "20"} cy="82" rx="7" ry="4" fill="#1a3f80"/>
    <ellipse cx={walk ? "37" : "35"} cy="82" rx="7" ry="4" fill="#1a3f80"/>
  </svg>
);

// ── Character config ──────────────────────────────────────────────────────────
const CHAR_CONFIG = [
  { id:1, Comp:MickeySVG,    name:"Mickey",    line:"Ha-ha! Welcome!",           laughs:["Hahaha! 😄","Ha-ha-ha!"],           lane:74, speed:20, delay:0  },
  { id:2, Comp:ElsaSVG,      name:"Elsa",      line:"Let it go! ❄️",             laughs:["Tee-hee! 🤭","*giggles* ❄️"],       lane:62, speed:24, delay:4  },
  { id:3, Comp:SpidermanSVG, name:"Spidey",    line:"Your friendly neighbor! 🕷️",laughs:["Hehe! 😄","LOL! 🕷️"],             lane:54, speed:19, delay:7  },
  { id:4, Comp:WoodySVG,     name:"Woody",     line:"Yeehaw partner! 🤠",        laughs:["Haw-haw! 😂","Yeehee!"],            lane:68, speed:22, delay:2  },
  { id:5, Comp:NemoSVG,      name:"Nemo",      line:"Just keep swimming! 🐠",    laughs:["Blub-blub! 😆","Hehe!"],            lane:80, speed:17, delay:10 },
  { id:6, Comp:WalleSVG,     name:"WALL-E",    line:"WALL-E! ❤️",                laughs:["Beep-boop! 🤖","WALL-E! 😄"],       lane:58, speed:15, delay:5  },
  { id:7, Comp:BuzzSVG,      name:"Buzz",      line:"To infinity! 🚀",           laughs:["Ha! 😄","Hahaha! 🚀"],             lane:71, speed:21, delay:8  },
];

// ── Walking character ─────────────────────────────────────────────────────────
function WalkingChar({ config }) {
  const { Comp, name, line, laughs, lane, speed, delay } = config;
  const [posX, setPosX]       = useState(-120);
  const [flipped, setFlipped] = useState(false);
  const [bounceY, setBounceY] = useState(0);
  const [bubble, setBubble]   = useState(null);
  const [walking, setWalking] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    let x = delay % 2 === 0 ? -120 : window.innerWidth + 120;
    let dir = delay % 2 === 0 ? 1 : -1;
    let elapsed = 0, lastT = null;
    const W = window.innerWidth, pps = W / speed;
    const step = (t) => {
      if (!lastT) lastT = t;
      const dt = (t - lastT) / 1000; lastT = t; elapsed += dt;
      x += dir * pps * dt;
      setBounceY(Math.sin(elapsed * 5) * 5);
      setWalking(Math.sin(elapsed * 8) > 0);
      if (dir === 1 && x > W + 120) { dir = -1; setFlipped(true); }
      if (dir === -1 && x < -120)   { dir =  1; setFlipped(false); }
      setPosX(x);
      rafRef.current = requestAnimationFrame(step);
    };
    const t = setTimeout(() => { rafRef.current = requestAnimationFrame(step); }, delay * 1000);
    return () => { clearTimeout(t); cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => {
    const schedule = () => {
      const wait = 5000 + Math.random() * 12000 + delay * 900;
      return setTimeout(() => {
        const isLaugh = Math.random() < 0.4;
        setBubble({ text: isLaugh ? laughs[Math.floor(Math.random()*laughs.length)] : line, laugh: isLaugh });
        setTimeout(() => { setBubble(null); schedule(); }, 2600);
      }, wait);
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position:"absolute", left:posX, top:`${lane}%`,
      transform:`translateY(${bounceY}px) scaleX(${flipped ? -1 : 1})`,
      display:"flex", flexDirection:"column", alignItems:"center",
      zIndex:3, pointerEvents:"none", userSelect:"none",
      filter:"drop-shadow(0 6px 14px rgba(0,0,0,0.45))",
    }}>
      {bubble && (
        <div style={{
          position:"absolute", bottom:"100%", left:"50%",
          transform:flipped ? "translateX(50%) scaleX(-1)" : "translateX(-50%)",
          background:"rgba(255,255,255,0.96)", color:"#1a0a3a",
          fontSize:"12px", fontWeight:700, padding:"7px 13px",
          borderRadius:"16px", whiteSpace:"nowrap",
          boxShadow:"0 4px 24px rgba(120,40,220,0.25)",
          animation:"bubblePop 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          marginBottom:"8px", border:"1.5px solid rgba(168,85,247,0.3)",
          zIndex:10,
        }}>
          {bubble.text}
          <div style={{ position:"absolute", bottom:"-8px", left:"50%", transform:"translateX(-50%)", width:0, height:0, borderLeft:"8px solid transparent", borderRight:"8px solid transparent", borderTop:"9px solid rgba(255,255,255,0.96)" }}/>
        </div>
      )}
      <div style={{ animation:bubble?.laugh ? "shake 0.12s ease-in-out infinite" : "none" }}>
        <Comp walk={walking}/>
      </div>
      <div style={{
        background:"rgba(20,5,50,0.72)", color:"rgba(220,180,255,0.92)",
        fontSize:"9px", fontWeight:800, padding:"2px 9px",
        borderRadius:"8px", letterSpacing:"0.12em", textTransform:"uppercase",
        marginTop:"2px", border:"1px solid rgba(168,85,247,0.3)",
        transform:flipped ? "scaleX(-1)" : "scaleX(1)",
      }}>{name}</div>
    </div>
  );
}

// ── World cards ───────────────────────────────────────────────────────────────
const worlds = [
  {
    name:"Princess", image:princess, path:"/princess",
    tagline:"Enter the Enchanted Kingdom",
    bg:"linear-gradient(160deg,#a855f7 0%,#7c3aed 45%,#4c1d95 100%)",
    glow:"rgba(168,85,247,0.9)",
    accent:"#e9d5ff",
    particles:["✨","👑","🌸","💜","⭐","❄️","🌺"],
    isPrincess:true,
  },
  {
    name:"Marvel", image:marvel, path:"/marvel",
    tagline:"Become the Hero",
    bg:"linear-gradient(160deg,#ef4444,#dc2626,#b91c1c)",
    glow:"rgba(239,68,68,0.8)",
    accent:"#fca5a5",
    particles:["⚡","💥","🔥","🛡️","⭐"],
    isPrincess:false,
  },
  {
    name:"Pixar", image:pixar, path:"/pixar",
    tagline:"Where Magic Comes Alive",
    bg:"linear-gradient(160deg,#3b82f6,#1d4ed8,#1e40af)",
    glow:"rgba(59,130,246,0.8)",
    accent:"#93c5fd",
    particles:["🎬","🌈","🎭","⭐","🎪"],
    isPrincess:false,
  },
];

// ── Floating stars for bg ─────────────────────────────────────────────────────
const BG_STARS = Array.from({length:80}, () => ({
  w: Math.random()*2.4+0.6,
  top: Math.random()*100, left: Math.random()*100,
  opacity: Math.random()*0.52+0.14,
  dur: Math.random()*3+2, delay: Math.random()*5,
}));

// ── Princess-themed glowing particles overlay ─────────────────────────────────
const PRINCESS_PARTICLES = ["✨","👑","🌸","💜","⭐","❄️","🌺","💫","🌟","🏮"];
const FG_PARTICLES = Array.from({length:14}, (_, i) => ({
  emoji: PRINCESS_PARTICLES[i % PRINCESS_PARTICLES.length],
  top: Math.random()*88, left: Math.random()*100,
  size: Math.random()*12+10, opacity: Math.random()*0.28+0.1,
  dur: Math.random()*8+6, delay: Math.random()*6,
}));

// ── Main ─────────────────────────────────────────────────────────────────────
export default function WorldSelector() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [locked, setLocked]   = useState(false);
  const cardRefs    = useRef([]);
  const containerRef = useRef(null);
  const titleRef    = useRef(null);
  const audio = useRef(new Audio(soundFile));

  useEffect(() => {
    // Title entrance
    gsap.fromTo(titleRef.current,
      { y:-50, opacity:0 },
      { y:0, opacity:1, duration:1, ease:"back.out(2)", delay:0.2 }
    );
    // Cards entrance + float
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { y:80, opacity:0 },
        { y:0, opacity:1, duration:0.9, delay:0.5+i*0.18, ease:"back.out(1.7)" }
      );
      gsap.to(card, { y:"-=14", duration:2.4+i*0.5, repeat:-1, yoyo:true, ease:"sine.inOut", delay:1.5 });
    });
  }, []);

  const handleClick = (path, index) => {
    if (locked) return;
    setLocked(true);
    audio.current.currentTime = 0;
    audio.current.play().catch(()=>{});
    cardRefs.current.forEach((card,i) => {
      if (i !== index) gsap.to(card, { opacity:0, scale:0.8, duration:0.4, delay:0.1 });
    });
    gsap.to(cardRefs.current[index], {
      scale:1.12, y:-30, duration:0.3, yoyo:true, repeat:1, ease:"power2.out",
      onComplete: () => gsap.to(containerRef.current, {
        opacity:0, duration:0.5, onComplete:()=>navigate(path)
      }),
    });
  };

  return (
    <div ref={containerRef} style={{
      minHeight:"100vh",
      // Deep princess night sky — matches PrincessWorld exactly
      background:"linear-gradient(to bottom, #07001a 0%, #140030 18%, #220048 35%, #300060 52%, #200048 70%, #0e0028 85%, #07001a 100%)",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      position:"relative", overflow:"hidden", fontFamily:"Georgia, serif",
    }}>

      {/* ── STATIC STAR FIELD ── */}
      {BG_STARS.map((s,i) => (
        <div key={i} style={{
          position:"absolute",
          width:`${s.w}px`, height:`${s.w}px`, borderRadius:"50%",
          background:"white",
          top:`${s.top}%`, left:`${s.left}%`,
          opacity:s.opacity,
          animation:`twinkleStar ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
          pointerEvents:"none", zIndex:0,
        }}/>
      ))}

      {/* ── LARGE NEBULA GLOWS ── */}
      <div style={{ position:"absolute", top:"5%", left:"8%", width:"500px", height:"420px", borderRadius:"50%", background:"radial-gradient(circle,rgba(168,85,247,0.24) 0%,transparent 70%)", filter:"blur(65px)", pointerEvents:"none", zIndex:0 }}/>
      <div style={{ position:"absolute", bottom:"6%", right:"6%", width:"420px", height:"420px", borderRadius:"50%", background:"radial-gradient(circle,rgba(236,72,153,0.18) 0%,transparent 70%)", filter:"blur(65px)", pointerEvents:"none", zIndex:0 }}/>
      <div style={{ position:"absolute", top:"38%", left:"42%", transform:"translate(-50%,-50%)", width:"600px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle,rgba(125,211,252,0.06) 0%,transparent 70%)", filter:"blur(80px)", pointerEvents:"none", zIndex:0 }}/>
      <div style={{ position:"absolute", top:"22%", right:"18%", width:"280px", height:"280px", borderRadius:"50%", background:"radial-gradient(circle,rgba(192,132,252,0.14) 0%,transparent 70%)", filter:"blur(50px)", pointerEvents:"none", zIndex:0 }}/>

      {/* ── FLOATING PRINCESS PARTICLES ── */}
      {FG_PARTICLES.map((p,i) => (
        <div key={i} style={{
          position:"absolute", fontSize:`${p.size}px`,
          top:`${p.top}%`, left:`${p.left}%`, opacity:p.opacity,
          pointerEvents:"none", zIndex:2,
          animation:`floatParticle ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
        }}>{p.emoji}</div>
      ))}

      {/* ── ENCHANTED CASTLE (silhouette in moonlight) ── */}
      <img src={castle} alt="" style={{
        position:"absolute", bottom:"9%",
        width:"60%", maxWidth:"680px",
        left:"50%", transform:"translateX(-50%)",
        objectFit:"contain",
        opacity:0.28,
        filter:"brightness(0.4) saturate(0.3) hue-rotate(240deg)",
        pointerEvents:"none", zIndex:2,
      }}/>

      {/* ── MOONLIT GROUND ── */}
      <svg style={{ position:"absolute", bottom:0, left:0, width:"100%", zIndex:2, pointerEvents:"none" }} viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
        <path d="M0 70 Q360 40 720 55 Q1080 70 1440 48 L1440 120 L0 120 Z" fill="rgba(60,20,100,0.55)"/>
        <path d="M0 88 Q240 72 480 80 Q720 88 960 76 Q1200 64 1440 76 L1440 120 L0 120 Z" fill="rgba(40,10,70,0.75)"/>
        <path d="M0 100 Q360 92 720 97 Q1080 102 1440 95 L1440 120 L0 120 Z" fill="rgba(22,5,44,0.92)"/>
      </svg>

      {/* ── MOON ── */}
      <div style={{
        position:"absolute", top:"5%", right:"9%",
        width:"82px", height:"82px", borderRadius:"50%",
        background:"radial-gradient(circle at 40% 38%, #fff9e0 0%, #ffe880 40%, #ffd040 72%, transparent 100%)",
        boxShadow:"0 0 60px 18px rgba(255,220,80,0.3), 0 0 130px 40px rgba(255,200,50,0.12)",
        zIndex:1, pointerEvents:"none",
      }}/>
      {/* Moon halo */}
      <div style={{
        position:"absolute", top:"3.5%", right:"7.5%",
        width:"106px", height:"106px", borderRadius:"50%",
        border:"1px solid rgba(255,220,80,0.18)",
        boxShadow:"0 0 40px 10px rgba(255,200,60,0.1)",
        pointerEvents:"none", zIndex:1,
      }}/>

      {/* ── WALKING CHARACTERS (now with night-friendly shadow) ── */}
      {CHAR_CONFIG.map(cfg => <WalkingChar key={cfg.id} config={cfg}/>)}

      {/* ── SPARKLE OVERLAYS ── */}
      {[...Array(10)].map((_,i) => (
        <div key={i} style={{
          position:"absolute", fontSize:"16px",
          top:`${Math.random()*72}%`, left:`${Math.random()*100}%`,
          opacity:0.4, pointerEvents:"none", zIndex:4,
          animation:`floatUp ${Math.random()*5+4}s ease-in-out ${Math.random()*6}s infinite`,
        }}>
          {["✨","⭐","🌟","💫"][i%4]}
        </div>
      ))}

      {/* ── HEADER ── */}
      <div ref={titleRef} style={{ textAlign:"center", marginBottom:"44px", zIndex:10, padding:"0 16px", position:"relative" }}>
        {/* Princess badge */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap:"8px",
          background:"rgba(168,85,247,0.14)", border:"1.5px solid rgba(168,85,247,0.45)",
          color:"rgba(220,180,255,0.88)", fontSize:"11px", fontWeight:800,
          letterSpacing:"0.28em", textTransform:"uppercase",
          padding:"7px 22px", borderRadius:"999px", marginBottom:"18px",
          boxShadow:"0 4px 24px rgba(168,85,247,0.22)",
        }}>
          <span style={{ fontSize:"14px" }}>✦</span>
          Disney Interactive Experience
          <span style={{ fontSize:"14px" }}>✦</span>
        </div>

        <h1 style={{
          fontSize:"clamp(36px, 5.2vw, 68px)", fontWeight:900, margin:"0 0 12px",
          letterSpacing:"-0.02em", fontFamily:"Georgia, serif",
          color:"#ffffff",
          textShadow:"0 0 70px rgba(192,132,252,0.7), 0 0 30px rgba(168,85,247,0.5), 0 4px 24px rgba(0,0,0,0.9)",
        }}>
          Choose Your World
        </h1>

        <p style={{
          color:"rgba(192,150,255,0.72)", fontSize:"13px",
          letterSpacing:"0.22em", textTransform:"uppercase",
          margin:0, fontWeight:700, fontFamily:"system-ui,sans-serif",
        }}>
          ✦ &nbsp; Select a realm to begin your journey &nbsp; ✦
        </p>
      </div>

      {/* ── WORLD CARDS ── */}
      <div style={{ display:"flex", gap:"28px", flexWrap:"wrap", justifyContent:"center", zIndex:10, padding:"0 24px", position:"relative" }}>
        {worlds.map((world, index) => (
          <div
            key={index}
            ref={el => cardRefs.current[index] = el}
            onClick={() => !locked && handleClick(world.path, index)}
            onMouseEnter={() => !locked && setHovered(index)}
            onMouseLeave={() => !locked && setHovered(null)}
            style={{
              cursor:locked ? "default" : "pointer",
              width:"222px", borderRadius:"26px", overflow:"hidden",
              background: world.bg,
              border: hovered===index
                ? "2.5px solid rgba(255,255,255,0.75)"
                : world.isPrincess
                  ? "2px solid rgba(192,132,252,0.42)"
                  : "2px solid rgba(255,255,255,0.22)",
              boxShadow: hovered===index
                ? `0 0 60px 16px ${world.glow}, 0 22px 55px rgba(0,0,0,0.55)`
                : world.isPrincess
                  ? `0 0 30px 6px rgba(168,85,247,0.25), 0 12px 40px rgba(0,0,0,0.5)`
                  : "0 12px 40px rgba(0,0,0,0.45)",
              transform: hovered===index ? "scale(1.07)" : "scale(1)",
              transition:"transform 0.25s, box-shadow 0.25s, border 0.25s",
              position:"relative",
            }}
          >
            {/* Shimmer line top */}
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"linear-gradient(to right,transparent,rgba(255,255,255,0.7),transparent)" }}/>
            {/* Inner glow top */}
            <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"170px", height:"130px", borderRadius:"50%", background:"rgba(255,255,255,0.2)", filter:"blur(28px)", pointerEvents:"none" }}/>

            {/* Princess "MAGICAL" badge */}
            {world.isPrincess && (
              <div style={{
                position:"absolute", top:"10px", right:"10px",
                background:"rgba(168,85,247,0.85)", color:"#fff",
                fontSize:"8px", fontWeight:900, letterSpacing:"0.22em",
                textTransform:"uppercase", padding:"3px 9px", borderRadius:"999px",
                border:"1px solid rgba(255,255,255,0.35)", zIndex:20,
                boxShadow:"0 0 12px rgba(168,85,247,0.6)",
                animation:"magicBadge 2s ease-in-out infinite alternate",
              }}>✨ Magical</div>
            )}

            {/* Hover particles */}
            {hovered===index && world.particles.map((emoji,pi) => (
              <span key={pi} style={{
                position:"absolute", fontSize:"18px",
                top:`${pi*16+4}%`, left:pi%2===0 ? "4%" : "78%",
                pointerEvents:"none", zIndex:20,
                animation:`bounce 0.7s ease-in-out ${pi*0.1}s infinite alternate`,
              }}>{emoji}</span>
            ))}

            {/* Image */}
            <div style={{ padding:"26px 16px 8px", display:"flex", justifyContent:"center", position:"relative", zIndex:10 }}>
              <img src={world.image} alt={world.name} style={{
                height:"200px", width:"160px", objectFit:"contain",
                filter: hovered===index
                  ? `drop-shadow(0 0 26px rgba(255,255,255,0.85)) brightness(1.12)`
                  : "drop-shadow(0 8px 22px rgba(0,0,0,0.45))",
                transition:"filter 0.3s",
              }}/>
            </div>

            {/* Footer */}
            <div style={{ padding:"10px 18px 22px", background:"rgba(0,0,0,0.28)", textAlign:"center", position:"relative", zIndex:10 }}>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:"5px",
                background:"rgba(255,255,255,0.14)", border:"1px solid rgba(255,255,255,0.28)",
                borderRadius:"999px", padding:"3px 12px",
                fontSize:"10px", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase",
                color:world.accent, marginBottom:"10px",
                fontFamily:"system-ui,sans-serif",
              }}>
                <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:world.accent, display:"inline-block" }}/>
                World
              </div>
              <h2 style={{ color:"#fff", fontSize:"22px", fontWeight:900, margin:"0 0 4px", textShadow:"0 2px 12px rgba(0,0,0,0.5)", fontFamily:"Georgia,serif" }}>{world.name}</h2>
              <p style={{ color:"rgba(255,255,255,0.75)", fontSize:"12px", margin:"0 0 12px", fontFamily:"system-ui,sans-serif" }}>{world.tagline}</p>
              <div style={{
                padding:"10px", borderRadius:"12px",
                background: hovered===index ? "rgba(255,255,255,0.26)" : "rgba(255,255,255,0.09)",
                border: hovered===index ? "1px solid rgba(255,255,255,0.5)" : "1px solid rgba(255,255,255,0.17)",
                color:"#fff", fontSize:"12px", fontWeight:700,
                letterSpacing:"0.15em", textTransform:"uppercase",
                transition:"all 0.25s", fontFamily:"Georgia,serif",
              }}>
                {hovered===index ? "Enter →" : "Explore"}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p style={{
        marginTop:"36px", color:"rgba(192,150,255,0.55)", fontSize:"11px",
        letterSpacing:"0.32em", textTransform:"uppercase",
        zIndex:10, position:"relative", fontWeight:700,
        fontFamily:"system-ui,sans-serif",
        animation:"twinkleText 2.5s ease-in-out infinite",
      }}>
        ✦ &nbsp; Click a world to enter &nbsp; ✦
      </p>

      <style>{`
        @keyframes twinkleStar   { 0%{opacity:0.08} 100%{opacity:0.88} }
        @keyframes floatParticle { 0%{transform:translateY(0) rotate(-5deg);opacity:0.12} 100%{transform:translateY(-36px) rotate(8deg);opacity:0.05} }
        @keyframes twinkleText   { 0%{opacity:0.38} 100%{opacity:0.78} }
        @keyframes bounce        { 0%{transform:translateY(0)} 100%{transform:translateY(-10px)} }
        @keyframes shake         { 0%,100%{transform:rotate(-5deg)} 50%{transform:rotate(5deg)} }
        @keyframes bubblePop     { 0%{transform:translateX(-50%) scale(0.4);opacity:0} 70%{transform:translateX(-50%) scale(1.08)} 100%{transform:translateX(-50%) scale(1);opacity:1} }
        @keyframes floatUp       { 0%{transform:translateY(0) rotate(0deg);opacity:0.4} 50%{opacity:0.7} 100%{transform:translateY(-48px) rotate(20deg);opacity:0} }
        @keyframes magicBadge    { 0%{box-shadow:0 0 8px rgba(168,85,247,0.5)} 100%{box-shadow:0 0 20px rgba(168,85,247,0.9)} }
      `}</style>
    </div>
  );
}
