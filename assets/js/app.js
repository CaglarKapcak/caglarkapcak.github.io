/* ===============================================================
   app.js — verileri yükler, sayfayı basar
   İçerik burada değil: data/*.json dosyalarında.
   =============================================================== */

const $  = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

async function jsonYukle(yol) {
  const cevap = await fetch(yol, { cache: "no-cache" });
  if (!cevap.ok) throw new Error(yol + " → HTTP " + cevap.status);
  return cevap.json();
}

/* blog.js bu sözü bekliyor: site ayarlarını oradan alıyor */
let siteCoz;
window.SITE_HAZIR = new Promise((r) => { siteCoz = r; });

/* küçük buton ikonları — bağlantı türüne göre proje ve arşiv kartlarında kullanılır */
const BAGLANTI_IKON = {
  github: '<svg viewBox="0 0 24 24"><path d="M9 8l-4 4 4 4M15 8l4 4-4 4"/></svg>',
  grabcad: '<svg viewBox="0 0 24 24"><path d="M12 2.6 21 7.3v9.4L12 21.4 3 16.7V7.3z"/><path d="M3 7.3 12 12v9.4M21 7.3 12 12"/></svg>'
};
const BAGLANTI_ETIKET = { github: "GitHub", grabcad: "GrabCAD" };

function baglantiButonu(tur, url) {
  const ikon = BAGLANTI_IKON[tur] || "";
  const etiket = BAGLANTI_ETIKET[tur] || tur;
  return `<a class="mini-buton" href="${esc(url)}" target="_blank" rel="noopener">${ikon}${esc(etiket)}</a>`;
}

/* ---------------------------------------------------------------
   1. Site bilgileri
--------------------------------------------------------------- */
function siteBas(site) {
  document.title = `${site.ad} — ${site.unvan}`;

  const alanlar = {
    ad: site.ad,
    unvan: site.unvan,
    unvanKisa: site.unvanKisa || site.unvan.toLowerCase(),
    konum: site.konum,
    ozet: site.ozet,
    altYazi: `${site.ad} — ${site.unvan}`
  };
  Object.entries(alanlar).forEach(([anahtar, deger]) => {
    $$(`[data-site="${anahtar}"]`).forEach((e) => { e.textContent = deger; });
  });

  const h1 = $('[data-site="adSatirli"]');
  if (h1) h1.innerHTML = site.ad.split(" ").map(esc).join("<br>");

  const rev = $("#altRev");
  if (rev) rev.textContent = new Date().getFullYear();

  const yazi = $("#hakkimdaYazi");
  if (yazi) yazi.innerHTML = (site.hakkimda || []).map((p) => `<p>${esc(p)}</p>`).join("");

  const yetenekler = $("#yetenekler");
  if (yetenekler) {
    yetenekler.innerHTML = (site.yetenekler || []).map((grup) => `
      <div class="yetenek-grup">
        <h4>${esc(grup.grup)}</h4>
        <div class="yetenek-liste">
          ${(grup.beceriler || []).map((b) => `<span class="yetenek-cip">${esc(b)}</span>`).join("")}
        </div>
      </div>`).join("");
  }
}

/* hero fotoğrafı yoksa dokulu zemine düş */
function heroFotoKontrol() {
  const foto = $("#heroFoto");
  const kutu = $(".hero-gorsel");
  if (!foto || !kutu) return;
  const dus = () => kutu.classList.add("fotosuz");
  foto.addEventListener("error", dus);
  if (foto.complete && foto.naturalWidth === 0) dus();
}

