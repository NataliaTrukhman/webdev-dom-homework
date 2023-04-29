

const getListComments = (comment, index) => {
    return ` <li class="comment" data-answer=" > ${comment.text} ,
         ${comments[index].name}  ">
          <div class="comment-header">
            <div>${comments[index].name}</div>
            <div>${comments[index].date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comments[index].likes}</span>
              <button data-index= "${index}" class="like-button ${comment.isliked ? "-active-like" : ""}"></button>
            </div>
          </div>
        </li> `
}

export default getListComments