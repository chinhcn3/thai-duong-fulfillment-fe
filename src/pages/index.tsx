import { LayoutItem } from "@/containers/layout/layout";
import { ReactElement } from "react";
import { HomeContainer } from "@/containers/home/home-container";

export default function Home() {
  return <HomeContainer />;
}

Home.getLayout = (page: ReactElement) => {
  return <LayoutItem>{page}</LayoutItem>;
};
