const host = 'https://webdev-hw-api.vercel.app/api/v2/natalia-trukhman/comments'

export function getComments({ token }) {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token,
        },

    }).then((response) => {
        if (response.status === 400) {
            throw new Error("Нет авторизации");//кинуть ошибку
        }
        return response.json();
    })
};


// export function deleteComment({token,id}) {
//     return fetch("https://webdev-hw-api.vercel.app/api/v2/natalia-trukhman/comments/" + id, {
//         method: "DELETE",
//         headers: {
//             Authorization: token,
//         },
//     })
//         .then((response) => {
//             return response.json();
//         });
// }


export function addComment({ token, text, name }) {
    return fetch(host, {
        method: 'POST',
        body: JSON.stringify({
            text: text
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('"', '&quot;'),
            name: name
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('"', '&quot;'),
            //forceError: true,
        }),
        headers: {
            Authorization: token,
        },
    }).then((response) => {
        console.log(response);
        if (response.status === 201) {
            return response.json();
        } else if (response.status === 400) {
            throw new Error('name должен содержать хотя бы 3 символа');
        } else {
            throw new Error('Сервер упал');
        }
    })
}


export function loginUser({ login, password, name }) {
    return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
            name,
        }),

    }).then((response) => {
        return response.json();
    });
}

