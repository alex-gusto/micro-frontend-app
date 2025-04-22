import { Button, Flex, Layout } from "antd";
import { navigateToUrl } from "single-spa";
import { App } from "./App";
const { Header, Content } = Layout;
import { AppVersion } from "@mf/core";

export default () => {
  return function () {
    return (
      <Layout className="h-100">
        <Header>
          <Flex>
            <Button onClick={() => navigateToUrl("/")}>Back to board</Button>
            <AppVersion />
          </Flex>
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
