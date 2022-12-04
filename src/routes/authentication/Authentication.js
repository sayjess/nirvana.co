import SignIn from '../../components/sign-in/SignIn';
import SignUp from '../../components/sign-up/SignUp';

import './authentication.scss'

const Authentication = () => {
    return (
        <div className='auth-container'>
            <SignIn />
            <SignUp />
        </div>
    )
};

export default Authentication;