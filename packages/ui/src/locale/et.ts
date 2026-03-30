import { defineLocale } from "../lib/helpers/locale.js";
import type { Messages } from "../lib/types/locale.js";

export default defineLocale<Messages>({
  name: "Eesti",
  code: "et",
  messages: {
    alert: {
      close: "Sulge",
    },
    authForm: {
      hidePassword: "Peida parool",
      showPassword: "Näita parooli",
      submit: "Jätka",
    },
    banner: {
      close: "Sulge",
    },
    calendar: {
      nextMonth: "Järgmine kuu",
      nextYear: "Järgmine aasta",
      prevMonth: "Eelmine kuu",
      prevYear: "Eelmine aasta",
    },
    carousel: {
      dots: "Valige kuvatav slaid",
      goto: "Mine slaidile {slide}",
      next: "Järg",
      prev: "Eel",
    },
    chatPrompt: {
      placeholder: "Siia kirjutage oma sõnum…",
    },
    chatPromptSubmit: {
      label: "Saada",
    },
    chatReasoning: {
      thinking: "Mõtleb…",
      thought: "Mõtles",
      thoughtFor: "Mõtles {duration}",
    },
    colorMode: {
      dark: "Tume",
      light: "Hele",
      switchToDark: "Lülitu tumedasse režiimi",
      switchToLight: "Lülitu heledasse režiimi",
      system: "Süsteem",
    },
    commandPalette: {
      back: "Tagasi",
      close: "Sulge",
      noData: "Pole andmeid",
      noMatch: "Pole vastavaid andmeid",
      placeholder: "Sisesta käsk või otsi…",
    },
    content: {
      search: {
        links: "Lingid",
        theme: "Teema",
      },
      searchButton: {
        label: "Otsi…",
      },
      toc: {
        title: "Sellel lehel",
      },
    },
    dropdownMenu: {
      noMatch: "Pole vastavaid andmeid",
      search: "Otsi…",
    },
    dashboardSearch: {
      theme: "Teema",
    },
    dashboardSearchButton: {
      label: "Otsi…",
    },
    dashboardSidebarCollapse: {
      collapse: "Ahenda külgriba",
      expand: "Laienda külgriba",
    },
    dashboardSidebarToggle: {
      close: "Sulge külgriba",
      open: "Ava külgriba",
    },
    error: {
      clear: "Tagasi avalehele",
    },
    fileUpload: {
      removeFile: "Eemalda {filename}",
    },
    header: {
      close: "Sulge menüü",
      open: "Ava menüü",
    },
    inputMenu: {
      create: 'Loo "{label}"',
      noData: "Pole andmeid",
      noMatch: "Pole vastavaid andmeid",
    },
    inputNumber: {
      decrement: "Vähenda",
      increment: "Suurenda",
    },
    modal: {
      close: "Sulge",
    },
    pricingTable: {
      caption: "Hinna plaanide võrdlus",
    },
    prose: {
      codeCollapse: {
        closeText: "Ahenda",
        name: "kood",
        openText: "Laienda",
      },
      collapsible: {
        closeText: "Peida",
        name: "omadused",
        openText: "Näita",
      },
      pre: {
        copy: "Kopeeri kood lõikelauale",
      },
    },
    sidebar: {
      close: "Sulge",
      toggle: "Lülita",
    },
    selectMenu: {
      create: 'Loo "{label}"',
      noData: "Pole andmeid",
      noMatch: "Pole vastavaid andmeid",
      search: "Otsi…",
    },
    slideover: {
      close: "Sulge",
    },
    table: {
      noData: "Pole andmeid",
    },
    toast: {
      close: "Sulge",
    },
  },
});
