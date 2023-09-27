import './ErrorBox.css';

interface ErrorBoxProps {
    errorMessage: string;
}

const ErrorBox = ({ errorMessage }: ErrorBoxProps) => {
    return (
        <div className="error-box">
            <div className="error-box__header">
                <img
                    className="error-box__icon"
                    src="/images/thunder.svg"
                    alt="error-icon"
                />
            </div>
            <div className="error-box__body">
                <span>{errorMessage}</span>
            </div>
        </div>
    );
};

export default ErrorBox;
