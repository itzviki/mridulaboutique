// Simple Content Manager
class SimpleContentManager {
    constructor() {
        this.content = {
            heroImage: 'https://picsum.photos/seed/tailoring/1920/1080.jpg',
            logoText: 'Mridula Boutique',
            heroTitle: 'Custom Tailoring',
            heroSubtitle: 'Perfect fit, exceptional quality',
            heroCTA: 'View Collection',
            galleryTitle: 'Our Work',
            contactTitle: 'Get in Touch',
            contactDesc: 'Let us create your perfect garment',
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
        console.log('Simple Content Manager initialized');
    }

    loadSavedContent() {
        const saved = localStorage.getItem('mridulaContent');
        if (saved) {
            this.content = JSON.parse(saved);
        }
        this.applyContent();
    }

    applyContent() {
        // Apply hero image
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundImage = `linear-gradient(rgba(44, 140, 140, 0.8), rgba(44, 140, 140, 0.8)), url('${this.content.heroImage}')`;
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
                this.openInlineEditor(target);
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

    openInlineEditor(field) {
        const element = document.querySelector(`[data-field="${field}"]`);
        if (!element) return;

        const currentContent = this.content[field] || element.textContent;
        const newValue = prompt(`Edit ${field}:`, currentContent);
        
        if (newValue !== null && newValue.trim()) {
            this.content[field] = newValue.trim();
            element.textContent = newValue.trim();
            this.saveContent();
            this.showNotification('Content updated successfully');
        }
    }

    loadGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;

        const galleryHTML = this.content.galleryImages.map((image, index) => `
            <div class="gallery-item" data-item-id="${index + 1}">
                <button class="edit-btn image-edit-btn" data-target="galleryImage${index + 1}" title="Edit gallery image">🖼️</button>
                <img src="${image}" alt="Gallery item ${index + 1}" class="gallery-image" onerror="this.src='https://picsum.photos/seed/mridula${index + 1}/300/300.jpg'">
                <div class="gallery-info">
                    <h4 class="gallery-title">Mridula Garment ${index + 1}</h4>
                    <button class="edit-btn" data-target="galleryTitle${index + 1}" title="Edit item name">✏️</button>
                    <p class="gallery-description">Custom tailored piece ${index + 1}</p>
                    <button class="edit-btn" data-target="galleryDesc${index + 1}" title="Edit description">✏️</button>
                    <button class="add-to-cart-btn" onclick="contentManager.addToCart(${index + 1}, 'Mridula Garment ${index + 1}')">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');

        galleryGrid.innerHTML = galleryHTML;
    }

    addToCart(itemId, itemName) {
        if (this.cart.find(item => item.id === itemId)) {
            this.showNotification('Item already in cart');
            return;
        }

        this.cart.push({ id: itemId, name: itemName });
        this.updateCartDisplay();
        this.showNotification('Item added to cart');
    }

    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.updateCartDisplay();
        this.showNotification('Item removed from cart');
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');

        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <span class="cart-item-name">${item.name}</span>
                    <button class="remove-item" onclick="contentManager.removeFromCart(${item.id})">Remove</button>
                </div>
            `).join('');
        }

        cartCount.textContent = this.cart.length;
    }

    handleWhatsAppSubmission() {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (!name || !phone) {
            this.showNotification('Please fill in all fields');
            return;
        }

        if (this.cart.length === 0) {
            this.showNotification('Please add items to your cart');
            return;
        }

        const itemsList = this.cart.map((item, index) => `${index + 1}. ${item.name}`).join(', ');
        const message = `Hi Mridula Boutique, my name is ${name}. I would like to inquire about ordering the following bespoke items: ${itemsList}. Please contact me at ${phone} to discuss the invoice.`;
        
        const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        this.showNotification('Opening WhatsApp...');
    }

    saveContent() {
        localStorage.setItem('mridulaContent', JSON.stringify(this.content));
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.contentManager = new SimpleContentManager();
    console.log('Simple layout loaded successfully');
});

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(100%); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100%); }
    }
    .notification {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);
