import Button from "@/components/layout/Button";

type SectionProps = {
  title: string;
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
  children: React.ReactNode;
};

/* Reusable Section Component */
const Section = ({ title, toggle, setToggle, children }: SectionProps) => (
  <section className="mb-12">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Button onClick={() => setToggle(!toggle)}>
        {toggle ? "Hide" : "Show"}
      </Button>
    </div>
    {toggle && <div className="mt-6">{children}</div>}
  </section>
);

export default Section;
