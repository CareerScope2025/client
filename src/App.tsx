import { BrowserRouter } from "router2";

import { Space } from "~/pages/space";
export const App = () => {
  return (
    <BrowserRouter
      routes={{
        "/": () => <Space />,
        "/404": () => "",
      }}
    />
  );
};
