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
                  }
                }
              };
          
              trial(display_element, trial) {
                display_element.innerHTML = `
                  <div class="study-wrap">
                    <div class="trial-header">Passage ${trial.trial_id}</div>
                    <div class="instruction-box">${trial.prompt}</div>
                    <div class="meta-tools">
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
          
                underlineBtn.addEventListener("click", applyUnderline);
                clearBtn.addEventListener("click", clearUnderlining);
          
                finishBtn.addEventListener("click", () => {
                  const markedStrings = collectMarkedStrings();
                  this.jsPsych.finishTrial({
                    task: "underline",
                    stimulus_id: trial.stimulus_id,
                    serial_position: trial.serial_position,
                    trial_id: trial.trial_id,
                    language: trial.language,
                    original_text: trial.text,
                    annotated_html: target.innerHTML,
                    underlined_segments: markedStrings,
                    underlined_count: markedStrings.length
                  });
                });
              }
            }
          
            // -----------------------------
            // Study configuration
            // -----------------------------
            const STIMULI = [STIM_HV1, STIM_HV2, STIM_LV1, STIM_LV2];
          
            function hashParticipantId(id) {
              let hash = 0;
              for (let i = 0; i < id.length; i += 1) {
                hash = ((hash << 5) - hash) + id.charCodeAt(i);
                hash |= 0;
              }
              return Math.abs(hash);
            }
          
            function assignCondition(id) {
              return hashParticipantId(id) % 16;
            }
          
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
          
                return {
                  ...stim,
                  presented_language: presentedLanguage,
                  presented_text: presentedText,
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
                  visibility: stim.visibility,
                  title: stim.title,
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
                  visibility: stim.visibility,
                  title: stim.title,
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
                    <h3>Oral Recall</h3>
                    <p>Please speak now.</p>
                    <p>Try to include everything you remember, even if you were unsure or confused.</p>
                  </div>
                `,
                recording_duration: null,
                show_done_button: true,
                done_button_label: "End Recall / Continue",
                allow_playback: false,
                data: {
                  task: "oral_recall",
                  stimulus_id: stim.stimulus_id,
                  visibility: stim.visibility,
                  title: stim.title,
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
                data: {
                  task: "underline",
                  stimulus_id: stim.stimulus_id,
                  visibility: stim.visibility,
                  title: stim.title,
                  source: stim.source,
                  presented_language: stim.presented_language,
                  serial_position: stim.serial_position
                }
              };
            }
          
            function makeReasoningTrial(stim, jsPsych) {
              return {
                type: jsPsychSurveyText,
                preamble: function () {
                  const lastUnderline = jsPsych.data.get().filter({
                    task: "underline",
                    stimulus_id: stim.stimulus_id,
                    serial_position: stim.serial_position
                  }).last(1).values()[0];
            
                  const annotatedPassage = lastUnderline?.annotated_html || stim.presented_text;
                  const underlinedSegments = lastUnderline?.underlined_segments || [];
            
                  const segmentList = underlinedSegments.length
                    ? `<p><strong>You underlined:</strong> ${underlinedSegments.map(s => `"${s}"`).join(", ")}</p>`
                    : `<p><strong>You did not underline any expressions.</strong></p>`;
            
                  return `
                    <div class="study-wrap instruction-box">
                      <h3>Brief Follow-up</h3>
                      <p>Below is the passage with your underlining.</p>
            
                      <div class="passage-box" style="margin-top: 16px; text-align: left;">
                        ${annotatedPassage}
                      </div>
            
                      <div style="margin-top: 16px; text-align: left;">
                        ${segmentList}
                      </div>
            
                      <p style="margin-top: 16px;">
                        What made the expression(s) you underlined seem metaphorical to you?
                      </p>
                    </div>
                  `;
                },
                questions: [
                  {
                    prompt: "Your response:",
                    name: "metaphor_reasoning",
                    rows: 6,
                    columns: 90,
                    required: false
                  }
                ],
                button_label: "Continue",
                data: {
                  task: "reasoning",
                  stimulus_id: stim.stimulus_id,
                  visibility: stim.visibility,
                  title: stim.title,
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
                  visibility: "practice",
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
                  visibility: "practice",
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
                    <h3>Practice Oral Recall</h3>
                    <p>Please speak now.</p>
                    <p>Try to include everything you remember, even if you were unsure or confused.</p>
                  </div>
                `,
                recording_duration: null,
                show_done_button: true,
                done_button_label: "End Recall / Continue",
                allow_playback: false,
                data: {
                  task: "practice_oral_recall",
                  stimulus_id: "PRACTICE",
                  visibility: "practice",
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
                  visibility: "practice",
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
            function startExperiment(participantId) {
              const assignedCondition = assignCondition(participantId);
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
          
            document.getElementById("start-study-btn").addEventListener("click", function () {
              const participantId = document.getElementById("participant-id-input").value.trim();
          
              if (!participantId) {
                alert("Please enter your study ID.");
                return;
              }
          
              document.body.innerHTML = "";
              startExperiment(participantId);
            });
          })();