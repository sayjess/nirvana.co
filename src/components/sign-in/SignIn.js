import React, {useState} from 'react';

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
        console.log('inside handlesubmit')
        event.preventDefault();
        try{
            const response = await signInAuthWithEmailAndPassword(email, password);
            console.log(response)
            console.log('inside handlesubmit try block')
        }
        catch(e){
            alert('something went wrong', e)
        }
    }

    //note: whenever we want to make a call to a database this is going to be asynchronous
    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
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
                </form>
                <div className='btn-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button onClick={signInWithGoogle} buttonType='google'>Google Sign In</Button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;