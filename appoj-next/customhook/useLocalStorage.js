import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
    // Get from local storage then
    // parse stored json or return initialValue

    const storedValue = () => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    };

    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [value, setValue] = useState(storedValue);

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setStoredValue = (newValue) => {
        try {
            const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
            setValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [value, setStoredValue];
}
