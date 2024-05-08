import type { AppConfig } from "@mf/shell";
import { Button, Layout, Menu, MenuProps, theme } from "antd";
import { Preview } from "./Preview";
import {
  lazy,
  ReactElement,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import { navigateToUrl } from "single-spa";
import { useNavigate, useSearchParams } from "react-router-dom";
import has from "lodash/has";
import _ from "lodash";

console.log(has({}, "foo"), _);

const { Header, Sider, Content } = Layout;

const PreviewMF1 = lazy(() =>
  import("@mf/mf1").then(({ Preview }) => ({ default: Preview }))
);

const PreviewMF2 = lazy(() =>
  import("@mf/mf2").then(({ Preview, getServices }) => {
    return {
      default: function () {
        const { TimelineService } = useMemo(() => getServices(), []);
        return <Preview items={TimelineService.get()} />;
      },
    };
  })
);

const previews: Record<string, ReactElement> = {
  "/": <Preview />,
  "/mf1": <PreviewMF1 />,
  "/mf2": <PreviewMF2 />,
};

type AppProps = {
  enabledApps: AppConfig[];
};

export function App({ enabledApps }: AppProps) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [params, setParams] = useSearchParams();
  const preview = params.has("mf") ? params.get("mf") : "/";

  const menuItems = useMemo(() => {
    return [
      {
        key: "/",
        label: "Home",
      },
      ...enabledApps.map(({ name, path }) => ({
        key: path,
        label: name,
      })),
    ];
  }, [enabledApps]);

  useEffect(() => {
    import("@mf/mf2").then(console.log);
  }, []);

  const onSelectMenu: MenuProps["onSelect"] = (e) => {
    const params = new URLSearchParams();
    if (e.key !== "/") {
      params.append("mf", e.key);
    }

    setParams(params);
  };

  const renderContent = () => {
    if (!preview) {
      return "Choose an app to preview";
    }

    return (
      <>
        {preview !== "/" ? (
          <Button onClick={() => navigateToUrl(preview)}>Go to app</Button>
        ) : null}
        <Suspense fallback={"Loading"}>{previews[preview]}</Suspense>
      </>
    );
  };

  return (
    <Layout className="h-100">
      <Sider collapsible>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={preview ? [preview] : undefined}
          onSelect={onSelectMenu}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}></Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}
