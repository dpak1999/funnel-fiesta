import BlurPage from "@/components/global/blur-page";
import { FC, ReactNode } from "react";

interface PipelinesLayoutProps {
  children: ReactNode;
}

const PipelinesLayout: FC<PipelinesLayoutProps> = ({ children }) => {
  return <BlurPage>{children}</BlurPage>;
};

export default PipelinesLayout;
