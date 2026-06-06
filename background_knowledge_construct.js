/* ============================================================================
   BACKGROUND KNOWLEDGE CONSTRUCT
   L2 reading study — postwar German-language short prose (c. 1945–1965)
   Corpus: Böll "Mein teures Bein"; Borchert "Nachts schlafen die Ratten doch"
           & "Schischyphusch"; Fussenegger "Dame am Steuer"

   Theoretical frame: Bernhardt (2011) Compensatory Model. This construct pulls
   background knowledge OUT of the model's unexplained ~50% and gives it a
   measured coefficient, alongside L2 vocabulary (VLT-German) and L1 literacy.

   Structure:
     Block 1 — TESTED knowledge (objective, scored against an expert key)
        1a. Historical knowledge        (period, NOT the texts)
        1b. Literary-historical / genre (Kurzgeschichte as the through-line)
        1c. Author Recognition Test     (breadth-of-exposure, ART-style)
     Block 2 — SELF-REPORT familiarity  (Likert; compare vs. tested per Umek 2023)

   DESIGN RULES enforced here:
     * Runs BEFORE the reading trials.
     * Every tested item is passage-INDEPENDENT (answerable/not without the texts).
     * Item order randomized within each block.
     * The name→tier/foil and item→key mappings live in ANALYSIS code, not in
       participant-facing labels. Score in R from raw responses.
     * Stems marked "STUB" are placeholders to be finalized with content
       experts; the STRUCTURE is real and runnable.

   Requires jsPsych v7+ and plugins:
     survey-multi-choice, survey-multi-select, survey-likert, instructions
   ============================================================================ */


/* ----------------------------------------------------------------------------
   Utility: Fisher–Yates shuffle (returns a new array; does not mutate input)
   ---------------------------------------------------------------------------- */
function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


/* ============================================================================
   BLOCK 1a — HISTORICAL KNOWLEDGE
   Period knowledge (postwar German-speaking world). Deliberately about the
   ERA, never about anything stated in the four stories (passage-independence).
   Correct-answer key is NOT stored here — see the R scoring file.
   ============================================================================ */

const hist_items = [
  {
    name: "hist_division",
    prompt: "After 1945, Germany was divided into occupation zones administered by which powers?", // STUB
    options: [
      "The United States, Britain, France, and the Soviet Union",
      "The United States, Britain, and France only",
      "Britain, France, and the Soviet Union only",
      "The United Nations as a single administration"
    ]
  },
  {
    name: "hist_denazification",
    prompt: "The postwar process aimed at removing National Socialist influence from public life was known as:", // STUB
    options: [
      "Denazification (Entnazifizierung)",
      "Reunification (Wiedervereinigung)",
      "Reparation (Wiedergutmachung)",
      "Restoration (Restauration)"
    ]
  },
  {
    name: "hist_wirtschaftswunder",
    prompt: "The term \"Wirtschaftswunder\" refers to:", // STUB
    options: [
      "West Germany's rapid economic recovery in the 1950s",
      "The currency collapse immediately after the war",
      "The division of Berlin in 1961",
      "The Marshall Plan's rejection by Germany"
    ]
  },
  {
    name: "hist_everyday_4548",
    prompt: "In the immediate postwar years (1945–48), daily life in German cities was most characterized by:", // STUB
    options: [
      "Housing shortages, rationing, and ruined cityscapes",
      "Rapid suburban expansion and consumer abundance",
      "Mass tourism and cultural festivals",
      "Full employment and rebuilt infrastructure"
    ]
  }
];

const block1a_hist = {
  type: jsPsychSurveyMultiChoice,
  preamble: `<div style="max-width:640px;text-align:left;margin:0 auto;">
    <h3>Part 1 of 4 — Historical background</h3>
    <p>Please answer the following questions as best you can. If you are unsure,
    choose the option you think most likely. There is no penalty for wrong answers.</p></div>`,
  // Randomize item order; options stay fixed per item (key maps to text, not position)
  questions: shuffle(hist_items).map(it => ({
    prompt: it.prompt,
    options: it.options,
    required: true,
    name: it.name
  })),
  data: { block: "bk_hist" }
};


/* ============================================================================
   BLOCK 1b — LITERARY-HISTORICAL / GENRE KNOWLEDGE
   Spine = the Kurzgeschichte (the actual through-line across all four texts).
   Trümmerliteratur is ONE item, not the organizing frame. Gruppe 47 included
   precisely because a knowledgeable reader knows it does NOT cover the
   Austrian author (Fussenegger).
   ============================================================================ */

