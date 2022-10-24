import React from "react";
import { Link, withRouter } from "react-router-dom";

function Register(props) {
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
        props.onRegister(email, password);
        setEmail("");
        setPassword("");
    }

    return (
        <section className="auth">
            <div className="auth__container">
                <h1 className="auth__title">Регистрация</h1>
                <form 
                    className="auth__form"
                    name="register"
                    id="register-form" 
                    onSubmit={handleSubmit}>
                    <input
                        id="email-input"
                        className="auth__input" 
                        type="email" 
                        name="email" 
                        placeholder="Email"
                        defaultValue={email || ''}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        className="auth__input" 
                        type="password" 
                        name="password" 
                        placeholder="Пароль"
                        defaultValue={password || ''}
                        onChange={handleChange}
                        required
                    />
                    <button className="auth__submit-button" type="submit">Зарегистрироваться</button>
                </form>
                <Link className="auth__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
            </div>
        </section>
    )
}

export default withRouter(Register);