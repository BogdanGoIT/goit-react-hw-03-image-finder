import css from './Modal.module.css'

export const Modal = ({modalPhoto, modalBackdropClick}) => {
    return (
        <div className={css.Overlay} onClick={modalBackdropClick}>
            <div className={css.Modal}>
                <img src={modalPhoto} alt="" />
            </div>
        </div>
    )
}