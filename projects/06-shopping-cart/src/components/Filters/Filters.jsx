import { useId } from 'react';
import './Filter.css';
import { useFilter } from '../../hooks/useFilter';

export function Filters() {
    const { filters, setFilters } = useFilter()
    const minPriceFilterId = useId();
    const categoryFilterId = useId();

    const handleChangeMinPrice = (event) => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }));
    }

    const handleChangeCategory = (event) => {
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }));

    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Precio</label>
                <input
                    type="range"
                    id={minPriceFilterId}
                    min='0' max='1000'
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice} />
                <span>${filters.minPrice}</span>
            </div>

            <div>
                <label htmlFor={categoryFilterId}>Categoría</label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value='all'>Todas</option>
                    <option value='beauty'>Belleza</option>
                    <option value='fragrances'>Perfumes</option>
                    <option value='furniture'>Muebles</option>
                    <option value='groceries'>Alimentación</option>
                </select>
            </div>
        </section>
    )
}