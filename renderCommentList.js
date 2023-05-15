

const getListComments = (comment, index) => {
  return ` <li class="comment" data-answer=" > ${comment.text} ,
         ${comment.name}  ">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index= "${index}" class="like-button ${comment.isliked ? "-active-like" : ""}"></button>
              </br>
   
            </div>
          </div>
        </li> `
}

export default getListComments
  //        <button data-id="${comment.id}" class=" delete-button">Удалить</button>


 