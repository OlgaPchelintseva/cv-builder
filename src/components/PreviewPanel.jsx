import { useState, useRef } from "react";
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

    // const btnClickStyle = {
    //     backgroundColor: '#e0f9ffd1',
    //     color: '#2F435A'
    // };

    const previewRef = useRef(null);
    
    const handlePrint = () => {
        const printWindow = window.open('', '_blank', 'height=800, width=1000');
        if (previewRef.current){
            previewRef.current.classList.add('preview-to-print');

            const printContent = previewRef.current.innerHTML;
            const themeClassName = state.theme === 'classic' ? styles.classicTheme : styles.modernTheme;

            const printStyles = `
                <style>
                    .classicTheme{
                        background-color: #E9B1A3;
                        color: #2F435A;
                    }

                    .modernTheme{
                        background-color: #2F435A;
                        color: #E9B1A3;
                    }
                        
                </style>
            `
            
            printWindow.document.write(`
                    <html>
                        <head>
                            <title>Резюме</title>
                            ${printStyles}
                        </head>
                        <body>
                            <div class="${themeClassName}">
                                ${printContent}
                            </div>
                        </body>
                    </html>
                `)
            printWindow.document.close();
            printWindow.focus();

            printWindow.onload = () => {
                printWindow.print();

                setTimeout(() => {
                    if (previewRef.current){
                        previewRef.current.classList.remove('preview-to-print');
                    }
                    printWindow.close();
                }, 1000);
            };
        } else {
            printWindow.close();
        }
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
                    <p>{state.personalInfo.email === '' ? " " : `Email: ${state.personalInfo.email}`}</p>
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
            </div>
        </div>
    );
};

export default PreviewPanel;