document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.container > .section');
    const sideBarItems = document.querySelectorAll('.side-nav-bar .side-bar-item'); // Seleciona os itens da barra lateral
    let currentIndex = 0;

    // Garante que as classes das seções estejam corretas
    function classTreatment(bufferIndex) {
        if (currentIndex > bufferIndex) {
            for (i = bufferIndex + 1; i < currentIndex; i++) {
                sections[i].setAttribute('data-status', 'inactive-bottom');
            }
        }

        if (currentIndex < bufferIndex) {
            for (i = currentIndex + 1; i < bufferIndex; i++) {
                sections[i].setAttribute('data-status', 'inactive-top');
            }
        }
    }

    function updateSection(bufferIndex) {
        if (currentIndex < bufferIndex) {
            sections[currentIndex].setAttribute('data-status', 'inactive-top');
            sections[bufferIndex].setAttribute('data-status', 'active');
        }

        if (currentIndex > bufferIndex) {
            sections[currentIndex].setAttribute('data-status', 'inactive-bottom');
            sections[bufferIndex].setAttribute('data-status', 'active');
        }
    }

    function updateSidebar(bufferIndex) {
        sideBarItems[currentIndex].setAttribute('data-status', 'inactive');
        sideBarItems[bufferIndex].setAttribute('data-status','active');
    }

    // Função para definir a seção ativa
    function setActive(bufferIndex) {

        classTreatment(bufferIndex);
        updateSidebar(bufferIndex);
        updateSection(bufferIndex);
        
        currentIndex = bufferIndex;
    }

    // Configuração para clicar nos itens da barra lateral
    sideBarItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            setActive(index);
        });
    });

    // Define a seção inicial como ativa
    setActive(0);
});