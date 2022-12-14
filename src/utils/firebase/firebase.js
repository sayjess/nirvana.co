import { initializeApp } from "firebase/app";
// authentication
import { getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
 } from "firebase/auth";
// firestore database
import { getFirestore, 
  //doc - retrieves document inside firestore database
  doc,
  //to actually get the data
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs

 } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAKEH7iT1Yb5Jghk21KnsAK9ks2WBFTKes",
  authDomain: "nirvanadotco-db.firebaseapp.com",
  projectId: "nirvanadotco-db",
  storageBucket: "nirvanadotco-db.appspot.com",
  messagingSenderId: "557500382114",
  appId: "1:557500382114:web:3874bd4c1ffc126149d0fb"
};

//initializing config
const firebaseApp = initializeApp(firebaseConfig);
//to use google authentication, we need to initialize GoogleAuthProvider class we received
const googleProvider = new GoogleAuthProvider();
//setting how we want googleauthprovider to behave
googleProvider.setCustomParameters({
  // every time somebody interacts with our provider, we want to force them to select an account
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
//create firestore database
export const db = getFirestore();

//uploading data to firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  })

  await batch.commit();
  console.log('done');
}

//retreive categories in firebase
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef)
  
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})

  return categoryMap;

}

//create user instance in the firestore db everytime a new user is authenticated
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if(!userAuth) return;
  //create a reference in the doc- doc(dbinstance, collectionname, unique identifier/unique key)
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  
  //creating an instance of a collection if it does not exist in the db
  if(!userSnapshot.exists()){
    const { displayName, email} = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInfo
      })
    }
    catch(e){
      console.log("error creating the user", e.message)
    }
  }
  //if it exist return the doc
  return userDocRef;
}

export const createAuthWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

//uploading data to firestore
    