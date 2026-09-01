// ====== 公共组件脚本 ======
document.addEventListener('DOMContentLoaded', function() {
    
    // 0. 动态加载公共组件
    loadComponent('header-container', 'components/header.html');
    loadComponent('footer-container', 'components/footer.html');
    
    // 组件加载函数
    async function loadComponent(containerId, url) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        try {
            const response = await fetch(url);
            if (response.ok) {
                const html = await response.text();
                container.innerHTML = html;
                
                // 组件加载完成后初始化相关功能
                setTimeout(() => {
                    initMenuToggle();
                    initCurrentPageHighlight();
                }, 100);
            }
        } catch (error) {
            console.warn('Failed to load component:', url, error);
        }
    }
    
    // 1. 移动端菜单切换 - 增强触摸支持
    function initMenuToggle() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (!menuToggle || !mainNav) return;
    
        // 切换菜单
        function toggleMenu(force) {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            const newState = force !== undefined ? force : !isExpanded;
            
            menuToggle.setAttribute('aria-expanded', newState);
            mainNav.classList.toggle('show', newState);
            
            // 汉堡菜单动画
            const hamburger = menuToggle.querySelector('.hamburger');
            if (hamburger) {
                if (newState) {
                    hamburger.style.transform = 'rotate(45deg)';
                    hamburger.style.backgroundColor = 'transparent';
                } else {
                    hamburger.style.transform = 'none';
                    hamburger.style.backgroundColor = '';
                }
            }
            
            // 防止滚动穿透
            if (newState && window.innerWidth <= 768) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
        
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
        
        // 点击导航链接后关闭菜单
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    toggleMenu(false);
                }
            });
        });
        
        // 点击外部关闭菜单
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && mainNav.classList.contains('show')) {
                if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                    toggleMenu(false);
                }
            }
        });
        
        // ESC键关闭菜单
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav.classList.contains('show')) {
                toggleMenu(false);
            }
        });
        
        // 窗口大小改变时重置菜单状态
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mainNav.classList.contains('show')) {
                toggleMenu(false);
                document.body.style.overflow = '';
            }
        });
    }
    
    // 2. 当前页面高亮 - 支持更多路径格式
    function initCurrentPageHighlight() {
        function getCurrentPage() {
            const path = window.location.pathname;
            // 处理根路径、带/结尾、带index.html等情况
            if (path === '/' || path === '/index.html' || path.endsWith('/')) {
                return '1.shouye.html';
            }
            const filename = path.split('/').pop();
            return filename || '1.shouye.html';
        }
        
        const currentPage = getCurrentPage();
        const navLinks = document.querySelectorAll('.main-nav a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                href === currentPage.replace('.html', '') ||
                currentPage === '1.shouye.html' && href === '/' ||
                currentPage === '' && href === '1.shouye.html') {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }
    
    // 原有直接初始化（兼容不使用组件加载的页面）
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        // 切换菜单
        function toggleMenu(force) {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            const newState = force !== undefined ? force : !isExpanded;
            
            menuToggle.setAttribute('aria-expanded', newState);
            mainNav.classList.toggle('show', newState);
            
            // 汉堡菜单动画
            const hamburger = menuToggle.querySelector('.hamburger');
            if (hamburger) {
                if (newState) {
                    hamburger.style.transform = 'rotate(45deg)';
                    hamburger.style.backgroundColor = 'transparent';
                } else {
                    hamburger.style.transform = 'none';
                    hamburger.style.backgroundColor = '';
                }
            }
            
            // 防止滚动穿透
            if (newState && window.innerWidth <= 768) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
        
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
        
        // 点击导航链接后关闭菜单
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    toggleMenu(false);
                }
            });
        });
        
        // 点击外部关闭菜单
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && mainNav.classList.contains('show')) {
                if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                    toggleMenu(false);
                }
            }
        });
        
        // ESC键关闭菜单
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav.classList.contains('show')) {
                toggleMenu(false);
            }
        });
        
        // 窗口大小改变时重置菜单状态
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mainNav.classList.contains('show')) {
                toggleMenu(false);
                document.body.style.overflow = '';
            }
        });
    }
    
    // 2. 当前页面高亮 - 支持更多路径格式
    function getCurrentPage() {
        const path = window.location.pathname;
        // 处理根路径、带/结尾、带index.html等情况
        if (path === '/' || path === '/index.html' || path.endsWith('/')) {
            return '1.shouye.html';
        }
        const filename = path.split('/').pop();
        return filename || '1.shouye.html';
    }
    
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            href === currentPage.replace('.html', '') ||
            currentPage === '1.shouye.html' && href === '/' ||
            currentPage === '' && href === '1.shouye.html') {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
    
    // 3. 更新当前年份
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // 4. 回到顶部按钮 - 触摸优化
    const backTop = document.querySelector('.back-to-top');
    if (backTop) {
        let scrollHandler = function() {
            if (window.scrollY > 300) {
                backTop.classList.add('visible');
            } else {
                backTop.classList.remove('visible');
            }
        };
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
        scrollHandler(); // 初始调用
        
        backTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ 
                top: 0, 
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' 
            });
        });
        
        // 触摸设备优化
        backTop.addEventListener('touchstart', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'auto' });
        }, { passive: false });
    }
    
    // 5. 搜索框功能
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.trim();
                if (query) {
                    // 这里可以替换为实际搜索页面
                    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                }
            }
        });
        
        // 移动端优化：输入时自动放大
        searchInput.addEventListener('focus', function() {
            if (window.innerWidth <= 768) {
                this.style.fontSize = '16px'; // 防止iOS缩放
            }
        });
    }
    
    // 6. 响应式图片处理
    function handleResponsiveImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        if (window.innerWidth <= 480) {
            // 小屏手机可以替换为更小的图片
            images.forEach(img => {
                const mobileSrc = img.getAttribute('data-mobile-src');
                if (mobileSrc) img.src = mobileSrc;
            });
        }
    }
    handleResponsiveImages();
    
    // 7. 触摸设备友好提示
    if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch-device');
    }
    
    console.log('公共组件加载完成，当前页面:', currentPage);
});