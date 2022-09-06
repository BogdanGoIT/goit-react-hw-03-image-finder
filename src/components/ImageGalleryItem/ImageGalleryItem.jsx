import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({ item, onSelect }) => {

    return (
            <img
                className={css.ImageGalleryItemImage}
                src={item.webformatURL} alt={item.tags}
                onClick={() => onSelect(item.largeImageURL)}
            />
    )
}