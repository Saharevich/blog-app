const posts = [];

const TEXT_VALIDATION_LIMIT = 200;
const TITLE_VALIDATION_LIMIT = 60;

const postTitleInputNode = document.querySelector('.js-title-input');
const postTextInputNode = document.querySelector('.js-post-input');
const postBtnNode = document.querySelector('.js-post-btn');
const postsNode = document.querySelector('.js-posts');
const validationPostsMassege = document.querySelector('.posts__validation');

function currentValue() {
    const currentTitle = postTitleInputNode.value.length;
    const currentText = postTextInputNode.value.length;

    if (currentTitle > TITLE_VALIDATION_LIMIT) {
        validationPostsMassege.innerText = `Длина заголовка не должна превышать ${TITLE_VALIDATION_LIMIT} символов`;
        validationPostsMassege.classList.remove('posts__validation__hidden');
        return;
    }

    if (currentText > TEXT_VALIDATION_LIMIT) {
        validationPostsMassege.innerText = `Длина поста не должна превышать ${TEXT_VALIDATION_LIMIT} символов`;
        validationPostsMassege.classList.remove('posts__validation__hidden')
        return;
    }

    validationPostsMassege.classList.add('posts__validation__hidden')
};

postTitleInputNode.addEventListener('input', currentValue);

postTextInputNode.addEventListener('input', currentValue);

function getPostFromUser() {
    const title = postTitleInputNode.value;
    const text = postTextInputNode.value;

    return {
        title: title,
        text: text,
    };
};

function addPost({title, text}) {
    const currentDate = new Date();
    const dt = `${currentDate.toLocaleDateString()} ${currentDate.getHours()}:${currentDate.getUTCMinutes()}`

    posts.push({
        dt,
        title: title,
        text: text,
    });
};

function getPosts() {
    return posts;
}

function renderPosts() {
    const posts = getPosts();

    let postsHtml = '';

    posts.forEach(post => {
        postsHtml += `
            <div class='post'>
                <p class='post__date'>${post.dt}</p>
                <p class='post__title'>${post.title}</p>
                <p class='post__text'>${post.text}</p>
            </div>`;
    
    });

    postsNode.innerHTML = postsHtml;
};

function checkInputFields() {
    const title = postTitleInputNode.value.trim();
    const text = postTextInputNode.value.trim();

    if (!title || !text) {
        validationPostsMassege.innerText = "Заголовок и текст поста обязательны для заполнения";
        validationPostsMassege.classList.remove('posts__validation__hidden');
        return false;
    }

    return true;
}

postBtnNode.addEventListener('click', function() {
    if (checkInputFields()) {
    const postFromUser = getPostFromUser();

    if (postFromUser.title.length > TITLE_VALIDATION_LIMIT || postFromUser.text.length > TEXT_VALIDATION_LIMIT) {
        validationPostsMassege.innerText = `Длина заголовка не должна превышать ${TITLE_VALIDATION_LIMIT} символов, а длина текста поста не должна превышать ${TEXT_VALIDATION_LIMIT} символов`;
        validationPostsMassege.classList.remove('posts__validation__hidden');
        return;
    }
    
    addPost(postFromUser);

    renderPosts();
// Очищаем поля ввода после добавления поста
    postTitleInputNode.value = '';
    postTextInputNode.value = '';

    }
});

