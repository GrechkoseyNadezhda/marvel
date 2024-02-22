import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.getCaractersList();
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };

    getCaractersList = () => {
        this.marvelService
            .getAllCharacters()
            .then((res) => {
                this.setState({ chars: res, loading: false });
                console.log(this.state.chars);
            })
            .catch(this.onError);
    };

    render() {
        const { chars, error, loading } = this.state;
        return (
            <>
                {error ? (
                    <ErrorMessage />
                ) : (
                    <div className="char__list">
                        {loading ? (
                            <Spinner />
                        ) : (
                            <ul className="char__grid">
                                {chars.map((char) => {
                                    return (
                                        <li
                                            key={char.id}
                                            className="char__item char__item_selected"
                                        >
                                            <img
                                                src={char.thumbnail}
                                                alt="abyss"
                                            />
                                            <div className="char__name">
                                                {char.name}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        <button className="button button__main button__long">
                            <div className="inner">load more</div>
                        </button>
                    </div>
                )}
            </>
        );
    }
}

export default CharList;
