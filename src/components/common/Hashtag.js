import "./Hashtag.css";

const Hashtag = ({ color, text }) => {
    return (
        <div className={["Hashtag", `Hashtag_${color}`].join(" ")}>{text}</div>
    );
};

export default Hashtag;