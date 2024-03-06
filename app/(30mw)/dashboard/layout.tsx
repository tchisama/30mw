
import AuthDashboardProvider from "@/components/30mw components/providers/AuthDashboardProvider";
import { ReactNode } from "react"; 

type Props = {
  children: ReactNode
}

export default function Layout({children}: Props) {
  return (
    <AuthDashboardProvider>
          {children}
    </AuthDashboardProvider>
  )
}