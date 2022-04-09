

import { Form, Input,  Button, Alert,  Upload } from 'antd';
import './register.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { createUserWithEmailAndPassword, auth, addDoc,  userRef2, getStorage , ref, uploadBytes, getDownloadURL} from './firebase';
import { UploadOutlined } from '@mui/icons-material';


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

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


const Registeruser = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const normFile = (e) => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
      };

      const uploadImageToFirebase = async (file) => {

        let userImage;
        try {
            const storage = getStorage()
            const storeageRef = ref(storage, file.name)
            const upload = await uploadBytes(storeageRef, file)
            console.log('file uploaded')
            const imageUrl = await getDownloadURL(storeageRef)
            userImage = imageUrl
        } catch (err) {
            console.log(err.msg)
        }
        return userImage

    }




    const onFinish = async (values) => {
        setLoading(true)
        console.log('user ===============>', values);

        // console.log(values.password);
        const userimage = await uploadImageToFirebase(values.upload[0].originFileObj)
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((user) => {
                // const user = userCredential.user;
                // console.log('user gg email=>', values.email);
                const obj = {
                    uid: user.user.uid,
                    email: values.email,
                    phoneNumber: values.phone,
                    name: values.user.name,
                    city: values.user.city,
                    Country: values.user.Country,
                    userImage: userimage,

                }

                addDoc(userRef2, obj).then(() => {
                    setSuccess('You are signed in')
                    setTimeout(() => {
                        setSuccess('')
                        navigate('/')
                    }, 3000);
                })

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

        <div className="register-div">
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
                    label="Name"
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
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input

                        style={{
                            width: '100%',
                        }}
                    />
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


                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="upload your image "
                    className='upload my-4'
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>upload DP</Button>
                    </Upload>
                </Form.Item>


                <Form.Item

                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Link to={'/'} >
                        <span className={'back-btn mx-4 btn-sm btn-light'}>
                            Go back
                        </span>
                    </ Link >

                    <Button loading={loading} type="primary" className={'btn-register-sum my-4'} htmlType="submit">
                        Register
                    </Button>


                </Form.Item>
            </Form>
        </div>

    );
};

export default Registeruser
