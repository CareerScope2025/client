import { BrowserRouter } from "router2";

import { Auth } from "~/hoc/auth";
import { Space } from "~/pages/space";
export const App = () => {
  return (
    <Auth>
      <BrowserRouter
        routes={{
          "/": () => <Space />,
          "/404": () => "",
        }}
      />
    </Auth>
  );
};
