// =====================================================================
// stimuli.js  —  COMBINED, RESHAPED FOR experiment.js
// =====================================================================
//
// Four global stimulus objects, one per design slot:
//   STIM_HV1  Spiegelgeschichte         (HIGH)  
//   STIM_HV2  Nachts schlafen die Ratten doch  (HIGH)
//   STIM_LV1  Mein teures Bein    (LOW)
//   STIM_LV2  Schischyphusch / Thithyphuth   
//
// experiment.js keys its language-condition maps on stimulus_id
// ("HV1"/"HV2"/"LV1"/"LV2"), so those ids are preserved as the SLOT names
// regardless of which text fills the slot.
//
// Each object carries:
//   .de / .en               marker-wrapped passage text (<span data-met="ID">)
//   .metaphors_de / _en     coded instances w/ Picken features (per language)
//   .text_visibility_label  COARSE descriptor only (NOT the analytic variable)
//
// Feature codes per instance (Picken 2007, Table 4.1):
//   term_visibility 0/1 | link_strength 0/1/2 | lexical_cue 0/1
//   visibility_composite = sum (0-4) | mipvu_status | vehicle_zipf (fill later)
//
// CSS: span[data-met]{all:unset;} keeps markers invisible to readers.
// =====================================================================

// ---------------------------------------------------------------------
// HV1 -- Ilse Aichinger, "Spiegelgeschichte" / "Story in Reverse" (HIGH)
// Replaces Fussenegger (removed over author-controversy concerns).
// Aichinger: persecuted under National Socialism; canonical postwar text
// (1949). Coheres with the postwar-reckoning framing of the corpus.
// Coded from German + English MIPVU; Picken features assigned per the
// corpus rubric. 
//
// REVERSE-CHRONOLOGY DECISION: items that are figurative ONLY by virtue of
// the text's reversed temporality (flowers un-wilting -> buds; "frisch"
// reversal) are EXCLUDED from coding, since their figurativeness is a
// text-level effect, not a lexical metaphor. "die Toten erwecken / awaken
// the dead" is KEPT (death-as-sleep is a conventional lexical metaphor
// independent of the reversal, per MIPVU).
// lexical_cue=1: DE m20 "als stünden Gläser...", m21 "ein unmündiges Kind"
//   (apposition-as-direct-metaphor borderline); EN e20 "as though glasses
//   stood...", e21 "like a romping child" ('like' marker).
// ---------------------------------------------------------------------
const STIM_HV1 = {
  stimulus_id: "HV1",
  text_visibility_label: "high",
  title_de: "Spiegelgeschichte",
  title_en: "Story in Reverse",
  source: "Ilse Aichinger",

  metaphors_de: [
    { id: "m01", expression: "Dein Wagen wartet", type: "personification", mipvu_status: "positive", term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 5.0518, vehicles: [{ term: "wartet", zipf: 5.0518 }], note: "Car given human waiting; topic (Wagen) + vehicle (warten); verb link. Conventional personification." },
    { id: "m02", expression: "auf das grüne Licht", type: "metonymy", mipvu_status: "borderline", term_visibility: 0, link_strength: 1, lexical_cue: 0, visibility_composite: 1, vehicle_zipf: null, note: "Green light = permission to proceed; literal traffic light. Metonymic/borderline. Filterable." },
    { id: "m03", expression: "Die Tropfen tanzen", type: "personification", mipvu_status: "positive", term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 4.8556, vehicles: [{ term: "tanzen", zipf: 4.8556 }], note: "VIVID. Raindrops as dancing bodies; topic (Tropfen) + vehicle (tanzen); verb link." },
    { id: "m04", expression: "Die Straßen sind frisch getauft", type: "indirect", mipvu_status: "positive", term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 3.4815, vehicles: [{ term: "getauft", zipf: 3.4815 }], note: "STRONG. Rain-wet streets as baptized; topic (Straßen) + vehicle (getauft); copula 'sind' + participle. Ritual/sacred." },
    { id: "m05", expression: "der Himmel legt seine Hand auf alle Dächer", type: "personification", mipvu_status: "positive", term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 4.9592, vehicles: [{ term: "Hand", zipf: 5.4399 }, { term: "legt", zipf: 4.4785 }], note: "STRONG. Sky given body/agency; topic (Himmel) + vehicle (Hand legen); verb link. Central image." },
    { id: "m06", expression: "Dein Wagen fährt aus reiner Höflichkeit", type: "personification", mipvu_status: "positive", term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 3.6923, vehicles: [{ term: "Höflichkeit", zipf: 3.6923 }], note: "Car's motion as human politeness; topic (Wagen) + vehicle (Höflichkeit); verb+adverbial link." },
    { id: "m07", expression: "wetten um ihre Ehre", type: "indirect", mipvu_status: "positive", term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 4.8973, vehicles: [{ term: "Ehre", zipf: 4.8973 }], note: "Honor as wagerable possession; topic (Ehre) + vehicle (wetten um) verb-object. Conventional, active." },
    { id: "m08", expression: "auf die Trambahn gesetzt", type: "indirect", mipvu_status: "positive", term_visibility: 0, link_strength: 2, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 4.5552, vehicles: [{ term: "gesetzt", zipf: 4.5552 }], note: "Betting as physical placing; topic implicit, vehicle (setzen auf) verb. Dead/conventional." },
    { id: "m09", expression: "ist noch keiner aus dem Sarg gestiegen", type: "indirect", mipvu_status: "borderline", term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 4.0828, vehicles: [{ term: "Sarg", zipf: 4.1523 }, { term: "gestiegen", zipf: 4.0133 }], note: "Finality of death via impossible bodily motion out of coffin; topic+vehicle; verb link. Hyperbolic concrete image. Borderline." },
    { id: "m10", expression: "reicht der Morgen noch lange in die Nacht hinein", type: "indirect", mipvu_status: "positive", term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 4.8912, vehicles: [{ term: "reicht", zipf: 5.1878 }, { term: "hinein", zipf: 4.5947 }], note: "Time/light as spatially reaching body; topic (Morgen) + vehicle (reichen, Nacht as space); verb link. (Folds in #11/#12 from MIPVU.)" },
    { id: "m11", expression: "ein Streifen Mond fällt zugleich in die Einfahrt", type: "indirect", mipvu_status: "positive", term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 5.0504, vehicles: [{ term: "fällt", zipf: 5.0504 }], note: "Moonlight as falling object; topic (Mond/light) + vehicle (fallen); verb link. Imageable." },
    { id: "m12", expression: "der Leichenwagen fährt fröhlich nach Hause", type: "personification", mipvu_status: "positive", term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 4.0838, vehicles: [{ term: "fröhlich", zipf: 4.0838 }], note: "STRONG, disturbing. Hearse given cheerfulness; topic (Leichenwagen) + vehicle (fröhlich); verb+adverb link." },
    { id: "m13", expression: "Dort wartet der leere Sockel", type: "personification", mipvu_status: "positive", term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 5.0518, vehicles: [{ term: "wartet", zipf: 5.0518 }], note: "Pedestal given expectant waiting; topic (Sockel) + vehicle (warten); verb link." },
    { id: "m14", expression: "Diese verdammte Gründlichkeit", type: "indirect", mipvu_status: "borderline", term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: null, note: "Abstract thoroughness personified as blamed agent (cursed); topic+vehicle. Borderline / personified abstraction." },
    { id: "m15", expression: "es war schon hohe Zeit", type: "indirect", mipvu_status: "positive", term_visibility: 0, link_strength: 1, lexical_cue: 0, visibility_composite: 1, vehicle_zipf: 4.1742, vehicles: [{ term: "hohe", zipf: 4.1742 }], note: "Urgency as vertical height; vehicle (hoch) only. Dead/conventional." },
    { id: "m16", expression: "da kannst du ruhig sein", type: "indirect", mipvu_status: "borderline", term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 5.4192, vehicles: [{ term: "ruhig", zipf: 5.41922670608822, match_type: "exact_form" }], note: "Borderline: calm/peaceful state applied idiomatically to assurance." },
    { id: "m17", expression: "der Regen ihm keine Tränen gibt", type: "personification", mipvu_status: "positive", term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 5.3158, vehicles: [{ term: "Tränen", zipf: 4.5306 }, { term: "gibt", zipf: 6.1011 }], note: "STRONG. Rain as agent that could give tears; topic (Regen) + vehicle (geben); verb link." },
    { id: "m18", expression: "starrt er ins Leere", type: "indirect", mipvu_status: "positive", term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 4.0623, vehicles: [{ term: "Leere", zipf: 4.0623 }], note: "Emotional blankness spatialized as void; topic (gaze) + vehicle (Leere) PP. Conventional, active." },
    { id: "m19", expression: "Die Spatzen schreien fröhlich", type: "personification", mipvu_status: "positive", term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: null, note: "Sparrows humanized (schreien) + cheerful; topic (Spatzen) + vehicle; verb+adverb. Ironic contrast." },
    { id: "m20", expression: "Sie wissen nicht", type: "indirect", mipvu_status: "positive", term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 6.0643, vehicles: [{ term: "wissen", zipf: 6.06433462457392, match_type: "exact_form" }], note: "Human knowledge attributed to sparrows (irony of reverse-time scene)." },
    { id: "m21", expression: "es verboten ist", type: "indirect", mipvu_status: "positive", term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 4.5221, vehicles: [{ term: "verboten", zipf: 4.52212386522921, match_type: "exact_form" }], note: "Legal/prohibitive frame applied to an impossible/supernatural act." },
    { id: "m22", expression: "die Toten zu erwecken", type: "indirect", mipvu_status: "positive", term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 3.6618, vehicles: [{ term: "erwecken", zipf: 3.6618 }], note: "CENTRAL. Death as sleep one can be woken from; topic (Toten) + vehicle (erwecken); verb link. Conventional but structurally central (kept despite reversal context)." },
    { id: "m23", expression: "als stünden Gläser zwischen seinen Schritten", type: "direct", mipvu_status: "positive", term_visibility: 1, link_strength: 1, lexical_cue: 1, visibility_composite: 3, vehicle_zipf: 3.9087, vehicles: [{ term: "Gläser", zipf: 3.9087 }], note: "VIVID. Fragile gait as walking among breakable glass; 'als' explicit comparison marker -> lexical_cue 1. (Folds in #34.)" },
    { id: "m24", expression: "Der Wind ist kühl und verspielt, ein unmündiges Kind", type: "direct", mipvu_status: "positive", term_visibility: 1, link_strength: 2, lexical_cue: 1, visibility_composite: 4, vehicle_zipf: 4.4594, vehicles: [{ term: "verspielt", zipf: 3.3567 }, { term: "Kind", zipf: 5.5621 }], note: "MAX. Wind personified (verspielt) AND direct metaphor (= ein unmündiges Kind); copula + appositive identity = explicit figure -> lexical_cue 1. Strongest item." },
    { id: "m25", expression: "Dein Bett ist frisch gerichtet", type: "indirect", mipvu_status: "borderline", term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 4.1001, note: "'gerichtet' = set in order/prepared; conventional, faint ritual echo. Borderline / low-salience." }
  ],
  metaphors_en: [
    { id: "e01", expression: "Your car is waiting", type: "personification", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 5.324, vehicles: [{ term: "waiting", zipf: 5.324 }],
      note: "Car given human waiting; topic (car) + vehicle (waiting); verb link." },
    { id: "e02", expression: "The rain is easing off", type: "indirect", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 2.7832, vehicles: [{ term: "easing", zipf: 2.7832 }],
      note: "Rain as force/pressure that relaxes; topic (rain) + vehicle (ease off); verb link. (No DE counterpart - EN-only.)" },
    { id: "e03", expression: "The raindrops dance off the car roof", type: "personification", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 5.1698, vehicles: [{ term: "dance", zipf: 5.1698 }],
      note: "VIVID. Raindrops as dancing bodies; topic (raindrops) + vehicle (dance); verb link." },
    { id: "e04", expression: "The streets are freshly christened", type: "indirect", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 2.769, vehicles: [{ term: "christened", zipf: 2.769 }],
      note: "STRONG. Wet streets as baptized; topic (streets) + vehicle (christened); copula + participle. Ritual." },
    { id: "e05", expression: "the sky placing its hand on all the roofs", type: "personification", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 4.454, vehicles: [{ term: "hand", zipf: 5.446 }, { term: "placing", zipf: 3.4621 }],
      note: "STRONG. Sky given body/agency; topic (sky) + vehicle (placing hand); participial verb link." },
    { id: "e06", expression: "Out of sheer gallantry your car drives", type: "personification", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 2.797, vehicles: [{ term: "gallantry", zipf: 2.797 }],
      note: "Car's motion as chivalrous courtesy; topic (car) + vehicle (gallantry); verb+adverbial link." },
    { id: "e07", expression: "staking their honor", type: "indirect", mipvu_status: "positive",
      term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 2.9253, vehicles: [{ term: "staking", zipf: 2.9253 }],
      note: "Honor as stakeable possession; topic (honor) + vehicle (stake) verb-object. Conventional, active." },
    { id: "e08", expression: "has bet on the tram", type: "indirect", mipvu_status: "positive",
      term_visibility: 0, link_strength: 2, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 5.2345, vehicles: [{ term: "bet", zipf: 5.2345 }],
      note: "Betting as placing on; topic implicit, vehicle (bet on) verb. Dead/conventional." },
    { id: "e09", expression: "arisen from his coffin", type: "indirect", mipvu_status: "borderline",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 3.1638, vehicles: [{ term: "coffin", zipf: 3.9565 }, { term: "arisen", zipf: 2.371 }],
      note: "Death's finality via impossible rising from coffin; topic+vehicle; verb link. Hyperbolic. Borderline." },
    { id: "e10", expression: "The morning still reaches far back into the night", type: "indirect", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 3.72, vehicles: [{ term: "reaches", zipf: 3.72 }],
      note: "Time/light as reaching body, night as space; topic (morning) + vehicle (reach into); verb link. (Folds in #11/#12.)" },
    { id: "e11", expression: "a ray of moonlight falls directly onto the entrance", type: "indirect", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 4.4064, vehicles: [{ term: "falls", zipf: 4.4064 }],
      note: "Moonlight as falling object; topic (moonlight) + vehicle (fall); verb link. Imageable." },
    { id: "e12", expression: "the hearse drives cheerfully home", type: "personification", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 2.7068, vehicles: [{ term: "cheerfully", zipf: 2.7068 }],
      note: "STRONG, disturbing. Hearse given cheerfulness; topic (hearse) + vehicle (cheerfully); verb+adverb link." },
    { id: "e13", expression: "the empty pedestal … is waiting", type: "personification", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 5.324, vehicles: [{ term: "waiting", zipf: 5.324 }],
      note: "Pedestal given expectant waiting; topic (pedestal) + vehicle (waiting); verb link." },
    { id: "e14", expression: "It was high time", type: "indirect", mipvu_status: "positive",
      term_visibility: 0, link_strength: 1, lexical_cue: 0, visibility_composite: 1, vehicle_zipf: 5.2895, vehicles: [{ term: "high", zipf: 5.2895 }],
      note: "Urgency as vertical height; vehicle (high) only. Dead/conventional." },
    { id: "e15", expression: "you can relax", type: "indirect", mipvu_status: "borderline",
      term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 4.9853, vehicles: [{ term: "relax", zipf: 4.9853 }],
      note: "Reassurance as bodily relaxation; topic (you) + vehicle (relax). Conventional, weak. Borderline." },
    { id: "e16", expression: "forbidden to awaken the dead", type: "indirect", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 3.3922, vehicles: [{ term: "awaken", zipf: 3.3922 }],
      note: "CENTRAL. Death as sleep one is woken from; topic (dead) + vehicle (awaken); verb link. (Kept despite reversal context.)" },
    { id: "e17", expression: "the rain gives him no tears", type: "personification", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 4.5792, vehicles: [{ term: "tears", zipf: 4.3491 }, { term: "gives", zipf: 4.8092 }],
      note: "STRONG. Rain as agent that could give tears; topic (rain) + vehicle (give); verb link." },
    { id: "e18", expression: "stares into the emptiness", type: "indirect", mipvu_status: "positive",
      term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 3.2603, vehicles: [{ term: "emptiness", zipf: 3.2603 }],
      note: "Blankness as void; topic (gaze) + vehicle (emptiness) PP. Conventional, active." },
    { id: "e19", expression: "The sparrows twitter joyfully", type: "personification", mipvu_status: "borderline",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 2.269, vehicles: [{ term: "twitter", zipf: 2.2461 }, { term: "joyfully", zipf: 2.2918 }],
      note: "Sparrows given joy; topic (sparrows) + vehicle (joyfully); verb+adverb. Borderline-positive (birds do vocalize)." },
    { id: "e20", expression: "as though glasses stood between his steps", type: "direct", mipvu_status: "positive",
      term_visibility: 1, link_strength: 1, lexical_cue: 1, visibility_composite: 3, vehicle_zipf: 4.5197, vehicles: [{ term: "glasses", zipf: 4.5197 }],
      note: "VIVID. Fragile gait as walking among breakable glass; 'as though' explicit comparison marker -> lexical_cue 1." },
    { id: "e21", expression: "The wind is cool and playful like a romping child", type: "direct", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 1, visibility_composite: 4, vehicle_zipf: 4.1335, vehicles: [{ term: "playful", zipf: 3.07 }, { term: "child", zipf: 5.1971 }],
      note: "MAX. Wind personified (playful) AND simile (like a romping child); copula + 'like' marker -> lexical_cue 1. Strongest item." },
    { id: "e22", expression: "Your bed has been freshly made", type: "indirect", mipvu_status: "borderline",
      term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 5.7486, vehicles: [{ term: "made", zipf: 5.7486 }],
      note: "'made/prepared' conventional; faint ritual echo. Borderline / low-salience." }
  ],

  de: `<span data-met="m01">Dein Wagen wartet</span> an der Kreuzung <span data-met="m02">auf das grüne Licht</span>. Es regnet schwächer. <span data-met="m03">Die Tropfen tanzen</span> auf dem Wagendach. Das Heu riecht aus der Ferne. <span data-met="m04">Die Straßen sind frisch getauft</span>, und <span data-met="m05">der Himmel legt seine Hand auf alle Dächer</span>. <span data-met="m06">Dein Wagen fährt aus reiner Höflichkeit</span> ein Stück Neben der Trambahn her. Zwei kleine Jungen am Straßenrand <span data-met="m07">wetten um ihre Ehre</span>. Aber der <span data-met="m08">auf die Trambahn gesetzt</span> hat, wird verlieren. Du hättest ihn warnen können, aber um dieser Ehre willen <span data-met="m09">ist noch keiner aus dem Sarg gestiegen</span>.

Sei geduldig. Es ist ja Frühsommer. Da <span data-met="m10">reicht der Morgen noch lange in die Nacht hinein</span>. Ihr kommt zurecht. Bevor es dunkel wird und alle Kinder von den Straßenrändern verschwunden sind, biegt auch der Wagen schon in den Spitalshof ein, <span data-met="m11">ein Streifen Mond fällt zugleich in die Einfahrt</span>. Gleich kommen die Männer und heben deinen Sarg vom Leichenwagen. Und <span data-met="m12">der Leichenwagen fährt fröhlich nach Hause</span>.

Sie tragen deinen Sarg durch die zweite Einfahrt über den Hof in die Leichenhalle. <span data-met="m13">Dort wartet der leere Sockel</span> schwarz und schief und erhöht, und sie setzen den Sarg darauf und öffnen ihn wieder, und einer von ihnen flucht, weil die Nägel zu fest eingeschlagen sind. <span data-met="m14">Diese verdammte Gründlichkeit</span>!

Gleich darauf kommt auch der junge Mann und bringt den Kranz zurück, <span data-met="m15">es war schon hohe Zeit</span>. Die Männer ordnen die Schleifen und legen ihn vorne hin, <span data-met="m16">da kannst du ruhig sein</span>, der Kranz liegt gut. Bis morgen sind die welken Blüten frisch und schließen sich zu Knospen. Die Nacht über bleibst du allein, das Kreuz zwischen den Händen, und auch den Tag über wirst du viel Ruhe haben. Du wirst es später lange nicht mehr fertig bringen, so still zu liegen.

Am nächsten Tag kommt der junge Mann wieder. Und weil <span data-met="m17">der Regen ihm keine Tränen gibt</span>, <span data-met="m18">starrt er ins Leere</span> und dreht die Mütze zwischen den Fingern. Erst bevor sie den Sarg wieder auf das Brett heben, schlägt er die Hände vor das Gesicht. Er weint. Du bleibst nicht länger in der Leichenhalle. Warum weint er? Der Sargdeckel liegt nur mehr lose, und es ist heller Morgen. <span data-met="m19">Die Spatzen schreien fröhlich</span>. <span data-met="m20">Sie wissen nicht</span>, daß <span data-met="m21">es verboten ist</span>, <span data-met="m22">die Toten zu erwecken</span>. Der junge Mann geht vor deinem Sarg her, <span data-met="m23">als stünden Gläser zwischen seinen Schritten</span>. <span data-met="m24">Der Wind ist kühl und verspielt, ein unmündiges Kind</span>.

Sie tragen dich ins Haus und die Stiegen hinauf. Du wirst aus dem Sarg gehoben. <span data-met="m25">Dein Bett ist frisch gerichtet</span>. Der junge Mann starrt durch das Fenster in den Hof hinunter, da paaren sich zwei Tauben und gurren laut, geekelt wendet er sich ab.`,
  en: `<span data-met="e01">Your car is waiting</span> for the green light at the crossroads. <span data-met="e02">The rain is easing off</span>. <span data-met="e03">The raindrops dance off the car roof</span>. There is a smell of distant hay. <span data-met="e04">The streets are freshly christened</span>, <span data-met="e05">the sky placing its hand on all the roofs</span>. <span data-met="e06">Out of sheer gallantry your car drives</span> for a while alongside the tram. Two little boys at the curb are <span data-met="e07">staking their honor</span> on which is the faster. But the one who <span data-met="e08">has bet on the tram</span> is going to lose. You might have warned him, but no one has yet for the sake of this honor <span data-met="e09">arisen from his coffin</span>.

Have patience. After all, it is early summer. <span data-met="e10">The morning still reaches far back into the night</span>. You arrive in time. Before it is dark and all the children have vanished from the curbs, the car turns into the courtyard of the hospital, <span data-met="e11">a ray of moonlight falls directly onto the entrance</span>. Soon the men have come and lift your coffin from the hearse. And <span data-met="e12">the hearse drives cheerfully home</span>.

They carry your coffin through the second entrance across the court and into the mortuary. There <span data-met="e13">the empty pedestal</span>, black and lopsided and raised, is waiting, and they set the coffin on it and open it again, and one of them curses because the nails have been hammered in too firmly. This damned thoroughness!

Soon afterwards the young man also comes and returns the wreath. <span data-met="e14">It was high time</span>. The men arrange the ribbons and place them at the front; there now, <span data-met="e15">you can relax</span>, the wreath is in good order. By morning the faded blooms will be fresh and closed up in buds. During the night you remain alone with the cross between your hands, and by day too you will have plenty of peace. Later on you will not manage to lie nearly so still.

Next day the young man comes again. And because <span data-met="e17">the rain gives him no tears</span> he <span data-met="e18">stares into the emptiness</span> and twists his cap between his fingers. Only when they are about to raise the coffin onto the bier again does cover his face with his hands. He is crying. You remain no longer in the mortuary. What is he crying for? The coffin lid is now loose and it is broad daylight. <span data-met="e19">The sparrows twitter joyfully</span>. They do not know that it is <span data-met="e16">forbidden to awaken the dead</span>. The young man walks in front of your coffin <span data-met="e20">as though glasses stood between his steps</span>. <span data-met="e21">The wind is cool and playful like a romping child</span>.

They carry you into the house and up the stairs. You are lifted out of the coffin. <span data-met="e22">Your bed has been freshly made</span>. The young man stares though the window into the courtyard where two doves are mating and cooing loudly; he turns away in disgust.`
};



