# `<desktop-popup>` Component


## Usage

### Script
```html
<script src="/components/popup.js" type="module"></script>
```

### Body
```html
<desktop-popup
    icon="/assets/popup/warning.svg"
    message_title="Virus Alert"
    message="Your computer is infected with a virus. Please click OK to remove the virus."
    ok_text="Remove"
    cancel_text="Keep"
></desktop-popup>
```


## Properties
- `icon`: src for the icon
- `message_title`: Title of the message
- `message`: Message to display
* `ok_text`: Text for the OK button (default: OK)
* `cancel_text`: Text for the Cancel button (default: Cancel)


## Events
- `close`: Fired when the popup is closed (either by clicking OK or Cancel) { detail: 'ok' || 'cancel' }


## CSS Variables
- `--ok-color`: Color of the OK button
- `--cancel-color`: Color of the Cancel button
- `--text-color`: Color of the text
- `--bg-color`: Background color of the popup
* `--ok-text-color`: Text color of the OK button
* `--cancel-text-color`: Text color of the Cancel button


## Attributes
* `position`: positions the popup in the window center

```html
<desktop-popup position></desktop-popup>
```


# Child Components
- `desktop-popup_yes_no`
- `desktop-popup_ok`
- `desktop-popup_info`
- `desktop-popup_warning`
- `desktop-popup_error`
