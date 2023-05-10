

import { loginUser } from "../api.js";

export function renderLogin({ appElement, setToken, getFetch }) {
    const appHtml = `
    <div class="container">
    <h1>Лента комментариев</h1>

 <div class="add-form">
      <h3>Форма входа</h3>
      <input type="text" class="add-form-login" placeholder="Введите логин" id="login-input"/>
      <br />
      <input type="password" class="add-form-login" placeholder="Введите пароль" id="password-input"/>

      <div class="add-form2">
        <button class="add-form-button1" id="login-button">Войти</button>
      </div>
    </div>


  </div>`

    appElement.innerHTML = appHtml;   //кладем сюда разметку 
    document.getElementById("login-button").addEventListener('click', () => {
        //    token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
        //renderAppComments (); 
        //setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k")
        loginUser({
            login: "admin",
            password: "admin",
        }).then((user) => {
            setToken(`Bearer ${user.user.token}`)
            getFetch();
        });

        
    });
}