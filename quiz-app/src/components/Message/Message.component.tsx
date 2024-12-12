import "./message.styles.css"

interface MessageComponentProps {
    title?: string;
    subtitle?: string;
    message?: string;
}

const MessageComponent = ({title, subtitle, message}: MessageComponentProps) => {
    return (
        <section className="message-container">
            <h2 className="message__title">
                {title || ""} <span>{subtitle || ""}</span>
            </h2>
            <p className="message">{message || ""}</p>
        </section>
    );
};

export default MessageComponent;