import { useState } from 'react'
import { CVProvider } from './context/CVContext'
import './App.css'

function App() {
  return (
    <CVProvider>
      <h1>Конструктор резюме</h1>
      <div>
        <FormPanel />
        <PreviewPanel />
      </div>
    </CVProvider> 
  )
}

export default App
