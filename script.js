document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const envelope = document.querySelector('.envelope');
    const pageEnvelope = document.getElementById('page-envelope');
    const pageCard = document.getElementById('page-card');
    const backBtn = document.getElementById('back-btn');
    const backgroundMusic = document.getElementById('background-music');
    const floatingBackground = document.getElementById('floating-background');
    
    // Create floating hearts and flowers in background
    function createFloatingElements() {
        const emojis = ['❤️', '💖', '💗', '💓', '💞', '💕', '🌸', '🌺', '🌷', '🌼', '💐'];
        const heartEmojis = ['❤️', '💖', '💗', '💓', '💞', '💕'];
        const flowerEmojis = ['🌸', '🌺', '🌷', '🌼', '💐'];
        
        // Create 25 floating elements
        for (let i = 0; i < 25; i++) {
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
            const size = Math.random() * 20 + 20;
            element.style.fontSize = `${size}px`;
            
            // Random animation duration
            const duration = Math.random() * 10 + 15;
            element.style.animationDuration = `${duration}s`;
            
            // Random animation delay
            const delay = Math.random() * 5;
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
        
        // Random size for heart pop
        const size = Math.random() * 40 + 20;
        heart.style.fontSize = `${size}px`;
        
        document.body.appendChild(heart);
        
        // Remove element after animation completes
        setTimeout(() => {
            heart.remove();
        }, 1500);
    }
    
    // Create multiple heart pops around the envelope
    function createHeartPops() {
        const envelopeRect = envelopeWrapper.getBoundingClientRect();
        const centerX = envelopeRect.left + envelopeRect.width / 2;
        const centerY = envelopeRect.top + envelopeRect.height / 2;
        
        // Create 15 heart pops
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                // Random position around the envelope
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 100 + 50;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                
                createHeartPop(x, y);
            }, i * 100);
        }
    }
    
    // Open envelope and transition to card
    function openEnvelope() {
        // Add open class to envelope for animation
        envelope.classList.add('open');
        
        // Create heart pops animation
        createHeartPops();
        
        // Start playing music
        playMusic();
        
        // After envelope animation completes, switch to card page
        setTimeout(() => {
            pageEnvelope.classList.remove('active');
            pageCard.classList.add('active');
            
            // Create some heart pops on the card page too
            createHeartPopsOnCard();
        }, 1200);
    }
    
    // Create heart pops on card page
    function createHeartPopsOnCard() {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createHeartPop(x, y);
            }, i * 200);
        }
    }
    
    // Play background music
    function playMusic() {
        backgroundMusic.volume = 0.5;
        backgroundMusic.play().catch(error => {
            console.log("Autoplay prevented. User interaction required.");
            // If autoplay is prevented, show a message and let user click to play
            envelopeWrapper.addEventListener('click', function playOnClick() {
                backgroundMusic.play();
                envelopeWrapper.removeEventListener('click', playOnClick);
            }, { once: true });
        });
    }
    
    // Go back to envelope page
    function goBackToEnvelope() {
        pageCard.classList.remove('active');
        pageEnvelope.classList.add('active');
        
        // Reset envelope animation
        envelope.classList.remove('open');
        
        // Create some heart pops
        createHeartPops();
    }
    
    // Initialize floating elements
    createFloatingElements();
    
    // Event Listeners
    envelopeWrapper.addEventListener('click', openEnvelope);
    backBtn.addEventListener('click', goBackToEnvelope);
    
    // Add continuous creation of floating elements
    setInterval(() => {
        // Occasionally add a new floating element
        if (Math.random() > 0.7) {
            const element = document.createElement('div');
            element.classList.add('floating-element');
            
            const emojis = ['❤️', '💖', '💗', '💓', '🌸', '🌺', '🌷'];
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            const isHeart = ['❤️', '💖', '💗', '💓'].includes(emoji);
            
            element.textContent = emoji;
            element.classList.add(isHeart ? 'heart-float' : 'flower-float');
            
            element.style.left = `${Math.random() * 100}%`;
            const size = Math.random() * 20 + 20;
            element.style.fontSize = `${size}px`;
            const duration = Math.random() * 10 + 15;
            element.style.animationDuration = `${duration}s`;
            
            floatingBackground.appendChild(element);
            
            // Remove element after animation completes
            setTimeout(() => {
                if (element.parentNode) {
                    element.remove();
                }
            }, duration * 1000);
        }
    }, 2000);
});