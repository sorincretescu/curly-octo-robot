import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            translation: {
                enter: 'Enter your credentials:',
                username: 'Username',
                password: 'Password',
                login: 'Log in',
                priority: 'Priority',
                noPriority: 'No priority',
                todo: 'TODO #',
                noId: 'No id',
                noDescription: 'No description',
                subtasks: 'Subtasks',
                noSubtasks: 'No subtasks',
                creationDate: 'Creation date',
                noDate: 'XX-XX-XXXX',
                edit: 'Edit',
                delete: 'Delete',
                editTask: 'Edit your task/todo',
                todoDescription: 'Todo description',
                addSubtask: 'Add subtask',
                cancel: 'Cancel',
                seidit: 'Seidit',
                search: 'Search',
                addTodo: 'Add Todo',
                reset: 'Reset',
            },
        },
        de: {
            translation: {
                enter: 'Geben Sie Ihre Anmeldeinformationen ein:',
                username: 'Benutzername',
                password: 'Passwort',
                login: 'Anmelden',
                priority: 'Priorität:',
                noPriority: 'Keine Priorität',
                todo: 'TODO #',
                noId: 'Keine ID',
                noDescription: 'Keine Beschreibung',
                subtasks: 'Teilaufgaben',
                noSubtasks: 'Keine Teilaufgaben',
                creationDate: 'Erstellungsdatum:',
                noDate: 'XX-XX-XXXX',
                edit: 'Bearbeiten',
                delete: 'Löschen',
                editTask: 'Bearbeiten Sie Ihre Aufgabe',
                todoDescription: 'Todo Beschreibung',
                addSubtask: 'Unteraufgabe hinzufügen',
                cancel: 'Beenden',
                seidit: 'Speichern',
                search: 'Suche',
                addTodo: 'Todo hinzufügen',
                reset: 'Zurücksetzen',
            },
        }
    }
})

export default i18n;