import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Card({ recipe, mine }) {
  return (
    <div className="border-2 rounded-md overflow-hidden w-40 h-60">
      <img src={recipe.strMealThumb} className="h-40 object-cover"/>
      <Link to={mine ? `/recipes/${recipe.id}/edit` : `/recipes/${recipe.id}`} className="flex justify-center items-center h-20 bg-white hover:bg-red-600 hover:text-white duration-200">
        <p className="text-center p-2">{recipe.strMeal}</p>
      </Link>
    </div>
  )
}