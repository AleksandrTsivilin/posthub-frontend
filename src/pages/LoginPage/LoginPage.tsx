import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext/useAuthContext'
import { Button } from '../../components/utils/Button/Button'
import { Title } from '../../components/utils/Title/Title';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '../../components/utils/TextField/TextField';
import { Captcha } from '../../components/utils/Captcha/Captcha';
import { Notify } from '../../components/Notify/Notify';
import { Loader } from '../../components/utils/Loader/Loader';
import { login, register } from '../../api/userApi';
import { getTokenData } from '../../helpers/jwt';
import { TokenData } from '../../types/tokenData';
import { UserAuthAttrs } from '../../types/userAuthAttrs';
import './LoginPage.css';
import { IconButton } from '../../components/utils/IconButton/IconButton';

export const LoginPage = () => {
    const {setIsAuth, setUserName} = useAuthContext();
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState<string>('');
    const [status, setStatus] = useState<'success' | 'error'>();
    const [reloadCaptcha, setReloadCaptcha] = useState({})
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        userName: '',
        password: '',
        confirmPassword: '',
        captcha: '' 
    }

    const validationSchema = isRegister ? Yup.object({
        email: Yup.string().required('Email is required').email('email invalid'),
        userName: Yup.string().required('User name is required').min(3),
        password: Yup.string().required('Password is required').min(3),
        captcha: Yup.string().required('enter code'),
        confirmPassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password')], 'Passwords must match')
    }) : Yup.object({
        email: Yup.string().required('Email is required').email('email invalid'),
        password: Yup.string().required('Password is required'),
        captcha: Yup.string().required('enter code'),
    }) ;

    const submitHandler = async (values: any, actions: any) => {   
        try{
            const token = await auth(isRegister, {...values});
            const tokenData: TokenData = getTokenData(token.data.token);
            localStorage.setItem('token', JSON.stringify(token.data.token));
            setUserName(tokenData.userName);
            setIsAuth(true);
            navigate(-1);
        } catch (error: any) {
            setError(error.message);
            setStatus('error');
        } finally {
            setReloadCaptcha({});
            actions.resetForm();
        }
    };

    const auth = async (isRegister: boolean, {...userData}: UserAuthAttrs) => {
        if (isRegister) {
            return await register({
                userName: userData.userName, 
                email: userData.email,password:  
                userData.password, captcha: 
                userData.captcha
            })
        } else {
            return await login({
                email: userData.email,password:  
                userData.password, captcha: 
                userData.captcha
            })
        }
    }

    return (
        <div>
            <Title title={isRegister ? 'Registration' : 'Sign in'} />

            <IconButton icon='back' position='start' iconSize='sm' color='gray' onClick={() => navigate(-1)} />

            <Notify message={error} status={status} onClose={() => setError('')}/>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
            >
                {formik => (
                    <>
                        <div className='LoginForm__loader-wrapper'>
                            {formik.isSubmitting && <Loader />}
                        </div>
                        <div className='LoginForm__container'>                      
                            
                            <Form className='LoginForm'>
                                {isRegister && <TextField
                                    label='user name'
                                    name='userName'
                                    placeholder='Enter user name'
                                    invalid={!!formik.errors.userName && formik.touched.userName}
                                />}

                                <TextField
                                    label='email'
                                    name='email'
                                    placeholder='Enter email'
                                    invalid={!!formik.errors.email && formik.touched.email}
                                />

                                <TextField
                                    label='password'
                                    name='password'
                                    type='password'
                                    placeholder='Enter password'
                                    invalid={!!formik.errors.password && formik.touched.password}
                                />

                                {isRegister && (
                                    <TextField
                                        label='confirm password'
                                        name='confirmPassword'
                                        placeholder='Enter confirm password'
                                        type='password'
                                        invalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
                                    />)}                         

                                <Captcha 
                                    label='enter code'
                                    name='captcha'
                                    placeholder='Enter code'
                                    reload={reloadCaptcha}
                                    invalid={!!formik.errors.captcha && formik.touched.captcha}
                                />

                                <label className='LoginForm__checkbox'>
                                    <input
                                        type='checkbox'
                                        checked={isRegister}
                                        onChange={(e) => setIsRegister(e.target.checked)}
                                    />
                                    I don't have an account. Create account.
                                </label>

                                <Button
                                    text={isRegister ? 'sign up' : 'sign in'}
                                    type='submit'
                                    disabled={formik.isSubmitting}
                                />
                            </Form>
                        </div>
                    </>
                )}
            </Formik>
        </div>
    )
}
