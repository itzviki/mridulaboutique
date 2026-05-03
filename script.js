// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = [];
        this.init();
    }

    init() {
        this.loadGallery();
        this.setupEventListeners();
        this.updateCartDisplay();
    }

    // Load gallery items with local photos
    loadGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        const galleryItems = [
            {
                id: 1,
                name: 'Mridula Garment 1',
                description: 'Elegant evening wear with intricate embroidery',
                image: 'file:///D:/WebWorld/Photo/20180622_102909.jpg'
            },
            {
                id: 2,
                name: 'Mridula Garment 2',
                description: 'Custom tailored business suit',
                image: 'file:///D:/WebWorld/Photo/20180622_103110.jpg'
            },
            {
                id: 3,
                name: 'Mridula Garment 3',
                description: 'Traditional bridal lehenga',
                image: 'file:///D:/WebWorld/Photo/20180728_152445.jpg'
            },
            {
                id: 4,
                name: 'Mridula Garment 4',
                description: 'Contemporary cocktail dress',
                image: 'file:///D:/WebWorld/Photo/20180728_152501.jpg'
            },
            {
                id: 5,
                name: 'Mridula Garment 5',
                description: 'Handcrafted ethnic ensemble',
                image: 'file:///D:/WebWorld/Photo/PhotoGrid_1517043827313.jpg'
            },
            {
                id: 6,
                name: 'Mridula Garment 6',
                description: 'Modern fusion wear',
                image: 'file:///D:/WebWorld/Photo/PhotoGrid_1518671127415.jpg'
            },
            {
                id: 7,
                name: 'Mridula Garment 7',
                description: 'Classic formal attire',
                image: 'file:///D:/WebWorld/Photo/PhotoGrid_1518710539265.jpg'
            },
            {
                id: 8,
                name: 'Mridula Garment 8',
                description: 'Designer party wear',
                image: 'file:///D:/WebWorld/Photo/PhotoGrid_1519963636990.jpg'
            }
        ];

        galleryGrid.innerHTML = galleryItems.map(item => `
            <div class="gallery-item" data-item-id="${item.id}">
                <button class="edit-btn image-edit-btn" data-target="galleryImage${item.id}" title="Edit gallery image">🖼️</button>
                <img src="${item.image}" alt="${item.name}" class="gallery-image" onerror="this.src='https://picsum.photos/seed/mridula${item.id}/300/300.jpg'" data-field="galleryImage${item.id}">
                <div class="gallery-info">
                    <h4 class="gallery-title editable-text" data-field="galleryTitle${item.id}">${item.name}</h4>
                    <button class="edit-btn" data-target="galleryTitle${item.id}" title="Edit item name">✏️</button>
                    <p class="gallery-description editable-text" data-field="galleryDesc${item.id}">${item.description}</p>
                    <button class="edit-btn" data-target="galleryDesc${item.id}" title="Edit description">✏️</button>
                    <button class="add-to-cart-btn" onclick="cart.addToCart(${item.id}, '${item.name}')">
                        Quick Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
        
        // Reinitialize edit buttons for gallery items
        setTimeout(() => {
            if (window.inlineEditor) {
                window.inlineEditor.setupEditButtons();
            }
        }, 100);
    }

    // Add item to cart
    addToCart(itemId, itemName) {
        // Check if item already exists in cart
        const existingItem = this.items.find(item => item.id === itemId);
        
        if (existingItem) {
            this.showNotification('Item already in cart!', 'warning');
            return;
        }

        this.items.push({
            id: itemId,
            name: itemName
        });

        this.updateCartDisplay();
        this.updateButtonState(itemId, true);
        this.showNotification('Item added to cart!', 'success');
    }

    // Remove item from cart
    removeFromCart(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.updateCartDisplay();
        this.updateButtonState(itemId, false);
        this.showNotification('Item removed from cart!', 'info');
    }

    // Update cart display
    updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartCount = document.getElementById('cartCount');

        if (this.items.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <span class="cart-item-name">${item.name}</span>
                    <button class="remove-item" onclick="cart.removeFromCart(${item.id})">Remove</button>
                </div>
            `).join('');
        }

        cartCount.textContent = this.items.length;
    }

    // Update button state
    updateButtonState(itemId, isAdded) {
        const button = document.querySelector(`[data-item-id="${itemId}"] .add-to-cart-btn`);
        if (button) {
            if (isAdded) {
                button.textContent = 'Added to Cart';
                button.classList.add('added');
                button.disabled = true;
            } else {
                button.textContent = 'Quick Add to Cart';
                button.classList.remove('added');
                button.disabled = false;
            }
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleWhatsAppSubmission();
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Handle WhatsApp submission
    handleWhatsAppSubmission() {
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();

        // Validation
        if (!name || !phone) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        if (this.items.length === 0) {
            this.showNotification('Please add items to your cart before submitting', 'warning');
            return;
        }

        // Construct WhatsApp message
        const itemsList = this.items.map((item, index) => 
            `${index + 1}. ${item.name}`
        ).join(', ');

        const message = `Hi Mridula Boutique, my name is ${name}. I would like to inquire about ordering the following bespoke items: ${itemsList}. Please contact me at ${phone} to discuss the invoice.`;

        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;

        // Open in new tab
        window.open(whatsappUrl, '_blank');

        this.showNotification('Opening WhatsApp...', 'success');
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : type === 'warning' ? '#f39c12' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Add animation styles
const animationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

// Create and append style element
const styleElement = document.createElement('style');
styleElement.textContent = animationStyles;
document.head.appendChild(styleElement);

// Content Editor Class
class ContentEditor {
    constructor() {
        this.defaultContent = {
            heroImage: 'https://picsum.photos/seed/tailoring-boutique/1920/1080.jpg',
            logoText: 'Mridula Boutique',
            heroTitle: 'Bespoke Tailoring. Perfect Fit.',
            heroSubtitle: 'Discover the art of custom craftsmanship',
            heroCTA: 'Explore Collection',
            servicesTitle: 'Our Services',
            servicesSubtitle: 'Exquisite tailoring for every occasion',
            galleryTitle: 'Our Work',
            gallerySubtitle: 'Explore our portfolio of bespoke creations',
            cartTitle: 'Your Selection',
            contactTitle: 'Get in Touch',
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
        this.currentContent = JSON.parse(localStorage.getItem('mridulaContent')) || this.defaultContent;
        this.init();
    }

    init() {
        this.setupAdminPanel();
        this.loadSavedContent();
        this.populateGalleryEditors();
    }

    setupAdminPanel() {
        console.log('Setting up admin panel...');
        
        const adminToggle = document.getElementById('adminToggle');
        const adminPanel = document.getElementById('adminPanel');
        const closeAdminPanel = document.getElementById('closeAdminPanel');

        console.log('Elements found:', {
            adminToggle: !!adminToggle,
            adminPanel: !!adminPanel,
            closeAdminPanel: !!closeAdminPanel
        });

        if (adminToggle) {
            adminToggle.addEventListener('click', (e) => {
                console.log('Edit button clicked!', e);
                if (adminPanel) {
                    adminPanel.classList.add('active');
                    this.populateFormFields();
                    console.log('Admin panel opened');
                } else {
                    console.error('Admin panel not found!');
                }
            });
        } else {
            console.error('Admin toggle button not found!');
        }

        if (closeAdminPanel) {
            closeAdminPanel.addEventListener('click', () => {
                if (adminPanel) {
                    adminPanel.classList.remove('active');
                    console.log('Admin panel closed');
                }
            });
        }

        // Tab switching
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Update buttons
        const updateBtns = document.querySelectorAll('.update-btn');
        updateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.target;
                this.updateContent(target);
            });
        });

        // Save and reset buttons
        const saveBtn = document.getElementById('saveChanges');
        const resetBtn = document.getElementById('resetChanges');

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveAllChanges();
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetToDefault();
            });
        }
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}Tab`).classList.add('active');
    }

    populateFormFields() {
        // Populate text fields
        document.getElementById('heroImage').value = this.currentContent.heroImage;
        document.getElementById('logoText').value = this.currentContent.logoText;
        document.getElementById('heroTitle').value = this.currentContent.heroTitle;
        document.getElementById('heroSubtitle').value = this.currentContent.heroSubtitle;
        document.getElementById('heroCTA').value = this.currentContent.heroCTA;
        document.getElementById('servicesTitle').value = this.currentContent.servicesTitle;
        document.getElementById('servicesSubtitle').value = this.currentContent.servicesSubtitle;
        document.getElementById('galleryTitle').value = this.currentContent.galleryTitle;
        document.getElementById('gallerySubtitle').value = this.currentContent.gallerySubtitle;
        document.getElementById('cartTitle').value = this.currentContent.cartTitle;
        document.getElementById('contactTitle').value = this.currentContent.contactTitle;
    }

    populateGalleryEditors() {
        const galleryImageEditors = document.getElementById('galleryImageEditors');
        if (galleryImageEditors) {
            galleryImageEditors.innerHTML = '';
            
            this.currentContent.galleryImages.forEach((image, index) => {
                const editorHTML = `
                    <div class="gallery-image-editor">
                        <label>Image ${index + 1}:</label>
                        <input type="text" id="galleryImage${index}" value="${image}" placeholder="Enter image URL or file path">
                    </div>
                `;
                galleryImageEditors.innerHTML += editorHTML;
            });
        }
    }

    updateContent(target) {
        switch(target) {
            case 'hero':
                this.updateHeroContent();
                break;
            case 'logo':
                this.updateLogoContent();
                break;
            case 'services':
                this.updateServicesContent();
                break;
            case 'gallery':
                this.updateGalleryContent();
                break;
            case 'contact':
                this.updateContactContent();
                break;
        }
    }

    updateHeroContent() {
        const heroImage = document.getElementById('heroImage').value;
        const heroTitle = document.getElementById('heroTitle').value;
        const heroSubtitle = document.getElementById('heroSubtitle').value;
        const heroCTA = document.getElementById('heroCTA').value;

        if (heroImage) {
            document.querySelector('.hero').style.backgroundImage = `linear-gradient(rgba(44, 140, 140, 0.7), rgba(44, 140, 140, 0.7)), url('${heroImage}')`;
            this.currentContent.heroImage = heroImage;
        }

        if (heroTitle) {
            document.querySelector('.hero-title').textContent = heroTitle;
            this.currentContent.heroTitle = heroTitle;
        }

        if (heroSubtitle) {
            document.querySelector('.hero-subtitle').textContent = heroSubtitle;
            this.currentContent.heroSubtitle = heroSubtitle;
        }

        if (heroCTA) {
            document.querySelector('.cta-button').textContent = heroCTA;
            this.currentContent.heroCTA = heroCTA;
        }

        this.showNotification('Hero content updated!', 'success');
    }

    updateLogoContent() {
        const logoText = document.getElementById('logoText').value;
        if (logoText) {
            document.querySelector('.logo h1').textContent = logoText;
            this.currentContent.logoText = logoText;
            this.showNotification('Logo updated!', 'success');
        }
    }

    updateServicesContent() {
        const servicesTitle = document.getElementById('servicesTitle').value;
        const servicesSubtitle = document.getElementById('servicesSubtitle').value;

        if (servicesTitle) {
            document.querySelector('#services .section-title').textContent = servicesTitle;
            this.currentContent.servicesTitle = servicesTitle;
        }

        if (servicesSubtitle) {
            document.querySelector('#services .section-subtitle').textContent = servicesSubtitle;
            this.currentContent.servicesSubtitle = servicesSubtitle;
        }

        this.showNotification('Services content updated!', 'success');
    }

    updateGalleryContent() {
        const galleryTitle = document.getElementById('galleryTitle').value;
        const gallerySubtitle = document.getElementById('gallerySubtitle').value;

        if (galleryTitle) {
            document.querySelector('#our-work .section-title').textContent = galleryTitle;
            this.currentContent.galleryTitle = galleryTitle;
        }

        if (gallerySubtitle) {
            document.querySelector('#our-work .section-subtitle').textContent = gallerySubtitle;
            this.currentContent.gallerySubtitle = gallerySubtitle;
        }

        // Update gallery images
        const newGalleryImages = [];
        for (let i = 0; i < 8; i++) {
            const input = document.getElementById(`galleryImage${i}`);
            if (input && input.value) {
                newGalleryImages.push(input.value);
            }
        }

        if (newGalleryImages.length > 0) {
            this.currentContent.galleryImages = newGalleryImages;
            // Update cart gallery items
            if (window.cart) {
                window.cart.galleryItems = window.cart.galleryItems.map((item, index) => ({
                    ...item,
                    image: newGalleryImages[index] || item.image
                }));
                window.cart.loadGallery();
            }
        }

        this.showNotification('Gallery content updated!', 'success');
    }

    updateContactContent() {
        const cartTitle = document.getElementById('cartTitle').value;
        const contactTitle = document.getElementById('contactTitle').value;

        if (cartTitle) {
            document.querySelector('.cart-section h3').textContent = cartTitle;
            this.currentContent.cartTitle = cartTitle;
        }

        if (contactTitle) {
            document.querySelector('.contact-section h3').textContent = contactTitle;
            this.currentContent.contactTitle = contactTitle;
        }

        this.showNotification('Contact content updated!', 'success');
    }

    saveAllChanges() {
        // Update all gallery images from form
        const newGalleryImages = [];
        for (let i = 0; i < 8; i++) {
            const input = document.getElementById(`galleryImage${i}`);
            if (input && input.value) {
                newGalleryImages.push(input.value);
            }
        }
        if (newGalleryImages.length > 0) {
            this.currentContent.galleryImages = newGalleryImages;
        }

        // Save to localStorage
        localStorage.setItem('mridulaContent', JSON.stringify(this.currentContent));
        
        // Reload page to apply all changes
        this.showNotification('All changes saved! Reloading...', 'success');
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }

    resetToDefault() {
        if (confirm('Are you sure you want to reset all content to default? This cannot be undone.')) {
            this.currentContent = JSON.parse(JSON.stringify(this.defaultContent));
            localStorage.removeItem('mridulaContent');
            this.showNotification('Content reset to default! Reloading...', 'info');
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    }

    loadSavedContent() {
        // Apply saved content to page
        if (this.currentContent.heroImage) {
            document.querySelector('.hero').style.backgroundImage = `linear-gradient(rgba(44, 140, 140, 0.7), rgba(44, 140, 140, 0.7)), url('${this.currentContent.heroImage}')`;
        }

        if (this.currentContent.logoText) {
            document.querySelector('.logo h1').textContent = this.currentContent.logoText;
        }

        if (this.currentContent.heroTitle) {
            document.querySelector('.hero-title').textContent = this.currentContent.heroTitle;
        }

        if (this.currentContent.heroSubtitle) {
            document.querySelector('.hero-subtitle').textContent = this.currentContent.heroSubtitle;
        }

        if (this.currentContent.heroCTA) {
            document.querySelector('.cta-button').textContent = this.currentContent.heroCTA;
        }

        if (this.currentContent.servicesTitle) {
            document.querySelector('#services .section-title').textContent = this.currentContent.servicesTitle;
        }

        if (this.currentContent.servicesSubtitle) {
            document.querySelector('#services .section-subtitle').textContent = this.currentContent.servicesSubtitle;
        }

        if (this.currentContent.galleryTitle) {
            document.querySelector('#our-work .section-title').textContent = this.currentContent.galleryTitle;
        }

        if (this.currentContent.gallerySubtitle) {
            document.querySelector('#our-work .section-subtitle').textContent = this.currentContent.gallerySubtitle;
        }

        if (this.currentContent.cartTitle) {
            document.querySelector('.cart-section h3').textContent = this.currentContent.cartTitle;
        }

        if (this.currentContent.contactTitle) {
            document.querySelector('.contact-section h3').textContent = this.currentContent.contactTitle;
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : type === 'warning' ? '#f39c12' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 10001;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Form validation helper
function validatePhone(phone) {
    const phoneRegex = /^[+]?[\d\s\-()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Inline Editor Class
class InlineEditor {
    constructor() {
        this.currentEditor = null;
        this.currentField = null;
        this.currentElement = null;
        this.init();
    }

    init() {
        this.setupEditButtons();
        console.log('Inline Editor initialized');
    }

    setupEditButtons() {
        // Add click listeners to all edit buttons
        const editButtons = document.querySelectorAll('.edit-btn');
        const imageButtons = document.querySelectorAll('.image-edit-btn');
        
        console.log('Found edit buttons:', editButtons.length);
        console.log('Found image edit buttons:', imageButtons.length);
        
        editButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const target = btn.dataset.target;
                console.log('Edit button clicked for:', target);
                this.openEditor(target);
            });
        });

        // Make sure image edit buttons are visible
        imageButtons.forEach(btn => {
            btn.style.display = 'flex';
            btn.style.visibility = 'visible';
            btn.style.opacity = '0.9';
            console.log('Image edit button setup for:', btn.dataset.target);
        });
    }

    openEditor(field) {
        this.currentField = field;
        this.currentElement = document.querySelector(`[data-field="${field}"]`);
        
        if (!this.currentElement) {
            console.error('Element not found for field:', field);
            return;
        }

        // Get current content
        let currentContent = '';
        let isImage = false;
        
        if (field === 'heroImage') {
            // For hero image, get the current background image
            const heroSection = document.querySelector('.hero');
            const bgStyle = window.getComputedStyle(heroSection).backgroundImage;
            currentContent = bgStyle.replace(/url\(['"]?([^'"]*)['"]?\)/, '$1');
            isImage = true;
        } else if (field.startsWith('galleryImage')) {
            // For gallery images, get the src attribute
            currentContent = this.currentElement.src || this.currentElement.getAttribute('src');
            isImage = true;
        } else {
            currentContent = this.currentElement.textContent || this.currentElement.innerText;
        }

        // Create editor modal
        this.createEditorModal(currentContent, isImage);
    }

    createEditorModal(currentContent, isImage) {
        // Remove existing editor if any
        this.closeEditor();

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'editor-overlay';
        overlay.addEventListener('click', () => this.closeEditor());

        // Create editor modal
        const editor = document.createElement('div');
        editor.className = 'inline-editor';

        const title = isImage ? 'Edit Image' : 'Edit Text';
        const placeholder = isImage ? 'Enter image URL or file path' : 'Enter new text';
        const inputType = isImage ? 'input' : 'textarea';

        editor.innerHTML = `
            <h3>${title}</h3>
            <${inputType} 
                id="editorInput" 
                placeholder="${placeholder}" 
                ${isImage ? 'type="text"' : 'rows="4"'}
            >${currentContent}</${inputType}>
            <div class="editor-buttons">
                <button class="btn-cancel">Cancel</button>
                <button class="btn-save">Save</button>
            </div>
        `;

        // Add to DOM
        document.body.appendChild(overlay);
        document.body.appendChild(editor);

        // Focus input
        setTimeout(() => {
            document.getElementById('editorInput').focus();
            if (!isImage) {
                document.getElementById('editorInput').select();
            }
        }, 100);

        // Setup button listeners
        editor.querySelector('.btn-save').addEventListener('click', () => this.saveChanges());
        editor.querySelector('.btn-cancel').addEventListener('click', () => this.closeEditor());

        // Handle Enter key for save
        document.getElementById('editorInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !isImage && e.ctrlKey) {
                this.saveChanges();
            }
        });

        this.currentEditor = editor;
    }

    saveChanges() {
        const input = document.getElementById('editorInput');
        const newContent = input.value.trim();

        if (!newContent) {
            alert('Content cannot be empty!');
            return;
        }

        if (this.currentField === 'heroImage') {
            // Update hero background image
            const heroSection = document.querySelector('.hero');
            heroSection.style.backgroundImage = `linear-gradient(rgba(44, 140, 140, 0.7), rgba(44, 140, 140, 0.7)), url('${newContent}')`;
            
            // Update content editor
            if (window.contentEditor) {
                window.contentEditor.currentContent.heroImage = newContent;
                window.contentEditor.saveToStorage();
            }
        } else if (this.currentField.startsWith('galleryImage')) {
            // Update gallery image
            this.currentElement.src = newContent;
            
            // Update gallery item in cart if needed
            const itemId = this.currentField.replace('galleryImage', '');
            if (window.cart && window.cart.galleryItems) {
                const galleryItem = window.cart.galleryItems.find(item => item.id == itemId);
                if (galleryItem) {
                    galleryItem.image = newContent;
                }
            }
        } else if (this.currentField.startsWith('galleryTitle')) {
            // Update gallery item title
            this.currentElement.textContent = newContent;
            
            // Update gallery item in cart
            const itemId = this.currentField.replace('galleryTitle', '');
            if (window.cart && window.cart.galleryItems) {
                const galleryItem = window.cart.galleryItems.find(item => item.id == itemId);
                if (galleryItem) {
                    galleryItem.name = newContent;
                }
            }
        } else if (this.currentField.startsWith('galleryDesc')) {
            // Update gallery item description
            this.currentElement.textContent = newContent;
            
            // Update gallery item in cart
            const itemId = this.currentField.replace('galleryDesc', '');
            if (window.cart && window.cart.galleryItems) {
                const galleryItem = window.cart.galleryItems.find(item => item.id == itemId);
                if (galleryItem) {
                    galleryItem.description = newContent;
                }
            }
        } else {
            // Update text content
            this.currentElement.textContent = newContent;
            
            // Update content editor
            if (window.contentEditor) {
                window.contentEditor.currentContent[this.currentField] = newContent;
                window.contentEditor.saveToStorage();
            }
        }

        this.showNotification('Content updated successfully!', 'success');
        this.closeEditor();
    }

    saveToStorage() {
        if (window.contentEditor) {
            localStorage.setItem('mridulaContent', JSON.stringify(window.contentEditor.currentContent));
        }
    }

    closeEditor() {
        // Remove overlay and editor
        const overlay = document.querySelector('.editor-overlay');
        const editor = document.querySelector('.inline-editor');
        
        if (overlay) overlay.remove();
        if (editor) editor.remove();
        
        this.currentEditor = null;
        this.currentField = null;
        this.currentElement = null;
    }

    showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 10002;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Update ContentEditor to add saveToStorage method
const originalContentEditor = ContentEditor.prototype;
ContentEditor.prototype.saveToStorage = function() {
    localStorage.setItem('mridulaContent', JSON.stringify(this.currentContent));
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing...');
    
    // Initialize cart and content editor
    window.cart = new ShoppingCart();
    window.contentEditor = new ContentEditor();
    window.inlineEditor = new InlineEditor();
    
    console.log('Cart, Content Editor, and Inline Editor initialized');
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .gallery-item, .cart-section, .contact-section');
    animateElements.forEach(el => observer.observe(el));

    // Enhanced form validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.setCustomValidity('Please enter a valid phone number');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
    
    console.log('All initialization complete');
});
