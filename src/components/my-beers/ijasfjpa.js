const MyBeers = ({ currentUser }) => {

  const [favoriteBeers, setFavoriteBeers] = useState([]);
  const [loading, setLoading] = useState(true);

  //get all beers
  useEffect(() => {
    if (currentUser) {
      //find out which beers were marked as 'favorite' by user
      firestore
        .collection('favorites')
        .where(`${currentUser.id}`, '==', true)
        .onSnapshot((snapshot) => {
          const favoriteBeersArray = []; //array to push the favorite beers into
          snapshot.forEach((snapshot) => {
            firestore
              .doc(`beers/${snapshot.id}`) //get beer data stored in another collection
              .get()
              .then((snap) => {
                favoriteBeersArray.push({
                  id: snap.id,
                  ...snap.data(),
                });
                setFavoriteBeers(favoriteBeersArray); //update state
                setLoading(false); //update loading state
              })
              .catch((error) => error.message);
          });
          // setFavoriteBeers(favoriteBeersArray); //update state
          // setLoading(false); //update loading state
        });
    }
  }, [currentUser]);

  return (
    <div>
      <div className="my-beers-grid">
        {loading ? (
          <div>Loading...</div>
        ) : (
          favoriteBeers.map((beer) => (
            <BeerCard key={beer.id} beer={beer} currentUser={currentUser} /> 
          ))
        )}
      </div>
    </div> 
}