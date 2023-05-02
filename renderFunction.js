import getFetch from "./api.js"

const renderComments = (listCommentsElement, getListComments) => {
    const commentsHtml = comments.map((comment, index) => getListComments(comment, index)).join("");
    // console.log(commentsHtml)
    listCommentsElement.innerHTML = commentsHtml;   //кладем сюда разметку

    initEventListeners();      //проинициализировать событие на новых создн-х элементах лайки
    replyToComment()

};

export default renderComments;