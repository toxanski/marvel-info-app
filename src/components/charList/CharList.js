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

        // TODO: возможнна пробелма в фетче самом
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
        console.log(res)
        this.setState(({personList}) => {
            return {
                personList: res
            }
        });
    };

    render() {
        // const { personList } = this.state;

        return (
            <div className="char__list">
                <Characters personList={this.state.personList}/>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

function Characters({ personList }) {
    // const { name, thumbnail } = personList;
    console.log(personList)

    return (
        <ul className="char__grid">
            {
                personList.forEach((item, i) => {
                    return (
                        <li className="char__item">
                            <img src={item.thumbnail} alt="abyss"/>
                            <div className="char__name">{item.name}</div>
                        </li>
                    )
                })
            }
        </ul>
    );
}

export default CharList;