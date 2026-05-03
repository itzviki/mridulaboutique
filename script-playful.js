// Playful Content Manager
class PlayfulContentManager {
    constructor() {
        this.content = {
            heroImage: 'file:///D:/WebWorld/Photo/20180622_102909.jpg',
            logoText: 'Mridula Boutique',
            heroTitle: 'Bespoke Magic',
            heroSubtitle: 'Where Dreams Become Reality ✨',
            heroCTA: 'Explore Our Magic',
            galleryTitle: 'Our Colorful Collection',
            contactTitle: 'Let\'s Create Magic! 🎨',
            contactDesc: 'Your dream garment is just a click away! 🌟',
            galleryImages: [
                'file:///D:/WebWorld/Photo/20180622_102909.jpg',
                'file:///D:/WebWorld/Photo/20180622_103110.jpg',
                'file:///D:/WebWorld/Photo/20180728_152445.jpg',
                'file:///D:/WebWorld/Photo/20180728_152501.jpg',
                'file:///D:/WebWorld/Photo/PhotoGrid_1517043827313.jpg',
                'file:///D:/WebWorld/Photo/PhotoGrid_1518671127415.jpg',
                'file:///D:/WebWorld/Photo/PhotoGrid_1518710539265.jpg',
                'file:///D:/WebWorld/Photo/PhotoGrid_1519963636990.jpg'
            ]
        };
        this.cart = [];
        this.init();
    }

    init() {
        this.loadSavedContent();
        this.setupEventListeners();
        this.loadGallery();
        this.updateCartDisplay();
        this.addPlayfulEffects();
        console.log('🎨 Playful Content Manager initialized');
    }

    loadSavedContent() {
        const saved = localStorage.getItem('mridulaPlayfulContent');
        if (saved) {
            this.content = JSON.parse(saved);
        }
        this.applyContent();
    }

    applyContent() {
        // Apply hero image
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundImage = `linear-gradient(rgba(255, 107, 107, 0.7), rgba(78, 205, 196, 0.7)), url('${this.content.heroImage}')`;
        }

