/* global initJsPsych, jsPsychHtmlButtonResponse, jsPsychSurveyText,
          jsPsychInitializeMicrophone, jsPsychHtmlAudioResponse,
          STIM_HV1, STIM_HV2, STIM_LV1, STIM_LV2 */

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
            
            function makeRecallTrial(stim) {
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
          
            function makeReasoningTrial(stim) {
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
          
            // -----------------------------
            // Start experiment after ID entry
            // -----------------------------
            function startExperiment(participantId) {
              const assignedCondition = assignCondition(participantId);
              const assignedStimuli = buildStimulusList(assignedCondition);
          
              const jsPsych = initJsPsych({
                on_finish: function () {
                  jsPsych.data.displayData();
                }
              });
          
              jsPsych.data.addProperties({
                participant_id: participantId,
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

              const trialTimeline = assignedStimuli.flatMap((stim) => [
                makeReadingTrial(stim),
                makeRecallIntroTrial(stim),
                makeRecallTrial(stim),
                makeUnderlineTrial(stim),
                makeReasoningTrial(stim)
              ]);
          
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
                ...trialTimeline,
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