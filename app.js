javascript
/**
 * Array de objetos contendo todos os tutoriais disponíveis
 * Cada tutorial possui:
 * - title: Título do tutorial
 * - category: Categoria/tópico
 * - description: Descrição breve
 * - url: Link para a página do tutorial
 * - image: URL da imagem de capa (usando placeholder aqui)
 * - date: Data de publicação (formato ISO)
 */
const tutorials = [
    {
        title: "Introdução ao HTML5",
        category: "HTML",
        description: "Aprenda os fundamentos do HTML5, incluindo estrutura básica, tags essenciais e semântica.",
        url: "tutorials/tutorial-html-css.html",
        image: "https://via.placeholder.com/400x225/3498db/ffffff?text=HTML5",
        date: "2023-06-15"
    },
    {
        title: "CSS Moderno: Flexbox e Grid",
        category: "CSS",
        description: "Domine os layouts modernos com Flexbox e CSS Grid para criar designs responsivos.",
        url: "tutorials/tutorial-html-css.html",
        image: "https://via.placeholder.com/400x225/2ecc71/ffffff?text=CSS3",
        date: "2023-07-02"
    },
    {
        title: "JavaScript Básico para Iniciantes",
        category: "JavaScript",
        description: "Introdução à programação com JavaScript: variáveis, funções e estruturas de controle.",
        url: "tutorials/tutorial-javascript.html",
        image: "https://via.placeholder.com/400x225/f39c12/ffffff?text=JS",
        date: "2023-07-20"
    },
    {
        title: "Formulários HTML com Validação",
        category: "HTML",
        description: "Crie formulários acessíveis e aprenda técnicas básicas de validação com HTML5.",
        url: "tutorials/tutorial-html-css.html",
        image: "https://via.placeholder.com/400x225/3498db/ffffff?text=Forms",
        date: "2023-08-05"
    },
    {
        title: "Animações CSS sem JavaScript",
        category: "CSS",
        description: "Crie animações suaves e performáticas usando apenas CSS transitions e keyframes.",
        url: "tutorials/tutorial-html-css.html",
        image: "https://via.placeholder.com/400x225/2ecc71/ffffff?text=Animações",
        date: "2023-08-18"
    },
    {
        title: "Manipulação do DOM com JavaScript",
        category: "JavaScript",
        description: "Aprenda a selecionar, criar e modificar elementos da página usando JavaScript.",
        url: "tutorials/tutorial-javascript.html",
        image: "https://via.placeholder.com/400x225/f39c12/ffffff?text=DOM",
        date: "2023-09-01"
    }
];

/**
 * Função para renderizar os cards de tutorial no container especificado
 * @param {Array} list - Array de tutoriais a serem renderizados
 * @param {string} containerId - ID do elemento container (padrão: 'cards')
 */
function renderCards(list, containerId = 'cards') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Limpa o container antes de adicionar novos cards
    container.innerHTML = '';
    
    // Se a lista estiver vazia, mostra mensagem
    if (list.length === 0) {
        container.innerHTML = '<p class="no-results">Nenhum tutorial encontrado. Tente ajustar sua busca.</p>';
        return;
    }
    
    // Cria um card para cada tutorial na lista
    list.forEach(tutorial => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img" style="background-image: url('${tutorial.image}')"></div>
            <div class="card-content">
                <h3>${tutorial.title}</h3>
                <span class="category">${tutorial.category}</span>
                <p>${tutorial.description}</p>
                <a href="${tutorial.url}">Ler Tutorial →</a>
            </div>
        `;
        container.appendChild(card);
    });
}

/**
 * Função para filtrar tutoriais com base no termo de busca
 * @param {string} searchTerm - Termo para filtrar os tutoriais
 * @returns {Array} - Array filtrado de tutoriais
 */
function filterTutorials(searchTerm) {
    if (!searchTerm) return tutorials;
    
    const term = searchTerm.toLowerCase();
    return tutorials.filter(tutorial => 
        tutorial.title.toLowerCase().includes(term) ||
        tutorial.category.toLowerCase().includes(term) ||
        tutorial.description.toLowerCase().includes(term)
    );
}

/**
 * Configura o evento de input para a barra de busca
 */
function setupSearch() {
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const filtered = filterTutorials(e.target.value);
            renderCards(filtered);
        });
    }
}

/**
 * Configura o menu mobile
 */
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.innerHTML = nav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
}

/**
 * Renderiza os tutoriais em destaque na página inicial
 */
function renderFeaturedTutorials() {
    const featuredContainer = document.getElementById('featured-cards');
    if (featuredContainer) {
        // Seleciona os 3 primeiros tutoriais como destaque
        const featured = tutorials.slice(0, 3);
        renderCards(featured, 'featured-cards');
    }
}

// Quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza todos os tutoriais na página de categorias
    renderCards(tutorials);
    
    // Renderiza tutoriais em destaque na home
    renderFeaturedTutorials();
    
    // Configura a busca
    setupSearch();
    
    // Configura o menu mobile
    setupMobileMenu();
});