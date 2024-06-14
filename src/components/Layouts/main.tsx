import Footer from "../Footer";
import Header from "../Header";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-col">
        {children}
        <Footer />
      </div>
    </div>
  );
}
