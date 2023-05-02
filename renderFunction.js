import { comments } from './api.js';
import getListComments from './callbacklist.js';
import { initEventListeners, replyToComment } from './main.js';
const listCommentsElement = document.getElementById('list-comments');


const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => getListComments(comment, index)).join("");
    // console.log(commentsHtml)
    listCommentsElement.innerHTML = commentsHtml;   //кладем сюда разметку

    initEventListeners();      //проинициализировать событие на новых создн-х элементах лайки
    replyToComment()

};

export default renderComments;