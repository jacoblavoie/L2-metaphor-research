/* global initJsPsych, jsPsychHtmlButtonResponse, jsPsychSurveyText,
          jsPsychSurveyMultiChoice, jsPsychSurveyLikert,
          jsPsychInitializeMicrophone, jsPsychHtmlAudioResponse,
          jsPsychPipe,
          STIM_HV1, STIM_HV2, STIM_LV1, STIM_LV2 */

          const EXPERIMENT_ID = "pyYN5xjQ1Iey";

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
                    task: "underline",
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
                  serial_position: { type: "INT",         default: 0 }
                },
                data: {
                  task:            { type: "STRING" },
                  stimulus_id:     { type: "STRING" },
                  serial_position: { type: "INT" },
                  language:        { type: "STRING" },
                  // One object per underlined segment:
                  //   { segment, segment_index, semantic_clash, pragmatic_clash,
                  //     l1_divergence, conventional_familiarity, lexical_gap,
                  //     processing_effort, other_text }
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
                        task: "reasoning",
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
                    <label class="reason-option">
                      <input type="checkbox" data-seg="${i}" data-reason="${r.tag}" />
                      ${r.label}
                    </label>
                  `).join("");

                  return `
                    <div class="passage-box reason-block">
                      <p class="reason-segment"><strong>You underlined:</strong>
                        \u201c${String(seg).replace(/</g, "&lt;").replace(/>/g, "&gt;")}\u201d</p>
                      <p class="reason-q">What made this seem metaphorical to you? (Check all that apply.)</p>
                      ${checkboxes}
                      <label class="reason-option reason-other">
                        Anything else? (optional)
                        <textarea data-seg="${i}" data-reason="other_text"
                          rows="2"></textarea>
                      </label>
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
                      const record = { segment: seg, segment_index: i };
                      REASONS.forEach((r) => {
                        const box = display_element.querySelector(
                          `input[data-seg="${i}"][data-reason="${r.tag}"]`
                        );
                        record[r.tag] = box && box.checked ? 1 : 0;
                      });
                      const ta = display_element.querySelector(
                        `textarea[data-seg="${i}"][data-reason="other_text"]`
                      );
                      record.other_text = ta ? ta.value.trim() : "";
                      return record;
                    });

                    this.jsPsych.finishTrial({
                      task: "reasoning",
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
          
            const PRACTICE_PASSAGE_DE = `Wie oft hat er sich in diesem Leben bereits von Bagdad verabschiedet? Drei Mal. Das erste Mal war, als das ganze Land noch unter der Diktatur litt. Er stand vor dem Grenzposten Trebil an der jordanischen Grenze. Es gab um ihn herum weit und breit nur Wüste. Er hatte Angst, sein ganzer Körper zitterte, sein Herz pochte wie ein Presslufthammer und schien ihm bald aus dem Brustkorb zu springen. Er versuchte, langsam ein- und auszuatmen, aber es gelang ihm nicht, die Nervosität war gewaltig. Er konnte nicht glauben, dass er wirklich ausreisen durfte. Das Land war ein riesiger Käfig, alle Insassen waren entweder Soldaten oder Sklaven der eigenen Regierung. Heimaten sind oft nur Gefängnisse – mit zugelassenen Folterinstrumenten. Aber Said stand nun kurz davor, das Gefängnistor zu passieren. Sein Reisepass war nicht gefälscht, er hatte alles ordnungsgemäß, allerdings auch mit Bestechung, erledigt. Trotzdem erschien es Said Al-Wahid unwirklich, dass er irgendwohin gehen konnte, wo die Fotos und Statuen des Präsidenten und das Antlitz seiner bewaffneten Männer nicht überall zu sehen sein würden. Sie waren wie die Gespenster eines langen, scheinbar nie enden wollenden Albtraums.`;

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
                    <h3>Oral Recall Task</h3>
                    <p>Now that you have finished reading the passage, please recall aloud as much as you can from the passage you just read, in the language most comfortable for you.</p>
                    <p>Please tell us, in your own words, everything you remember from the passage. Try to be as complete and detailed as possible. You do not need to repeat the exact wording from the text; you can rephrase or paraphrase.</p>
                    <p>We are interested in the ideas, points, and overall message you took away from the passage.</p>
                    <p>If some parts were unclear or surprising, you may still include them in your recall as best you can.</p>
                    <p>When you are ready to begin speaking, click the button below.</p>
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
                type: jsPsychHtmlAudioResponse,
                stimulus: `
                 <div class="study-wrap instruction-box">
                  <div style="display:flex; align-items:center; gap:10px; justify-content:center; margin-bottom:16px;">
                    <span class="recording-indicator"></span>
                    <span style="color:#b00000; font-weight:700; font-size:20px;">
                      Recording in progress
                    </span>
                  </div>

                  <h3>Oral Recall</h3>
                  <p>Please speak now.</p>
                  <p>Try to include everything you remember, even if you were unsure or confused.</p>
                  <p>Click <strong>End Recall / Continue</strong> when you are finished.</p>
                 </div>
                `,
                recording_duration: null,
                show_done_button: true,
                done_button_label: "End Recall / Continue",
                allow_playback: false,
                data: {
                  task: "oral_recall",
                  stimulus_id: stim.stimulus_id,
                  text_visibility_label: stim.text_visibility_label,
                  title: stim.presented_title,
                  source: stim.source,
                  presented_language: stim.presented_language,
                  serial_position: stim.serial_position
                },
                on_finish: async function(data) {
                  const audioFilename = `${subject_id}_${participantId}_${stim.stimulus_id}_${stim.serial_position}_recall.webm`;
                  await jsPsychPipe.saveBase64Data(EXPERIMENT_ID, audioFilename, data.response);
                  data.response = audioFilename;
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
                  <p>Please underline the smallest stretch of text that you think carries the metaphorical use. This may be a single word, a phrase, or a longer expression. If you are unsure, you may still underline it.</p>
                  <p>Some people may mark more expressions than others; please make the selections that best reflect your own reading. We are interested in how you read the passage and what you notice while reading.</p>
                `,
                text: stim.presented_text,
                language: stim.presented_language.toUpperCase(),
                trial_id: String(stim.serial_position),
                stimulus_id: stim.stimulus_id,
                serial_position: stim.serial_position,
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
                    2. recalling it aloud<br>
                    3. underlining language you judge to be metaphorical</p>
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
                    <div class="passage-box">${PRACTICE_PASSAGE_DE}</div>
                  </div>
                `,
                choices: ["Continue to recall"],
                data: {
                  task: "practice_reading",
                  stimulus_id: "PRACTICE",
                  text_visibility_label: "practice",
                  title: "Practice passage",
                  source: "Khider practice excerpt",
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
                    <h3>Practice Oral Recall</h3>
                    <p>Now please recall aloud as much as you can from the passage you just read, in the language most comfortable for you.</p>
                    <p>Please tell us, in your own words, everything you remember from the passage. Try to be as complete and detailed as possible.</p>
                    <p>When you are ready to begin speaking, click the button below.</p>
                  </div>
                `,
                choices: ["Start recall"],
                data: {
                  task: "practice_recall_intro",
                  stimulus_id: "PRACTICE",
                  text_visibility_label: "practice",
                  title: "Practice passage",
                  source: "Khider practice excerpt",
                  presented_language: "de",
                  serial_position: 0
                }
              };
            }

            function makePracticeRecallTrial(participantId, subject_id) {
              return {
                type: jsPsychHtmlAudioResponse,
                stimulus: `
  <div class="study-wrap instruction-box">
    <div style="display:flex; align-items:center; gap:10px; justify-content:center; margin-bottom:16px;">
      <span class="recording-indicator"></span>
      <span style="color:#b00000; font-weight:700; font-size:20px;">
        Recording in progress
      </span>
    </div>

    <h3>Oral Recall</h3>
    <p>Please speak now.</p>
    <p>Try to include everything you remember, even if you were unsure or confused.</p>
    <p>Click <strong>End Recall / Continue</strong> when you are finished.</p>
  </div>
`,
                recording_duration: null,
                show_done_button: true,
                done_button_label: "End Recall / Continue",
                allow_playback: false,
                data: {
                  task: "practice_oral_recall",
                  stimulus_id: "PRACTICE",
                  text_visibility_label: "practice",
                  title: "Practice passage",
                  source: "Khider practice excerpt",
                  presented_language: "de",
                  serial_position: 0
                },
                on_finish: async function(data) {
                  const audioFilename = `${subject_id}_${participantId}_PRACTICE_recall.webm`;
                  await jsPsychPipe.saveBase64Data(EXPERIMENT_ID, audioFilename, data.response);
                  data.response = audioFilename;
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
                  <p>Please underline the smallest stretch of text that you think carries the metaphorical use. This may be a single word, a phrase, or a longer expression. If you are unsure, you may still underline it.</p>
                  <p>Some people may mark more expressions than others; please make the selections that best reflect your own reading.</p>
                `,
                text: PRACTICE_PASSAGE_DE,
                language: "DE",
                trial_id: "Practice",
                stimulus_id: "PRACTICE",
                serial_position: 0,
                data: {
                  task: "practice_underline",
                  stimulus_id: "PRACTICE",
                  text_visibility_label: "practice",
                  title: "Practice passage",
                  source: "Khider practice excerpt",
                  presented_language: "de",
                  serial_position: 0
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
                  </div>
                `,
                choices: ["Begin survey"]
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
                    options: ["Female", "Male", "Prefer not to say", "Other"],
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
            
            function makeSurveyLanguageBackgroundTrial1() {
              return {
                type: jsPsychSurveyText,
                preamble: `
                  <div class="study-wrap instruction-box">
                    <h3>Language Background</h3>
                  </div>
                `,
                questions: [
                  {
                    prompt: "What is/are your native language(s) (L1)?",
                    name: "l1",
                    required: true
                  },
                  {
                    prompt: "What is your country of birth?",
                    name: "country_of_birth",
                    required: true
                  },
                  {
                    prompt: "If you have lived in countries other than your country of birth, please list the countries and the ages you lived there. If not, leave blank.",
                    name: "residency_details",
                    rows: 4,
                    columns: 80,
                    required: false
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "survey_language_background_1"
                }
              };
            }
            
            function makeSurveyResidenceCheckTrial() {
              return {
                type: jsPsychSurveyMultiChoice,
                preamble: `
                  <div class="study-wrap instruction-box">
                    <h3>Residence History</h3>
                  </div>
                `,
                questions: [
                  {
                    prompt: "Have you ever lived in a country other than your country of birth?",
                    name: "lived_elsewhere",
                    options: ["Yes", "No"],
                    required: true
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "survey_residence_check"
                }
              };
            }
            
            function makeSurveyL2Trial1() {
              return {
                type: jsPsychSurveyText,
                preamble: `
                  <div class="study-wrap instruction-box">
                    <h3>L2 Background</h3>
                  </div>
                `,
                questions: [
                  {
                    prompt: "What is your second language (L2)?",
                    name: "l2",
                    required: true
                  },
                  {
                    prompt: "At what age were you first exposed to your L2 (e.g., through family, school, media, etc.)?",
                    name: "l2_first_exposure_age",
                    required: true
                  },
                  {
                    prompt: "If you have received formal instruction in your L2, at what age did you begin, what courses did you complete, and how long did the instruction last? If not, leave blank.",
                    name: "l2_formal_instruction_details",
                    rows: 4,
                    columns: 80,
                    required: false
                  },
                  {
                    prompt: "If you have ever lived in a country where your L2 is spoken as a primary language, which country and at what age did you live there? If not, leave blank.",
                    name: "l2_immersion_details",
                    rows: 4,
                    columns: 80,
                    required: false
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "survey_l2_background_1"
                }
              };
            }
            
            function makeSurveyL2ChecksTrial() {
              return {
                type: jsPsychSurveyMultiChoice,
                preamble: `
                  <div class="study-wrap instruction-box">
                    <h3>L2 Experience</h3>
                  </div>
                `,
                questions: [
                  {
                    prompt: "Have you ever received formal instruction in your L2 (e.g., through school or private courses)?",
                    name: "l2_formal_instruction_check",
                    options: ["Yes", "No"],
                    required: true
                  },
                  {
                    prompt: "Have you ever lived in a country where your L2 is spoken as a primary language?",
                    name: "l2_immersion_check",
                    options: ["Yes", "No"],
                    required: true
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "survey_l2_checks"
                }
              };
            }
            
            function makeSurveyProficiencyTrial() {
              return {
                type: jsPsychSurveyLikert,
                preamble: `
                  <div class="study-wrap instruction-box">
                    <h3>L2 Proficiency</h3>
                    <p>Please answer using the scale below.</p>
                  </div>
                `,
                questions: [
                  {
                    prompt: "On a scale from 1 to 5, with 1 being 'not proficient' and 5 being 'extremely proficient', how would you rate your current overall proficiency in your L2?",
                    name: "l2_current_proficiency",
                    labels: ["1", "2", "3", "4", "5"],
                    required: true
                  },
                  {
                    prompt: "On the same scale, what is the highest proficiency you have ever achieved?",
                    name: "l2_highest_proficiency",
                    labels: ["1", "2", "3", "4", "5"],
                    required: true
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "survey_l2_proficiency"
                }
              };
            }
            
            function makeSurveyDominanceTrial() {
              return {
                type: jsPsychSurveyMultiChoice,
                preamble: `
                  <div class="study-wrap instruction-box">
                    <h3>Language Use and Dominance</h3>
                  </div>
                `,
                questions: [
                  {
                    prompt: "Which language do you use MOST often now?",
                    name: "language_used_most",
                    options: ["L1", "L2", "Equal"],
                    required: true
                  },
                  {
                    prompt: "Which language do you consider STRONGER?",
                    name: "stronger_language",
                    options: ["L1", "L2", "Equal"],
                    required: true
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "survey_dominance"
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
                    prompt: "Have you studied any other languages beyond L1/L2? (Yes/No)",
                    name: "other_languages_check",
                    required: true
                  },
                  {
                    prompt: "If yes, please list the languages and your proficiency levels. If not, leave blank.",
                    name: "other_languages_details",
                    rows: 4,
                    columns: 80,
                    required: false
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "survey_other_languages"
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
          
              const general_intro = {
                type: jsPsychHtmlButtonResponse,
                stimulus: `
                  <div class="study-wrap instruction-box">
                    <h2>Instructions</h2>
                    <p>You will read several short passages in German and English.</p>
                    <p>After each passage, you will first be asked to recall as much as you can from what you just read <strong>in the language you feel most comfortable with</strong>.</p>
                    <p>After the recall task, you will look back at the same passage and complete a metaphor-underlining task.</p>
                    <p>Please read carefully and work at your own pace.</p>
                  </div>
                `,
                choices: ["Begin"]
              };

            const initialize_microphone = {
                type: jsPsychInitializeMicrophone
              };

              const practiceTimeline = [
                makePracticeIntroTrial(),
                makePracticeReadingTrial(),
                makePracticeRecallIntroTrial(),
                makePracticeRecallTrial(participantId, subject_id),
                makePracticeUnderlineTrial(),
                makeTransitionToMainTrial()
              ];

              const trialTimeline = assignedStimuli.flatMap((stim) => [
                makeReadingTrial(stim),
                makeRecallIntroTrial(stim),
                makeRecallTrial(stim, participantId, subject_id),
                makeUnderlineTrial(stim),
                makeReasoningTrial(stim, jsPsych)
              ]);
          
              const surveyTimeline = [
                makeSurveyIntroTrial(),
                makeSurveyDemographicsTrial(),
                makeSurveyAgeTrial(),
                makeSurveyLanguageBackgroundTrial1(),
                makeSurveyResidenceCheckTrial(),
                makeSurveyL2Trial1(),
                makeSurveyL2ChecksTrial(),
                makeSurveyProficiencyTrial(),
                makeSurveyDominanceTrial(),
                makeSurveyOtherLanguagesTrial()
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
                general_intro,
                initialize_microphone,
                ...practiceTimeline,
                ...trialTimeline,
                ...surveyTimeline,
                save_data,
                thank_you
              ]);
            }
          
            // -----------------------------
            // Pre-jsPsych ID screen
            // -----------------------------
            document.body.innerHTML = `
              <div class="study-wrap">
                <div class="instruction-box">
                  <h2>Reading Study</h2>
                  <p>Please enter the study ID provided to you by the researcher.</p>
                  <input
                    id="participant-id-input"
                    type="text"
                    placeholder="Enter your study ID"
                    style="font-size:18px; padding:10px; width:100%; max-width:420px; margin:16px 0;"
                  />
                  <br />
                  <button
                    id="start-study-btn"
                    style="font-size:18px; padding:10px 18px;"
                  >
                    Continue
                  </button>
                </div>
              </div>
            `;
          
            document.getElementById("start-study-btn").addEventListener("click", async function () {
              const participantId = document.getElementById("participant-id-input").value.trim();
          
              if (!participantId) {
                alert("Please enter your study ID.");
                return;
              }
          
              document.body.innerHTML = "";
              await startExperiment(participantId);
            });
          })();