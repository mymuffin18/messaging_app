import dynamic from "next/dynamic";
import App from "./components/App";

const DynamicAppWithNoSSR = dynamic(() => import("./components/App"), {
  ssr: false,
  loading: () => <p>loading...</p>,
});
export default function Home() {
  return <DynamicAppWithNoSSR />;
}
