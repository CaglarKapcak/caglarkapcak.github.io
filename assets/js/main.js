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
        const email = 'caglarkapcak@gmail.com'; // Email adresinizle değiştirin
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

// Medium RSS Çekme Fonksiyonu
function loadMediumPosts() {
    const mediumUsername = 'caglarkapcak433';
    const rssUrl = `https://medium.com/feed/@${mediumUsername}`;
    const corsProxy = 'https://api.allorigins.win/get?url=';
    
    fetch(`${corsProxy}${encodeURIComponent(rssUrl)}`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "text/xml");
            const items = xmlDoc.querySelectorAll('item');
            const recentPostsContainer = document.getElementById('recent-posts');
            
            if (!recentPostsContainer) return;
            
            let postsHTML = '';
            
            // Son 4 yazıyı al
            Array.from(items).slice(0, 4).forEach(item => {
                const title = item.querySelector('title').textContent;
                const link = item.querySelector('link').textContent;
                
                postsHTML += `
                    <a href="${link}" class="post-button" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-medium"></i> ${title}
                    </a>
                `;
            });
            
            recentPostsContainer.innerHTML = postsHTML;
        })
        .catch(error => {
            console.error('Fetch error:', error);
            const recentPostsContainer = document.getElementById('recent-posts');
            if (recentPostsContainer) {
                recentPostsContainer.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Yazılar yüklenirken hata oluştu. <a href="https://medium.com/@${mediumUsername}" target="_blank">Medium sayfamı ziyaret edin</a></span>
                    </div>
                `;
            }
        });
}
