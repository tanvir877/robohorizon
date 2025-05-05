document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('robotCanvas');
    const ctx = canvas.getContext('2d');
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let robotRotation = 0;
    let robotScale = 1;
    let robotY = canvas.height / 2;
    
    function drawRobot(rotation, scale, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);
    
    const primaryColor = '#00FFFF';
    const darkColor = '#1a1a1a';
    
    ctx.beginPath();
    ctx.fillStyle = darkColor;
    ctx.arc(0, 0, 25, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.fillStyle = primaryColor;
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.fillStyle = darkColor;
    ctx.arc(-8, -5, 5, 0, Math.PI * 2);
    ctx.arc(8, -5, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.strokeStyle = darkColor;
    ctx.lineWidth = 3;
    ctx.arc(0, 5, 8, 0, Math.PI);
    ctx.stroke();
    
    const antennaHeight = 15;
    ctx.beginPath();
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2;
    ctx.moveTo(-10, -20);
    ctx.lineTo(-5, -30 - antennaHeight * Math.sin(Date.now() / 300));
    ctx.moveTo(10, -20);
    ctx.lineTo(5, -30 - antennaHeight * Math.sin(Date.now() / 300 + Math.PI));
    ctx.stroke();
    
    ctx.restore();
    }
    
    function animate() {
    requestAnimationFrame(animate);
    drawRobot(robotRotation, robotScale, robotY);
    }
    
    window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDiff = st - lastScrollTop;
    const maxRotation = Math.PI / 6;
    const rotationSpeed = 0.002;
    const scaleRange = 0.2;
    const yRange = 20;
    
    robotRotation = Math.max(Math.min(scrollDiff * rotationSpeed, maxRotation), -maxRotation);
    robotScale = 1 + Math.sin(st * 0.002) * scaleRange;
    robotY = canvas.height / 2 + Math.sin(st * 0.005) * yRange;
    
    lastScrollTop = st;
    });
    
    animate();
    if (typeof window.chatBotInitialized === 'undefined') {
    window.chatBotInitialized = true;
    const robotMascot = document.getElementById('robotMascot');
    const chatDialog = document.getElementById('chatDialog');
    const minimizeChat = document.getElementById('minimizeChat');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    let isMinimized = false;
    function toggleChat() {
    if (isMinimized) {
    chatDialog.classList.remove('h-[60px]');
    isMinimized = false;
    } else {
    chatDialog.classList.toggle('hidden');
    }
    }
    function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex items-start gap-3';
    messageDiv.innerHTML = `
    ${isUser ? `
    <div class="w-8 h-8 flex items-center justify-center bg-gray-600 rounded-full flex-shrink-0 ml-auto order-2">
    <i class="ri-user-line text-gray-300 text-sm"></i>
    </div>
    <div class="bg-primary bg-opacity-20 rounded-lg p-3 text-sm max-w-[80%] order-1 ml-auto">
    ${message}
    </div>
    ` : `
    <div class="w-8 h-8 flex items-center justify-center bg-primary bg-opacity-20 rounded-full flex-shrink-0">
    <i class="ri-robot-fill text-primary text-sm"></i>
    </div>
    <div class="bg-gray-700 rounded-lg p-3 text-sm max-w-[80%]">
    ${message}
    </div>
    `}
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    robotMascot.addEventListener('click', toggleChat);
    minimizeChat.addEventListener('click', () => {
    chatDialog.classList.add('h-[60px]');
    isMinimized = true;
    });
    closeChat.addEventListener('click', () => {
    chatDialog.classList.add('hidden');
    isMinimized = false;
    });
    function handleSendMessage() {
    const message = chatInput.value.trim();
    if (message) {
    addMessage(message, true);
    chatInput.value = '';
    setTimeout(() => {
    addMessage('I\'m here to help! Please note that I\'m a demo assistant. For real assistance, please contact our research team.');
    }, 1000);
    }
    }
    sendMessage.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
    handleSendMessage();
    }
    });
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
    const action = btn.textContent;
    addMessage(action, true);
    setTimeout(() => {
    addMessage(`I'll help you find information about ${action}. Please note that I'm a demo assistant.`);
    }, 1000);
    });
    });
    // View Toggle
    const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');
    const projectsGrid = document.getElementById('projects-grid');
    viewToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
    viewToggleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const viewType = btn.getAttribute('data-view');
    if (viewType === 'grid') {
    projectsGrid.classList.remove('grid-cols-1');
    projectsGrid.classList.add('md:grid-cols-2', 'lg:grid-cols-3');
    } else if (viewType === 'list') {
    projectsGrid.classList.remove('md:grid-cols-2', 'lg:grid-cols-3');
    projectsGrid.classList.add('grid-cols-1');
    // Adjust card layout for list view
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
    if (viewType === 'list') {
    card.classList.add('md:flex');
    const imgContainer = card.querySelector('.relative');
    const contentContainer = card.querySelector('.p-6');
    if (imgContainer && contentContainer) {
    imgContainer.classList.add('md:w-1/3');
    contentContainer.classList.add('md:w-2/3');
    }
    } else {
    card.classList.remove('md:flex');
    const imgContainer = card.querySelector('.relative');
    const contentContainer = card.querySelector('.p-6');
    if (imgContainer && contentContainer) {
    imgContainer.classList.remove('md:w-1/3');
    contentContainer.classList.remove('md:w-2/3');
    }
    }
    });
    }
    });
    });
    // Sort Options
    const sortOptions = document.querySelectorAll('.sort-option');
    sortOptions.forEach(option => {
    option.addEventListener('click', () => {
    sortOptions.forEach(opt => opt.classList.remove('active'));
    option.classList.add('active');
    const sortType = option.getAttribute('data-sort');
    // Implement sorting logic here
    console.log(`Sorting by: ${sortType}`);
    });
    });
    // Category Filtering
    const categoryCheckboxes = document.querySelectorAll('.category-checkbox');
    const projectCards = document.querySelectorAll('.project-card');
    function updateFilters() {
    const selectedCategories = Array.from(categoryCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.getAttribute('data-category'));
    projectCards.forEach(card => {
    const cardCategories = card.getAttribute('data-category').split(' ');
    const shouldShow = cardCategories.some(category => selectedCategories.includes(category));
    if (shouldShow || selectedCategories.length === 0) {
    card.classList.remove('hidden');
    } else {
    card.classList.add('hidden');
    }
    });
    }
    categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateFilters);
    });
    // Search Functionality
    const searchInput = document.querySelector('input[placeholder="Search projects..."]');
    searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    projectCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const description = card.querySelector('p').textContent.toLowerCase();
    if (title.includes(searchTerm) || description.includes(searchTerm)) {
    card.classList.remove('hidden');
    } else {
    card.classList.add('hidden');
    }
    });
    });
    }
    });