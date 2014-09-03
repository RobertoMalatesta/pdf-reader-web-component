PDF Reader Web Component
==========

PDF Reader Web Component is a web component built according to Web Components specification and using <a href="https://github.com/mozilla/pdf.js">PDF.js</a>. This is a native implementation, thus it requires browser support of HTML Imports, Shadow DOM and `document.registerElement`.

Component can be used as a widget on the web page to display attached PDF docs.

##Usage

Install deps and build component:

`npm install && bower install && grunt`

Include HTML import in `head`:

`<link rel="import" href="elements/pdf-reader/pdf-reader.html">`

And the element itself:

`<pdf-reader src="path_to_pdf" width=720 height=480></pdf-reader>`

Where `path_to_pdf` is the url to PDF file.
