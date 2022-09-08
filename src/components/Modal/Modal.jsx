import { Component } from 'react'
import css from './Modal.module.css'

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.props.handleKeyDown);
    }

    componentWillUnmount() {
      window.removeEventListener('keydown', this.props.handleKeyDown);
    }

    render() {
        const { modalBackdropClick, modalPhoto } = this.props;
        return (
            <div className={css.Overlay} onClick={modalBackdropClick}>
                <div className={css.Modal}>
                    <img src={modalPhoto} alt="" />
                </div>
            </div>
            )
    }
}