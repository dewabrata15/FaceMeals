import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function CardRandom({ randomRecipe }) {
  return (
    <div className="flex m-10 items-center border-2 rounded-md overflow-hidden h-40">
      <img src={randomRecipe.strMealThumb} className="w-1/2 object-cover"/>
      <Link to={`/recipes/${randomRecipe.id}`} className="flex w-full h-full justify-center items-center bg-white hover:bg-red-600 hover:text-white duration-200">
        <p className="text-center">{randomRecipe.strMeal}</p>
      </Link>
    </div>
  )
}