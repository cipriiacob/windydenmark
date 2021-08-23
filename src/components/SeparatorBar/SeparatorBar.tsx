import './SeparatorBar.scss'

const SeparatorBar = (props: {
    name: string,
    after?: any
}) => {
    return (
        <div className='separator-bar-main'>
            <div className='separator-bar'>{props.name}</div>
            {props.after}
        </div>
    )

}
export default SeparatorBar;
