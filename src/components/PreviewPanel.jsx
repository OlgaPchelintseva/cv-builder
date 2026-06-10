import { useCV } from "../context/CVContext";

function PreviewPanel(){
    const { state } = useCV();

    return(
        <>
            <div>
                <h3>{state.personalInfo.fullName === '' ? "Имя не указано" : state.personalInfo.fullName}</h3>
                <p>{state.personalInfo.email === '' ? "Email не указан" : state.personalInfo.email}</p>
                <p>{state.personalInfo.phone === '' ? "Номер телефона не указан" : state.personalInfo.phone}</p>
                <p>{state.personalInfo.position === '' ? "Информация о себе не указана" : state.personalInfo.position}</p>
            </div>

            
        </>
    );
};

export default PreviewPanel;