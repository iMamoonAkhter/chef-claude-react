import React from "react";
import ClaudeRecipe from "../ClaudeRecipe";
import IngredientsList from "../ingredientsList";
import { TailSpin } from "react-loader-spinner";

const Main = () => {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipeShown, setRecipeShown] = React.useState("");
    const [spin, setSpin] = React.useState(false);
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAKLDpMq-d8hI56G33GPLNF2MQtSFp7LmA";

  // Function to get recipe from Gemini API
  async function getRecipe() {
    setSpin(true);
    const ingredientsString = ingredients.join(", ");
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page. I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`
            }
          ]
        }
      ]
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const generatedRecipe = data.candidates?.[0]?.content?.parts?.[0]?.text || "No recipe found.";
      setSpin(false);
      setRecipeShown(generatedRecipe);
    } catch (error) {
      console.error("Error fetching recipe:", error.message);
      setRecipeShown("Sorry, we couldn't fetch a recipe at this time.");
    }
  }

  const ingredientsListItems = ingredients.map((i) => (
    <li key={i}>{i}</li>
  ));

  const addIngredient = (formData) => {
    formData.preventDefault();
    const form_data = new FormData(formData.target);
    const newIngredient = form_data.get("ingredient");
    setIngredients((prev) => [...prev, newIngredient]);
    formData.target.reset();
  };

  return (
    <main>
      <form onSubmit={addIngredient} className="add-ingredient-form">
        <input type="text" name="ingredient" aria-label="Add Ingredient" placeholder="e.g. oregano" />
        <button>Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          ingredientsListItems={ingredientsListItems}
          getRecipe={getRecipe}
        />
      )}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2vw" }}>
        <TailSpin
          visible={spin}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
        />
      </div>
      {recipeShown && <ClaudeRecipe recipeShown={recipeShown} />}
    </main>
  );
};

export default Main;
