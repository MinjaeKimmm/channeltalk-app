import { useState } from 'react';
import TextPage from './TextPage';
import SpeechPage from './SpeechPage';

type HalmalPage = 'text' | 'speech';

function Halmal() {
    const [currentPage, setCurrentPage] = useState<HalmalPage>('text');
    const [message, setMessage] = useState<string>('');

    const handleNext = (text: string) => {
        setMessage(text);
        setCurrentPage('speech');
    };
    
    const handleBack = () => {
        setCurrentPage('text');
    };

    return (
        <>
            {currentPage === 'text' && (
                <TextPage onNext={handleNext} initialMessage={message} />
            )}
            {currentPage === 'speech' && (
                <SpeechPage onBack={handleBack} message={message} />
            )}
        </>
    )
}

export default Halmal;