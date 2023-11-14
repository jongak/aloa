const PopUp = function (props) {
  const { isActive, body } = props;
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="d-flex justify-content-center align-items-center w-100"
    >
      <div
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <img src="..." className="rounded me-2" alt="..." />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">Hello, world! This is a toast message.</div>
      </div>
    </div>
  );
};
export default PopUp;
