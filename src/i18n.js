import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const translationsEn = {
  credentials: "Enter your credentials",
  username: "Username",
  password: "Password",
  logIn: "Log In",
  todo_description: "Todo description",
  btn_addTodo: "Add todo",
  searchInput: "Search",
  btn_reset: "Reset",
  priority: "Priority",
  no_priority: "No priority",
  todo: "TODO",
  subtasks: "Subtasks",
  noSubtasks: "No subtasks",
  creation_date: "Creation date",
  edit_modal: "Edit your task/todo",
  addSubtask: "Add subtask",
  btn_cancel: "Cancel",
  btn_edit: "Seidit",
  noDescription: "No description",
  btn_register: "Register",
  btn_logout: "Log out",
};
const translationsDe = {
  credentials: "Geben Sie Ihre Anmeldedaten ein",
  username: "Nutzername",
  password: "Passwort",
  logIn: "Anmeldung",
  todo_description: "Aufgabenbeschreibung",
  btn_addTodo: "Aufgaben hinzufügen",
  searchInput: "Suchen",
  btn_reset: "Zurücksetzen",
  priority: "Priorität",
  no_priority: "Aufgaben priorität",
  todo: "MACHEN",
  subtasks: "Teilaufgaben",
  noSubtasks: "Keine Teilaufgaben",
  creation_date: "Erstellungsdatum",
  edit_modal: "Bearbeiten Sie Ihre Aufgabe",
  addSubtask: "Unteraufgabe teilaufgaben",
  btn_cancel: "Stornieren",
  btn_edit: "Bearbeiten",
  noDescription: "Keine Beschreibung",
  btn_register: "Registrieren",
  btn_logout: "Ausloggen",
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationsEn },
    de: { translation: translationsDe },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