const litgenre_items = [
  {
    name: "lit_kurzgeschichte",      // load-bearing item: the shared form
    prompt: "Which of the following is most characteristic of the German Kurzgeschichte as it developed after 1945?", // STUB
    options: [
      "An abrupt opening and an open ending, with everyday subject matter",
      "A long, ornate frame narrative with a clear moral resolution",
      "A verse form organized into regular stanzas",
      "A multi-generational plot spanning several decades"
    ]
  },
  {
    name: "lit_period_situation",   // framed to span German AND Austrian contexts
    prompt: "German-language short prose of the early postwar period (later 1940s–1950s) is generally understood as:", // STUB
    options: [
      "Writing responding to the war's aftermath, often in a spare, direct style",
      "A revival of 19th-century Romantic nature poetry",
      "Experimental concrete poetry with no narrative content",
      "Court drama written for the aristocracy"
    ]
  },
  {
    name: "lit_truemmerliteratur",  // ONE item — not the frame
    prompt: "The term \"Trümmerliteratur\" (rubble literature) refers to:", // STUB
    options: [
      "One current of early postwar writing depicting war-ruined cities and survival",
      "A movement of pre-war avant-garde manifestos",
      "A genre of medieval ruin poetry",
      "Postwar Austrian nature writing"
    ]
  },
  {
    name: "lit_gruppe47",           // relevant background; explicitly NOT all-encompassing
    prompt: "Gruppe 47 is best described as:", // STUB
    options: [
      "An influential postwar West German literary association and meeting",
      "An Austrian state literary academy founded in the 1800s",
      "A publishing house specializing in poetry",
      "A government censorship board"
    ]
  }
];

const block1b_litgenre = {
  type: jsPsychSurveyMultiChoice,
  preamble: `<div style="max-width:640px;text-align:left;margin:0 auto;">
    <h3>Part 2 of 4 — Literary and genre background</h3>
    <p>These questions ask about the kind of literature and the literary period
    in general. Choose the best answer; if unsure, give your best estimate.</p></div>`,
  questions: shuffle(litgenre_items).map(it => ({
    prompt: it.prompt,
    options: it.options,
    required: true,
    name: it.name
  })),
  data: { block: "bk_litgenre" }
};


/* ============================================================================
   BLOCK 1c — AUTHOR RECOGNITION TEST (breadth-of-exposure)
   ART-style checklist. Score = real hits − false alarms (computed in R).
   Tier 1 = corpus authors + early-postwar German-language prose (incl. the
   Austrian Fussenegger and the comic-tragic Borchert pieces — NOT a rubble
   label). Tier 2 = broader 20th-c. canon. Tier 3 = high-recognition anchors
   (effort check, kept OUT of the main score). Foils = vetted invented names.
   Only the `name` strings are shown; tier/foil status lives in R.
   ============================================================================ */

const art_names = [
  // Tier 1 — corpus authors + early-postwar German-language prose
  "Heinrich Böll", "Wolfgang Borchert", "Gertrud Fussenegger", "Günter Eich",
  "Ilse Aichinger", "Alfred Andersch", "Wolfdietrich Schnurre", "Heinz Rein",
  "Hans Werner Richter",
  // Tier 2 — broader 20th-c. German canon
  "Thomas Mann", "Bertolt Brecht", "Hermann Hesse", "Günter Grass", "Christa Wolf",
  // Tier 3 — high-recognition anchors / effort check
  "Franz Kafka", "Johann Wolfgang von Goethe",
  // Foils — invented, vetted (re-vet close to launch)
  "Helmut Vossberg", "Dietrich Kallweit", "Friedrich Ammann", "Reinhard Steegmann",
  "Bernhard Oltmanns", "Konrad Wielandt", "Ernst Hagemeier", "Gustav Reinholt",
  "Otto Frühwald", "Werner Bleeker"
];

const block1c_art = {
  type: jsPsychSurveyMultiSelect,
  preamble: `<div style="max-width:640px;text-align:left;margin:0 auto;">
    <h3>Part 3 of 4 — Author recognition</h3>
    <p>Below is a list of names. Some are real authors; some are not.
    Check the box next to <strong>every name you recognize as a real author</strong>.</p>
    <p><strong>Please do not guess.</strong> Some names are not real authors, and
    checking names you do not actually recognize will lower the accuracy of your
    responses. It is completely fine to check only a few — or none.</p></div>`,
  questions: [{
    prompt: "Which of these do you recognize as real authors?",
    options: shuffle(art_names),   // randomized; real/fake NOT clustered
    horizontal: false,
    required: false,
    name: "ART"
  }],
  data: { block: "bk_art" }
};


