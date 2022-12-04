import { useState } from 'react';
import { createAuthWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase';

import FormInput from '../form-input/FormInput';
import Button from '../button/Button';

import './sign-up.scss';


const defaultFormData = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () => {
    const [formData, setFormData] = useState(defaultFormData);
    const { displayName, email, password, confirmPassword } = formData;

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
    const setDefaultField = () => {
        setFormData(defaultFormData)
    }

    const handleSubmit  = async (event) => {
        console.log("inside handle submit for sign up form")
        event.preventDefault();
        //confirm if password matches
        if(password !== confirmPassword){
            alert("password don't match");
            return;
        }
        try {
            const {user} = await createAuthWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName})
            setDefaultField();
        }
        catch(e){
            //if encountered an issue, user might have inputed less than 6 characters for the password
            if(e.code === 'auth/email-already-in-use'){
                alert('account already exist')
                setDefaultField();
            } else if(e.code === 'auth/network-request-failed'){
                alert('Please check your internet connection')
            }
            console.log('encountered an issue', e)
        }
    }

    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Name' 
                    type='text' 
                    required 
                    name='displayName'
                    onChange={handleChange}
                    value={displayName}
                    />
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
                <FormInput
                    label='ConfirmPassword' 
                    type='password' 
                    required 
                    name='confirmPassword'
                    onChange={handleChange}
                    value={confirmPassword}
                    />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )

}

export default SignUp;