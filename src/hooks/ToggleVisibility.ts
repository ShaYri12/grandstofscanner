import { useState } from 'react'

export function useToggle(): [ToggleVisibilityProps[], (id: string) => void] {
    const [values, setValues] = useState<ToggleVisibilityProps[]>([]);
    
    const toggleValue = (id: string) => {
        console.log('toggleValue');
        setValues((prevValues) => {
            console.log('setvalues');
            const newValues = [...prevValues];
            
            if(newValues.findIndex((value) => value.id === id) === -1){
                newValues.push({id: id, visible: false});
            }

            return newValues.map((value) =>
                value.id === id
                  ? { ...value, visible: !value.visible }
                  : value
              );
        });
    };

    return [values, toggleValue];
}

interface ToggleVisibilityProps {
    id: string;
    visible: boolean;
}