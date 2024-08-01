import { GrowthChart } from "@/components/growthchart/growth-chart";
import { Report } from "@/components/reportcharts/report";
import Layout from "@/layout";
import Image from "next/image";

export default function Home() {
  return <Layout>
      <Report/>
      <GrowthChart/>
     </Layout>;
}
