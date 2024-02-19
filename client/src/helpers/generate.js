export const getRandomRecipes = (max, min) => {
  const idRandomRecipes = []
  while(idRandomRecipes.length < 4) {
    const idRandom = Math.floor(Math.random() * (max - min)) + min
    if(!idRandomRecipes.includes(idRandom)) {
      idRandomRecipes.push(idRandom)
    }
  }
  return idRandomRecipes
}