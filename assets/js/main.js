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
    const email = document.getElementById('email').textContent;
    
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(email).then(() => {
            const originalText = copyButton.textContent;
            copyButton.textContent = 'Kopyalandı!';
            setTimeout(() => {
                copyButton.textContent = originalText;
            }, 2000);
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the form data to a server
            // For GitHub Pages, you might need to use a third-party service like Formspree
            
            alert('Mesajınız gönderildi! (Bu demo için gerçekte gönderilmez)');
            contactForm.reset();
        });
    }
    
    // Load blog posts from Medium API
    loadBlogPosts();
});

async function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');
    
    try {
        // Medium RSS feed URL (replace with your actual Medium username)
        const mediumUsername = 'yourmediumusername';
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
