import { getFetch } from './main.js';
import getListComments from './renderCommentList.js';
import { initEventListeners, replyToComment } from './main.js';
import { addComment } from './api.js';
import { renderLogin } from './components/login-components.js'

const renderAppComments = (token, comments, userName = "") => {
    const appElement = document.getElementById("app");
    const commentsHtml = comments
        .map((comment, index) => getListComments(comment, index)).join("");

    if (!token) {
        renderLogin({
            appElement,
            getFetch,
            commentsHtml,
        });
        return;
    }

    //////// //если пользователь авторизован/////////

    const appHtml = `
    <div class="container">
    <h1>Лента комментариев</h1>
    <ul class="comments" id="list-comments">
      <!-- Список рендерится из JS -->
      ${commentsHtml}
    </ul>
    <br />
    <div class="add-form">
      <h3>Форма </h3>
      <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="name-input" value="${userName}" />
      <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
        id="textarea-input"></textarea>
      <div class="add-form-row">
        <button class="add-form-button" id="write-button">Написать</button>
      </div>
    </div>

  </div>`
    appElement.innerHTML = appHtml;   //кладем сюда разметку


    const nameInputElement = document.getElementById('name-input');
    nameInputElement.disabled = true;

    const textareaInputElement = document.getElementById('textarea-input');
    const buttonElement = document.getElementById('write-button');
    const formInputElement = document.querySelector('.add-form');


    //добавить кнопку


    // const deleteButtons = document.querySelectorAll(".delete-button");
    // for (const deleteButton of deleteButtons) {
    //     deleteButton.addEventListener("click", (event) => {
    //         event.stopPropagation();
    //         const id = deleteButton.dataset.id;
    //         // Подписываемся на успешное завершение запроса с помощью then
    //         deleteComment({ id, token })
    //             .then((response) => {
    //                 // Получили данные и рендерим их в приложении
    //                 comments = response.comment;
    //                 renderAppComments();
    //             });
    //         renderAppComments();
    //     });
    // }



    buttonElement.addEventListener('click', () => {
        nameInputElement.classList.remove("error")
        textareaInputElement.classList.remove("error")
        if (nameInputElement.value === '' || textareaInputElement.value === '') {
            nameInputElement.classList.add("error");
            textareaInputElement.classList.add("error");
            return;
        }

        buttonElement.disabled = true; //атрибут блокирования кнопки
        buttonElement.textContent = 'Комментарий загружается...';

        formInputElement.style.display = 'none';

        addComment({
            name: nameInputElement.value,
            text: textareaInputElement.value,
            token

        })
         .then(() => {
                getFetch();
                buttonElement.disabled = false;
                buttonElement.textContent = 'Написать';
                nameInputElement.value = '';
                textareaInputElement.value = '';
                formInputElement.style.display = 'flex';
            })
            .catch((error) => {
                //упал инет
                if (error.message === 'name должен содержать хотя бы 3 символа') {
                    alert('Поле имя и комментарий должны содержать хотя бы 3 символа');
                } else {
                    alert('Что-то пошло не так, попробуй позже!');
                    formInputElement.style.display = 'none';
                }
                formInputElement.style.display = 'flex';
                buttonElement.disabled = false; //включение кнопки когда инет появился
                buttonElement.textContent = 'Написать';
                console.warn(error); //отправлять в систему сбора ошибок
            });
    });

    initEventListeners(comments, token, userName);      //проинициализировать событие на новых создн-х элементах лайки
    replyToComment()

};

export default renderAppComments;