/* ---------------------------------------------------------------
   2. Projeler — filtreli, "daha fazla" ile açılan liste
--------------------------------------------------------------- */
function projeleriKur(projeler, adim) {
  const liste  = $("#projeListe");
  const filtre = $("#projeFiltre");
  const daha   = $("#projeDaha");
  if (!liste) return;

  const sayfaAdimi = adim || 4;
  let aktifKategori = "Tümü";
  let gosterilen = sayfaAdimi;

  $("#projeSayi").textContent = projeler.length;

  const kategoriler = ["Tümü", ...new Set(projeler.map((p) => p.kategori).filter(Boolean))];
  filtre.innerHTML = kategoriler.map((k) =>
    `<button class="filtre" type="button" aria-pressed="${k === "Tümü"}">${esc(k)}</button>`).join("");

  function kart(p) {
    const foto = p.gorsel
      ? `<div class="kart-foto"><img src="${esc(p.gorsel)}" alt="" loading="lazy"></div>` : "";
    const butonlar = (p.baglantilar || [])
      .map((b) => baglantiButonu(b.tur, b.url)).join("");

    return `
      <div class="kart">
        ${foto}
        <div class="kart-ust"><span>${esc(p.kod || "")}</span><span>${esc(p.yil || "")}</span></div>
        <div class="kart-govde">
          <h3>${esc(p.baslik)}</h3>
          <p>${esc(p.aciklama)}</p>
        </div>
        <div class="kart-alt">
          ${(p.etiketler || []).map((t) => `<span class="etiket">${esc(t)}</span>`).join("")}
        </div>
        ${butonlar ? `<div class="kart-baglantilar">${butonlar}</div>` : ""}
      </div>`;
  }

  function ciz() {
    const suzulen = aktifKategori === "Tümü"
      ? projeler
      : projeler.filter((p) => p.kategori === aktifKategori);

    liste.innerHTML = suzulen.slice(0, gosterilen).map(kart).join("")
      || `<p class="durum">Bu başlıkta henüz proje yok.</p>`;

    liste.querySelectorAll(".kart-foto img").forEach((img) => {
      img.addEventListener("error", () => img.closest(".kart-foto")?.remove());
    });

    daha.hidden = suzulen.length <= gosterilen;
    daha.textContent = `Daha fazla proje (${suzulen.length - gosterilen})`;
  }

  filtre.addEventListener("click", (e) => {
    const dugme = e.target.closest(".filtre");
    if (!dugme) return;
    aktifKategori = dugme.textContent;
    gosterilen = sayfaAdimi;
    $$("#projeFiltre .filtre").forEach((b) =>
      b.setAttribute("aria-pressed", b === dugme));
    ciz();
  });

  daha.addEventListener("click", () => { gosterilen += sayfaAdimi; ciz(); });

  ciz();
}

/* ---------------------------------------------------------------
   3. Öğrenme arşivi — kategori filtreli kart listesi
--------------------------------------------------------------- */
function arsiviKur(kayitlar) {
  const liste  = $("#arsivListe");
  const filtre = $("#arsivFiltre");
  const bos    = $("#arsivBos");
  if (!liste) return;

  let aktifKategori = "Tümü";
  $("#arsivSayi").textContent = kayitlar.length;

  const kategoriler = ["Tümü", ...new Set(kayitlar.map((k) => k.kategori).filter(Boolean))];
  filtre.innerHTML = kategoriler.map((k) =>
    `<button class="filtre" type="button" aria-pressed="${k === "Tümü"}">${esc(k)}</button>`).join("");

  function kart(k) {
    return `
      <div class="kart">
        <div class="arsiv-kart-govde">
          <h3>${esc(k.kategori || "")}</h3>
          <h4>${esc(k.baslik)}</h4>
          <p>${esc(k.aciklama)}</p>
        </div>
        <div class="kart-baglantilar">
          ${baglantiButonu(k.tur, k.link)}
        </div>
      </div>`;
  }

  function ciz() {
    const suzulen = aktifKategori === "Tümü"
      ? kayitlar
      : kayitlar.filter((k) => k.kategori === aktifKategori);

    liste.innerHTML = suzulen.map(kart).join("");
    bos.hidden = suzulen.length > 0;
  }

  filtre.addEventListener("click", (e) => {
    const dugme = e.target.closest(".filtre");
    if (!dugme) return;
    aktifKategori = dugme.textContent;
    $$("#arsivFiltre .filtre").forEach((b) => b.setAttribute("aria-pressed", b === dugme));
    ciz();
  });

  ciz();
}

/* ---------------------------------------------------------------
   4. Hero sayaçları
--------------------------------------------------------------- */
function sayacBas(projeSayisi, arsivSayisi, deneyim) {
  const el = $("#sayac");
  if (!el) return;
  const satir = (etiket, deger) => `<div><dt>${etiket}</dt><dd>${deger}</dd></div>`;
  el.innerHTML =
    satir("PROJE", projeSayisi) +
    satir("ÖĞRENME KAYNAĞI", arsivSayisi) +
    satir("DENEYİM", esc(deneyim || "—"));
}

