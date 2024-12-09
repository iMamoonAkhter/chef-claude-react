
import Markdown from 'react-markdown'
const ClaudeRecipe = (props) => {
    console.log(props.recipeShown)
  return (
    <section className='suggested-recipe-container' aria-live='polite'>
        <h2>Chef Claude Recommends: </h2>
        <Markdown>
        {props.recipeShown}
        </Markdown>
    </section>
  )
}

export default ClaudeRecipe