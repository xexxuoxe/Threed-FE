import React from 'react';
import styles from './loading.module.scss';

interface FullPageLoadingProps {
    text?: string;
}

const FullPageLoading: React.FC<FullPageLoadingProps> = ({ text = 'Loading...' }) => {
    return (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div className={styles.loadingWrapper}>
                <div className={styles.spinner}></div>
                {text && <p className={styles.loadingText}>{text}</p>}
            </div>
        </div>
    );
};

export default FullPageLoading;