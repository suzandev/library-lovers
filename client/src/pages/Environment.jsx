export default function Environment() {
  const blogPost = {
    title: "Example Blog Post",
    description:
      " Mystery Novel: The Enigmatic Conundrum: Uncover the secrets of a small, mysterious town in this gripping mystery novel. Follow Detective Sarah Brooks as she unravels a web of deception, deceit, and unexpected twists. Can she solve the enigmatic conundrum that has baffled the town for decades?. The Enigmatic Conundrum: Uncover the secrets of a small, mysterious town in this gripping mystery novel. Follow Detective Sarah Brooks as she unravels a web of deception, deceit, and unexpected twists. Can she solve the enigmatic conundrum that has baffled the town for decades?. The Enigmatic Conundrum: Uncover the secrets of a small, mysterious town in this gripping mystery novel. Follow Detective Sarah Brooks as she unravels a web of deception, deceit, and unexpected twists. Can she solve the enigmatic conundrum that has baffled the town for decades?. The Enigmatic Conundrum: Uncover the secrets of a small, mysterious town in this gripping mystery novel. Follow Detective Sarah Brooks as she unravels a web of deception, deceit, and unexpected twists. Can she solve the enigmatic conundrum that has baffled the town for decades?. The Enigmatic Conundrum: Uncover the secrets of a small, mysterious town in this gripping mystery novel. Follow Detective Sarah Brooks as she unravels a web of deception, deceit, and unexpected twists. Can she solve the enigmatic conundrum that has baffled the town for decades?. The Enigmatic Conundrum: Uncover the secrets of a small, mysterious town in this gripping mystery novel. Follow Detective Sarah Brooks as she unravels a web of deception, deceit, and unexpected twists. Can she solve the enigmatic conundrum that has baffled the town for decades?. The Enigmatic Conundrum: Uncover the secrets of a small, mysterious town in this gripping mystery novel. Follow Detective Sarah Brooks as she unravels a web of deception, deceit, and unexpected twists. Can she solve the enigmatic conundrum that has baffled the town for decades?. The Enigmatic Conundrum: Uncover the secrets of a small, mysterious town in this gripping mystery novel. Follow Detective Sarah Brooks as she unravels a web of deception, deceit, and unexpected twists. Can she solve the enigmatic conundrum that has baffled the town for decades?",
    image:
      "https://images.unsplash.com/photo-1604361709763-44f7fc6dd075?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <section className="md:p-4">
      <div className="">
        <h1 className="text-brand-text my-8 text-center text-3xl font-bold">
          {blogPost.title}
        </h1>

        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="h-96 w-full object-cover object-center"
          />
          <div className="p-4">
            <p className="text-brand-text">{blogPost.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
