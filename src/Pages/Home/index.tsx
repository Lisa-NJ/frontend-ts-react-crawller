import { useEffect, useState, useRef } from 'react'
import { Redirect } from 'react-router'
import './style.css'
import { Button, message } from 'antd'
import axios from 'axios'
import ReactECharts from 'echarts-for-react'
import echarts from 'echarts'

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
    const handleGetClick = () => {
        axios.get('/api/getData').then(res => {
            console.log("res=", res);
            if (res.data?.data) {
                message.success("getData seccess!")
            }
        })
    }
    const handleShowClick = () => {
        axios.get('/api/showData').then(res => {
            console.log("res=", res);

        })
    }

    const getOption = (): echarts.EChartOption => {
        return {
            title: {
                text: 'Stacked Line'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Email',
                    type: 'line',
                    stack: 'Total',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Union Ads',
                    type: 'line',
                    stack: 'Total',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'Video Ads',
                    type: 'line',
                    stack: 'Total',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: 'Direct',
                    type: 'line',
                    stack: 'Total',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: 'Search Engine',
                    type: 'line',
                    stack: 'Total',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };


    }

    if (isLogin) {
        if (loaded) {
            console.log('logged in, show page');

            return (
                <div className='home-page'>
                    <div className='buttons'>
                        <Button
                            type="primary"
                            style={{ marginRight: '25px' }}
                            onClick={handleGetClick}
                        >Get</Button>
                        <Button
                            type="primary"
                            onClick={handleLogoutClick}
                        >Quit</Button>
                    </div>

                    <ReactECharts option={getOption()} />
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