
import React , {useEffect, useState}from 'react';
import './Homepage-style.css';
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
            } catch (error) {
                setIsLoading(false);
                setError(true)
            }
        };
            fetchData().then();

    }, []);
    return (
        <div className="homepageContainer">

        </div>
    );
};
