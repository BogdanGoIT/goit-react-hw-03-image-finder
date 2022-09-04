export const Button = ({onIncrement, children}) => {
    return <button type="button" onClick={onIncrement}>{children}</button>
}