import css from './Button.module.css';

export const Button = ({ onIncrement, children }) => {
    return <button className={css.Button} type="button" onClick={onIncrement}>{children}</button>
}