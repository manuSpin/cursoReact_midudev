import './App.css'
import { useCatImage } from './hooks/useCatImage';
import { useCatFact } from './hooks/useCatFact';
import { Otro } from './components/Otro';

export function App() {
    const { fact, refreshFact } = useCatFact();
    const { imgUrl } = useCatImage({ fact });

    const handleClick = async () => {
        refreshFact(); 
    }

    return (
        <main>
            <h1>Cats and facts</h1>

            <button onClick={handleClick}>Get new fact</button>
            {fact && <p>{fact}</p>}
            {imgUrl && <img width={300} src={imgUrl} alt={`Foto de un gato recuperado de una API con las palabras ${fact}`} />}

            {/* <section>
                {fact && <p>{fact}</p>}
                {imgUrl && <img width={300} src={imgUrl} alt={`Foto de un gato recuperado de una API`} />}
            </section> */}
        </main>
    )
}
