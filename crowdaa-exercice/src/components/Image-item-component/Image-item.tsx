import './Image-item-style.css';
import { ImageObj } from '../../entity/imageObj.entity';
export default function ImageItem ({item, selectedItem, onItemClick}:{item: ImageObj, selectedItem: ImageObj | null,onItemClick: (arg0: ImageObj) => void})  {

    const isSelected:boolean = item.id === selectedItem?.id;
        const handleClick = ():void => {
            onItemClick(item);
        };

    return (
            <img className={isSelected ? 'imgItem activeItem' : 'imgItem'} src={item?.thumbnailUrl} onClick={handleClick} alt="thumbnail"/>
    );
};

