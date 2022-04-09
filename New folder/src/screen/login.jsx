import React, { useState } from 'react';
import { Form, Input, Button, Alert, Spin } from 'antd';
import { addDoc, auth, signInWithEmailAndPassword, } from './firebase';
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from 'firebase/auth';
import google_img from './images/google-logoo.png';
import './login.css';
import { UserOutlined } from '@ant-design/icons';
import { query, where } from 'firebase/firestore';
import { userRef } from './firebase';


const Login = () => {
    const navigate = useNavigate()
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)




    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // const google = () => {
    //     signInWithPopup(auth, provider)
    //         .then((result) => {
    //             const credential = GoogleAuthProvider.credentialFromResult(result);
    //             const token = credential.accessToken;
    //             const user = result.user;

    //             const obj = {
    //                 uid: user.uid,
    //                 email: user.email,
    //                 name: user.displayName,

    //             }

    //             addDoc(userRef, obj).then(() => {
    //                 setSuccess('You are signed in')
    //                 setTimeout(() => {
    //                     setSuccess('')
    //                     navigate('/')
    //                 }, 3000);
    //             })
    //         }).catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             const email = error.email;
    //             const credential = GoogleAuthProvider.credentialFromError(error);
    //             setError(error.message)
    //             setTimeout(() => {
    //                 setError('')

    //             }, 3000);

    //         });
    // }
    const onFinish = (values) => {
        // console.log('Success:', values);
        setLoading(true)

        signInWithEmailAndPassword(auth, values.email, values.password)

            .then(() => {
                // Signed in
                setSuccess('You are signed in')
                if (query(userRef, where("uid", "==", auth.currentUser.uid))) {
                    console.log('uid=>', query(userRef, where("uid", "===", auth.currentUser.uid)))

                    setTimeout(() => {
                        setSuccess('')
                        navigate('/Restaurant')
                    }, 3000);
                }
                else {
                    setTimeout(() => {
                        setSuccess('')
                        navigate('/')
                    }, 3000);
                }


            })
            .catch((error) => {
                setLoading(false)
                setError(error.message)
                setTimeout(() => {
                    setError('')

                }, 3000);
            });
    };

    return (
        <div className='main'>


            <div className="login-Div">
            {
                success !== '' &&
                <Alert message={success} type={'success'} className={'text-center'} />

            }
            {
                error !== '' &&
                <Alert message={error} type={'error'} className={'text-center'} />
            }
                <h2 className=' H-login'>Login</h2>
                <UserOutlined size={'large'} style={{ fontSize: '100px' }} />

                <Form
                    name="basic" className="login-form"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                        className={'login-gmail'}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        className={'login-pasword'}
                    >
                        <Input.Password />
                    </Form.Item>






                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }} className={'btn-ant-login'}
                    >
                      
                        <Button  type="primary" htmlType="submit"  loading={loading} className={'btn-login-sum '}>
                            Login
                        </Button>
                        <Link to={'/UserSignUp '} className={'mx-4'}>
                            register Now!
                        </Link>



                    </Form.Item>
                </Form>

            </div>
        </div>
    );
};

export default Login