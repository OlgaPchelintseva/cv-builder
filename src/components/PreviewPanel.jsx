import { useState } from "react";
import { useCV } from "../context/CVContext";
import styles from "./PreviewPanel.module.css";

function PreviewPanel(){
    const { state, dispatch } = useCV();
    const themeClass = state.theme === 'classic' ? styles.classicTheme : styles.modernTheme;

    const isExperienceFilled = (exp) => {
        return exp.company.trim() !== '' && exp.role.trim() !== '' && exp.years.trim() !== '';
    };

    const filledExperience = state.experience.filter(isExperienceFilled);

    const handleTheme = (theme) => {
        dispatch({
            type: "SET_THEME",
            payload: theme
        });
    };

    

    return(
        <div className={themeClass}>
            <div>
                <p>Тема:</p>
                <button onClick={() => handleTheme('classic')}>Classic</button>
                <button onClick={() => handleTheme('modern')}>Modern</button>
            </div>
            <div>
                <h3
                    className={state.personalInfo.fullName === '' ? styles.notFilledName : ''}
                >{state.personalInfo.fullName === '' ? "Имя не указано" : state.personalInfo.fullName}</h3>
                <p>{state.personalInfo.email === '' ? " " : state.personalInfo.email}</p>
                <p>{state.personalInfo.phone === '' ? "" : state.personalInfo.phone}</p>
                <p>{state.personalInfo.position === '' ? "" : state.personalInfo.position}</p>
            </div>
            
            {filledExperience.length > 0 && (
                <div>
                    <h4>Опыт работы</h4>
                    {filledExperience.map((exp) => (
                        <div key={exp.id}>
                            {exp.company && <p>Компания: {exp.company}</p>}
                            {exp.role && <p>Должность: {exp.role}</p>}
                            {exp.years && <p>Период работы: {exp.years}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PreviewPanel;