const STIM_HV2 = {
  stimulus_id: "HV2",
  // Passage-level visibility is now a COARSE DESCRIPTOR ONLY. The analytic
  // visibility variable lives per-instance in metaphors_de / metaphors_en.
  // (Decision: HV/LV passage label no longer drives the design.)
  text_visibility_label: "high",
  title_de: "Nachts schlafen die Ratten doch",
  title_en: "At Night the Rats Do Sleep",
  source: "Wolfgang Borchert",

  // Coded metaphor instances, per language (own ids per language).
  metaphors_de: [
    {
      "id": "m01",
      "expression": "Das hohle Fenster",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 3.0369, "vehicles": [{ "term": "hohle", "zipf": 3.036896376226979, "match_type": "exact_form" }],
      "note": "Ruin given bodily emptiness; topic (Fenster)+vehicle (hohl) adjacent (attributive). "
    },
    {
      "id": "m02",
      "expression": "in der vereinsamten Mauer",
      "type": "personification",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 2.2772, "vehicles": [{ "term": "vereinsamten", "zipf": 2.2772285315373484, "match_type": "lemma_fallback" }],
      "note": "Wall given human loneliness; topic (Mauer)+vehicle (vereinsamt) attributive."
    },
    {
      "id": "m03",
      "expression": "das Fenster ... gähnte",
      "type": "personification",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 2.2772, "vehicles": [{ "term": "gähnte", "zipf": 2.2772285315373484, "match_type": "exact_form" }],
      "note": "STRONG. Window as mouth; topic (Fenster)+vehicle (gähnen); predicate verb = link 2."
    },
    {
      "id": "m04",
      "expression": "gähnte ... voll früher Abendsonne",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 5.1904, "vehicles": [{ "term": "voll", "zipf": 5.190379844537188, "match_type": "exact_form" }],
      "note": "CONTAINER; window as vessel of light; topic+vehicle (voll) juxtaposed."
    },
    {
      "id": "m05",
      "expression": "Staubgewölke",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 2.1523, "vehicles": [{ "term": "Gewölke", "zipf": 2.1522897949290485, "match_type": "lemma_fallback" }],
      "note": "Dust as cloud; topic (Staub)+vehicle (Gewölke) fused compound = juxtaposition."
    },
    {
      "id": "m06",
      "expression": "Staubgewölke flimmerte",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 2.5783, "vehicles": [{ "term": "flimmerte", "zipf": 2.5782585272013296, "match_type": "lemma_fallback" }],
      "note": "Dust shimmers like light/heat; topic+vehicle (flimmern); verb link."
    },
    {
      "id": "m07",
      "expression": "zwischen den steil gereckten Schornsteinresten",
      "type": "personification",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 2.4533, "vehicles": [{ "term": "gereckten", "zipf": 2.4533197905930297, "match_type": "lemma_fallback" }],
      "note": "Chimneys as straining bodies; topic (Schornsteinreste)+vehicle (gereckt) attributive."
    },
    {
      "id": "m08",
      "expression": "Die Schuttwüste",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 4.509, "vehicles": [{ "term": "Wüste", "zipf": 4.508952914865865, "match_type": "exact_form" }],
      "note": "Rubble-field as desert; topic (Schutt)+vehicle (Wüste) fused compound."
    },
    {
      "id": "m09",
      "expression": "Die Schuttwüste döste",
      "type": "personification",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 2.2772, "vehicles": [{ "term": "döste", "zipf": 2.2772285315373484, "match_type": "lemma_fallback" }],
      "note": "STRONG. Landscape as dozing body; topic+vehicle (dösen); verb link."
    },
    {
      "id": "m10",
      "expression": "jemand ... stand vor ihm, dunkel, leise",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 4.5165, "vehicles": [{ "term": "dunkel", "zipf": 4.5165, "match_type": "exact_form" }],
      "note": "Mostly literal/atmospheric. Borderline."
    },
    {
      "id": "m11",
      "expression": "Jetzt haben sie mich!",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 6.7034, "vehicles": [{ "term": "haben", "zipf": 6.703381799753328, "match_type": "exact_form" }],
      "note": "Capture as possession; topic (capture) implicit, vehicle (haben) verb. Dead."
    },
    {
      "id": "m12",
      "expression": "er riskierte ein kleines Geblinzel",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 3.3186, "vehicles": [{ "term": "riskierte", "zipf": 3.3186212166955733, "match_type": "exact_form" }],
      "note": "Looking as risky action; topic (Geblinzel)+vehicle (riskieren) verb-object juxtaposition."
    },
    {
      "id": "m13",
      "expression": "an den Hosenbeinen hoch",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 1,
      "vehicle_zipf": 5.3519, "vehicles": [{ "term": "hoch", "zipf": 5.351862149834252, "match_type": "exact_form" }],
      "note": "Gaze as upward motion; vehicle (hoch) only. Dead."
    },
    {
      "id": "m14",
      "expression": "sah von oben auf das Haargestrüpp herunter",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 2.4533, "vehicles": [{ "term": "Gestrüpp", "zipf": 2.4533197905930297, "match_type": "exact_form" }],
      "note": "Hair as vegetation/undergrowth; topic (Haar)+vehicle (Gestrüpp) compound. Imageable."
    },
    {
      "id": "m15",
      "expression": "Wenn du mich nicht verrätst",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 3.6529, "vehicles": [{ "term": "verrätst", "zipf": 3.652892145498234, "match_type": "exact_form" }],
      "note": "Disclosure as betrayal; topic implicit, vehicle (verraten) verb. Conventional/borderline."
    },
    {
      "id": "m16",
      "expression": "Die krummen Beine kamen einen Schritt zurück",
      "type": "metonymy",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 4.8451, "vehicles": [{ "term": "Beine", "zipf": 4.845136714206278, "match_type": "exact_form" }],
      "note": "Metonymy (legs for man), not strict metaphor. Stylistically salient; filterable."
    },
    {
      "id": "m17",
      "expression": "die essen doch von Toten ... Da leben sie doch von",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 1,
      "vehicle_zipf": 6.0076, "vehicles": [{ "term": "leben", "zipf": 6.007586799911871, "match_type": "exact_form" }],
      "note": "'von etwas leben' lexicalized; horror is literal. Borderline."
    },
    {
      "id": "m18",
      "expression": "Mein Bruder, der liegt nämlich da unten",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 5.4216, "vehicles": [{ "term": "liegt", "zipf": 5.421569184700947, "match_type": "exact_form" }],
      "note": "Death via spatial/posture language; mostly literal-euphemistic. Borderline."
    },
    {
      "id": "m19",
      "expression": "die zusammengesackten Mauern",
      "type": "personification",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 2.1523, "vehicles": [{ "term": "zusammengesackten", "zipf": 2.1522897949290485, "match_type": "lemma_fallback" }],
      "note": "Walls as collapsed bodies; topic (Mauern)+vehicle (zusammengesackt) attributive."
    },
    {
      "id": "m20",
      "expression": "Unser Haus kriegte eine Bombe",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.7086, "vehicles": [{ "term": "kriegte", "zipf": 3.7085922956963357, "match_type": "exact_form" }],
      "note": "Destruction as childlike receiving/possession; topic (Haus)+vehicle (kriegen); verb link."
    },
    {
      "id": "m21",
      "expression": "Mit einmal war das Licht weg im Keller",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 5.8968, "vehicles": [{ "term": "weg", "zipf": 5.896765325949649, "match_type": "exact_form" }],
      "note": "Light as movable/departing object; topic (Licht)+vehicle (weg); copula 'war' link."
    },
    {
      "id": "m22",
      "expression": "Und er auch",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 5.8968, "vehicles": [{ "term": "weg", "zipf": 5.896765325949649, "match_type": "exact_form" }],
      "note": "Death as being-away (gapped 'war weg'); topic deictic, vehicle elided. Emotionally strong but structurally low visibility."
    },
    {
      "id": "m23",
      "expression": "seine krummen Beine waren ganz unruhig",
      "type": "personification",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.779, "vehicles": [{ "term": "unruhig", "zipf": 3.7789722611653427, "match_type": "exact_form" }],
      "note": "Emotion displaced onto legs; topic (Beine)+vehicle (unruhig); copula 'waren'."
    },
    {
      "id": "m24",
      "expression": "Er lief ... auf die Sonne zu",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 4.8887, "vehicles": [{ "term": "Sonne", "zipf": 4.888686297205691, "match_type": "exact_form" }],
      "note": "Literal motion + symbolic move toward warmth/hope; topic (er)+vehicle (Sonne) directional. Borderline/symbolic."
    },
    {
      "id": "m25",
      "expression": "Die war schon rot vom Abend",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 4.4084, "vehicles": [{ "term": "rot", "zipf": 4.408365805315955, "match_type": "exact_form" }],
      "note": "Evening as coloring agent; topic (Sonne/Abend)+vehicle (rot vom) PP-link. Borderline/poetic."
    },
    {
      "id": "m26",
      "expression": "der Korb schwenkte aufgeregt hin und her",
      "type": "personification",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 4.5343, "vehicles": [{ "term": "aufgeregt", "zipf": 4.534306837503917, "match_type": "exact_form" }],
      "note": "STRONG. Man's excitement projected onto basket; topic (Korb)+vehicle (aufgeregt); verb 'schwenkte' + adverb."
    }
  ],
  metaphors_en: [
    {
      "id": "e01",
      "expression": "The hollow window",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 4.0856, "vehicles": [{ "term": "hollow", "zipf": 4.0856 }],
      "note": "Ruin given bodily emptiness; topic (window)+vehicle (hollow) attributive."
    },
    {
      "id": "e02",
      "expression": "the isolated wall",
      "type": "personification",
      "mipvu_status": "borderline",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 3.7846, "vehicles": [{ "term": "isolated", "zipf": 3.7846 }],
      "note": "Weaker than German vereinsamt; 'isolated' less personifying. Borderline; attributive."
    },
    {
      "id": "e03",
      "expression": "the hollow window ... yawned",
      "type": "personification",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 2.07, "vehicles": [{ "term": "yawned", "zipf": 2.07 }],
      "note": "STRONG. Window as mouth; topic (window)+vehicle (yawned); verb link."
    },
    {
      "id": "e04",
      "expression": "yawned ... full of early evening sun",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 5.2219, "vehicles": [{ "term": "full", "zipf": 5.2219 }],
      "note": "CONTAINER; vessel of light; topic+vehicle (full of) juxtaposed."
    },
    {
      "id": "e05",
      "expression": "A cloud of dust",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 4.07, "vehicles": [{ "term": "cloud", "zipf": 4.07 }],
      "note": "Dust as cloud; topic (dust)+vehicle (cloud) via 'of'-genitive link."
    },
    {
      "id": "e06",
      "expression": "dust shimmered",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 1.769, "vehicles": [{ "term": "shimmered", "zipf": 1.769 }],
      "note": "Dust shimmers like light; topic+vehicle (shimmered); verb link."
    },
    {
      "id": "e07",
      "expression": "towering carcasses of chimneys",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 2.6898, "vehicles": [{ "term": "carcasses", "zipf": 2.6898 }],
      "note": "STRONG (stronger than German). Chimneys as corpses; topic (chimneys)+vehicle (carcasses) 'of'-genitive."
    },
    {
      "id": "e08",
      "expression": "The wasted ruins",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 4.2238, "vehicles": [{ "term": "wasted", "zipf": 4.2238 }],
      "note": "'wasted' evokes bodily depletion; topic (ruins)+vehicle (wasted) attributive. Borderline body metaphor."
    },
    {
      "id": "e09",
      "expression": "The wasted ruins slumbered",
      "type": "personification",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 1.769, "vehicles": [{ "term": "slumbered", "zipf": 1.769 }],
      "note": "STRONG. Landscape as sleeping body; topic+vehicle (slumbered); verb link."
    },
    {
      "id": "e10",
      "expression": "someone ... stood before him, dark, silent",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": null, "vehicles": [],
      "note": "Mostly literal/atmospheric. Borderline."
    },
    {
      "id": "e11",
      "expression": "Now they've got me!",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 6.5188, "vehicles": [{ "term": "got", "zipf": 6.5188 }],
      "note": "Capture as possession; topic implicit, vehicle (got) verb. Dead."
    },
    {
      "id": "e12",
      "expression": "He risked a fast glance",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 3.5841, "vehicles": [{ "term": "risked", "zipf": 3.5841 }],
      "note": "Looking as risky action; topic (glance)+vehicle (risk) verb-object."
    },
    {
      "id": "e13",
      "expression": "glance above the trouser legs",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 1,
      "vehicle_zipf": null, "vehicles": [],
      "note": "Seeing as upward movement; vehicle (above) only. Dead."
    },
    {
      "id": "e14",
      "expression": "looked down at the bushy hair",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 2.7068, "vehicles": [{ "term": "bushy", "zipf": 2.7068 }],
      "note": "Hair as vegetation; topic (hair)+vehicle (bushy) attributive. Imageable."
    },
    {
      "id": "e15",
      "expression": "If you won't tell on me",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 6.2361, "vehicles": [{ "term": "tell", "zipf": 6.2361 }],
      "note": "Disclosure as betrayal; topic implicit, vehicle (tell on) verb. Borderline. (Corresponds to DE verraten.)"
    },
    {
      "id": "e16",
      "expression": "The bent legs stepped back",
      "type": "metonymy",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 4.7445, "vehicles": [{ "term": "legs", "zipf": 4.7445 }],
      "note": "Metonymy (legs for man), not strict metaphor. Filterable."
    },
    {
      "id": "e17",
      "expression": "they eat the dead. Eat people. That's what they live on",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 1,
      "vehicle_zipf": 5.5367, "vehicles": [{ "term": "live", "zipf": 5.5367 }],
      "note": "'live on' lexicalized; horror is literal. Borderline."
    },
    {
      "id": "e18",
      "expression": "My brother, he's lying under there",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 4.9424, "vehicles": [{ "term": "lying", "zipf": 4.9424 }],
      "note": "Death via posture/spatial language; mostly literal-euphemistic. Borderline."
    },
    {
      "id": "e19",
      "expression": "the sagging wall",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 2.5223, "vehicles": [{ "term": "sagging", "zipf": 2.5223 }],
      "note": "Wall as weakened body; topic (wall)+vehicle (sagging) attributive."
    },
    {
      "id": "e20",
      "expression": "A bomb hit our house",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 5.4388, "vehicles": [{ "term": "hit", "zipf": 5.4388 }],
      "note": "Destruction as bodily impact; topic (house)+vehicle (hit); verb link. (Less childlike than DE kriegte.)"
    },
    {
      "id": "e21",
      "expression": "The light in the cellar went out",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 5.6138, "vehicles": [{ "term": "went", "zipf": 5.6138 }],
      "note": "Light as departing entity; topic (light)+vehicle (went out); verb link. Dead."
    },
    {
      "id": "e22",
      "expression": "And he was gone",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 5.4718, "vehicles": [{ "term": "gone", "zipf": 5.4718 }],
      "note": "Death as going-away; topic (he) deictic, vehicle (gone); copula 'was'. Emotionally alive understatement."
    },
    {
      "id": "e23",
      "expression": "his bent legs were very uneasy",
      "type": "personification",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.3212, "vehicles": [{ "term": "uneasy", "zipf": 3.3212 }],
      "note": "Emotion displaced onto legs; topic (legs)+vehicle (uneasy); copula 'were'."
    },
    {
      "id": "e24",
      "expression": "he hurried off into the sun",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.0912, "vehicles": [{ "term": "hurried", "zipf": 3.0912 }],
      "note": "Literal motion + symbolic move toward warmth/hope; topic (he)+vehicle (sun) directional. Borderline/symbolic."
    },
    {
      "id": "e25",
      "expression": "It was already red with evening",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 5.1699, "vehicles": [{ "term": "red", "zipf": 5.1699 }],
      "note": "Evening as coloring agent; topic (sun/it)+vehicle (red with) PP-link. Borderline/poetic."
    },
    {
      "id": "e26",
      "expression": "the basket swung excitedly back and forth",
      "type": "personification",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 2.4679, "vehicles": [{ "term": "excitedly", "zipf": 2.4679 }],
      "note": "STRONG. Man's excitement projected onto basket; topic (basket)+vehicle (excitedly); verb 'swung' + adverb."
    }
  ],

  de: "<span data-met=\"m01\">Das hohle Fenster</span> <span data-met=\"m02\">in der vereinsamten Mauer</span> <span data-met=\"m03\">gähnte</span> blaurot <span data-met=\"m04\">voll früher Abendsonne</span>. <span data-met=\"m05\">Staubgewölke</span> <span data-met=\"m06\">flimmerte</span> <span data-met=\"m07\">zwischen den steil gereckten Schornsteinresten</span>. <span data-met=\"m08\">Die Schuttwüste</span> <span data-met=\"m09\">döste</span>. Er hatte die Augen zu. Mit einmal wurde es noch dunkler. Er merkte, dass <span data-met=\"m10\">jemand gekommen war und nun vor ihm stand, dunkel, leise</span>.\n\n<span data-met=\"m11\">Jetzt haben sie mich!</span> dachte er.\n\nAber als er ein bisschen blinzelte, sah er nur zwei etwas ärmlich behoste Beine. Die standen ziemlich krumm vor ihm, dass er zwischen ihnen hindurch sehen konnte. <span data-met=\"m12\">Er riskierte ein kleines Geblinzel</span> <span data-met=\"m13\">an den Hosenbeinen hoch</span> und erkannte einen älteren Mann. Der hatte ein Messer und einen Korb in der Hand. Und etwas Erde an den Fingerspitzen.\n\nDu schläfst hier wohl, was? fragte der Mann und <span data-met=\"m14\">sah von oben auf das Haargestrüpp herunter</span>.\n\nJürgen blinzelte zwischen den Beinen des Mannes hindurch in die Sonne und sagte: Nein, ich schlafe nicht. Ich muss hier aufpassen.\n\nDer Mann nickte: So, dafür hast du wohl den großen Stock da?\n\nJa, antwortete Jürgen mutig.\n\nWorauf passt du denn auf?\n\nDas kann ich nicht sagen.\n\nNa, denn nicht. Dann sage ich dir natürlich auch nicht, was ich hier im Korb habe. Der Mann stieß mit dem Fuß an den Korb und klappte das Messer zu.\n\nPah, kann mir denken, was in dem Korb ist, meinte Jürgen geringschätzig, Kaninchenfutter.\n\nStimmt, sagte der Mann, und genau soviel Kaninchen habe ich. Du kannst sie sehen. Viele sind noch ganz jung. Willst du?\n\nIch kann doch nicht. Ich muss doch aufpassen, sagte Jürgen unsicher. <span data-met=\"m15\">Wenn du mich nicht verrätst</span>, es ist wegen den Ratten.\n\n<span data-met=\"m16\">Die krummen Beine kamen einen Schritt zurück</span>: Wegen den Ratten?\n\nJa, <span data-met=\"m17\">die essen doch von Toten. Von Menschen. Da leben sie doch von</span>.\n\nUnd du passt nun auf die Ratten auf? fragte der Mann.\n\nAuf die doch nicht! Und dann sagte er ganz leise: <span data-met=\"m18\">Mein Bruder, der liegt nämlich da unten</span>. Da. Jürgen zeigte mit dem Stock auf <span data-met=\"m19\">die zusammengesackten Mauern</span>. <span data-met=\"m20\">Unser Haus kriegte eine Bombe</span>. <span data-met=\"m21\">Mit einmal war das Licht weg im Keller</span>. <span data-met=\"m22\">Und er auch</span>. Wir haben noch gerufen. Er war viel kleiner als ich. Erst vier. Er muss hier ja noch sein. Er ist doch viel kleiner als ich.\n\nDa sagte der Mann (und <span data-met=\"m23\">seine krummen Beine waren ganz unruhig</span> dabei): Weißt du was? Jetzt füttere ich schnell meine Kaninchen und wenn es dunkel wird, hole ich dich ab. Vielleicht kann ich eins mitbringen. Ein kleines oder, was meinst du?\n\nJa, rief Jürgen, ich warte. Ich muss ja noch aufpassen, bis es dunkel wird. Ich warte bestimmt.\n\nAber das hörte der Mann schon nicht mehr. <span data-met=\"m24\">Er lief mit seinen krummen Beinen auf die Sonne zu</span>. <span data-met=\"m25\">Die war schon rot vom Abend</span>, und Jürgen konnte sehen, wie sie durch die Beine hindurch schien, so krumm waren sie. Und <span data-met=\"m26\">der Korb schwenkte aufgeregt hin und her</span>. Kaninchenfutter war da drin. Grünes Kaninchenfutter, das war etwas grau vom Schutt.",
  en: "<span data-met=\"e01\">The hollow window</span> <span data-met=\"e02\">in the isolated wall</span> <span data-met=\"e03\">yawned</span> blue-red <span data-met=\"e04\">full of early evening sun</span>. <span data-met=\"e05\">A cloud of dust</span> <span data-met=\"e06\">shimmered</span> among <span data-met=\"e07\">the towering carcasses of chimneys</span>. <span data-met=\"e08\">The wasted ruins</span> <span data-met=\"e09\">slumbered</span>. He had his eyes closed. Suddenly it became a trifle darker. He realized that <span data-met=\"e10\">someone had come and now stood before him, dark, silent</span>. <span data-met=\"e11\">Now they've got me!</span> he thought. But as he blinked a little, he saw just two somewhat poorly dressed legs. These stood before him bent a bit so that he could look through between them. <span data-met=\"e12\">He risked a fast glance</span> <span data-met=\"e13\">above the trouser legs</span> and glimpsed an old man. He had a knife and a basket in his hand. And some dirt on his fingertips.\n\nSo, you're really sleeping, heh? asked the man and <span data-met=\"e14\">looked down at the bushy hair</span> below him. Jurgen squinted into the sun between the man's legs and said: No, I'm not sleeping. I have to stand guard here. The man nodded: I see, that's probably why you have the big stick there?\n\nYes, Jurgen answered bravely.\n\nWell, what are you guarding then?\n\nI can't tell you that.\n\nWell, don't then. And of course I won't tell you what I have here in the basket either. The man nudged the basket with his foot and flipped the knife shut.\n\nBah! I can imagine what's in the basket, said Jurgen disdainfully, rabbit food.\n\nRight, said the man, and I have many rabbits. You can see them, many are still quite young, too. Do you want to?\n\nBut, I can't. I have to stand guard, said Jurgen uncertainly. <span data-met=\"e15\">If you won't tell on me</span>, it's because of the rats.\n\n<span data-met=\"e16\">The bent legs stepped back</span> a step: Because of the rats?\n\nYes, <span data-met=\"e17\">they eat the dead. Eat people. That's what they live on</span>.\n\nAnd now you're guarding the rats? asked the man.\n\nNo, not them! And then he said very gently: <span data-met=\"e18\">My brother, he's lying under there</span>. Jurgen pointed to <span data-met=\"e19\">the sagging wall</span> with the stick. <span data-met=\"e20\">A bomb hit our house</span>. <span data-met=\"e21\">The light in the cellar went out</span>. <span data-met=\"e22\">And he was gone</span>. We called again and again. He was much smaller than I am. Only four. He must still be there. He is so much smaller than I am.\n\nThen the man said (and <span data-met=\"e23\">his bent legs were very uneasy</span>, too): You know what? I'm going to hurry on and feed my rabbits, and when it gets dark, I'll come back to you. Maybe I can bring one with me. A little one, what do you think?\n\nYes, called Jurgen, I'll wait. I still have to stand guard until it gets dark. Sure, I'll wait.\n\nBut the man did not hear that. With his bent legs <span data-met=\"e24\">he hurried off into the sun</span>. <span data-met=\"e25\">It was already red with evening</span> and Jurgen could see how the sun shone through his legs, they were so bent. And <span data-met=\"e26\">the basket swung excitedly back and forth</span>. There was rabbit food in it. Green rabbit food that was dusty-gray from the rubble."
};

