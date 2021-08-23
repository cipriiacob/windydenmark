import './Button.scss'

function getClass (type: string) {
    let baseClass = 'button-style ';
    switch (type) {
        case 'destructive':
            return baseClass + 'destructive'
        default:
            return baseClass + 'default'
    }
}
const Button = (props: any) => {
    return (
        <button className={getClass(props.type)} onClick={props.onClick}>{props.children}</button>
    )
}
export default Button
