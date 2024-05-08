import { Button, Layout } from "antd";
import { navigateToUrl } from "single-spa";
import { App } from "./App";
const { Header, Content } = Layout;
import { initContext } from "@mf/core";
import { servicesContainer } from "./services.provider";

export default () => {
  const { CoreProvider } = initContext(servicesContainer);
  return function () {
    return (
      <CoreProvider>
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
      </CoreProvider>
    );
  };
};

export const terminate = () => {};
