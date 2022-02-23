import { useEffect, useRef, useState } from "react"

export const useFetch = ( url ) => {
    //Se puede colocar un error si la url no es pasa if algo throw error

    const isMounted = useRef(true);
    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null
    })

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, []);

    useEffect(() => {
        // setState({
        //     ...state,
        //     loading: true
        // })

        setState({
            data: null,
            loading: true,
            error: null
        })

        fetch( url )
            .then( resp => resp.json() )
            .then( data => {
                if (isMounted.current) {
                    setState({
                        data,
                        loading: false,
                        error: null
                    })
                }
            })
            .catch( () => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                })
            })
    }, [url])

    return state;
}
