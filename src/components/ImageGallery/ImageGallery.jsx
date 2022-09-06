import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ items, toggleModal }) => {
    return (
        <ul className={css.ImageGallery}>
            {items.map(image =>
                <li key={image.id} className={css.ImageGalleryItem}>
                    <ImageGalleryItem item={image} onSelect={toggleModal} />
                </li>
            )}
        </ul>
    )
}