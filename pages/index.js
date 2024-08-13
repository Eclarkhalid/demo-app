import Image from "next/image";
import { Inter } from "next/font/google";
import FinancialDashboard from "@/components/dashboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <>
    <FinancialDashboard />
  </>
}
