import './ConfirmationModal.scss';
import Button from "../Button/Button";
import { ReactComponent as Cancel } from "../../assets/cancel-hollow.svg";

const ConfirmationModal = (props: any) => {
    return (
        <div className='confirmation-modal' onClick={props.cancel}>
            <div className='modal-content' onClick={() => null}>
                <div className='top-bar'>
                    <Cancel className='close-button' onClick={props.cancel}></Cancel>
                </div>
                <div className='message'>{props.message}</div>
                <div className='action-buttons'>
                    <Button onClick={props.confirm} type='destructive'>Confirm</Button>
                    <Button onClick={props.cancel}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
