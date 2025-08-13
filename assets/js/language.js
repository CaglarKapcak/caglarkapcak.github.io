// Language support
document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('language-toggle');
    let currentLanguage = 'tr'; // Default language
    
    // Language data
    const languages = {
        tr: {
            name: "Ad Soyad",
            nav_about: "Hakkımda",
            nav_projects: "Projeler",
            nav_blog: "Blog",
            nav_contact: "İletişim",
            about_title: "Mekatronik Mühendisi",
            about_p1: "Merhaba, ben [Ad Soyad]. Mekatronik mühendisliği alanında X yıllık deneyime sahibim. Mekanik tasarım, otomasyon sistemleri ve robotik konularında uzmanlaştım.",
            about_p2: "Hedefim, disiplinlerarası bilgimi kullanarak yenilikçi çözümler üretmek ve endüstriyel otomasyon alanında projeler geliştirmektir.",
            skills_title: "Yetenekler",
            skills_mechanical: "Mekanik",
            skills_electronics: "Elektronik",
            skills_software: "Yazılım",
            projects_title: "Projeler",
            project1_desc: "SolidWorks ile tasarlanıp Arduino Mega ile kontrol edilen 3 eksenli SCARA robot. 500g yük kapasiteli.",
            project2_desc: "Nem, sıcaklık ve ışık sensörleriyle çalışan IoT tabanlı otomasyon sistemi.",
            blog_title: "Blog",
            blog_loading: "Yazılar yükleniyor...",
            blog_error: "Yazılar yüklenirken bir hata oluştu.",
            contact_title: "İletişim",
            form_name: "Adınız",
            form_email: "E-posta",
            form_message: "Mesajınız",
            form_submit: "Gönder",
            copy: "Kopyala",
            footer_rights: "Tüm hakları saklıdır"
        },
        en: {
            name: "Full Name",
            nav_about: "About",
            nav_projects: "Projects",
            nav_blog: "Blog",
            nav_contact: "Contact",
            about_title: "Mechatronics Engineer",
            about_p1: "Hello, I'm [Full Name]. I have X years of experience in mechatronics engineering. I specialize in mechanical design, automation systems and robotics.",
            about_p2: "My goal is to use my interdisciplinary knowledge to produce innovative solutions and develop projects in the field of industrial automation.",
            skills_title: "Skills",
            skills_mechanical: "Mechanical",
            skills_electronics: "Electronics",
            skills_software: "Software",
            projects_title: "Projects",
            project1_desc: "3-axis SCARA robot designed with SolidWorks and controlled with Arduino Mega. 500g payload capacity.",
            project2_desc: "IoT-based automation system working with humidity, temperature and light sensors.",
            blog_title: "Blog",
            blog_loading: "Loading posts...",
            blog_error: "Error loading posts.",
            contact_title: "Contact",
            form_name: "Your Name",
            form_email: "Email",
            form_message: "Message",
            form_submit: "Submit",
            copy: "Copy",
            footer_rights: "All rights reserved"
        }
    };
    
    // Set language
    function setLanguage(lang) {
        currentLanguage = lang;
        document.documentElement.lang = lang;
        languageToggle.textContent = lang === 'tr' ? 'EN' : 'TR';
        
        // Update all elements with data-lang attribute
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (languages[lang][key]) {
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = languages[lang][key];
                } else {
                    element.textContent = languages[lang][key];
                }
            }
        });
    }
    
    // Toggle language
    languageToggle.addEventListener('click', () => {
        const newLanguage = currentLanguage === 'tr' ? 'en' : 'tr';
        setLanguage(newLanguage);
    });
    
    // Initialize with default language
    setLanguage(currentLanguage);
});
