import React from "react";
import MarvelServices from "../../services/MarvelServices";

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            personList: []
        }

        this.marvelServices = new MarvelServices();
    }

    componentDidMount() {
        this.loadCharacters();
    }

    loadCharacters = () => {
        this.marvelServices.getAllCharacters()
            .then(this.onCharactersLoaded);
    };

    onCharactersLoaded = (res) => {
        this.setState(({personList}) => {
            return {
                personList: res
            }
        });
    };

    render() {
        const { personList } = this.state;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    <Character personList={personList} changePerson={this.props.onCharSelected}/>
                </ul>
                <button className="button button__main button__long">
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