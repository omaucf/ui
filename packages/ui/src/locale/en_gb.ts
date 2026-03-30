import { extendLocale } from "../lib/helpers/locale.js";
import type { Messages } from "../lib/types/locale.js";
import en from "./en.js";

export default extendLocale<Messages>(en, {
  name: "English (United Kingdom)",
  code: "en-GB",
});
