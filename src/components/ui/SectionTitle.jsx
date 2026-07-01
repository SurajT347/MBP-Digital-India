export default function SectionTitle({ label, title, subtitle, light }) {
  return (
    <div className="text-center mb-14">
      {label && (
        <span className={`text-xs font-semibold tracking-widest uppercase ${light ? 'text-brand-accent' : 'text-brand-sky'}`}>
          {label}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl font-bold mt-2 ${light ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 max-w-2xl mx-auto text-sm md:text-base ${light ? 'text-blue-200' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}