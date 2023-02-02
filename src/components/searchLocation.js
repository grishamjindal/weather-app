import {
    useState,
    useEffect,
    useCallback,
    useRef
} from 'react';
import _debounce from 'lodash/debounce';
import { fetchCities } from '../services/GeoLocation.service';

function SearchLocation({ handleSelection }) {

    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(true);
    const [list, setList] = useState([])
    const wrapperRef = useRef(null);

    const fetchLocations = async (param) => {
        setLoading(true)
        let result = await fetchCities(param)
        console.log(result)
        setList(result)
        setLoading(false)
        setIsVisible(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceFn = useCallback(_debounce((newValue) => fetchLocations(newValue), 500), []);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    const handleInputChange = (val) => {
        setQuery(val)        
        if (val) {
            debounceFn(val)
        } else {
            setList([])
        }
    }

    return (
        <div className='search-location'>
            <div className="inputcontainer">
                <input placeholder='Search location'
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)} />
                {
                    loading && (
                        <div className="icon-container">
                            <i className="loader"></i>
                        </div>
                    )
                }
            </div>
            {
                isVisible && list.length ?
                    <div className='suggestionList' ref={wrapperRef}>
                        {list.map(item => (
                            <div key={item.name}
                                onClick={() => {
                                    setQuery(item.name)
                                    handleSelection(item)
                                    setList([])
                                }}>{item.name + ', ' + item.country}</div>
                        ))} 
                    </div> : null
            }
        </div>
    )
}

export default SearchLocation;