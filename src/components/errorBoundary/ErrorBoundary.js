import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

// Предохранитель НЕ ловит ошибки:
//     1) обработчиков событий ( события происходят вне render() )
//     2) ассинхронного кода
//     3) самого компонента Предохранителя
//     4) SSR

// Ловит ошибки:
//     1) при запуске render()
//     2) в методах жизненного цикла
//     3) в конструкторах дочерних компонентов

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    // static getDerivedStateFromError() {
    //     return { error: true };
    // }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({ error: true });
    }

    render() {
        console.log(this.state.error)
        if (this.state.error) {
           return <ErrorMessage/>
        }
        return this.props.children
    }
}

export default ErrorBoundary;