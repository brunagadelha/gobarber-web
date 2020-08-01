import styled, { css } from 'styled-components';
import { animated } from 'react-spring'; 

interface ContainerProps {
    type?: 'info' | 'success' | 'error' | 'warning';
    hasDescription: boolean;
}

const toastTypeVariations = {
    info: css`
        background: #ebf9ff;
        color: #3172b7;
    `,
    success: css`
        background: #d9ead3;
        color: #38761d;
    `,
    error: css`
        background: #fddede;
        color: #c53030;
    `,
    warning: css`
        background: #fff5d7;
        color: #7f6000;
    `,
};

export const Container = styled(animated.div)<ContainerProps>`
    background: #ebf8ff;
    color: #3172b7;

    ${(props) => toastTypeVariations[props.type || 'info']}

    width: 360px;

    & + div {
        margin-top: 8px;
    }

    position: relative;
    padding: 16px 30px 16px 16px;
    border-radius: 10px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0.2);

    display: flex;

    svg {
        margin: 4px 12px 0 0;
    }

    div {
        flex: 1;

        p {
            margin-top: 4px;
            font-size: 14px;
            opacity: 0.8;
            line-height: 20px;
        }
    }

    button {
        position: absolute;
        right: 2px;
        top: 12px;
        opacity: 0.6;
        border: 0;
        background: transparent;
        color: inherit;
    }

    ${(props) =>
        !props.hasDescription &&
        css`
            align-items: center;

            svg: {
                margin-top: 0;
            }
        `}
`;
