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
            // Dapatkan kategori (data-filter) dari tombol
            const filterValue = btn.getAttribute('data-filter');

            // Hapus class dari semua tombol
            filterBtns.forEach(item => {
                item.classList.remove('border-black');
            });

            // Tambahkan class ke tombol yang diklik
            btn.classList.add('border-black');
            
            // Proses filter gambar
            portfolioItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95)';
                item.style.pointerEvents = 'none';

                setTimeout(() => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                            item.style.pointerEvents = 'auto';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300); 
            });
        });
    });

    // Aktifkan tombol "Semua" secara default saat web dimuat
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if(allBtn) allBtn.classList.add('border-black');


    // --- Testimonial Slider (Simplified) ---
    const testimonials = [
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
    const initialText = testText.textContent;
    const initialAuthor = testAuthor.textContent;

    testText.style.transition = "opacity 0.4s ease-in-out";
    testAuthor.style.transition = "opacity 0.4s ease-in-out";

    function updateTestimonial(startIndex) {
        let index = startIndex;
        
        setInterval(() => {
            testText.style.opacity = "0";
            testAuthor.style.opacity = "0";

            setTimeout(() => {
                if (index < testimonials.length) {
                    testText.textContent = testimonials[index].text;
                    testAuthor.textContent = `— ${testimonials[index].author}`;
                    index++;
                } else {
                    testText.textContent = initialText;
                    testAuthor.textContent = initialAuthor;
                    index = 0;
                }
            
                testText.style.opacity = "1";
                testAuthor.style.opacity = "1";
                
            }, 400); 

        }, 3000);
    }

    updateTestimonial(currentTest);
        

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
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