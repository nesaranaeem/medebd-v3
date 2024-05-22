import Footer from "@/components/footer/Footer";
import NavBar from "@/components/menu/header/NavBar";
import SearchMenu from "@/components/menu/searchMenu/SearchMenu";

export default function MainLayout({ children }) {
  return (
    <>
      <div className="sticky top-0 z-50" id="top">
        <NavBar />
      </div>
      <SearchMenu />
      <main className="bg-white py-5 text-black">{children}</main>

      <Footer />
    </>
  );
}