/* ---------------------------------------------------------------
   5. İletişim
--------------------------------------------------------------- */
const IKON = {
  mail: '<svg viewBox="0 0 24 24"><rect x="2.5" y="4.5" width="19" height="15"/><path d="M2.5 6.5 12 13l9.5-6.5"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18"/><path d="M7.5 10.5V17M7.5 7.1v.1M11.5 17v-6.5M11.5 13.2c0-1.6 1-2.7 2.5-2.7s2.5 1.1 2.5 2.7V17"/></svg>',
  grabcad: BAGLANTI_IKON.grabcad,
  medium: '<svg viewBox="0 0 24 24"><circle cx="7" cy="12" r="4.6"/><ellipse cx="15.7" cy="12" rx="3.1" ry="4.6"/><ellipse cx="21.2" cy="12" rx="1.1" ry="4.6"/></svg>'
};

function iletisimBas(bilgi) {
  const el = $("#iletisimListe");
  if (!el) return;
  const kisalt = (url) => String(url).replace(/^https?:\/\/(www\.)?/, "");
  const kartlar = [
    { ikon: IKON.mail,     ad: "E-posta",  metin: bilgi.mail, href: "mailto:" + bilgi.mail, yeni: false },
    { ikon: IKON.linkedin, ad: "LinkedIn", metin: kisalt(bilgi.linkedin), href: bilgi.linkedin, yeni: true },
    { ikon: IKON.grabcad,  ad: "GrabCAD",  metin: kisalt(bilgi.grabcad),  href: bilgi.grabcad,  yeni: true },
    { ikon: IKON.medium,   ad: "Medium",   metin: kisalt(bilgi.medium),   href: bilgi.medium,   yeni: true }
  ];
  el.innerHTML = kartlar.map((k) => `
    <a class="iletisim-kart" href="${esc(k.href)}" ${k.yeni ? 'target="_blank" rel="noopener"' : ""}>
      ${k.ikon}<b>${k.ad}</b><span>${esc(k.metin)}</span>
    </a>`).join("");
}

/* ---------------------------------------------------------------
   6. Menü + kaydırmada aktif bağlantı
--------------------------------------------------------------- */
function menuKur() {
  const dugme = $("#menuDugme");
  const menu  = $("#menu");

  if (dugme && menu) {
    dugme.addEventListener("click", () => {
      const acik = menu.classList.toggle("acik");
      dugme.setAttribute("aria-expanded", acik);
    });
    menu.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        menu.classList.remove("acik");
        dugme.setAttribute("aria-expanded", "false");
      }
    });
  }

  const baglar = $$(".menu a");
  const bolumler = baglar.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  if (!("IntersectionObserver" in window) || !bolumler.length) return;

  const gozlemci = new IntersectionObserver((girdiler) => {
    girdiler.forEach((g) => {
      if (!g.isIntersecting) return;
      baglar.forEach((a) =>
        a.classList.toggle("aktif", a.getAttribute("href") === "#" + g.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  bolumler.forEach((b) => gozlemci.observe(b));
}

/* ---------------------------------------------------------------
   Başlat
--------------------------------------------------------------- */
(async function baslat() {
  heroFotoKontrol();
  menuKur();

  try {
    const [site, projeler, arsiv] = await Promise.all([
      jsonYukle("data/site.json"),
      jsonYukle("data/projeler.json"),
      jsonYukle("data/arsiv.json")
    ]);

    siteBas(site);
    iletisimBas(site.iletisim || {});
    sayacBas(projeler.length, arsiv.length, site.deneyim);
    projeleriKur(projeler, site.gosterilenProje);
    arsiviKur(arsiv);
    siteCoz(site);

  } catch (hata) {
    console.error("Veri yüklenemedi:", hata);
    siteCoz(null);
    const uyari = $("#projeListe");
    if (uyari) {
      uyari.innerHTML = `<p class="durum">İçerik dosyaları okunamadı.
        Siteyi bilgisayarında denerken klasörde <code>python3 -m http.server 8000</code>
        çalıştırıp <code>localhost:8000</code> adresini aç.</p>`;
    }
  }
})();
