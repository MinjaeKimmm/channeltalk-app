import { useState } from 'react';
import RegisterForm from './RegisterForm';
import RegisterComplete from './RegisterComplete';

type RegisterPage = 'register' | 'complete';

function Register() {
    const [currentPage, setCurrentPage] = useState<RegisterPage>('register');
    const [_username, setUsername] = useState<string | null>(null);

    const handleComplete = (name: string) => {
        setUsername(name);
        setCurrentPage('complete');
    };
    
    const handleRestart = () => {
        setUsername(null);
        setCurrentPage('register');
    };

    return (
        <>
            {currentPage === 'register' && (
                <RegisterForm onComplete={handleComplete} onCancel={handleRestart} />
            )}
            {currentPage === 'complete' && (
                <RegisterComplete onRestart={handleRestart} />
            )}
        </>
    )
}

export default Register