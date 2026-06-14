import { useState } from 'react'
import { CVProvider } from './context/CVContext'
import FormPanel from './components/FormPanel'
import PreviewPanel from './components/PreviewPanel'
import styles from './App.module.css'

function App() {
  return (
    <CVProvider>
      <h1>Конструктор резюме</h1>
      <div className={styles.container}>
        <FormPanel />
        <PreviewPanel />
      </div>
    </CVProvider> 
  )
}

export default App
