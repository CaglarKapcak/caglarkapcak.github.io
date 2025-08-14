document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
    
    // Smooth scrolling for navigation
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
    
    // Email copy functionality
    const copyButton = document.getElementById('copy-email');
    if (copyButton) {
        const email = 'caglarkapcak@gmail.com';
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(email).then(() => {
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Kopyalandı!';
                setTimeout(() => {
                    copyButton.textContent = originalText;
                }, 2000);
            });
        });
    }
    
    // Initialize projects scroller
    initProjectsScroller();
    
    // Load Medium blog posts
    loadMediumPosts();
});

// Projects horizontal scroller functionality
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

    // Touch support for mobile devices
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

// Medium RSS Çekme Fonksiyonu (Güncellenmiş)
async function loadMediumPosts() {
    const mediumUsername = 'caglarkapcak433';
    const recentPostsContainer = document.getElementById('recent-posts');
    
    if (!recentPostsContainer) return;

    try {
        // 1. Yöntem: RSS Proxy
        const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
        const rssUrl = `https://medium.com/feed/@${mediumUsername}`;
        
        const response = await fetch(proxyUrl + encodeURIComponent(rssUrl));
        const data = await response.json();
        
        if (data.status === 'ok' && data.items) {
            let postsHTML = '';
            
            // Son 4 yazıyı al
            data.items.slice(0, 4).forEach(item => {
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
