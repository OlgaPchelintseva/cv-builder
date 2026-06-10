import React, { useState, useContext, createContext, useReducer } from "react";

const CVContext = createContext();

const initialState = () => {
    try{
        const resume = localStorage.getItem('cv_data');
        if (resume) return JSON.parse(resume);
    }
    catch(error){
        console.log(`Возникла ошибка ${error}`)
    }
    return {
        personalInfo: {fullName: '', email: '', phone: '', position: ''},
        experience: [{id: 1, company: '', role: '', years: ''}],
        theme: 'classic'
    };
};

function cvReduser(state, action){
    switch (action.type) {
        case 'UPDATE_PERSONAL':
            return {
                ...state,
                personalInfo: {
                    ...state.personalInfo,
                    [action.payload.key]: action.payload.value
                }
            };
        case 'ADD_EXPERIENCE':
            const newID = Date.now().toString();
            return{
                ...state,
                experience: [
                    ...state.experience, 
                    {
                        id: newID,
                        company: '',
                        role: '',
                        years: ''
                    }
                ] 
            };
        case 'UPDATE_EXPERIENCE':
            const {id, key, value} = action.payload;
            return {
                ...state,
                experience: state.experience.map(item => item.id === id ? {...item, [key]: value} : item)
                // experience: state.experience.map(item => item.id === id ? {...item, ...updatedFields} : item)
            };
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload
            };
        default:
            return state;
    }
};

export function CVProvider({children}){
    const [state, dispatch] = useReducer(cvReduser, initialState());


    return(
        <CVContext.Provider value={{state, dispatch}}>
            {children}
        </CVContext.Provider>
    );
};

export function useCV(){
    return useContext(CVContext)
};