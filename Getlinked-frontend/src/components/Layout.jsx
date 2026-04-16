import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-3 sm:p-4 md:p-6">{children}</div>
    </div>
  );
}

export default Layout;
