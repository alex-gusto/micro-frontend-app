import { Button, Flex, Layout } from "antd";
import { navigateToUrl } from "single-spa";
import { App } from "./App";
const { Header, Content } = Layout;
import { initContext, AppVersion } from "@mf/core";
import { servicesContainer } from "./services.provider";

export default () => {
  const { CoreProvider } = initContext(servicesContainer);
  return function () {
    return (
      <CoreProvider>
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
      </CoreProvider>
    );
  };
};

export const terminate = () => {};
