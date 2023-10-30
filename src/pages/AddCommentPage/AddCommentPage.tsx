import { FC, useEffect, useState } from 'react'
import { useAuthContext } from '../../Context/AuthContext/useAuthContext'
import { useLocation, useNavigate } from 'react-router-dom';
import { create } from '../../api/commentsApi';
import { Title } from '../../components/utils/Title/Title';
import { Button } from '../../components/utils/Button/Button';
import { Captcha } from '../../components/utils/Captcha/Captcha';
import { Loader } from '../../components/utils/Loader/Loader';
import { Notify } from '../../components/Notify/Notify';
import * as Yup from 'yup';
import { TextField } from '../../components/utils/TextField/TextField';
import { Formik, Form } from 'formik';
import {QuillField} from '../../components/utils/QuillField/QuillField';
import { IconButton } from '../../components/utils/IconButton/IconButton';
import './AddCommentPage.css';

interface Props {
}

export const AddCommentPage: FC<Props> = () => {

    const [file, setFile] = useState<any>(null);
    const [error, setError] = useState<string>('');
    const [status, setStatus] = useState<'success' | 'error'>();
    const { isAuth } = useAuthContext();
    const navigate = useNavigate();
    const [parentId, setParentId] = useState<string | null>(null);
    const [reloadCaptcha, setReloadCaptcha] = useState({});
    


    const location = useLocation();
    

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }

        const state = location.state;
        if (state) {
            setParentId(state.parentId);
        }

    }, [isAuth, navigate, location]);

    const initialValues = {
        text: '',
        homePage: '',
        captcha: '' 
    }

    const validationSchema =  Yup.object({
        text: Yup.string().required('message is required'),
        captcha: Yup.string().required('enter code'),
    }) ;

    // const handleImage = useCallback( (file: any) => {
    //     console.log(file, typeof file)
    //     setFile(file) 
    // }, []);

    const submitHandler = async (values: any, actions: any) => {
        try {
            const formData = new FormData();
            formData.append('text', values.text);
            formData.append('captcha', values.captcha)
            if (file) {
                formData.append('file', file);
            }

            if (parentId) {
                formData.append('parentId', parentId);
            }

            const comment = await create(formData);
            console.log('created comment', comment)
        } catch (error: any) {
            setError(error.message);
            setStatus('error');
        } finally {
            actions.resetForm();
            setReloadCaptcha({});
            setFile(null);
        }
    }



    // const handleFileChange = async (event: any) => {
    //     const file = event.target.files[0];
    //     setFile(file);
    //     // const formData = new FormData();
    //     // formData.append('text', 'my message');
    //     // formData.append('file', file);
    //     // formData.append('userId', '3');

    //     // const comment = await create(formData);
    //     // console.log('created comment', comment)
    //     // setComment(comment.data);

    //     //send(formData);
    //     // console.log('fetch post')
    //     // fetch('http://localhost:8000', {
    //     //     method: 'POST',
    //     //     body: formData
    //     // }).then(res => res.json()).then(res => console.log('res')).catch(e => console.log(e.message));
         
    // }

    return (
        <>
            {/* <Title title='Add comment' />
            <div>
                <h2>File Upload Form</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type='file' 
                        accept='.jpg, .gif, .png, .txt'
                        
                        onChange={handleFileChange}
                    />
                    <button type='submit'>Upload</button>
                </form> 
            </div>
            <p>Result</p>
            <img src={`${BASE_URL}/${comment?.fileUrl}`} alt='comment_file' /> */}
             <div>
            <Title title='Add comment' />

            <IconButton icon='back' position='start' iconSize='sm' color='gray' onClick={() => navigate(-1)} />

            <Notify message={error} status={status} onClose={() => setError('')}/>

            <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema} 
                    onSubmit={submitHandler}                
            >
                {formik => (

                    <>
                        <div className='AddCommentForm__loader-wrapper'>
                            {formik.isSubmitting && <Loader />}
                        </div>

                        <div className='AddCommentForm__container'>                                                
                            <Form className='AddCommentForm'>

                               <QuillField 
                                    label="leave your comment" 
                                    onChangeFileInput={setFile} 
                                    file={file}
                                    name='text' 
                                />

                                <TextField
                                    label='home page'
                                    name='homePage'
                                    placeholder='Enter url home page'
                                />


                                <Captcha 
                                    label='enter code'
                                    name='captcha'
                                    placeholder='Enter code'
                                    invalid={!!formik.errors.captcha && formik.touched.captcha}
                                    reload={reloadCaptcha}
                                />

                                <Button
                                    text='add comment'
                                    type='submit'
                                    disabled={formik.isSubmitting}
                                />
                            </Form>
                        </div>
                    </>
                )}
            </Formik>
        </div>
        </>
    )
}
