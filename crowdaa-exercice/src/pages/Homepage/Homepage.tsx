import React , {useEffect, useState}from 'react';
import './Homepage-style.css';
import Gallery from '../../components/Gallery-component/Gallery';
import Loading from '../../components/Loading-component/Loading';
import ErrorComponent from '../../components/Error-component/Error';
import {ImageObj} from '../../entity/imageObj.entity'

const apiUrl: string = 'https://jsonplaceholder.typicode.com/photos';

export default function Homepage(){
    const [data, setData] = useState<ImageObj[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(():void => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    setError(true)
                }
                const result = await response.json();
                const slicedData = result.slice(0, 30);
                setData(slicedData);
                setIsLoading(false);
                localStorage.setItem('imgData', JSON.stringify(slicedData));
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
                setIsLoading(false);
                setError(true)
            }
        };
        const imgDataInStorage = localStorage.getItem('imgData')?.toString();
        if (imgDataInStorage) {
            setData(JSON.parse(imgDataInStorage))
            setIsLoading(false);
        }else {
            fetchData().then();
        }
    }, []);
    return (
        <div className="homepageContainer">
            {isLoading || !data.length ? <Loading/> : <Gallery data={data}/>}
            {error && <ErrorComponent text='Error 404'/>}
        </div>
    );
};
