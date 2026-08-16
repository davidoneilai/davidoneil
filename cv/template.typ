// Shared CV layout — navy editorial
#let cv(
  name: "",
  role: "",
  contacts: (),
  summary: "",
  experience: (),
  education: (),
  publications: (),
  skills: (),
  labels: (
    experience: "Experience",
    education: "Education",
    publications: "Publications",
    skills: "Skills",
  ),
  font-latin: "Helvetica",
  font-cjk: "Songti SC",
  lang: "en",
) = {
  set page(
    paper: "a4",
    margin: (top: 1.35cm, bottom: 1.35cm, left: 1.45cm, right: 1.45cm),
  )
  set text(
    font: (font-latin, font-cjk),
    size: 9.2pt,
    fill: rgb("#121820"),
    lang: lang,
  )
  set par(leading: 0.42em, spacing: 0.55em, justify: true)

  let section(title) = {
    v(0.55em)
    block(
      width: 100%,
      stroke: (bottom: 0.7pt + rgb("#0c1e36")),
      inset: (bottom: 0.28em),
      text(
        size: 9.5pt,
        weight: "bold",
        fill: rgb("#0c1e36"),
        tracking: 0.06em,
        upper(title),
      ),
    )
    v(0.35em)
  }

  align(center)[
    #text(size: 20pt, weight: "bold", fill: rgb("#0c1e36"), name)
    #v(0.15em)
    #text(size: 10pt, fill: rgb("#1a4a8a"), role)
    #v(0.35em)
    #text(size: 8.2pt, fill: rgb("#4a5563"), contacts.join("  ·  "))
  ]

  v(0.55em)
  summary

  section(labels.experience)
  for job in experience {
    block(breakable: false, spacing: 0.7em)[
      #grid(
        columns: (1fr, auto),
        text(weight: "bold", size: 9.6pt, fill: rgb("#0c1e36"), job.title),
        text(size: 8.2pt, fill: rgb("#5c6778"), job.at("period", default: "")),
      )
      #text(size: 8.6pt, fill: rgb("#1a4a8a"), job.org)
      #v(0.15em)
      #for b in job.bullets [
        #grid(
          columns: (0.7em, 1fr),
          gutter: 0.15em,
          text(fill: rgb("#1a4a8a"), "•"),
          b,
        )
      ]
    ]
  }

  section(labels.education)
  for e in education {
    grid(
      columns: (1fr, auto),
      [
        #text(weight: "bold", e.title)
        #linebreak()
        #text(size: 8.6pt, fill: rgb("#1a4a8a"), e.org)
        #if "note" in e [
          #linebreak()
          #text(size: 8.4pt, fill: rgb("#4a5563"), e.note)
        ]
      ],
      text(size: 8.2pt, fill: rgb("#5c6778"), e.period),
    )
  }

  section(labels.publications)
  for p in publications {
    block(spacing: 0.45em)[
      #text(weight: "bold", size: 8.8pt, p.title)
      #linebreak()
      #text(size: 8.2pt, fill: rgb("#1a4a8a"), p.venue)
    ]
  }

  section(labels.skills)
  for s in skills {
    block(spacing: 0.35em)[
      #text(weight: "bold", size: 8.6pt, fill: rgb("#0c1e36"), s.cluster + ": ")
      #text(size: 8.5pt, s.items.join(" · "))
    ]
  }
}
