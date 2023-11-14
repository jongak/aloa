const PopUp = function (props) {
  const { isActive, body } = props;
  return (
    <div
      className={
        isActive
          ? `toast toast-3s fade show toastPosition`
          : `toast toast-3s fade hide toastPosition`
      }
      role="alert"
      aria-live="assertive"
      data-delay="2000"
      aria-atomic="true"
    >
      <div className="toast-header" style={{ backgroundColor: "#22b3c1" }}>
        <img
          src="/assets/images/logo2.png"
          alt=""
          className={`img-fluid m-r-5 logoStyle`}
        />
        <strong className="mr-auto"></strong>
        <small className="text-muted"></small>
      </div>
      <div className="toast-body">
        <strong className="mr-auto">{body}</strong>
      </div>
    </div>
  );
};
export default PopUp;
