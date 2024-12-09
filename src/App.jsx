import './App.css'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import PadContainer from './components/Pad-Container/PadContainer'

function App({darkMode}) {
  
  return (
    <>
      <Header />
      <Main />
      {/* <PadContainer darkMode={darkMode} /> */}
    </>
  )
}

export default App
