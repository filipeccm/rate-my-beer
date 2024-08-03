export const addBeerItem = (beerItems, beerToAdd) => {
  if (Array.isArray(beerToAdd) && beerToAdd.length) {
    if (beerItems) {
      return [...beerItems, ...beerToAdd];
    }
    return beerToAdd;
  }
  if (beerItems) {
    const beerExists = beerItems.find((beer) => beer.id === beerToAdd.id);
    if (!beerExists) {
      return [...beerItems, beerToAdd];
    }
  } else {
    const newBeers = [];
    newBeers.push(beerToAdd);
    return [...newBeers];
  }
};

export const updateBeerItem = (beerItems, beerToUpdate) => {
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

export const removeBeerItem = (beerItems, beerId) => {
  const newBeerItems = beerItems.filter((beer) => {
    return beer.id !== beerId;
  });
  return [...newBeerItems];
};
