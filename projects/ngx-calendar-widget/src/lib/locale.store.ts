import { computed, inject, Injectable, provideAppInitializer, Provider, type Signal, signal } from '@angular/core';

/**
 * Defines translation strings for calendar UI components for a specific locale.
 */
export type Locale = {
    /** The locale identifier
     * @example "en", "fr", "de", "es"
    */
    name: string;
    /** Day names, starting with Sunday.
     * @example ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    */
    dayNames: string[];
    /** Month names, starting with January.
     * @example ["January", "February", "March", ...]
     * @example ["Jan", "Feb", "Mar", ...]
    */
    monthNames: string[];
    /** Text for the 'Today' button. */
    today: string;
    /** Title text for the add event button. */
    addEvent: string;
    /** Text delimiting the end of the day, used in event label generation. */
    endDate: string;
  }

const DEFAULT_LOCALE: Locale = {
    name: 'en',
    "dayNames": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    "monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    "today": "Today",
    "addEvent": "Add Event...",
    "endDate": "End:",
}

@Injectable({
    providedIn: 'root'
})
export class LocaleStore {
    private readonly translations = signal<Partial<Record<string, Locale>>>({});

    private readonly fallback = computed(() => Object.values(this.translations()).at(0) ?? DEFAULT_LOCALE);
    
    getTranslation(locale: string | Signal<string>) {
        const localeSignal = typeof locale === 'string' ? computed(() => locale) : locale;

        return computed(() => {
            return this.translations()[localeSignal()] ?? this.fallback();
        });
    } 

    registerTranslation(translations: Locale[]) {
        this.translations.update((cur) => ({
            ...cur,
            ...translations.reduce<Record<string, Locale>>((acc, translation) => {
                acc[translation.name] = translation;
                return acc;
            }, {})
        }));
    }
}


/**
 * Provides one or more locale translations using Angular's APP_INITIALIZER.
 * Ensures translations are registered before the application fully bootstraps.
 * @param locales A single `Locale` object or an array of `Locale` objects.
 * @see {@link Locale}
 */
export function provideNgxCalendarTranslations(locales: Locale | Locale[]) {
    const locArr = Array.isArray(locales) ? locales : [locales];
    
    return provideAppInitializer(() => {
        const localeStore = inject(LocaleStore);
        localeStore.registerTranslation(locArr);
    })
}