import styled from 'styled-components';

export const Container = styled.div`
    padding: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const ProgressContainer = styled.div`
    padding: 20px;
    background-color: #F8F9FA;
    border-radius: 12px;
    cursor: pointer;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #F1F3F5;
    }
`;

export const ProgressBar = styled.div`
    width: 100%;
    height: 4px;
    background-color: #E9ECEF;
    position: relative;
    border-radius: 2px;
    margin: 16px 0;
`;

export const ProgressDot = styled.div<{ active: boolean; completed: boolean }>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ active, completed }) => 
        active ? '#40C057' : // green for active
        completed ? '#228BE6' : // blue for completed
        '#CED4DA'}; // gray for incomplete
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid ${({ active }) => active ? '#40C057' : 'transparent'};
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const TaskList = styled.div`
    flex: 1;
    overflow-y: auto;
    margin: 16px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const TaskItem = styled.div<{ active: boolean; completed: boolean }>`
    padding: 16px;
    border-radius: 12px;
    background-color: ${({ active, completed }) => 
        active ? '#EBFBEE' : // light green for active
        completed ? '#F8F9FA' : // light gray for completed
        'white'};
    border: 1px solid ${({ active, completed }) => 
        active ? '#40C057' : // green border for active
        completed ? '#E9ECEF' : // gray for completed
        '#DEE2E6'}; // default border
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    gap: 8px;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
`;

export const TaskHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const DateTimeWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    color: #868E96;
    font-size: 14px;
`;

export const TaskTitle = styled.div<{ completed: boolean }>`
    font-weight: 500;
    color: ${({ completed }) => completed ? '#868E96' : '#212529'};
    text-decoration: ${({ completed }) => completed ? 'line-through' : 'none'};
`;

export const StatusIndicator = styled.div<{ active: boolean; completed: boolean }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ active, completed }) => 
        active ? '#40C057' :
        completed ? '#228BE6' :
        '#CED4DA'};
    margin-right: 8px;
`;

export const AddButtonWrapper = styled.div`
    margin-top: auto;
    padding: 16px 0;
`;

export const PercentageText = styled.div<{ percentage: number }>`
    font-size: 16px;
    font-weight: 500;
    color: ${({ percentage }) => 
        percentage === 100 ? '#40C057' :
        percentage >= 70 ? '#228BE6' :
        '#212529'};
`;

export const AssigneeChip = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 4px 8px;
    background-color: #F8F9FA;
    border-radius: 16px;
    font-size: 14px;
    color: #495057;
    margin-top: 4px;
`;

export const ProgressWrapper = styled.div`
    width: 100%;
    position: relative;
    padding: 0 8px;
`;

export const TimeIndicator = styled.div<{ left: string }>`
    position: absolute;
    top: -20px;
    left: ${({ left }) => left};
    width: 2px;
    height: 12px;
    background-color: #FA5252;
    
    &::after {
        content: '현재';
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        color: #FA5252;
        white-space: nowrap;
    }
`;