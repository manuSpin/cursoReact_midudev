import { useEffect, useState } from "react";

export function useCatImage({ fact }) {
    const [imgUrl, setImgUrl] = useState('LOADING');

    useEffect(() => {
        if (!fact) {
            return
        }

        const firstWord = fact.split(' ', 3).join(' ');
        

        fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
            .then(res => res.json())
            .then(data => setImgUrl(data.url));

    }, [fact]);

    return { imgUrl };
}