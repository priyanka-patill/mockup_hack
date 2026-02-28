import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const characters = [
  {
    id: "woody", name: "Woody", emoji: "🤠",
    greeting: "There's a snake in my boot! Let's go on an adventure, partner! 🤠",
    tagline: "Sheriff of Andy's Room",
    cardBg: "linear-gradient(160deg, #f59e0b 0%, #d97706 50%, #92400e 100%)",
    glow: "rgba(245,158,11,0.8)", accent: "#fde68a",
    scenes: [
      {
        id: "s1", title: "Andy's Room",
        bg: "linear-gradient(to bottom, #1c0a00, #2d1500, #1a1a2e)",
        desc: "Toys come to life when humans leave! Andy's room is full of wonder and hidden secrets.",
        objects: [
          { id: "hat",   emoji: "🎩", label: "Cowboy Hat",    x: 30, y: 35, msg: "Yeehaw! The hat makes you the real sheriff of Andy's room!" },
          { id: "snake", emoji: "🐍", label: "Snake-in-Boot", x: 60, y: 55, msg: "Ha! There really WAS a snake in your boot!" },
          { id: "rc",    emoji: "🚗", label: "RC Car",        x: 75, y: 70, msg: "RC revs his engine — ready to race to infinity!" },
        ],
        puzzle: { items: ["🤠","⭐","🐍"], answer: "🤠⭐🐍", hint: "Sheriff → Badge → Sidekick!" },
      },
      {
        id: "s2", title: "Pizza Planet",
        bg: "linear-gradient(to bottom, #1a0030, #0f172a, #1c0a00)",
        desc: "Flashing lights and the iconic rocket ship crane. The aliens chant: 'The Claw!'",
        objects: [
          { id: "alien", emoji: "👽", label: "Little Green Alien", x: 25, y: 45, msg: "The alien joins your crew! OooOooo the Claw!" },
          { id: "claw",  emoji: "🎮", label: "The Claw Machine",   x: 55, y: 25, msg: "THE CLAW has chosen you as its worthy master!" },
          { id: "rocket",emoji: "🚀", label: "Rocket Pizza Ship",  x: 70, y: 65, msg: "Blast off to infinity and beyond — almost!" },
        ],
        puzzle: { items: ["👽","🎮","🚀"], answer: "👽🎮🚀", hint: "Alien → Claw → Rocket!" },
      },
    ],
  },
  {
    id: "nemo", name: "Nemo", emoji: "🐠",
    greeting: "Just keep swimming! The whole ocean is waiting for us! 🐠",
    tagline: "The Bravest Little Fish",
    cardBg: "linear-gradient(160deg, #f97316 0%, #0891b2 50%, #0e7490 100%)",
    glow: "rgba(249,115,22,0.8)", accent: "#fed7aa",
    scenes: [
      {
        id: "s1", title: "The Great Barrier Reef",
        bg: "linear-gradient(to bottom, #042f2e, #0c4a6e, #164e63)",
        desc: "Coral of every color stretches as far as the eye can see. The reef pulses with life!",
        objects: [
          { id: "coral",     emoji: "🪸", label: "Magic Coral",  x: 35, y: 50, msg: "The coral glows and reveals a secret underwater passage!" },
          { id: "crush",     emoji: "🐢", label: "Crush",        x: 65, y: 35, msg: "Dude! Crush invites you to ride the EAC!" },
          { id: "jellyfish", emoji: "🪼", label: "Jellyfish",    x: 20, y: 70, msg: "You bounce safely through — just like Dory taught you!" },
        ],
        puzzle: { items: ["🐟","🌊","🐢"], answer: "🐟🌊🐢", hint: "Swim → Wave → Ride!" },
      },
    ],
  },
  {
    id: "walle", name: "WALL-E", emoji: "🤖",
    greeting: "WALL-E! ...EVE! Let's explore together! 🤖",
    tagline: "Last Robot on Earth",
    cardBg: "linear-gradient(160deg, #78716c 0%, #d97706 50%, #92400e 100%)",
    glow: "rgba(120,113,108,0.8)", accent: "#fde68a",
    scenes: [
      {
        id: "s1", title: "Abandoned Earth",
        bg: "linear-gradient(to bottom, #1c1917, #292524, #1c0a00)",
        desc: "Mountains of rubbish tower over the barren landscape. WALL-E beeps happily, collecting treasures.",
        objects: [
          { id: "cube",  emoji: "📦", label: "Trash Cube",  x: 40, y: 55, msg: "WALL-E compacts it perfectly — a true masterpiece!" },
          { id: "plant", emoji: "🌱", label: "Living Plant", x: 25, y: 30, msg: "A living plant! EVE would be SO excited to see this!" },
          { id: "rubik", emoji: "🎲", label: "Rubik's Cube", x: 70, y: 45, msg: "Directive found: preserve life! The Axiom awaits!" },
        ],
        puzzle: { items: ["📦","🌱","❤️"], answer: "📦🌱❤️", hint: "Collect → Discover → Love!" },
      },
      {
        id: "s2", title: "The Axiom",
        bg: "linear-gradient(to bottom, #0f172a, #1e1b4b, #0a0a1a)",
        desc: "The mega-cruise spaceship Axiom floats in space. Time to bring humanity back home!",
        objects: [
          { id: "eve",     emoji: "🤍", label: "EVE Probe",      x: 50, y: 25, msg: "EVE zooms over and gently holds WALL-E's hand!" },
          { id: "captain", emoji: "👨‍✈️", label: "The Captain",    x: 30, y: 60, msg: "The Captain stands up for the very first time in years!" },
          { id: "disc",    emoji: "💿", label: "Hello Dolly Disc",x: 70, y: 65, msg: "WALL-E plays 'It Only Takes a Moment'... so romantic!" },
        ],
        puzzle: { items: ["🤍","🌱","🏠"], answer: "🤍🌱🏠", hint: "Love → Plant → Home!" },
      },
    ],
  },
];

