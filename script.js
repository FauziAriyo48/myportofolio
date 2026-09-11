document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.fullscreen-section');
    const navButtons = document.querySelectorAll('.nav-btn');
    const projectPagesContainer = document.getElementById('project-pages');
    const paginationContainer = document.getElementById('project-pagination');
    const projectCards = Array.from(document.querySelectorAll('.project-card'));
    const skillsPagesContainer = document.getElementById('skills-pages');
    const skillsPaginationContainer = document.getElementById('skills-pagination');
    const itemsPerPage = 2;

    function showSection(targetId) {
        sections.forEach(section => {
            section.classList.remove('active');
            const reveals = section.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
            reveals.forEach(el => el.classList.remove('active'));
        });

        navButtons.forEach(btn => btn.classList.remove('active'));

        const currentSection = document.querySelector(targetId);
        if (currentSection) {
            currentSection.classList.add('active');

            setTimeout(() => {
                const reveals = currentSection.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
                reveals.forEach(el => el.classList.add('active'));
            }, 100);
        }

        const activeBtn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    function renderProjectPages() {
        if (!projectPagesContainer || !paginationContainer) return;

        const totalPages = Math.ceil(projectCards.length / itemsPerPage);
        const existingPages = Array.from(projectPagesContainer.querySelectorAll('.project-page'));

        existingPages.forEach(page => page.remove());
        paginationContainer.innerHTML = '';

        for (let i = 0; i < totalPages; i++) {
            const page = document.createElement('div');
            page.className = 'project-page' + (i === 0 ? ' active' : '');
            page.dataset.page = String(i + 1);

            const start = i * itemsPerPage;
            const pageCards = projectCards.slice(start, start + itemsPerPage);

            pageCards.forEach((card, index) => {
                card.classList.remove('delay-1', 'delay-2', 'delay-3');
                if (index > 0) card.classList.add(`delay-${index}`);
                page.appendChild(card);
            });

            projectPagesContainer.appendChild(page);

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'page-btn' + (i === 0 ? ' active' : '');
            button.textContent = String(i + 1);
            button.dataset.page = String(i + 1);
            button.addEventListener('click', () => {
                const pages = document.querySelectorAll('.project-page');
                pages.forEach(p => p.classList.toggle('active', Number(p.dataset.page) === Number(button.dataset.page)));
                document.querySelectorAll('.page-btn').forEach(btn => {
                    btn.classList.toggle('active', Number(btn.dataset.page) === Number(button.dataset.page));
                });
            });
            paginationContainer.appendChild(button);
        }
    }

    function renderSkillsPages() {
        if (!skillsPagesContainer || !skillsPaginationContainer) return;

        const pages = Array.from(skillsPagesContainer.querySelectorAll('.skills-page'));
        skillsPaginationContainer.innerHTML = '';

        const labels = ['Skills', 'Experience', 'Certificate'];

        pages.forEach((page, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'skills-page-btn' + (index === 0 ? ' active' : '');
            button.textContent = labels[index] || `Page ${index + 1}`;
            button.dataset.page = String(index + 1);
            button.addEventListener('click', () => {
                const allPages = skillsPagesContainer.querySelectorAll('.skills-page');
                allPages.forEach(p => p.classList.toggle('active', Number(p.dataset.page) === Number(button.dataset.page)));
                skillsPaginationContainer.querySelectorAll('.skills-page-btn').forEach(btn => {
                    btn.classList.toggle('active', Number(btn.dataset.page) === Number(button.dataset.page));
                });
            });
            skillsPaginationContainer.appendChild(button);
        });
    }

    showSection('#hero');

    navButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            showSection(targetId);
        });
    });

    renderProjectPages();
    renderSkillsPages();
});
