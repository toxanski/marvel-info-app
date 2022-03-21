import React from "react";
import MarvelServices from "../../services/MarvelServices";

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            personList: [],
            newItemLoading: false,
            offset: 210,
            charactersEnded: false,
        }

        this.marvelServices = new MarvelServices();
    }

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelServices.getAllCharacters(offset)
            .then(this.onCharactersLoaded);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        });
    }

    // loadCharacters = () => {
    //     this.marvelServices.getAllCharacters()
    //         .then(this.onCharactersLoaded);
    // };

    onCharactersLoaded = (newCharacters) => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }

        this.setState(({ personList, offset }) => ({
            personList: [...personList, ...newCharacters],
            newItemLoading: false,
            offset: offset + 9,
            charactersEnded: ended
        }));
    };

    render() {
        const { personList, newItemLoading, offset, charactersEnded } = this.state;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    <Character personList={personList} changePerson={this.props.onCharSelected}/>
                </ul>
                <button
                    className="button button__main button__long"
                    style={{'display': charactersEnded ? 'none' : 'block'}}
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

function Character({ personList, changePerson }) {
    return (
        personList.map(item => {
            const stylesImg = item.thumbnail.includes('image_not_available')
                ? 'alignment' : null;

            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => changePerson(item.id)}>
                    <img src={item.thumbnail} className={stylesImg} alt="abyss"/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
    );
}

export default CharList;