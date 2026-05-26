const newFeatures = [
  {
    title: "Highly Qualified and Experienced Team",
    desc: "In our physiotherapy clinic, we have certified physiotherapists who have a good practical experience. We incorporate clinical knowledge with caring support to achieve recovery in case of sports injuries and posture correction.",
    icon: "groups",
  },
  {
    title: "Customized Treatment Plans",
    desc: "Being a trusted rehabilitation and physiotherapy center, we develop an individualized treatment plan which will depend on your condition, lifestyle and recovery objectives which will help to guarantee more successful and faster healing.",
    icon: "assignment",
  },
  {
    title: "Advanced Equipment & Techniques",
    desc: "We are known to be one of the best physiotherapy clinics and therefore we employ modern equipment and effective methods of providing safe, efficient, and result oriented treatments to all our patients.",
    icon: "fitness_center",
  },
  {
    title: "Holistic and Preventive Approach",
    desc: "Our physiotherapy clinic is concerned with the treatment of root causes rather than symptoms. Our focus is on prevention and patient education to recover in the long run.",
    icon: "self_improvement",
  },
  {
    title: "Warm, Welcoming Environment",
    desc: "We have a relaxed and welcoming environment at our physiotherapy rehabilitation centre in which all the patients feel respected and valued.",
    icon: "sentiment_satisfied",
  },
  {
    title: "Proven Results and Happy Clients",
    desc: "Being the best physiotherapy clinic, people trust us and a number of satisfied clients trust us. The positive feedback, repeat visits and good patient referral are our outcomes.",
    icon: "thumb_up",
  },
];

const WhyChooseUs = () => (
  <section id="whychooseus" className="py-20 px-6 lg:px-10 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
      <div className="flex flex-col gap-8">
        <h2 className="text-4xl font-black text-slate-900">Why Choose Us</h2>
        <div className="space-y-6">
          {newFeatures.map((f, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-200 bg-white">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-primary font-bold">
                <span className="material-symbols-outlined text-2xl">
                  {f.icon}
                </span>
              </div>
              <div>
                <h3 className="font-bold">{f.title}</h3>
                <p className="text-sm text-slate-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnMHvuKg0QuL5C26cMb51bcMJKos4r9NWhBD0c-8uksxYpdnQ6vmSwGQ39qZrVCPjUiq2Pny8qjko3iwD6BDq5HlCcLN8jJI4L3H_Uy37fTNl3zYD6lgMu1seFF36WW9g9dMHgYwK7ObkdKPUzl1nJOZxL_RM-S1pq4usqXh9Dj5hcccYbEFZYCwLjxLGD0h-fAdK6DWHakiKU4qScg9800Z7Sew4bNr1ZA9w7hu6b-bgsaBv9aE8Y-0CJpANSzjAyMLiIkgN__oAs" className="h-64 w-full rounded-2xl object-cover mt-12" alt="Therapy" />
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdvbGgwqpcgJJQk7L_YErnJix_bFmcsC7uZ0exwPbfAR-2_iiQO7Eg093yi7esk66t-cF_D4uBjqmZG8O9AlFaElp2wZNbH8o5mdxgUmPLuLs1BTkgSE-Iy-ZFa2vxUrkslnRQLMsbcNv-x1i-KUw9sX3EoLfS9yxo00RoowagoQWLs_zzoN52OiTkjN29asrq1Z-1dHQpe45HndfZA6aGBC_wUvovyWHv35UHRZ2Femu6mU9an-O4NUJO9kQY_6RIqSfqyH1Heb1F" className="h-64 w-full rounded-2xl object-cover" alt="Rehab" />
      </div>
    </div>
  </section>
);

export default WhyChooseUs;