import getListComments  from "./callbacklist.js";
import renderComments from "./renderFunction.js";



const buttonElement = document.getElementById('write-button');
const listCommentsElement = document.getElementById('list-comments');
const nameInputElement = document.getElementById('name-input');
const textareaInputElement = document.getElementById('textarea-input');
const formInputElement = document.querySelector('.add-form');





renderComments(listCommentsElement, getListComments);


const getFetch = () => {

    return fetch('https://webdev-hw-api.vercel.app/api/v1/natalia-trukhman/comments',
        {
            method: "GET",
        })
        .then((response) => {
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
       
            renderComments();
        });
};



//добавления ответов на КОММЕНТЫ

const replyToComment = () => {
    const commentsElements = document.querySelectorAll(".comment");
    for (const commentsElement of commentsElements) {
        commentsElement.addEventListener("click", () => {


            textareaInputElement.value = commentsElement.dataset.answer;
            //renderComments();

        });

    }
}

//создаем рендер функцию         //из массива данных делаем html разметку
// const renderComments = () => {
//     const commentsHtml = comments.map((comment, index) => {
//         return ` <li class="comment" data-answer=" > ${comment.text} ,
//          ${comments[index].name}  ">
//           <div class="comment-header">
//             <div>${comments[index].name}</div>
//             <div>${comments[index].date}</div>
//           </div>
//           <div class="comment-body">
//             <div class="comment-text">
//               ${comment.text}
//             </div>
//           </div>
//           <div class="comment-footer">
//             <div class="likes">
//               <span class="likes-counter">${comments[index].likes}</span>
//               <button data-index= "${index}" class="like-button ${comment.isliked ? "-active-like" : ""}"></button>
//             </div>
//           </div>
//         </li> `
//     }).join("");
//     // console.log(commentsHtml)
//     listCommentsElement.innerHTML = commentsHtml;   //кладем сюда разметку

//     initEventListeners();      //проинициализировать событие на новых создн-х элементах лайки
//     replyToComment()

// };

getFetch();


////функция доб-я обработчика клика на  ЛАЙК и счетчик///
const initEventListeners = () => {
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
            renderComments();


        });
    }
};

//renderComments();




//валидация формы полей

buttonElement.addEventListener("click", () => {
    // nameInputElement.classList.remove("error")
    // textareaInputElement.classList.remove("error")
    if (nameInputElement.value === "" || textareaInputElement.value === "") {
        //   nameInputElement.classList.add("error");
        //   textareaInputElement.classList.add("error");
        return
    };

    buttonElement.disabled = true;   //атрибут блокирования кнопки
    buttonElement.textContent = "Комментарий загружается...";

    formInputElement.style.display = "none"
    fetch('https://webdev-hw-api.vercel.app/api/v1/natalia-trukhman/comments',

        {
            method: "POST",
            body: JSON.stringify({
                text: textareaInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
                name: nameInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
                //forceError: true,
            })
        })
        .then((response) => {
            console.log(response)
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                throw new Error("name должен содержать хотя бы 3 символа")
            } else {
                throw new Error("Сервер упал");
            }
        })
        .then(() => {
            getFetch();
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
            nameInputElement.value = ''
            textareaInputElement.value = ''
            formInputElement.style.display = "flex"


        })
        .catch((error) => {                 //упал инет
            if (error.message === "name должен содержать хотя бы 3 символа") {
                alert("Поле имя и комментарий должны содержать хотя бы 3 символа")
            } else {
                alert("Что-то пошло не так, попробуй позже!")
                formInputElement.style.display = "none"

            }
            formInputElement.style.display = "flex"
            buttonElement.disabled = false; //включение кнопки когда инет появился
            buttonElement.textContent = "Написать";
            console.warn(error); //отправлять в систему сбора ошибок


        });


});


renderComments();       //вызываем фун-ю рендер, чтобы разметка обновилась

  //});






    //console.log("It works!");