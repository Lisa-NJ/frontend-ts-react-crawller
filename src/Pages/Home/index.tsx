import { useEffect, useState, useRef } from 'react'
import { Redirect } from 'react-router'
import { Button, message } from 'antd'
import axios from 'axios'
import ReactECharts from 'echarts-for-react'
import echarts from 'echarts'
import moment from 'moment'
import './style.css'


interface CourseItem {
    title: string
    count: number
}

interface LineData {
    name: string,
    type: string,
    data: number[]
}

interface Data {
    [key: string]: CourseItem[]
}

const Home = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [loaded, setLoded] = useState(false)
    const [data, setData] = useState<Data>({})

    //第一次渲染前，发送 ajax 请求
    useEffect(() => {
        axios.get('/api/isLogin').then(res => {
            console.log(res)

            if (!res.data?.data) {
                setIsLogin(false)
            }
            setLoded(true)
        })
        axios.get('/api/showData').then(res => {
            if (res.data?.data) {
                console.log(res.data.data);
                setData(res.data.data)
            }
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
        console.log(data);

        const courseNames: string[] = []
        const times: string[] = []
        const tempData: {
            [key: string]: number[]
        } = {}
        for (let i in data) {
            const item = data[i]
            times.push(moment(Number(i)).format('MM-DD HH:mm'))
            item.forEach(innerItem => {
                const { title, count } = innerItem
                if (courseNames.indexOf(title) === -1) {
                    courseNames.push(title)
                }
                tempData[title] ? tempData[title].push(count) : tempData[title] = [count]
            })
        }
        const result: LineData[] = []
        for (let i in tempData) {
            result.push({
                name: i,
                type: 'line',
                data: tempData[i]
            })
        }

        return {
            title: {
                text: 'Num of students '
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: courseNames
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: times
            },
            yAxis: {
                type: 'value'
            },
            series: result
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