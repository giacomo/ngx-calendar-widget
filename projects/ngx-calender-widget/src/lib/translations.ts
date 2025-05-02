import { de, enUS, es, fr, it } from 'date-fns/locale';

export class Translations {
    static getTranslations() {
        return {
            "en": {
                "locale": enUS,
                "dayNames": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                "monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                "today": "Today",
                "addEvent": "Add Event...",
                "endDate": "End:"
            },
            "es": {
                "locale": es,
                "dayNames": ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
                "monthNames": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                "today": "Hoy",
                "addEvent": "Añadir Evento...",
                "endDate": "Fin:"
            },
            "fr": {
                "locale": fr,
                "dayNames": ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                "monthNames": ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
                "today": "Aujourd'hui",
                "addEvent": "Ajouter un événement...",
                "endDate": "Fin:"
            },
            "de": {
                "locale": de,
                "dayNames": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
                "monthNames": ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
                "today": "Heute",
                "addEvent": "Ereignis hinzufügen...",
                "endDate": "Ende:"
            },
            "it": {
                "locale": it,
                "dayNames": ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
                "monthNames": ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
                "today": "Oggi",
                "addEvent": "Aggiungi evento...",
                "endDate": "Fine:"
            }
        };
    }

    static getDayNames(locale: 'en' | 'es' | 'fr' | 'de' | 'it'): string[] {
        return Translations.getTranslations()[locale].dayNames;
    }

    static getMonthNames(locale: 'en' | 'es' | 'fr' | 'de' | 'it'): string[] {
        return Translations.getTranslations()[locale].monthNames;
    }

    static getToday(locale: 'en' | 'es' | 'fr' | 'de' | 'it'): string {
        return Translations.getTranslations()[locale].today;
    }

    static getAddEvent(locale: 'en' | 'es' | 'de' | 'fr' | 'it') {
        return Translations.getTranslations()[locale].addEvent;
    }

    static getLocale(locale: 'en' | 'es' | 'de' | 'fr' | 'it') {
        return Translations.getTranslations()[locale].locale;
    }

    static getEndDate(locale: 'en' | 'es' | 'de' | 'fr' | 'it') {
        return Translations.getTranslations()[locale].endDate;
    }
}
