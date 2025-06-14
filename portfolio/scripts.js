// ======================= COMPLETE AND CORRECTED SCRIPT.JS =======================

document.addEventListener('DOMContentLoaded', () => {

    // --- NAVBAR & HEADER LOGIC ---
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('header nav a');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.header');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('fa-xmark');
        navbar.classList.toggle('active');
    };
    
    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                });
            }
        });

        header.classList.toggle('sticky', window.scrollY > 100);

        menuIcon.classList.remove('fa-xmark');
        navbar.classList.remove('active');
    };
    
    // --- THEME, ANIMATION, & INTERACTIVITY LOGIC ---

    // 1. Initialize Animate On Scroll (AOS)
    AOS.init({
        duration: 800,      // Animation duration in milliseconds
        offset: 120,        // Trigger animation a little sooner
        delay: 100,         // Add a small delay to all animations
        easing: 'ease-in-out', // A smoother animation timing
        once: false,        // <-- THIS IS THE MOST IMPORTANT CHANGE
        mirror: true        // This ensures animations play on scroll up/down
    });

    // 2. Typed.js for the home section
    new Typed('.multiple-text', {
        strings: ['Software Engineer','FullStack developer',  'UI/UX Enthusiast', 'Problem Solver'],
        typeSpeed: 70,
        backSpeed: 70,
        backDelay: 1000,
        loop: true
    });

    // 3. Animated Slogan Logic
    const slogans = ["Code with purpose.", "Building tomorrow's web.", "Elegance in every line.", "Logic is my art."];
    let sloganIndex = 0;
    const sloganElement = document.querySelector('.slogan');
    
    function changeSlogan() {
        if (sloganElement) { // Check if the element exists before using it
            sloganElement.textContent = slogans[sloganIndex];
            sloganIndex = (sloganIndex + 1) % slogans.length;
        }
    }
    if (sloganElement) {
        setInterval(changeSlogan, 5000); // Change slogan every 5 seconds
        changeSlogan(); // Initial call
    }
    
    // 4. Dark/Light Mode Toggle
    const themeToggle = document.querySelector('#theme-toggle');

    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // 5. Theme Color Palette Logic
    const colorPaletteToggle = document.querySelector('#color-palette-toggle');
    const colorPalette = document.querySelector('.color-palette');
    const colorOptions = document.querySelectorAll('.color-option');

    if (colorPaletteToggle && colorPalette) {
        colorPaletteToggle.addEventListener('click', () => {
            colorPalette.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!colorPalette.contains(e.target) && !colorPaletteToggle.contains(e.target)) {
                colorPalette.classList.remove('active');
            }
        });

        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                const root = document.documentElement;
                
                if (option.hasAttribute('data-gradient')) {
                    const newGradient = option.getAttribute('data-gradient');
                    root.style.setProperty('--main-background', newGradient);
                    const firstColor = newGradient.split(',')[1].trim();
                    root.style.setProperty('--main-color', firstColor);
                    localStorage.setItem('accentGradient', newGradient);
                    localStorage.removeItem('accentColor');
                } else {
                    const newColor = option.getAttribute('data-color');
                    root.style.setProperty('--main-color', newColor);
                    root.style.setProperty('--main-background', newColor);
                    localStorage.setItem('accentColor', newColor);
                    localStorage.removeItem('accentGradient');
                }
            });
        });
    }

    // 6. Load Saved Preferences on Page Load
    function loadPreferences() {
        const savedTheme = localStorage.getItem('theme');
        const savedColor = localStorage.getItem('accentColor');
        const savedGradient = localStorage.getItem('accentGradient');
        const root = document.documentElement;

        if (savedTheme === 'light' && themeToggle) {
            document.body.classList.add('light-mode');
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }

        if (savedGradient) {
            root.style.setProperty('--main-background', savedGradient);
            const firstColor = savedGradient.split(',')[1].trim();
            root.style.setProperty('--main-color', firstColor);
        } else if (savedColor) {
            root.style.setProperty('--main-color', savedColor);
            root.style.setProperty('--main-background', savedColor);
        }
    }
    loadPreferences();


   // ======================= UPDATED GAME HUB LOGIC =======================
// In script.js, find and replace the game hub logic with this block

