
document.addEventListener('DOMContentLoaded', function () {
    // Пример данных о постах (ваш сервер должен предоставлять аналогичные данные)
    const postsData = [
        { username: 'friend1', content: 'This is a post from friend1.' },
        { username: 'friend2', content: 'Another post from friend2.' },
        { username: 'friend3', content: 'Another post from friend3.' },
        { username: 'friend4', content: 'Another post from friend4.' },
        { username: 'friend5', content: 'Another post from friend5.' },
        // Добавьте дополнительные посты по мере необходимости
    ];

    // Функция для генерации элементов постов
    function renderPosts() {
        const postsContainer = document.querySelector('.posts');

        // Очистим текущие посты, если они есть
        postsContainer.innerHTML = '';

        // Пройдемся по данным о постах и создадим элементы для отображения
        postsData.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3>${post.username}</h3>
                <p>${post.content}</p>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Вызовем функцию для отображения постов при загрузке страницы
    renderPosts();
});
