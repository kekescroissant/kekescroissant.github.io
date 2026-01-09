(() => {
  // =========================
  // GUARD
  // =========================
  const username = (localStorage.getItem("instalk_user") || "").trim();
  if (!username) return (window.location.href = "index1.html");

  // =========================
  // BOOT OVERLAY (Option A)
  // =========================
  const boot = {
    wrap: document.getElementById("bootOverlay"),
    sub: document.getElementById("bootSub"),
    fill: document.getElementById("bootFill"),
    user: document.getElementById("bootUser"),
  };

  const runBoot = () => {
    if (!boot.wrap) return;

    if (boot.user) boot.user.textContent = `user: ${username}`;

    boot.wrap.classList.add("show");
    boot.wrap.setAttribute("aria-hidden", "false");

    const steps = [
      { t: "Linking to stalk.ai…", p: 35 },
      { t: "Decrypting profile data…", p: 70 },
      { t: "Ready. Welcome, rookie.", p: 100 },
    ];

    let i = 0;
    const tick = () => {
      const s = steps[i];
      if (boot.sub) boot.sub.textContent = s.t;
      if (boot.fill) boot.fill.style.width = `${s.p}%`;
      i += 1;

      if (i < steps.length) return setTimeout(tick, 320);

      setTimeout(() => {
        boot.wrap.classList.add("fadeOut");
        setTimeout(() => {
          boot.wrap.classList.remove("show", "fadeOut");
          boot.wrap.setAttribute("aria-hidden", "true");
        }, 380);
      }, 220);
    };

    setTimeout(tick, 80);
  };

  // =========================
  // DATA
  // =========================
  const profiles = [
    {
      handle: "@ethantaniscool",
      stats: { posts: 67, followers: 80, following: 1600 },
      pfp: "ethanpfp.jpg",
      bioFull:
        "Ethan Tan (he/him)\n📍 Singapore\nNP student | Biz\nGym 6am • runs at Bedok\nDM for collabs\n\n#fitcheck #bedok #np",
      bioPreview: "Ethan Tan (he/him) • 📍 Singapore • NP student | Biz • Gym 6am…",
      posts: [
        { img: "ethanpost1.jpg", caption: "Usual morning run @ Bedok Reservoir again 🏃‍♂️" },
        { img: "ethanpost2.jpg", caption: "NP life = mugging at block 56 ☕️📚" },
        { img: "ethanpost3.jpg", caption: "Gym routine: push day. see u tmr 💪" },
      ],
      rookie: {
        start: "Yay! I have successfully logged into Instalkgram! Our first profile is Ethan...",
        pic: "Hmm, this pfp seems SUS. I should inspect it.",
        bio: "I knew it! It's so easy to find information using AI nowadays. I'll check the bio next!",
        posts: "Finally, let's see the posts.",
        verdict: "Okay… I’m ready with my verdict! Is this profile easy to stalk or not?",
      },
      ai: {
        pic:
`- His face and torso are clearly visible, making him easy to recognise and match across platforms.
- A street name is visible in the background, narrowing down where he lives or frequently spends time.
- The image links his appearance to a real-world location.
- Even without additional context, the photo alone provides enough information to start tracking him.`,
        bio:
`- His full name is disclosed, making him searchable online.
- His age is stated, increasing how identifiable and targetable he is.
- His school and course (NP, School of Business) are revealed, exposing his daily environment.
- Specific locations (ActiveSG Bedok, Bedok Reservoir) are listed, suggesting a routine.
- Together, this information allows strangers to confirm his identity and predict his movements.`,
        posts:
`- His posts confirm the locations mentioned in his bio.
- School photos verify where he spends most weekdays.
- Gym and running posts reveal where and when he is physically active.
- Repeated location drops allow strangers to map his habits over time.
- The posts turn assumptions into confirmed behavioural patterns.`,
      },
      extracted: {
        pic: ["Face clearly visible → easier to match across platforms."],
        bio: ["Student (NP).", "Lives/active around Bedok.", "Routine: gym 6am + runs."],
        posts: ["Frequent Bedok Reservoir.", "NP campus lifestyle clues.", "Gym schedule pattern."],
      },
      stalkableCorrect: true,
      stalkableExplain: "Too many specific patterns (place + routine + identity cues).",
    },

    {
      handle: "@serenalovesmatcha",
      stats: { posts: 24, followers: 312, following: 540 },
      pfp: "serenapfp.jpg",
      bioFull:
        "Serena\nmatcha + cafes + film photos\n📍 central\nwork: cbd\nweekends: studio classes at Raffles Place\n\nmessages are welcome!",
      bioPreview: "Serena • matcha + cafes • 📍 central • work: cbd • weekends: studio…",
      posts: [
        { img: "serenapost1.jpg", caption: "New matcha spot in the city ☕🍵 Guess where? 👀" },
        { img: "serenapost2.jpg", caption: "Found a new café near Orchard… same lunch hour routine again." },
        { img: "serenapost3.jpg", caption: "Studio class Saturdays at Ballet.co at Raffles Place!" },
      ],
      rookie: {
        start: "Next profile… Serena. Looks pretty normal at first glance.",
        pic: "Pfp looks safe… but let’s not assume. I’ll inspect it.",
        bio: "Hmm, that seems safe. It looks like a typical cafe. You also can't see her face. No red flags for now.",
        posts: "Bio does not have any alarming red flags, but repeated timing/places can still expose patterns.",
        verdict: "Her captions show her routine! That's not a good sign... Verdict time, is Serena’s profile easy to stalk?",
      },
      ai: {
        pic:
`- The image shows only her back view, with no face visible.
- No identifiable facial features means she is not easily recognisable.
- The café setting is generic, with no visible signage or landmarks.
- The photo alone reveals very little about her identity or location.`,
        bio:
`- Her name is stated, giving a basic identity anchor.
- Interests (matcha, cafés, film photos) signal lifestyle patterns.
- “📍 central” and “work: cbd” narrow her weekday location to a specific district.
- “weekends: studio classes at Raffles Place” reveals a recurring weekend routine.
- This information allows strangers to predict where she is likely to be and when.`,
        posts:
`- Posts repeatedly reference cafés in the city and Orchard, confirming her routine zone.
- “same lunch hour routine again” suggests consistent timing and location.
- Studio class posts name Ballet.co at Raffles Place, confirming an exact venue.
- Her text maps out her weekly schedule even if her images hide her face.`,
      },
      extracted: {
        pic: ["No face shown clearly → lower visual risk."],
        bio: ["Works in CBD.", "Usually in central area.", "Weekend studio classes."],
        posts: ["Lunch break timing.", "Saturday pattern."],
      },
      stalkableCorrect: true,
      stalkableExplain: "Even with ‘safe’ visuals, her text reveals routine + area patterns.",
    },

    {
      handle: "@lowkeylina",
      stats: { posts: 9, followers: 48, following: 120 },
      pfp: "linapfp.jpg",
      bioFull: "lina\nanimals + nature\njust vibes\n\n✨",
      bioPreview: "lina • animals + nature • just vibes ✨",
      posts: [
        { img: "linapost1.jpg", caption: "clouds + birds. peace." },
        { img: "linapost2.jpg", caption: "soft paws, softer day." },
        { img: "linapost3.jpg", caption: "purple flowers my hubby gave me" },
      ],
      rookie: {
        start: "Last profile… Lina.",
        pic: "Ooohh KITTYY, lets inspect her pfp!",
        bio: "Her pfp seems to be safe! Next, her bio",
        posts: "She seems to only mention nature/animals only. Nothing identifiable.",
        verdict: "Alright, i've seen enough! Time to guess: is Lina easy to stalk?",
      },
      ai: {
        pic:
`- The profile picture shows a cat, not a human.
- No identifying traits of the account owner are visible.
- The image cannot be linked to a real person or location.
- The profile picture alone reveals no personal or traceable information.`,
        bio:
`- Only a first name is used, with no identifying details.
- Interests are broad and non-specific (animals, nature, vibes).
- No age, school, workplace, or location is mentioned.
- The bio provides no routine, schedule, or personal identifiers.`,
        posts:
`- Posts focus on objects and scenery, not people.
- Captions are abstract and emotional, not informational.
- No locations, timings, or habits can be inferred.
- The posts do not allow strangers to predict movement or behaviour.`,
      },
      extracted: {
        pic: ["No clear face → harder to reverse-search."],
        bio: ["No identity/location/routine given."],
        posts: ["No landmarks or identifiable places.", "No schedule clues."],
      },
      stalkableCorrect: false,
      stalkableExplain: "Not enough unique, actionable info to stalk easily.",
    },
  ];

  // =========================
  // DOM HELPERS
  // =========================
  const $ = (id) => document.getElementById(id);

  const ui = {
    userChip: $("userChip"),
    progressFill: $("progressFill"),
    progressLabel: $("progressLabel"),

    pfpBtn: $("pfpBtn"),
    bioBtn: $("bioPreviewBtn"),
    postsBtn: $("postsPreviewBtn"),
    stalkBtn: $("stalkBtn"),

    pfpImg: $("pfpImg"),
    handle: $("handle"),
    profileStats: $("profileStats"),
    postsHint: $("postsHint"),

    bioPreviewText: $("bioPreviewText"),
    postsStrip: $("postsStrip"),

    stepPic: $("stepPic"),
    stepBio: $("stepBio"),
    stepPosts: $("stepPosts"),

    factsList: $("factsList"),
    riskTag: $("riskTag"),
    thoughtText: $("thoughtText"),

    // TOP TOAST (white error dropdown)
    topToast: $("topToast"),
    topToastMsg: $("topToastMsg"),

    inspectModal: $("inspectModal"),
    modalTitle: $("modalTitle"),
    modalSub: $("modalSub"),
    scanStage: $("scanStage"),
    aiText: $("aiText"),
    modalDone: $("modalDoneBtn"),
    modalClose: $("modalCloseBtn"),

    questionModal: $("questionModal"),
    qFeedback: $("qFeedback"),
    qNext: $("qNextBtn"),
    qClose: $("qCloseBtn"),
    yes: $("choiceYes"),
    no: $("choiceNo"),
  };

  // =========================
  // AUDIO (HTML must have these IDs)
  // =========================
  const getDing = () => document.getElementById("dingSound");   // dingdingding.mp3
  const getWrong = () => document.getElementById("wrongSound"); // incorrect.mp3
  const getScan = () => document.getElementById("scanSound");   // scanning.mp3

  const playSound = (el, { loop = false } = {}) => {
    if (!el) return;
    try {
      el.loop = !!loop;
      el.currentTime = 0;
      el.play().catch(() => {});
    } catch (_) {}
  };

  const stopSound = (el) => {
    if (!el) return;
    try {
      el.loop = false;
      el.pause();
      el.currentTime = 0;
    } catch (_) {}
  };

  // keep your “task complete” ding (you can disable by commenting this out)
  const playDoneDing = () => playSound(getDing());

  if (ui.userChip) ui.userChip.textContent = `user: ${username}`;

  // =========================
  // TOP TOAST
  // =========================
  let toastTimer = null;

  const showTopToast = (msg) => {
    if (!ui.topToast || !ui.topToastMsg) return;

    ui.topToastMsg.textContent = msg;
    ui.topToast.classList.add("show");
    ui.topToast.setAttribute("aria-hidden", "false");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      ui.topToast.classList.remove("show");
      ui.topToast.setAttribute("aria-hidden", "true");
    }, 2000);
  };

  // =========================
  // STATE
  // =========================
  let idx = 0;
  let inspected = { pic: false, bio: false, posts: false };
  let answeredCorrect = false;
  let scanTimer = null;
  let lastInspectType = null;

  // =========================
  // TYPEWRITER (rookie log)
  // =========================
  let typeTimer = null;
  let lastThought = "";

  const typewrite = (el, text, speed = 18) => {
    if (!el) return;
    if (typeTimer) clearInterval(typeTimer);

    el.textContent = "";
    let i = 0;

    typeTimer = setInterval(() => {
      el.textContent += text.charAt(i);
      i += 1;
      if (i >= text.length) {
        clearInterval(typeTimer);
        typeTimer = null;
        lastThought = text;
      }
    }, speed);
  };

  const setThought = (text, instant = false) => {
    if (!ui.thoughtText) return;
    if (text === lastThought) return;

    if (instant) {
      if (typeTimer) clearInterval(typeTimer);
      typeTimer = null;
      ui.thoughtText.textContent = text;
      lastThought = text;
      return;
    }
    typewrite(ui.thoughtText, text);
  };

  // =========================
  // ORDER GATING + SHAKE
  // =========================
  const canInspect = (type) => {
    if (type === "pic") return true;
    if (type === "bio") return inspected.pic;
    if (type === "posts") return inspected.pic && inspected.bio;
    return false;
  };

  const lockMsg = (type) => {
    if (type === "bio") return "Complete Task 1 first: Inspect profile picture.";
    if (type === "posts") return "Complete Task 2 first: Inspect bio.";
    return "Please follow the steps in order.";
  };

  const shakeEl = (el) => {
    if (!el) return;
    el.style.animation = "none";
    void el.offsetHeight;
    el.style.animation = "instaShake 360ms ease-in-out";
    const cleanup = () => {
      el.style.animation = "";
      el.removeEventListener("animationend", cleanup);
    };
    el.addEventListener("animationend", cleanup);
  };

  const injectShakeKeyframes = () => {
    const id = "instaShakeKeyframes";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes instaShake{
        0%{ transform: translateX(0); }
        15%{ transform: translateX(-6px); }
        30%{ transform: translateX(6px); }
        45%{ transform: translateX(-5px); }
        60%{ transform: translateX(5px); }
        75%{ transform: translateX(-3px); }
        90%{ transform: translateX(3px); }
        100%{ transform: translateX(0); }
      }
    `;
    document.head.appendChild(style);
  };
  injectShakeKeyframes();

  // =========================
  // UI HELPERS
  // =========================
  const showModal = (el) => el && (el.classList.add("show"), el.setAttribute("aria-hidden", "false"));
  const hideModal = (el) => el && (el.classList.remove("show"), el.setAttribute("aria-hidden", "true"));

  const clearScan = () => {
    if (scanTimer) clearTimeout(scanTimer);
    scanTimer = null;
  };

  const setStep = (li, done) => {
    if (!li) return;
    li.classList.toggle("done", done);
    const tick = li.querySelector(".stepTick");
    if (tick) tick.textContent = done ? "☑" : "☐";
  };

  const setRisk = (label, cssVar) => {
    if (!ui.riskTag) return;
    ui.riskTag.textContent = label;
    ui.riskTag.style.color = cssVar ? `var(${cssVar})` : "";
  };

  const fmtNum = (n) => {
    try {
      return Number(n).toLocaleString();
    } catch {
      return String(n);
    }
  };

  const renderStats = (p) => {
    if (!ui.profileStats) return;
    const s = p.stats || { posts: 0, followers: 0, following: 0 };
    ui.profileStats.innerHTML = `
      <span class="stat"><strong>${fmtNum(s.posts)}</strong> posts</span>
      <span class="dot">•</span>
      <span class="stat"><strong>${fmtNum(s.followers)}</strong> followers</span>
      <span class="dot">•</span>
      <span class="stat"><strong>${fmtNum(s.following)}</strong> following</span>
    `;
  };

  const updateFacts = () => {
    const p = profiles[idx];
    const out = [];
    if (inspected.pic) out.push(...p.extracted.pic);
    if (inspected.bio) out.push(...p.extracted.bio);
    if (inspected.posts) out.push(...p.extracted.posts);

    if (!ui.factsList) return;
    ui.factsList.innerHTML = "";
    (out.length ? out : ["No info extracted yet. Start inspecting."]).forEach((f) => {
      const li = document.createElement("li");
      li.textContent = f;
      ui.factsList.appendChild(li);
    });
  };

  const updateRisk = () => {
    const p = profiles[idx];
    const done = Object.values(inspected).filter(Boolean).length;
    if (done === 0) return setRisk("UNKNOWN", "");
    if (done === 1) return setRisk("LOW SIGNAL", "--warn");
    if (done === 2) return setRisk("MED SIGNAL", "--warn");
    setRisk(p.stalkableCorrect ? "HIGH RISK" : "LOW RISK", p.stalkableCorrect ? "--bad" : "--green");
  };

  const updateCTA = () => {
    const allDone = inspected.pic && inspected.bio && inspected.posts;
    if (ui.stalkBtn) ui.stalkBtn.disabled = !allDone;
  };

  const guidance = () => {
    const p = profiles[idx];
    if (!inspected.pic) return setThought(`${p.rookie.start} ${p.rookie.pic}`);
    if (!inspected.bio) return setThought(p.rookie.bio);
    if (!inspected.posts) return setThought(p.rookie.posts);
    setThought(p.rookie.verdict);
  };

  const completeTask = (type) => {
    if (inspected[type]) return;
    inspected[type] = true;

    if (type === "pic") {
      setStep(ui.stepPic, true);
      ui.pfpBtn?.classList.add("completed");
    }
    if (type === "bio") {
      setStep(ui.stepBio, true);
      ui.bioBtn?.classList.add("completed");
    }
    if (type === "posts") {
      setStep(ui.stepPosts, true);
      ui.postsBtn?.classList.add("completed");
    }

    updateFacts();
    updateRisk();
    updateCTA();
    guidance();
  };

  // =========================
  // RENDER
  // =========================
  const render = () => {
    const p = profiles[idx];

    inspected = { pic: false, bio: false, posts: false };
    answeredCorrect = false;
    lastInspectType = null;

    clearScan();
    stopSound(getScan()); // safety

    ui.pfpBtn?.classList.remove("completed");
    ui.bioBtn?.classList.remove("completed");
    ui.postsBtn?.classList.remove("completed");

    if (ui.pfpImg) ui.pfpImg.src = p.pfp;
    if (ui.handle) ui.handle.textContent = p.handle;
    if (ui.bioPreviewText) ui.bioPreviewText.textContent = p.bioPreview;

    renderStats(p);

    if (ui.postsHint) ui.postsHint.textContent = `${p.posts.length} posts • Click to view full`;

    if (ui.postsStrip) {
      ui.postsStrip.innerHTML = "";
      p.posts.forEach((post) => {
        const d = document.createElement("div");
        d.className = "thumb";
        const img = document.createElement("img");
        img.src = post.img;
        img.alt = "Post preview";
        d.appendChild(img);
        ui.postsStrip.appendChild(d);
      });
    }

    setStep(ui.stepPic, false);
    setStep(ui.stepBio, false);
    setStep(ui.stepPosts, false);

    if (ui.factsList) {
      ui.factsList.innerHTML = `<li class="muted">No info extracted yet. Start inspecting.</li>`;
    }

    setRisk("UNKNOWN", "");
    updateCTA();

    const pct = Math.round((idx / profiles.length) * 100);
    if (ui.progressFill) ui.progressFill.style.width = `${pct}%`;
    if (ui.progressLabel) ui.progressLabel.textContent = `Profile ${idx + 1} of ${profiles.length}`;
    document.querySelector(".progressBar")?.setAttribute("aria-valuenow", String(pct));

    if (ui.thoughtText) ui.thoughtText.textContent = "";
    lastThought = "";
    setTimeout(guidance, 220);
  };

  // =========================
  // INSPECTION MODAL CONTENT
  // =========================
  const buildContent = (type) => {
    const p = profiles[idx];
    if (!ui.scanStage) return;

    ui.scanStage.innerHTML = "";

    if (type === "pic") {
      const img = document.createElement("img");
      img.src = p.pfp;
      img.alt = "Magnified profile picture";
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
      img.style.borderRadius = "16px";
      img.style.border = "1px solid rgba(57,255,136,.16)";
      ui.scanStage.appendChild(img);
      return;
    }

    if (type === "bio") {
      const box = document.createElement("div");
      box.className = "fullBio";
      box.style.width = "100%";
      box.style.height = "100%";
      box.style.overflow = "auto";
      box.style.borderRadius = "16px";
      box.style.padding = "12px";
      box.style.border = "1px solid rgba(57,255,136,.12)";
      box.style.background = "rgba(0,0,0,.18)";
      box.innerHTML = `
        <div style="font-weight:1000; margin-bottom:8px;">Full bio</div>
        <div style="white-space:pre-wrap;color:var(--muted); line-height:1.35;">${p.bioFull}</div>
      `;
      ui.scanStage.appendChild(box);
      return;
    }

    const grid = document.createElement("div");
    grid.className = "postsGrid";
    grid.style.width = "100%";
    grid.style.height = "100%";
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(3, 1fr)";
    grid.style.gap = "10px";
    grid.style.overflow = "auto";

    p.posts.forEach((post) => {
      const card = document.createElement("div");
      card.style.borderRadius = "16px";
      card.style.border = "1px solid rgba(57,255,136,.12)";
      card.style.overflow = "hidden";
      card.style.background = "rgba(0,0,0,.18)";

      const img = document.createElement("img");
      img.src = post.img;
      img.alt = "Post image";
      img.style.width = "100%";
      img.style.height = "120px";
      img.style.objectFit = "cover";
      img.style.objectPosition = "center";
      img.style.display = "block";

      const cap = document.createElement("div");
      cap.textContent = post.caption;
      cap.style.padding = "10px";
      cap.style.color = "var(--muted)";
      cap.style.fontSize = "12px";
      cap.style.lineHeight = "1.3";

      card.appendChild(img);
      card.appendChild(cap);
      grid.appendChild(card);
    });

    ui.scanStage.appendChild(grid);
  };

  const openInspection = (type) => {
    // WRONG ORDER -> show toast, DO NOT change rookie log
    if (!canInspect(type)) {
      showTopToast(lockMsg(type));
      if (type === "bio") shakeEl(ui.bioBtn);
      if (type === "posts") shakeEl(ui.postsBtn);
      return;
    }

    const p = profiles[idx];
    clearScan();
    lastInspectType = type;

    stopSound(getScan()); // safety

    if (ui.modalDone) ui.modalDone.disabled = true;

    if (ui.modalTitle) {
      ui.modalTitle.textContent =
        type === "pic" ? "Task 1 — Profile picture" :
        type === "bio" ? "Task 2 — Bio" :
        "Task 3 — Posts";
    }

    buildContent(type);
    showModal(ui.inspectModal);

    if (ui.aiText) ui.aiText.textContent = "Loading…";

    if (type === "pic") {
      if (ui.modalSub) ui.modalSub.textContent = "Stalk.ai scanning…";
      if (ui.aiText) ui.aiText.textContent = "Scanning… please wait 3 seconds.";

      const overlay = document.createElement("div");
      overlay.className = "scanOverlay";
      overlay.innerHTML = `<div class="scanLine"></div>`;
      ui.scanStage?.appendChild(overlay);

      // ✅ loop scan sound during 3s
      playSound(getScan(), { loop: true });

      scanTimer = setTimeout(() => {
        stopSound(getScan());
        overlay.remove();
        if (ui.modalSub) ui.modalSub.textContent = "Scan complete.";
        if (ui.aiText) ui.aiText.textContent = p.ai.pic;
        if (ui.modalDone) ui.modalDone.disabled = false;
      }, 3000);

      return;
    }

    // bio/posts
    if (ui.modalSub) ui.modalSub.textContent = "Opened.";
    if (ui.aiText) ui.aiText.textContent = p.ai[type];
    if (ui.modalDone) ui.modalDone.disabled = false;
  };

  const closeInspection = () => {
    clearScan();
    stopSound(getScan());
    hideModal(ui.inspectModal);
  };

  const doneInspection = () => {
    if (!lastInspectType) return closeInspection();

    // optional task-complete ding
    playDoneDing();

    completeTask(lastInspectType);
    closeInspection();
  };

  // =========================
  // QUESTION MODAL
  // =========================
  const openQuestion = () => {
    if (!ui.stalkBtn || ui.stalkBtn.disabled) return;
    if (ui.qFeedback) ui.qFeedback.textContent = "";
    if (ui.qNext) ui.qNext.disabled = true;
    answeredCorrect = false;
    showModal(ui.questionModal);
  };

  const closeQuestion = () => hideModal(ui.questionModal);

  const answer = (yes) => {
    const p = profiles[idx];
    const correct = yes === p.stalkableCorrect;

    // ✅ play correct / wrong sounds
    if (correct) playSound(getDing());
    else playSound(getWrong());

    if (correct) {
      answeredCorrect = true;
      if (ui.qFeedback) {
        ui.qFeedback.textContent = `✅ Correct. ${p.stalkableExplain}`;
        ui.qFeedback.style.color = "var(--green)";
      }
      if (ui.qNext) ui.qNext.disabled = false;
    } else {
      // ✅ NEW: rejecting/shake animation on wrong answer
      const box = document.querySelector(".questionBox");
      shakeEl(box);
      shakeEl(yes ? ui.yes : ui.no);

      if (ui.qFeedback) {
        ui.qFeedback.textContent = "❌ Not quite. Look at the extracted info again.";
        ui.qFeedback.style.color = "var(--bad)";
      }
      if (ui.qNext) ui.qNext.disabled = true;
    }
  };
const goFinalTest = () => {
  const overlay = document.getElementById("finalOverlay");
  const fill = document.getElementById("finalFill");

  if (overlay) {
    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
  }
  if (fill) fill.style.width = "0%";

  // animate bar quickly
  setTimeout(() => fill && (fill.style.width = "35%"), 80);
  setTimeout(() => fill && (fill.style.width = "72%"), 280);
  setTimeout(() => fill && (fill.style.width = "100%"), 520);

  setTimeout(() => {
    window.location.href = "index3.html";
  }, 950);
};

const next = () => {
  if (!answeredCorrect) return;

  hideModal(ui.questionModal);
  idx += 1;

  // ✅ if finished all profiles, go final test
  if (idx >= profiles.length) {
    goFinalTest();
    return;
  }

  // ✅ otherwise load next profile normally
  render();
};

  // =========================
  // EVENTS
  // =========================
  ui.pfpBtn?.addEventListener("click", () => openInspection("pic"));
  ui.bioBtn?.addEventListener("click", () => openInspection("bio"));
  ui.postsBtn?.addEventListener("click", () => openInspection("posts"));
  ui.stalkBtn?.addEventListener("click", openQuestion);

  ui.modalDone?.addEventListener("click", doneInspection);
  ui.modalClose?.addEventListener("click", closeInspection);

  ui.qClose?.addEventListener("click", closeQuestion);
  ui.yes?.addEventListener("click", () => answer(true));
  ui.no?.addEventListener("click", () => answer(false));
  ui.qNext?.addEventListener("click", next);

  document.querySelectorAll(".modalBackdrop").forEach((b) => {
    b.addEventListener("click", (e) => {
      if (!e.target?.dataset?.close) return;
      if (ui.inspectModal?.classList.contains("show")) closeInspection();
      if (ui.questionModal?.classList.contains("show")) closeQuestion();
    });
  });

  // =========================
  // START
  // =========================
  runBoot();
  setTimeout(render, 950); // render after boot finishes
})();
