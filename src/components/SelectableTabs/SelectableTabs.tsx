import './SelectableTabs.scss'

const TabOption = (props: {
    name: string,
    selected: boolean,
    selectAction: () => void
}) => {
    return <div className={'tab-option ' + (props.selected && 'selected') } onClick={props.selectAction}>
        {props.name}
    </div>
}

const SelectableTabs = (props: {
    options: any[],
    active?: any,
    selectAction: (item: any) => void,
    description?: string
}) => {
    return (
        <div className='selectable-tabs'>
            {props.description && <div className='tab-description'>{props.description}</div>}
            {props.options.map((option: any) =>
                <TabOption name={option.toString()}
                           selected={option === props.active}
                           selectAction={() => props.selectAction(option)} key={option.toString()} />)}
        </div>
    )
}
export default SelectableTabs
