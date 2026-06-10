import { useCV } from '../context/CVContext';
import ExperienceInput from './ExperienceInput';

function FormPanel(){
    const { state, dispatch } = useCV();

    const handleChange = (key, value) => {
        dispatch({
            type: 'UPDATE_PERSONAL',
            payload: {
                key: key,
                value: value
            }
        })
    };

    const handleChangeExperience = (id, key, value) => {
        dispatch({
            type: 'UPDATE_EXPERIENCE',
            payload: {id, key, value}
        });
    };

    const addExperience = () => {
        dispatch({type: 'ADD_EXPERIENCE'})
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
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        type="email"
                        value={state.personalInfo.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                </div>
                <div>
                    <label>Телефон</label>
                    <input 
                        type="text" 
                        value={state.personalInfo.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}    
                    />
                </div>
                <div>
                    <label>О себе</label>
                    <textarea 
                        type="text" 
                        value={state.personalInfo.position}
                        onChange={(e) => handleChange('position', e.target.value)}
                    />
                </div>
            </div>
            <div>
                <button onClick={addExperience}>Добавить место работы</button>
                <div>
                    {state.experience.map((exp) => (
                        <ExperienceInput
                            key={exp.id}
                            experience={exp}
                            onChange={handleChangeExperience}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default FormPanel; 