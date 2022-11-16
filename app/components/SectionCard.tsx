type SectionCardParams = {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  text: string;
};

export default function SectionCard({ image, title, text }: SectionCardParams) {
  return (
    <section className="relative h-full overflow-hidden rounded-md p-6 shadow-lg">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={image.src}
        alt={image.alt}
      />
      <div className="absolute inset-0 h-full w-full bg-[rgba(21,49,36,0.74)] mix-blend-multiply"></div>
      <div className="z-1 relative mx-auto max-w-lg">
        <h3 className="mb-4 text-2xl font-bold text-white">{title}</h3>
        <div className="text-white opacity-80">{text}</div>
      </div>
    </section>
  );
}
