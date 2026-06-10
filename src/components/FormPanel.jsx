import { useCV } from '../context/CVContext';

function FormPanel(){
    const { state, dispatch } = useCV();

    const handleChange = (key, value) => {
        dispatch({type: 'UPDATE_PERSONAL',
                payload: {
                    key: key,
                    value: value
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
                        value={state.personalInfo.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder='Введите фамилию, имя и отчество'
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        type="email"
                        value={state.personalInfo.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder='Введите ваш Email'
                    />
                </div>
                <div>
                    <label>Телефон</label>
                    <input 
                        type="text" 
                        value={state.personalInfo.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}    
                        placeholder='Введите номер телефона'
                    />
                </div>
                <div>
                    <label>Желаемая должность</label>
                    <input 
                        type="text" 
                        value={state.personalInfo.position}
                        onChange={(e) => handleChange('position', e.target.value)}
                    />
                </div>
            </div>
            <div>
                <h3>Опыт работы</h3>
                <div>

                </div>
            </div>
        </div>
    )
};

export default FormPanel; 