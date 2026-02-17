import "./ErrorMessage.css";

interface ErrorMessageProps {
	message: string;
	title?: string;
}

export function ErrorMessage({ message, title = "Something went wrong" }: ErrorMessageProps) {
	return (
		<div className="error-message" role="alert">
			<div className="error-message__title">{title}</div>
			<div className="error-message__body">{message}</div>
		</div>
	);
}
