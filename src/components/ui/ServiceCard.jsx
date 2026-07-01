export default function ServiceCard({ icon: Icon, title, desc }) {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center mb-4 group-hover:bg-brand-sky transition-colors duration-300">
        <Icon className="w-6 h-6 text-brand-sky group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="font-display font-semibold text-brand-dark text-lg mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}