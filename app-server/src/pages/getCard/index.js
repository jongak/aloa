import { Outlet, useParams } from "react-router";

const GetCard = function () {
  const { id } = useParams();

  return (
    <div className="main-banner container">
      <div className="row justify-content-center">
        <Outlet />
      </div>
    </div>
  );
};

export default GetCard;
