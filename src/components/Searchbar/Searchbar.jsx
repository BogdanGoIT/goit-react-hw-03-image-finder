import { Component } from "react";

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
            <header className="searchbar">
                <form className="form" onSubmit={this.handleSubmit}>
                    <button type="submit" className="button">
                        <span className="button-label">Search</span>
                    </button>

                    <input
                        className="input"
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