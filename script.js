document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Logic ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-krem/90', 'backdrop-blur-md', 'border-b', 'border-garis');
            navbar.style.paddingTop = '1.5rem';
            navbar.style.paddingBottom = '1.5rem';
        } else {
            navbar.classList.remove('bg-krem/90', 'backdrop-blur-md', 'border-b', 'border-garis');
            navbar.style.paddingTop = '2rem';
            navbar.style.paddingBottom = '2rem';
        }
    });

    // --- Mobile Menu ---
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = (open) => {
        mobileMenu.style.opacity = open ? '1' : '0';
        mobileMenu.style.pointerEvents = open ? 'all' : 'none';
        document.body.style.overflow = open ? 'hidden' : 'auto';
    };

    menuToggle.addEventListener('click', () => toggleMenu(true));
    menuClose.addEventListener('click', () => toggleMenu(false));
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // --- Custom Cursor ---
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
    });

    // --- Intersection Observer (Reveal on Scroll) ---
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Jika ini adalah counter, jalankan fungsi counter
                if (entry.target.classList.contains('counter')) {
                    startCounter(entry.target);
                    revealObserver.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .counter').forEach(el => {
        revealObserver.observe(el);
    });

    // --- Count Up Numbers ---
    function startCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        let startTime = null;

        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            el.innerText = Math.floor(progress * target);
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                el.innerText = target;
            }
        }
        requestAnimationFrame(animate);
    }

    // --- Portfolio Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active', 'border-arang'));
            filterBtns.forEach(b => b.classList.add('border-garis'));
            btn.classList.add('active', 'border-arang');
            btn.classList.remove('border-garis');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.remove('hidden-item');
                    }, 10);
                } else {
                    item.classList.add('hidden-item');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });

    // --- Testimonial Slider (Simplified) ---
    const testimonials = [
        {
            text: "Melihat furnitur Ardana adalah melihat waktu yang berhenti. Ada ketenangan di setiap guratan kayunya yang tidak bisa didapat dari toko furnitur modern manapun.",
            author: "Ibu Sari, Kolektor"
        },
        {
            text: "Kualitas pengerjaan yang luar biasa. Sambungan kayunya sangat rapi, finishing naturalnya membuat kantor kami terasa hangat dan manusiawi.",
            author: "Bapak Hadi, Arsitek"
        },
        {
            text: "Meja jati yang saya pesan tahun 2005 masih tetap kokoh dan justru makin indah warnanya seiring bertambahnya usia. Benar-benar investasi warisan.",
            author: "Keluarga Santoso, Jakarta"
        }
    ];

    let currentTest = 0;
    const testText = document.querySelector('.testimonial-slide blockquote');
    const testAuthor = document.querySelector('.testimonial-slide cite');
    const prevBtn = document.getElementById('prev-test');
    const nextBtn = document.getElementById('next-test');

    function updateTestimonial(index) {
        const slide = document.querySelector('.testimonial-slide');
        slide.style.opacity = '0';
        
        setTimeout(() => {
            testText.innerText = `"${testimonials[index].text}"`;
            testAuthor.innerText = `— ${testimonials[index].author}`;
            slide.style.opacity = '1';
        }, 300);
    }

    nextBtn.addEventListener('click', () => {
        currentTest = (currentTest + 1) % testimonials.length;
        updateTestimonial(currentTest);
    });

    prevBtn.addEventListener('click', () => {
        currentTest = (currentTest - 1 + testimonials.length) % testimonials.length;
        updateTestimonial(currentTest);
    });

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Sederhana simulasi pengiriman
        const btn = contactForm.querySelector('button');
        btn.innerText = 'MENGIRIM...';
        btn.disabled = true;

        setTimeout(() => {
            contactForm.reset();
            btn.classList.add('hidden');
            formStatus.classList.remove('hidden');
        }, 1500);
    });
});
