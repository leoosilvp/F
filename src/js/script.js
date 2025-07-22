document.addEventListener("DOMContentLoaded", () => {
    const publishInput = document.querySelector('#publish input');
    const publishButton = document.querySelector('#btn-publish button');
    const feed = document.getElementById('feed');

    // simula dados do usuário logado
    const userName = "Leonardo Silva";
    const userHandle = "@leeosilvp";
    const userImage = "../assets/img/img-profile/img-default.avif";

    // Função para formatar data/hora
    function getFormattedDateTime() {
        const now = new Date();
        return now.toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short"
        });
    }

    // Função para criar o HTML de um post
    function createPostElement({ content, dateTime }) {
        const post = document.createElement('article');
        post.classList.add('post');
        post.innerHTML = `
            <div class="user">
                <img src="${userImage}" alt="img-profile">
                <section class="info-user">
                    <h1 id="name"><a href="#">${userName}</a></h1>
                    <h2 id="user-name"><a href="#">${userHandle}</a></h2>
                </section>
            </div>

            <div class="card-description">
                <h2>${content}</h2>
                <p style="font-size: 12px; color: gray; margin-top: 5px;">${dateTime}</p>
            </div>
        `;
        return post;
    }

    // Função para salvar os posts no localStorage
    function savePosts(posts) {
        localStorage.setItem("fiap_posts", JSON.stringify(posts));
    }

    // Função para carregar os posts salvos
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem("fiap_posts")) || [];
        posts.reverse().forEach(post => {
            const postElement = createPostElement(post);
            feed.prepend(postElement);
        });
    }

    // Evento de publicação
    publishButton.addEventListener('click', () => {
        const content = publishInput.value.trim();
        if (content === "") return;

        const dateTime = getFormattedDateTime();

        const newPostData = {
            content,
            dateTime
        };

        // Criar e exibir no feed
        const newPost = createPostElement(newPostData);
        feed.prepend(newPost);

        // Salvar no localStorage
        const savedPosts = JSON.parse(localStorage.getItem("fiap_posts")) || [];
        savedPosts.push(newPostData);
        savePosts(savedPosts);

        publishInput.value = "";
    });

    // Ao carregar a página, mostrar os posts salvos
    loadPosts();
});

