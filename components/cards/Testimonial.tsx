type TestimonialProps = {
  quote: string;
  name: string;
  avatar: string;
};

const Testimonial = ({ quote, name, avatar }: TestimonialProps) => {
  return (
    <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
      <img
        src={avatar}
        alt={`${name} avatar`}
        className="mx-auto h-16 w-16 rounded-full mb-4"
      />
      <p className="italic mb-4">{quote}</p>
      <h4 className="font-bold">{name}</h4>
    </div>
  );
};

export default Testimonial;
