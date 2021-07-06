import React from 'react';
import Image from 'gatsby-image';
import ImageThumbnail from './ImageThumbnail';
import { ImageGalleryWrapper } from './styles';

export function ImageGallery ({ images }) {

    const [activeImageThumbnail, setActiveImageThumbnail] = React.useState( images[0] );

    const handleClick = image => {
        setActiveImageThumbnail(image);
    }

    return (
        <ImageGalleryWrapper>
            <div>
                <Image fluid={activeImageThumbnail.localFile.childImageSharp.fluid}/>
            </div>
            <div>
                {images.map((image) => {
                    return (
                        <ImageThumbnail 
                            key={image.id} 
                            isActive={activeImageThumbnail.id === image.id} 
                            onClick={handleClick} 
                            image={image}
                        />
                    );
                })}
            </div>
        </ImageGalleryWrapper>
    );
}