/* ============================================================================
   BLOCK 2 — SELF-REPORT FAMILIARITY (Likert)
   Parallel to the tested battery so you can replicate the tested-vs-self-report
   contrast (Umek 2023). One column per item + a mean, computed in R.
   ============================================================================ */

const selfreport_items = [
  "your familiarity with German history of the postwar period (roughly 1945–1965)",            // STUB
  "your familiarity with German-language literature of that period",                            // STUB
  "your familiarity with the short-story (Kurzgeschichte) form",                                // STUB
  "your familiarity with the specific authors in this study (e.g., Böll, Borchert, Fussenegger)" // STUB
];

const likert_scale = [
  "1 — Not at all familiar",
  "2 — Slightly familiar",
  "3 — Moderately familiar",
  "4 — Very familiar",
  "5 — Extremely familiar"
];

const block2_selfreport = {
  type: jsPsychSurveyLikert,
  preamble: `<div style="max-width:640px;text-align:left;margin:0 auto;">
    <h3>Part 4 of 4 — How familiar are these topics to you?</h3>
    <p>For each item, rate how familiar you feel the topic is to you personally.
    There are no right or wrong answers — we are only interested in your own sense
    of familiarity.</p></div>`,
  questions: shuffle(selfreport_items).map((stem, i) => ({
    prompt: `Please rate ${stem}.`,
    labels: likert_scale,
    required: true,
    name: `selfrep_${i}`   // NOTE: index is post-shuffle; store stem→name map if you
                           // need item-level alignment. Safer alternative below.
  })),
  data: { block: "bk_selfreport" }
};

/* Safer self-report variant: keep stable names tied to content, shuffle a paired
   array so the name always matches the stem regardless of presentation order. */
const selfreport_keyed = [
  { name: "selfrep_history", stem: "your familiarity with German history of the postwar period (roughly 1945–1965)" },
  { name: "selfrep_litperiod", stem: "your familiarity with German-language literature of that period" },
  { name: "selfrep_genre",   stem: "your familiarity with the short-story (Kurzgeschichte) form" },
  { name: "selfrep_authors", stem: "your familiarity with the specific authors in this study (e.g., Böll, Borchert, Fussenegger)" }
];

const block2_selfreport_safe = {
  type: jsPsychSurveyLikert,
  preamble: block2_selfreport.preamble,
  questions: shuffle(selfreport_keyed).map(it => ({
    prompt: `Please rate ${it.stem}.`,
    labels: likert_scale,
    required: true,
    name: it.name           // stable, content-tied name regardless of order
  })),
  data: { block: "bk_selfreport" }
};


/* ============================================================================
   INTRO + ASSEMBLY
   Push these onto your timeline BEFORE the reading trials. Use the *_safe
   self-report variant (stable content-tied names). Block ORDER: tested blocks
   first, self-report last, so a self-rating can't prime the tested items.
   ============================================================================ */

const bk_intro = {
  type: jsPsychInstructions,
  pages: [
    `<div style="max-width:640px;text-align:left;margin:0 auto;">
      <h2>Before you begin reading</h2>
      <p>First, a short set of background questions (about 6 minutes). They ask
      about history, literature, and authors. Some you may know well; others you
      may not — that is expected and completely fine. Please answer on your own,
      without looking anything up.</p>
      <p>Click “Next” to begin.</p></div>`
  ],
  show_clickable_nav: true,
  data: { block: "bk_intro" }
};

/* Example timeline assembly (adapt names to your experiment file):

   const background_knowledge_battery = [
     bk_intro,
     block1a_hist,
     block1b_litgenre,
     block1c_art,
     block2_selfreport_safe
   ];

   // timeline = [ ...consent, demographics,
   //              ...background_knowledge_battery,   // <-- BEFORE reading
   //              vlt_german,                        // L2 vocabulary measure
   //              ...reading_trials, ...recall, ... ];

   Export named handles if you use modules:
*/
window.bk_battery = {
  bk_intro,
  block1a_hist,
  block1b_litgenre,
  block1c_art,
  block2_selfreport: block2_selfreport_safe
};