        // Apply text content
        document.querySelectorAll('[data-field]').forEach(element => {
            const field = element.dataset.field;
            if (this.content[field]) {
                element.textContent = this.content[field];
            }
        });
    }

    setupEventListeners() {
        // Admin panel toggle
        const adminToggle = document.getElementById('adminToggle');
        const adminPanel = document.getElementById('adminPanel');
        const closeAdminPanel = document.getElementById('closeAdminPanel');

        if (adminToggle) {
            adminToggle.addEventListener('click', () => {
                adminPanel.classList.add('active');
                this.populateAdminPanel();
                this.addMagicEffect();
            });
        }

        if (closeAdminPanel) {
            closeAdminPanel.addEventListener('click', () => {
                adminPanel.classList.remove('active');
            });
        }

        // Individual edit buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const target = btn.dataset.target;
                this.openPlayfulEditor(target);
            });
        });

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleWhatsAppSubmission();
            });
        }
    }

    populateAdminPanel() {
        document.getElementById('heroImageInput').value = this.content.heroImage;
        document.getElementById('logoTextInput').value = this.content.logoText;
        document.getElementById('heroTitleInput').value = this.content.heroTitle;
        document.getElementById('heroSubtitleInput').value = this.content.heroSubtitle;
        document.getElementById('galleryTitleInput').value = this.content.galleryTitle;
        document.getElementById('contactTitleInput').value = this.content.contactTitle;
    }

    openPlayfulEditor(field) {
        const element = document.querySelector(`[data-field="${field}"]`);
        if (!element) return;

        const currentContent = this.content[field] || element.textContent;
        const newValue = prompt(`✨ Edit ${field}:`, currentContent);
        
        if (newValue !== null && newValue.trim()) {
            this.content[field] = newValue.trim();
            element.textContent = newValue.trim();
            this.saveContent();
            this.showMagicNotification('Content updated with magic! ✨');
        }
    }

    loadGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;

        const galleryHTML = this.content.galleryImages.map((image, index) => {
            const colors = ['accent', 'pink', 'purple', 'blue', 'green', 'orange', 'accent', 'pink'];
            const colorClass = colors[index % colors.length];
            
            return `
            <div class="gallery-item gallery-item-${colorClass}" data-item-id="${index + 1}">
                <button class="edit-btn image-edit-btn" data-target="galleryImage${index + 1}" title="Edit gallery image">🖼️</button>
                <img src="${image}" alt="Gallery item ${index + 1}" class="gallery-image" onerror="this.src='https://picsum.photos/seed/mridula${index + 1}/300/300.jpg'">
                <div class="gallery-info">
                    <h4 class="gallery-title">✨ Mridula Garment ${index + 1}</h4>
                    <button class="edit-btn" data-target="galleryTitle${index + 1}" title="Edit item name">✏️</button>
                    <p class="gallery-description">🎨 Custom tailored piece ${index + 1}</p>
                    <button class="edit-btn" data-target="galleryDesc${index + 1}" title="Edit description">✏️</button>
                    <button class="add-to-cart-btn" onclick="playfulManager.addToCart(${index + 1}, '✨ Mridula Garment ${index + 1}')">
                        🛒 Add Magic to Cart
                    </button>
                </div>
            </div>
        `;
        }).join('');

        galleryGrid.innerHTML = galleryHTML;
    }

    addToCart(itemId, itemName) {
        if (this.cart.find(item => item.id === itemId)) {
            this.showMagicNotification('✨ Item already in your magical cart!');
            return;
        }

        this.cart.push({ id: itemId, name: itemName });
        this.updateCartDisplay();
        this.showMagicNotification('🎁 Item added to your magical cart!');
        this.addCartAnimation();
    }

    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.updateCartDisplay();
        this.showMagicNotification('🗑️ Item removed from magical cart');
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');

        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">🌟 Your magical cart is empty</p>';
        } else {
            cartItems.innerHTML = this.cart.map((item, index) => `
                <div class="cart-item">
                    <span class="cart-item-name">✨ ${item.name}</span>
                    <button class="remove-item" onclick="playfulManager.removeFromCart(${item.id})">🗑️</button>
                </div>
            `).join('');
        }

        cartCount.textContent = this.cart.length;
    }

    handleWhatsAppSubmission() {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (!name || !phone) {
            this.showMagicNotification('⚠️ Please fill in all magical fields');
            return;
        }

        if (this.cart.length === 0) {
            this.showMagicNotification('🛒 Please add magical items to your cart');
            return;
        }

        const itemsList = this.cart.map((item, index) => `${index + 1}. ${item.name}`).join(', ');
        const message = `🎨 Hi Mridula Boutique, my name is ${name}. I would like to inquire about ordering the following magical bespoke items: ${itemsList}. Please contact me at ${phone} to discuss the invoice. ✨`;
        
        const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        this.showMagicNotification('📱 Opening magical WhatsApp...');
    }

    saveContent() {
        localStorage.setItem('mridulaPlayfulContent', JSON.stringify(this.content));
    }

    showMagicNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification magic-notification';
        notification.innerHTML = `✨ ${message}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, var(--accent), var(--pink));
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 50px;
            box-shadow: 0 8px 24px rgba(255, 107, 107, 0.3);
            z-index: 1000;
            animation: magicSlideIn 0.5s ease;
            max-width: 350px;
            font-weight: 600;
            text-align: center;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'magicSlideOut 0.5s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 4000);
    }

    addPlayfulEffects() {
        // Add floating emojis to page
        this.addFloatingEmojis();
        this.addClickEffects();
        this.addHoverEffects();
    }

    addFloatingEmojis() {
        const emojis = ['🎨', '✨', '🌟', '🎁', '🛒', '📱', '🎯'];
        emojis.forEach((emoji, index) => {
            const element = document.createElement('div');
            element.className = 'floating-emoji';
            element.textContent = emoji;
            element.style.cssText = `
                position: fixed;
                top: ${20 + (index * 60)}px;
                right: ${20 + (index * 60)}px;
                font-size: ${20 + Math.random() * 10}px;
                animation: float ${3 + index}s ease-in-out infinite;
                z-index: 1;
                pointer-events: none;
            `;
            document.body.appendChild(element);
        });
    }

    addClickEffects() {
        document.addEventListener('click', (e) => {
            this.createClickEffect(e.clientX, e.clientY);
        });
    }

    addHoverEffects() {
        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'scale(1.1) rotate(2deg)';
            });
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    createClickEffect(x, y) {
        const effect = document.createElement('div');
        effect.className = 'click-effect';
        effect.style.cssText = `
            position: fixed;
            top: ${y}px;
            left: ${x}px;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--accent), var(--pink));
            border-radius: 50%;
            pointer-events: none;
            animation: clickRipple 0.6s ease-out forwards;
            z-index: 9999;
        `;
        document.body.appendChild(effect);

        setTimeout(() => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }, 600);
    }

    addCartAnimation() {
        const cartSection = document.querySelector('.cart-section');
        if (cartSection) {
            cartSection.style.animation = 'cartBounce 0.6s ease';
            setTimeout(() => {
                cartSection.style.animation = '';
            }, 600);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.playfulManager = new PlayfulContentManager();
    console.log('🎉 Playful layout loaded successfully!');
});

// Add magical animations
const style = document.createElement('style');
style.textContent = `
    @keyframes magicSlideIn {
        from { opacity: 0; transform: translateX(100%) scale(0.5); }
        to { opacity: 1; transform: translateX(0) scale(1); }
    }
    @keyframes magicSlideOut {
        from { opacity: 1; transform: translateX(0) scale(1); }
        to { opacity: 0; transform: translateX(100%) scale(0.5); }
    }
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    @keyframes clickRipple {
        from { opacity: 1; transform: scale(0); }
        to { opacity: 0; transform: scale(2); }
    }
    @keyframes cartBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    .magic-notification {
        font-family: 'Poppins', sans-serif;
    }
    .floating-emoji {
        animation: float 4s ease-in-out infinite;
    }
    .click-effect {
        animation: clickRipple 0.6s ease-out forwards;
    }
`;
document.head.appendChild(style);
