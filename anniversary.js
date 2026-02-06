document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const floatingBackground = document.getElementById('floating-background');
    const playBtn = document.getElementById('play-btn');
    const backgroundMusic = document.getElementById('background-music');
    const musicInfo = document.getElementById('music-info');
    const addHeartsBtn = document.getElementById('add-hearts-btn');
    const replayAnimationBtn = document.getElementById('replay-animation-btn');
    const addPhotosBtn = document.getElementById('add-photos-btn');
    const photoItems = document.querySelectorAll('.photo-item');
    const letter = document.querySelector('.letter');
    
    // Sample photo URLs - REPLACE THESE WITH YOUR PHOTOS!
    const ourPhotos = [
       "FOREVER.jpg",
       "img1.jpg",
       "img2.jpg",
       "img3.jpg"
    ];
    
    // State
    let floatingElementsCount = 0;
    const MAX_FLOATING_ELEMENTS = 120; // Increased for faster floating
    
    // Initialize
    createFastFloatingElements();
    playMusic();
    setupEventListeners();
    
    // Create fast floating hearts, flowers, and photos
    function createFastFloatingElements() {
        const heartEmojis = ['❤️', '💖', '💗', '💓', '💞', '💕', '💘', '💝'];
        const flowerEmojis = ['🌸', '🌺', '🌷', '🌼', '💐', '🌹', '🥀', '🌻'];
        
        // Create more elements for faster effect
        const elementCount = window.innerWidth < 768 ? 35 : 60;
        
        for (let i = 0; i < elementCount; i++) {
            // Create hearts/flowers
            createFastFloatingEmoji(heartEmojis, flowerEmojis);
            
            // Create photos at same frequency
            if (i % 3 === 0 && ourPhotos.length > 0 && floatingElementsCount < MAX_FLOATING_ELEMENTS) {
                createFastFloatingPhoto();
            }
        }
    }
    
    function createFastFloatingEmoji(heartEmojis, flowerEmojis) {
        if (floatingElementsCount >= MAX_FLOATING_ELEMENTS) return;
        
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
        
        // Random size - smaller for faster movement
        const baseSize = window.innerWidth < 768 ? 18 : 22;
        const size = Math.random() * 12 + baseSize;
        element.style.fontSize = `${size}px`;
        
        // FASTER animation duration (8-18 seconds instead of 25-40)
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 5;
        element.style.animationDuration = `${duration}s`;
        element.style.animationDelay = `${delay}s`;
        
        // Make them move faster with CSS variable
        element.style.setProperty('--speed', Math.random() * 2 + 1);
        
        floatingBackground.appendChild(element);
        floatingElementsCount++;
        
        // Remove after animation completes
        setTimeout(() => {
            if (element.parentNode) {
                element.remove();
                floatingElementsCount--;
                // Immediately create new one to maintain count
                if (floatingElementsCount < MAX_FLOATING_ELEMENTS * 0.8) {
                    createFastFloatingEmoji(heartEmojis, flowerEmojis);
                }
            }
        }, duration * 1000);
    }
    
    function createFastFloatingPhoto() {
        if (ourPhotos.length === 0 || floatingElementsCount >= MAX_FLOATING_ELEMENTS) return;
        
        const photo = document.createElement('img');
        photo.classList.add('floating-photo');
        
        // Random photo from our collection
        const randomPhoto = ourPhotos[Math.floor(Math.random() * ourPhotos.length)];
        photo.src = randomPhoto;
        photo.alt = "Our Memory";
        
        // Random position
        photo.style.left = `${Math.random() * 100}%`;
        
        // Random size - smaller for faster movement
        const baseSize = window.innerWidth < 768 ? 50 : 65;
        const size = Math.random() * 15 + baseSize;
        photo.style.width = `${size}px`;
        photo.style.height = `${size}px`;
        
        // FASTER animation duration (15-25 seconds instead of 30-50)
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        photo.style.animationDuration = `${duration}s`;
        photo.style.animationDelay = `${delay}s`;
        
        // Faster animation timing
        photo.style.animationTimingFunction = 'linear';
        
        floatingBackground.appendChild(photo);
        floatingElementsCount++;
        
        // Remove after animation
        setTimeout(() => {
            if (photo.parentNode) {
                photo.remove();
                floatingElementsCount--;
                // Immediately create new one to maintain count
                if (floatingElementsCount < MAX_FLOATING_ELEMENTS * 0.8) {
                    createFastFloatingPhoto();
                }
            }
        }, duration * 1000);
    }
    
    // Create heart pop animation
    function createHeartPop(x, y) {
        const heart = document.createElement('div');
        heart.classList.add('heart-pop');
        heart.textContent = '❤️';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        
        // Random size
        const size = Math.random() * 30 + 25;
        heart.style.fontSize = `${size}px`;
        
        document.body.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 1500);
    }
    
    // Create multiple heart pops
    function createHeartPops(count = 10) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createHeartPop(x, y);
            }, i * 80); // Faster heart pops
        }
    }
    
    // Play background music
    function playMusic() {
        backgroundMusic.volume = 0.4;
        
        const playPromise = backgroundMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                musicInfo.textContent = "Now Playing: Romantic Melody";
                createHeartPops(5);
            }).catch(error => {
                console.log("Autoplay prevented. Click play button to start music.");
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                musicInfo.textContent = "Click to play music";
            });
        }
    }
    
    // Toggle music
    function toggleMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            musicInfo.textContent = "Now Playing: Romantic Melody";
            createHeartPops(8);
        } else {
            backgroundMusic.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            musicInfo.textContent = "Music Paused";
        }
    }
    
    // Add more hearts AND photos
    function addMoreElements() {
        const heartEmojis = ['❤️', '💖', '💗', '💓', '💞', '💕', '💘', '💝'];
        const flowerEmojis = ['🌸', '🌺', '🌷', '🌼', '💐', '🌹'];
        
        // Add 10 new hearts/flowers AND 5 photos
        for (let i = 0; i < 10; i++) {
            if (floatingElementsCount < MAX_FLOATING_ELEMENTS) {
                createFastFloatingEmoji(heartEmojis, flowerEmojis);
            }
        }
        
        // Add photos
        for (let i = 0; i < 5; i++) {
            if (floatingElementsCount < MAX_FLOATING_ELEMENTS && ourPhotos.length > 0) {
                createFastFloatingPhoto();
            }
        }
        
        // Create heart pops
        createHeartPops(12);
    }
    
    // Replay letter animation
    function replayLetterAnimation() {
        // Remove animation class
        letter.style.animation = 'none';
        
        // Trigger reflow
        void letter.offsetWidth;
        
        // Re-add animation class
        letter.style.animation = 'letterOpen 1.5s ease';
        
        // Create heart pops
        createHeartPops(8);
        
        // Add some floating elements too
        addMoreElements();
    }
    
    // Add floating photos
    function addFloatingPhotos() {
        // Add 8 new floating photos
        for (let i = 0; i < 8; i++) {
            if (floatingElementsCount < MAX_FLOATING_ELEMENTS && ourPhotos.length > 0) {
                createFastFloatingPhoto();
            }
        }
        
        // Also add some hearts
        const heartEmojis = ['❤️', '💖', '💗', '💓'];
        for (let i = 0; i < 5; i++) {
            if (floatingElementsCount < MAX_FLOATING_ELEMENTS) {
                createFastFloatingEmoji(heartEmojis, []);
            }
        }
        
        // Create heart pops
        createHeartPops(8);
    }
    
    // Make clicked photo float in background
    function makePhotoFloat(event) {
        event.preventDefault();
        
        const photoElement = event.currentTarget.querySelector('.gallery-photo');
        const photoUrl = photoElement.src;
        
        // Create floating version of this photo
        const floatingPhoto = document.createElement('img');
        floatingPhoto.classList.add('floating-photo');
        floatingPhoto.src = photoUrl;
        floatingPhoto.alt = "Our Memory";
        
        // Position at click location
        const x = event.clientX || event.touches[0].clientX;
        const y = event.clientY || event.touches[0].clientY;
        
        floatingPhoto.style.left = `${x}px`;
        floatingPhoto.style.top = `${y}px`;
        
        // Random size - smaller for faster
        const baseSize = window.innerWidth < 768 ? 60 : 75;
        const size = Math.random() * 20 + baseSize;
        floatingPhoto.style.width = `${size}px`;
        floatingPhoto.style.height = `${size}px`;
        
        // Fast animation duration
        const duration = Math.random() * 8 + 12;
        floatingPhoto.style.animationDuration = `${duration}s`;
        floatingPhoto.style.animationTimingFunction = 'linear';
        
        floatingBackground.appendChild(floatingPhoto);
        floatingElementsCount++;
        
        // Also create a heart near the photo
        setTimeout(() => {
            createHeartPop(x + 50, y + 50);
        }, 200);
        
        // Remove after animation
        setTimeout(() => {
            if (floatingPhoto.parentNode) {
                floatingPhoto.remove();
                floatingElementsCount--;
            }
        }, duration * 1000);
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Music control
        playBtn.addEventListener('click', toggleMusic);
        
        // Action buttons
        addHeartsBtn.addEventListener('click', addMoreElements);
        replayAnimationBtn.addEventListener('click', replayLetterAnimation);
        addPhotosBtn.addEventListener('click', addFloatingPhotos);
        
        // Photo click events
        photoItems.forEach(photo => {
            photo.addEventListener('click', makePhotoFloat);
            
            // Touch events for mobile
            photo.addEventListener('touchstart', function(e) {
                e.preventDefault();
                makePhotoFloat(e);
            });
        });
        
        // Create heart pops when clicking anywhere
        document.addEventListener('click', function(e) {
            // Don't trigger on buttons or photos
            if (!e.target.closest('button') && !e.target.closest('.photo-item')) {
                createHeartPop(e.clientX, e.clientY);
                
                // Also add a floating element occasionally
                if (Math.random() > 0.7 && floatingElementsCount < MAX_FLOATING_ELEMENTS) {
                    const heartEmojis = ['❤️', '💖', '💗'];
                    const flowerEmojis = ['🌸', '🌺'];
                    createFastFloatingEmoji(heartEmojis, flowerEmojis);
                }
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Spacebar toggles music
            if (e.code === 'Space') {
                e.preventDefault();
                toggleMusic();
            }
            // 'H' adds hearts AND photos
            else if (e.code === 'KeyH') {
                addMoreElements();
            }
            // 'P' adds photos
            else if (e.code === 'KeyP') {
                addFloatingPhotos();
            }
            // 'R' replays animation
            else if (e.code === 'KeyR') {
                replayLetterAnimation();
            }
            // 'F' for fast mode (adds lots of elements)
            else if (e.code === 'KeyF') {
                for (let i = 0; i < 20; i++) {
                    if (floatingElementsCount < MAX_FLOATING_ELEMENTS) {
                        if (Math.random() > 0.5 && ourPhotos.length > 0) {
                            createFastFloatingPhoto();
                        } else {
                            const heartEmojis = ['❤️', '💖', '💗'];
                            const flowerEmojis = ['🌸', '🌺'];
                            createFastFloatingEmoji(heartEmojis, flowerEmojis);
                        }
                    }
                }
                createHeartPops(15);
            }
        });
        
        // Window resize handler
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                // Clear existing elements and create new ones for new screen size
                const elements = floatingBackground.querySelectorAll('.floating-element, .floating-photo');
                elements.forEach(el => el.remove());
                floatingElementsCount = 0;
                createFastFloatingElements();
            }, 300);
        });
    }
    
    // Continuously add new floating elements - MORE FREQUENTLY
    setInterval(() => {
        // Add elements more frequently (60% chance instead of 30%)
        if (floatingElementsCount < MAX_FLOATING_ELEMENTS && Math.random() > 0.4) {
            const heartEmojis = ['❤️', '💖', '💗', '💓'];
            const flowerEmojis = ['🌸', '🌺', '🌷', '🌼'];
            
            // 50% chance for photo, 50% for emoji
            if (Math.random() > 0.5 && ourPhotos.length > 0) {
                createFastFloatingPhoto();
            } else {
                createFastFloatingEmoji(heartEmojis, flowerEmojis);
            }
        }
    }, 1500); // Faster interval (1.5 seconds instead of 3)
    
    // Create occasional heart pops - MORE FREQUENTLY
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance instead of 15%
            createHeartPops(Math.floor(Math.random() * 4) + 1);
        }
    }, 3000); // Every 3 seconds
    
    // Initial burst of elements
    setTimeout(() => {
        createHeartPops(15);
        
        // Add initial burst of floating elements
        for (let i = 0; i < 20; i++) {
            if (floatingElementsCount < MAX_FLOATING_ELEMENTS) {
                if (i % 2 === 0 && ourPhotos.length > 0) {
                    createFastFloatingPhoto();
                } else {
                    const heartEmojis = ['❤️', '💖', '💗'];
                    const flowerEmojis = ['🌸', '🌺'];
                    createFastFloatingEmoji(heartEmojis, flowerEmojis);
                }
            }
        }
    }, 500);
    
    // Update CSS for faster animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUpFast {
            0% {
                transform: translateY(100vh) rotate(0deg) scale(0.5);
                opacity: 0;
            }
            10% {
                opacity: 0.9;
            }
            90% {
                opacity: 0.9;
            }
            100% {
                transform: translateY(-150px) rotate(360deg) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes floatPhotoFast {
            0% {
                transform: translateY(100vh) translateX(-50px) rotate(-10deg);
                opacity: 0;
            }
            10% {
                opacity: 0.95;
            }
            90% {
                opacity: 0.95;
            }
            100% {
                transform: translateY(-150px) translateX(50px) rotate(370deg);
                opacity: 0;
            }
        }
        
        .floating-element {
            animation-name: floatUpFast !important;
            animation-timing-function: linear !important;
        }
        
        .floating-photo {
            animation-name: floatPhotoFast !important;
            animation-timing-function: linear !important;
        }
    `;
    document.head.appendChild(style);
});