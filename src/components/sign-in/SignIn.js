import React, {useState } from 'react';

import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthWithEmailAndPassword } from '../../utils/firebase/firebase';

import FormInput from '../form-input/FormInput';
import Button from '../button/Button';

import './sign-in.scss'

const defaultFormData = {
    email: '',
    password: ''
}

const SignIn = () => {

    const [formData, setFormData] = useState(defaultFormData);
    const { email, password } = formData;


    const setDefaultField = () => {
        setFormData(defaultFormData)
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        }
        )
    }
    const handleSubmit  = async (event) => {
        event.preventDefault();
        try{
            const {user} = await signInAuthWithEmailAndPassword(email, password);
            setDefaultField();
        }
        catch(e){
            switch(e.code){
                case 'auth/wrong-password':
                    alert("Invalid Credential. Please try again.");
                    break;
                case 'auth/user-not-found':
                    alert('Account does not exist.')
                    setDefaultField();
                    break;
                case 'auth/email-already-in-use':
                    alert('Already signed in.')
                    setDefaultField();
                    break;
                case 'auth/network-request-failed':
                    alert('Please check your internet connection and try again.')
                    break;
                default:
                    alert('something went wrong: ', e)
            }
        }   
    }

    //note: whenever we want to make a call to a database this is going to be asynchronous
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    return (
        <div className='method-container'>
            <div className='sign-in-container'>
                <h1>I already have an account</h1>
                <span>Sign in with your email and password</span>
                <form onSubmit={handleSubmit}>
                    <FormInput
                            label='Email' 
                            type='email' 
                            required 
                            name='email'
                            onChange={handleChange}
                            value={email}
                            />
                        <FormInput
                            label='Password' 
                            type='password' 
                            required 
                            name='password'
                            onChange={handleChange}
                            value={password}
                            />
                    <div className='btn-container'>
                        <Button type='submit'>Sign In</Button>
                        <Button type='button' onClick={signInWithGoogle} buttonType='google'>Google Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;