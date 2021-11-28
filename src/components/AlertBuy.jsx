import { useEffect } from 'react';

function AlertBuy(props) {
    const { closeAlert = Function.prototype } = props;

    useEffect(() => {
        const timerId = setTimeout(closeAlert, 7000);

        return () => {
            clearTimeout(timerId);
        };
        // eslint-disable-next-line
    }, [name]);

    return (
        <div id='toast-container'>
            <div className='toast'>Pay done!</div>
        </div>
    );
}

export { AlertBuy };