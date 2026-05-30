import { forwardRef } from 'react';
import pulmonaryImg from '../assets/pulmonary.jpeg';
import orthoImg from '../assets/ortho.jpeg';

const services = [
  { title: 'Cardio-pulmonary', desc: 'Heart and lung recovery', img: pulmonaryImg },
  { title: 'Orthopedic', desc: 'Bone and joint health', img: orthoImg },
  { title: 'Neuro', desc: 'Neurological rehab', img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800' },
  { title: 'Sports', desc: 'Athletic performance', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800' },
  { title: 'Pediatric', desc: 'Childhood development', img: 'https://images.unsplash.com/photo-1502781252888-9143ba7f074e?auto=format&fit=crop&q=80&w=800' },
];

const Services = forwardRef((props, ref) => (
  <section ref={ref} id="services" className="bg-slate-50 py-20 px-6 lg:px-10">
    <div className="mx-auto max-w-7xl">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-black lg:text-4xl">Our Specialized Services</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {services.map((service, index) => (
          <div key={index} className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 transition-all">
            <div 
              className="mb-6 aspect-square rounded-xl bg-cover bg-center group-hover:scale-105 transition-transform"
              style={{ backgroundImage: `url(${service.img})` }}
            />
            <h3 className="text-lg font-bold">{service.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
));

export default Services;