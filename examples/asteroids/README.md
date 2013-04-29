Asteroids Example
=================

Copyright 2013 Pyjeon Software LLC  
Author:	Charles Law (based on Pyjamas Asteroids)  
License: Creative Commons: Attribution + Noncommerial + ShareAlike  

![Preview](https://bitbucket.org/pyjeon/rapydscript/raw/default/examples/asteroids/preview.png 'Preview Screenshot')

RapydScript Asteroids
---------------------
The asteroids game was originally written as a Pyjs (formally Pyjamas) example. With some relatively minor changes, the code was ported over to RapydScript. The RapydScript verion has the full functionality of the game but with a significantly smaller footprint. The important metrics from our perspective are:

	Download Size: 18 kb   vs 1200 kb
	Download Time: 1.3 sec vs  17 sec
	LOC:             700   vs   32900

It is also worth noting that there are currently 6 cache files generated for Pyjs so the app takes significantly more storage space.

Example in action: [RapydScript Asteroids](http://pyjeon.pythonanywhere.com/static/asteroids/index.html)


Pyjs Asteroids
--------------
The Pyjs Asteroids game builds to approximately 1200kb for a single cache file. End users will have to wait significantly longer to load a webpage.

For developers, Pyjs can make applications appear slow and use more bandwidth to transfer. It is also worth noting that Pyjs generates 6 cache files that all must be deployed.

Example in Action: [Pyjs Example](http://pyjeon.pythonanywhere.com/static/examples/pyjsasteroids/compiled/Space.html)

