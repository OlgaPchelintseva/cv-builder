import React, { useState, useContext, createContext, useReducer, useEffect } from "react";

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
        experience: [{id: '1', company: '', role: '', years: ''}],
        theme: 'classic',
        education: [{id: '1', institution: '', degree: '', years: ''}]
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
        case 'REMOVE_EXPERIENCE':
            const {deleteId} = action.payload;
            return {
                ...state,
                experience: state.experience.filter(exp => exp.id !== deleteId)
            };
        case 'ADD_EDUCATION':
            const newEduID = Date.now().toString();
            return{
                ...state,
                education: [
                    ...state.education,
                    {
                        id: newEduID,
                        institution: '',
                        degree: '',
                        years: ''
                    }
                ]
            };
        case 'UPDATE_EDUCATION':
            const {eduId, eduKey, eduValue} = action.payload;
            return {
                ...state,
                education: state.education.map(item => item.id === eduId ? {...item, [eduKey]: eduValue} : item)
            };
        case 'REMOVE_EDUCATION':
            const {deleteEduId} = action.payload;
            return {
                ...state,
                education: state.education.filter(edu => edu.id !== deleteEduId)
            };
        default:
            return state;
    }
};


export function CVProvider({children}){
    const [state, dispatch] = useReducer(cvReduser, initialState());

    useEffect(() => {
        localStorage.setItem('cv_data', JSON.stringify(state));
    }, [state])

    return(
        <CVContext.Provider value={{state, dispatch}}>
            {children}
        </CVContext.Provider>
    );
};

export function useCV(){
    return useContext(CVContext)
};