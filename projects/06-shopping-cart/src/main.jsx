import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FiltersProviders } from './context/filter.jsx'

createRoot(document.getElementById('root')).render(
  <FiltersProviders>
    <App />
  </FiltersProviders>,
)
