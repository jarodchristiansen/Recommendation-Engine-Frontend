import Image from "next/image";

type TestimonialProps = {
  quote: string;
  name: string;
  avatar: string;
};

const Testimonial = ({ quote, name, avatar }: TestimonialProps) => {
  return (
    <div className="text-center p-6 bg-surface rounded-lg shadow-md">
      <Image
        src={avatar}
        alt={`${name} avatar`}
        width={96}
        height={96}
        className="mx-auto rounded-full mb-4"
        unoptimized
      />
      <p className="italic mb-4">{quote}</p>
      <h4 className="font-bold">{name}</h4>
    </div>
  );
};

export default Testimonial;
