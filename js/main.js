// Basit bir proje filtreme örneği
document.addEventListener('DOMContentLoaded', function() {
    // Projeler sayfasında filtreleme yapabilirsiniz
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if(filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                filterProjects(filter);
            });
        });
    }
    
    function filterProjects(filter) {
        const projects = document.querySelectorAll('.project-item');
        
        projects.forEach(project => {
            if(filter === 'all' || project.classList.contains(filter)) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
