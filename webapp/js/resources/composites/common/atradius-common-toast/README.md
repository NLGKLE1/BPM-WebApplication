# Toaster

![Example of each style of alert](resources\images\toasts-sample.png)

## Purpose

Be easy to dispatch alerts in the platform and/or between pages.

## Usage
To push new alerts you must load it by require js
```javascript
'resources/composites/common/atradius-common-toast/loader'
```
Then include this in your page:
```javascript
<atradius-common-toast id="toaster"></atradius-common-toast>
```
You will have the toaster instance:
```javascript
var toaster = document.getElementById("toaster"); //ojet.toaster(); 
```
Then you will have the following a method to push messages:
```javascript
toaster.pushMessage({
    message: "Lovely day, lovely day lovelyyy daay..."
})
```

## Options

You can define a message stack limit (Default: 3):
```javascript
<atradius-common-toast id="toaster" max="10"></atradius-common-toast>
``` 
When it is exceeded, the older message of the stack will be dropped off immediately.


## Data Structure

#### Message
- **message**: _Observable<String\>|String_ (Required) Message to be shown inside the alert.
- **type**: _Observable<PseudoEnum<AlertType\>\>_ (Optional) - Default: "success" - The style of the alert that will be shown.
- **timeout**: _Number|Boolean_ (Optional) - Default: 5000 - The timeout to autoclose alert. If it's 0 or false, this feature will be disabled and message will be shown forever untill user closes.

#### AlertType
- Definies how the alert is shown (style) and take following values:
```javascript
"success", "warning", "error"
```


## Example

### Success Message
```javascript
toaster.pushMessage({
    message: "Success Message",
    type: "success",
    timeout: 2500
})
```

### Error Message
```javascript
toaster.pushMessage({
    message: "Error Message",
    type: "error",
    timeout: 3000
})
```
### Warning Message
```javascript
toaster.pushMessage({
    message: "Warning Message",
    type: "warning",
    timeout: 3000
})
```

