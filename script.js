document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.container > .section');
    const sideBarItems = document.querySelectorAll('.side-nav-bar .side-bar-item'); // Seleciona os itens da barra lateral
    let currentSection = 0;
    let isScrolling = false;
    const scrollThreshold = window.innerHeight / 2; // Valor para decidir quando mudar de seção
    const scrollCooldown = 500; // Cooldown de 500ms após mudança de seção

    // Função para definir a seção ativa
    function setActiveSection(index) {
        if (index === currentSection || index < 0 || index >= sections.length) {
            return; // Evita mudanças desnecessárias ou fora de limite
        }
        isScrolling = true;
        // Atualiza classes das seções e da barra lateral
        sections[currentSection].setAttribute('data-status', 'inactive');
        sections[index].setAttribute('data-status', 'active');
        sideBarItems[currentSection].classList.remove('active');
        sideBarItems[index].classList.add('active');
        // Move a viewport para a seção ativa
        sections[index].scrollIntoView({ behavior: 'smooth' });
        // Atualiza seção atual e aguarda cooldown
        currentSection = index;
        setTimeout(() => isScrolling = false, scrollCooldown);
    }

    // Configurações para scroll de roda do mouse
    let lastScrollY = window.innerHeight / 2; // Inicialmente centraliza o scroll

    window.addEventListener('wheel', (event) => {
        if (isScrolling) return;

        const delta = event.deltaY;
        lastScrollY += delta;

        // Determina se deve mudar para a próxima ou anterior seção
        if (lastScrollY > scrollThreshold) {
            if (currentSection < sections.length - 1) {
                setActiveSection(currentSection + 1);
                lastScrollY = window.innerHeight / 2;
            }
        } else if (lastScrollY < -scrollThreshold) {
            if (currentSection > 0) {
                setActiveSection(currentSection - 1);
                lastScrollY = window.innerHeight / 2;
            }
        }
    });

    // Configuração para clicar nos itens da barra lateral
    sideBarItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            setActiveSection(index);
            lastScrollY = window.innerHeight / 2; // Reseta a posição do scroll ao clicar na navegação
        });
    });

    // Define a seção inicial como ativa
    setActiveSection(0);
});