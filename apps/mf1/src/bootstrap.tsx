import { Button, Layout } from "antd";
import { navigateToUrl } from "single-spa";
import { App } from "./App";
const { Header, Content } = Layout;

export default () => {
  return function () {
    return (
      <Layout className="h-100">
        <Header>
          <Button onClick={() => navigateToUrl("/")}>Back to board</Button>
        </Header>
        <Layout>
          <Content style={{ overflow: "auto", padding: "20px" }}>
            <App />
          </Content>
        </Layout>
      </Layout>
    );
  };
};

export const terminate = () => {};
