import { Link } from "../Link"

const i18n = {
    es: {
        title: 'Sobre nosotros',
        description: 'Estamos creando un clon de React Router.',
        link: 'Volver al inicio'
    },
    en: {
        title: 'About us',
        description: 'We are creating a clone of React Router.',
        link: 'Go back to home page'
    },
}

const useI18n = (lang) => {
    return i18n[lang] || i18n.eng;
}

export default function AboutPage({ routeParams }) {
    const i18n = useI18n(routeParams.lang ?? 'es')
    return (
        <>
            <h1>{i18n.title}</h1>
            <div>
                <img src='https://unavatar.io/x/spin_chan' alt="Foto de ManuSpin" width='200px' />
                <p>{i18n.description}</p>
            </div>
            {/* <a href='/'>Ir al home</a> */}
            {/* <button onClick={() => { navigate('/') }}>Ir al home</button> */}
            <Link to='/'>{i18n.link}</Link>
        </>
    )
}