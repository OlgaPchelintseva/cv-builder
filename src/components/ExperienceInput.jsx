function ExperienceInput({experience, onChange}){
    const handleChange = (key, value) => {
        onChange(experience.id, key, value)
    }

    return(
        <div>
            <h3>Опыт работы</h3>
            <div>
                <label>Компания</label>
                <input 
                    type="text"
                    value={experience.company}    
                    onChange={(e) => handleChange('company', e.target.value)}
                />
            </div>
            <div>
                <label>Должность</label>
                <input 
                    type="text" 
                    value={experience.role}
                    onChange={(e) => handleChange('role', e.target.value)}  
                />
            </div>
            <div>
                <label>Период работы</label>
                <input 
                    type="text" 
                    value={experience.years}
                    onChange={(e) => handleChange('years', e.target.value)}   
                />
            </div>
        </div>
    );
};

export default ExperienceInput;