const playGameBtn = document.getElementById('play-game-btn');
const gameHubIntro = document.querySelector('.game-hub-intro');
const gameShowcase = document.querySelector('.game-showcase');
const backToHubBtn = document.getElementById('back-to-hub-btn'); // Get the new back button

if (playGameBtn && gameHubIntro && gameShowcase && backToHubBtn) {
    // Function to show the intro screen
    function showIntroScreen() {
        gameShowcase.style.display = 'none'; // Immediately hide games
        
        gameHubIntro.style.display = 'flex'; // Make intro visible again
        // Use a timeout to apply the class after display is set, allowing for transition
        setTimeout(() => {
            gameHubIntro.classList.remove('hidden'); 
        }, 10); // A tiny delay is enough
    }

    // Function to show the game showcase
    function showGameShowcase() {
        gameHubIntro.classList.add('hidden');
        setTimeout(() => {
            gameHubIntro.style.display = 'none';
            gameShowcase.style.display = 'flex';
        }, 500); // Delay matches CSS transition
    }

    // Event Listeners
    playGameBtn.addEventListener('click', showGameShowcase);
    backToHubBtn.addEventListener('click', showIntroScreen);
}

    // --- Bug Squasher Game Logic (Modular) ---
    const bugSquasherGrid = document.querySelector('.bug-squasher-grid');
    const scoreDisplay = document.querySelector('.score-display span');
    const startGameBtn = document.querySelector('.start-game-btn[data-game="bug-squasher"]');
    
    if (bugSquasherGrid && scoreDisplay && startGameBtn) {
        const gridCellsCount = 16;
        let score = 0;
        let bugPosition;
        let gameInterval = null;
        let bugTimer = null;

        for (let i = 0; i < gridCellsCount; i++) {
            const cell = document.createElement('div');
            cell.classList.add('game-cell');
            cell.id = `cell-${i}`;
            bugSquasherGrid.appendChild(cell);
        }

        const cells = bugSquasherGrid.querySelectorAll('.game-cell');

        function randomBug() {
            cells.forEach(cell => cell.classList.remove('bug'));
            let randomCell = cells[Math.floor(Math.random() * cells.length)];
            randomCell.classList.add('bug');
            bugPosition = randomCell.id;
        }

        cells.forEach(cell => {
            cell.addEventListener('mousedown', () => {
                if (cell.id === bugPosition && gameInterval) {
                    score++;
                    scoreDisplay.textContent = score;
                    bugPosition = null;
                    cell.classList.remove('bug');
                }
            });
        });

        function startGame() {
            clearInterval(bugTimer);
            clearTimeout(gameInterval);

            score = 0;
            scoreDisplay.textContent = score;
            startGameBtn.disabled = true;
            startGameBtn.textContent = 'Playing...';
            
            bugTimer = setInterval(randomBug, 800);
            
            gameInterval = setTimeout(() => {
                clearInterval(bugTimer);
                alert(`Game Over! Your final score is ${score}`);
                startGameBtn.disabled = false;
                startGameBtn.textContent = 'Start Game';
                gameInterval = null;
            }, 15000);
        }
        startGameBtn.addEventListener('click', startGame);
    }
    
}); // --- THIS IS THE SINGLE, CLOSING BRACKET FOR DOMCONTENTLOADED ---


// --- CONTACT FORM SUBMISSION LOGIC (STAYS OUTSIDE) ---
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(contactForm);
        
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                contactForm.style.transition = 'opacity 0.5s ease-out';
                contactForm.style.opacity = '0';
                
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                       successMessage.style.transition = 'opacity 0.5s ease-in';
                       successMessage.style.opacity = '1';
                    }, 10);
                }, 500);
                
                contactForm.reset();

                setTimeout(() => {
                    successMessage.style.transition = 'opacity 0.5s ease-out';
                    successMessage.style.opacity = '0';

                    setTimeout(() => {
                        successMessage.style.display = 'none';
                        contactForm.style.display = 'block';
                        setTimeout(() => {
                            contactForm.style.transition = 'opacity 0.5s ease-in';
                            contactForm.style.opacity = '1';
                        }, 10);
                    }, 500);
                }, 5000);

            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert('Oops! There was a problem submitting your form.');
                    }
                })
            }
        }).catch(error => {
            alert('Oops! There was a problem with your network. Please try again.');
        });
    });
}