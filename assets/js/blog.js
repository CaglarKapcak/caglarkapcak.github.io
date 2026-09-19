/* ===============================================================
   blog.js — Medium
   Medium'un genel bir yazı API'si yok; herkese açık RSS akışını
   (medium.com/feed/@kullaniciadi) rss2json.com üzerinden JSON'a
   çevirip okuyoruz. Anahtar gerekmez.

   İki liste basılır:
     1) Tavsiye ettiklerim → site.json > blog.oneCikanUrls
        (RSS akışında bu adreslerle eşleşen yazılar öne çıkar)
     2) Son yazılar        → akıştaki en yeni N yazı
   =============================================================== */

(function () {
  "use strict";

  const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";

  const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const tarih = (iso) =>
    new Date(iso).toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" });

  const kisaTarih = (iso) =>
    new Date(iso).toLocaleDateString("tr-TR", { month: "short", year: "numeric" });

  /* Medium'un RSS içeriğinden HTML etiketlerini temizleyip kısa özet çıkarır */
  function ozetCikar(html, uzunluk) {
    const duz = String(html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    return duz.length > uzunluk ? duz.slice(0, uzunluk).trim() + "…" : duz;
  }

  /* okuma süresini Medium içeriğinden kabaca tahmin eder (~200 kelime/dk) */
  function okumaSuresi(html) {
    const kelime = String(html || "").replace(/<[^>]*>/g, " ").trim().split(/\s+/).length;
    return Math.max(1, Math.round(kelime / 200));
  }

  /* iki URL'yi izleme parametrelerinden bağımsız karşılaştırır */
  function urlEsit(a, b) {
    const sadelestir = (u) => {
      try {
        const x = new URL(u);
        return decodeURIComponent(x.origin + x.pathname).replace(/\/$/, "").toLowerCase();
      } catch { return String(u).toLowerCase(); }
    };
    return sadelestir(a) === sadelestir(b);
  }

  function oneKart(y) {
    return `
      <a class="one-kart" href="${esc(y.link)}" target="_blank" rel="noopener">
        <div>
          <h4>${esc(y.title)}</h4>
          <p>${esc(ozetCikar(y.description, 120))}</p>
        </div>
        <div class="satir">
          <span>${kisaTarih(y.pubDate)}</span>
          <span>${okumaSuresi(y.description)} dk</span>
        </div>
      </a>`;
  }

  function yaziSatiri(y) {
    return `
      <a class="yazi" href="${esc(y.link)}" target="_blank" rel="noopener">
        <time datetime="${esc(y.pubDate)}">${tarih(y.pubDate)}</time>
        <div>
          <h4>${esc(y.title)}</h4>
          <p>${esc(ozetCikar(y.description, 150))}</p>
        </div>
        <span class="yazi-sure">${okumaSuresi(y.description)} dk</span>
      </a>`;
  }

  async function basla() {
    const oneKutu = document.getElementById("oneCikan");
    const sonKutu = document.getElementById("sonYazilar");
    if (!oneKutu || !sonKutu) return;

    const site = await window.SITE_HAZIR;
    const ayar = (site && site.blog) || {};
    const kullaniciAdi = ayar.kullaniciAdi;

    if (!kullaniciAdi) {
      oneKutu.innerHTML = `<div class="durum">Medium kullanıcı adı tanımlı değil.
        <code>data/site.json</code> içindeki <code>blog.kullaniciAdi</code> alanına
        Medium adresindeki kullanıcı adını yaz (örnek: <code>kapcag218</code>).</div>`;
      sonKutu.innerHTML = "";
      return;
    }

    const medyaAdresi = "https://medium.com/@" + kullaniciAdi;
    const rssAdresi = "https://medium.com/feed/@" + kullaniciAdi;
    document.getElementById("blogKaynak").textContent = "@" + kullaniciAdi;

    try {
      const cevap = await fetch(RSS2JSON + encodeURIComponent(rssAdresi));
      if (!cevap.ok) throw new Error("HTTP " + cevap.status);
      const veri = await cevap.json();
      if (veri.status !== "ok") throw new Error(veri.message || "rss2json hatası");

      const tumYazilar = veri.items || [];
      const sonYazilar = tumYazilar.slice(0, ayar.sonYaziSayisi || 5);

      /* --- tavsiye edilenler: verilen adreslerle akıştaki yazıları eşleştir --- */
      const istenenler = (ayar.oneCikanUrls || []).filter(Boolean);
      const oneCikanlar = istenenler
        .map((istenen) => tumYazilar.find((y) => urlEsit(y.link, istenen)))
        .filter(Boolean);

      const eksikSayisi = istenenler.length - oneCikanlar.length;

      oneKutu.innerHTML = oneCikanlar.length
        ? oneCikanlar.map(oneKart).join("") +
          (eksikSayisi > 0
            ? `<p class="durum">${eksikSayisi} yazı henüz akışta görünmüyor — yayımlandığında burada otomatik belirir.</p>`
            : "")
        : `<div class="durum">Tavsiye ettiğin yazılar henüz Medium akışında görünmüyor.
             Yayımladığında bu liste otomatik dolacak.</div>`;

      /* --- son yazılar --- */
      sonKutu.innerHTML = sonYazilar.length
        ? sonYazilar.map(yaziSatiri).join("")
        : `<div class="durum">Burada henüz yazı yok. İlk yazını
             <a href="${esc(medyaAdresi)}" target="_blank" rel="noopener">Medium</a>'da
             yayımladığında bu liste kendiliğinden dolar.</div>`;

      document.getElementById("blogAlt").innerHTML =
        `<a href="${esc(medyaAdresi)}" target="_blank" rel="noopener">Tüm yazılar — @${esc(kullaniciAdi)}</a>`;

      const sayac = document.getElementById("sayacYazi");
      if (sayac) sayac.textContent = tumYazilar.length;

    } catch (hata) {
      console.error("Medium:", hata);
      const mesaj = `<div class="durum">Yazılar şu an çekilemedi. Doğrudan
        <a href="${esc(medyaAdresi)}" target="_blank" rel="noopener">@${esc(kullaniciAdi)}</a>
        adresinden okuyabilirsin.</div>`;
      oneKutu.innerHTML = mesaj;
      sonKutu.innerHTML = "";
    }
  }

  document.addEventListener("DOMContentLoaded", basla);
})();
