document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    // Función para cerrar todos los elementos del acordeón
    function closeAllItems() {
        accordionItems.forEach(item => {
            item.classList.remove('active');
        });
    }
    
    // Función para abrir un elemento específico
    function openItem(item) {
        closeAllItems();
        item.classList.add('active');
    }
    
    // Función para alternar un elemento (abrir/cerrar)
    function toggleItem(item) {
        if (item.classList.contains('active')) {
            item.classList.remove('active');
        } else {
            openItem(item);
        }
    }
    
    // Agregar event listeners a cada encabezado del acordeón
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            toggleItem(item);
        });
        
        // Hacer que los encabezados sean enfocables para accesibilidad
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        
        // Actualizar atributo ARIA cuando cambia el estado
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    const isExpanded = item.classList.contains('active');
                    header.setAttribute('aria-expanded', isExpanded.toString());
                }
            });
        });
        
        observer.observe(item, {
            attributes: true,
            attributeFilter: ['class']
        });
    });
    
    // Soporte para teclado (accesibilidad)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('accordion-header')) {
                e.preventDefault();
                const item = focusedElement.closest('.accordion-item');
                toggleItem(item);
            }
        }
    });
    
    // Abrir el primer elemento por defecto
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
        accordionItems[0].querySelector('.accordion-header').setAttribute('aria-expanded', 'true');
    }
});