const STIM_LV1 = {
  stimulus_id: "LV1",
  // Passage-level visibility is now a COARSE DESCRIPTOR ONLY. The analytic
  // visibility variable lives per-instance in metaphors_de / metaphors_en.
  // (Decision: HV/LV passage label no longer drives the design.)
  text_visibility_label: "low",
  title_de: "Mein teures Bein",
  title_en: "My Expensive Leg",
  source: "Heinrich Böll",

  // Coded metaphor instances, per language (own ids per language).
  metaphors_de: [
    {
      "id": "m01",
      "expression": "eine höhere Rente",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 3.8425, "vehicles": [{ "term": "höhere", "zipf": 3.842485874957562, "match_type": "exact_form" }],
      "note": "MORE IS UP; dead orientational. Vehicle (height) only; topic (amount) not named as such; no link."
    },
    {
      "id": "m02",
      "expression": "kein Mensch kann mir mein Bein ersetzen",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 4.1762, "vehicles": [{ "term": "ersetzen", "zipf": 4.176227802427137, "match_type": "exact_form" }],
      "note": "Topic (Bein) + vehicle (ersetzen = replace a tradeable object) both present; finite verb carries it = strong link."
    },
    {
      "id": "m03",
      "expression": "schöpfte eine Menge Atem",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 2.7891, "vehicles": [{ "term": "schöpfte", "zipf": 2.789111892516223, "match_type": "exact_form" }],
      "note": "Topic (Atem) + vehicle (schöpfen = scoop liquid) present; verb is the link."
    },
    {
      "id": "m04",
      "expression": "legte er los",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 3.8766, "vehicles": [{ "term": "loslegen", "zipf": 3.8765656645298376, "match_type": "exact_form" }],
      "note": "Speech-as-motion; topic (speaking) implied, vehicle in verb; verb link."
    },
    {
      "id": "m05",
      "expression": "Ihr Bein ist ein verflucht teures Bein",
      "type": "nominal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.3741, "vehicles": [{ "term": "teures", "zipf": 3.3741385445454046, "match_type": "exact_form" }],
      "note": "CENTRAL. Topic (Bein) + vehicle (teuer/cost) both present; copula 'ist' = strongest nominal link."
    },
    {
      "id": "m06",
      "expression": "daß Ihr Bein das einzige Bein ist",
      "type": "nominal",
      "mipvu_status": "borderline",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 5.3791, "vehicles": [{ "term": "einzige", "zipf": 5.37906149384193, "match_type": "exact_form" }],
      "note": "Reification of Bein as a cost-category; copula present. Borderline (metonymic)."
    },
    {
      "id": "m07",
      "expression": "daß Sie mein Bein stark unterschätzen",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.5673, "vehicles": [{ "term": "unterschätzen", "zipf": 3.5672631428998662, "match_type": "exact_form" }],
      "note": "VALUE IS DOWN (unterschätzen); topic (Bein) named, vehicle in verb; verb link."
    },
    {
      "id": "m08",
      "expression": "Mein Bein ist viel teurer",
      "type": "nominal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.7651, "vehicles": [{ "term": "teurer", "zipf": 3.765073651648784, "match_type": "exact_form" }],
      "note": "CENTRAL. Topic + vehicle present; copula 'ist'."
    },
    {
      "id": "m09",
      "expression": "es ist ein sehr teures Bein",
      "type": "nominal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.3741, "vehicles": [{ "term": "teures", "zipf": 3.3741385445454046, "match_type": "exact_form" }],
      "note": "CENTRAL repetition; copula. (Surfaces in DE text right after m08.)"
    },
    {
      "id": "m10",
      "expression": "Meine Zeit ist sehr kurz",
      "type": "nominal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 5.3784, "vehicles": [{ "term": "kurz", "zipf": 5.378373910904872, "match_type": "exact_form" }],
      "note": "TIME IS LENGTH; topic (Zeit) + vehicle (kurz/spatial) present; copula. Dead but fully visible structurally."
    },
    {
      "id": "m11",
      "expression": "Mein Bein hat nämlich einer Menge von Leuten das Leben gerettet",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 5.0483, "vehicles": [{ "term": "gerettet", "zipf": 5.048264527288113, "match_type": "exact_form" }],
      "note": "Leg given agency (retten); topic (Bein) + animate-rescuer vehicle; verb link."
    },
    {
      "id": "m12",
      "expression": "eine nette Rente beziehen",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 3.799, "vehicles": [{ "term": "beziehen", "zipf": 3.7990201811764717, "match_type": "exact_form" }],
      "note": "Payment-as-drawn-substance; topic (Rente) named but vehicle source domain implicit; verb link."
    },
    {
      "id": "m13",
      "expression": "zur richtigen Zeit stiftengehen",
      "type": "verbal",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 3.4533, "vehicles": [{ "term": "stiftengehen", "zipf": null, "match_type": "compound_split", "components": [{ "component": "stiften", "zipf": 3.4533 }] }],
      "note": "Dead idiom (desert/flee); faded image. Vehicle only, no recoverable link."
    },
    {
      "id": "m14",
      "expression": "Die Stäbe hinten waren am Packen",
      "type": "verbal",
      "mipvu_status": "borderline",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 4.4147, "vehicles": [{ "term": "Packen", "zipf": 4.414740884659478, "match_type": "exact_form" }],
      "note": "Borderline / partly literal-metonymic; topic (Stäbe) present, packing = retreat prep."
    },
    {
      "id": "m15",
      "expression": "der kostet nichts mehr",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 4.7478, "vehicles": [{ "term": "kostet", "zipf": 4.747786016754622, "match_type": "exact_form" }],
      "note": "Dead comrade as cost; topic (the man) only pronominal, vehicle (kosten) in verb; verb link."
    },
    {
      "id": "m16",
      "expression": "Der war also furchtbar billig",
      "type": "nominal",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 4.1465, "vehicles": [{ "term": "billig", "zipf": 4.146460251268325, "match_type": "exact_form" }],
      "note": "CENTRAL satirical. Topic (the dead comrade) only as 'der'; vehicle (billig) present; copula 'war'. Term_vis 0 because the human topic is not lexically present, only deictic."
    },
    {
      "id": "m17",
      "expression": "hat nichts gekostet als eine Postkarte und ein bißchen Kommißbrot",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 4.3618, "vehicles": [{ "term": "gekostet", "zipf": 4.361804809471679, "match_type": "exact_form" }],
      "note": "CENTRAL. Human life itemized as expense; topic deictic, vehicle (kosten) in verb."
    },
    {
      "id": "m18",
      "expression": "die Sache mit dem Bein",
      "type": "nominal",
      "mipvu_status": "borderline",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 5.6153, "vehicles": [{ "term": "Sache", "zipf": 5.615336254243461, "match_type": "exact_form" }],
      "note": "Reification/euphemism; topic (Bein) present, vehicle (Sache) juxtaposed via genitive-like 'mit'. Borderline."
    },
    {
      "id": "m19",
      "expression": "ich hab's durchgegeben",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 2.9304, "vehicles": [{ "term": "durchgegeben", "zipf": 2.930441045312692, "match_type": "exact_form" }],
      "note": "Information as passed object; topic (message) is clitic 's', vehicle in verb; verb link."
    },
    {
      "id": "m20",
      "expression": "sie hauten alle ab",
      "type": "verbal",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 4.5178, "vehicles": [{ "term": "abhauen", "zipf": 4.517777779819948, "match_type": "exact_form" }],
      "note": "Dead idiom (fled); not strongly imageable. Vehicle only."
    },
    {
      "id": "m21",
      "expression": "schön der Reihe nach",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 1,
      "vehicle_zipf": 4.6825, "vehicles": [{ "term": "Reihe", "zipf": 4.682489493132131, "match_type": "exact_form" }],
      "note": "Temporal order as spatial row; vehicle (Reihe) only, weak juxtaposition. Dead/conventional."
    },
    {
      "id": "m22",
      "expression": "immer hübsch der Reihe nach",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 1,
      "vehicle_zipf": 4.6825, "vehicles": [{ "term": "Reihe", "zipf": 4.682489493132131, "match_type": "exact_form" }],
      "note": "Repetition of m21; contextually ironic but structurally same coding."
    },
    {
      "id": "m23",
      "expression": "was mein Bein kostet",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 4.7478, "vehicles": [{ "term": "kostet", "zipf": 4.747786016754622, "match_type": "exact_form" }],
      "note": "CORE. Topic (Bein) + vehicle (kosten) present; verb link."
    },
    {
      "id": "m24",
      "expression": "alle kerngesund",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 4.0834, "vehicles": [{ "term": "kern", "zipf": 4.083408505521236, "match_type": "exact_form" }],
      "note": "Health as intact core; vehicle (kern-) only, fused compound, no overt link."
    },
    {
      "id": "m25",
      "expression": "von Herzen und im Kopf",
      "type": "metonymy",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 5.2905, "vehicles": [{ "term": "Herzen", "zipf": 4.99531482632044, "match_type": "exact_form" }, { "term": "Kopf", "zipf": 5.585686225726652, "match_type": "exact_form" }],
      "note": "Metonymic (organs for faculties), not strict metaphor. Filterable."
    },
    {
      "id": "m26",
      "expression": "Mein Bein ist ein wahnsinnig teures Bein geworden",
      "type": "nominal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.3741, "vehicles": [{ "term": "teures", "zipf": 3.3741385445454046, "match_type": "exact_form" }],
      "note": "CENTRAL culmination; copula+geworden. Topic + vehicle present."
    },
    {
      "id": "m27",
      "expression": "eines der teuersten Beine, die ich mir denken kann",
      "type": "nominal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 3.1065, "vehicles": [{ "term": "teuersten", "zipf": 3.1065323043683732, "match_type": "exact_form" }],
      "note": "CENTRAL. Topic (Beine) + vehicle (teuer superlative) present; partitive-genitive link (weaker than copula)."
    }
  ],
  metaphors_en: [
    {
      "id": "e01",
      "expression": "a higher pension",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 4.4444, "vehicles": [{ "term": "higher", "zipf": 4.4444 }],
      "note": "MORE IS UP; dead. Vehicle (height) only."
    },
    {
      "id": "e02",
      "expression": "out of your mind",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 6.5866, "vehicles": [{ "term": "out", "zipf": 6.5866 }],
      "note": "MIND IS A CONTAINER; topic (mind) named, vehicle (out of) juxtaposed. Conventional."
    },
    {
      "id": "e03",
      "expression": "give me back my leg",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 6.0668, "vehicles": [{ "term": "give", "zipf": 6.0668 }],
      "note": "Leg as returnable possession; topic+vehicle present; verb link."
    },
    {
      "id": "e04",
      "expression": "drew a deep breath",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 4.3984, "vehicles": [{ "term": "drew", "zipf": 4.3984 }],
      "note": "Breath as manipulable substance; topic (breath)+vehicle (draw); verb link."
    },
    {
      "id": "e05",
      "expression": "launching into a lecture",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.3817, "vehicles": [{ "term": "launching", "zipf": 3.3817 }],
      "note": "Speech as projectile launch; topic (lecture)+vehicle; verb link."
    },
    {
      "id": "e06",
      "expression": "your leg's a damned expensive leg",
      "type": "nominal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 4.446, "vehicles": [{ "term": "expensive", "zipf": 4.446 }],
      "note": "CENTRAL. Topic (leg)+vehicle (expensive); copula."
    },
    {
      "id": "e07",
      "expression": "apart from your leg you're as fit as a fiddle",
      "type": "nominal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 1,
      "visibility_composite": 3,
      "vehicle_zipf": 3.5613, "vehicles": [{ "term": "fiddle", "zipf": 3.5613 }],
      "note": "Simile idiom; 'as ... as' is an explicit comparison marker -> lexical_cue 1. Topic (you)+vehicle (fiddle)."
    },
    {
      "id": "e08",
      "expression": "live to a ripe old age",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 3.6222, "vehicles": [{ "term": "ripe", "zipf": 3.6222 }],
      "note": "AGING IS RIPENING; topic (age)+vehicle (ripe) adjacent."
    },
    {
      "id": "e09",
      "expression": "don't imagine your leg's unique",
      "type": "nominal",
      "mipvu_status": "borderline",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 4.1351, "vehicles": [{ "term": "unique", "zipf": 4.1351 }],
      "note": "Leg = case/category (reification); copula 's. Borderline."
    },
    {
      "id": "e10",
      "expression": "you grossly underestimate my leg",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.7051, "vehicles": [{ "term": "underestimate", "zipf": 3.7051 }],
      "note": "VALUE IS DOWN; topic (leg)+vehicle in verb; verb link. Dead but visible."
    },
    {
      "id": "e11",
      "expression": "My leg is much more expensive",
      "type": "nominal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 4.446, "vehicles": [{ "term": "expensive", "zipf": 4.446 }],
      "note": "CENTRAL; copula."
    },
    {
      "id": "e12",
      "expression": "my head is as sound as my heart",
      "type": "nominal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 1,
      "visibility_composite": 3,
      "vehicle_zipf": 5.156, "vehicles": [{ "term": "sound", "zipf": 5.156 }],
      "note": "Health as structural soundness; 'as...as' comparison marker -> lexical_cue 1."
    },
    {
      "id": "e13",
      "expression": "a very expensive leg indeed",
      "type": "nominal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 4.446, "vehicles": [{ "term": "expensive", "zipf": 4.446 }],
      "note": "CENTRAL repetition; appositive NP (no copula here) = juxtaposition link."
    },
    {
      "id": "e14",
      "expression": "a very busy man",
      "type": "nominal",
      "mipvu_status": "borderline",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 5.027, "vehicles": [{ "term": "busy", "zipf": 5.027 }],
      "note": "Weak borderline (occupied=physically full). Low salience; filterable."
    },
    {
      "id": "e15",
      "expression": "my leg has saved the lives of a great number of people",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 4.8432, "vehicles": [{ "term": "saved", "zipf": 4.8432 }],
      "note": "Leg given agency (save); topic (leg)+animate-rescuer vehicle; verb link."
    },
    {
      "id": "e16",
      "expression": "drawing nice fat pensions",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 4.552, "vehicles": [{ "term": "drawing", "zipf": 4.2046 }, { "term": "fat", "zipf": 4.8995 }],
      "note": "'drawing' = drawn substance (verb link) + 'fat' gives money bodily size; topic (pensions) present."
    },
    {
      "id": "e17",
      "expression": "somewhere up front",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 5.2584, "vehicles": [{ "term": "front", "zipf": 5.2584 }],
      "note": "Lexicalized military 'front'; vehicle only. Borderline."
    },
    {
      "id": "e18",
      "expression": "have time to clear out",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 5.2345, "vehicles": [{ "term": "clear", "zipf": 5.2345 }],
      "note": "Leaving = emptying a space; topic (leaving) implicit, vehicle in verb."
    },
    {
      "id": "e19",
      "expression": "leave it too long",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 5.8288, "vehicles": [{ "term": "long", "zipf": 5.8288 }],
      "note": "TIME IS LENGTH; topic (it=time)+vehicle (long) adjacent. Dead."
    },
    {
      "id": "e20",
      "expression": "he's not costing you a cent now",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 3.3817, "vehicles": [{ "term": "costing", "zipf": 3.3817 }],
      "note": "Death as cost; topic (he) deictic, vehicle (cost) in verb; verb link."
    },
    {
      "id": "e21",
      "expression": "He was a real bargain",
      "type": "nominal",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 4.0793, "vehicles": [{ "term": "bargain", "zipf": 4.0793 }],
      "note": "CENTRAL satirical; copula 'was'. Topic (he) only pronominal -> term_vis 0."
    },
    {
      "id": "e22",
      "expression": "all he cost was a postcard and a few bread rations",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 4.7393, "vehicles": [{ "term": "cost", "zipf": 4.7393 }],
      "note": "CENTRAL; life itemized as cost; topic deictic, vehicle (cost) in verb."
    },
    {
      "id": "e23",
      "expression": "this business of my leg",
      "type": "nominal",
      "mipvu_status": "borderline",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 5.5059, "vehicles": [{ "term": "business", "zipf": 5.5059 }],
      "note": "Reification; topic (leg)+vehicle (business) via 'of'-genitive link. Borderline."
    },
    {
      "id": "e24",
      "expression": "go on lying there",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 4.9424, "vehicles": [{ "term": "lying", "zipf": 4.9424 }],
      "note": "Mostly literal posture; include only for existential force. Borderline."
    },
    {
      "id": "e25",
      "expression": "pass the word",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 5.0334, "vehicles": [{ "term": "pass", "zipf": 5.0334 }],
      "note": "Info as transferable object; topic (word)+vehicle (pass); verb link."
    },
    {
      "id": "e26",
      "expression": "they all took off",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 5.5338, "vehicles": [{ "term": "took", "zipf": 5.5338 }],
      "note": "Escape as lift-off; idiom, image faded; vehicle in verb; verb link."
    },
    {
      "id": "e27",
      "expression": "one after another, in descending order of rank",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 3.2263, "vehicles": [{ "term": "descending", "zipf": 3.2263 }],
      "note": "Rank as vertical scale; topic (rank)+vehicle (descending) juxtaposed."
    },
    {
      "id": "e28",
      "expression": "so on down",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 6.1727, "vehicles": [{ "term": "down", "zipf": 6.1727 }],
      "note": "Hierarchy as vertical; vehicle (down) only. Dead."
    },
    {
      "id": "e29",
      "expression": "what my leg is costing you",
      "type": "verbal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.3817, "vehicles": [{ "term": "costing", "zipf": 3.3817 }],
      "note": "CORE; topic (leg)+vehicle (cost); verb link."
    },
    {
      "id": "e30",
      "expression": "hale and hearty",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 3.2665, "vehicles": [{ "term": "hale", "zipf": 3.2412 }, { "term": "hearty", "zipf": 3.2918 }],
      "note": "Health as bodily fullness; idiom, vehicle only. Dead."
    },
    {
      "id": "e31",
      "expression": "their heads as well as their hearts",
      "type": "metonymy",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 4.4955, "vehicles": [{ "term": "heads", "zipf": 4.6299 }, { "term": "hearts", "zipf": 4.3611 }],
      "note": "Metonymic (organs for faculties). Filterable."
    },
    {
      "id": "e32",
      "expression": "My leg's become a damned expensive leg",
      "type": "nominal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 4.446, "vehicles": [{ "term": "expensive", "zipf": 4.446 }],
      "note": "CENTRAL culmination; copula+become."
    },
    {
      "id": "e33",
      "expression": "one of the most expensive legs I can think of",
      "type": "nominal",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 4.446, "vehicles": [{ "term": "expensive", "zipf": 4.446 }],
      "note": "CENTRAL; topic (legs)+vehicle (expensive superlative); partitive link."
    }
  ],

  de: "»Welches Bein?« fragte der Beamte.\n\n»Rechts.«\n\n»Ganz?«\n\n»Ganz.«\n\n»Hm«, machte er. Dann durchsuchte er verschiedene Zettel.\n\nEndlich fand der Mann einen Zettel, der ihm der richtige zu sein schien. Er sagte: »Ich denke, hier ist etwas für Sie. Sie können dabei sitzen. Schuhputzer. Wie wäre das?«\n\n»Ich kann nicht Schuhe putzen.«\n\n»Das können Sie lernen«, sagte er. »Ein Deutscher kann alles.«\n\n»Hm«, machte ich.\n\n»Also gut?«\n\n»Nein«, sagte ich, »ich will nicht. Ich will <span data-met=\"m01\">eine höhere Rente</span> haben.«\n\n»Sie sind verrückt«, erwiderte er.\n\n»Ich bin nicht verrückt, <span data-met=\"m02\">kein Mensch kann mir mein Bein ersetzen</span>.«\n\nDer Mann lehnte sich weit in seinen Stuhl zurück und <span data-met=\"m03\">schöpfte eine Menge Atem</span>. »Mein lieber Freund«, <span data-met=\"m04\">legte er los</span>, »<span data-met=\"m05\">Ihr Bein ist ein verflucht teures Bein</span>. Ich sehe, daß Sie neunundzwanzig Jahre sind, überhaupt vollkommen gesund, bis auf das Bein. Sie werden siebzig Jahre alt. Rechnen Sie sich bitte aus, monatlich siebzig Mark, zwölfmal im Jahr, also einundvierzig mal zwölf mal siebzig. Und denken Sie doch nicht, <span data-met=\"m06\">daß Ihr Bein das einzige Bein ist</span>. Sie sind auch nicht der einzige, der wahrscheinlich lange leben wird. Und dann Rente erhöhen! Sie sind verrückt.«\n\n»Mein Herr«, sagte ich, »ich denke, <span data-met=\"m07\">daß Sie mein Bein stark unterschätzen</span>. <span data-met=\"m08\">Mein Bein ist viel teurer</span>, <span data-met=\"m09\">es ist ein sehr teures Bein</span>. Passen Sie mal auf.«\n\n»<span data-met=\"m10\">Meine Zeit ist sehr kurz</span>.«\n\n»Passen Sie auf!« sagte ich. »<span data-met=\"m11\">Mein Bein hat nämlich einer Menge von Leuten das Leben gerettet</span>, die heute <span data-met=\"m12\">eine nette Rente beziehen</span>.\n\nIch lag ganz allein irgendwo vorne und sollte aufpassen, wann sie kämen, damit die anderen <span data-met=\"m13\">zur richtigen Zeit stiftengehen</span> konnten. <span data-met=\"m14\">Die Stäbe hinten waren am Packen</span> und wollten nicht zu früh, aber auch nicht zu spät stiftengehen. Erst waren wir zwei, aber den haben sie totgeschossen, <span data-met=\"m15\">der kostet nichts mehr</span>. <span data-met=\"m16\">Der war also furchtbar billig</span>. Er war erst vier Wochen Soldat und <span data-met=\"m17\">hat nichts gekostet als eine Postkarte und ein bißchen Kommißbrot</span>. Nun lag ich aber da allein und ich wollte auch stiftengehen, da . . .«\n\n»Meine Zeit ist sehr kurz«, sagte der Mann.\n\n»Nein, hören Sie zu«, sagte ich, »gerade als ich stiftengehen wollte, kam <span data-met=\"m18\">die Sache mit dem Bein</span>. Und weil ich ja doch liegenbleiben mußte, dachte ich, jetzt kannst du's auch durchgeben, und <span data-met=\"m19\">ich hab's durchgegeben</span>, und <span data-met=\"m20\">sie hauten alle ab</span>, <span data-met=\"m21\">schön der Reihe nach</span>, erst die Division, dann das Regiment, dann das Bataillon, und so weiter, <span data-met=\"m22\">immer hübsch der Reihe nach</span>. Sie vergaßen nämlich, mich mitzunehmen, verstehen Sie! Sie hatten's so eilig. Eine dumme Geschichte, denn hätte ich das Bein nicht verloren, wären sie alle tot, und Sie brauchten ihnen keine Rente zu zahlen. Nun rechnen Sie mal aus, <span data-met=\"m23\">was mein Bein kostet</span>. Der General ist zweiundfünfzig, der Oberst achtundvierzig und der Major fünfzig, <span data-met=\"m24\">alle kerngesund</span>, <span data-met=\"m25\">von Herzen und im Kopf</span>, und sie werden bei ihrer militärischen Lebensweise mindestens achtzig, wie Hindenburg. <span data-met=\"m26\">Mein Bein ist ein wahnsinnig teures Bein geworden</span>, <span data-met=\"m27\">eines der teuersten Beine, die ich mir denken kann</span>, verstehen Sie?«",
  en: "“Which leg?” asked the official.\n\n“The right.”\n\n“The whole leg?”\n\n“The whole leg.”\n\n“Hm,” he went. He proceeded to shuffle through various papers.\n\nFinally the man found what seemed to be the right paper. He said, “I think I have something here for you. A job you can sit down at. Shoeshine stand. How about that?”\n\n“I can’t shine shoes.”\n\n“You can learn,” he said. “A German can do anything.”\n\n“Hm,” I went.\n\n“You’ll take the job?”\n\n“No,” I said, “I won’t. I want <span data-met=\"e01\">a higher pension</span>.”\n\n“You must be <span data-met=\"e02\">out of your mind</span>,” he replied.\n\n“I’m not out of my mind, no one can <span data-met=\"e03\">give me back my leg</span>.”\n\nThe man leaned all the way back in his chair and <span data-met=\"e04\">drew a deep breath</span>. “My dear fellow,” he said, <span data-met=\"e05\">launching into a lecture</span>, “<span data-met=\"e06\">your leg’s a damned expensive leg</span>. I see that you’re twenty-nine years of age, your heart is sound, in fact <span data-met=\"e07\">apart from your leg you’re as fit as a fiddle</span>. You’ll live to be seventy. Figure it out for yourself, seventy marks a month, twelve times a year, that’s forty-one times twelve times seventy. And <span data-met=\"e09\">don’t imagine your leg’s unique</span>. What’s more, you’re not the only one who’ll probably <span data-met=\"e08\">live to a ripe old age</span>. And then you want a higher pension! I’m sorry, but you must be out of your mind.”\n\n“I think, sir,” I said, “I think that <span data-met=\"e10\">you grossly underestimate my leg</span>. <span data-met=\"e11\">My leg is much more expensive</span>, it is <span data-met=\"e13\">a very expensive leg indeed</span>. It so happens that <span data-met=\"e12\">my head is as sound as my heart</span>. Let me explain.”\n\n“I’m <span data-met=\"e14\">a very busy man</span>.”\n\n“I’ll explain!” I said. “You will see that <span data-met=\"e15\">my leg has saved the lives of a great number of people</span> who today are <span data-met=\"e16\">drawing nice fat pensions</span>.\n\n“What happened was this: I was lying all by myself <span data-met=\"e17\">somewhere up front</span>. My job was to spot them when they came so that the others would <span data-met=\"e18\">have time to clear out</span>. The staffs in the rear were packing up, and while they didn’t want to clear out too soon they also didn’t want to <span data-met=\"e19\">leave it too long</span>. At first there were two of us, but they shot the other fellow, <span data-met=\"e20\">he’s not costing you a cent now</span>. <span data-met=\"e21\">He was a real bargain</span>. He’d only been a soldier for a month, <span data-met=\"e22\">all he cost was a postcard and a few bread rations</span>. But now there I was, all by myself, and I was just going to clear out when . . .”\n\n“I’m really very busy,” said the man.\n\n“No, listen,” I said, “just as I was going to clear out, <span data-met=\"e23\">this business of my leg</span> happened. And because I had to <span data-met=\"e24\">go on lying there</span> anyway, I thought I might as well pass the word, so I <span data-met=\"e25\">pass the word</span>, and <span data-met=\"e26\">they all took off</span>, <span data-met=\"e27\">one after another, in descending order of rank</span>, first the divisional staff, then the regimental, then the battalion, and <span data-met=\"e28\">so on</span>, one after another. The silly part was, you see, they were in such a hurry they forgot to take me along! It was really too silly for words, because if I hadn’t lost my leg they would all be dead, the general, the colonel, the major, and so on down, and you wouldn’t have to pay them any pensions. Now just figure out <span data-met=\"e29\">what my leg is costing you</span>. The general is fifty-two, the colonel forty-eight, and the major fifty, all of them <span data-met=\"e30\">hale and hearty</span>, <span data-met=\"e31\">their heads as well as their hearts</span>, and with the military life they lead they’ll live to be at least eighty, like Hindenburg. <span data-met=\"e32\">My leg’s become a damned expensive leg</span>, <span data-met=\"e33\">one of the most expensive legs I can think of</span>, d’you see what I mean?”"
};

