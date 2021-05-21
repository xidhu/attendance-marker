## Attendace Marker

This is a chrome extension for attendance marking in Google Meet.

## Chrome Extensions Tutorial

Not familiar with how to create Chrome extensions? [Click here to read the documentation](http://developer.chrome.com/extensions/index.html).

## Using in your Chrome browser

Open Google Meet.

- Open extension.
- Click take attendance either from in chat mode or Live mode
- Attendance will be downloaded on default download folder.

 **Modes**
 
   Chat Mode
   
    - Takes attendance as the roll numbers typed by students.
    
   Live Mode
   
    - Takes attendance live from the meeting as usernames of students present in that time.

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
