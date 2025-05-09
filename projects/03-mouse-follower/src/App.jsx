import { useEffect, useState } from 'react';
import './App.css'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Pointer move
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove);
    }

    // Limpia los eventos cuando el componete se desmonta o cambian las dependencias
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled]);

  // Change body class name
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled);

    return () => {
      document.body.classList.remove('no-cursor');
    }
  }, [enabled]);

  // [] => Solo se ejecuta una vez cuando se monta el componente
  // [enabled] => Se ejecutacuando cambia enabled y cambia el componente
  // undefined => Se ejecuta cada vez que se renderiza el componente

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}></div>

      <h3>Proyecto 3</h3>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )

}

function App() {
  return (
    <main>
      <FollowMouse />
    </ main>
  )
}

export default App;
