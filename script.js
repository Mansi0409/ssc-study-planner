/**
 * EduTrack Core Interaction Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateProgressBar();
});

/* ==========================================================================
   LIGHT / DARK MODE SYSTEM
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const icon = themeToggleBtn.querySelector('i');
    
    // Check local storage or baseline system preference
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(icon, savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(icon, newTheme);
    });
}

function updateThemeIcon(iconElement, theme) {
    if (theme === 'dark') {
        iconElement.className = 'fa-solid fa-sun';
    } else {
        iconElement.className = 'fa-solid fa-moon';
    }
}

/* ==========================================================================
   TASK TRACKING & ANIMATED PROGRESS LOGIC
   ========================================================================== */
function toggleTask(button) {
    const taskCard = button.closest('.task-card');
    taskCard.classList.toggle('completed');
    
    // Update button states dynamically
    if (taskCard.classList.contains('completed')) {
        button.innerHTML = '<i class="fa-solid fa-circle-check"></i> Completed';
    } else {
        button.innerHTML = '<i class="fa-regular fa-circle"></i> Mark Complete';
    }
    
    updateProgressBar();
}

function updateProgressBar() {
    const totalTasks = document.querySelectorAll('.task-card').length;
    const completedTasks = document.querySelectorAll('.task-card.completed').length;
    
    // Math logic calculation
    const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    // UI Node updates
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
    document.getElementById('progress-percentage').innerText = `${progressPercent}%`;
    document.getElementById('tasks-done').innerText = completedTasks;
    document.getElementById('tasks-total').innerText = totalTasks;
}