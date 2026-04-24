/* global jsPsychModule, initJsPsych, jsPsychHtmlButtonResponse, jsPsychSurveyText, jsPsychCallFunction,
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

  let participantId = "";
  let assignedCondition = 0;
  let assignedStimuli = [];

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

  // 8-list design:
  // - 4 orders
  // - 2 language mappings
  // Each participant sees all 4 texts.
  // Each text appears in EN for half of participants and DE for half.
  const ORDERS = [
    [0, 1, 2, 3],
    [1, 0, 3, 2],
    [2, 3, 0, 1],
    [3, 2, 1, 0]
  ];

  const PAIR_LANGUAGE_CONDITIONS = [
    {
      HV1: "de",
      HV2: "en",
      LV1: "de",
      LV2: "en"
    },
    {
      HV1: "de",
      HV2: "en",
      LV1: "en",
      LV2: "de"
    },
    {
      HV1: "en",
      HV2: "de",
      LV1: "de",
      LV2: "en"
    },
    {
      HV1: "en",
      HV2: "de",
      LV1: "en",
      LV2: "de"
    }
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

  const jsPsychInstance = initJsPsych({
    on_finish: function () {
      // Replace this with your real save method later.
      jsPsychInstance.data.displayData();
    }
  });

  const timeline = [];

  timeline.push({
    type: jsPsychSurveyText,
    preamble: `
      <div class="study-wrap instruction-box">
        <h2>Reading Study</h2>
        <p>Please enter your participant ID to begin.</p>
      </div>
    `,
    questions: [
      {
        prompt: "Participant ID",
        name: "participant_id",
        required: true,
        placeholder: "Enter your participant ID"
      }
    ],
    button_label: "Continue",
    on_finish: function (data) {
      const response = data.response || {};
      participantId = String(response.participant_id || "").trim();
      assignedCondition = assignCondition(participantId);
      assignedStimuli = buildStimulusList(assignedCondition);
    
      jsPsychInstance.data.addProperties({
        participant_id: participantId,
        condition: assignedCondition
      });
    }
  });

  timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div class="study-wrap instruction-box">
        <h2>Instructions</h2>
        <p>You will read several short passages in German and English.</p>
        <p>After each passage, you will first be asked to recall as much as you can from what you just read.</p>
        <p>After the recall task, you will look back at the same passage and complete a metaphor-underlining task.</p>
        <p>Please read carefully and work at your own pace.</p>
      </div>
    `,
    choices: ["Begin"]
  });

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

  function makeRecallTrial(stim) {
    return {
      type: jsPsychSurveyText,
      preamble: `
        <div class="study-wrap instruction-box">
          <h3>Recall Task</h3>
          <p>Please recall as much as you can from the passage you just read.</p>
          <p>You may include events, images, wording, ideas, or details.</p>
        </div>
      `,
      questions: [
        {
          prompt: "Type your recall below:",
          name: "recall_text",
          rows: 14,
          columns: 90,
          required: true
        }
      ],
      button_label: "Continue",
      data: {
        task: "recall",
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
        <h3>Metaphorical Language Task</h3>
        <p>Now please look back at the same passage.</p>
        <p>Please underline any word or group of words that, in your judgment, is being used metaphorically.</p>
        <p>Please use your own understanding of what counts as metaphorical language. There may be several examples, only a few, or none.</p>
        <p>Please underline the smallest stretch of text that you think carries the metaphorical use. If you are unsure, you may still underline it.</p>
      `,
      text: stim.presented_text,
      language: stim.presented_language.toUpperCase(),
      trial_id: String(stim.serial_position),
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
      preamble: `
        <div class="study-wrap instruction-box">
          <h3>Brief Follow-up</h3>
          <p>In a sentence or two, what made the expressions you underlined seem metaphorical to you?</p>
        </div>
      `,
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

  timeline.push({
    type: jsPsychCallFunction,
    func: function () {
      const dynamicNode = { timeline: [] };
      assignedStimuli.forEach((stim) => {
        dynamicNode.timeline.push(makeReadingTrial(stim));
        dynamicNode.timeline.push(makeRecallTrial(stim));
        dynamicNode.timeline.push(makeUnderlineTrial(stim));
        dynamicNode.timeline.push(makeReasoningTrial(stim));
      });
      jsPsychInstance.addNodeToEndOfTimeline(dynamicNode);
    }
  });

  timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: `
      <div class="study-wrap instruction-box">
        <h2>Finished</h2>
        <p>Thank you for participating.</p>
        <p>Please click below to submit your responses.</p>
      </div>
    `,
    choices: ["Submit"]
  });

  jsPsychInstance.run(timeline);
})();
