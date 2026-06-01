function initDarkMode() {
    // Check local storage for saved preference
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Update the icon
    const toggleIcon = document.getElementById('theme-toggle');
    if (toggleIcon) {
        if (document.body.classList.contains('dark-mode')) {
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
        } else {
            toggleIcon.classList.remove('fa-sun');
            toggleIcon.classList.add('fa-moon');
        }
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Save preference to local storage
    if (isDarkMode) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
    
    initDarkMode();
}

// Run when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', initDarkMode);
