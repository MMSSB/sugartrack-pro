// theme.js
(function() {
    const applyTheme = (theme) => {
        const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    };

    const applyAccentColor = (color) => {
        if (color) {
            document.documentElement.style.setProperty('--primary', color);
            
            // Calculate contrast to automatically set the text color on buttons
            const hex = color.replace('#', '');
            if (hex.length === 6) {
                const r = parseInt(hex.substr(0, 2), 16);
                const g = parseInt(hex.substr(2, 2), 16);
                const b = parseInt(hex.substr(4, 2), 16);
                const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
                const textColor = (yiq >= 128) ? '#000000' : '#ffffff';
                document.documentElement.style.setProperty('--primary-invert', textColor);
            }
        } else {
            document.documentElement.style.removeProperty('--primary');
            document.documentElement.style.removeProperty('--primary-invert');
        }
    };

    // Expose globally for script.js to trigger updates
    window.ThemeManager = {
        setTheme: (theme) => {
            localStorage.setItem('theme', theme);
            applyTheme(theme);
        },
        setColor: (color) => {
            localStorage.setItem('accentColor', color);
            applyAccentColor(color);
        }
    };

    // 1. Initialize State on Load
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);

    const savedColor = localStorage.getItem('accentColor');
    if (savedColor) applyAccentColor(savedColor);

    if (localStorage.getItem('sidebarCollapsed') === 'true') {
        document.documentElement.classList.add('sidebar-collapsed');
    }
    if (localStorage.getItem('userName')) {
        document.documentElement.classList.add('has-user');
    }

    // 2. Listen for System Preference Changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('theme') === 'system') applyTheme('system');
    });
})();