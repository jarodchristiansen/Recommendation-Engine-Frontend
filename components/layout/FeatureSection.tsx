import Image from "next/legacy/image";

type FeatureProps = {
  title: string;
  description: string;
  icon?: string;
};

const FeatureSection = ({ title, description, icon = "" }: FeatureProps) => {
  return (
    <div className="flex flex-col bg-white border border-slate-200 p-7 rounded-xl shadow-sm hover:border-accent/40 hover:shadow-md transition-all duration-200 group">
      {/* Icon in tinted circle */}
      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-200 flex-shrink-0">
        <Image
          src={icon}
          alt=""
          width={24}
          height={24}
          className="w-6 h-6"
          aria-hidden
        />
      </div>
      <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureSection;