const STIM_LV2 = {
  stimulus_id: "LV2",
  // Passage-level visibility is now a COARSE DESCRIPTOR ONLY. The analytic
  // visibility variable lives per-instance in metaphors_de / metaphors_en.
  // (Decision: HV/LV passage label no longer drives the design.)
  text_visibility_label: "TBD",
  title_de: "Schischyphusch",
  title_en: "Thithyphuth",
  source: "Wolfgang Borchert",

  // Coded metaphor instances, per language (own ids per language).
  metaphors_de: [
    {
      "id": "m01",
      "expression": "Dieser Kellner verfolgte meinen Onkel",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.6795, "vehicles": [{ "term": "verfolgte", "zipf": 3.6794899139920285, "match_type": "exact_form" }],
      "note": "Loyalty as physical pursuit; topic (Kellner/Treue)+vehicle (verfolgen); verb link."
    },
    {
      "id": "m02",
      "expression": "mit seiner Treue und mit seiner Verehrung",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 3.6254, "vehicles": [{ "term": "Treue", "zipf": 4.057185582784254, "match_type": "exact_form" }, { "term": "Verehrung", "zipf": 3.1936824800872734, "match_type": "exact_form" }],
      "note": "Quasi-devotional coloring; weak/borderline. Filterable."
    },
    {
      "id": "m03",
      "expression": "wir waren nur als Statisten dabei",
      "type": "direct",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.5077, "vehicles": [{ "term": "Statisten", "zipf": 3.5076774529156225, "match_type": "exact_form" }],
      "note": "FRAME metaphor: social scene as theatre; topic (wir)+vehicle (Statisten); 'als'+copula link."
    },
    {
      "id": "m04",
      "expression": "als die Bekanntschaft der beiden begann",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 4.5426, "vehicles": [{ "term": "begann", "zipf": 4.542636028068437, "match_type": "exact_form" }],
      "note": "Event as action with start-point; very dead. Borderline."
    },
    {
      "id": "m05",
      "expression": "wenn in einem Wort ein harter s-Laut auftauchte",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.5837, "vehicles": [{ "term": "auftauchte", "zipf": 3.583653559088036, "match_type": "exact_form" }],
      "note": "Linguistic occurrence as surfacing/emerging; topic (s-Laut)+vehicle (auftauchen); verb link. Dead but visible."
    },
    {
      "id": "m06",
      "expression": "dann machte er ein ... sch daraus",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 5.1027, "vehicles": [{ "term": "machte", "zipf": 5.102654649305172, "match_type": "exact_form" }],
      "note": "Speech production as making an object; topic (sch)+vehicle (machen); verb link. Dead."
    },
    {
      "id": "m07",
      "expression": "ein weiches feuchtwässeriges sch",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 3.2872, "vehicles": [{ "term": "weiches", "zipf": 3.2879523969291213, "match_type": "exact_form" }, { "term": "feuchtwässeriges", "zipf": null, "match_type": "no_match", "components": [{ "component": "feucht", "zipf": 3.897885011356969 }, { "component": "wässrig", "zipf": 2.675168540209386 }] }],
      "note": "STRONG sensory. Sound given tactile/liquid qualities; topic (sch)+vehicle (weich/feucht/wässerig) attributive."
    },
    {
      "id": "m08",
      "expression": "daß sein Mund entfernte Ähnlichkeit mit einem Hühnerpopo bekam",
      "type": "direct",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 1,
      "visibility_composite": 3,
      "vehicle_zipf": 3.7813, "vehicles": [{ "term": "Hühnerpopo", "zipf": null, "match_type": "no_match", "components": [{ "component": "Huhn", "zipf": 4.30762583239411 }, { "component": "Popo", "zipf": 3.254952136826196 }] }],
      "note": "VIVID comic image. Mouth ~ hen's backside; 'Ähnlichkeit mit' explicitly marks the comparison -> lexical_cue 1; topic+vehicle present."
    },
    {
      "id": "m09",
      "expression": "mit einer Stimme, die an fernen Geschützdonner erinnerte",
      "type": "direct",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 1,
      "visibility_composite": 3,
      "vehicle_zipf": 3.4941, "vehicles": [{ "term": "Geschützdonner", "zipf": null, "match_type": "no_match", "components": [{ "component": "Geschütz", "zipf": 3.0553797819209922 }, { "component": "Donner", "zipf": 3.9328471150785704 }] }],
      "note": "War-sound mapped onto voice; 'erinnerte an' explicitly flags comparison -> lexical_cue 1."
    },
    {
      "id": "m10",
      "expression": "geschützdonnerähnlich zu antworten",
      "type": "direct",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 1,
      "visibility_composite": 3,
      "vehicle_zipf": 3.4941, "vehicles": [{ "term": "geschützdonner", "zipf": null, "match_type": "no_match", "components": [{ "component": "Geschütz", "zipf": 3.0553797819209922 }, { "component": "Donner", "zipf": 3.9328471150785704 }] }],
      "note": "Repeat of war-sound metaphor; '-ähnlich' is an explicit similarity marker -> lexical_cue 1."
    },
    {
      "id": "m11",
      "expression": "Er blieb sitzen und stand dabei doch auf",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 1,
      "visibility_composite": 4,
      "vehicle_zipf": 4.4562, "vehicles": [{ "term": "stand ... auf", "zipf": 4.456205478830518, "match_type": "no_match" }],
      "note": "MAX VISIBILITY. Text stages literal-vs-figurative (sat yet stood up) -> the contrast itself is the cue; topic+vehicle+verb link. composite 4."
    },
    {
      "id": "m12",
      "expression": "Innerlich stand er auf",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 1,
      "visibility_composite": 4,
      "vehicle_zipf": 4.4562, "vehicles": [{ "term": "stand ... auf", "zipf": 4.456205478830518, "match_type": "no_match" }],
      "note": "CENTRAL, MAX. 'Innerlich' overtly flags the figurative reading of 'aufstehen' -> lexical_cue 1; verb link."
    },
    {
      "id": "m13",
      "expression": "dieses innerliche Aufstehen",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 1,
      "visibility_composite": 3,
      "vehicle_zipf": 4.4562, "vehicles": [{ "term": "Aufstehen", "zipf": 4.456205478830518, "match_type": "exact_form" }],
      "note": "Nominalized repeat; 'innerlich' flags figure -> lexical_cue 1; nominal juxtaposition link."
    },
    {
      "id": "m14",
      "expression": "wie einen Angriff",
      "type": "direct",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 1,
      "visibility_composite": 3,
      "vehicle_zipf": 4.7888, "vehicles": [{ "term": "Angriff", "zipf": 4.788777691282414, "match_type": "exact_form" }],
      "note": "Social tension as military attack; 'wie' explicit simile marker -> lexical_cue 1."
    },
    {
      "id": "m15",
      "expression": "er wich zwei kurze Schritte zurück",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.1223, "vehicles": [{ "term": "wich", "zipf": 3.1223265715516053, "match_type": "exact_form" }],
      "note": "Literal step-back + military-retreat resonance (after 'Angriff'); topic+vehicle; verb link. Borderline."
    },
    {
      "id": "m16",
      "expression": "Beide mit einer zu kurzen Zunge",
      "type": "metonymy",
      "mipvu_status": "borderline",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 4.5656, "vehicles": [{ "term": "Zunge", "zipf": 4.5655895590103, "match_type": "exact_form" }],
      "note": "Folk-physiological/metonymic body-for-speech-defect; topic+vehicle adjacent. Borderline."
    },
    {
      "id": "m17",
      "expression": "Mordbereit, todwund der eine",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 1,
      "vehicle_zipf": 4.7345, "vehicles": [{ "term": "Mordbereit", "zipf": null, "match_type": "no_match", "components": [{ "component": "Mord", "zipf": 4.8939665383211235 }, { "component": "bereit", "zipf": 5.446167745373327 }] }, { "term": "todwund", "zipf": null, "match_type": "no_match", "components": [{ "component": "Tod", "zipf": 5.391171883844185 }, { "component": "wund", "zipf": 3.2066474572516412 }] }],
      "note": "Emotional injury as lethal violence; vehicle (mordbereit/todwund) foregrounded, topic (der eine) deictic; appositive juxtaposition. Hyperbolic."
    },
    {
      "id": "m18",
      "expression": "lachfertig",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 5.1882, "vehicles": [{ "term": "lachfertig", "zipf": null, "match_type": "no_match", "components": [{ "component": "lachen", "zipf": 4.796399995359008 }, { "component": "fertig", "zipf": 5.57999224001033 }] }],
      "note": "Readiness-to-laugh as loaded/primed state; weak. Borderline."
    },
    {
      "id": "m19",
      "expression": "randvoll mit Gelächtereruptionen",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 1,
      "vehicle_zipf": 2.5783, "vehicles": [{ "term": "randvoll", "zipf": 2.5782585272013296, "match_type": "exact_form" }],
      "note": "PERSON AS CONTAINER; vehicle (randvoll) foregrounded, topic (the other man) deictic; PP juxtaposition."
    },
    {
      "id": "m20",
      "expression": "Gelächtereruptionen",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 1.9762, "vehicles": [{ "term": "Eruptionen", "zipf": 1.9761985358733671, "match_type": "exact_form" }],
      "note": "Laughter as volcanic eruption; topic (Gelächter)+vehicle (Eruptionen) fused compound. Vivid."
    },
    {
      "id": "m21",
      "expression": "siebenhundert Augen und Ohren",
      "type": "metonymy",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 5.1269, "vehicles": [{ "term": "Augen", "zipf": 5.523727112333149, "match_type": "exact_form" }, { "term": "Ohren", "zipf": 4.730164401738527, "match_type": "exact_form" }],
      "note": "Metonymy (organs for onlookers), not strict metaphor. Filterable."
    },
    {
      "id": "m22",
      "expression": "die den Auftritt mehr genossen als Bier und Brause",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 4.3707, "vehicles": [{ "term": "Auftritt", "zipf": 4.370650216699583, "match_type": "exact_form" }],
      "note": "FRAME (with Statisten): scene as stage performance; topic (the scene)+vehicle (Auftritt) appositive. Theatrical frame."
    },
    {
      "id": "m23",
      "expression": "mittendrin",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 3.6246, "vehicles": [{ "term": "mittendrin", "zipf": 3.6245585468542987, "match_type": "exact_form" }],
      "note": "Social implication as spatial centre; could be literal. Borderline/weak."
    },
    {
      "id": "m24",
      "expression": "tief in die Wäsche verkrochen",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 2.9762, "vehicles": [{ "term": "verkrochen", "zipf": 2.976198535873367, "match_type": "exact_form" }],
      "note": "VIVID. Shame as bodily crawling-into-clothes; topic (wir)+vehicle (verkriechen); verb link."
    }
  ],
  metaphors_en: [
    {
      "id": "e01",
      "expression": "the waiter dogged my uncle",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 2.7232, "vehicles": [{ "term": "dogged", "zipf": 2.7232 }],
      "note": "Loyalty as animal tracking; topic (waiter)+vehicle (dogged); verb link."
    },
    {
      "id": "e02",
      "expression": "with such devotion and respect",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 3.6182, "vehicles": [{ "term": "devotion", "zipf": 3.6182 }],
      "note": "Quasi-worship coloring; weak/borderline. Filterable."
    },
    {
      "id": "e03",
      "expression": "the pair were destined to meet",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 3.6141, "vehicles": [{ "term": "destined", "zipf": 3.6141 }],
      "note": "Personified fate directing events; topic implicit, vehicle (destined) verb. Conventional/comic."
    },
    {
      "id": "e04",
      "expression": "and so it came to pass",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 5.0334, "vehicles": [{ "term": "pass", "zipf": 5.0334 }],
      "note": "Event as motion/arrival; topic deictic, vehicle verb. Very dead."
    },
    {
      "id": "e05",
      "expression": "we were only there as extras",
      "type": "direct",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 3.3171, "vehicles": [{ "term": "extras", "zipf": 3.3171 }],
      "note": "FRAME: scene as theatre; topic (we)+vehicle (extras); 'as'+copula link."
    },
    {
      "id": "e06",
      "expression": "when a hard 's' sound came up in a word",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 5.6657, "vehicles": [{ "term": "came", "zipf": 5.6657 }],
      "note": "Linguistic occurrence as upward emergence; topic (sound)+vehicle (came up); verb link. Dead."
    },
    {
      "id": "e07",
      "expression": "he came out with a weak ... 'th'",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 5.6657, "vehicles": [{ "term": "came", "zipf": 5.6657 }],
      "note": "Speech production as exiting a container/body; topic (th)+vehicle (came out); verb link. (e08 nests inside.)"
    },
    {
      "id": "e08",
      "expression": "a weak, damp, watery 'th'",
      "type": "direct",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 2.86, "vehicles": [{ "term": "watery", "zipf": 2.86 }],
      "note": "STRONG sensory. Sound given tactile/liquid qualities; topic (th)+vehicle (damp/watery) attributive."
    },
    {
      "id": "e09",
      "expression": "his mouth bore a faint resemblance to a hen's backside",
      "type": "direct",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 1,
      "visibility_composite": 3,
      "vehicle_zipf": 3.2263, "vehicles": [{ "term": "backside", "zipf": 3.2263 }],
      "note": "VIVID comic. 'bore a resemblance to' explicitly marks comparison -> lexical_cue 1; topic+vehicle present."
    },
    {
      "id": "e10",
      "expression": "a voice reminiscent of the distant thunder of guns",
      "type": "direct",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 1,
      "visibility_composite": 3,
      "vehicle_zipf": 4.1243, "vehicles": [{ "term": "thunder", "zipf": 4.1243 }],
      "note": "War-sound mapped onto voice; 'reminiscent of' explicitly flags comparison -> lexical_cue 1."
    },
    {
      "id": "e11",
      "expression": "reply somewhat in the thunder-of-guns manner",
      "type": "direct",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 1,
      "visibility_composite": 3,
      "vehicle_zipf": 4.1243, "vehicles": [{ "term": "thunder", "zipf": 4.1243 }],
      "note": "Repeat of war-sound metaphor; 'in the ... manner' flags the figure -> lexical_cue 1."
    },
    {
      "id": "e12",
      "expression": "He remained seated and nevertheless stood up",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 1,
      "visibility_composite": 4,
      "vehicle_zipf": 4.4111, "vehicles": [{ "term": "stood", "zipf": 4.4111 }],
      "note": "MAX VISIBILITY. Text stages literal-vs-figurative contrast -> the contrast is the cue; topic+vehicle+verb link. composite 4."
    },
    {
      "id": "e13",
      "expression": "He stood up within himself",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 1,
      "visibility_composite": 4,
      "vehicle_zipf": 4.4111, "vehicles": [{ "term": "stood", "zipf": 4.4111 }],
      "note": "CENTRAL, MAX. 'within himself' overtly flags figurative reading of 'stood up' -> lexical_cue 1; verb link."
    },
    {
      "id": "e14",
      "expression": "this inner rising",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 1,
      "visibility_composite": 3,
      "vehicle_zipf": 3.9253, "vehicles": [{ "term": "rising", "zipf": 3.9253 }],
      "note": "Nominalized repeat; 'inner' flags figure -> lexical_cue 1; nominal juxtaposition."
    },
    {
      "id": "e15",
      "expression": "like an offensive",
      "type": "direct",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 1,
      "visibility_composite": 3,
      "vehicle_zipf": 3.8077, "vehicles": [{ "term": "offensive", "zipf": 3.8077 }],
      "note": "Social exchange as battle; 'like' explicit simile marker -> lexical_cue 1."
    },
    {
      "id": "e16",
      "expression": "he fell back a couple of short steps",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 4.8628, "vehicles": [{ "term": "fell", "zipf": 4.8628 }],
      "note": "Literal step-back + military-retreat resonance (after 'offensive'); topic+vehicle; verb link. Borderline."
    },
    {
      "id": "e17",
      "expression": "Both with a too-short tongue",
      "type": "metonymy",
      "mipvu_status": "borderline",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 4.4932, "vehicles": [{ "term": "tongue", "zipf": 4.4932 }],
      "note": "Folk-physiological/metonymic body-for-defect; topic+vehicle adjacent. Borderline."
    },
    {
      "id": "e18",
      "expression": "Murderous and mortally wounded the one",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 0,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 1,
      "vehicle_zipf": 4.2888, "vehicles": [{ "term": "wounded", "zipf": 4.2888 }],
      "note": "Emotional injury as lethal violence; vehicle foregrounded, topic (the one) deictic; appositive. Hyperbolic/comic."
    },
    {
      "id": "e19",
      "expression": "brimming with ... laughter",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 2.5706, "vehicles": [{ "term": "brimming", "zipf": 2.5706 }],
      "note": "PERSON AS CONTAINER; topic (the other)+vehicle (brimming) present; PP juxtaposition."
    },
    {
      "id": "e20",
      "expression": "explosive laughter",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 1,
      "lexical_cue": 0,
      "visibility_composite": 2,
      "vehicle_zipf": 3.7264, "vehicles": [{ "term": "explosive", "zipf": 3.7264 }],
      "note": "Laughter as explosion; topic (laughter)+vehicle (explosive) attributive. Alive."
    },
    {
      "id": "e21",
      "expression": "seven hundred eyes and ears",
      "type": "metonymy",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 4.9344, "vehicles": [{ "term": "eyes", "zipf": 5.3449 }, { "term": "ears", "zipf": 4.5238 }],
      "note": "Metonymy (organs for onlookers), not strict metaphor. Filterable."
    },
    {
      "id": "e22",
      "expression": "in the middle of it all",
      "type": "indirect",
      "mipvu_status": "borderline",
      "term_visibility": 0,
      "link_strength": 0,
      "lexical_cue": 0,
      "visibility_composite": 0,
      "vehicle_zipf": 4.9498, "vehicles": [{ "term": "middle", "zipf": 4.9498 }],
      "note": "Social implication as spatial centre; could be literal. Borderline/weak."
    },
    {
      "id": "e23",
      "expression": "cringing into our clothes",
      "type": "indirect",
      "mipvu_status": "positive",
      "term_visibility": 1,
      "link_strength": 2,
      "lexical_cue": 0,
      "visibility_composite": 3,
      "vehicle_zipf": 2.3332, "vehicles": [{ "term": "cringing", "zipf": 2.3332 }],
      "note": "VIVID. Shame as bodily shrinking-into-clothing; topic (we/our)+vehicle (cringing into); verb link."
    }
  ],

  de: "Dabei war mein Onkel natürlich kein Gastwirt. Aber er kannte einen Kellner. <span data-met=\"m01\">Dieser Kellner verfolgte meinen Onkel</span> so intensive <span data-met=\"m02\">mit seiner Treue und mit seiner Verehrung</span>, daß wir immer sagten: Das ist sein Kellner.\n\nAls sies ich kennenlernten, mein Onkel und der Kellner, war ich dabei. Ich war damals gerade so groß, daß ich die Nase auf den Tisch legen konnte. Meine Mutter war auch nicht viel älter. Etwas älter war sie wohl, aber wir waren beide noch so jung, daß wir uns ganz entsetzlich schämten, als der Onkel und der Kellner sich kennenlernten. Ja, wir waren dabei.\n\nMein Onkel natürlich auch, ebenso der Kellner, denn die beiden sollten sich ja kennenlernen und auf sie kam es an. Meine Mutter und ich <span data-met=\"m03\">waren nur als Statisten dabei</span>, <span data-met=\"m04\">als die Bekanntschaft der beiden begann</span>. Daß mein Onkel einen Zungenfehler hatte, wäre beinahe der Anlaß zu dieser Schlägerei geworden. Aber daß er einbeinig war, hat die Schlägerei dann schließlich doch verhindert. Er konnte kein s sprechen. Immer <span data-met=\"m05\">wenn in einem Wort ein harter s-Laut auftauchte</span>, <span data-met=\"m06\">dann machte er <span data-met=\"m07\">ein weiches feuchtwässeriges sch</span> daraus</span>. Und dabei schob er die Lippen weit vor, <span data-met=\"m08\">daß sein Mund entfernte Ähnlichkeit mit einem Hühnerpopo bekam</span>.\n\nDer Kellner stand also an unserem Tisch und fragte nervös: «Bitte schehr? Schie wünschen?»\n\nMein Onkel sagte gewohnheitsmäßig: «Alscho: Schwei Aschbach und für den Jungen eine Brausche»\n\nDer Kellner war sehr blaß. Und plötzlich merkte ich, daß mein Onkel auch blaß wurde. Nämlich als der Kellner die Bestellung der Sicherheit wegen wiederholte:\n\n«Scher wohl. Schwei Aschbach. Eine Brausche. Bitte schehr»\n\nMein Onkel sah meine Mutter mit hochgezogenen Brauen an, dann sagte er <span data-met=\"m09\">mit einer Stimme, die an fernen Geschützdonner erinnerte</span>:\n\n«Schie machen schich über mein Lischpeln luschtig?»\n\nDer Kellner stand da und dann fing es an, an ihm zu zittern. Vor allem aber zitterte seine Stimme, als er sich jetzt Mühe gab, auch etwas <span data-met=\"m10\">geschützdonnerähnlich zu antworten</span>:\n\n«Esch ischt schamlosch von Schie, schich über mich schu amüschieren.»\n\nAn meinem Onkel zitterte nichts. Als der Kellner ihn schamlos nannte, da stand mein Onkel doch wenigstens auf. Er stand eigentlich gar nicht auf. Das wäre ihm mit seinem einen Bein viel zu beschwerlich gewesen. <span data-met=\"m11\">Er blieb sitzen und stand dabei doch auf</span>. <span data-met=\"m12\">Innerlich stand er auf</span>. Der Kellner fühlte <span data-met=\"m13\">dieses innerliche Aufstehen</span> meines Onkels <span data-met=\"m14\">wie einen Angriff</span>, und <span data-met=\"m15\">er wich zwei kurze Schritte zurück</span>.\n\nSo standen sie nun und sahen sich an. <span data-met=\"m16\">Beide mit einer zu kurzen Zunge</span>, beide mit demselben Fehler. So standen sie sich gegenüber. <span data-met=\"m17\">Mordbereit, todwund der eine</span>, <span data-met=\"m18\">lachfertig</span>, <span data-met=\"m19\">randvoll mit <span data-met=\"m20\">Gelächtereruptionen</span></span> der andere. Ringsherum <span data-met=\"m21\">siebenhundert Augen und Ohren</span>, <span data-met=\"m22\">die den Auftritt mehr genossen als Bier und Brause</span>. Ach, und <span data-met=\"m23\">mittendrin</span> meine Mutter und ich. Rotköpfig, schamhaft, <span data-met=\"m24\">tief in die Wäsche verkrochen</span>.",
  en: "Not, of course, that my uncle managed a pub. But he did know a waiter. <span data-met=\"e01\">This waiter dogged my uncle</span> <span data-met=\"e02\">with such devotion and respect</span> that we always said, “That’s his waiter.”\n\nI was present when my uncle and the waiter became acquainted. I was then just big enough to rest my nose on the table. My mother too was not much older. She was necessarily somewhat older, but we were both so young that we were quite horrified when my uncle and the waiter met. Yes, my mother and I were there.\n\nAnd my uncle of course, likewise the waiter, for <span data-met=\"e03\">the pair were destined to meet</span>, <span data-met=\"e04\">and so it came to pass</span>. My mother and I <span data-met=\"e05\">were only there as extras</span> when the pair’s acquaintance began. That my uncle had a speech defect was very nearly the occasion of this brawl. That he only has one leg finally prevented it. He couldn’t pronounce an “s”. <span data-met=\"e06\">When a hard “s” sound came up in a word</span>, <span data-met=\"e07\">he came out with <span data-met=\"e08\">a weak, damp, watery “th.”</span></span> And in doing so he pursed his lips out so that <span data-met=\"e09\">his mouth bore a faint resemblance to a hen’s backside</span>.\n\nWell, the waiter stood at our table and asked nervously: “Yeth pleath? Would you like thomething?”\n\nMy uncle replied in his habitual way: “Let’th thee. Two brandieth. And for the child a lemonade-thoda.”\n\nThe waiter was very pale. And I suddenly noticed that my uncle had also turned pale. Actually, this was when the waiter repeated the order to confirm it: “Very good. Two brandieth. A thoda. Thank you.”\n\nMy uncle looked at my mother with raised eyebrows. Then, <span data-met=\"e10\">in a voice reminiscent of the distant thunder of guns</span>, he said: “You’re making fun of my lithp?”\n\nThe waiter stood there and started to tremble. But above all his voice trembled as he endeavored to <span data-met=\"e11\">reply somewhat in the thunder-of-guns manner</span>: “It’th thcandalouth of you to amuthe yourthelf at my expenthe.”\n\nNo part of my uncle shook. But when the waiter called him scandalous, then at least my uncle stood up. That is to say, he by no means stood up properly speaking. With his one leg, that would have been much too difficult. <span data-met=\"e12\">He remained seated and nevertheless stood up</span>. <span data-met=\"e13\">He stood up within himself</span>. The waiter felt <span data-met=\"e14\">this inner rising</span> of my uncle’s <span data-met=\"e15\">like an offensive</span>, and <span data-met=\"e16\">he fell back a couple of short steps</span>.\n\nSo now they stood and looked at each other. <span data-met=\"e17\">Both with a too-short tongue</span>, both with the same deficiency. So they stood facing each other. <span data-met=\"e18\">Murderous and mortally wounded the one</span>, jovial and <span data-met=\"e19\">brimming with <span data-met=\"e20\">explosive laughter</span></span> the other. All around, <span data-met=\"e21\">seven hundred eyes and ears</span>, who enjoyed the scene more than beer and soda. Oh, and my mother and I <span data-met=\"e22\">in the middle of it all</span>. Red to the roots, ashamed, <span data-met=\"e23\">cringing into our clothes</span>."
};

