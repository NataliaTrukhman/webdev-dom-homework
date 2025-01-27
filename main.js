
// План
// 1. Реализовать форму логина в приложении
// * Перенести всю разметку в рендер функцию(+)
// * Сделать форму входа динамической(+(-))
// * API (+)
//  Вытащить логин компонент в отдельный модуль(+)
//  Вытащить компонент списка задач и форму добавления в отдельный модуль
// 2. Реализовать форму регистрации

import { getComments } from "./api.js";
import renderAppComments from "./renderFunction.js";


export const getFetch = (token, userName) => {

    return (
        getComments({ token })
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
                    };
                });

                renderAppComments(token, appComments, userName);

            })
    )
};

//добавления ответов на КОММЕНТЫ

export const replyToComment = () => {
    const commentsElements = document.querySelectorAll(".comment");
    for (const commentsElement of commentsElements) {
        commentsElement.addEventListener("click", () => {
            const textareaInputElement = document.getElementById('textarea-input');

            textareaInputElement.value = commentsElement.dataset.answer;
            

        });

    }
}

////функция доб-я обработчика клика на  ЛАЙК и счетчик///
export const initEventListeners = (comments, token, userName) => {
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
            renderAppComments(token, comments, userName);
        });
    }
};



getFetch("");















