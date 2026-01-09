// index3.js — single-page quiz, locked progression, minimal JS (NO auto-advance)

(() => {
  const views = {
    landing: document.getElementById("view-landing"),
    quiz: document.getElementById("view-quiz"),
    end: document.getElementById("view-end"),
  };

  const progressText = document.getElementById("progressText");
  const progressFill = document.getElementById("progressFill");

  const btnStart = document.getElementById("btnStart");
  const btnNext = document.getElementById("btnNext");
  const btnRestart = document.getElementById("btnRestart");

  const qKicker = document.getElementById("qKicker");
  const qTitle = document.getElementById("qTitle");
  const qSub = document.getElementById("qSub");
  const choicesWrap = document.getElementById("choices");

  const aiText = document.getElementById("aiText");
  const statusText = document.getElementById("statusText");

  // SFX
  const ding = document.getElementById("dingSound");     // dingdingding.mp3
  const wrong = document.getElementById("wrongSound");   // incorrect.mp3
  const yay = document.getElementById("yaySound");       // trumpetyay.mp3

  const playSound = (el) => {
    if (!el) return;
    try {
      el.currentTime = 0;
      el.play().catch(() => {});
    } catch (_) {}
  };

  // ✅ Keep YOUR Q1 & Q2 exactly (including stalk.ai text)
  // ✅ Use MY Q3–Q5
  const questions = [
    {
      type: "single",
      title: "Which post gives the strongest clue to where someone lives?",
      sub: "Assume a stranger can use maps + AI image matching + public transport info.",
      choices: [
        { k: "A", t: "An OOTD photo with matcha latte, wired earbuds and baggy jeans" },
        { k: "B", t: "A selfie at a bus stop where the stop name is visible." },
        { k: "C", t: "A concert clip with loud music and a time stamp" },
        { k: "D", t: "A mirror selfie with no background details" },
      ],
      correctIndex: 1,
      good: "Correct. Bus stop name narrows routes, neighborhoods, and likely home area fast.",
      bad: "Not quite. The strongest is the one that can be cross-referenced with routes and geography.",
    },
    {
      type: "single",
      title: "A stalker tries to infer your school. Which is the riskiest to post”?",
      sub: "Think: what is easiest for a model to match to known datasets quickly?",
      choices: [
        { k: "A", t: "A sentence in your caption: “love 67”" },
        { k: "B", t: "A blurry shot of your lunch" },
        { k: "C", t: "A JJ edit in school with school uniform in clear view" },
        { k: "D", t: "A photo of your fuggler collection" },
      ],
      correctIndex: 2,
      good: "Correct. Even if just a harmless JJ edit, school logos/crests are high-signal patterns AI can match surprisingly well.",
      bad: "Nope. The most machine-friendly clue is the one that acts like a searchable identifier.",
    },

    // ✅ MY Q3
    {
      type: "single",
      title: "Why is combining multiple “low-risk” details more dangerous than one obvious high-risk detail?",
      sub: "Think like stalk.ai: small clues become a clear profile when stacked together.",
      choices: [
        { k: "A", t: "Low-risk details attract less attention" },
        { k: "B", t: "Patterns emerge when data points are aggregated" },
        { k: "C", t: "High-risk details are easier to remove" },
        { k: "D", t: "Platforms automatically flag combinations" },
      ],
      correctIndex: 1,
      good: "Correct. Alone, each clue looks harmless. Together, they form a predictable identity + routine map.",
      bad: "Not quite. The key idea is aggregation: multiple small signals can become a full profile.",
    },

    // ✅ MY Q4
    {
      type: "single",
      title: "What makes AI-assisted stalking fundamentally different from traditional stalking?",
      sub: "No hacking needed — just faster inference from public crumbs.",
      choices: [
        { k: "A", t: "AI can operate without human input" },
        { k: "B", t: "AI reduces the time needed to identify behavioural patterns" },
        { k: "C", t: "AI increases emotional attachment to targets" },
        { k: "D", t: "AI guarantees accurate conclusions" },
      ],
      correctIndex: 1,
      good: "Correct. AI speeds up pattern detection across photos, text, and routines — and scales it.",
      bad: "Nope. The biggest change is speed and scale, not perfect accuracy or autonomy.",
    },

    // ✅ MY Q5
    {
      type: "single",
      title: "Why is AI inference especially dangerous even when the conclusions are sometimes wrong?",
      sub: "Even imperfect guesses can still shrink a stranger’s search.",
      choices: [
        { k: "A", t: "Incorrect guesses cannot cause harm" },
        { k: "B", t: "Partial accuracy is still enough to narrow possibilities" },
        { k: "C", t: "AI outputs are legally binding" },
        { k: "D", t: "Errors discourage attackers" },
      ],
      correctIndex: 1,
      good: "Correct. AI doesn’t need to be perfect — narrowing the options is already powerful and risky.",
      bad: "Not quite. The danger is search narrowing: even partial accuracy helps a predator focus in.",
    },
  ];

  let qIndex = 0;
  let canProceed = false;

  function showView(name) {
    Object.values(views).forEach(v => v.classList.remove("is-active"));
    views[name].classList.add("is-active");

    // play trumpet once when reaching end
    if (name === "end") playSound(yay);
  }

  function setProgress(done) {
    progressText.textContent = `${done}/5`;
    progressFill.style.width = `${(done / 5) * 100}%`;
    document.querySelector(".progressBar")?.setAttribute("aria-valuenow", String(done));
  }

  function setStatus(type, text) {
    statusText.classList.remove("status--idle", "status--bad", "status--good");
    statusText.classList.add(type);
    statusText.textContent = text;
  }

  function clearChoiceStates() {
    [...choicesWrap.querySelectorAll(".choice")].forEach(el => {
      el.classList.remove("selected", "correct", "wrong");
      el.disabled = false;
    });
  }

  function lockChoices() {
    [...choicesWrap.querySelectorAll(".choice")].forEach(el => (el.disabled = true));
  }

  function renderQuestion() {
    const q = questions[qIndex];

    qKicker.textContent = `Question ${qIndex + 1} of 5`;
    qTitle.textContent = q.title;

    // allow sub to be optional (safe)
    qSub.textContent = q.sub || "";
    qSub.style.display = q.sub ? "block" : "none";

    aiText.textContent = "Choose an answer to continue.";
    setStatus("status--idle", "WAITING_FOR_INPUT");

    canProceed = false;
    btnNext.disabled = true;

    btnNext.innerHTML = `Next <span class="arrow">→</span>`;

    choicesWrap.innerHTML = "";

    q.choices.forEach((c, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice";
      btn.setAttribute("aria-label", `Choice ${c.k}`);

      btn.innerHTML = `
        <span class="choiceKey">${c.k}</span>
        <span class="choiceText">${c.t}</span>
      `;

      btn.addEventListener("click", () => onSelectSingle(idx, btn));
      choicesWrap.appendChild(btn);
    });
  }

  function onSelectSingle(selectedIndex, selectedEl) {
    const q = questions[qIndex];

    clearChoiceStates();
    selectedEl.classList.add("selected");

    if (selectedIndex === q.correctIndex) {
      // ✅ correct
      playSound(ding);

      selectedEl.classList.add("correct");
      aiText.textContent = `✅ ${q.good}`;
      setStatus("status--good", "ACCESS_GRANTED");
      canProceed = true;
      btnNext.disabled = false;
      lockChoices();
    } else {
      // ❌ wrong
      playSound(wrong);

      selectedEl.classList.add("wrong");
      aiText.textContent = `❌ ${q.bad}`;
      setStatus("status--bad", "INCORRECT_TRY_AGAIN");
      canProceed = false;
      btnNext.disabled = true;
      // keep choices clickable so they can try again
    }
  }

  function goNext() {
    if (!canProceed) return;

    qIndex += 1;
    setProgress(qIndex);

    if (qIndex >= questions.length) {
      showView("end");
      return;
    }

    renderQuestion();
    showView("quiz");
  }

  // Events
  btnStart.addEventListener("click", () => {
    qIndex = 0;
    setProgress(0);
    renderQuestion();
    showView("quiz");
  });

  btnNext.addEventListener("click", () => {
    // ✅ NO auto-move: user must click next
    goNext();
  });

  // ✅ Only ONE restart behaviour: go back to index1
  btnRestart.addEventListener("click", () => {
    try {
      localStorage.removeItem("quizProgress");
      localStorage.removeItem("instalk_user");
    } catch (_) {}
    window.location.href = "index1.html";
  });

  // init
  setProgress(0);
  showView("landing");
})();
