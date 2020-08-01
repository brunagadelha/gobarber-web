import React, { useCallback, useEffect } from 'react';
import { FiInfo, FiCheckCircle, FiAlertTriangle, FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Container } from './styles';

import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProp{
    message: ToastMessage; 
    style: object; 
}

const icons = {
    info: <FiInfo size={24}/>, 
    success: <FiCheckCircle size={24}/>, 
    warning: <FiAlertTriangle size={24}/>, 
    error: <FiAlertCircle size={24}/>, 
}

const Toast: React.FC<ToastProp> = ({ message, style }) => {

    const { removeToast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id); 
        }, 3000); 

        return () => {
            clearTimeout(timer); 
        }
    })

    const handleRemoveToast = useCallback(
        (id: string): void => {
            removeToast(id);
        },
        [removeToast],
    );

    return (
        <Container
            key={message.id}
            type={message.type}
            hasDescription={!!message.description}
            style={style}
        >
            {icons[message.type || 'info']}

            <div>
                <strong>{message.title}</strong>
                {message.description && <p>{message.description}</p>}

                <button
                    type="button"
                    onClick={() => {
                        handleRemoveToast(message.id);
                    }}
                >
                    <FiXCircle size={18}></FiXCircle>
                </button>
            </div>
        </Container>
    );
};

export default Toast;
