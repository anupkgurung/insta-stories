function ErrorMessage({ message }) {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <p style={{ color: "red" }}>Error: {message}</p>
    </div>
  );
}

export default ErrorMessage;
