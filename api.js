 
import renderAppComments from './renderFunction.js';
const nameInputElement = document.getElementById('name-input');
const formInputElement = document.querySelector('.add-form');
const textareaInputElement = document.getElementById('textarea-input');
const buttonElement = document.getElementById('write-button');


const token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
const host = 'https://webdev-hw-api.vercel.app/api/v2/natalia-trukhman/comments'
 
 export let comments = [];
 
 export const getFetch = () => {

    return fetch(host,
        {
            method: "GET",
            headers: {
                Authorization: token,
            },

        })
        .then((response) => {
            // if(response.status === 400){
            // throw new Error("Нет авторизации");//кинуть ошибку
            // }
            return response.json();
        })
        // Подписываемся на результат преобразования
        .then((answerApi) => {
            const appComments = answerApi.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date().toLocaleString("ru", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    }).replace(", ", " "),
                    text: comment.text,
                    likes: comment.likes,
                    isliked: false,
                }
            })

            // получили данные и рендерим их в приложении
            comments = appComments;

            renderAppComments();
        });
};


export const postClick = () => {
    // nameInputElement.classList.remove("error")
    // textareaInputElement.classList.remove("error")
    if (nameInputElement.value === '' || textareaInputElement.value === '') {
          nameInputElement.classList.add("error");
        //   textareaInputElement.classList.add("error");
        return;
    }

    buttonElement.disabled = true; //атрибут блокирования кнопки
    buttonElement.textContent = 'Комментарий загружается...';

    formInputElement.style.display = 'none';
    fetch(
       host, {
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
};
