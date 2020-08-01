import React from 'react';

import { AuthProvider } from '../hooks/auth';
import { ToastProvider } from '../hooks/toast';

const AppProvider: React.FC = ({ children }) => {
    return (
        <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
    );
};

export default AppProvider;
