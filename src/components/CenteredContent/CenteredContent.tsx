import './CenteredContent.scss'
const CenteredContent = (props: {
    content: any
}) => {
    return (
        <div className='centered-content'>
            {props.content}
        </div>
    )
}
export default CenteredContent
