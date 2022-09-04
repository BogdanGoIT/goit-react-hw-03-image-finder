import { Component } from "react";

import { Button } from "components/Button/Button";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Loader } from "components/Loader/Loader";

import galeryAPI from '../../services/galery-api';


export class ImageGallery extends Component{

    state = {
        imagesHits: [],
        error: null,
        status: 'idle',
        page: 1,
    }

    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.searchName;
        const nextName = this.props.searchName;
        const { page } = this.state;



        if (prevName !== nextName || prevState.page !== page) {
            
        if (prevName !== nextName) {
            this.setState({
                page: 1, 
                imagesHits: [],
                status: 'pending',
            });
        }

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
            page: prevState.page + 1
        }))
    }

        toggleModal = () => {
            this.setState(({ showModal }) => ({
            showModal: !showModal
            }))
  }

    render() {
        const { imagesHits, error, status } = this.state;

        if (status === 'pending') {
            return <Loader />
        }

        if (status === 'rejected') {
            return <h1>{error.message}</h1>
        }

        if (status === 'resolved') {
            return (
                <div>
                    <ul className="gallery">
                        <ImageGalleryItem imagesHits={imagesHits} />
                    </ul> 
                    {imagesHits.length > 0 && <Button onIncrement={this.handleIncrement} >Load more</Button>}
                </div>    
            )
        }

    }
}