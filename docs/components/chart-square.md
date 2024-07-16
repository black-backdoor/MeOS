# `<chart-square>` Component


## Usage

### Script
```html
<script src="/components/chart-square.js" type="module"></script>
```


### Body
```html
<chart-square></chart-square>
```



## Properties

### CSS
* `--fill-color`: fill color
* `--bg-color`: background color


### Attributes
- `animation`: Choose one of the following animation types: `fill`, `rain-down`, `rain-up`.


### Functions
- `showData(data)`: Displays the data in the chart. The `data` parameter should be an array of numbers, e.g., `[column1, column2, column3]`.



## Example

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="/components/chart-square.js" type="module"></script>
    <style>
        chart-square {
            width: min-content;
            height: min-content;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 20px;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
    </style>
</head>

<body>
    <chart-square animation="rain-down"></chart-square>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const element = document.querySelector('chart-square');
            const data = [7, 15, 3, 11, 8, 2, 16, 9, 5, 4, 12, 6, 10, 13, 1, 14, 7, 18, 3, 5, 6, 17, 9, 8, 4, 12, 2, 16, 11, 13, 10, 1, 14, 15, 18, 7, 3, 8, 5, 9, 6, 16, 12, 11, 4, 2, 17, 13, 1, 10, 15, 14, 18, 7, 3, 5, 8, 9, 6, 16, 4, 12, 11, 2, 17, 13, 10, 1, 15, 14,];
            element.showData(data);
        });
    </script>
</body>

</html>
```