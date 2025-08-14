 // Language support
document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('language-toggle');
    let currentLanguage = 'tr'; // Default language
    
    // Language data
    const languages = {
        tr: {
            name: "Çağlar Kapcak",
            nav_about: "Hakkımda",
            nav_projects: "Projeler",
            nav_blog: "Blog",
            nav_contact: "İletişim",
            nav_notes:"Çalışma ve Öğrenme Arşivim",
            about_title: "Mekatronik Mühendisi",
            about_p1: "Merhaba, ben Çağlar Kapcak. Mekatronik mühendisliği alanında 1 yıllık deneyime sahibim. SolidWorks, Siemens NX ve Ansys ile tasarım ve analiz çalışmaları yapıyorum.",
            about_p2:"MATLAB ve Python kullanarak farklı projeler geliştirdim. Teknolojiye meraklı, öğrenmeye açık ve üretken bir mühendis olarak hem teknik hem de yaratıcı çözümler üretmeyi seviyorum",
            about_p3: "Hedefim, disiplinlerarası bilgimi kullanarak yenilikçi çözümler üretmek ve endüstriyel otomasyon alanında projeler geliştirmektir.",
            skills_title: "Yetenekler",
            skills_mechanical: "Mekanik",
            skills_electronics: "Elektronik",
            skills_plc:"PLC Programlama",
            skills_software: "Yazılım",
            projects_title: "Projeler",
            project1_desc: "PLC tabanlı, kızılötesi sensör destekli çift robot kol paketleme sistemi tasarlayıp Factory I/O’da simüle ettim.",
            project2_desc: "Nem, sıcaklık ve ışık sensörleriyle çalışan IoT tabanlı otomasyon sistemi.",
            project3_desc:"Robot kol, görüntü işleme ve makine öğrenmesi ile kutuların boyutunu otomatik algılar. Üretim ve paketlemede hızlı ve doğru sınıflandırma sağlar.",
            project4_desc:"OkurTakip, kitap ve makalelerinizi düzenli şekilde kaydedip okuma ilerlemenizi takip eden masaüstü bir uygulamadır. İstatistikler, grafikler ve kişiselleştirilebilir arayüz ile okuma alışkanlıklarınızı analiz etmenizi sağlar.",
            project5_desc:"Çoklu sensör entegrasyonlu akıllı robot kontrol sistemi. Engelden kaçma, çizgi takibi, sıcaklık ve gaz seviyesi ölçümü yapabilen otonom robot",
            project6_desc:"Görüntü işleme ve yapay zeka teknolojileriyle kutuları milisaniyeler içinde boyutlarına göre algılayıp ayıran tamamen otonom bir robot kol sistemi. Endüstriyel verimliliği artıran, hızlı ve hatasız sınıflandırma çözümü sunar.",
            project_robots:"Robot Kol",
            project1_title:"Paketleme Sistemi",
            project1_tit1:"Paketleme Sistemi Projesi",
            project2_title:"Akıllı Sera Otomasyonu",
            project2_titt2:"Akıllı Sera Otomasyon Projesi",
            project3_title:"Akıllı Boyut Algılama Robot Kol",
            project3_titl3:"Akıllı Boyut Algılama Robot Kol Projesi",
            project4_title:"OkurTakip",
            project5_title:"Otonom Devriye Aracı",
            project5_titt5:"Otonom Devriye Araç Projesi",
            project2_card:"Sensör",
            project4_card:"Windows Uygulaması",
            project5_card:"Otonom Robot",
            project6_title:"Akıllı Boyut Algılama Robot Kol Sistemi",
            blog_title: "Blog",
            blog_loading: "Yazılar yükleniyor...",
            blog_error: "Yazılar yüklenirken bir hata oluştu.",
            contact_title: "İletişim",
            notes_titl:"Çalışma ve Öğrenme Arşivim",
            notes1_title:"MATLAB Notları",
            notes1_p1:"Temel Matlab kullanımı, veri analizi ve simulasyon notlarım",
            notes2_titl:"Solidworks Notları",
            notes2_p2:"3D modelleme tasarım ve montaj egzersizlerim.",
            notes3_title:"Leetcode Çözümleri",
            notes3_p1:"LeetCode üzerindeki algoritma ve veri yapısı sorularına kendi çözüm yollarımı paylaştığım bir repo. Kodlar, farklı problem tiplerine yönelik pratik ve anlaşılır çözümler içeriyor.",
            notes4_title:"Python Egzersizler",
            notes4_p1:"Python’un temel konularını öğrenmek için yazdığım örnek kodların yer aldığı bir repo. Basit ve anlaşılır örneklerle temel programlama mantığını gösteriyor.",
            notes5_title:"Python ile Siber Güvenlik Scriptleri",
            notes5_p1:"Siber güvenlik alanında ağ tarama, zafiyet analizi ve test süreçleri için geliştirdiğim Python scriptlerinden oluşan bir repo. Güvenlik testlerini kolaylaştıran pratik ve özelleştirilebilir araçlar içerir.",
            notes6_title:"Bash Script Notları",
            notes6_p1:"Bash komutları ve script yazımına dair temel notlarımın yer aldığı bir repo. Komut satırı otomasyonunu öğrenmek isteyenler için pratik örnekler ve açıklamalar içerir.",
            notes7_title:"Arduino Notları",
            notes7_p1:"Arduino ile geliştirdiğim temel projeler ve uygulamalı notların bulunduğu bir repo. Elektronik ve programlamayı öğrenmek isteyenler için basit devre örnekleri ve kodlar içerir.",  
            form_name: "Adınız",
            form_email: "E-posta",
            form_message: "Mesajınız",
            form_submit: "Gönder",
            copy: "Kopyala",
            project_messa: "Projeleri görmek için yana kaydırın",
            footer_rights: "Tüm hakları saklıdır"
        },
        en: {
            name: "Çağlar Kapcak",
            nav_about: "About",
            nav_projects: "Projects",
            nav_blog: "Blog",
            nav_contact: "Contact",
            nav_notes:"My Study and Learning Archive",
            about_title: "Mechatronics Engineer",
            about_p1: "Hello, I'm Çağlar Kapcak. I have 1 years of experience in mechatronics engineering. I perform design and analysis work using SolidWorks, Siemens NX, and Ansys.",
            about_p2:"I have developed various projects using MATLAB and Python. As an engineer who is curious about technology, open to learning, and productive, I enjoy producing both technical and creative solutions.",
            about_p3: "My goal is to use my interdisciplinary knowledge to produce innovative solutions and develop projects in the field of industrial automation.",
            skills_title: "Skills",
            skills_mechanical: "Mechanical",
            skills_electronics: "Electronics",
            skills_plc:"PLC Programming",
            skills_software: "Software",
            projects_title: "Projects",
            project1_desc: "I designed a PLC-based, infrared sensor-supported dual robot arm packaging system and simulated it in Factory I/O.",
            project2_desc: "IoT-based automation system working with humidity, temperature and light sensors.", 
            project3_desc:"The robotic arm automatically detects the size of boxes using image processing and machine learning. It enables fast and accurate classification in production and packaging.",
            project4_desc:"OkurTakip is a desktop application that regularly records your books and articles and tracks your reading progress. It allows you to analyze your reading habits with statistics, graphs, and a customizable interface.",
            project5_desc:"Smart robot control system with multi-sensor integration. Autonomous robot capable of obstacle avoidance, line tracking, temperature and gas level measurement.",
            project6_desc:"A fully autonomous robotic arm system that detects and sorts boxes by size within milliseconds using computer vision and AI technologies. Delivers fast, precise, and efficient classification for enhanced industrial productivity.",
            project_robots:"Robots Arm",
            project1_title:"Packaging System", 
            project1_tit1:"Packaging System Project",
            project2_title:"Smart Greenhouse Automation",
            project2_titt2:"Smart Greenhouse Automation Project",
            project3_titl3:"Intelligent Size Detection Robot Arm Project",
            project3_title:"Intelligent Size Detection Robot Arm",
            project4_title:"Reader Tracking",
            project5_title:"Autonomous Patrol Vehicle",
            project5_titt5:"Autonomous Patrol Vehicle Project",
            project2_card:"Sensor",
            project4_card:"Windows Application",
            project5_card:"Autonomous Robot",
            project6_title:"Smart Size Detection Robotic Arm",
            blog_title: "Blog",
            blog_loading: "Loading posts...",
            blog_error: "Error loading posts.",
            notes_titl:"My Work and Study Archive",
            notes1_title:"Matlab Notes",
            notes1_p1:"My notes on basic Matlab usage, data analysis, and simulation",
            notes2_titl:"Solidworks Notes",
            notes2_p2:"My 3D modeling design and assembly exercises.",
            notes3_title:"Leetcode Solutions",
            notes3_p1:"A repository where I share my own solutions to algorithm and data structure questions on LeetCode. The code contains practical and understandable solutions for different types of problems.",
            notes4_title:"Python Exercises",
            notes4_p1:"A repository containing sample code I wrote to learn the basics of Python. It demonstrates basic programming logic with simple and easy-to-understand examples.",
            notes5_title:"Cyber Security Scripts with Python",
            notes5_p1:"A repository of Python scripts I developed for network scanning, vulnerability analysis, and testing processes in the field of cybersecurity. It contains practical and customizable tools that simplify security testing.",
            notes6_title:"Bash Script Notes",
            notes6_p1:"A repository containing my basic notes on Bash commands and script writing. It includes practical examples and explanations for those who want to learn command line automation.",
            notes7_title:"Arduino Notes",
            notes7_p1:"A repository containing basic projects and practical notes I developed with Arduino. It includes simple circuit examples and codes for those who want to learn electronics and programming.",
            contact_title: "Contact",
            form_name: "Your Name",
            form_email: "Email",
            form_message: "Message",
            form_submit: "Submit",
            copy: "Copy",
            project_messa:"Swipe sideways to view projects",
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
