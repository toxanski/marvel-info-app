import {Component} from "react";
import MarvelServices from "../../services/MarvelServices";
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';


class CharInfo extends Component {
    state = {
        character: null,
        loading: false,
        error: false
    }

    marvelServices = new MarvelServices();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        this.props.charId !== prevProps.charId && this.updateChar();
    }

    updateChar() {
        const { charId } = this.props;
        if (!charId) {
            return;
        }
        this.onCharLoading();
        this.marvelServices
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onCharLoaded = (res) => {
        this.setState({
            character: res,
            loading: false,
        })
    }

    render() {
        const { character, loading, error } = this.state;

        const skeleton = character || loading || error ? null : <Skeleton />;
        const spinnerContent = loading ? <Spinner/> : null;
        const errorContent = error ? <ErrorMessage/> : null;
        const content = !(!character || loading || error) ? <View char={this.state.character}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {spinnerContent}
                {errorContent}
                {content}
            </div>
        )
    }
}

function View({ char }) {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.map((item, i) => <li key={i} className="char__comics-item">{item.name}</li>)
                }
            </ul>
        </>
    );
}

export default CharInfo;