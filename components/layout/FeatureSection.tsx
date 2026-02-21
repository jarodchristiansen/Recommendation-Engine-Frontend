import Image from "next/legacy/image";

type FeatureProps = {
  title: string;
  description: string;
  icon?: string;
};

const FeatureSection = ({ title, description, icon = "" }: FeatureProps) => {
  return (
    <div className="text-center bg-surface border border-slate-200 p-8 rounded-lg shadow-sm hover:border-accent/30 hover:shadow-md transition-all duration-200">
      {/* Add an icon here */}
      <div className="mb-4">
        <Image
          src={icon}
          alt={`${title} icon`}
          width={50}
          height={50}
          className="mx-auto h-20 w-20"
        />
      </div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-slate-600 font-normal">{description}</p>
    </div>
  );
};

export default FeatureSection;
