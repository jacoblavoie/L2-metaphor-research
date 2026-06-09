/* global initJsPsych, jsPsychHtmlButtonResponse, jsPsychSurveyText,
          jsPsychSurveyMultiChoice, jsPsychSurveyLikert,
          jsPsychSurveyMultiSelect, jsPsychInstructions,
          jsPsychPipe,
          STIM_HV1, STIM_HV2, STIM_LV1, STIM_LV2, STIM_PRACTICE */

          const EXPERIMENT_ID = "pyYN5xjQ1Iey";
          // Separate DataPipe experiment that receives ONLY the payment roster
          // (payment_id + name + email + timestamp). This keeps participant PII
          // OUT of the research dataset. Create a second DataPipe experiment with
          // data collection enabled (no condition assignment needed) and paste
          // its ID here. Until set, roster saving is skipped (a warning logs).
          const ROSTER_EXPERIMENT_ID = "REPLACE_WITH_ROSTER_EXPERIMENT_ID";

          // Human-friendly payment code the participant keeps, e.g. "METAPHOR-7K2P".
          // Excludes ambiguous chars (0/O, 1/I/L) for readability when transcribed.
          function generatePaymentId() {
            const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
            let code = "";
            for (let i = 0; i < 4; i++) {
              code += chars[Math.floor(Math.random() * chars.length)];
            }
            return "METAPHOR-" + code;
          }

          (function () {
            "use strict";
          
            // -----------------------------
            // Custom underlining plugin
            // -----------------------------
            class UnderlineMetaphorPlugin {
              constructor(jsPsych) {
                this.jsPsych = jsPsych;
              }
          
              static info = {
                name: "underline-metaphor",
                version: "1.0.0",
                parameters: {
                  prompt: {
                    type: "HTML_STRING",
                    default: ""
                  },
                  text: {
                    type: "HTML_STRING",
                    default: ""
                  },
                  language: {
                    type: "STRING",
                    default: ""
                  },
                  trial_id: {
                    type: "STRING",
                    default: ""
                  },
                  stimulus_id: {
                    type: "STRING",
                    default: ""
                  },
                  serial_position: {
                    type: "INT",
                    default: 0
                  },
                  // The task label written into the data. Defaults to "underline"
                  // for the main trials; the practice trial passes
                  // "practice_underline" so it can be filtered separately and
                  // does not contaminate the main underline records. (The plugin
                  // must emit this itself: finishTrial fields override the trial
                  // `data` parameter in jsPsych v8, so a hardcoded task here
                  // would win over data.task.)
                  task: {
                    type: "STRING",
                    default: "underline"
                  },
                  // coded metaphor instances for THIS passage+language
                  // (array of {id, expression, term_visibility, ...}); used to
                  // match underlines to coded items and copied into the data.
                  coded_instances: {
                    type: "COMPLEX",
                    default: [],
                    array: true
                  }
                },
                data: {
                  task: {
                    type: "STRING"
                  },
                  stimulus_id: {
                    type: "STRING"
                  },
                  serial_position: {
                    type: "INT"
                  },
                  trial_id: {
                    type: "STRING"
                  },
                  language: {
                    type: "STRING"
                  },
                  original_text: {
                    type: "STRING"
                  },
                  annotated_html: {
                    type: "STRING"
                  },
                  underlined_segments: {
                    type: "STRING",
                    array: true
                  },
                  underlined_count: {
                    type: "INT"
                  },
                  // Coded-instance matching (Option B markers):
                  // every data-met ID whose marker intersects ANY underline
                  identified_met_ids: {
                    type: "STRING",
                    array: true
                  },
                  // per-underline detail: [{segment, met_ids:[...]}]
                  underline_details: {
                    type: "COMPLEX",
                    array: true
                  },
                  // the full coded-instance list for this passage+language,
                  // copied into the data so analysis never reconstructs it
                  coded_instances: {
                    type: "COMPLEX",
                    array: true
                  }
                }
              };
          
              trial(display_element, trial) {
                display_element.innerHTML = `
                  <div class="study-wrap">
                    <div class="trial-header">Passage ${trial.trial_id}</div>
                    <div class="instruction-box">${trial.prompt}</div>
                    <div class="meta-tools meta-tools-sticky">
                      <button id="underline-btn" type="button">Underline selection</button>
                      <button id="clear-btn" type="button">Clear all underlining</button>
                      <button id="finish-btn" type="button">Continue</button>
                    </div>
                    <div class="small-note">
                      Select a word or phrase in the passage, then click <strong>Underline selection</strong>.
                      Use <strong>Clear all underlining</strong> if you want to start over.
                    </div>
                    <div class="language-badge">Language: ${trial.language}</div>
                    <div id="underline-target" class="underline-target">${trial.text}</div>
                  </div>
                `;
          
                const target = display_element.querySelector("#underline-target");
                const underlineBtn = display_element.querySelector("#underline-btn");
                const clearBtn = display_element.querySelector("#clear-btn");
                const finishBtn = display_element.querySelector("#finish-btn");
          
                const applyUnderline = () => {
                  const selection = window.getSelection();
                  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;
          
                  const range = selection.getRangeAt(0);
                  if (!target.contains(range.commonAncestorContainer)) return;
          
                  const wrapper = document.createElement("span");
                  wrapper.className = "underlined";
          
                  try {
                    range.surroundContents(wrapper);
                    selection.removeAllRanges();
                  } catch (err) {
                    const contents = range.extractContents();
                    wrapper.appendChild(contents);
                    range.insertNode(wrapper);
                    selection.removeAllRanges();
                  }
                };
          
                const clearUnderlining = () => {
                  const marked = target.querySelectorAll("span.underlined");
                  marked.forEach((node) => {
                    const parent = node.parentNode;
                    while (node.firstChild) {
                      parent.insertBefore(node.firstChild, node);
                    }
                    parent.removeChild(node);
                    parent.normalize();
                  });
                };
          
                const collectMarkedStrings = () => {
                  return Array.from(target.querySelectorAll("span.underlined")).map((el) => el.innerText);
                };

                // For each underline span, find every [data-met] marker whose
                // text intersects that underline. Intersection (not full
                // containment) is the rule: underlining part of a marked phrase
                // still counts the marker as identified. Implemented by testing
                // each marker element against the underline's Range.
                const collectUnderlineDetails = () => {
                  const allMarkers = Array.from(target.querySelectorAll("[data-met]"));
                  return Array.from(target.querySelectorAll("span.underlined")).map((uSpan) => {
                    const uRange = document.createRange();
                    uRange.selectNodeContents(uSpan);
                    const ids = [];
                    allMarkers.forEach((mk) => {
                      let hit = false;
                      try {
                        // intersectsNode: true if the marker overlaps the underline range
                        hit = uRange.intersectsNode(mk);
                      } catch (e) {
                        // fallback: containment either direction
                        hit = uSpan.contains(mk) || mk.contains(uSpan);
                      }
                      if (hit) ids.push(mk.getAttribute("data-met"));
                    });
                    return { segment: uSpan.innerText, met_ids: ids };
                  });
                };

                underlineBtn.addEventListener("click", applyUnderline);
                clearBtn.addEventListener("click", clearUnderlining);

                finishBtn.addEventListener("click", () => {
                  const markedStrings = collectMarkedStrings();
                  const details = collectUnderlineDetails();
                  // union of all identified marker ids across underlines
                  const identified = Array.from(
                    new Set(details.flatMap((d) => d.met_ids))
                  );
                  this.jsPsych.finishTrial({
                    task: trial.task || "underline",
                    stimulus_id: trial.stimulus_id,
                    serial_position: trial.serial_position,
                    trial_id: trial.trial_id,
                    language: trial.language,
                    original_text: trial.text,
                    annotated_html: target.innerHTML,
                    underlined_segments: markedStrings,
                    underlined_count: markedStrings.length,
                    identified_met_ids: identified,
                    underline_details: details,
                    coded_instances: trial.coded_instances || []
                  });
                });
              }
            }
          
            // -----------------------------
            // Per-instance reasoning checklist plugin
            // -----------------------------
            // Renders ONE checklist per underlined segment. Each checklist is a
            // multi-select of L2-relevant recognition bases (each stored as a
            // binary) plus an optional free-text field. The number of segments
            // is not known until runtime, so this is built as a custom plugin
            // rather than a static survey trial.
            //
            // Recognition-basis reasons (participant-facing text -> internal tag):
            //   semantic_clash          - can't be literally true / no literal sense here
            //   pragmatic_clash         - could be literally true, but no one would mean it that way
            //   l1_divergence           - differs from how my other language expresses it
            //   conventional_familiarity- a familiar figure of speech / common expression
            //   lexical_gap             - contains a word/phrase I didn't fully know
            //   processing_effort       - had to stop and work out what it meant
            //   other_text              - optional free-text (not a checkbox)
            class ReasoningChecklistPlugin {
              constructor(jsPsych) {
                this.jsPsych = jsPsych;
              }

              static REASONS = [
                { tag: "semantic_clash",           label: "It can\u2019t be literally true / it doesn\u2019t make sense literally here." },
                { tag: "pragmatic_clash",          label: "It could be literally true, but no one would really mean it that way." },
                { tag: "l1_divergence",            label: "It\u2019s different from how my other language would express this." },
                { tag: "conventional_familiarity", label: "It\u2019s a familiar figure of speech / a common expression." },
                { tag: "lexical_gap",              label: "It contains a word or phrase I didn\u2019t fully know." },
                { tag: "processing_effort",        label: "I had to stop and work out what it really meant." }
              ];

              static info = {
                name: "reasoning-checklist",
                version: "1.0.0",
                parameters: {
                  prompt:          { type: "HTML_STRING", default: "" },
                  segments:        { type: "COMPLEX",     default: [], array: true },
                  language:        { type: "STRING",      default: "" },
                  stimulus_id:     { type: "STRING",      default: "" },
                  serial_position: { type: "INT",         default: 0 },
                  // Task label written into the data; defaults to "reasoning",
                  // practice trial passes "practice_reasoning". Must be emitted
                  // by the plugin: finishTrial fields override the data param.
                  task:            { type: "STRING",      default: "reasoning" }
                },
                data: {
                  task:            { type: "STRING" },
                  stimulus_id:     { type: "STRING" },
                  serial_position: { type: "INT" },
                  language:        { type: "STRING" },
                  // One object per underlined segment:
                  //   { segment, segment_index,
                  //     reasons: { semantic_clash, pragmatic_clash, l1_divergence,
                  //                conventional_familiarity, lexical_gap, processing_effort },
                  //     other_text }
                  // (Reason binaries are nested under `reasons` so analysis never
                  //  mistakes bookkeeping fields like segment_index for a reason.)
                  instance_reasons: { type: "COMPLEX", array: true },
                  n_segments:       { type: "INT" }
                }
              };

              trial(display_element, trial) {
                const REASONS = ReasoningChecklistPlugin.REASONS;
                const segments = Array.isArray(trial.segments) ? trial.segments : [];

                // Edge case: nothing underlined -> log an empty record and move on.
                if (segments.length === 0) {
                  display_element.innerHTML = `
                    <div class="study-wrap instruction-box">
                      <h3>Brief Follow-up</h3>
                      <p>You did not underline any expressions in this passage.</p>
                      <div class="meta-tools">
                        <button id="reasoning-continue" type="button">Continue</button>
                      </div>
                    </div>
                  `;
                  display_element.querySelector("#reasoning-continue")
                    .addEventListener("click", () => {
                      this.jsPsych.finishTrial({
                        task: trial.task || "reasoning",
                        stimulus_id: trial.stimulus_id,
                        serial_position: trial.serial_position,
                        language: trial.language,
                        instance_reasons: [],
                        n_segments: 0
                      });
                    });
                  return;
                }

                const blocks = segments.map((seg, i) => {
                  const checkboxes = REASONS.map((r) => `
                    <label class="reason-option"><input type="checkbox" data-seg="${i}" data-reason="${r.tag}" /><span class="reason-text">${r.label}</span></label>
                  `).join("");

                  return `
                    <div class="passage-box reason-block">
                      <p class="reason-segment"><strong>You underlined:</strong>
                        \u201c${String(seg).replace(/</g, "&lt;").replace(/>/g, "&gt;")}\u201d</p>
                      <p class="reason-q">What made this seem metaphorical to you? (Check all that apply.)</p>
                      ${checkboxes}
                      <label class="reason-option reason-other"><span class="reason-text">Anything else? (optional)</span><textarea data-seg="${i}" data-reason="other_text" rows="2"></textarea></label>
                    </div>
                  `;
                }).join("");

                display_element.innerHTML = `
                  <div class="study-wrap instruction-box">
                    ${trial.prompt}
                    <div style="margin-top:16px;">${blocks}</div>
                    <div class="meta-tools">
                      <button id="reasoning-continue" type="button">Continue</button>
                    </div>
                  </div>
                `;

                display_element.querySelector("#reasoning-continue")
                  .addEventListener("click", () => {
                    const instance_reasons = segments.map((seg, i) => {
                      // Reason binaries live in their OWN object so that tallying
                      // "which reasons were checked" never picks up bookkeeping
                      // fields (segment_index, etc.). Every key in `reasons` is a
                      // real reason; metadata stays at the top level.
                      const reasons = {};
                      REASONS.forEach((r) => {
                        const box = display_element.querySelector(
                          `input[data-seg="${i}"][data-reason="${r.tag}"]`
                        );
                        reasons[r.tag] = box && box.checked ? 1 : 0;
                      });
                      const ta = display_element.querySelector(
                        `textarea[data-seg="${i}"][data-reason="other_text"]`
                      );
                      return {
                        segment: seg,
                        segment_index: i,
                        reasons: reasons,
                        other_text: ta ? ta.value.trim() : ""
                      };
                    });

                    this.jsPsych.finishTrial({
                      task: trial.task || "reasoning",
                      stimulus_id: trial.stimulus_id,
                      serial_position: trial.serial_position,
                      language: trial.language,
                      instance_reasons: instance_reasons,
                      n_segments: segments.length
                    });
                  });
              }
            }
          
            // -----------------------------
            // Study configuration
            // -----------------------------
            const STIMULI = [STIM_HV1, STIM_HV2, STIM_LV1, STIM_LV2];
          
            const ORDERS = [
              [0, 1, 2, 3],
              [1, 0, 3, 2],
              [2, 3, 0, 1],
              [3, 2, 1, 0]
            ];
          
            const PAIR_LANGUAGE_CONDITIONS = [
              { HV1: "de", HV2: "en", LV1: "de", LV2: "en" },
              { HV1: "de", HV2: "en", LV1: "en", LV2: "de" },
              { HV1: "en", HV2: "de", LV1: "de", LV2: "en" },
              { HV1: "en", HV2: "de", LV1: "en", LV2: "de" }
            ];
          
            function buildStimulusList(condition) {
              const orderIndex = condition % 4;
              const pairLanguageIndex = Math.floor(condition / 4);
          
              const order = ORDERS[orderIndex];
              const pairLanguages = PAIR_LANGUAGE_CONDITIONS[pairLanguageIndex];
          
              const languageByStimulusId = {
                HV1: pairLanguages.HV1,
                HV2: pairLanguages.HV2,
                LV1: pairLanguages.LV1,
                LV2: pairLanguages.LV2
              };
          
              return order.map((stimulusIndex, serialPos) => {
                const stim = STIMULI[stimulusIndex];
                const presentedLanguage = languageByStimulusId[stim.stimulus_id];
                const presentedText = presentedLanguage === "de" ? stim.de : stim.en;
                const presentedTitle = presentedLanguage === "de" ? stim.title_de : stim.title_en;
          
                return {
                  ...stim,
                  presented_language: presentedLanguage,
                  presented_text: presentedText,
                  presented_title: presentedTitle,
                  serial_position: serialPos + 1
                };
              });
            }
          
            // Practice passage now lives in stimuli.js as STIM_PRACTICE
            // (marker-wrapped, with coded_instances). The old plain-text
            // PRACTICE_PASSAGE_DE const has been removed.


            // -----------------------------
            // Trial builders
            // -----------------------------
            function makeReadingTrial(stim) {
              return {
                type: jsPsychHtmlButtonResponse,
                stimulus: `
                  <div class="study-wrap">
                    <div class="trial-header">Passage ${stim.serial_position} of 4</div>
                    <div class="language-badge">Language: ${stim.presented_language.toUpperCase()}</div>
                    <div class="passage-box">${stim.presented_text}</div>
                  </div>
                `,
                choices: ["Continue to recall"],
                data: {
                  task: "reading",
                  stimulus_id: stim.stimulus_id,
                  text_visibility_label: stim.text_visibility_label,
                  title: stim.presented_title,
                  source: stim.source,
                  presented_language: stim.presented_language,
                  serial_position: stim.serial_position
                }
              };
            }
          
            function makeRecallIntroTrial(stim) {
              return {
                type: jsPsychHtmlButtonResponse,
                stimulus: `
                  <div class="study-wrap instruction-box">
                    <h3>Recall Task</h3>
                    <p>Now that you have finished reading the passage, please write down everything you can remember from the passage you just read, in the language most comfortable for you.</p>
                    <p>Try to recall as much as possible: not just the main points, but every detail you can remember. You do not need to reproduce the exact wording from the text; you can rephrase or paraphrase.</p>
                    <p>If some parts were unclear or surprising, you may still include them as best you can.</p>
                    <p>When you are ready to begin writing, click the button below.</p>
                  </div>
                `,
                choices: ["Start recall"],
                data: {
                  task: "recall_intro",
                  stimulus_id: stim.stimulus_id,
                  text_visibility_label: stim.text_visibility_label,
                  title: stim.presented_title,
                  source: stim.source,
                  presented_language: stim.presented_language,
                  serial_position: stim.serial_position
                }
              };
            }
            
            function makeRecallTrial(stim, participantId, subject_id) {
              return {
                type: jsPsychSurveyText,
                preamble: `
                 <div class="study-wrap instruction-box">
                  <h3>Recall</h3>
                  <p>Please write down everything you remember from the passage, in the language most comfortable for you.</p>
                  <p>Try to include every detail you can recall, even if you were unsure or confused about it.</p>
                  <p>Click <strong>Continue</strong> when you are finished.</p>
                 </div>
                `,
                questions: [
                  {
                    prompt: "Your recall:",
                    name: "recall_text",
                    rows: 14,
                    columns: 80,
                    required: true
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "written_recall",
                  stimulus_id: stim.stimulus_id,
                  text_visibility_label: stim.text_visibility_label,
                  title: stim.presented_title,
                  source: stim.source,
                  presented_language: stim.presented_language,
                  serial_position: stim.serial_position
                }
              };
            }
          
            function makeUnderlineTrial(stim) {
              return {
                type: UnderlineMetaphorPlugin,
                prompt: `
                  <h3>Metaphor Underlining Task</h3>
                  <p>Now please look back at the same passage.</p>
                  <p>As you read, please underline any word or group of words that, in your judgment, is being used metaphorically.</p>
                  <p>Please use your own understanding of what counts as metaphorical language. There may be several examples, only a few, or none.</p>
                  <p>Underline the smallest stretch of text that carries the metaphorical use. This may be a single word, a phrase, or a longer expression.</p>
                  <p>For each expression you underline, the next screen will ask what made it seem metaphorical to you, so please mark the expressions that best reflect your own reading.</p>
                `,
                text: stim.presented_text,
                language: stim.presented_language.toUpperCase(),
                trial_id: String(stim.serial_position),
                stimulus_id: stim.stimulus_id,
                serial_position: stim.serial_position,
                task: "underline",
                coded_instances: stim.presented_language === "de"
                  ? (stim.metaphors_de || [])
                  : (stim.metaphors_en || []),
                data: {
                  task: "underline",
                  stimulus_id: stim.stimulus_id,
                  text_visibility_label: stim.text_visibility_label,
                  title: stim.presented_language === "de" ? stim.title_de : stim.title_en,
                  source: stim.source,
                  presented_language: stim.presented_language,
                  serial_position: stim.serial_position
                }
              };
            }
          
            function makeReasoningTrial(stim, jsPsych) {
              return {
                type: ReasoningChecklistPlugin,
                prompt: `
                  <h3>Brief Follow-up</h3>
                  <p>For each expression you underlined below, please tell us what made it
                     seem metaphorical to you. You may check more than one reason for each.</p>
                `,
                // segments are resolved at runtime from the preceding underline trial
                segments: function () {
                  const lastUnderline = jsPsych.data.get().filter({
                    task: "underline",
                    stimulus_id: stim.stimulus_id,
                    serial_position: stim.serial_position
                  }).last(1).values()[0];
                  return lastUnderline?.underlined_segments || [];
                },
                language: stim.presented_language.toUpperCase(),
                stimulus_id: stim.stimulus_id,
                serial_position: stim.serial_position,
                task: "reasoning",
                data: {
                  task: "reasoning",
                  stimulus_id: stim.stimulus_id,
                  text_visibility_label: stim.text_visibility_label,
                  title: stim.presented_title,
                  source: stim.source,
                  presented_language: stim.presented_language,
                  serial_position: stim.serial_position
                }
              };
            }
          
            function makePracticeIntroTrial() {
              return {
                type: jsPsychHtmlButtonResponse,
                stimulus: `
                  <div class="study-wrap instruction-box">
                    <h2>Practice Round</h2>
                    <p>Before the main study begins, you will complete one short practice round in German.</p>
                    <p>This practice will help you get used to the sequence of tasks:</p>
                    <p>1. reading a passage<br>
                    2. writing down everything you remember from it<br>
                    3. underlining language you judge to be metaphorical<br>
                    4. noting what made each underlined expression seem metaphorical</p>
                    <p>The practice responses are only for familiarization.</p>
                  </div>
                `,
                choices: ["Begin practice"]
              };
            }

            function makePracticeReadingTrial() {
              return {
                type: jsPsychHtmlButtonResponse,
                stimulus: `
                  <div class="study-wrap">
                    <div class="trial-header">Practice Passage</div>
                    <div class="language-badge">Language: DE</div>
                    <div class="passage-box">${STIM_PRACTICE.de}</div>
                  </div>
                `,
                choices: ["Continue to recall"],
                data: {
                  task: "practice_reading",
                  stimulus_id: "PRACTICE",
                  text_visibility_label: "practice",
                  title: "Practice passage",
                  source: "Aichinger practice excerpt",
                  presented_language: "de",
                  serial_position: 0
                }
              };
            }

            function makePracticeRecallIntroTrial() {
              return {
                type: jsPsychHtmlButtonResponse,
                stimulus: `
                  <div class="study-wrap instruction-box">
                    <h3>Practice Recall</h3>
                    <p>Now please write down everything you can remember from the passage you just read, in the language most comfortable for you.</p>
                    <p>Try to recall as much as possible: not just the main points, but every detail you can remember.</p>
                    <p>When you are ready to begin writing, click the button below.</p>
                  </div>
                `,
                choices: ["Start recall"],
                data: {
                  task: "practice_recall_intro",
                  stimulus_id: "PRACTICE",
                  text_visibility_label: "practice",
                  title: "Practice passage",
                  source: "Fussenegger practice excerpt",
                  presented_language: "de",
                  serial_position: 0
                }
              };
            }

            function makePracticeRecallTrial(participantId, subject_id) {
              return {
                type: jsPsychSurveyText,
                preamble: `
  <div class="study-wrap instruction-box">
    <h3>Practice Recall</h3>
    <p>Please write down everything you remember from the passage, in the language most comfortable for you.</p>
    <p>Try to include every detail you can recall, even if you were unsure or confused about it.</p>
    <p>Click <strong>Continue</strong> when you are finished.</p>
  </div>
`,
                questions: [
                  {
                    prompt: "Your recall:",
                    name: "recall_text",
                    rows: 14,
                    columns: 80,
                    required: true
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "practice_written_recall",
                  stimulus_id: "PRACTICE",
                  text_visibility_label: "practice",
                  title: "Practice passage",
                  source: "Aichinger practice excerpt",
                  presented_language: "de",
                  serial_position: 0
                }
              };
            }

            function makeTransitionToMainTrial() {
              return {
                type: jsPsychHtmlButtonResponse,
                stimulus: `
                  <div class="study-wrap instruction-box">
                    <h2>Main Study</h2>
                    <p>The practice round is now complete.</p>
                    <p>You will now begin the main part of the study.</p>
                    <p>Please continue to read carefully, recall as much as you can, and mark any language you judge to be metaphorical.</p>
                  </div>
                `,
                choices: ["Begin main study"]
              };
            }

            function makePracticeUnderlineTrial() {
              return {
                type: UnderlineMetaphorPlugin,
                prompt: `
                  <h3>Practice Metaphor Underlining Task</h3>
                  <p>Now please look back at the same passage.</p>
                  <p>As you read, please underline any word or group of words that, in your judgment, is being used metaphorically.</p>
                  <p>Please use your own understanding of what counts as metaphorical language. There may be several examples, only a few, or none.</p>
                  <p>Underline the smallest stretch of text that carries the metaphorical use. This may be a single word, a phrase, or a longer expression.</p>
                  <p>For each expression you underline, the next screen will ask what made it seem metaphorical to you, so please mark the expressions that best reflect your own reading.</p>
                `,
                text: STIM_PRACTICE.de,
                language: "DE",
                trial_id: "Practice",
                stimulus_id: "PRACTICE",
                serial_position: 0,
                task: "practice_underline",
                coded_instances: STIM_PRACTICE.metaphors_de || [],
                data: {
                  task: "practice_underline",
                  stimulus_id: "PRACTICE",
                  text_visibility_label: "practice",
                  title: "Practice passage",
                  source: "Aichinger practice excerpt",
                  presented_language: "de",
                  serial_position: 0
                }
              };
            }

            function makePracticeReasoningTrial(jsPsych) {
              return {
                type: ReasoningChecklistPlugin,
                prompt: `
                  <h3>Practice Follow-up</h3>
                  <p>For each expression you underlined below, please tell us what made it
                     seem metaphorical to you. You may check more than one reason for each.</p>
                  <p>You will be asked to do this after every passage in the main study, so this
                     practice round is a chance to get used to it.</p>
                `,
                segments: function () {
                  const lastUnderline = jsPsych.data.get().filter({
                    task: "practice_underline",
                    stimulus_id: "PRACTICE",
                    serial_position: 0
                  }).last(1).values()[0];
                  return lastUnderline?.underlined_segments || [];
                },
                language: "DE",
                stimulus_id: "PRACTICE",
                serial_position: 0,
                task: "practice_reasoning",
                data: {
                  task: "practice_reasoning",
                  stimulus_id: "PRACTICE",
                  text_visibility_label: "practice",
                  title: "Practice passage",
                  source: "Aichinger practice excerpt",
                  presented_language: "de",
                  serial_position: 0
                }
              };
            }

            // -----------------------------
            // Metaphor-conception probe (metalinguistic).
            // Placed AFTER the reading/underlining/reasoning tasks (so it does
            // not prime recognition) and BEFORE the background survey.
            // NOT scored against a key (there is no single agreed definition of
            // metaphor); analyzed as a participant-level MODERATOR of recognition.
            // Free text FIRST (their own conception), then the closed
            // narrow/broad dimension item (reads as a clarification of what they
            // just wrote, not a prime). Tagged task: "metaphor_conception".
            // -----------------------------
            function makeMetaphorConceptionOpenTrial() {
              return {
                type: jsPsychSurveyText,
                preamble: `
                  <div class="study-wrap instruction-box">
                    <h3>One Last Question About Language</h3>
                    <p>Before the final background questions, we are interested in
                       your own view.</p>
                  </div>
                `,
                questions: [
                  {
                    prompt: "In your own words, what is a metaphor? There is no right or wrong answer — we are interested in how you think about it.",
                    name: "metaphor_definition_open",
                    rows: 5,
                    columns: 80,
                    required: true
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "metaphor_conception",
                  subtask: "open"
                }
              };
            }

            function makeMetaphorConceptionDimensionTrial() {
              // Single-select locating the participant on a narrow<->broad cline.
              // Option ORDER is fixed here (narrow -> broad) for interpretability;
              // response is recorded as the option TEXT, so scoring/coding in R
              // keys on the text, not the position.
              return {
                type: jsPsychSurveyMultiChoice,
                preamble: `
                  <div class="study-wrap instruction-box">
                    <h3>One Last Question About Language</h3>
                    <p>Thinking about what you just wrote, which statement best
                       matches how you understand the word "metaphor"?</p>
                  </div>
                `,
                questions: [
                  {
                    prompt: "A metaphor is…",
                    name: "metaphor_conception_breadth",
                    options: [
                      "only an explicit comparison using words like \u201clike\u201d or \u201cas\u201d (e.g., \u201cbrave as a lion\u201d)",
                      "a direct comparison that calls one thing another (e.g., \u201cmy lawyer is a shark\u201d), but not \u201clike/as\u201d comparisons",
                      "any expression where one thing is described in terms of another, including everyday phrases (e.g., \u201cgrasp an idea\u201d)",
                      "any non-literal or figurative language at all, broadly defined"
                    ],
                    required: true
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "metaphor_conception",
                  subtask: "breadth_dimension"
                }
              };
            }

            function makeSurveyIntroTrial() {
              return {
                type: jsPsychHtmlButtonResponse,
                stimulus: `
                  <div class="study-wrap instruction-box">
                    <h2>Background Survey</h2>
                    <p>You have now completed the reading tasks.</p>
                    <p>Next, please answer a short survey about your language background.</p>
                    <p>This study is designed for participants whose first language is English and who have learned German as an additional language.</p>
                  </div>
                `,
                choices: ["Begin survey"],
                data: {
                  task: "survey_intro",
                  l1: "English",
                  l2: "German"
                }
              };
            }

            function makeSurveyDemographicsTrial() {
              return {
                type: jsPsychSurveyMultiChoice,
                preamble: `
                  <div class="study-wrap instruction-box">
                    <h3>Demographic Information</h3>
                  </div>
                `,
                questions: [
                  {
                    prompt: "What is your gender?",
                    name: "gender",
                    options: ["Female", "Male", "Non-binary", "Prefer not to say", "Other"],
                    required: false
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "survey_demographics"
                }
              };
            }

            function makeSurveyAgeTrial() {
              return {
                type: jsPsychSurveyText,
                preamble: `
                  <div class="study-wrap instruction-box">
                    <h3>Age</h3>
                  </div>
                `,
                questions: [
                  {
                    prompt: "What is your age?",
                    name: "age",
                    required: true
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "survey_age"
                }
              };
            }

            function makeSurveyLanguageBackgroundTrial() {
              return {
                type: jsPsychSurveyText,
                preamble: `
                  <div class="study-wrap instruction-box">
                    <h3>Language Background</h3>
                    <p>For this study, English is treated as your L1 and German as your L2.</p>
                  </div>
                `,
                questions: [
                  {
                    prompt: "What is your country of birth?",
                    name: "country_of_birth",
                    required: true
                  },
                  {
                    prompt: "Please list any countries, other than your country of birth, where you have lived for three months or longer. Include approximate ages or years. If none, write 'None'.",
                    name: "residency_details",
                    rows: 4,
                    columns: 80,
                    required: true
                  },
                  {
                    prompt: "Did you grow up multilingual, or do you speak another language that you also consider one of your native languages? If yes, please briefly explain. If no, write 'No'.",
                    name: "multilingual_native_language_background",
                    rows: 4,
                    columns: 80,
                    required: true
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "survey_language_background",
                  l1: "English",
                  l2: "German"
                }
              };
            }

            function makeSurveyGermanBackgroundTrial() {
              return {
                type: jsPsychSurveyText,
                preamble: `
                  <div class="study-wrap instruction-box">
                    <h3>German Background</h3>
                  </div>
                `,
                questions: [
                  {
                    prompt: "At what age were you first exposed to German? Include exposure through school, family, media, travel, or other contexts.",
                    name: "german_first_exposure_age",
                    required: true
                  },
                  {
                    prompt: "Describe your formal instruction in German. Include the age or year you began, the kinds of courses you completed, and approximately how long you studied German formally. If you have not received formal instruction in German, write 'None'.",
                    name: "german_formal_instruction_details",
                    rows: 4,
                    columns: 80,
                    required: true
                  },
                  {
                    prompt: "Have you ever lived in a German-speaking country? If yes, list the country or countries, approximate ages or years, and duration of stay. If no, write 'None'.",
                    name: "german_immersion_details",
                    rows: 4,
                    columns: 80,
                    required: true
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "survey_german_background",
                  l1: "English",
                  l2: "German"
                }
              };
            }

            function makeSurveyGermanProficiencyTrial() {
              return {
                type: jsPsychSurveyLikert,
                preamble: `
                  <div class="study-wrap instruction-box">
                    <h3>German Proficiency</h3>
                    <p>Please answer using the scale below.</p>
                  </div>
                `,
                questions: [
                  {
                    prompt: "How would you rate your current overall proficiency in German?",
                    name: "german_current_proficiency",
                    labels: [
                      "1 = not proficient",
                      "2",
                      "3",
                      "4",
                      "5 = extremely proficient"
                    ],
                    required: true
                  },
                  {
                    prompt: "What is the highest level of German proficiency you have ever had?",
                    name: "german_highest_proficiency",
                    labels: [
                      "1 = not proficient",
                      "2",
                      "3",
                      "4",
                      "5 = extremely proficient"
                    ],
                    required: true
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "survey_german_proficiency",
                  l1: "English",
                  l2: "German"
                }
              };
            }

            function makeSurveyLanguageUseTrial() {
              return {
                type: jsPsychSurveyMultiChoice,
                preamble: `
                  <div class="study-wrap instruction-box">
                    <h3>Language Use and Dominance</h3>
                  </div>
                `,
                questions: [
                  {
                    prompt: "Which language do you use most often now?",
                    name: "language_used_most",
                    options: ["English", "German", "About equal"],
                    required: true
                  },
                  {
                    prompt: "Which language do you currently consider stronger?",
                    name: "stronger_language",
                    options: ["English", "German", "About equal"],
                    required: true
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "survey_language_use",
                  l1: "English",
                  l2: "German"
                }
              };
            }

            function makeSurveyOtherLanguagesTrial() {
              return {
                type: jsPsychSurveyText,
                preamble: `
                  <div class="study-wrap instruction-box">
                    <h3>Other Languages</h3>
                  </div>
                `,
                questions: [
                  {
                    prompt: "Please list any languages you have studied or used other than English and German, along with your approximate proficiency in each. If none, write 'None'.",
                    name: "other_languages_details",
                    rows: 4,
                    columns: 80,
                    required: true
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "survey_other_languages",
                  l1: "English",
                  l2: "German"
                }
              };
            }

            // -----------------------------
            // Receptive vocabulary (Leipzig VLT-German)
            // -----------------------------
            // The vocabulary test is an external, self-contained app hosted on
            // itt-leipzig.de; it does not post results back to this page. The
            // participant launches it in a new tab, completes all five levels,
            // and then transcribes two numbers from its results screen:
            //   - Erreichte Punktzahl (points achieved, out of 150)
            //   - the percentage shown (e.g. 91)
            // These are not redundant: points/150 should ≈ percentage, so the
            // two together give an internal consistency check (vlt_flag).
            function makeVocabLaunchTrial() {
              return {
                type: jsPsychInstructions,
                pages: [
                  `
                  <div class="study-wrap instruction-box">
                    <h3>German Vocabulary Test</h3>
                    <p>Next you will complete a short German vocabulary test on an external site.</p>
                    <p><strong>Click the link below to open the test in a new tab.</strong>
                       Complete all five levels. At the end you will see a results page
                       showing your total score and a percentage.</p>
                    <p style="margin-top:16px;">
                      <a href="https://itt-leipzig.de/static/vltgerman_01.2r/index.html"
                         target="_blank" rel="noopener noreferrer" style="font-size:17px;">
                         &#9654; Open the vocabulary test (new tab)</a>
                    </p>
                    <p class="small-note">Leave this window open. When the results page appears,
                       return here and click &ldquo;Continue&rdquo; to enter your scores.</p>
                  </div>
                  `
                ],
                show_clickable_nav: true,
                button_label_next: "Continue",
                data: {
                  task: "vocab_launch",
                  l1: "English",
                  l2: "German"
                }
              };
            }

            function makeVocabScoresTrial() {
              return {
                type: jsPsychSurveyText,
                preamble: `
                  <div class="study-wrap instruction-box">
                    <h3>German Vocabulary Test &mdash; Your Results</h3>
                    <p>Enter both numbers from your results page.</p>
                    <p class="small-note">The points total is the &ldquo;Erreichte Punktzahl&rdquo;
                       number (like <strong>136</strong>, out of 150). The percentage is shown in
                       the circle (like <strong>91</strong>%).</p>
                    <p class="small-note" style="margin-top:10px;"><strong>Please enter exactly the
                       numbers shown on your results page.</strong> Accurate entry is important for
                       the study's data analysis.</p>
                  </div>
                `,
                questions: [
                  {
                    prompt: "Total points achieved (Erreichte Punktzahl, out of 150), e.g. 136",
                    name: "vlt_points",
                    required: true
                  },
                  {
                    prompt: "Percentage shown, e.g. 91 (enter the number only, without the % sign)",
                    name: "vlt_percent",
                    required: true
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "vocab_scores",
                  l1: "English",
                  l2: "German"
                },
                on_finish: function (data) {
                  const pts = parseInt(data.response.vlt_points, 10);
                  const pct = parseFloat(String(data.response.vlt_percent).replace("%", "").trim());
                  data.vlt_points_num = isNaN(pts) ? null : pts;
                  data.vlt_percent_num = isNaN(pct) ? null : pct;
                  // Range checks + internal consistency: points/150 should ≈ stated percentage.
                  const expectedPct = isNaN(pts) ? null : (pts / 150) * 100;
                  data.vlt_flag = (
                    isNaN(pts) || pts < 0 || pts > 150 ||
                    isNaN(pct) || pct < 0 || pct > 100 ||
                    (expectedPct !== null && Math.abs(expectedPct - pct) > 2)
                  );
                }
              };
            }


            // -----------------------------
            // Start experiment after ID entry
            // -----------------------------
            async function startExperiment(participantId) {
              // Balanced, server-side sequential condition assignment (0–15).
              // REQUIRES "Number of conditions" = 16 set on the DataPipe
              // dashboard for experiment pyYN5xjQ1Iey, or the counter will not
              // reset correctly and assignment will be unbalanced.
              let assignedCondition;
              try {
                assignedCondition = await jsPsychPipe.getCondition(EXPERIMENT_ID);
              } catch (err) {
                console.error("DataPipe getCondition failed:", err);
                alert("There was a problem starting the study. Please check your connection and try again.");
                return;
              }

              const assignedStimuli = buildStimulusList(assignedCondition);
          
              const jsPsych = initJsPsych({});

              const subject_id = jsPsych.randomization.randomID(10);

              jsPsych.data.addProperties({
                participant_id: participantId,
                subject_id: subject_id,
                condition: assignedCondition
              });
          
              const time_disclaimer = {
                type: jsPsychHtmlButtonResponse,
                stimulus: `
                  <div class="study-wrap instruction-box">
                    <h2>Before you start</h2>
                    <p>Please set aside enough uninterrupted time to complete this study in
                       one sitting. Most participants finish within about <strong>90 minutes</strong>.</p>
                    <p>There is no time limit, so please work carefully at your own pace.
                       If the study takes you considerably longer than expected, you may
                       contact the researcher afterward — additional compensation may be
                       available.</p>
                    <p>When you are ready to begin, click below.</p>
                  </div>
                `,
                choices: ["I'm ready to begin"],
                data: {
                  task: "time_disclaimer"
                }
              };

              const general_intro = {
                type: jsPsychHtmlButtonResponse,
                stimulus: `
                  <div class="study-wrap instruction-box">
                    <h2>Instructions</h2>
                    <p>You will read several short passages in German and English.</p>
                    <p>After each passage, you will first write down everything you can remember from it, <strong>in the language you feel most comfortable with</strong>.</p>
                    <p>You will then look back at the same passage and underline any language you judge to be metaphorical, and briefly note what made each expression seem metaphorical to you.</p>
                    <p>Please read carefully and work at your own pace.</p>
                  </div>
                `,
                choices: ["Begin"]
              };

              // Background-knowledge battery (Bernhardt 2011 compensatory model).
              // Defined in background_knowledge_construct.js, exported as
              // window.bk_battery. Runs BEFORE the practice and reading trials so
              // a self-rating can't prime the tested items, and tested blocks
              // precede the self-report block. Guarded so a missing include fails
              // loudly rather than silently dropping the battery.
              if (!window.bk_battery) {
                console.error("background_knowledge_construct.js not loaded: window.bk_battery is undefined.");
                alert("There was a problem starting the study (missing background module). Please contact the researcher.");
                return;
              }
              const bk = window.bk_battery;
              const backgroundKnowledgeTimeline = [
                bk.bk_intro,
                bk.block1a_hist,
                bk.block1b_litgenre,
                bk.block1c_art,
                bk.block2_selfreport
              ];

              // Receptive vocabulary (Leipzig VLT-German). Placed FIRST, right
              // after the intro and before the background battery: it is a
              // self-contained external test launched in a new tab, so we get
              // it out of the way before the in-page tasks begin.
              const vocabTimeline = [
                makeVocabLaunchTrial(),
                makeVocabScoresTrial()
              ];

              const practiceTimeline = [
                makePracticeIntroTrial(),
                makePracticeReadingTrial(),
                makePracticeRecallIntroTrial(),
                makePracticeRecallTrial(participantId, subject_id),
                makePracticeUnderlineTrial(),
                makePracticeReasoningTrial(jsPsych),
                makeTransitionToMainTrial()
              ];

              // Midpoint message: shown once, immediately after the participant
              // finishes the SECOND text's block (serial_position === 2). Keyed
              // on serial position rather than a fixed array index so it stays
              // correct under every condition's stimulus order.
              const halfway_message = {
                type: jsPsychHtmlButtonResponse,
                stimulus: `
                  <div class="study-wrap instruction-box">
                    <h2>You're halfway there</h2>
                    <p>You have completed two of the four passages. Nice work.</p>
                    <p>Feel free to take a short break if you need one, then click below
                       to continue with the second half.</p>
                  </div>
                `,
                choices: ["Continue"],
                data: {
                  task: "halfway_message"
                }
              };

              const trialTimeline = assignedStimuli.flatMap((stim) => {
                const block = [
                  makeReadingTrial(stim),
                  makeRecallIntroTrial(stim),
                  makeRecallTrial(stim, participantId, subject_id),
                  makeUnderlineTrial(stim),
                  makeReasoningTrial(stim, jsPsych)
                ];
                // splice the halfway interstitial in after the 2nd passage
                if (stim.serial_position === 2) {
                  block.push(halfway_message);
                }
                return block;
              });
          
              const surveyTimeline = [
                makeSurveyIntroTrial(),
                makeSurveyDemographicsTrial(),
                makeSurveyAgeTrial(),
                makeSurveyLanguageBackgroundTrial(),
                makeSurveyGermanBackgroundTrial(),
                makeSurveyGermanProficiencyTrial(),
                makeSurveyLanguageUseTrial(),
                makeSurveyOtherLanguagesTrial()
              ];

              // Metaphor-conception probe: runs AFTER reading, BEFORE survey.
              const conceptionTimeline = [
                makeMetaphorConceptionOpenTrial(),
                makeMetaphorConceptionDimensionTrial()
              ];

          
              const filename = `${subject_id}_${participantId}_condition${assignedCondition}.csv`;

              const save_data = {
                type: jsPsychPipe,
                action: "save",
                experiment_id: EXPERIMENT_ID,
                filename: filename,
                data_string: ()=>jsPsych.data.get().csv()
              };

              const thank_you = {
                type: jsPsychHtmlButtonResponse,
                stimulus: `
                  <div class="study-wrap instruction-box">
                    <h2>Finished</h2>
                    <p>Thank you for participating.</p>
                    <p>Please click below to submit your responses.</p>
                  </div>
                `,
                choices: ["Submit"]
              };
          
              jsPsych.run([
                time_disclaimer,
                general_intro,
                ...vocabTimeline,
                ...backgroundKnowledgeTimeline,
                ...practiceTimeline,
                ...trialTimeline,
                ...conceptionTimeline,
                ...surveyTimeline,
                save_data,
                thank_you
              ]);
            }
          
            // -----------------------------
            // Pre-jsPsych entry: collect name + email, generate a payment code,
            // save PII to the SEPARATE roster experiment, show the code, then start.
            // The research data only ever receives the payment code (as
            // participant_id) — never the name or email.
            // -----------------------------
            document.body.innerHTML = `
              <div class="study-wrap">
                <div class="instruction-box">
                  <h2>Reading Study</h2>
                  <p>Please enter your name and email. We use these only to send
                     your participation payment. After you continue, you will be
                     shown a personal code to keep for payment.</p>
                  <p style="font-size:14px; color:#555;">Your name and email are
                     stored separately from your study responses, which remain
                     anonymous.</p>
                  <label style="display:block; margin:14px 0 4px;">Full name</label>
                  <input id="pp-name" type="text" autocomplete="name"
                    style="font-size:18px; padding:10px; width:100%; max-width:420px;" />
                  <label style="display:block; margin:14px 0 4px;">Email</label>
                  <input id="pp-email" type="email" autocomplete="email"
                    style="font-size:18px; padding:10px; width:100%; max-width:420px;" />
                  <div id="pp-error" style="color:#b00020; margin-top:10px;"></div>
                  <br />
                  <button id="start-study-btn" style="font-size:18px; padding:10px 18px; margin-top:8px;">
                    Continue
                  </button>
                </div>
              </div>
            `;

            document.getElementById("start-study-btn").addEventListener("click", async function () {
              const name = document.getElementById("pp-name").value.trim();
              const email = document.getElementById("pp-email").value.trim();
              const err = document.getElementById("pp-error");
              const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
              if (!name) { err.textContent = "Please enter your name."; return; }
              if (!emailOk) { err.textContent = "Please enter a valid email address."; return; }

              const paymentId = generatePaymentId();

              // Save PII to the separate roster experiment (NOT the research data).
              // Uses DataPipe's documented REST endpoint directly.
              if (ROSTER_EXPERIMENT_ID && ROSTER_EXPERIMENT_ID !== "REPLACE_WITH_ROSTER_EXPERIMENT_ID") {
                try {
                  const rosterRow = JSON.stringify([{
                    payment_id: paymentId,
                    name: name,
                    email: email,
                    timestamp: new Date().toISOString()
                  }]);
                  await fetch("https://pipe.jspsych.org/api/data/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Accept": "*/*" },
                    body: JSON.stringify({
                      experimentID: ROSTER_EXPERIMENT_ID,
                      filename: `${paymentId}.json`,
                      data: rosterRow
                    })
                  });
                } catch (e) {
                  console.error("Roster save failed:", e);
                  // Do not block participation if roster save fails; the code is
                  // still shown so the participant can report it for payment.
                }
              } else {
                console.warn("ROSTER_EXPERIMENT_ID not set — PII roster not saved.");
              }

              // Show the payment code and require acknowledgment before starting.
              document.body.innerHTML = `
                <div class="study-wrap">
                  <div class="instruction-box">
                    <h2>Your Payment Code</h2>
                    <p>Please write this code down and keep it. You will need it to
                       receive your payment:</p>
                    <p style="font-size:30px; font-weight:bold; letter-spacing:2px; margin:18px 0;">
                      ${paymentId}
                    </p>
                    <p style="font-size:14px; color:#555;">This code is not shown again.</p>
                    <br />
                    <button id="ack-code-btn" style="font-size:18px; padding:10px 18px;">
                      I have saved my code — begin the study
                    </button>
                  </div>
                </div>
              `;
              document.getElementById("ack-code-btn").addEventListener("click", async function () {
                document.body.innerHTML = "";
                await startExperiment(paymentId);
              });
            });
          })();