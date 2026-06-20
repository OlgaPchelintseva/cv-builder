import styles from './EducationInput.module.css';
import { useCV } from '../context/CVContext';

function EducationInput({education, onChange}){
    const { state, dispatch } = useCV();

    const handleChange = (key, value) => {
        onChange(education.id, key, value)
    }

    const handleDelete = (deleteEduId) => {
        dispatch({
            type: 'REMOVE_EDUCATION',
            payload: {deleteEduId: education.id}
        });
    }

    return(
        <div className={styles.educationBox}>
            <div className={styles.education}>
                <label>Учебное заведение</label>
                <input 
                    type="text" 
                    value={education.institution}
                    onChange={(e) => handleChange('institution', e.target.value)}
                />
            </div>
            <div className={styles.education}>
                <label>Специальность</label>
                <input 
                    type="text" 
                    value={education.degree}
                    onChange={(e) => handleChange('degree', e.target.value)}
                />
            </div>
            <div className={styles.education}>
                <label>Годы обучения</label>
                <input 
                    type="text" 
                    value={education.years}
                    onChange={(e) => handleChange('years', e.target.value)}
                />
            </div>
            <button onClick={handleDelete} className={styles.btnDelete}>Удалить</button>
        </div>
    )
}

export default EducationInput;