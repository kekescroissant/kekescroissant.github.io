// index1.js (minimal + reliable)
// - page switching (NOW with smooth transition)
// - modal open/close
// - typewriter (runs when instructions page is shown)
// - login status updates live while typing

document.addEventListener("DOMContentLoaded", () => {
  const $ = (sel) => document.querySelector(sel);

  const pages = {
    landing: $("#page-landing"),
    instructions: $("#page-instructions"),
    login: $("#page-login"),
  };

  const btnLetsPlay = $("#btnLetsPlay");
  const btnHowItWorks = $("#btnHowItWorks");
  const btnBackToLanding = $("#btnBackToLanding");
  const btnBeginMission = $("#btnBeginMission");
  const btnSignIn = $("#btnSignIn");

  const modalHow = $("#modalHow");
  const twEl = $("#tw");
  const targetId = $("#targetId");
  const statusText = $("#statusText");

  // --- Page switching (smooth) ---
  let currentKey = "landing";
  const TRANSITION_MS = 280;

  function showPage(nextKey) {
    if (!pages[nextKey]) return;
    if (nextKey === currentKey) return;

    const currentPage = pages[currentKey];
    const nextPage = pages[nextKey];

    // mark current as leaving (fade out)
    if (currentPage) currentPage.classList.add("is-leaving");

    // after fade-out, swap active page
    window.setTimeout(() => {
      Object.values(pages).forEach((p) => {
        if (!p) return;
        p.classList.remove("is-active");
        p.classList.remove("is-leaving");
      });

      nextPage.classList.add("is-active");
      currentKey = nextKey;

      // run typewriter when instructions becomes active
      if (nextKey === "instructions") runTypewriter();

      // when entering login, update status immediately based on current value
      if (nextKey === "login") updateStatusWhileTyping();
    }, TRANSITION_MS);
  }

  // --- Modal helpers ---
  function openModal() {
    if (!modalHow) return;
    modalHow.classList.add("is-open");
    modalHow.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!modalHow) return;
    modalHow.classList.remove("is-open");
    modalHow.setAttribute("aria-hidden", "true");
  }

  if (modalHow) {
    modalHow.addEventListener("click", (e) => {
      if (e.target === modalHow) closeModal();
    });
    modalHow.querySelectorAll("[data-close-modal]").forEach((b) =>
      b.addEventListener("click", closeModal)
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  // --- Typewriter (safe) ---
  let twTimer = null;
  function runTypewriter() {
    if (!twEl) return;

    if (twTimer) clearInterval(twTimer);
    twTimer = null;

    const text =
      `Welcome to <span class="hl">Instalkgram</span>. ` +
      `Your mission is to inspect what’s public — photos, bio, and posts — ` +
      `and decide if a profile is <span class="hl">easy to stalk</span>. ` +
      `Now, this is a HUGE first task for a rookie like you, but don't fret as Stalk.ai is here for you.
      Stalk.ai is an Artifical Intelligence extension to help you deduce if these profiles are easy to stalk or not.
      But remember, Stalk.ai isn’t magic, it scans and deduced information based on what people share online.`;

    const raw = text;
    let i = 0;

    twEl.innerHTML = "";
    const chars = raw.split("");

    twTimer = setInterval(() => {
      i++;
      twEl.innerHTML = chars.slice(0, i).join("");
      if (i >= chars.length) {
        clearInterval(twTimer);
        twTimer = null;
      }
    }, 18);
  }

  // --- Live status update while typing ---
  function updateStatusWhileTyping() {
    if (!statusText) return;
    const val = (targetId?.value || "").trim();
    statusText.textContent = val ? "INPUT VERIFIED" : "WAITING_FOR_INPUT";
  }

  targetId?.addEventListener("input", updateStatusWhileTyping);

  // --- Button wiring ---
  btnLetsPlay?.addEventListener("click", () => showPage("instructions"));
  btnHowItWorks?.addEventListener("click", openModal);
  btnBackToLanding?.addEventListener("click", () => showPage("landing"));
  btnBeginMission?.addEventListener("click", () => showPage("login"));

  // --- Login -> go to index2.html when username filled ---
  function goToIndex2() {
    const user = (targetId?.value || "").trim();
    if (!user) {
      if (statusText) statusText.textContent = "ENTER_TARGET_ID";
      targetId?.focus();
      return;
    }

    try { localStorage.setItem("instalk_user", user); } catch {}

    if (statusText) statusText.textContent = "ACCESS_GRANTED";
    window.location.href = "index2.html";
  }

  btnSignIn?.addEventListener("click", goToIndex2);
  targetId?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") goToIndex2();
  });

  // Start on landing
  showPage("landing");
});
