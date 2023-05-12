import { loginUser } from "../api.js"
import { getFetch } from "../main.js"



export function renderAuthForm({ appElement}) {
    appElement.innerHTML = ` 
<div class="container">
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


    document.getElementById("login-button").addEventListener('click', () => {
        loginUser({
            login: "admin",
            password: "admin",
        }).then((user) => {
            getFetch(`Bearer ${user.user.token}`, user.user.name);
        });


    });
}