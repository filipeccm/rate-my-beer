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
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

//rate a beer
export const rateThisBeer = async (beerId, currentUser, value) => {
  if (currentUser == null) return console.log('you must login to rate a beer');

  const userId = currentUser.id;
  const ratingRef = firestore.doc(`ratings/${beerId}`);

  const snap = await ratingRef.get();

  console.log(snap.empty);
  if (snap.empty) {
    //create rating for first time
    try {
      ratingRef.set({
        [userId]: value,
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    //update existing rating
    try {
      ratingRef.update({
        [userId]: value,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
};

//get ratings using beer's id
export const getAllTheRatings = async (id, currentUserId) => {
  const ref2 = firestore
    .collection('ratings')
    .where('beerId', '==', id) //filter by beerId
    // .where('userId', '==', currentUserId) //&& userId
    .get()
    .then((snap) => snap.forEach((data) => console.log(data.data().rating)))
    .catch((err) => console.log(err));
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

// export let beerArray = [];

// const beersRef = firestore.collection('beers');
// beersRef.onSnapshot((snapshot) => {
//   snapshot.docs.forEach((snap) => beerArray.push(snap.data()));
// });

// console.log('OLHA', beerArray);
