import Image from "next/legacy/image";

type FeatureProps = {
  title: string;
  description: string;
  icon?: string;
};

const FeatureSection = ({ title, description, icon = "" }: FeatureProps) => {
  return (
    <div className="text-center bg-gray-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Add an icon here */}
      <div className="mb-4">
        <Image
          src={icon}
          alt={`${title} icon`}
          width={50}
          height={50}
          className="mx-auto h-18 w-18"
        />
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 font-medium">{description}</p>
    </div>
  );
};

export default FeatureSection;
