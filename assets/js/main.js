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
        const email = 'caglarkapcak@example.com'; // Gerçek email adresinizle değiştirin
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
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mesajınız gönderildi! (Bu demo için gerçekte gönderilmez)');
            contactForm.reset();
        });
    }
    
    // Initialize projects scroller
    initProjectsScroller();
    
    // Load blog posts from Medium API
    loadBlogPosts();
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

async function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');
    if (!blogContainer) return;
    
    try {
        // Medium RSS feed URL (replace with your actual Medium username)
        const mediumUsername = 'caglarkapcak'; // Medium kullanıcı adınızla değiştirin
        const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;
        
        const response = await fetch(rssUrl);
        const data = await response.json();
        
        if (data.status === 'ok' && data.items) {
            blogContainer.innerHTML = '';
            
            // Display first 4 posts
            data.items.slice(0, 4).forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'blog-post';
                postElement.innerHTML = `
                    <img src="${post.thumbnail || 'assets/images/blog-default.jpg'}" alt="${post.title}">
                    <div class="blog-post-content">
                        <h3>${post.title}</h3>
                        <p>${post.description.substring(0, 150)}...</p>
                        <a href="${post.link}" target="_blank">Devamını oku</a>
                    </div>
                `;
                blogContainer.appendChild(postElement);
            });
        } else {
            blogContainer.innerHTML = '<div class="error" data-lang="blog_error">Yazılar yüklenirken bir hata oluştu.</div>';
        }
    } catch (error) {
        console.error('Error loading blog posts:', error);
        blogContainer.innerHTML = '<div class="error" data-lang="blog_error">Yazılar yüklenirken bir hata oluştu.</div>';
    }
}
