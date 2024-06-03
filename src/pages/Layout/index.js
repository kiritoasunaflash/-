import { Button } from "antd-mobile";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Outlet />
      <div>
        <Button color="primary" className="purple">
          局部
        </Button>
        我是Layout
      </div>
    </div>
  );
};
export default Layout;
