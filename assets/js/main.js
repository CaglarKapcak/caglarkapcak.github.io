document.addEventListener('DOMContentLoaded', function() {
    // Footer'a güncel yılı yaz
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobil menü toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
    
    // Yumuşak kaydırma (smooth scrolling)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            }
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Proje kaydırıcıyı başlat
    initProjectsScroller();
    
    // Medium yazılarını yükle
    loadMediumPosts();
    
    // İletişim kopyalama butonlarını başlat
    initContactCopyButtons();
});

// Proje kartlarını yatay kaydırma fonksiyonu
function initProjectsScroller() {
    const scroller = document.querySelector('.projects-scroller');
    if (!scroller) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    scroller.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - scroller.offsetLeft;
        scrollLeft = scroller.scrollLeft;
        scroller.style.cursor = 'grabbing';
    });

    scroller.addEventListener('mouseleave', () => {
        isDown = false;
        scroller.style.cursor = 'grab';
    });

    scroller.addEventListener('mouseup', () => {
        isDown = false;
        scroller.style.cursor = 'grab';
    });

    scroller.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scroller.offsetLeft;
        const walk = (x - startX) * 2;
        scroller.scrollLeft = scrollLeft - walk;
    });

    // Mobil dokunmatik destek
    scroller.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - scroller.offsetLeft;
        scrollLeft = scroller.scrollLeft;
    });

    scroller.addEventListener('touchend', () => {
        isDown = false;
    });

    scroller.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - scroller.offsetLeft;
        const walk = (x - startX) * 2;
        scroller.scrollLeft = scrollLeft - walk;
    });
}

// Medium yazılarını yükleme fonksiyonu
async function loadMediumPosts() {
    const mediumUsername = 'caglarkapcak';
    const recentPostsContainer = document.getElementById('recent-posts');
    
    if (!recentPostsContainer) return;

    try {
        const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
        const rssUrl = `https://medium.com/feed/@${mediumUsername}`;
        
        const response = await fetch(proxyUrl + encodeURIComponent(rssUrl));
        const data = await response.json();
        
        if (data.status === 'ok' && data.items) {
            let postsHTML = '';
            
            // Son 5 yazıyı al
            data.items.slice(0, 5).forEach(item => {
                const title = item.title;
                const link = item.link;
                
                postsHTML += `
                    <a href="${link}" class="post-button" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-medium"></i> ${title}
                    </a>
                `;
            });
            
            recentPostsContainer.innerHTML = postsHTML || '<div class="no-posts">Henüz yazı bulunamadı</div>';
        } else {
            throw new Error('Geçersiz veri formatı');
        }
    } catch (error) {
        console.error('Medium yazıları yüklenirken hata:', error);
        recentPostsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Yazılar yüklenirken hata oluştu. <a href="https://medium.com/@${mediumUsername}" target="_blank">Medium sayfamı ziyaret edin</a></span>
            </div>
        `;
    }
}

// İletişim kopyalama butonları fonksiyonu
function initContactCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', async function() {
            const contactCard = this.closest('.contact-card');
            if (!contactCard) return;
            
            const contactLink = contactCard.querySelector('.contact-link');
            if (!contactLink) return;
            
            const textToCopy = contactLink.href || contactLink.textContent.trim();
            const originalContent = this.innerHTML;
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Başarılı geri bildirim
                this.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
                this.classList.add('success');
                
                // 2 saniye sonra orijinal hale dön
                setTimeout(() => {
                    this.innerHTML = originalContent;
                    this.classList.remove('success');
                }, 2000);
            } catch (err) {
                console.error('Kopyalama hatası:', err);
                this.innerHTML = '<i class="fas fa-times"></i> Hata!';
                this.classList.add('error');
                
                setTimeout(() => {
                    this.innerHTML = originalContent;
                    this.classList.remove('error');
                }, 2000);
            }
        });
    });
}
