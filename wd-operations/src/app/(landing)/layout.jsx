import { LandingFooter } from "../../components/misc/footer";

const LandingLayout = ({ children }) => {
  return (
    <>
      <main className="h-full bg-[#020817] overflow-auto">
        <div className="w-full">{children}</div>
      </main>
      <LandingFooter />
    </>
  );
};

export default LandingLayout;
