# `<applet-network_rtt>` Component

## Usage
This applet uses the navigation.connection API to get the round-trip time and display it as milliseconds. If the API is not available, it will display `NaN`.

### Script
```html
<script src="/components/applet/network-rtt.js" type="module"></script>
```

### Body
```html
<applet-network_rtt></applet-network_rtt>
```



## Attributes
* `remove-when-unsupported`: If set, the applet will not be rendered if the API is not available.