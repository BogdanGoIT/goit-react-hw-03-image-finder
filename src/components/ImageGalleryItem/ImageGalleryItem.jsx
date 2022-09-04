export const ImageGalleryItem = ({ imagesHits, toggleModal }) => {
    console.log(imagesHits);
    return (
        imagesHits.map(image =>
            <li key={image.id} className="gallery-item">
                <img src={image.webformatURL} alt={image.tags} width="250" onClick={() => toggleModal(image.largeImageURL)}/>
            </li>
        )
    )
}