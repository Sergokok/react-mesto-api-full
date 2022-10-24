import logo from '../images/logo.svg'
import {Link, Switch, BrowserRouter, Route} from "react-router-dom";

export default function Header(props) {
    return(
        <header className="header">
			<img className="header__logo" src={logo} alt="Логотип" />
            <nav className="header__nav">
                <Switch>
                    <Route exact path="/">
                        <p className="header__email">{props.email}</p>
                        <Link className="header__link" to="/sign-in" onClick={props.onSignOut}>Выйти</Link>
                    </Route>
                    <Route path="/sign-in">
                        <Link className="header__link" to="/sign-up">Регистрация</Link>
                    </Route>
                    <Route path="/sign-up">
                        <Link className="header__link" to="/sign-in">Войти</Link>
                    </Route>
                </Switch>
            </nav>
		</header>
    )
}