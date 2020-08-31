import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAP-KY9gg2WemOGkPbhe-Glh10RN5L4mMw',
  authDomain: 'rate-my-beer-ebda0.firebaseapp.com',
  databaseURL: 'https://rate-my-beer-ebda0.firebaseio.com',
  projectId: 'rate-my-beer-ebda0',
  storageBucket: 'rate-my-beer-ebda0.appspot.com',
  messagingSenderId: '198905464750',
  appId: '1:198905464750:web:9831991aeea3aec1cc2a3f',
};
//create user
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log(error.message);
      alert('error creating user');
    }
  }
  return userRef;
};

export const updateRatings = (beerId) => {
  //get the specific beer
  const beerRef = firestore.doc(`beers/${beerId}`);
  //get all ratings for specific beer
  const ratingRef = firestore.doc(`ratings/${beerId}`);
  //ratings realtime listener
  const unsubscribe = ratingRef.onSnapshot((snapshot) => {
    const values = snapshot.data();
    if (snapshot.exists) {
      const nor = Object.values(values).length;
      const rt = Object.values(values).reduce((a, b) => a + b);
      const avg = Math.round((rt / nor) * 10) / 10;
      try {
        //update the ratings inside the beer
        beerRef.update({
          numberOfRatings: nor,
          ratingTotal: rt,
          averageRating: avg,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  });

  return () => unsubscribe();
};

//rate a beer
export const rateThisBeer = async (beerId, currentUser, value) => {
  if (currentUser == null) return console.log('you must login to rate a beer');

  const userId = currentUser.id;
  const ratingRef = firestore.doc(`ratings/${beerId}`);

  const snap = await ratingRef.get();

  if (!snap.exists) {
    //create rating for first time
    try {
      ratingRef
        .set({
          [userId]: value,
        })
        .then(() => {
          updateRatings(beerId);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error.message);
    }
  } else {
    //update existing rating
    try {
      ratingRef
        .update({
          [userId]: value,
        })
        .then(() => {
          updateRatings(beerId);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error.message);
    }
  }
};

export const toggleFavorite = async (beerId, currentUser) => {
  if (!currentUser) return alert('you must login to favorite');

  const userId = currentUser.id;

  const favoriteRef = firestore.doc(`favorites/${beerId}`);

  favoriteRef.get().then((doc) => {
    const obj = { ...doc.data() };
    if (obj.hasOwnProperty(userId) === false) {
      favoriteRef.set({
        ...obj,
        [userId]: true,
      });
    } else {
      favoriteRef.update({
        [userId]: !doc.data()[userId],
      });
    }
  });
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
