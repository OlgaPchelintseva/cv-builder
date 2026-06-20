import { useState, useRef } from "react";
import { useCV } from "../context/CVContext";
import styles from "./PreviewPanel.module.css";
import "../index.css"


function PreviewPanel(){
    const { state, dispatch } = useCV();
    const themeClass = state.theme === 'classic' ? styles.classicTheme : styles.modernTheme;

    const isExperienceFilled = (exp) => {
        return exp.company.trim() !== '' && exp.role.trim() !== '' && exp.years.trim() !== '';
    };

    const filledExperience = state.experience.filter(isExperienceFilled);

    const isEducationFilled = (edu) => {
        return edu.institution.trim() !== '' && edu.degree.trim() !== '' && edu.years.trim() !== '';
    };

    const filledEducation = state.education.filter(isEducationFilled);

    const handleTheme = (theme) => {
        dispatch({
            type: "SET_THEME",
            payload: theme
        });
    };

    const previewRef = useRef(null);
    
    const handlePrint = () => {
        if (previewRef.current){
            previewRef.current.classList.add('previewToPrint');
            window.print();
            previewRef.current.classList.remove('previewToPrint');
        };
    };

    return(
        <div className={`${themeClass} ${styles.previewPanelContainer}`}>
            <div className={styles.btnBox}>
                <div className={styles.btnThemeBox}>
                    <p>Тема: </p>
                    <button onClick={() => handleTheme('classic')} className={state.theme === 'classic' ? styles.btnClickStyle : styles.btnTheme}>Classic</button>
                    <button onClick={() => handleTheme('modern')} className={state.theme === 'modern' ? styles.btnClickStyle : styles.btnTheme}>Modern</button>
                </div>
                <button onClick={handlePrint} className={styles.btnPrint}>Распечатать резюме / Сохранить в PDF</button>
            </div>
            <div ref={previewRef}>
                <div className={styles.info}>
                    <h3
                        className={state.personalInfo.fullName === '' ? styles.notFilledName : ''}
                    >{state.personalInfo.fullName === '' ? "Имя не указано" : state.personalInfo.fullName}</h3>
                    <p>{state.personalInfo.email === '' ? "" : `Email: ${state.personalInfo.email}`}</p>
                    <p>{state.personalInfo.phone === '' ? "" : `Телефон: ${state.personalInfo.phone}`}</p>
                    <p className={styles.infoPosition}>{state.personalInfo.position === '' ? "" : state.personalInfo.position}</p>
                </div>
                
                {filledExperience.length > 0 && (
                    <div>
                        <h4>Опыт работы</h4>
                        {filledExperience.map((exp) => (
                            <div key={exp.id} className={styles.experience}>
                                {exp.company && <p>Компания: {exp.company}</p>}
                                {exp.role && <p>Должность: {exp.role}</p>}
                                {exp.years && <p>Период работы: {exp.years}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {filledEducation.length > 0 && (
                    <div>
                        <h4>Образование</h4>
                        {filledEducation.map((edu) => (
                            <div key={edu.id} className={styles.experience}>
                                {edu.institution && <p>Учебное заведение: {edu.institution}</p>}
                                {edu.degree && <p>Специальность: {edu.degree}</p>}
                                {edu.years && <p>Годы обучения: {edu.years}</p>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PreviewPanel;