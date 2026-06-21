type StatusMessageProps = {
  type: 'loading' | 'error' | 'empty' | 'success';
  message: string;
};

export function StatusMessage({ type, message }: StatusMessageProps) {
  return <p className={`status-message ${type}`}>{message}</p>;
}
