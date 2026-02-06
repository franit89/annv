document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const autoplayToggle = document.getElementById('autoplay-toggle');
    const nextPageBtn = document.getElementById('next-page-btn');
    const playBtn = document.getElementById('play-btn');
    const backgroundMusic = document.getElementById('background-music');
    const musicInfo = document.getElementById('music-info');
    const floatingBackground = document.getElementById('floating-background');
    
    // Slideshow state
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds per slide
    let isPlaying = true;
    
    // Initialize
    createFloatingElements();
    startAutoplay();
    playMusic();
    
    // Create floating hearts and flowers
    function createFloatingElements() {
        const heartEmojis = ['❤️', '💖', '💗', '💓', '💞', '💕'];
        const flowerEmojis = ['🌸', '🌺', '🌷', '🌼', '💐', '🌹'];
        
        // Create floating elements based on screen size
        const elementCount = window.innerWidth < 768 ? 20 : 30;
        
        for (let i = 0; i < elementCount; i++) {
            const element = document.createElement('div');
            element.classList.add('floating-element');
            
            // Randomly decide if it's a heart or flower
            const isHeart = Math.random() > 0.5;
            const emojiArray = isHeart ? heartEmojis : flowerEmojis;
            const emoji = emojiArray[Math.floor(Math.random() * emojiArray.length)];
            
            element.textContent = emoji;
            element.classList.add(isHeart ? 'heart-float' : 'flower-float');
            
            // Random position
            element.style.left = `${Math.random() * 100}%`;
            
            // Random size
            const baseSize = window.innerWidth < 768 ? 18 : 24;
            const size = Math.random() * 12 + baseSize;
            element.style.fontSize = `${size}px`;
            
            // Random animation duration and delay
            const duration = Math.random() * 10 + 20;
            const delay = Math.random() * 10;
            element.style.animationDuration = `${duration}s`;
            element.style.animationDelay = `${delay}s`;
            
            floatingBackground.appendChild(element);
        }
    }
    
    // Create heart pop animation
    function createHeartPop(x, y) {
        const heart = document.createElement('div');
        heart.classList.add('heart-pop');
        heart.textContent = '❤️';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        
        // Random size
        const size = Math.random() * 25 + 20;
        heart.style.fontSize = `${size}px`;
        
        document.body.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 1500);
    }
    
    // Create random heart pops
    function createRandomHeartPops() {
        const count = Math.floor(Math.random() * 3) + 1; // 1-3 hearts
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createHeartPop(x, y);
            }, i * 300);
        }
    }
    
    // Update slide
    function updateSlide() {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Create heart pops when slide changes
        createRandomHeartPops();
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlide();
        resetAutoplay();
    }
    
    // Start autoplay
    function startAutoplay() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
        isPlaying = true;
    }
    
    // Stop autoplay
    function stopAutoplay() {
        if (slideInterval) clearInterval(slideInterval);
        isPlaying = false;
    }
    
    // Reset autoplay timer
    function resetAutoplay() {
        if (isPlaying) {
            stopAutoplay();
            startAutoplay();
        }
    }
    
    // Play background music
    function playMusic() {
  const music = document.getElementById("bgMusic");
  music.volume = 0.4;   // smooth sound
  music.play();
}

    
    // Toggle music
    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            musicInfo.textContent = "Now Playing: Romantic Melody";
        } else {
            backgroundMusic.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            musicInfo.textContent = "Music Paused";
        }
    }
    
    // Event Listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
        createHeartPopsOnClick();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
        createHeartPopsOnClick();
    });
    
    nextPageBtn.addEventListener('click', () => {
        // Create heart pops animation
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createHeartPop(x, y);
            }, i * 100);
        }
        
        // In a real app, this would navigate to the next page
        alert("This would navigate to the next page! In a real app, add your navigation logic here.");
    });
    
    // Dot click events
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
            createHeartPopsOnClick();
        });
    });
    
    // Autoplay toggle
    autoplayToggle.addEventListener('change', function() {
        if (this.checked) {
            startAutoplay();
        } else {
            stopAutoplay();
        }
    });
    
    // Music control
    playBtn.addEventListener('click', toggleMusic);
    
    // Create heart pops on button click
    function createHeartPopsOnClick() {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const x = Math.random() * 200 + 100;
                const y = Math.random() * 200 + 100;
                createHeartPop(x, y);
            }, i * 100);
        }
    }
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            nextSlide();
            resetAutoplay();
            createHeartPopsOnClick();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            prevSlide();
            resetAutoplay();
            createHeartPopsOnClick();
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
            createHeartPopsOnClick();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
            createHeartPopsOnClick();
        } else if (event.key === ' ') {
            // Spacebar toggles autoplay
            autoplayToggle.checked = !autoplayToggle.checked;
            if (autoplayToggle.checked) {
                startAutoplay();
            } else {
                stopAutoplay();
            }
            event.preventDefault();
        }
    });
    
    // Add continuous floating elements
    setInterval(() => {
        if (floatingBackground.children.length < 35 && Math.random() > 0.7) {
            const element = document.createElement('div');
            element.classList.add('floating-element');
            
            const emojis = ['❤️', '💖', '💗', '💓', '🌸', '🌺', '🌷', '🌹'];
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            const isHeart = ['❤️', '💖', '💗', '💓'].includes(emoji);
            
            element.textContent = emoji;
            element.classList.add(isHeart ? 'heart-float' : 'flower-float');
            
            element.style.left = `${Math.random() * 100}%`;
            
            const baseSize = window.innerWidth < 768 ? 18 : 24;
            const size = Math.random() * 1 + baseSize;
            element.style.fontSize = `${size}px`;
            
            const duration = Math.random() * 10 + 50;
            element.style.animationDuration = `${duration}s`;
            
            floatingBackground.appendChild(element);
            
            // Remove after animation
            setTimeout(() => {
                if (element.parentNode) {
                    element.remove();
                }
            }, duration * 1000);
        }
    }, 3000);
    
    // Create occasional heart pops
    setInterval(() => {
        if (Math.random() > 0.8) {
            createRandomHeartPops();
        }
    }, 8000);
});