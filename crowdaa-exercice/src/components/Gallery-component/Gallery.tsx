import React, { useState } from 'react';
import './Gallery-style.css';
import ImageItem from '../Image-item-component/Image-item';
import ImageItemDetail from '../Image-item-detail-component/Image-item-detail';
import { ImageObj } from '../../entity/imageObj.entity';

export default function Gallery( { data } : { data : ImageObj[] } ) :JSX.Element {
    const [selectedItem, setSelectedItem] = useState<ImageObj| null>(null);

    const handleItemClick = (item: ImageObj):void => {
        setSelectedItem(item === selectedItem ? null : item);
    }

    return (
        <div className='galleryContainer'>
            <ImageItemDetail selectedItem={selectedItem} handleItemClick={handleItemClick}/>
            <div className='itemBox'>
                {data.map((item: ImageObj, key: number) => (
                    <ImageItem key={key} item={item} selectedItem={selectedItem} onItemClick={handleItemClick}/>
                ))}
            </div>
        </div>
    );
}