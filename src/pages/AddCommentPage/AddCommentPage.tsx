import { FC, useEffect, useRef, useState } from 'react'
import { useAuthContext } from '../../Context/AuthContext/useAuthContext'
import { useLocation, useNavigate } from 'react-router-dom';
import { create } from '../../api/commentsApi';
import { CommentInfo } from '../../types/commentInfo';
import { Title } from '../../components/utils/Title/Title';
import { Button } from '../../components/utils/Button/Button';
import { Captcha } from '../../components/utils/Captcha/Captcha';
import { Loader } from '../../components/utils/Loader/Loader';
import { Notify } from '../../components/Notify/Notify';
import * as Yup from 'yup';
import { TextArea } from '../../components/utils/TextArea/TextArea';
import './AddCommentPage.css';
import { TextField } from '../../components/utils/TextField/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faCode, faItalic, faLink, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form } from 'formik';

interface Props {
}

export const AddCommentPage: FC<Props> = () => {

    const [comment, setComment] = useState<CommentInfo | null>(null);
    const [file, setFile] = useState<any>(null);
    const [error, setError] = useState<string>('');
    const [status, setStatus] = useState<'success' | 'error'>();
    const { isAuth } = useAuthContext();
    const navigate = useNavigate();
    const [test, setTest] = useState('');
    const [parentId, setParentId] = useState<string | null>(null);
    

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const location = useLocation();
    

    useEffect(() => {
        if (!isAuth) {
            navigate('/');
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

    const submitHandler = async (values: any, actions: any) => {
        try {
            console.log('submit add new comment')
            const formData = new FormData();
            formData.append('text', values.text);
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
        }
    }


    const handleSubmit = (e: any) => {

        e.preventDefault();
        // if (!isReady) {
        //     console.log('no connection');
        //     return;
        // }
        // console.log(typeof content)
        // let fileContent;
        // if (content) {
        //     const reader = new FileReader();
        //     reader.readAsDataURL(content);
        //     reader.onload = () => {console.log('onload'); fileContent = reader.result}
        //     console.log(fileContent)
        // }
        
        // send(JSON.stringify({
        //     text: 'dsfdsfds',
        //     content: fileContent
        // }))
    }
    // const htmlContent = test;

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        setFile(file);
        // const formData = new FormData();
        // formData.append('text', 'my message');
        // formData.append('file', file);
        // formData.append('userId', '3');

        // const comment = await create(formData);
        // console.log('created comment', comment)
        // setComment(comment.data);

        //send(formData);
        // console.log('fetch post')
        // fetch('http://localhost:8000', {
        //     method: 'POST',
        //     body: formData
        // }).then(res => res.json()).then(res => console.log('res')).catch(e => console.log(e.message));
         
    }

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
                                <div className='AddCommentForm__tools-wrapper'>
                                    <ul className='AddCommentForm__tools'>
                                        <li className='AddCommentForm__tools-item'>
                                            <label htmlFor='file'>
                                                <FontAwesomeIcon icon={faPaperclip} className='AddCommentForm__tools-icon' />
                                                <input    
                                                    id='file'
                                                    hidden                                
                                                    type='file' 
                                                    accept='.jpg, .gif, .png, .txt'                                                
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                        </li>
                                        
                                        <li className='AddCommentForm__tools-item' >
                                            <label htmlFor='text' >
                                                <FontAwesomeIcon 
                                                    icon={faCode} 
                                                    className='AddCommentForm__tools-icon'
                                                    onClick={() => {
                                                        const prev = formik.values.text;
                                                        setTest(`<strong>a</strong>`)
                                                        formik.getFieldHelpers('text').setValue(prev + `<strong></strong>`);
                                                        // textAreaRef?.current?.focus()
                                                        if (textAreaRef?.current) {
                                                            // textAreaRef.current.selectionStart = 5;
                                                            // textAreaRef.current.selectionEnd = 8;
                                                        }
                                                    }} 
                                                />
                                            </label>
                                        </li>
                                        
                                        <li className='AddCommentForm__tools-item'>
                                            <FontAwesomeIcon icon={faLink} className='AddCommentForm__tools-icon' />
                                        </li>
                                        
                                        <li className='AddCommentForm__tools-item'>
                                            <FontAwesomeIcon icon={faItalic} className='AddCommentForm__tools-icon' />
                                        </li>
                                        
                                        <li className='AddCommentForm__tools-item'>
                                            <FontAwesomeIcon icon={faBold} className='AddCommentForm__tools-icon' />
                                        </li>
                                    </ul>
                                    {file && <p className='AddCommentForm__tools-info'>* attached file {file.name}</p>}
                                </div>

                                <TextArea  
                                    label='message' 
                                    id='text'
                                    name='text' 
                                    placeholder='Enter message'
                                    rows={6}
                                    invalid={!!formik.errors.text && formik.touched.text}
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
