import {Component} from "react";
import { PropTypes } from 'prop-types';
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
    const comicsTitle = comics.length ? <div className="char__comics">Comics:</div> : '';
    const stylesImg = thumbnail.includes('image_not_available')
        ? 'alignment' : null;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} className={stylesImg}/>
                <div>
                    <div className="char__info-name">{name}</div>
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
            {comicsTitle}
            <ul className="char__comics-list">
                {
                    comics.map((item, i) => {
                        if (i > 9) return;
                        return <li key={i} className="char__comics-item">{item.name}</li>
                    })
                }
            </ul>
        </>
    );
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;