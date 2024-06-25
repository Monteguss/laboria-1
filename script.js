document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.container > .section');
    const sideBarItems = document.querySelectorAll('.side-nav-bar .side-bar-item'); // Seleciona os itens da barra lateral
    let currentSection = 0;

    // Função para definir a seção ativa
    function setActiveSection(index) {
        sideBarItems[currentSection].setAttribute('data-status', 'inactive');
        sideBarItems[index].setAttribute('data-status','active');
        sections[currentSection].setAttribute('data-status', 'inactive');
        sections[index].setAttribute('data-status', 'active');
        currentSection = index;
    }

    // Configuração para clicar nos itens da barra lateral
    sideBarItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            setActiveSection(index);
        });
    });

    // Define a seção inicial como ativa
    setActiveSection(0);
});