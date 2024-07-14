# `<ui-switch>` Component


## Usage

### Script
```html
<script src="/components/switch.js" type="module"></script>
```


### Body
```html
<ui-switch></ui-switch>
```



## Properties

### CSS
- `--on-color`: Color of the switch when checked
- `--off-color`: Color of the switch when unchecked
- `--knob-color`: Color of the knob
* `--disabled-on-color`: Color of the switch when checked and disabled
* `--disabled-off-color`: Color of the switch when unchecked and disabled
* `--disabled-knob-color`: Color of the knob when disabled


### Attributes
- `disabled`: If the switch is disabled
- `checked`: If the switch is checked

```html
<ui-switch disabled checked></ui-switch>
```


### Properties (JavaScript)
- `.disabled`: If the switch is disabled
- `.checked`: If the switch is checked


### Events
- `toggle`: When the switch is toggled
