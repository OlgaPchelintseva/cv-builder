import { useCV } from '../context/CVContext';
import ExperienceInput from './ExperienceInput';
import EducationInput from './EducationInput';
import styles from './FormPanel.module.css';

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

    const handleChangeEducation = (eduId, eduKey, eduValue) => {
        dispatch({
            type: 'UPDATE_EDUCATION',
            payload: {eduId, eduKey, eduValue}
        });
    };

    const addEducation = () => {
        dispatch({type: 'ADD_EDUCATION'})
    };

    const calculateProgress = () => {
        let progressCount = 0;

        if (state.personalInfo.fullName && state.personalInfo.email && state.personalInfo.phone && state.personalInfo.position){
            progressCount += 25;
        }
        if (state.personalInfo.email || state.personalInfo.phone){
            progressCount += 25;
        }

        const isExperienceFilled = (exp) => {
        return exp.company.trim() !== '' && exp.role.trim() !== '' && exp.years.trim() !== '';
        };
        const filledExperience = state.experience.filter(isExperienceFilled);
        if (filledExperience.length > 0){
            progressCount += 25;
        }

        const isEducationFilled = (edu) => {
            return edu.institution.trim() !== '' && edu.degree.trim() !== '' && edu.years.trim() !== '';
        };
        const filledEducation = state.education.filter(isEducationFilled);
        if (filledEducation.length > 0){
            progressCount += 25;
        }

        return Math.min(progressCount, 100);
    }

    const progress = calculateProgress();


    return(
        <div className={styles.formPanelContainer}>
            <h4>Индикатор заполненности резюме</h4>
            <div className={styles.progressBarBox}>
                <div style={{width: `${progress}%`, background: '#E9B1A3'}} className={styles.progressBar}></div>
                <p>Заполнено: {progress}%</p>
            </div>
            <div>
                <h3>Личная информация</h3>
                <div className={styles.info}>
                    <label>ФИО</label>
                    <input 
                        type="text"
                        value={state.personalInfo.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                    />
                </div>
                <div className={styles.info}>
                    <label>Email</label>
                    <input 
                        type="email"
                        value={state.personalInfo.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                </div>
                <div className={styles.info}>
                    <label>Телефон</label>
                    <input 
                        type="text" 
                        value={state.personalInfo.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}    
                    />
                </div>
                <div className={styles.info}>
                    <label>О себе</label>
                    <textarea 
                        type="text" 
                        value={state.personalInfo.position}
                        onChange={(e) => handleChange('position', e.target.value)}
                    />
                </div>
            </div>
            <div>
                <div>
                    <h3>Опыт работы</h3>
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
                <button onClick={addExperience} className={styles.btnExp}>Добавить место работы</button>
            </div>
            <div>
                <div>
                    <h3>Образование</h3>
                    <div>
                        {state.education.map((edu) => (
                            <EducationInput 
                                key={edu.id}
                                education={edu}
                                onChange={handleChangeEducation}
                            />
                        ))}
                    </div>
                </div>
                <button onClick={addEducation} className={styles.btnExp}>Добавить учебное заведение</button>
            </div>
        </div>
    )
};

export default FormPanel; 