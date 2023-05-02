 
 
 
 
 export let comments = [];
 
 
 
 
 export const getFetch = () => {

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

            renderComments(listCommentsElement, getListComments);
        });
};
export default getFetch;