const DialogueBubble = ({ text, onClose }) => {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { scale: 0.6, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" });
  }, [text]);
  return (
    <div ref={ref} style={{ position: "fixed", bottom: "80px", left: "50%", transform: "translateX(-50%)", zIndex: 200, width: "min(420px, 90vw)" }}>
      <div style={{ background: "rgba(10,10,25,0.97)", backdropFilter: "blur(20px)", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: "20px", padding: "16px 18px", boxShadow: "0 20px 60px rgba(0,0,0,0.8)", display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <div style={{ width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🌟</div>
        <p style={{ color: "#fff", fontSize: "14px", lineHeight: 1.6, flex: 1, margin: 0 }}>{text}</p>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.45)", fontSize: "18px", cursor: "pointer", flexShrink: 0, padding: 0 }}>✕</button>
      </div>
    </div>
  );
};

const Puzzle = ({ puzzle, onSolve, onSkip }) => {
  const [seq, setSeq] = useState([]);
  const [solved, setSolved] = useState(false);
  const [wrong, setWrong] = useState(false);
  const add = (item) => {
    if (solved) return;
    const next = [...seq, item];
    setSeq(next);
    if (next.join("") === puzzle.answer) { setSolved(true); setTimeout(onSolve, 1000); }
    else if (next.length >= puzzle.answer.length) { setWrong(true); setTimeout(() => { setSeq([]); setWrong(false); }, 700); }
  };
  return (
    <div style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(16px)", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: "18px", padding: "18px" }}>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 4px", textAlign: "center" }}>Magic Puzzle</p>
      <p style={{ color: "#fff", fontWeight: 700, fontSize: "14px", margin: "0 0 12px", textAlign: "center" }}>{puzzle.hint}</p>
      <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "12px", padding: "10px", borderRadius: "12px", border: `2px dashed ${solved ? "#4ade80" : wrong ? "#f87171" : "rgba(255,255,255,0.2)"}`, background: solved ? "rgba(74,222,128,0.1)" : wrong ? "rgba(248,113,113,0.08)" : "transparent", transition: "all 0.3s" }}>
        {puzzle.answer.split("").map((_, i) => (
          <div key={i} style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>{seq[i] || ""}</div>
        ))}
      </div>
      {solved && <p style={{ color: "#4ade80", fontWeight: 700, textAlign: "center", marginBottom: "8px" }}>🌟 Puzzle Solved!</p>}
      {wrong  && <p style={{ color: "#f87171", textAlign: "center", marginBottom: "8px", fontSize: "13px" }}>Not quite! Try again!</p>}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        {puzzle.items.map((item, i) => (
          <button key={i} onClick={() => add(item)} style={{ width: "52px", height: "52px", borderRadius: "14px", fontSize: "24px", background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)", cursor: "pointer", transition: "transform 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >{item}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "10px" }}>
        <button onClick={() => setSeq([])} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "12px", cursor: "pointer", textDecoration: "underline" }}>Reset</button>
        <button onClick={onSkip}           style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "12px", cursor: "pointer", textDecoration: "underline" }}>Skip</button>
      </div>
    </div>
  );
};

