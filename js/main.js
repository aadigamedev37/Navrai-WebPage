/**
 * Navrai Beauty Salon - Luxury Interactive Core
 * Handles Canvas Particles, 3D Tilt, Loading Sequence, and UI Interactivity.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ===================================
       1. LOADING SEQUENCE
       =================================== */
    const loadingScreen = document.getElementById('loading-screen');
    const bootSequence = document.getElementById('boot-sequence');
    const loadingBarFill = document.getElementById('loading-bar-fill');
    
    const bootLines = [
        "INITIALIZING PREMIUM EXPERIENCE...",
        "LOADING BRIDAL GLAMOUR MODULES...",
        "AESTHETICS: PERFECTED",
        "LUXURY ENVIRONMENT: RENDERED",
        "READY TO GLOW."
    ];
    
    let bootIdx = 0;
    
    function playBootSequence() {
        if (!loadingScreen) return;
        
        if (bootIdx < bootLines.length) {
            const line = document.createElement('div');
            line.className = 'font-inter text-xs md:text-sm text-white/60 tracking-widest uppercase mb-2 opacity-0 transform -translate-x-4 transition-all duration-500';
            line.textContent = `— ${bootLines[bootIdx]}`;
            bootSequence.appendChild(line);
            
            // Trigger animation frame for CSS transition
            requestAnimationFrame(() => {
                line.classList.remove('opacity-0', '-translate-x-4');
                line.classList.add('opacity-100', 'translate-x-0');
                if (bootIdx === bootLines.length - 1) {
                    line.classList.replace('text-white/60', 'text-[#D4AF37]');
                }
            });
            
            const progress = ((bootIdx + 1) / bootLines.length) * 100;
            loadingBarFill.style.width = `${progress}%`;
            
            bootIdx++;
            setTimeout(playBootSequence, Math.random() * 300 + 300);
        } else {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto'; // allow scroll
            }, 1000);
        }
    }
    
    // Prevent scrolling during load
    if (loadingScreen) {
        document.body.style.overflow = 'hidden';
        setTimeout(playBootSequence, 300);
    }

    /* ===================================
       2. SCROLL REVEAL & PROGRESS
       =================================== */
    const progressFill = document.getElementById('progress-fill');
    
    window.addEventListener('scroll', () => {
        // Progress Bar
        if (progressFill) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressFill.style.width = scrolled + "%";
        }
        
        // Sticky Header (blur background)
        const header = document.getElementById('navbar');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('bg-[#0a0508]/90', 'backdrop-blur-md', 'shadow-lg');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('bg-[#0a0508]/90', 'backdrop-blur-md', 'shadow-lg');
                header.classList.add('bg-transparent');
            }
        }
    });

    // Intersection Observer for fade-ups
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    reveals.forEach(el => revealObserver.observe(el));


    /* ===================================
       3. PARTICLE ENGINE (Gold Bokeh)
       =================================== */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleColors = [
            'rgba(212, 175, 55, ', // Gold
            'rgba(243, 229, 171, ', // Light Gold
            'rgba(183, 110, 121, ', // Rose Gold
            'rgba(247, 231, 206, '  // Champagne
        ];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() { this.reset(); }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5; // subtle sizes
                this.speedX = (Math.random() - 0.5) * 0.3; // very slow drift
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.alpha = Math.random() * 0.4 + 0.1; // soft opacity
                this.colorBase = particleColors[Math.floor(Math.random() * particleColors.length)];
                this.sinValue = Math.random() * Math.PI * 2; // for pulsating opacity
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.sinValue += 0.02;
                
                // Wrap around edges
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
            
            draw() {
                // Pulsating opacity based on sine wave
                const currentAlpha = this.alpha + (Math.sin(this.sinValue) * 0.1);
                ctx.fillStyle = this.colorBase + Math.max(0.05, currentAlpha) + ')';
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < 70; i++) {
            particles.push(new Particle());
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { 
                p.update(); 
                p.draw(); 
            });
            requestAnimationFrame(animateCanvas);
        }
        animateCanvas();
    }

    /* ===================================
       4. 3D TILT INTERACTION
       =================================== */
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Adjust sensitivity (lower is less extreme)
            const rotateX = (-y / (rect.height / 2)) * 8; 
            const rotateY = (x / (rect.width / 2)) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    /* ===================================
       5. MOUSE SPOTLIGHT (Radial Gradient)
       =================================== */
    window.addEventListener('mousemove', e => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    /* ===================================
       6. MOBILE MENU
       =================================== */
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileClose = document.getElementById('mobile-menu-close');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });
        
        if (mobileClose) {
            mobileClose.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
            });
        }
        
        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
            });
        });
    }

    /* ===================================
       7. FAQ ACCORDION
       =================================== */
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all
                accordionItems.forEach(acc => acc.classList.remove('active'));
                
                // Open clicked if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    /* ===================================
       8. GALLERY LIGHTBOX
       =================================== */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    
    if (lightbox && lightboxImg && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Find image or extract bg image from placeholder
                const img = item.querySelector('img');
                const placeholder = item.querySelector('.img-placeholder');
                
                let src = '';
                if (img) {
                    src = img.src;
                } else if (placeholder) {
                    // Create a dummy canvas to generate a data URL for the placeholder text
                    const txt = placeholder.textContent;
                    const c = document.createElement('canvas');
                    c.width = 800;
                    c.height = 600;
                    const ctx = c.getContext('2d');
                    ctx.fillStyle = '#1f141a';
                    ctx.fillRect(0,0,800,600);
                    ctx.fillStyle = '#D4AF37';
                    ctx.font = '30px Inter';
                    ctx.textAlign = 'center';
                    ctx.fillText(txt, 400, 300);
                    src = c.toDataURL();
                }
                
                if (src) {
                    lightboxImg.src = src;
                    lightbox.classList.add('active');
                }
            });
        });
        
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            setTimeout(() => { lightboxImg.src = ''; }, 500); // clear after transition
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
        });
    }

    /* ===================================
       9. GALLERY FILTERS
       =================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gItems = document.querySelectorAll('.gallery-item-wrap');
    
    if (filterBtns.length > 0 && gItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => {
                    b.classList.remove('border-[#D4AF37]', 'text-[#D4AF37]');
                    b.classList.add('border-white/10', 'text-white/60');
                });
                
                // Add active class to clicked
                btn.classList.remove('border-white/10', 'text-white/60');
                btn.classList.add('border-[#D4AF37]', 'text-[#D4AF37]');
                
                const filter = btn.getAttribute('data-filter');
                
                gItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => { item.style.display = 'none'; }, 400);
                    }
                });
            });
        });
    }
});
