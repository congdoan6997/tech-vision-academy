import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import React from "react";

const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col ">
      <Header />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default InstructorLayout;
