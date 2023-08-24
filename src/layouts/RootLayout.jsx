import Sidebar from "./sidebar/Sidebar";

function RootLayout({ children }) {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <main className=" w-[100%] ">{children}</main>
    </div>
  );
}

export default RootLayout;
