import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({ imagesHits, toggleModal }) => {
    console.log(imagesHits);
    return (
        imagesHits.map(image =>
            <li key={image.id} className={css.ImageGalleryItem}>
                <img className={css.ImageGalleryItemImage} src={image.webformatURL} alt={image.tags} onClick={() => toggleModal(image.largeImageURL)}/>
            </li>
        )
    )
}