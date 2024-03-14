import React from 'react';
import './Image-item-detail-style.css'
import MatrixWallCanvas from '../Matrix-canva-component/Matrix-canva'
import { ImageObj } from '../../entity/imageObj.entity';
export default function ImageItemDetail({selectedItem, handleItemClick}:{selectedItem:ImageObj|null, handleItemClick:(arg0:ImageObj)=>void}){

    const thomasItem:string = "Exercice envoyé par Crowdaa, réalisé par Thomas Birmingham - Développeur Front";
    return (
        <div className='itemDetailContainer'>
            {selectedItem ? (
                <div className='boxItemDetail'>
                    <img className='imgItemDetail' src={selectedItem.url} alt='Detail'/>
                    <div className='boxTitleDetail'>
                        <p className='titleImage'>{selectedItem.title}</p>
                    </div>
                    <div className='overlayDetail' onClick={() => {handleItemClick(selectedItem)}}>
                        <div>
                            <img className='imgItemDetailAlt' src={selectedItem.url} alt='Detail'/>
                            <div className='boxTitleDetailAlt'>
                                <p className='titleImageAlt'>{selectedItem.title}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='boxCanvaDetail'>
                        <MatrixWallCanvas/>
                    </div>
                    <div className='boxTitleCanvaDetail'>
                        <p className='titleImage'>{thomasItem}</p>
                    </div>
                </div>
            )}
        </div>
    );
}