import styles from './ExperienceInput.module.css';
import { useCV } from '../context/CVContext';

function ExperienceInput({experience, onChange}){
    const { state, dispatch } = useCV();

    const handleChange = (key, value) => {
        onChange(experience.id, key, value)
    }

    const handleDelete = (deleteId) => {
        dispatch({
            type: 'REMOVE_EXPERIENCE',
            payload: {deleteId: experience.id}
        });
    }

    return(
        <div className={styles.experienceBox}>
            <div className={styles.experience}>
                <label>Компания</label>
                <input 
                    type="text"
                    value={experience.company}    
                    onChange={(e) => handleChange('company', e.target.value)}
                />
            </div>
            <div className={styles.experience}>
                <label>Должность</label>
                <input 
                    type="text" 
                    value={experience.role}
                    onChange={(e) => handleChange('role', e.target.value)}  
                />
            </div>
            <div className={styles.experience}>
                <label>Период работы</label>
                <input 
                    type="text" 
                    value={experience.years}
                    onChange={(e) => handleChange('years', e.target.value)}   
                />
            </div>
            <button onClick={handleDelete} className={styles.btnDelete}>Удалить</button>
        </div>
    );
};

export default ExperienceInput;