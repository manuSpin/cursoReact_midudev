import { useCatImage } from "../hooks/useCatImage";

export function Otro() {
    const { imgUrl } = useCatImage({ fact: 'Random fact' });

    return (
        <>
            {imgUrl && <img width={300} src={imgUrl} />}
        </>
    )
}