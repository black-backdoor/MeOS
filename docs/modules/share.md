# **share** Module

## Usage
```html
<script src="/modules/share.js"></script>
```

## Methods

### async shareURL(onClipboard, onSuccess, onError, description)

- `onClipboard` {Function} - Function to run when the link is copied to the clipboard.
- `onSuccess` {Function} - Function to run when the share process is successful. **Not run when the link is copied to the clipboard.**
- `onError` {Function} - Function to run when the share process fails.
- `description` {String} - The description to share. **Optional.**

```js
await window.shareURL(
    () => console.log("Link copied to clipboard"),
    () => console.log("Share successful"),
    () => console.log("Share failed"),
    description = "hi"
);
```