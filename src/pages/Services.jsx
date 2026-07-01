import SectionTitle from '../components/ui/SectionTitle'

const services = [
  { icon: '🤖', title: 'Artificial Intelligence', desc: 'Harnessing AI to enhance decision-making and automate processes.' },
  { icon: '☁️', title: 'Cloud', desc: 'Scalable cloud solutions to optimize your infrastructure.' },
  { icon: '🌐', title: 'Internet of Things', desc: 'Connecting devices to streamline operations and improve efficiency.' },
  { icon: '⚙️', title: 'DevOps', desc: 'Integrating development and operations for faster delivery.' },
  { icon: '🔒', title: 'Cybersecurity', desc: 'Protecting your assets with robust cybersecurity measures.' },
  { icon: '📊', title: 'Data Analytics', desc: 'Turning data into actionable insights for informed decisions.' },
  { icon: '🏢', title: 'SAP', desc: 'Comprehensive SAP solutions for enhanced business performance.' },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="What We Do"
          title="Our Services"
          subtitle="From AI-driven automation to enterprise SAP deployments — we've got you covered."
          light
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map(s => (
            <div key={s.title}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300">
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-semibold text-white text-lg mb-2">{s.title}</h3>
              <p className="text-blue-200 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}