import axios from 'axios';
import qs from 'qs'
import { useState } from 'react'
import { Redirect } from 'react-router';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import './style.css'

const LoginForm = () => {
    const [isLogin, setIsLogin] = useState(false)

    const onFinish = (values: any) => {
        console.log('axios-post', values.password);

        axios.post('/api/login', qs.stringify({
            password: values.password
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            setIsLogin(res.data?.data)
            console.log('res=', res.data?.data);

            if (!isLogin) {
                message.error('fail to log in')
            }
        })
    };

    return (
        isLogin ? <Redirect to='/' /> :
            <div className="login-page">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>

    );
};

export default LoginForm