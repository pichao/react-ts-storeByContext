import React, { useContext, useEffect } from 'react';
import styles from './index.scss';
import { Link } from 'react-router-dom';
// import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Button, Checkbox, DatePicker } from 'antd';
import { useGetformParams } from 'hooks/useGetformParams';
import { useRequest } from 'hooks/useRequest';
import { store } from 'store/index';
import { SketchPicker } from 'react-color';
import { camelCase } from 'lodash-es';
export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
export default (props: HelloWorldProps) => {
    console.log(process.env, 'dsfgs');
    const { dispatch, state } = useContext(store);
    console.log(state, 'ooooooooooo');
    useEffect(() => {
        dispatch({
            type: 'aaa',
            payload: {
                address: 'xxxxxxx',
            },
        });
    }, []);
    console.log(camelCase('Foo Bar'));
    // const selectedData = useSelector((state) => {
    //     console.log(state, 'stateyyyyyyyyyyyyy');
    //     return state;
    // }, shallowEqual) as any;
    // const dispatch = useDispatch();
    const [formData, setFormItem] = useGetformParams({
        name: '',
        add: '',
    });
    const submit = () => {
        console.log(formData);
    };

    const [isFetching, res, getData] = useRequest(
        {
            method: 'get',
            url: '/api/v2/all',
        },
        () => {
            console.log('请求完成后执行');
        },
    );
    console.log(isFetching, res, 'uuuuuuuuuuuu');
    const handleColorChange = ({ hex }) => {
        console.log(hex);
        document.body.style.setProperty('--primary-color', hex);

        (window as any).less
            .modifyVars({
                '@primary-color': hex,
            })
            .then(() => {
                console.log('更新主题成功');
            })
            .catch((error) => {
                console.log(`Failed to update theme`);
            });
    };
    return (
        <div>
            <div>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                        // sss;

                        setFormItem('name', e.target.value);
                    }}
                />
                <input
                    type="text"
                    value={formData.add}
                    onChange={(e) => {
                        // sss;

                        setFormItem('add', e.target.value);
                    }}
                />
                <Link to={'/about$'}>about</Link>
                <Link to={'/users$'}>users</Link>
            </div>
            <button onClick={submit}>测试</button>
            <button
                onClick={() => {
                    getData();
                    dispatch({
                        type: 'test_state',
                        payload: {
                            tips: '测试state',
                        },
                    });
                }}
            >
                测试state
            </button>
            <DatePicker />

            <SketchPicker onChangeComplete={handleColorChange} />
            {/* {selectedData.showAlert ? <div>这里验证发送action</div> : null} */}
            <img src={require('assets/a.jpg')} />
            <Button type={'primary'}>primary</Button>

            <div className={styles.home}>这是home页面</div>
        </div>
    );
};
