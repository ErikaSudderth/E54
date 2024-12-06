function Dashboard() {
  return (
    <div className="dashboard" role="main">
      <h1 tabIndex="0">Dashboard</h1>

      <section aria-labelledby="summary_heading">
        <h2 id="summary_heading">Project Summary</h2>
        <p id="summary_paragraph">
          The blog post I used to find an article for this project listed 17 of
          the top innovations in healthcare for 2024. The site based these
          rankings on interactions and view data from a partner site that allows
          industries to partner with academics and researchers. The post also
          posted a graph showing how many of these top innovations were in
          certain geographical areas. The number one top innovation listed was
          “A new enzyme-based method for treating biofilm-associated infections”
          from a university in the United States. From there I found an article
          about this innovation. The article essentially states that there was
          the new development of a combination of certain enzymes that can
          degrade EPS biofilms that otherwise interfere with chronic wound
          healing due to antibiotic resistance. Chronic wounds are more likely
          to be infected by pathogens that can create EPS (extracellular
          polymeric substance). EPS makes a biofilm more antibiotic resistant.
          The article lists all the ways researchers treated biofilms in vitro
          (cells alone) and in vivo (in animal models). It was found that
          Amylase and cellulase together can interfere with these biofilms and
          reduce biomass and make bacteria present more susceptible to
          antibiotics. This occurred more in the models treated with a
          combination of these glycoside hydrolases rather than either one alone
          or the control.
        </p>
      </section>

      <section aria-labelledby="reference_heading">
        <h2 id="reference_heading">References</h2>
        <p id="reference_paragraph">
          Reference URLs:
          <a
            href="https://www.inpart.io/blog/17-top-healthcare-innovations-2023"
            target="_blank"
            rel="noopener noreferrer"
          >
            Top Healthcare Innovations
          </a>
          ,&nbsp;
          <a
            href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5278739/#:~:text=Glycoside%20hydrolase%20therapy%20increases%20antibiotic,dwelling%20bacteria%20adopt%20(32)."
            target="_blank"
            rel="noopener noreferrer"
          >
            Glycoside Hydrolase Therapy Article
          </a>
        </p>
      </section>

      <section aria-labelledby="technical_heading">
        <h2 id="technical_heading">Technical Aspects</h2>
        <p id="technical_paragraph">
          This project was created using React, MongoDB, NodeJS, JavaScript,
          HTML, CSS. The backend and frontend are completely separate, but
          hosted on the same server instance. The MongoDB database used is
          hosted on DigitalOcean, just like the rest of the project.
        </p>
      </section>
    </div>
  );
}

export default Dashboard;
