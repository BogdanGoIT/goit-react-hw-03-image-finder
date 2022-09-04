import { Component } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import './styles.css';

export class App extends Component {
  state = {
    searchName: '',
    
  }

  handleFormSubmit = searchName => {
    this.setState({ searchName });
  }



  render() {
    
    return (
      <main className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchName={this.state.searchName} />
      </main>
    );
  }
};
