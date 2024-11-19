import "./Hashtag.css";

const Hashtag = ({ isActive, onClick, text }) => {
    return (
        <div
            className={`Hashtag ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            {text}
        </div>
    );
};

export default Hashtag;