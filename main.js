
// План
// 1. Реализовать форму логина в приложении
// * Перенести всю разметку в рендер функцию
// * Сделать форму входа динамической
// * Oтрефакторить приложение на модули
// * API (+)
//  Вытащить логин компонент в отдельный модуль
//  Вытащить компонент списка задач и форму добавления в отдельный модуль
// 2. Реализовать форму регистрации




import { comments, getFetch, postClick } from './api.js';
import renderAppComments from "./renderFunction.js";



const buttonElement = document.getElementById('write-button');
// const listCommentsElement = document.getElementById('list-comments');
// const nameInputElement = document.getElementById('name-input');
 const textareaInputElement = document.getElementById('textarea-input');
// const formInputElement = document.querySelector('.add-form');



//добавления ответов на КОММЕНТЫ

 export const replyToComment = () => {
    const commentsElements = document.querySelectorAll(".comment");
    for (const commentsElement of commentsElements) {
        commentsElement.addEventListener("click", () => {


            textareaInputElement.value = commentsElement.dataset.answer;
            //renderComments();

        });

    }
}

////функция доб-я обработчика клика на  ЛАЙК и счетчик///
export const initEventListeners = () => {
    const likesElements = document.querySelectorAll(".like-button");
    //console.log(likesElements);   -коллекция коментов список
    for (const likesElement of likesElements) {       //доб обработчик клика на кнопку лайка
        likesElement.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = likesElement.dataset.index;

            if (comments[index].isliked) {
                comments[index].isliked = false;
                comments[index].likes--
            } else {
                comments[index].isliked = true;
                comments[index].likes++
            }
            renderAppComments;


        });
    }
};

//renderComments();

getFetch();



//buttonElement.addEventListener('click', postClick);







  






   