import Image from "next/image";

type TestimonialProps = {
  quote: string;
  name: string;
  avatar: string;
};

const Testimonial = ({ quote, name, avatar }: TestimonialProps) => {
  return (
    <div className="flex flex-col p-8 bg-surface rounded-xl shadow-sm border border-slate-200 hover:border-accent/30 hover:shadow-md transition-all duration-200">
      {/* Stars */}
      <div className="flex gap-0.5 mb-4" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20" aria-hidden>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.35 2.437c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.664 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.285-3.957z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="text-slate-700 leading-relaxed italic flex-1 mb-6">
        <span className="text-accent text-3xl font-serif leading-none mr-1 not-italic" aria-hidden>&ldquo;</span>
        {quote}
        <span className="text-accent text-3xl font-serif leading-none ml-1 not-italic" aria-hidden>&rdquo;</span>
      </p>

      {/* Attribution */}
      <div className="flex items-center gap-3 mt-auto">
        <Image
          src={avatar}
          alt={`${name} avatar`}
          width={40}
          height={40}
          className="rounded-full flex-shrink-0 ring-2 ring-slate-200"
          unoptimized
        />
        <span className="font-semibold text-primary text-sm">{name}</span>
      </div>
    </div>
  );
};

export default Testimonial;
