export const addFavoriteBeerItem = (beerItems, beerToAdd) => {
  if (beerItems) {
    const beerExists = beerItems.find((beer) => beer.id === beerToAdd.id);
    if (!beerExists) {
      return [...beerItems, beerToAdd];
    }
  }
  return [beerToAdd];
};

export const updateFavoriteBeerItem = (beerItems, beerToUpdate) => {
  const newBeerItems = beerItems.map((beer) => {
    if (beer.id === beerToUpdate.id) {
      return {
        id: beerToUpdate.id,
        ...beerToUpdate,
      };
    }
    return beer;
  });
  return [...newBeerItems];
};

export const removeFavoriteBeerItem = (beerItems, beerId) => {
  const newBeerItems = beerItems.filter((beer) => {
    return beer.id !== beerId;
  });
  return [...newBeerItems];
};
