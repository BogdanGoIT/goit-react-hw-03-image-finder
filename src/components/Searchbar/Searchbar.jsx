import { Component } from "react";
import css from './Searchbar.module.css';

export class Searchbar extends Component{
    state = {
        searchName: '',
    }

    handleNameChange = evt => {
        this.setState({ searchName: evt.currentTarget.value.toLowerCase() });
    }

    handleSubmit = evt => {
        evt.preventDefault();

        if (this.state.searchName.trim() === '') {
            alert('Введите корректное имя');
            return;
        }

        this.props.onSubmit(this.state.searchName);
        this.setState({ searchName: '' });
    }

    render() {
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <span className={css.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={css.SearchFormInput}
                        type="text"
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                        value={this.state.searchName}
                        onChange={this.handleNameChange}
                    />
                </form>
            </header>
        );
    }
}