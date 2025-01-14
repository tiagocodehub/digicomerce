document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const dotsContainer = document.querySelector('.carousel-dots');

    let currentIndex = 0;
    let startX;
    let isDragging = false;

    // Configuração das 7 imagens do carousel
    const slideData = [
        { img: 'img/img (1).webp', title: 'Template Moda', desc: 'Perfeito para lojas de roupas' },
        { img: 'img/img (2).webp', title: 'Template Eletrônicos', desc: 'Ideal para produtos tech' },
        { img: 'img/img (3).webp', title: 'Template Beleza', desc: 'Perfeito para cosméticos' },
        { img: 'img/img (4).webp', title: 'Template Casa e Decoração', desc: 'Ideal para lojas de móveis' },
        { img: 'img/img (5).webp', title: 'Template Esportes', desc: 'Perfeito para artigos esportivos' },
        { img: 'img/img (6).webp', title: 'Template Joias', desc: 'Elegante para joalherias' },
        { img: 'img/img (7).webp', title: 'Template Infantil', desc: 'Ideal para produtos infantis' }
    ];

    // Limpa o track existente e adiciona os novos slides
    track.innerHTML = '';
    slideData.forEach(data => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        slide.innerHTML = `
            <img src="${data.img}" alt="${data.title}">
            <div class="template-info">
                <h3>${data.title}</h3>
                <p>${data.desc}</p>
            </div>
        `;
        track.appendChild(slide);
    });

    // Criar dots
    dotsContainer.innerHTML = '';
    slideData.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    let autoSlideInterval;
    const AUTO_SLIDE_INTERVAL = 3000;

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(() => {
            goToSlide((currentIndex + 1) % slideData.length);
        }, AUTO_SLIDE_INTERVAL);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    // Eventos de touch e mouse
    track.addEventListener('mousedown', e => {
        isDragging = true;
        startX = e.pageX - track.offsetLeft;
        stopAutoSlide();
    });

    track.addEventListener('touchstart', e => {
        isDragging = true;
        startX = e.touches[0].pageX - track.offsetLeft;
        stopAutoSlide();
    });

    track.addEventListener('mousemove', e => {
        if (!isDragging) return;
        e.preventDefault();
    });

    track.addEventListener('touchmove', e => {
        if (!isDragging) return;
        e.preventDefault();
    });

    function endDrag() {
        isDragging = false;
        startAutoSlide();
    }

    track.addEventListener('mouseup', endDrag);
    track.addEventListener('mouseleave', endDrag);
    track.addEventListener('touchend', endDrag);

    // Botões de navegação
    nextButton.addEventListener('click', () => {
        stopAutoSlide();
        goToSlide((currentIndex + 1) % slideData.length);
        startAutoSlide();
    });

    prevButton.addEventListener('click', () => {
        stopAutoSlide();
        goToSlide((currentIndex - 1 + slideData.length) % slideData.length);
        startAutoSlide();
    });

    // Inicia o carrossel
    startAutoSlide();
}); 