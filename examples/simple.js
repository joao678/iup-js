import { button, dialog, fill, hbox, iup, vbox } from "../iupjs/iup";

// Open the IUP toolkit
iup.open()

const btn = new button();
// Assigning properties
btn.title = 'Click Here!';
// Assigning events
btn.action = function() {
    iup.message('Hello!', 'Hello World!');
}

// Passing native objects to other objects
const container = new vbox(
    new fill(),
    new hbox(new fill(), btn, new fill()),
    new fill(),
);

// Defining a window (or dialog in this case)
const dlg = new dialog(container);
dlg.title = 'Hello!';
dlg.size = '180x90';
dlg.show();

// Start the IUP mainloop
iup.mainLoop();
