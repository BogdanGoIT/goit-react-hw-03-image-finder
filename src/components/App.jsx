import { Component } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Button } from "components/Button/Button";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Loader } from "components/Loader/Loader";
import { Modal } from "./Modal/Modal";

import galeryAPI from '../services/galery-api';

import './styles.css';


export class App extends Component {
  state = {
    searchName: '',
    imagesHits: [],
    error: null,
    status: 'idle',
    page: 1,
    showModal: false,
  }


  componentDidUpdate(prevProps, prevState) {
        const prevName = prevState.searchName;
        const nextName = this.state.searchName;
        const { page } = this.state;

        if (prevName !== nextName || prevState.page !== page) {

            galeryAPI.fetchGalery(nextName, page)
                .then(imagesHits => this.setState(state => ({
                    imagesHits: [...state.imagesHits, ...imagesHits.hits],
                    status: 'resolved',
                })))
                .catch(error => this.setState({ error, status: 'rejected' }))   
        }

    }

  handleIncrement = () => {

      this.setState(prevState => ({
        page: prevState.page + 1,
      }))
    
        
    }

  toggleModal = () => {

    
    this.setState(({ showModal }) => ({
    showModal: !showModal
    }))

    
  }

  handleFormSubmit = searchName => {
    this.setState({
      searchName,
      page: 1,
      imagesHits: [],
      status: 'pending',
    });
  }

  render() {
       const { imagesHits, error, status, showModal } = this.state;

        if (status === 'pending') {
            return <Loader />
        }

        if (status === 'rejected') {
            return <h1>{error.message}</h1>
        }


    
    return (
      <main className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchName={this.state.searchName} >
          <ImageGalleryItem imagesHits={imagesHits} />
          {imagesHits.length > 0 && <Button onIncrement={this.handleIncrement} >Load more</Button>}
        </ImageGallery>
        {showModal && <Modal />}
      </main>
    );
  }
};
