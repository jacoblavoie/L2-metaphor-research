/* ============================================================================
   BACKGROUND KNOWLEDGE CONSTRUCT
   L2 reading study — postwar German-language short prose (c. 1945–1965)
   Corpus: Boell "Mein teures Bein"; Borchert "Nachts schlafen die Ratten doch"
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
     * OPTION order randomized within each question, per participant, so the
       correct answer is not always first. The correct answer is stored as a
       STRING on each item (`correct`) and surfaced in the block `data` as a
       name->correct map, so R scores by matching the recorded response TEXT
       (jsPsychSurveyMultiChoice records the option value/text, not its index).
       Position is therefore irrelevant to scoring.
     * The name->correct map lives in the block `data` for convenience, but the
       authoritative key should ALSO be kept in your R scoring file.
     * Stems are first-pass; finalize wording with content experts. The
       STRUCTURE is real and runnable.

   Requires jsPsych v7+/v8 and plugins:
     survey-multi-choice, survey-multi-select, survey-likert, instructions
   ============================================================================ */


/* ----------------------------------------------------------------------------
   Utility: Fisher-Yates shuffle (returns a new array; does not mutate input)
   ---------------------------------------------------------------------------- */
   function shuffle(array) {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  
  /* ----------------------------------------------------------------------------
     Utility: build a survey-multi-choice block from items that each carry a
     `correct` string. Item order is shuffled; OPTION order is shuffled per
     question. Returns { block, answerKey } where answerKey maps name->correct.
     The answer key is also embedded in block.data.answer_key for redundancy.
     ---------------------------------------------------------------------------- */
  function buildScoredMCBlock({ items, type, preamble, blockTag }) {
    const answerKey = {};
    items.forEach(it => { answerKey[it.name] = it.correct; });
  
    const questions = shuffle(items).map(it => {
      // sanity: the correct string must be present among the options
      if (!it.options.includes(it.correct)) {
        console.error(`[bk] item "${it.name}": correct answer not found in options.`);
      }
      return {
        prompt: it.prompt,
        options: shuffle(it.options),   // per-question option order, per participant
        required: true,
        name: it.name
      };
    });
  
    const block = {
      type,
      preamble,
      questions,
      // answer_key travels with the data so a CSV is self-describing; still keep
      // the authoritative key in R. correct_<name> columns are convenient for
      // a quick string-equality scoring pass.
      data: Object.assign(
        { block: blockTag, answer_key: JSON.stringify(answerKey) },
        Object.fromEntries(Object.entries(answerKey).map(([n, c]) => [`correct_${n}`, c]))
      )
    };
    return { block, answerKey };
  }
  
  
  /* ============================================================================
     BLOCK 1a — HISTORICAL KNOWLEDGE
     Period knowledge (postwar German-speaking world). Deliberately about the
     ERA, never about anything stated in the four stories (passage-independence).
     Distractors are plausible-but-wrong: each reflects a misconception a
     partially-informed reader might actually hold, not an obvious throwaway.
     ============================================================================ */
  
  const hist_items = [
    {
      name: "hist_division",
      prompt: "After 1945, Germany was divided into occupation zones administered by which powers?",
      correct: "The United States, Britain, France, and the Soviet Union",
      options: [
        "The United States, Britain, France, and the Soviet Union",
        "The United States, Britain, and the Soviet Union, with France joining only in 1949",
        "The United States and the Soviet Union, who split the country in two",
        "The United States, Britain, France, and Poland"
      ]
    },
    {
      name: "hist_denazification",
      prompt: "In the postwar years, the Allied program intended to remove National Socialist influence from public institutions and life was called:",
      correct: "Denazification (Entnazifizierung)",
      options: [
        "Denazification (Entnazifizierung)",
        "Reparation (Wiedergutmachung)",
        "Coming to terms with the past (Vergangenheitsbewaeltigung)",
        "Re-education (Umerziehung)"
      ]
    },
    {
      name: "hist_wirtschaftswunder",
      prompt: "The term \"Wirtschaftswunder\" is most closely associated with:",
      correct: "West Germany's rapid economic recovery and growth during the 1950s",
      options: [
        "West Germany's rapid economic recovery and growth during the 1950s",
        "The hyperinflation and currency collapse of the immediate postwar years",
        "The 1948 currency reform that introduced the Deutsche Mark",
        "East Germany's centrally planned industrial expansion"
      ]
    },
    {
      name: "hist_everyday_4548",
      prompt: "In the immediate postwar years (roughly 1945-48), everyday life in many German cities was most characterized by:",
      correct: "Housing shortages, food rationing, and widespread ruins",
      options: [
        "Housing shortages, food rationing, and widespread ruins",
        "Rising consumer prosperity and rebuilt city centers",
        "Mass emigration that left cities largely empty",
        "A return to prewar normality within a year or two"
      ]
    }
  ];
  
  
  /* ============================================================================
     BLOCK 1b — LITERARY-HISTORICAL / GENRE KNOWLEDGE
     Spine = the Kurzgeschichte (the actual through-line across all four texts).
     Truemmerliteratur is ONE item, not the organizing frame. Gruppe 47 included
     precisely because a knowledgeable reader knows it does NOT cover the
     Austrian author (Fussenegger).
     ============================================================================ */
  
  const litgenre_items = [
    {
      name: "lit_kurzgeschichte",
      prompt: "Which of the following is most characteristic of the German Kurzgeschichte as it developed after 1945?",
      correct: "An abrupt opening and an open ending, with everyday subject matter",
      options: [
        "An abrupt opening and an open ending, with everyday subject matter",
        "A framing narrator who introduces a self-contained moral tale",
        "An elaborate plot resolved by a decisive twist at the close",
        "A reflective, essayistic style with little narrative action"
      ]
    },
    {
      name: "lit_period_situation",
      prompt: "German-language short prose of the early postwar period (later 1940s-1950s) is generally understood as:",
      correct: "Writing responding to the war's aftermath, often in a spare, direct style",
      options: [
        "Writing responding to the war's aftermath, often in a spare, direct style",
        "A continuation of Weimar-era experimental modernism",
        "Politically committed socialist-realist fiction on the Soviet model",
        "Largely apolitical entertainment writing aimed at a mass market"
      ]
    },
    {
      name: "lit_truemmerliteratur",
      prompt: "The term \"Truemmerliteratur\" (rubble literature) refers to:",
      correct: "Early postwar writing depicting war-ruined cities and the struggle to survive",
      options: [
        "Early postwar writing depicting war-ruined cities and the struggle to survive",
        "Wartime propaganda produced under the National Socialist regime",
        "A 1960s movement that rejected all earlier postwar writing",
        "Nature writing that turned away from the war entirely"
      ]
    },
    {
      name: "lit_gruppe47",
      prompt: "Gruppe 47 is best described as:",
      correct: "An influential postwar West German circle of writers who met to read and critique new work",
      options: [
        "An influential postwar West German circle of writers who met to read and critique new work",
        "An official state literary academy that awarded national prizes",
        "An Austrian avant-garde movement founded in Vienna",
        "A publishing house that specialized in reprinting prewar classics"
      ]
    }
  ];
  
  
  /* ============================================================================
     Build the two scored multiple-choice blocks
     ============================================================================ */
  
  const _hist = buildScoredMCBlock({
    items: hist_items,
    type: jsPsychSurveyMultiChoice,
    blockTag: "bk_hist",
    preamble: `<div style="max-width:640px;text-align:left;margin:0 auto;">
      <h3>Part 1 of 4 — Historical background</h3>
      <p>Please answer the following questions as best you can. If you are unsure,
      choose the option you think most likely. There is no penalty for wrong answers.</p></div>`
  });
  const block1a_hist = _hist.block;
  
  const _litgenre = buildScoredMCBlock({
    items: litgenre_items,
    type: jsPsychSurveyMultiChoice,
    blockTag: "bk_litgenre",
    preamble: `<div style="max-width:640px;text-align:left;margin:0 auto;">
      <h3>Part 2 of 4 — Literary and genre background</h3>
      <p>These questions ask about the kind of literature and the literary period
      in general. Choose the best answer; if unsure, give your best estimate.</p></div>`
  });
  const block1b_litgenre = _litgenre.block;
  
  
  /* ============================================================================
     BLOCK 1c — AUTHOR RECOGNITION TEST (breadth-of-exposure)
     ART-style checklist. Score = real hits - false alarms (computed in R).
     Tier 1 = corpus authors + early-postwar German-language prose (incl. the
     Austrian Fussenegger and the comic-tragic Borchert pieces). Tier 2 = broader
     20th-c. canon. Tier 3 = high-recognition anchors (effort check, kept OUT of
     the main score). Foils = vetted invented names. Only the name strings are
     shown; tier/foil status lives in R. Options are already shuffled (real/fake
     not clustered).
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
     contrast (Umek 2023). Stable content-tied names; item order shuffled.
     ============================================================================ */
  
  const likert_scale = [
    "1 — Not at all familiar",
    "2 — Slightly familiar",
    "3 — Moderately familiar",
    "4 — Very familiar",
    "5 — Extremely familiar"
  ];
  
  const selfreport_keyed = [
    { name: "selfrep_history",   stem: "your familiarity with German history of the postwar period (roughly 1945-1965)" },
    { name: "selfrep_litperiod", stem: "your familiarity with German-language literature of that period" },
    { name: "selfrep_genre",     stem: "your familiarity with the short-story (Kurzgeschichte) form" },
    { name: "selfrep_authors",   stem: "your familiarity with the specific authors in this study (e.g., Böll, Borchert, Fussenegger)" }
  ];
  
  const block2_selfreport = {
    type: jsPsychSurveyLikert,
    preamble: `<div style="max-width:640px;text-align:left;margin:0 auto;">
      <h3>Part 4 of 4 — How familiar are these topics to you?</h3>
      <p>For each item, rate how familiar you feel the topic is to you personally.
      There are no right or wrong answers — we are only interested in your own sense
      of familiarity.</p></div>`,
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
     Block ORDER: tested blocks first, self-report last, so a self-rating can't
     prime the tested items. Push these onto the timeline BEFORE the reading
     trials (handled in experiment.js).
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
        <p>Click "Next" to begin.</p></div>`
    ],
    show_clickable_nav: true,
    data: { block: "bk_intro" }
  };
  
  /* Authoritative answer key (also embedded in each block's data). Keep a copy
     in the R scoring file. Scoring is by STRING equality against the recorded
     response, so option order on screen does not matter. */
  const BK_ANSWER_KEY = Object.assign({}, _hist.answerKey, _litgenre.answerKey);
  
  window.bk_battery = {
    bk_intro,
    block1a_hist,
    block1b_litgenre,
    block1c_art,
    block2_selfreport,
    answer_key: BK_ANSWER_KEY
  };