const Scene = ({ scene, character, sceneIdx, total, onNext, onBack }) => {
  const [dialogue, setDialogue] = useState(null);
  const [found, setFound] = useState([]);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [puzzleDone, setPuzzleDone] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });
    setFound([]); setShowPuzzle(false); setPuzzleDone(false); setDialogue(null);
  }, [sceneIdx]);

  const clickObj = (obj) => {
    if (found.includes(obj.id)) return;
    setFound(p => [...p, obj.id]);
    setDialogue(obj.msg);
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = "sine";
      o.frequency.setValueAtTime(523, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(1047, ctx.currentTime + 0.25);
      g.gain.setValueAtTime(0.08, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      o.start(); o.stop(ctx.currentTime + 0.4);
    } catch(e) {}
  };

  const allFound = found.length === scene.objects.length;
  return (
    <div ref={ref} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "14px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: "14px", cursor: "pointer" }}>← Back</button>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ color: character.accent, fontWeight: 900, fontSize: "20px", margin: 0 }}>{scene.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: 0 }}>Chapter {sceneIdx + 1} of {total}</p>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: i <= sceneIdx ? "#fff" : "rgba(255,255,255,0.2)" }} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, background: scene.bg, position: "relative", overflow: "hidden", minHeight: "500px" }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{ position: "absolute", width: "2px", height: "2px", borderRadius: "50%", background: "white", opacity: Math.random() * 0.4 + 0.1, top: Math.random() * 100 + "%", left: Math.random() * 100 + "%", animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 3}s infinite alternate`, pointerEvents: "none" }} />
        ))}

        <div style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", width: "min(520px, 90%)", zIndex: 10 }}>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", lineHeight: 1.7, textAlign: "center", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)", borderRadius: "16px", padding: "14px 20px", border: "1px solid rgba(255,255,255,0.1)", margin: 0 }}>{scene.desc}</p>
        </div>

        {scene.objects.map((obj) => {
          const done = found.includes(obj.id);
          return (
            <button key={obj.id} onClick={() => clickObj(obj)}
              style={{ position: "absolute", left: obj.x + "%", top: obj.y + "%", transform: "translate(-50%, -50%)", background: "none", border: "none", cursor: done ? "default" : "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", zIndex: 20, opacity: done ? 0.35 : 1, transition: "opacity 0.3s" }}
              onMouseEnter={e => !done && (e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.25)")}
              onMouseLeave={e =>         (e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)")}
            >
              <div style={{ width: "64px", height: "64px", borderRadius: "18px", fontSize: "28px", display: "flex", alignItems: "center", justifyContent: "center", background: done ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.18)", border: done ? "2px solid rgba(255,255,255,0.1)" : "2px solid rgba(255,255,255,0.4)", boxShadow: done ? "none" : "0 0 20px rgba(255,255,255,0.2)", transition: "all 0.2s" }}>{done ? "✅" : obj.emoji}</div>
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "11px", fontWeight: 700, background: "rgba(0,0,0,0.5)", borderRadius: "8px", padding: "3px 8px", whiteSpace: "nowrap" }}>{obj.label}</span>
              {!done && <div style={{ position: "absolute", top: "-4px", right: "-4px", width: "12px", height: "12px", borderRadius: "50%", background: "#f59e0b", animation: "ping 1.2s ease-in-out infinite" }} />}
            </button>
          );
        })}

        <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", width: "min(460px, 92%)", zIndex: 30 }}>
          <div style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "22px", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>Discovered: {found.length}/{scene.objects.length}</span>
              {allFound && !puzzleDone && <button onClick={() => setShowPuzzle(true)} style={{ background: "none", border: "none", color: "#fbbf24", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>🌟 Magic Puzzle</button>}
            </div>
            <div style={{ height: "5px", background: "rgba(255,255,255,0.08)", borderRadius: "999px", marginBottom: "12px", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: "999px", background: "linear-gradient(to right, #f59e0b, #10b981)", width: `${(found.length / scene.objects.length) * 100}%`, transition: "width 0.4s ease" }} />
            </div>
            {showPuzzle && !puzzleDone && (
              <Puzzle puzzle={scene.puzzle}
                onSolve={() => { setPuzzleDone(true); setShowPuzzle(false); setDialogue("🌟 Magical! Hidden Pixar magic revealed!"); }}
                onSkip={() => { setPuzzleDone(true); setShowPuzzle(false); }} />
            )}
            {(allFound || puzzleDone) && (
              <button onClick={onNext} style={{ width: "100%", padding: "13px", background: "linear-gradient(to right, #f59e0b, #3b82f6)", border: "none", borderRadius: "14px", color: "#fff", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >{sceneIdx + 1 >= total ? "🏆 Story Complete!" : "Next Chapter →"}</button>
            )}
            {!allFound && !showPuzzle && <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", textAlign: "center", margin: 0 }}>Explore everything to continue ✨</p>}
          </div>
        </div>
      </div>
      {dialogue && <DialogueBubble text={dialogue} onClose={() => setDialogue(null)} />}
    </div>
  );
};

const CharSelector = ({ onSelect }) => {
  const [hovered, setHovered] = useState(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const mickeyRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "back.out(2)" });
    gsap.fromTo(mickeyRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: "power2.out" });
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(card, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.3 + i * 0.15, ease: "back.out(1.7)" });
    });
    cardsRef.current.forEach((card, i) => {
      gsap.to(card, { y: "-=12", duration: 2.2 + i * 0.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.2 });
    });
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #0a0a1a, #0d1530, #0a1500)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "60px 24px", fontFamily: "system-ui, sans-serif" }}>
      {[...Array(55)].map((_, i) => (
        <div key={i} style={{ position: "absolute", width: Math.random() * 3 + 1 + "px", height: Math.random() * 3 + 1 + "px", borderRadius: "50%", background: "white", top: Math.random() * 100 + "%", left: Math.random() * 100 + "%", opacity: Math.random() * 0.5 + 0.2, animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 4}s infinite alternate`, pointerEvents: "none" }} />
      ))}

      {/* Mickey Guide */}
      <div ref={mickeyRef} style={{ position: "absolute", top: "24px", right: "24px", zIndex: 20 }}>
        <div style={{ background: "rgba(0,30,80,0.92)", backdropFilter: "blur(16px)", border: "1.5px solid rgba(59,130,246,0.4)", borderRadius: "20px", padding: "14px 16px", maxWidth: "280px", boxShadow: "0 10px 40px rgba(59,130,246,0.3)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <span style={{ fontSize: "32px" }}>🐭</span>
            <div>
              <p style={{ color: "#93c5fd", fontWeight: 900, fontSize: "13px", margin: "0 0 4px" }}>Mickey Mouse</p>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px", margin: 0, lineHeight: 1.5 }}>"Ha-ha! Welcome! Where would you like to go today? Pick your favorite!"</p>
            </div>
          </div>
        </div>
      </div>

      <div ref={titleRef} style={{ textAlign: "center", marginBottom: "52px", zIndex: 10 }}>
        <p style={{ color: "rgba(147,197,253,0.7)", fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", margin: "0 0 12px", fontWeight: 700 }}>Pixar Universe</p>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, margin: "0 0 10px", color: "#fff", fontFamily: "Georgia, serif", letterSpacing: "-0.02em", textShadow: "0 0 60px rgba(59,130,246,0.5), 0 4px 20px rgba(0,0,0,0.8)" }}>Choose Your Story</h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", margin: 0 }}>Every great story begins with a single choice</p>
      </div>

      <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", justifyContent: "center", zIndex: 10 }}>
        {characters.map((c, index) => (
          <div key={c.id} ref={el => cardsRef.current[index] = el}
            onClick={() => { gsap.to(cardsRef.current[index], { scale: 1.15, y: -30, duration: 0.3, ease: "back.out(2)", onComplete: () => onSelect(c) }); }}
            onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)}
            style={{ width: "210px", borderRadius: "24px", cursor: "pointer", overflow: "hidden", background: c.cardBg, border: hovered === index ? "2px solid rgba(255,255,255,0.55)" : "2px solid rgba(255,255,255,0.2)", boxShadow: hovered === index ? `0 0 50px 12px ${c.glow}, 0 20px 50px rgba(0,0,0,0.5)` : "0 10px 40px rgba(0,0,0,0.5)", transform: hovered === index ? "scale(1.05)" : "scale(1)", transition: "transform 0.25s, box-shadow 0.25s, border 0.25s", position: "relative" }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)" }} />
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "150px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", filter: "blur(24px)", pointerEvents: "none" }} />
            <div style={{ paddingTop: "28px", textAlign: "center", fontSize: "56px", position: "relative", zIndex: 5 }}>{c.emoji}</div>
            <div style={{ padding: "10px 18px 22px", background: "rgba(0,0,0,0.28)", position: "relative", zIndex: 5 }}>
              <h3 style={{ color: "#fff", fontWeight: 900, fontSize: "22px", margin: "0 0 2px", textAlign: "center" }}>{c.name}</h3>
              <p  style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", textAlign: "center", margin: "0 0 10px" }}>{c.tagline}</p>
              {hovered === index && (
                <div style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "12px", padding: "10px 12px", marginBottom: "10px" }}>
                  <p style={{ color: c.accent, fontSize: "12px", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>"{c.greeting}"</p>
                </div>
              )}
              <div style={{ textAlign: "center", padding: "9px", background: hovered === index ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "12px", color: "#fff", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.25s" }}>
                {hovered === index ? "Start Story →" : `${c.scenes.length} Chapter${c.scenes.length > 1 ? "s" : ""}`}
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`@keyframes twinkle{0%{opacity:0.2}100%{opacity:0.8}} @keyframes ping{0%{transform:scale(1);opacity:1}100%{transform:scale(2);opacity:0}}`}</style>
    </div>
  );
};

const Completion = ({ character, onRestart }) => {
  const ref = useRef(null);
  useEffect(() => { gsap.fromTo(ref.current, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "back.out(2)" }); }, []);
  return (
    <div style={{ minHeight: "100vh", background: character.cardBg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {[...Array(30)].map((_, i) => (
        <div key={i} style={{ position: "absolute", fontSize: "24px", top: Math.random() * 100 + "%", left: Math.random() * 100 + "%", animation: `bounce ${Math.random() * 1.5 + 1}s ease-in-out ${Math.random() * 2}s infinite alternate`, pointerEvents: "none" }}>
          {["🌟","✨","🏆","🎬","🎭"][Math.floor(Math.random() * 5)]}
        </div>
      ))}
      <div ref={ref} style={{ textAlign: "center", zIndex: 10, padding: "24px" }}>
        <div style={{ fontSize: "80px", marginBottom: "16px" }}>🎬</div>
        <h1 style={{ color: "#fff", fontSize: "48px", fontWeight: 900, margin: "0 0 12px", fontFamily: "Georgia, serif", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>The End!</h1>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "18px", margin: "0 0 28px" }}>{character.name}'s story is complete!</p>
        <button onClick={onRestart} style={{ padding: "14px 36px", background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.35)", borderRadius: "16px", color: "#fff", fontSize: "14px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
        >← Choose Another Story</button>
      </div>
      <style>{`@keyframes bounce{0%{transform:translateY(0)}100%{transform:translateY(-18px)}}`}</style>
    </div>
  );
};

export default function PixarWorld() {
  const [selected, setSelected] = useState(null);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [done, setDone] = useState(false);
  const next = () => { if (sceneIdx + 1 >= selected.scenes.length) setDone(true); else setSceneIdx(s => s + 1); };
  if (!selected) return <CharSelector onSelect={c => { setSelected(c); setSceneIdx(0); setDone(false); }} />;
  if (done)      return <Completion character={selected} onRestart={() => { setSelected(null); setDone(false); }} />;
  return <Scene scene={selected.scenes[sceneIdx]} character={selected} sceneIdx={sceneIdx} total={selected.scenes.length} onNext={next} onBack={() => sceneIdx === 0 ? setSelected(null) : setSceneIdx(s => s - 1)} />;
}
