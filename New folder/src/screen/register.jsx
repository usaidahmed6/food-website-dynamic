import { Form, Input, Button, Alert, Radio, Upload } from 'antd';
import './register.css'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, auth, addDoc, userRef, getStorage, ref, uploadBytes, getDownloadURL } from './firebase';
import { UserOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@mui/icons-material';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */


const Register = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const [value, setValue] = React.useState(1);

    const onChange = e => {
        //   console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    console.log(value)

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    const uploadImageToFirebase = async (file) => {

        let restaurantImg;
        try {
            const storage = getStorage()
            const storeageRef = ref(storage, file.name)
            const upload = await uploadBytes(storeageRef, file)
            console.log('file uploaded')
            const imageUrl = await getDownloadURL(storeageRef)
            restaurantImg = imageUrl
        } catch (err) {
            console.log(err.msg)
        }
        return restaurantImg

    }





    // console.log('===============', radio);


    const onFinish = async (values) => {
        setLoading(true)
        // console.log('user values=>', values.phone);
        console.log('user1 =============>', values);
        console.log('user2 =============>', values.email);
        console.log('user3 =============>', values.password);
        console.log('user4 =============>', values.user.name);
        console.log('user5 =============>', values.user.city);
        console.log('user6 =============>', values.user.Country);
        console.log('descriptions =============>', values.user.description);
        console.log('user6 ===============================>', value);
        // console.log('radio checked',setValue);

        const restaurantImg = await uploadImageToFirebase(values.upload[0].originFileObj)

        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((user) => {

                const obj = {
                    uid: user.user.uid,
                    email: values.email,
                    name: values.user.name,
                    city: values.user.city,
                    Country: values.user.Country,
                    restaurantImg,
                    desc: values.user.description,
                  

                }

                addDoc(userRef, obj).then(() => {


                    setSuccess('You are signed in')
                    setTimeout(() => {
                        setSuccess('')
                            navigate('/Restaurant')

                    }, 2000);
                })

            })
            .catch((error) => {
                setLoading(false)
                setError(error.message)
                setTimeout(() => {
                    setError('')

                }, 2000);

            });
    };



    return (
        <>
            <div className="register-div main">
            {
                success !== '' &&
                <Alert message={success} type={'success'} className={'text-center'} />

            }
            {
                error !== '' &&
                <Alert message={error} type={'error'} className={'text-center'} />
            }


                <h1 className='H-Register' > Register </h1>
                <UserOutlined size={'large'} style={{ fontSize: '100px' }} />
                <Form {...layout} className={'register-form'} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name={['user', 'name']}
                        label="Restaurant / User Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        className={'register-name'}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                        className={'register-gmail'}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                        className={'register-password'}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item
                        name={['user', 'city']}
                        label="City Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        className={'register-name'}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        name={['user', 'Country']}
                        label="Country Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        className={'register-name'}
                    >
                        <Input />
                    </Form.Item>


                    {/* <Radio.Group onChange={onChange} value={value}>
                        role
                        <Radio value={'Restaurant'}>Restaurant</Radio>
                        <Radio value={'user'}>user</Radio>
                    </Radio.Group> */}

                    <Form.Item
                        name={['user', 'description']}
                        label="description"
                        rules={[
                            {
                                required: true,
                                
                            },
                        ]}
                        
                        className={'register-name'}
                    >
                        <Input maxLength={100}/>
                    </Form.Item>

                    <Form.Item
                        name="upload"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        className='upload my-4'
                    >
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button icon={<UploadOutlined />}>upload Restaurant / DP image</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item

                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                     

                        <Button loading={loading} type="primary" className={'btn-register-sum '} htmlType="submit">
                            Register
                        </Button>


                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default Register