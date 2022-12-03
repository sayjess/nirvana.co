import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase'


const SignIn = () => {
    //note: whenever we want to make a call to a database this is going to be asynchronous
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        
    }

    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
        </div>
    );
};

export default SignIn;