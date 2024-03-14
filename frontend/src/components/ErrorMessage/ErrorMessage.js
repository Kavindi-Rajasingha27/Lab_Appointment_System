const ErrorMessage = ({ errMessage }) => {
  return (
    <>
      <p className="text-danger" style={{ fontSize: 12 }}>
        {errMessage}
      </p>
    </>
  );
};

export default ErrorMessage;
