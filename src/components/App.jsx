import { Component } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { Modal } from "./Modal/Modal";

import galeryAPI from '../services/galery-api';

export class App extends Component {
  state = {
    searchName: '',
    imagesHits: [],
    error: null,
    status: 'idle',
    page: 1,
    showModal: false,
    modalPhoto: null,
  }



  componentDidUpdate(prevProps, prevState) {
        const prevName = prevState.searchName;
        const nextName = this.state.searchName;
        const { page } = this.state;


        if (prevName !== nextName || prevState.page !== page) {
          this.setState({ status: 'pending' });
            galeryAPI.fetchGalery(nextName, page)
                .then(imagesHits => this.setState(state => ({
                    imagesHits: [...state.imagesHits, ...imagesHits.hits],
                    status: 'resolved',
                })))
                .catch(error => this.setState({ error, status: 'rejected' }))   
        }

  }
  
  handleKeyDown = e => {
      if (e.code === 'Escape') {
        console.log('Нажали ESC, нужно закрыть модалку');

        this.toggleModal();
     }

  }

  handleIncrement = () => {
      this.setState(prevState => ({
        page: prevState.page + 1,
      }))  
    }



  handleFormSubmit = searchName => {
    this.setState({
      searchName,
      page: 1,
      imagesHits: [],
    });
  }

  toggleModal = (modalPhoto) => {
    this.setState(({ showModal }) => ({
    showModal: !showModal
    }))

    this.setState({modalPhoto})
  }

  modalBackdropClick = evt => {
    // console.log('кликнули в бекдроп');

    // console.log('evt.CurrentTarget ', evt.currentTarget);
    // console.log('evt.Target ', evt.target);

    if (evt.currentTarget === evt.target) {
      this.toggleModal();
    }

  }

  render() {
       const { imagesHits, error, status, showModal, modalPhoto } = this.state;
    
    return (
      <main className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery items={imagesHits} toggleModal={this.toggleModal} />
        {imagesHits.length > 0 && status !== 'pending' && <Button onIncrement={this.handleIncrement} >Load more</Button>}
        {status === 'pending' && <Loader />}
        {status === 'rejected' &&  <h1>{error.message}</h1>}
        {showModal && <Modal modalPhoto={modalPhoto} modalBackdropClick={this.modalBackdropClick} handleKeyDown={this.handleKeyDown} />}
      </main>
    );
  }
};
