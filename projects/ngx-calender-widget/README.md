# @localia/ngx-calender-widget

![Version](https://img.shields.io/npm/v/@localia/ngx-calender-widget)
![License](https://img.shields.io/npm/l/@localia/ngx-calender-widget)
![Downloads](https://img.shields.io/npm/dt/@localia/ngx-calender-widget)

A lightweight, customizable, and feature-rich Angular calendar widget designed to simplify event management and scheduling in your Angular applications.

<p align="center"> 
  <img src="https://giacomo.dev/media/ncw_64.png" alt="ngx-calender-widget" width="64"/>
</p>

## Features

- **Multi-locale support**: Display calendar in different languages (English, Spanish, German, French, Italian)
- **Customizable sizes**: Choose between default, large, and extra-large sizes
- **Event management**: Add, display, and interact with events
- **Responsive design**: Works seamlessly across devices
- **Easy integration**: Simple to set up and use in Angular projects

## Installation

Install the library using npm:

```bash
npm install @localia/ngx-calender-widget
```

Or with yarn:

```bash
yarn add @localia/ngx-calender-widget
```

## Usage

### Import the Module

Import the `NgxCalenderWidgetModule` into your Angular module:

```typescript
import { NgxCalenderWidgetModule } from '@localia/ngx-calender-widget';

@NgModule({
    imports: [
        // ...other imports
        NgxCalenderWidgetModule
    ],
    // ...other module properties
})
export class AppModule {
}
```

### Add to Template

Use the component in your template:

```html

<ngx-calender-widget
    [locale]="'en'"
    [size]="'default'"
    [events]="events"
    [enableAddEvent]="true"
    (addEvent)="onAddEvent($event)"
    (clickEvent)="onEventClick($event)">
</ngx-calender-widget>
```

![Component Example](https://via.placeholder.com/600x400?text=Component+Example)

### Event Structure

Events must follow this interface:

```typescript
interface CalenderEventInterface {
    id: number | string;     // Unique identifier for the event
    title: string;         // Event title to display on the calendar
    date: string;          // Start date/time in ISO format (YYYY-MM-DDTHH:mm:ss)
    endDate: string | null;  // End date/time in ISO format (optional)
}
```

#### Example Event Objects

```typescript
// Single-day event
{
    id: 1, 
    title: "Team Meeting",
    date: "2023-10-15T14:00:00",
    endDate: "2023-10-15T15:30:00"
}

// Multi-day event
{
    id: "conf-2023",
    title: "Annual Conference",
    date: "2023-11-01T09:00:00",
    endDate: "2023-11-03T17:00:00"
}

// Event without end date (treated as single-day)
{
    id: 42,
    title: "Deadline",
    date: "2023-10-31T23:59:59",
    endDate: null
}
```

### Component Inputs

| Input                    | Type                                | Default     | Description                                 |
|--------------------------|-------------------------------------|-------------|---------------------------------------------|
| `locale`                 | `'en' \| 'es'\| 'de'\| 'fr'\| 'it'` | `'de'`      | Locale for the calendar.                    |
| `size`                   | `'default'\| 'large'\| 'x-large'`   | `'default'` | Size of the calendar.                       |
| `hideMultiDayEventsText` | `boolean`                           | `true`      | Hide text for multi-day events.             |
| `enableAddEvent`         | `boolean`                           | `false`     | Enable the "Add Event" button.              |
| `events`                 | `CalenderEventInterface[]`          | `[]`        | Array of events to display on the calendar. |

### Component Outputs

| Output       | Description                                            |
|--------------|--------------------------------------------------------|
| `addEvent`   | Emits the date when the "Add Event" button is clicked. |
| `clickEvent` | Emits the event object when an event is clicked.       |

### Handling Events

In your component, handle the emitted events:

```typescript
import { Component } from '@angular/core';
import { CalenderEventInterface } from '@localia/ngx-calender-widget';

@Component({
    selector: 'app-calendar-page',
    template: `
    <ngx-calender-widget
      [events]="events"
      [enableAddEvent]="true"
      (addEvent)="onAddEvent($event)"
      (clickEvent)="onEventClick($event)">
    </ngx-calender-widget>
  `
})
export class CalendarPageComponent {
    events: CalenderEventInterface[] = [
        {
            id: 1,
            title: 'Team Meeting',
            date: '2023-10-01T10:00:00',
            endDate: '2023-10-01T12:00:00',
        },
        {
            id: 2,
            title: 'Conference',
            date: '2023-10-05T09:00:00',
            endDate: '2023-10-07T17:00:00',
        }
    ];

    onAddEvent(date: string) {
        console.log('Add event on:', date);
        // Implement your event creation logic here
    }

    onEventClick(event: CalenderEventInterface) {
        console.log('Event clicked:', event);
        // Implement your event handling logic here
    }
}
```

## Visual Appearance

The calendar displays events with different styles based on their duration:

![Event Styles](https://via.placeholder.com/700x300?text=Event+Styling+Examples)

- **Single-day events**: Displayed with start and end time
- **Multi-day events**:
    - First day shows the event title with full date range
    - Middle days can be configured to show or hide text (controlled by `hideMultiDayEventsText`)
    - Last day shows the event title with end date information

## Building the Library

To build the library, run:

```bash
ng build @localia/ngx-calender-widget
```

The build artifacts will be stored in the `dist/@localia/ngx-calender-widget` directory.

## Publishing the Library

To publish the library to npm:

1. Build the library:
   ```bash
   ng build @localia/ngx-calender-widget
   ```
2. Navigate to the `dist` directory:
   ```bash
   cd dist/@localia/ngx-calender-widget
   ```
3. Publish the library:
   ```bash
   npm publish --access public
   ```

## Running Tests

### Unit Tests

Run unit tests using [Karma](https://karma-runner.github.io):

```bash
ng test
```

## Browser Support

The widget is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the [MIT License](https://opensource.org/license/MIT).

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Date-fns Documentation](https://date-fns.org) (used for date manipulations)

## Credits

Developed by Localia
