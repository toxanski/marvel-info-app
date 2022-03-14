import { Component } from "react";
import MarvelServices from "../../services/MarvelServices";

import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './randomChar.scss';

class RandomChar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            character: {
                name: null,
                description: null,
                thumbnail: null,
                homepage: null,
                wiki: null
            },
            loading: true,
            error: false,
        }

        this.updateCharacter = this.updateCharacter.bind(this);
        this.onCharacterLoaded = this.onCharacterLoaded.bind(this);

        this.marvelServices = new MarvelServices();
    }

    componentDidMount() {
        this.updateCharacter();
    }

    /**
     * Действие после загрузки персонажа
     * @param { Object } randomChar
     */
    onCharacterLoaded(randomChar) {
        this.setState(({ character, loading }) => {
            return {
                character: randomChar,
                loading: false
            };
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    loadNextCharacter = (e) => {
        this.setState({
            loading: true,
            error: false
        })
        this.updateCharacter();
    }

    updateCharacter() {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        this.marvelServices.getCharacter(id)
            .then(this.onCharacterLoaded)
            .catch(this.onError);
    }

    render() {
        const { character, loading, error } = this.state;

        const errorContent = error ? <ErrorMessage/> : null;
        const spinnerContent = loading ? <Spinner/> : null;
        const randomCharacterContent = !(spinnerContent || errorContent)
            ? <View character={character} />
            : null;

        return (
            <div className="randomchar">
                { errorContent }
                { spinnerContent }
                { randomCharacterContent }

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button
                        className="button button__main"
                        onClick={this.loadNextCharacter}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

function CharacterThumbnail({thumbnail}) {
    if (thumbnail.includes('image_not_available')) {
        return (<img
            src={thumbnail}
            style={{objectFit: "contain"}}
            alt="Random character"
            className="randomchar__img"/>);
    }
    return  <img src={thumbnail} style={{objectFit: "contain"}} alt="Random character" className="randomchar__img"/>
}

function View({ character }) {
    const { name, description, thumbnail, homepage, wiki } = character;
    console.log(character)


    return (
        <div className="randomchar__block">
            <CharacterThumbnail thumbnail={thumbnail} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main" target="_blank">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary" target="_blank">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomChar;