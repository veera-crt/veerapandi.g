document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal and Parallax animations removed for performance/no-animation preference.

    // 0. Scroll Progress Tracker & Navbar Feedback
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-container';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);

    const progressFill = progressBar.querySelector('.scroll-progress-bar');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        // Calculate scroll percentage
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        if (progressFill) progressFill.style.width = scrolled + "%";

        // Navbar translucent effect
        if (navbar) {
            if (winScroll > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 1. Dynamic Cursor Glow & Tile Spotlight Effect
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        // Move Global Cursor Glow
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Card Spotlight Effect
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            const rect = tile.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            tile.style.setProperty('--mouse-x', `${x}px`);
            tile.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 5. Contact Form Handler (Spider-Sense Simulation)
    const contactForm = document.querySelector('.apple-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Web-Net Deployed...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Signal received by WEBSEC. Secure transmission confirmed.');
                btn.textContent = originalText;
                btn.disabled = false;
                contactForm.reset();
            }, 1200);
        });
    }

    // 6. Theme Toggle Logic Removed
    // Defaulting to Dark Theme permanently
    const lightSheet = document.getElementById('light-theme-sheet');
    if (lightSheet) {
        lightSheet.disabled = true;
    }

    // 7. Active Menu Highlighter REMOVED (Handled by HTML pages)

    // 8. Grade View Toggle
    const gradeBtn = document.getElementById('toggle-grade-btn');
    const gradeContent = document.getElementById('grade-content');

    if (gradeBtn && gradeContent) {
        gradeBtn.addEventListener('click', () => {
            gradeContent.classList.toggle('expanded');
            if (gradeContent.classList.contains('expanded')) {
                gradeBtn.innerHTML = 'Hide Grades &rsaquo;';
            } else {
                gradeBtn.innerHTML = 'View Grades &rsaquo;';
            }
        });
    }

    // 9. Dynamic Experience Duration Calculation
    const durationCalcs = document.querySelectorAll('.duration-calc');

    const calculateDuration = (startDate) => {
        const start = new Date(startDate);
        const now = new Date();

        // Calculate total months difference
        let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());

        // Add 1 to include the starting month as a full month of experience
        months++;

        if (months < 1) months = 1; // Minimum 1 month

        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        let result = '';
        if (years > 0) {
            result += `${years} year${years > 1 ? 's' : ''} `;
        }
        if (remainingMonths > 0) {
            result += `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
        }

        // Handle exact year case where remainingMonths is 0
        if (remainingMonths === 0 && years === 0) {
            result = "1 month";
        }

        return `(${result.trim()})`;
    };

    durationCalcs.forEach(el => {
        const start = el.getAttribute('data-start');
        if (start) {
            el.textContent = calculateDuration(start);
        }
    });

});
