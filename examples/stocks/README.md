Stocks App Example
==================

Copyright 2013 Pyjeon Software LLC  
Author:	Alexander Tsepkov  
License: Creative Commons: Attribution + Noncommerial + ShareAlike  

![Preview](https://bitbucket.org/pyjeon/rapydscript/raw/default/examples/stocks/preview.png 'Preview Screenshot')

This is a web app for retrieving stock information from Google Finance and displaying it in a chart. The app also allows the user to modify the way stock data is presented. This app showcases:

- Including stdlib as an import instead of a separate js file
- Integration with Google Charts API
- Ability to wrap/abstract entire APIs in separate classes (YQL and Google Charts)
- Ability to create Pyjamas-like widgets that wrap around existing elements and extend their functionality (stock picker input widget, stock chart widget)
- Ability to work with Flash (Google Charts API currently uses Flash for rendering)
- Pulling data from outside sources via YQL (NASDAQ and Google Finance)
- Asynchronous coding via RapydScript
- RapydScript integration with RapydML and RapydCSS/SASS
