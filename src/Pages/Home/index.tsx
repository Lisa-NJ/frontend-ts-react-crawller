import { useEffect, useState, useRef } from 'react'
import { Redirect } from 'react-router'
import './style.css'
import { Button } from 'antd'
import axios from 'axios'
import { setConstantValue } from 'typescript'

const Home = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [loaded, setLoded] = useState(false)

    //第一次渲染前，发送 ajax 请求
    useEffect(() => {
        axios.get('/api/isLogin').then(res => {
            console.log(res)

            if (!res.data?.data) {
                setIsLogin(false)
            }
            setLoded(true)
        })

    }, [])

    console.log(isLogin, loaded);

    const handleLogoutClick = () => {
        axios.get('/api/logout').then(res => {
            console.log("res=", res);

            if (res.data?.data) {
                setIsLogin(false)
            }
        })
    }
    if (isLogin) {
        if (loaded) {
            console.log('logged in, show page');

            return (
                <div className='home-page'>
                    <Button type="primary">Get</Button>
                    <Button type="primary">Show</Button>
                    <Button type="primary" onClick={handleLogoutClick}>Logout</Button>
                </div >)
        } else {
            return null
        }

    } else {
        console.log('not logged in, redirect to /login');

        return <Redirect to='/login' />
    }

}

export default Home