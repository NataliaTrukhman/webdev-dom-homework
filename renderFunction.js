import { comments, postClick, getFetch } from './api.js';
import getListComments from './renderCommentList.js';
import { initEventListeners, replyToComment } from './main.js';


const host = 'https://webdev-hw-api.vercel.app/api/v2/natalia-trukhman/comments'
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null
const renderAppComments = () => {
    const appElement = document.getElementById("app");
    if (!token) {
        const appHtml = `
    <div class="container">
    <h1>Лента комментариев</h1>

 <div class="add-form">
      <h3>Форма входа</h3>
      <input type="text" class="add-form-login" placeholder="Введите логин" id="login-input"/>
      <br />
      <input type="password" class="add-form-login" placeholder="Введите пароль" id="password-input"/>

      <div class="add-form2">
        <button class="add-form-button1" id="login-button">Войти</button>
      </div>
    </div>


  </div>`
       
        appElement.innerHTML = appHtml;   //кладем сюда разметку 
        document.getElementById("login-button").addEventListener('click', () => {
            token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
            //renderAppComments ();

           
            getFetch()
        });
        return;
      

    }

    const commentsHtml = comments
        .map((comment, index) => getListComments(comment, index)).join("");

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
      <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="name-input" value="" />
      <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
        id="textarea-input"></textarea>
      <div class="add-form-row">
        <button class="add-form-button" id="write-button">Написать</button>
      </div>
    </div>

  </div>`

    appElement.innerHTML = appHtml;   //кладем сюда разметку


    const nameInputElement = document.getElementById('name-input');
    const textareaInputElement = document.getElementById('textarea-input');
    const buttonElement = document.getElementById('write-button');
    const formInputElement = document.querySelector('.add-form');

    // buttonElement.addEventListener('click', postClick);
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
        fetch(host, {
            method: 'POST',
            body: JSON.stringify({
                text: textareaInputElement.value
                    .replaceAll('<', '&lt;')
                    .replaceAll('>', '&gt;')
                    .replaceAll('"', '&quot;'),
                name: nameInputElement.value
                    .replaceAll('<', '&lt;')
                    .replaceAll('>', '&gt;')
                    .replaceAll('"', '&quot;'),
                //forceError: true,
            }),
            headers: {
                Authorization: token,
            },
        })
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    return response.json();
                } else if (response.status === 400) {
                    throw new Error('name должен содержать хотя бы 3 символа');
                } else {
                    throw new Error('Сервер упал');
                }
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

    initEventListeners();      //проинициализировать событие на новых создн-х элементах лайки
    replyToComment()

};

export default renderAppComments;