import "./style.css";
import { Marked } from "marked";
import markedShiki from "marked-shiki";
import { createHighlighter } from "shiki";

const SUPPORTED_CODE_LANGUAGES = [
  "html",
  "ini",
  "java",
  "javascript",
  "js",
  "json",
  "json5",
  "jsx",
  "css",
];

const highlighter = await createHighlighter({
  themes: ["github-light", "github-dark"],
  langs: SUPPORTED_CODE_LANGUAGES,
});

const marked = new Marked();
marked.use({
  async: true,
  breaks: true,
  gfm: true,
});
marked.use(
  markedShiki({
    highlight(code, lang, props) {
      lang = lang.toLowerCase();
      return highlighter.codeToHtml(code, {
        lang: SUPPORTED_CODE_LANGUAGES.includes(lang) ? lang : "text",
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
        meta: { __raw: props.join(" ") },
      });
    },
  }),
);

const msg = `
{
    "id": "9raywezf4pnm9n84rgfh4h9afr",
    "user_id": "1azsqgqorbntue9mjq9apzgeqa",
    "applicant": "liwenxuan",
    "creator_id": "1azsqgqorbntue9mjq9apzgeqa",
    "create_at": 1753149457445,
    "update_at": 1753149457445,
    "type": "annual_leave",
    "start_time": "2025-07-22 AM",
    "start_millis": 1753113600000,
    "end_time": "2025-07-22 AM",
    "end_millis": 1753156799999,
    "apply_days": 0.5,
    "semidays": 1,
    "time_zone": "Asia/Shanghai",
    "reason": "123",
    "pictures": [

    ],
    "status": "pending",
    "working_days": [
        1,
        2,
        3,
        4,
        5
    ],
    "detail_working_semidays": {
        "2025-07-22 AM": 0
    }
}
`;

document.querySelector("#app pre").textContent = await marked.parse(msg);
