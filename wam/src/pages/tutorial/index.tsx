import { useState } from 'react';
import ChooseOption from './ChooseOption';
import Send from './Send';
import Hello from './Hello';

type TutorialPage = 'choose' | 'send' | 'hello';

function Tutorial() {
    const [currentPage, setCurrentPage] = useState<TutorialPage>('choose');

    const handleNavigate = (page: TutorialPage) => setCurrentPage(page);

    return (
        <>
            {currentPage === 'choose' && <ChooseOption onNavigate={handleNavigate} />}
            {currentPage === 'send' && <Send onNavigate={handleNavigate} />}
            {currentPage === 'hello' && <Hello onNavigate={handleNavigate} />}
        </>
    )
}

export default Tutorial