// =====================================================================
// PRACTICE -- Gertrud Fussenegger, "Dame am Steuer" (first ~168 words)
// Used as the FAMILIARIZATION practice text only; NOT analyzed.
// (Fussenegger was removed from the live corpus over author-controversy
// concerns; reused here as throwaway practice material so no live
// stimulus is "burned" on practice, and so practice != any HV/LV text.)
// Codes carried from the earlier Fussenegger coding (p01-p18); since
// practice is not analyzed these need not be reliability-grade.
// =====================================================================
const STIM_PRACTICE = {
  stimulus_id: "PRACTICE",
  text_visibility_label: "practice",
  title_de: "Dame am Steuer (Übungstext)",
  title_en: "Woman Driver (practice excerpt)",
  source: "Gertrud Fussenegger",

  metaphors_de: [
    { id: "p01", expression: "ich habe den Teufel im Leib", type: "indirect", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 5.5027, vehicles: [{ term: "Teufel", zipf: 5.50273165146411, match_type: "exact_form" }],
      note: "Recklessness as demonic possession; copula link. Practice." },
    { id: "p02", expression: "sobald ich am Steuer sitze", type: "metonymy", mipvu_status: "borderline",
      term_visibility: 0, link_strength: 1, lexical_cue: 0, visibility_composite: 1, vehicle_zipf: 4.1693, vehicles: [{ term: "Steuer", zipf: 4.169323134227829, match_type: "exact_form" }],
      note: "Metonymic 'am Steuer' = in control. Practice." },
    { id: "p03", expression: "ich fahre rasch, rasch aber sauber", type: "indirect", mipvu_status: "positive",
      term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 4.8686, vehicles: [{ term: "sauber", zipf: 4.8685714432718035, match_type: "exact_form" }],
      note: "Skill as cleanliness. Practice." },
    { id: "p04", expression: "Kann man denn sauber fahren", type: "indirect", mipvu_status: "positive",
      term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 4.8686, vehicles: [{ term: "sauber", zipf: 4.8685714432718035, match_type: "exact_form" }],
      note: "Repetition of sauber=control. Practice." },
    { id: "p05", expression: "Der Abend — aufgeklärt nach Regen", type: "indirect", mipvu_status: "positive",
      term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 3.4676, vehicles: [{ term: "aufgeklärt", zipf: 3.4675602297076398, match_type: "exact_form" }],
      note: "Weather clearing / enlightened. Practice." },
    { id: "p06", expression: "der Himmel reingefegt", type: "indirect", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 4.3438, vehicles: [{ term: "reingefegt", zipf: null, match_type: "compound_split", components: [{ component: "rein", zipf: 5.6701 }, { component: "gefegt", zipf: 3.0175 }] }],
      note: "Sky as swept surface. Practice." },
    { id: "p07", expression: "kalt wie aus Jade", type: "direct", mipvu_status: "positive",
      term_visibility: 1, link_strength: 1, lexical_cue: 1, visibility_composite: 3, vehicle_zipf: 3.7166, vehicles: [{ term: "Jade", zipf: 3.716561225367611, match_type: "exact_form" }],
      note: "Simile (wie). Practice." },
    { id: "p08", expression: "Die Stadt sinkt unter der Rampe weg", type: "indirect", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 3.6964, vehicles: [{ term: "sinkt", zipf: 3.696357839279324, match_type: "exact_form" }],
      note: "City as sinking object. Practice." },
    { id: "p09", expression: "Wie kühn die Straße steigt", type: "personification", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 3.2066, vehicles: [{ term: "kühn", zipf: 3.2066474572516412, match_type: "exact_form" }],
      note: "Road given bold agency. Practice." },
    { id: "p10", expression: "in dem Lichtgesprenkel", type: "indirect", mipvu_status: "positive",
      term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 1.9761, vehicles: [{ term: "Gesprenkel", zipf: 1.97619853587337, match_type: "no_match", components: [{ component: "Sprenkel", zipf: 1.97619853587337 }] }],
      note: "Light as sprinkled substance. Practice." },
    { id: "p11", expression: "ihre Zeiger kriechen", type: "personification", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 3.9256, vehicles: [{ term: "kriechen", zipf: 3.92558854251828, match_type: "exact_form" }],
      note: "Clock hands as creeping creature. Practice." },
    { id: "p12", expression: "die Asche häuft sich in der Schale", type: "indirect", mipvu_status: "borderline",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 2.8213, vehicles: [{ term: "häuft", zipf: 2.821296575887624, match_type: "exact_form" }],
      note: "Ash accumulation; near-literal. Practice." },
    { id: "p13", expression: "Großer breitgedrückter bronzebrauner Ball", type: "direct", mipvu_status: "positive",
      term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 4.8259, vehicles: [{ term: "Ball", zipf: 4.825924980069695, match_type: "exact_form" }],
      note: "Moon as ball. Practice." },
    { id: "p14", expression: "schweres glosendes Licht", type: "indirect", mipvu_status: "positive",
      term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 3.6752, vehicles: [{ term: "schweres", zipf: 3.675168540209386, match_type: "exact_form" }, { term: "glosendes", zipf: null, match_type: "no_match" }],
      note: "Light given weight/heat. Practice." },
    { id: "p15", expression: "Jägermond", type: "indirect", mipvu_status: "borderline",
      term_visibility: 1, link_strength: 1, lexical_cue: 0, visibility_composite: 2, vehicle_zipf: 4.255, vehicles: [{ term: "Jäger", zipf: 4.254952136826196, match_type: "exact_form" }],
      note: "Cultural compound; hunting frame. Practice." },
    { id: "p16", expression: "Halali über Heide und Felder", type: "indirect", mipvu_status: "borderline",
      term_visibility: 0, link_strength: 0, lexical_cue: 0, visibility_composite: 0, vehicle_zipf: 2.3741, vehicles: [{ term: "Halali", zipf: 2.3741385445454046, match_type: "exact_form" }],
      note: "Hunting-call frame invocation. Practice." },
    { id: "p17", expression: "die Büsche knallt", type: "indirect", mipvu_status: "positive",
      term_visibility: 1, link_strength: 2, lexical_cue: 0, visibility_composite: 3, vehicle_zipf: 3.6922, vehicles: [{ term: "knallt", zipf: 3.692201879508166, match_type: "exact_form" }],
      note: "Acoustic violence in landscape. Practice." },
    { id: "p18", expression: "das Wild birgt sich zitternd im Busch", type: "indirect", mipvu_status: "borderline",
      term_visibility: 0, link_strength: 0, lexical_cue: 0, visibility_composite: 0, vehicle_zipf: 4.3895, vehicles: [{ term: "Wild", zipf: 4.389498299954619, match_type: "exact_form" }],
      note: "Literal within hunting frame; resonant. Practice." }
  ],
  metaphors_en: [],

  de: `Es ist ja nicht wahr, was Fedja immer sagt, <span data-met="p01">ich habe den Teufel im Leib</span>, <span data-met="p02">sobald ich am Steuer sitze</span>. Zugegeben, <span data-met="p03">ich fahre rasch, rasch aber sauber</span>. <span data-met="p04">Kann man denn sauber fahren</span>, wenn man rasch fährt?

<span data-met="p05">Der Abend — aufgeklärt nach Regen</span>. Im Westen, fern, der blaßgelbe Schein, <span data-met="p06">der Himmel reingefegt</span> und <span data-met="p07">kalt wie aus Jade</span>. <span data-met="p08">Die Stadt sinkt unter der Rampe weg</span>. <span data-met="p09">Wie kühn die Straße steigt</span>, Kurve um Kurve. Da unten <span data-met="p10">in dem Lichtgesprenkel</span> blinkt auch Fedjas Haus und das meine. Er sitzt daheim und liest, liest und denkt nach und schweigt, die Uhr tickt, <span data-met="p11">ihre Zeiger kriechen</span>, von Zeit zu Zeit stäubt Fedja seine Zigarette ab und <span data-met="p12">die Asche häuft sich in der Schale</span>.

Da — im Rückspiegel, was ist das? <span data-met="p13">Großer breitgedrückter bronzebrauner Ball</span> — ah, der Mond! geht dort im Osten auf, <span data-met="p14">schweres glosendes Licht</span>, Mond im September. Man nennt ihn <span data-met="p15">Jägermond</span>, wohl weil September die Zeit der Jäger ist, <span data-met="p16">Halali über Heide und Felder</span>, <span data-met="p17">die Büsche knallt</span> und <span data-met="p18">das Wild birgt sich zitternd im Busch</span>.`,
  en: ``
};


// If using a global/script include (as in index.html), these four globals
// (STIM_HV1, STIM_HV2, STIM_LV1, STIM_LV2) are available to experiment.js.