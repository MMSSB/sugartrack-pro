document.addEventListener('DOMContentLoaded', () => {
    const dashboard = document.querySelector('.dashboard-wrapper');
    // .dashboard-wrapper is the main container for the dashboard content. The loader will overlay this area on desktop, and cover the entire screen on mobile.
    // body is fully covered desktop and mobile, but we want to avoid covering the header and nav on desktop, so we target the dashboard wrapper specifically.
    if (!dashboard) return;

    // Ensure the dashboard can contain the absolute overlay on desktop
    dashboard.style.position = 'relative';

    // 1. Inject Styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .st-loader-overlay {
            /* Desktop: Covers only the dashboard wrapper */
            position: absolute;
            inset: 0;
            z-index: 999;
            background: var(--bg-dashboard); /* Adapts to light/dark mode */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius-dashboard, 28px);
            transition: opacity 0.6s cubic-bezier(0.32, 0.72, 0, 1), 
                        visibility 0.6s, 
                        transform 0.6s cubic-bezier(0.32, 0.72, 0, 1);
        }

        /* Mobile: Break out and cover the entire screen */
        @media (max-width: 768px) {
            .st-loader-overlay {
                position: fixed;
                border-radius: 0;
                z-index: 99999;
                background: var(--bg-canvas);
            }
        }

        .st-loader-overlay.hidden {
            opacity: 0;
            visibility: hidden;
            transform: scale(0.98);
        }

        .st-loader-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            animation: st-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .st-loader-logo {
            width: 68px; 
            height: 68px;
            background: var(--primary);
            color: var(--primary-invert);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            box-shadow: var(--shadow-float);
            position: relative;
        }

        /* Modern Ripple Animation around Logo */
        .st-loader-logo::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 24px;
            border: 2px solid var(--primary);
            opacity: 0;
            animation: st-ripple 1.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }

        .st-loader-brand {
            font-size: 18px;
            font-weight: 600;
            color: var(--text-main);
            display: flex;
            align-items: center;
            gap: 6px;
            letter-spacing: -0.3px;
        }

        .st-loader-dots {
            display: flex;
            gap: 4px;
            margin-top: 4px;
        }

        .st-loader-dots span {
            width: 4px; 
            height: 4px;
            background: var(--primary);
            border-radius: 50%;
            animation: st-bounce 1.4s infinite ease-in-out both;
        }

        .st-loader-dots span:nth-child(1) { animation-delay: -0.32s; }
        .st-loader-dots span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes st-fade-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes st-ripple {
            0% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes st-bounce {
            0%, 80%, 100% { transform: scale(0.4); opacity: 0.4; }
            40% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // 2. Build the Loader DOM
    const overlay = document.createElement('div');
    overlay.className = 'st-loader-overlay';
    overlay.innerHTML = `
        <div class="st-loader-content">
            <div class="st-loader-logo">
                <i class="ph ph-activity"></i>
            </div>
            <div class="st-loader-brand">
                SugarTrack
                <div class="st-loader-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </div>
    `;
    
    // Attach to the dashboard wrapper
    dashboard.prepend(overlay);

    // 3. Logic to hide the loader smoothly
    const hideLoader = () => {
        overlay.classList.add('hidden');
        setTimeout(() => {
            overlay.remove();
        }, 600); // Matches the CSS transition duration
    };

    // Keep it on screen for a minimum of 800ms so the animation plays out nicely,
    // then dismiss it once the window is fully loaded (images, fonts, etc.)
    const minDelay = 1000; 
    const startTime = Date.now();

    window.addEventListener('load', () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minDelay - elapsed);
        setTimeout(hideLoader, remaining);
    });

    // Failsafe: Remove loader after 4 seconds even if 'load' event hangs
    setTimeout(hideLoader, 4000);
});