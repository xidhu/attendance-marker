## Attendance Marker

This is a chrome extension for attendance marking in Google Meet.

## Chrome Extensions Tutorial

Not familiar with how to create Chrome extensions? [Click here to read the documentation](http://developer.chrome.com/extensions/index.html).

## Using in your Chrome browser

Open Google Meet.

- Open extension.
- Select Live Mode or Chat Mode(If chat mode is selected then specify the roll no input format.)
- Click take attendance.
- Attendance will be downloaded on default download folder.

 **Modes**
 
   Chat Mode
   
    - Records Roll numbers typed by students.
    
   Live Mode
   
    - Take attendance live from the meeting as usernames of students present in that time.

**Formatting**

eg:

    '%d' -> integer formatting 
    roll no %d => roll no 45
    %d  => 45
    rn%d   => rn45

## Loading in Chrome

To load extension in chrome:

- Go To `chrome://extensions` in Chrome.
- Check the `Developer Mode` checkbox.
- Click the button that says `Load unpacked extension...`.
- Choose the location of code.
