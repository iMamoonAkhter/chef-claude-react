import React from "react"
import padData from "../../pads"
import Pad from "./Pad";

const PadContainer = ({darkMode}) => {
    const [pads, setPad] = React.useState(padData);
    const styles ={
        backgroundColor: darkMode ? "#222222" : "#cccccc",
        color: !darkMode ? "#222222" : "#cccccc"
    }
    function toggle(id){
      setPad(prevPad => prevPad.map(item => {
        if(item.id === id){
          return {...item, on: !item.on};
        }
        return item;
      }))
    }
    const buttonElements = pads.map(pad => (
        <Pad toggle={toggle} id={pad.id} key={pad.id} color={pad.color} on={pad.on} />
    ))
  return (
    <main>
        <div className="pad-container">
        {buttonElements}
        </div>
    </main>
  )
}

export default PadContainer