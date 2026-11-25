/* =========================================================
   GTA VI / VICE CITY EDITION — INTERACTIVE SCRIPT
   Portofolio: Muhammad Grandis Putra Haryadi
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const toast = document.getElementById("toast");

  /* -------------------------------------------------------
     1. Toast Helper
  ------------------------------------------------------- */
  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  /* -------------------------------------------------------
     2. Sticky Navbar & Active Scroll Spy
  ------------------------------------------------------- */
  function handleScroll() {
    if (window.scrollY > 24) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    let currentId = "hero";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 130;
      if (window.scrollY >= top) {
        currentId = sec.id;
      }
    });

    navItems.forEach((link) => {
      const target = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", target === currentId);
    });
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* -------------------------------------------------------
     3. Mobile Navigation Drawer
  ------------------------------------------------------- */
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -------------------------------------------------------
     4. GTA Wanted Level Stars Interactive Easter Egg
  ------------------------------------------------------- */
  const wantedStars = document.getElementById("wantedStars");
  if (wantedStars) {
    const stars = wantedStars.querySelectorAll(".star");
    let level = 5;

    const renderStars = (val) => {
      stars.forEach((star, idx) => {
        star.classList.toggle("active", idx < val);
      });
    };

    const cycleStars = () => {
      level = level >= 6 ? 1 : level + 1;
      renderStars(level);
      showToast(`Wanted Level: ${level}/6 ★ — Leonida Mode`);
    };

    wantedStars.addEventListener("click", cycleStars);
    wantedStars.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        cycleStars();
      }
    });
  }

  /* -------------------------------------------------------
     5. Photo Color Filter Toggle (About Section)
  ------------------------------------------------------- */
  const togglePhotoVibe = document.getElementById("togglePhotoVibe");
  const aboutPortrait = document.getElementById("aboutPortrait");
  const photoVibeLabel = document.getElementById("photoVibeLabel");

  if (togglePhotoVibe && aboutPortrait && photoVibeLabel) {
    const vibes = [
      { cls: "", label: "Original" },
      { cls: "vibe-vice", label: "Vice Neon" },
      { cls: "vibe-sunset", label: "Leonida Sunset" },
    ];
    let vibeIdx = 0;

    togglePhotoVibe.addEventListener("click", () => {
      vibeIdx = (vibeIdx + 1) % vibes.length;
      aboutPortrait.classList.remove("vibe-vice", "vibe-sunset");
      if (vibes[vibeIdx].cls) {
        aboutPortrait.classList.add(vibes[vibeIdx].cls);
      }
      photoVibeLabel.textContent = vibes[vibeIdx].label;
    });
  }

  /* -------------------------------------------------------
     6. Scroll Reveal & Skill Bar Animation
  ------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  const skillFills = document.querySelectorAll(".skill-meter__fill");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetWidth = entry.target.getAttribute("data-width") || "0%";
            entry.target.style.width = targetWidth;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    skillFills.forEach((bar) => skillObserver.observe(bar));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
    skillFills.forEach((bar) => {
      bar.style.width = bar.getAttribute("data-width") || "0%";
    });
  }

  /* -------------------------------------------------------
     7. Project Category Filter
  ------------------------------------------------------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-filter");

      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      projectCards.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        const match = category === "all" || cardCat === category;
        card.classList.toggle("is-hidden", !match);
        if (match) {
          card.classList.add("visible");
        }
      });
    });
  });

  /* -------------------------------------------------------
     8. Project Mission Briefing Modal
  ------------------------------------------------------- */
  const projectDetails = {
    "1": {
      category: "LANDING PAGE // MISI #01",
      title: "Leonida Neon Store",
      desc: "Platform etalase streetwear bergaya Vice City dengan tata letak responsif, efek kaca neon, pencarian cepat, dan interaksi keranjang tanpa reload halaman.",
      features: [
        "Grid produk responsif untuk mobile, tablet, dan desktop",
        "Filter ukuran, kategori, dan kalkulasi total belanja real-time",
        "Animasi transisi halus dengan performa ringan",
      ],
      tags: ["HTML5", "CSS Grid", "JavaScript ES6+"],
    },
    "2": {
      category: "WEB APP // MISI #02",
      title: "Vice Radio & Weather HUD",
      desc: "Aplikasi web interaktif yang menggabungkan panel cuaca kota dengan visualizer gelombang suara bergaya HUD gim open-world.",
      features: [
        "Antarmuka HUD dengan indikator status langsung",
        "Visualizer spektrum responsif berbasis HTML5 Canvas",
        "Mode tampilan gelap kontras tinggi untuk kenyamanan mata",
      ],
      tags: ["JavaScript", "Canvas API", "CSS Flexbox"],
    },
    "3": {
      category: "LANDING PAGE // MISI #03",
      title: "Sunset Coast Travel",
      desc: "Website agen perjalanan wisata pantai dengan nuansa senja tropis, galeri destinasi, serta kalkulator estimasi biaya perjalanan.",
      features: [
        "Hero visual sinematik dengan animasi scroll halus",
        "Kalkulator paket wisata berdasarkan durasi & jumlah peserta",
        "Integrasi tombol pemesanan langsung menuju WhatsApp",
      ],
      tags: ["HTML5", "CSS Animation", "Vanilla JS"],
    },
    "4": {
      category: "WEB APP // MISI #04",
      title: "CyberTask Mission Board",
      desc: "Aplikasi manajemen produktivitas pribadi bertema papan misi dengan dukungan tambah, edit, filter prioritas, dan penyimpanan lokal browser.",
      features: [
        "Penyimpanan otomatis di LocalStorage agar data tetap aman",
        "Pengelompokan status: Pending, Berjalan, dan Selesai",
        "Pintasan keyboard untuk produktivitas lebih cepat",
      ],
      tags: ["JavaScript", "LocalStorage", "DOM State"],
    },
    "5": {
      category: "UI / UX // MISI #05",
      title: "Vice Design System Kit",
      desc: "Kumpulan komponen antarmuka yang konsisten dan mudah digunakan ulang untuk mempercepat pengembangan proyek web bertema gelap.",
      features: [
        "Sistem variabel warna CSS untuk gradien & aksen neon",
        "Komponen kartu, tombol, modal, dan form terstandarisasi",
        "Kontras teks terjaga demi aksesibilitas yang baik",
      ],
      tags: ["Design Tokens", "CSS Variables", "Figma"],
    },
    "6": {
      category: "UI / UX // MISI #06",
      title: "AutoClub Garage UI",
      desc: "Konsep antarmuka kustomisasi kendaraan interaktif dengan pemilihan warna bodi, panel statistik performa, dan navigasi mobile-first.",
      features: [
        "Pratinjau perubahan tema warna secara instan",
        "Panel perbandingan statistik dengan animasi bar",
        "Struktur navigasi ringkas khusus pengguna layar sentuh",
      ],
      tags: ["UI Prototype", "Responsive", "Interactive JS"],
    },
  };

  const modal = document.getElementById("projectModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalContactCta = document.getElementById("modalContactCta");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalFeatures = document.getElementById("modalFeatures");
  const modalTags = document.getElementById("modalTags");

  function openProjectModal(id) {
    const data = projectDetails[id];
    if (!data || !modal) return;

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    modalFeatures.innerHTML = data.features.map((f) => `<li>${f}</li>`).join("");
    modalTags.innerHTML = data.tags.map((t) => `<span>${t}</span>`).join("");

    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-open-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openProjectModal(btn.getAttribute("data-open-modal"));
    });
  });

  [modalBackdrop, modalClose, modalCloseBtn, modalContactCta].forEach((el) => {
    if (el) el.addEventListener("click", closeProjectModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.hidden) {
      closeProjectModal();
    }
  });

  /* -------------------------------------------------------
     9. Copy Contact Actions
  ------------------------------------------------------- */
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(value);
        showToast(`Disalin ke clipboard: ${value}`);
      } catch {
        showToast(`Kontak: ${value}`);
      }
    });
  });

  /* -------------------------------------------------------
     10. Contact Form Validation & Submission (Email / WhatsApp)
  ------------------------------------------------------- */
  const contactForm = document.getElementById("contactForm");
  const sendViaWaBtn = document.getElementById("sendViaWaBtn");
  const formFeedback = document.getElementById("formFeedback");

  const fields = {
    name: {
      input: document.getElementById("senderName"),
      error: document.getElementById("errorName"),
      validate: (val) => (val.trim().length >= 2 ? "" : "Mohon isi nama minimal 2 karakter."),
    },
    email: {
      input: document.getElementById("senderEmail"),
      error: document.getElementById("errorEmail"),
      validate: (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) ? "" : "Masukkan alamat email yang valid.",
    },
    subject: {
      input: document.getElementById("senderSubject"),
      error: document.getElementById("errorSubject"),
      validate: (val) => (val.trim().length >= 3 ? "" : "Mohon tulis subjek pesan."),
    },
    message: {
      input: document.getElementById("senderMessage"),
      error: document.getElementById("errorMessage"),
      validate: (val) => (val.trim().length >= 10 ? "" : "Pesan minimal 10 karakter."),
    },
  };

  function validateForm() {
    let isValid = true;
    Object.values(fields).forEach(({ input, error, validate }) => {
      const msg = validate(input.value);
      error.textContent = msg;
      input.classList.toggle("invalid", Boolean(msg));
      if (msg) isValid = false;
    });
    return isValid;
  }

  Object.values(fields).forEach(({ input, error, validate }) => {
    input.addEventListener("input", () => {
      const msg = validate(input.value);
      error.textContent = msg;
      input.classList.toggle("invalid", Boolean(msg));
    });
  });

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateForm()) {
        showToast("Periksa kembali kolom form yang belum lengkap.");
        return;
      }

      const name = fields.name.input.value.trim();
      const email = fields.email.input.value.trim();
      const subject = fields.subject.input.value.trim();
      const message = fields.message.input.value.trim();

      const mailtoHref = `mailto:grandisputra13@gmail.com?subject=${encodeURIComponent(
        `[Portofolio] ${subject}`
      )}&body=${encodeURIComponent(
        `Halo Muhammad Grandis Putra Haryadi,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
      )}`;

      formFeedback.hidden = false;
      formFeedback.innerHTML = `
        <strong>MISSION PASSED!</strong> Pesan Anda siap dikirim.
        <a href="${mailtoHref}">Klik di sini jika aplikasi email belum terbuka otomatis</a>.
      `;

      showToast("Pesan berhasil divalidasi! Membuka email...");
      window.location.href = mailtoHref;
      contactForm.reset();
    });
  }

  if (sendViaWaBtn) {
    sendViaWaBtn.addEventListener("click", () => {
      if (!validateForm()) {
        showToast("Lengkapi form terlebih dahulu sebelum mengirim via WhatsApp.");
        return;
      }

      const name = fields.name.input.value.trim();
      const email = fields.email.input.value.trim();
      const subject = fields.subject.input.value.trim();
      const message = fields.message.input.value.trim();

      const waText = `Halo Muhammad Grandis Putra Haryadi,%0A%0ASaya *${encodeURIComponent(
        name
      )}* (${encodeURIComponent(email)}).%0ASubjek: *${encodeURIComponent(
        subject
      )}*%0A%0APesan:%0A${encodeURIComponent(message)}`;

      const waUrl = `https://wa.me/6285863753603?text=${waText}`;
      formFeedback.hidden = false;
      formFeedback.innerHTML = `
        <strong>DISPATCH READY!</strong> Mengarahkan ke WhatsApp 085863753603...
      `;
      showToast("Membuka WhatsApp...");
      window.open(waUrl, "_blank", "noopener,noreferrer");
    });
  }
});
