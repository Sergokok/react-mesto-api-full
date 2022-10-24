import React from "react";
import { Link, withRouter } from "react-router-dom";

export function Login(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleChange(event) {
        if (event.target.id === 'email-input') {
            setEmail(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onLogin(email, password);
        setEmail("");
        setPassword("");
    }

    return (
        <section className="auth">
            <div className="auth__container">
                <h1 className="auth__title">Вход</h1>
                <form 
                    className="auth__form" 
                    name="login"
                    id="login-form" 
                    onSubmit={handleSubmit}>
                    <input
                        id="email-input"
                        className="auth__input" 
                        type="email" 
                        name="email" 
                        placeholder="Введите email"
                        defaultValue={email || ''}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        className="auth__input" 
                        type="password" 
                        name="password" 
                        placeholder="Введите пароль"
                        defaultValue={password || ''}
                        onChange={handleChange}
                        required
                    />
                    <button className="auth__submit-button" type="submit">Войти</button>
                </form>
            </div>
        </section>
    )
}

export default withRouter(Login);