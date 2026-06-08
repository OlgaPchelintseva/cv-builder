import { useCV } from './context/CVContext';

function FormPanel(){
    const { state, dispatch } = useCV();

    const handelChange = (key, value) => {
        dispatch({type: 'UPDATE_PERSONAL',
                payload: {
                    key: 'fullName',
                    value: e.target.value
                }
        })
    };

    return(
        <div>
            <div>
                <h3>Личная информация</h3>
                <div>
                    <label>ФИО</label>
                    <input 
                        type="text"
                    />
                </div>
            </div>
        </div>
    )
};

export default FormPanel;