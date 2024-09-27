# `<applet-network_down>` Component


## Usage
This applet uses the navigation.connection API to get downlink speed and display it as Mbps. If the API is not available, it will display `NaN`.

### Script
```html
<script src="/components/applet/network-down.js" type="module"></script>
```


### Body
```html
<applet-network_down></applet-network_down>
```



## Attributes
* `remove-when-unsupported`: If set, the applet will not be rendered if the API is not available.