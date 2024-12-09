import React from 'react'

const Pad = (props) => {
    const [on, setOn] = React.useState(props.on);
    function togglee(){
        setOn(prevOn => !prevOn);
    }
  return (
    <button style={{backgroundColor: props.color}} className={props.on ? `padButton on`: "padButton"} onClick={() => props.toggle(props.id)}>Hello</button>
  )
}

export default Pad