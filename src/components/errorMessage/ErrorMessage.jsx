import img from './error.gif';

function ErrorMessage() {
    return (
        <img src={img} alt="Error" style={{ display:"block", objectFit: "contain", width: "20%", margin: "auto"}}/>
    );
}

export default ErrorMessage;