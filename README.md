RapydScript
===========
NOTE: This version of RapydScript is a complete rewrite of original and uses UglifyJS2 as a base. The compiler is now written in JavaScript rather than Python and has numerous advantages over the original. You can read <http://blog.pyjeon.com> for the details.


What is RapydScript?
--------------------
RapydScript is a pre-compiler for JavaScript, similar to CoffeeScript, but with cleaner, more readable syntax. The syntax is very similar to Python, but allows JavaScript as well. This project was written as an alternative to Pyjamas for those wishing Python-like JavaScript without the extra overhead and complexity Pyjamas introduces.

RapydScript allows to write your front-end in Python without the overhead that other similar frameworks introduce (the performance is the same as with pure JavaScript). To those familiar with PyvaScript, the best way to describe RapydScript is PyvaScript++. To those familiar with CoffeeScript, RapydScript is like CoffeeScript with syntax (and some features) of Python. To those familiar with Pyjamas, RapydScript brings many of the same features and support for Python syntax without the same overhead. Don't worry if you've never used either of the above-mentioned compilers, if you've ever had to write your code in pure JavaScript you'll appreciate RapydScript. RapydScript combines the best features of Python as well as JavaScript, bringing you features most other Pythonic JavaScript replacements overlook. Here are a few features of RapydScript:

- classes that work and feel similar to Python
- modules that can be used for logic abstraction and allow more flexibility than Python's modules
- optional function arguments that work similar to Python
- inheritance system that's both, more powerful than Python and cleaner than JavaScript
- support for object literals with anonymous functions, like in JavaScript
- ability to invoke any JavaScript/DOM object/function/method as if it's part of the same framework, without the need for special syntax
- variable and object scoping that make sense (no need for repetitive 'var' or 'new' keywords)
- ability to use both, Python's methods/functions and JavaScript's alternatives
- similar to above, ability to use both, Python's and JavaScript's tutorials (as well as widgets)

Let's not waste any more time with the introductions, however. The best way to learn a new language/framework is to dive in.


Community
---------
If you have questions, bug reports, or feature requests, feel free to post them on our mailing list:  
<http://groups.google.com/group/rapydscript>

I bundled a few demos with RapydScript itself, but several members of the community put together much better demos themselves. If you would like to take a look at them to see what's possible with RapydScript, here are some examples:

<http://salvatore.pythonanywhere.com/RapydScript>  
This includes the demos from RapydScript's `examples` directory, as well as a few others.

<http://salvatore.pythonanywhere.com/RapydBox/editor>  
This is a collection of very cool demos, showcasing RapydScript's similarity to real Python and at the same time its ability to work with other JavaScript. It relies on a JavaScript port of NodeBox (which was originally written in Python). NodeBox was ported from Python to JavaScript to allow cross-platform compatibility. Ironically, the original demos from Python version of NodeBox now work with JavaScript version of NodeBox with few changes (and sometimes none at all) by using RapydScript.


Installation
------------
First make sure you have installed the latest version of [node.js](http://nodejs.org/) (You may need to restart your computer after this step). You may also need to install `optimist` library.

From NPM for use as a command line app:

	npm install rapydscript -g

From NPM for programmatic use:

	npm install rapydscript

From Mercurial:

	hg clone https://bitbucket.org/pyjeon/rapydscript
	cd rapydscript
	npm link .

From Git:

	git clone git://github.com/atsepkov/RapydScript.git
	cd RapydScript
	npm link .

If you're using OSX, you can probably use the same commands (let me know if that's not the case). If you're using Windows, you should be able to follow similar commands after installing node.js and git on your system.


Compilation
-----------
Once you have installed RapydScript, compiling your application is as simple as running the following command:

	rapydscript <location of main file> [options]

By default this will dump the output to STDOUT, but you can specify the output file using `--output` option. The generated file can then be referenced in your html page the same way as you would with a typical JavaScript file. If you're only using RapydScript for classes and functions, then you're all set. If you're using additional Python methods, such as `range()`, `print()`, `list.append()`, `list.remove()`, then you will want to link RapydScript's stdlib.js in your html page as well. There are two ways of doing this, one is to include it as a JavaScript file in your HTML, the other is to include it as an `import` in your source code and let RapydScript pull it in automatically.

RapydScript2 can take multiple input files. It's recommended that you pass the input files first, then pass the options. RapydScript will parse input files in sequence and apply any compression options. The files are parsed in the same global scope, that is, a reference from a file to some variable/function declared in another file will be matched properly.

If you want to read from STDIN instead, pass a single dash instead of input
files.

The available options are:

	-o, --output       Output file (default STDOUT).
	-b, --bare         Omit scope-protection wrapper around generated code
	-p, --prettify     Beautify output/specify output options.            [string]
	-n, --namespace-imports  Pythonic imports (experimental)
	-v, --verbose      Verbose                                           [boolean]
	-V, --version      Print version number and exit.                    [boolean]
	-t, --test         Run unit tests, making sure the compiler produces usable code
	-m, --omit-baselib Omit base library from generated code, make sure you're including baselib.js if you use this
	-i, --auto-bind    Automatically bind methods to the class they belong to (more Pythonic, but could interfere with other JS libs)
	--screw-ie8        Optimize compilation, sacrificing compatibility with older browsers

The rest of the option remain from UglifyJS and have not been tested, some may work, but most will not, since the AST is different between RapydScript and UglifyJS. These option  will eventually be removed or modified to be relevant to RapydScript.


Getting Started
---------------
Like JavaScript, RapydScript can be used to create anything from a quick function to a complex web-app. RapydScript can access anything regular JavaScript can, in the same manner. Let's say we want to write a function that greets us with a "Hello World" pop-up. The following code will do it:

	def greet():
		alert("Hello World!")

Once compiled, the above code will turn into the following JavaScript:

	function greet() {
		alert("Hello World!");
	}

Now you can reference this function from other JavaScript or the page itself (using "onclick", for example). For our next example, let's say you want a function that computes factorial of a number:

	def factorial(n):
		if n == 0:
			return 1
		return n * factorial(n-1)

Now all we need is to tie it into our page so that it's interactive. Let's add an input field to the page body and a cell for displaying the factorial of the number in the input once the input loses focus.

	<input id="user-input" onblur="computeFactorial()"></input>
	<div id="result"></div>

**NOTE:** To complement RapydScript, I have also written RapydML (<http://bitbucket.org/pyjeon/rapydml>), which is a pre-compiler for HTML (just like RapydScript is a pre-compiler for JavaScript). 

Now let's implement computeFactorial() function in RapydScript:

	def computeFactorial():
		n = document.getElementById("user-input").value
		document.getElementById("result").innerHTML = factorial(n)

Again, notice that we have access to everything JavaScript has access to, including direct DOM manipulation. Once compiled, this function will look like this:

	function computeFactorial() {
		var n;
		n = document.getElementById("user-input").value;
		document.getElementById("result").innerHTML = factorial(n);
	}

Notice that RapydScript automatically declares variables in local scope when you try to assign to them. This not only makes your code shorter, but saves you from making common JavaScript mistake of overwriting a global. For more information on controlling variable scope, see `Scope Control` section.


Leveraging other APIs
---------------------
Aside from Python-like stdlib, RapydScript does not have any of its own APIs. Nor does it need to, there are already good options available that we can leverage instead. If we wanted, for example, to rewrite the above factorial logic using jQuery, we could easily do so:

	def computeFactorial():
		n = $("#user-input").val()
		$("#result").text(factorial(n))

Many of these external APIs, however, take object literals as input. Like with JavaScript, you can easily create those with RapydScript, the same way you would create one in JavaScript, or a dictionary in Python:

	styles = {
		'background-color':	'#ffe',
		'border-left':		'5px solid #ccc',
		'width':			50,
	}

Now you can pass it to jQuery:

	$('#element').css(styles)

Another feature of RapydScript is ability to have functions as part of your object literal. JavaScript APIs often take callback/handler functions as part of their input parameters, and RapydScript lets you create such object literal without any quirks/hacks:

	params = {
		width:	50,
		height:	30,
		onclick:	def(event):
			alert("you clicked me"),
		onmouseover:	def(event):
			$(this).css('background', 'red')
		,
		onmouseout:	def(event):
			# reset the background
			$(this).css('background', '')
	}

Note the comma on a new line following a function declaration, it needs to be there to let the compiler know there are more attributes in this object literal, yet it can't go on the same line as the function since it would get parsed as part of the function block. Like Python, however, RapydScript supports new-line shorthand using a `;`, which you could use to place the comma on the same line:

	hash = {
		'foo':	def():
			print('foo');,
		'bar':	def():
			print('bar')
	}

It is because of easy integration with JavaScript's native libraries that RapydScript keeps its own libraries to a minimum. For example, it does not implement string interpolation, like native Python. However, by using `sprintf.js` library (<https://github.com/alexei/sprintf.js>) you can reproduce the same behavior in RapydScript:

	string = vsprintf('%d bottles of %s on the wall', (99, 'beer'))

Take a look at the `examples` directory to see RapydScript integration with `jQuery`, `jQuery-UI`, `D3`, and `Google Charts`.


Anonymous Functions
-------------------
Like JavaScript, RapydScript allows the use of anonymous functions. In fact, you've already seen the use of anonymous functions in previous section when creating an object literal ('onmouseover' and 'onmouseout' assignments). This is similar to Python's lambda function, except that the syntax isn't awkward like lambda, and the function isn't limited to one line. The following two function declarations are equivalent:

	def factorial(n):
		if n == 0:
			return 1
		return n * factorial(n-1)
	
	factorial = def(n):
		if n == 0:
			return 1
		return n * factorial(n-1)
	
This might not seem like much at first, but if you're familiar with JavaScript, you know that this can be extermely useful to the programmer, especially when dealing with nested functions, which are a bit syntactically awkward in Python (it's not immediatelly obvious that those can be copied and assigned to other objects). To illustrate the usefulness, let's create a method that creates and returns an element that changes color while the user keeps the mouse pressed on it.

	def makeDivThatTurnsGreen():
		div = $('<div></div>')
		turnGreen = def(event):
			div.css('background', 'green')
		div.mousedown(turnGreen)
		resetColor = def(event):
			div.css('background', '')
		div.mouseup(resetColor)
		return div

At first glance, anonymous functions might not seem that useful. We could have easily created nested functions and assigned them instead. By using anonymous functions, however, we can quickly identify that these functions will be bound to a different object. They belong to the div, not the main function that created them, nor the logic that invoked it. The best use case for these is creating an element inside another function/object without getting confused which object the function belongs to.

Additionally, as you already noticed in the previous section, anonymous functions can be used to avoid creating excessive temporary variables and make your code cleaner:

	math_ops = {
		add:	def(a, b): return a+b;,
		sub:	def(a, b): return a-b;,
		mul:	def(a, b): return a*b;,
		div:	def(a, b): return a/b;,
		roots:	def(a, b, c):
			r = Math.sqrt(b*b - 4*a*c)
			d = 2*a
			return (-b + r)/d, (-b - r)/d
	}

I'm sure you will agree that the above code is cleaner than declaring 5 temporary variables first and assigning them to the object literal keys after. Note that the example puts the function header (def()) and content on the same line. I'll refer to it as function inlining. This is meant as a feature of RapydScript to make the code cleaner in cases like the example above. While you can use it in longer functions by chaining statements together using `;`, a good rule of thumb (to keep your code clean) is if your function needs semi-colons ask yourself whether you should be inlining, and if it needs more than 2 semi-colons, the answer is probably no (note that you can also use semi-colons as newline separators within functions that aren't inlined, as in the example in the previous section).


Decorators
----------
Like Python, RapydScript supports function decorators. While decorator arguments are not supported, the basic decorators work exactly the same way as in Python:

	def makebold(fn):
		def wrapped():
			return "<b>" + fn() + "</b>"
		return wrapped

	def makeitalic(fn):
		def wrapped():
			return "<i>" + fn() + "</i>"
		return wrapped

	@makebold
	@makeitalic
	def hello():
		return "hello world"

	hello() # returns "<b><i>hello world</i></b>"


Chaining Blocks
---------------
RapydScript wouldn't be useful if it required work-arounds for things that JavaScript handled easily. If you've worked with JavaScript or jQuery before, you've probably seen the following syntax:

	function(){
		// some logic here
	}.call(this);

This code calls the function immediatelly after declaring it instead of assigning it to a variable. Python doesn't have any way of doing this. The closest work-around is this:
	
	def tmp():
		# some logic here
	tmp.__call__()
	
While it's not horrible, it did litter our namespace with a temporary variable. If we have to do this repeatedly, this pattern does get annoying. This is where RapydScript decided to be a little unorthodox and implement the JavaScript-like solution:

	def():
		# some logic here
	.call(this)

RapydScript will bind any lines beginning with `.` to the outside of the block with the matching indentation. This logic isn't limited to the `.call()` method, you can use it with `.apply()` or any other method/property the function has assigned to it. This can be used for jQuery as well:

	$(element)
	.css('background-color', 'red')
	.show()

The only limitation is that the indentation has to match, if you prefer to indent your chained calls, you can still do so by using the `\` delimiter:

	$(element)\
		.css('background-color', 'red')\
		.show()

RapydScript also allows an alternative syntax for the same feature, for those prefering Python's traditional, hanging-indent look:

	def(one, two) and call(this, 1, 2):
		...

Which is equivalent to the following:

	def(one, two):
		...
	.call(this, 1, 2)

Some of you might welcome this feature, some of you might not. RapydScript always aims to make its unique features unobtrusive to regular Python, which means that you don't have to use them if you disagree with them. Recently, we have enhanced this feature to handle `do/while` loops as well:

	a = 0
	do:
		print(a)
		a += 1
	.while a < 1

In my opinion, this is something even Python could benefit from. Like with functions, you could use the hanging-indent form as well:

	a = 0
	do and while a < 1:
		print(a)
		a += 1


Optional Arguments
------------------
Like Python, Javascript allows optional arguments to be passed into a function. Unlike Python, however, JavaScript doesn't assign default values to these, nor does it work well with optional arguments. If you forget to pass an argument, JavaScript will simply set the variable to undefined, and it's up to you to handle it. Should you forget about it, you'll probably pay the price later, when you use this variable in any sort of mathematical computation. By that time, you'll either end up with NaN (not a number), infinity, or some other weird value, causing an error a few hundred lines after the line responsible for causing it (good luck debugging it). Luckily, RapydScript allows sane optional arguments, similar to Python. The following function, for example, allows you to pass in a color for the background, or it will default to black (the format is r,g,b,a):

	def setColor(color=[0,0,0,1]):
		$('body').css('background', 'rgba('+','.join(color)+')')

One thing to note here, is that unlike Python, RapydScript will create a separate object for the optional argument each time the function is called. This makes it slightly less efficient, but prevents it from messing up existing objects.


Variable number of arguments (*args)
------------------------------------
Like Python, Javascript allows the user to write a function that takes variable number of arguments and performs its logic on all of them. Some examples of this are Math.max(), console.log() function and array's concat() method. Unlike, Python, however, JavaScript does not make this intuitive. You have to use a special iterable element inside the function called `arguments`, which has some properties of an array but doesn't support all of the functionality. Likewise, if you want to unfold an array into a list of arguments for a function during a function call, you have to use `.apply()` method instead of invoking the function normally. RapydScript converts Pythonic way of `*args` declaration to JavaScript. For example, the following function definition will take 2 named arguments, and dump the rest into an array (an actual array, not a gimped `arguments` object, like in JavaScript):
	
	def doSomething(a, b, *args):
		...

Likewise, the following function call will unpack the array into separate arguments for the function:

	doSomething(*args)

This is useful for cases where you have multiple elements inside a list, but don't know the size of this list. Here are two equivalent ways of calling the print function, for example:

	# first way
	a = 'I was here'
	b = 'and there'
	print(a, b)
	
	# second way
	a = 'I was here'
	b = 'and there'
	args = [a, b]
	print(*args)

In this particular case, there is no advantage to using `*`, but if `args` gets passed in from outside, and we don't know its size, `*` becomes very handy. Likewise, if you're writing a function that can take variable number of arguments, it's cleaner to use `*args` rather than forcing the developer using it to pass in an array.


Inferred Tuple Packing/Unpacking
--------------------------------
Like Python, RapydScript allows inferred tuple packing/unpacking and assignment. While inferred/implicit logic is usually bad, it can sometimes make the code cleaner, and based on the order of statements in the Zen of Python, 'beautiful' takes priority over 'explicit'. For example, if you wanted to swap two variables, the following looks cleaner than explicitly declaring a temporary variable:

	a, b = b, a

Likewise, if a function returns multiple variables, it's cleaner to say:

	a, b, c = fun()

rather than:

	tmp = fun()
	a = tmp[0]
	b = tmp[1]
	c = tmp[2]

Since JavaScript doesn't have tuples, RapydScript uses arrays for tuple packing/unpacking behind the scenes, but the functionality stays the same. Note that unpacking only occurs when you're assigning to multiple arguments:

	a, b, c = fun()		# gets unpacked
	tmp = fun()			# no unpacking, tmp will store an array of length 3

Unpacking can also be done in `for` loops (which you can read about in later section):

	for index, value in enumerate(items):
		print(index+': '+value)

Tuple packing is the reverse operation, and is done to the variables being assigned, rather than the ones being assigned to. This can occur during assignment or function return:

	def fun():
		return 1, 2, 3

To summarize packing and unpacking, it's basically just syntax sugar to remove obvious assignment logic that would just litter the code. For example, the swap operation shown in the beginning of this section is equivalent to the following code:

	tmp = [b, a]
	a = tmp[0]
	b = tmp[1]


Python vs JavaScript
--------------------
RapydScript allows you to use both, Python and JavaScript names for the methods. For example, we can 'push()' a value to array, as well as 'append()' it:

	arr = []
	arr.push(2)
	arr.append(4)
	print(arr) # outputs [2,4]

In order to use Python's methods, you will have to include RapydScript's stdlib.js. There are two ways of doing this. One is by adding the following line in your html page:

	<script type="text/javascript" src='stdlib.js'></script>

The other way is to include the following line at the top of your main RapydScript file:

	import stdlib

The advantage of the second method is that the library will automatically be pulled in without having to manually copy it over into your JavaScript directory. The first include method, however, might be useful when you have multiple independently compiled RapydScript programs on your page and don't want the overhead of the same stdlib included in each one.

In order to simulate Python-like methods, I had to bastardize a couple of JavaScript's own methods. For example, array.pop() has been overwritten to work like Python's pop() (or JavaScript's splice()):

	arr.pop()		# removes last element (expected behavior in JavaScript and Python)
	arr.pop(2)		# removes third element (expected behavior in Python, but not JavaScript)
	arr.splice(2,1) # removes third element (expected behavior in JavaScript, but not Python)

There is a subtle difference between the last 2 lines above, arr.pop(2) will return a single element, arr.splice(2,1) will return an array containing that single element. Most of the keywords are interchangeable as well:

	RapydScript		JavaScript
	
	None/null		null
	False/false		false
	True/true		true
	undefined		undefined
	this			this

The JavaScript operators, however, are not supported. You will have to use Python versions of those. If you're unfamiliar with them, here is the mapping RapydScript uses:

	RapydScript		JavaScript
	
	and				&&
	or				||
	not				!
	is				===
	is not			!==
	+=1				++
	-=1				--
	
Admittedly, `is` is not exactly the same thing in Python as `===` in JavaScript, but JavaScript is quirky when it comes to comparing objects anyway.

You may also be interested in `deep_eq` function, which is part of `stdlib`. It performs deep equality test on two objects, and works on any types, including hashes and arrays:

	deep_eq([1,2,3], [1,[2,3]])		# False
	deep_eq([[1,2],3], [1,[2,3]])	# False
	deep_eq([1,[2,3]], [1,[2,3]])	# True

In rare cases RapydScript might not allow you to do what you need to, and you need access to pure JavaScript. When that's the case, you can wrap your JavaScript in a string, passing it to JS() method. Code inside JS() method is not a sandbox, you can still interact with it from normal RapydScript:

	JS('a = {foo: "bar", baz: 1};')
	print(a.foo)	# prints "bar"

One last thing to note is the difference between `print()` and `console.log`, `print()` is part of RapydScript's stdlib, and is designed to work similar to Python's print statement, `console.log()` is JavaScript's version of debug output, which is more powerful but also more tedious when you just want a quick output. Here are some examples:

	arr = [1,2,3,4]
	print(arr)			# [1,2,3,4]
	console.log(arr)	# [1,2,3,4]
	
	arr2 = [[1,2],[3,4]]
	print(arr2)			# [[1,2],[3,4]]
	console.log(arr2)	# [Array[2], Array[2]]
	
	hash = {'dogs': 1, 'cats': 2}
	print(hash)			# {"dogs":1,"cats":2}
	console.log(hash)	# Object


Loops
-----
RapydScript's loops work like Python, not JavaScript. You can't, for example use 'for(i=0;i<max;i++)' syntax. You can, however, loop through arrays using 'for ... in' syntax without worrying about the extra irrelevant attributes regular JavaScript returns.

	animals = ['cat', 'dog', 'mouse', 'horse']
	for animal in animals:
		print('I have a '+animal)
		
If you need to use the index in the loop as well, you can do so by using enumerate():

	for index, animal in enumerate(animals):
		print("index:"+index, "animal:"+animal)

Like in Python, if you just want the index, you can use range:

	for index in range(len(animals)):			# or range(animals.length)
		print("animal "+index+" is a "+animals[index])

When possible, RapydScript will automatically optimize the loop for you into JavaScript's basic syntax, so you're not missing much by not being able to call it directly.


List Comprehensions
-------------------
RapydScript also supports list comprehensions, using Python syntax. Instead of the following, for example:

	myArray = []
	for index in range(1,20):
		if index*index % 3 == 0:
			myArray.append(index*index)

You could write this:

	myArray = [i*i for i in range(1,20) if i*i%3 == 0]

**NOTE:** The rest of this section has been removed since the quirks it mentions have not been relevant since the old, Python-based compiler. Current implementation works just as well as a normal loop.


Inclusive/Exclusive Sequences
-----------------------------
Like Python, RapydScript has a range() function. While powerful, the result it generates isn't immediately obvious when looking at the code. It's a minor pet peeve, but the couple extra seconds trying to visually parse it and remember that it's not inclusive can detract from the code flow. To remedy this, RapydScript borrows `to/til` operators from LiveScript (also known as human-readable versions of Ruby's `../...`). The following 4 lines of code are equivalent, for example:

	a = [3 to 8]
	a = [3 til 9]
	a = range(3, 9)
	a = [3, 4, 5, 6, 7, 8]

You can also use sequences within loops:

	for i in [1 to 5]:
		print(i)

Or in list comprehensions:

	[i*i for i in [1 to 6] if i%2 == 0]

The `to/til` statement gets converted to range() at compile time, and therefore can support variables or even expressions for start and end of the range:

	num = 5
	rng = [num to num * 2]
	
The `to/til` operators bind less tightly than arithmetic operators, so parentheses are optional.


Classes
-------
This is where RapydScript really starts to shine. JavaScript is known for having really crappy class implementation (it's basically a hack on top of a normal function, most experienced users suggest using external libraries for creating those instead of creating them in pure JavaScript). Luckily RapydScript fixes that. Let's imagine we want a special text field that takes in a user color string and changes color based on it. Let's create such field via a class.

	class ColorfulTextField:
		def __init__(self):
			field = $('<input></input>')
			changeColor = def(event):
				field.css('backround', field.val())
			field.keydown(changeColor)
			self.widget = field

This class abuses DOM's tolerant behavior, where it will default to the original setting when the passed-in color is invalid (saving us the extra error-checking logic). To append this field to our page we can run the following code:

	textfield = ColorfulTextField()
	$('body').append(textfield.widget)

If you're used to JavaScript, the code above probably set off a few red flags in your head. In pure JavaScript, you can't create an object without using a 'new' operator. Don't worry, the above code will compile to the following:

	var textfield;
	textfield = new ColorfulTextField()
	$('body').append(textfield.widget);

RapydScript will automatically handle appending the 'new' keyword for you, assuming you used 'class' to create the class for your object. This also holds when creating an object inside a list or returning it as well. You could easily do the following, for example:

	fields = [ColorfulTextField(), ColorfulTextField(), ColorfulTextField()]

This is very useful for avoiding a common JavaScript error of creating 'undefined' objects by forgetting this keyword. One other point to note here is that regular DOM/JavaScript objects are also covered by this. So if you want to create a DOM image element, you should not use the 'new' keyword either:

	myImage = Image()

But RapydScript's capability doesn't end here. Like Python, RapydScript allows inheritance. Let's say, for example, we want a new field, which works similar to the one above. But in addition to changing color of the field, it allows us to change the color of a different item, with ID of 'target' after we press the 'apply' button, located right next to it. Not a problem, let's implement this guy:

	class TextFieldAffectingOthers(ColorfulTextField):
		def __init__(self):
			ColorfulTextField.__init__(self)
			field = self.widget
			submit = $('<button type="button">apply</button>')
			applyColor = def(event):
				$('#target').css('background', field.val())
			submit.click(applyColor)
			self.widget = $('<div></div>')\
				.append(field)\
				.append(submit)

A couple things to note here. We can invoke methods from the parent class the same way we would in Python, by using `Parent.method(self, ...)` syntax. This allows us to control when and how (assuming it requires additional arguments) the parent method gets executed. Also note the use of `\` operator to break up a line. This is something Python allows for keeping each line short and legible. Likewise, RapydScript, being indentation-based, allows the same.

An important distinction between Python and RapydScript is that RapydScript does not allow multiple inheritance. This might seem like a big deal at first, but in actuality it barely matters. When using multiple inheritance, we usually only care about a few methods from the alternative classes. Leveraging JavaScript prototypical inheritance, RapydScript allows us to reuse methods from another class without even inheriting from it:

	class Something(Parent):
		def method(self, var):
			Parent.method(self, var)
			SomethingElse.method(self, var)
			SomethingElse.anotherMethod(self)

Notice that `Something` class has no `__init__` method. Like in Python, this method is optional for classes. If you omit it, an empty constructor will automatically get created for you by RapydScript (or when inheriting, the parent's constructor will be used). Also notice that we never inherited from SomethingElse class, yet we can invoke its methods. This brings us to the next point, the only real advantage of inheriting from another class (which you can't gain by calling the other classes method as shown above) is that the omitted methods are automatically copied from the parent. Admittedly, we might also care about `isinstance()` method, to have it work with the non-main parent, which is equivalent to JavaScript's `instanceof` operator.

**NOTE:** If you compile your code without `--screw-ie8` flag, the constructor will be executed every time you create a subclass of the given class. In most cases this will not hurt you, but in some cases you could see odd side-effects. For example, having a `print()` statement in the parent constructor will cause its contents to be output for every subclass, even if you do not explicitly create an instance. `--screw-ie8` option fixes this issue, at the expense of compatibility with Internet Explorer 6-8.

There is also a convenience function in RapydScript called `mixin` that lets you assign all methods of a given class to another, like Python's multiple inheritance:

	mixin(Snake, Animal, false)     # add Animal's methods to Snake, don't overwrite ones already declared in Snake
	mixin(Snake, Animal, true)      # add Animal's methods to Snake, overwriting ones already declared in Snake

To summarize classes, assume they work the same way as in Python, plus a few bonus cases. The following, for example, are equivalent:

	class Aclass:
		def __init__(self):
			pass
	
		def method(self):
			doSomething(self)

	class Aclass:
		def __init__(self):
			self.method = def():
				doSomething(self)

The variable `self` in the above example is not a keyword. Like in Python, it can be replaced with any other variable name. Also, like in Python, this variable will be tied to the class, unlike `this` keyword of JavaScript. RapydScript still treats `this` keyword the same way JavaScript does:

	class Main:
		def __init__(s):
			main = this
			method = def():
				main.doSomething()
			$('#element').click(method)
		
		def doSomething(s):
			...

Or, leveraging Pythonic binding to first argument, the same can be shortened to:

	class Main:
		def __init__(s):
			method = def():
				s.doSomething()
			$('#element').click(method)
		
		def doSomething(s):
			...

Like Python, RapydScript allows static methods. Marking the method static with `@staticmethod` decorator will compile that method such that it's not bound to the object instance, and ensure all calls to this method compile into static method calls:

	class Test:
		def normalMethod(self):
			return 1

		@staticmethod
		def staticMethod(a):
			return a+1

Some methods in the native JavaScript classes, such as `String.fromCharCode()` have also been marked as static to make things easier for the developer.


### External Classes
RapydScript will automatically detect classes declared within the same scope (as long as the declaration occurs before use), as well as classes properly imported into the module (each module making use of a certain class should explicitly import the module containing that class). RapydScript will also properly detect native JavaScript classes (String, Array, Date, etc.). Unfortunately, RapydScript has no way of detecting classes from third-party libraries. In those cases, you could use the `new` keyword every time you create an object from such class. Alternatively, you could mark the class as external.

Marking a class as external is done via `external` decorator. You do not need to fill in the contents of the class, a simple `pass` statement will do:

	@external
	class Alpha:
		pass

RapydScript will now treat `Alpha` as if it was declared within the same scope, auto-prepending the `new` keyword when needed and using `prototype` to access its methods (see `casperjs` example in next section to see how this can be used in practice). You don't need to pre-declare the methods of this class (unless you decide to for personal reference, the compiler will simply ignore them) unless you want to mark certain methods as static:

	@external
	class Alpha:
		@staticmethod
		def one():
			pass

`Alpha.one` is now a static method, every other method invoked on `Alpha` will still be treated as a regular class method. While not mandatory, you could pre-declare other methods you plan to use from `Alpha` class as well, to make your code easier to read for other developers, in which case this `external` declaration would also serve as a table of contents for `Alpha`:

	@external
	class Alpha:
		def two(): pass
		def three(): pass

		@staticmethod
		def one(): pass

As mentioned earlier, this is simply for making your code easier to read. The compiler itself will ignore all method declarations except ones marked with `staticmethod` decorator.

You could also use `external` decorator to bypass improperly imported RapydScript modules. However, if you actually have control of these modules, the better solution would be to fix those imports.


### Method Binding
By default, RapydScript does not bind methods to the classes they're declared under. This behavior is unlike Python, but very much like the rest of JavaScript. For example, consider this code:

	class Boy:
		def __init__(self, name):
			self.name = name

		def greet(self):
			print('My name is' + self.name)

	tod = Boy('Tod')
	tod.greet()                 # Hello, my name is Tod
	getattr(tod, 'greet')()     # Hello, my name is undefined

In some cases, however, you may wish for the functions to remain bound to the object they were retrieved from. For those cases, RapydScript has `bind` function. Unlike regular JavaScript `Function.prototype.bind`, RapydScript's `bind` can rebind methods that have already been bound. The binding we wanted to see in the above example can be achieved as follows:

	bound = bind(getattr(tod, 'greet'), tod)
	bound()                     # Hello, my name is Tod

To unbind a bound method, you can call pass `false` as a second argument instead of an object you wish to bind to. You can also auto-bind all methods of the class by calling `rebind_all`:

	class Boy:
		def __init__(self, name):
			self.name = name
			rebind_all(self)

		def greet(self):
			print('My name is' + self.name)

	tod = Boy('Tod')
	tod.greet()                 # Hello, my name is Tod
	getattr(tod, 'greet')()     # Hello, my name is Tod

Likewise, `rebind_all(self, false)` will unbind all methods. It's not recommended to auto-bind classes that inherit from 3rd party libraries. For example, `casperjs` has `Casper` class, which RapydScript can easily inherit and extend:

	@external
	class Casper:
		pass

	class Scraper(Casper):
		def __init__(self):
			Casper.__init__(self)
			self.start()

	s = Scraper()
	s.thenOpen('http://casperjs.org',
		def(): this.echo(this.getTitle())
	)
	s.run()

Including `rebind_all` call in the constructor, however, will break `Casper`. It is for that reason that `rebind_all` isn't added to the constructor by default by RapydScript. You could, however use `--auto-bind` compile flag to have RapydScript rebind automatically for you. There is a bit more that this flag does behind the scenes, which ensures that class binding behaves identical to Python, at the expense of some performance and compatibility with libraries like `casperjs`.


Modules
-------
Unlike Python, RapydScript's import system does not automatically encapsulate external files in modules. Multiple RapydScript users have raised concerns about this, so I added explicit modules to RapydScript. They work very similar to implicit modules of Python, with the exception that developer would use the `module` keyword rather than creating a new file. As a result, one can place multiple modules into a single file, or even nest them (note that import logic cannot import from within nested modules individually, only from files). In terms of JavaScript, a module is basically a function such that all of its local variables are visible to the outside. For example:

	module math:
		pi = Math.PI

		a = "foo"
		a += "bar"

		counter = 0
		def inc_counter():
			nonlocal counter
			counter += 1
		def get_counter():
			return counter

		class Counter:
			def __init__(self):
				self.counter = 0
			def inc(self):
				self.counter += 1

	print(math.pi)				# outputs 3.141592653589793
	print(math.a)				# outputs 'foobar'

	math.inc_counter()			# increments counter
	print(math.counter)			# outputs 0 (math.counter has been imported by value, it will not update when internal counter does)
	print(math.get_counter())	# outputs 1

	c = math.Counter()			# creates a new instance of math.Counter, note the absence of 'new' keyword
	c.inc()						# increments counter
	print(c.counter)			# outputs 1

Above examples show a few interesting features of RapydScript modules. First, note that modules allow all of the same logic inside of them as regular functions, as seen by appending 'bar' to 'foo'. Since module runs at the time of its initialization, any such logic will have already been executed by the time you reference the module from other code. This is how Python works with modules as well. Second, since JavaScript (like Python) passes primitive types by value, referencing them directly from outside the module will return their values at the time of module initialization rather than their current values. The example printing `math.counter` makes this clear. Third, RapydScript is smart enough to detect classes through modules, so you don't need to remember the `new` keyword for classes declared within modules.

The automatic `new` keyword is a useful feature, but what about modules that are declared in different files? If you `import` them in your code directly, RapydScript will pick them up automatically as well. If you instead include multiple `.js` files in your HTML, you could bypass the problem via decorators. Like classes (and functions), modules support `@external` decorator:

	@external
	module math:
		class Counter:
			pass

	c = math.Counter()

The above example will treat `math.Counter` as a class, but will not create the class or the `math` module containing it, assuming that `math.Class` will be included from somewhere else when the page loads. Since modules are technically functions, they also support normal decorators, like the functions themselves:

	def has_item(m):
		m.item = "an item"
		return m

	@has_item
	module blank:
		pass

	print(blank.item)		# outputs 'an item'

This is unlike Python modules, but can be useful in case you want to tweak your modules further, like adding extra parameters to them or conditional debug logic. You could also nest modules as many levels as you wish:

	module world:
		module country:
			co = 'US'
			module city:
				ct = 'Cupertino, CA'
				module zipcode:
					z = '95014'
					class House:
						def __init__(self, address):
							self.addr = address
						def get_address(self):
							return [self.addr, ct, z, co].join(', ')

	apple_hq = world.country.city.zipcode.House('1 Infinite Loop')
	apple_hq.get_address()		# '1 Infinite Loop, Cupertino, CA, 95014, US'

This is admittedly a silly example, since we hardcoded the city and zipcode yet dynamically specify the address, but it's a good example of what can be achieved via module-nesting.


Exception Handling
------------------
Like Python and JavaScript, RapydScript has exception handling logic. The following, for example, will warn the user if variable `foo` is not defined:

	try:
		print(foo)
	except:
		print("Foo wasn't declared yet")

It's a good practice, however, to only catch exceptions we expect. Imagine, for example, if `foo` was defined, but as a circular structure (with one of its attributes referencing itself):

	foo = {}
	foo.bar = foo

We would still trigger an exception, but for a completely different reason. A better way to rewrite our `try/except` block would be:

	try:
		print(foo)
	except ReferenceError:
		print("Foo wasn't declared yet")

We could also handle circular structure exception, if we needed to:

	try:
		print(foo)
	except ReferenceError:
		print("Foo wasn't declared yet")
	except TypeError:
		print("One of foo's attributes references foo")

Or we could just dump the error back to the user:

	try:
		print(foo)
	except as err:
		print(err.name + ':' + err.message)

In this example, `err` is a JavaScript error object, it has `name` and `message` attributes, more information can be found at <https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Error>. You can inherit from this object as if it was a class to create custom errors, just like you would in Python:		

	class MyError(Error):
		def __init__(self, message):
			self.name = Error
			self.message = message
	
	raise MyError('This is a custom error!')

You can lump multiple errors in the same except block as well:

	try:
		print(foo)
	except ReferenceError, TypeError as e:
		print(e.name + ':' + e.message)

Basically, `try/except/finally` in RapydScript works very similar to the way it does in Python 3, lacking only the `else` directive (it didn't seem useful enough to implement). Like in Python and JavaScript, you can nest multiple exceptions inside each other, and use `raise` to throw the error back at the user:

	try:
		print(foo)
	except ReferenceError as e:
		if e.message == 'foo is not defined':
			print('undefined')
		else:
			raise e
	finally:
		# reset foo
		foo = 'bar'

Like in Python (but unlike in regular JavaScript), you can use `raise` keyword by itself from within `except` block to reraise last-caught error.


Scope Control
-------------
Scope refers to the context of a variable. For example, a variable declared inside a function is not seen by the code outside the function. This variable's scope is local to the function. JavaScript controls scope via `var` keyword. Any variable that you start using without declaring with a `var` first will try to reference inner-most variable with the same name, if one doesn't exist, it will create a global variable with that name. For example, the following JavaScript code will not only return `a` incremented by 1, but also overwrite the global variable `a` with `a+1`:

	a = 1;
	a_plus_1 = function() {
		return ++a;
	};

Basically, JavaScript defaults to outer or global scope if you omit `var`. This behavior can introduce some very frustrating bugs in large applications. To avoid this problem, RapydScript's scope preference works in reverse (same as Python's). RapydScript will prefer local-most scope, always creating a local variable if you perform any sort of assignment on it in a function (this is called variable shadowing). Shadowing can create another annoyance, however, of function's variable changes getting discarded. For example, at first, it looks like the following code will set `a` to 2:

	a = 1
	b = 1
	increment = def():
		a += b
	increment()

When executed, however, increment() function will discard any changes to `a`. This is because, like Python, RapydScript will not allow you to edit variables declared in outer scope. As soon as you use any sort of assignment with `a` in the inner scope, RapydScript will declare it as an internal variable, shadowing `a` in the outer scope. One way around this is to use the `global` keyword, declaring `a` as a global variable. This, however, must be done in every function that edits `a`. It also litters global scope, which it frowned upon because it can accidently overwrite an unrelated variable with the same name (declared by someone else or another library). RapydScript solves this by introducing `nonlocal` keyword (just like Python 3):

	a = 1
	b = 1
	increment = def():
		nonlocal a
		a += b
	increment()

Note that `b` is not affected by shadowing. It's the assignment operator that triggers shadowing, you can read outer-scope variables without having to use `nonlocal`. You can combine multiple non-local arguments by separating them with a comma: `nonlocal a, b, c`. You can also chain `nonlocal` declarations to escape multiple scopes:

	def fun1():
		a = 5
		b = fun2():
			nonlocal a
			a *= 2
			c = fun3():
				nonlocal a
				a += 1

Shadowing is preferred in most cases, since it can't accidently damage outside logic, and if you want to edit an external variable, you're usually better off assigning function's return value to it. There are cases, however, when using `nonlocal` makes the code cleaner. There is also `global`, but it is rarely a good solution, and use of `nonlocal` is preferred to it.


Importing
---------
Like Python, RapydScript allows you to import additional modules into your code. Unlike Python, however, (and like RapydML) the current implementation of the importing logic is naive. This means that RaoydScript doesn't separate different modules into separate namespaces, nor does it support module aliasing yet (eventually I do want that functionality).

For those unfamiliar with importing, let's imagine we're writing a very large program. This program is several thousand lines of code. We could dump it all into the same file, but that wouldn't be too clean (especially when we have multiple developers working on it). Alternatively, we could separate different chunks of the program into different files. Let's imagine, for example, that we're writing a videogame. We've already written a module that implements 'BasicCharacter' class, used by NPCs, monsters, and the main character. We've saved this class to Basic.pyj (that's the extension RapydScript prefers). Now let's create the main character in a different module:

	import Basic
	
	class MainCharacter(BasicCharacter):
		"""
		This is the main character class, similar to basic but it implements attack and hp
		"""
		def __init__(self):
			BasicCharacter.__init__(self)
			self.hp = 100
			self.damage = 10
		
		def attack(self, something):
			something.getHurt(self.damage)
		
		def getHurt(self, damage):
			self.hp -= damage

With RapydScript's importing, you don't need to worry about including each JavaScript file individually in your html. All your .pyj files will get concatenated into a single .js file that you can then include in your page. The name of the .js file will match the name of the file you used input for the RapydScript compiler.

RapydScript already adds several modules you can import by default, like `stdlib` and `yql`. Check out the examples or the documentation in the modules themselves for usage.


Available Libraries
-------------------
One of Python's main strengths is the number of libraries available to the developer. This is something very few other `Python-in-a-browser` frameworks understand. In the browser JavaScript is king, and no matter how many libraries the community for the given project will write, the readily-available JavaScript libraries will always outnumber them. This is why RapydScript was designed with JavaScript and DOM integration in mind from the beginning. Indeed, plugging `underscore.js` in place of RapydScript's `stdlib` will work just as well, and some developers may choose to do so, after all, `underscore.js` is very Pythonic and very complete. Likewise, `sprintf.js` (<https://npmjs.org/package/sprintf-js>) can be used with RapydScript to replicate Python's string interpolation.

It is for that reason that I try to keep RapydScript bells and whistles to a minimum. RapydScript's main strength is easy integration with JavaScript and DOM, which allows me to stay sane and not rewrite my own versions of the libraries that are already available. That doesn't mean, however, that pythonic libraries can't be written for RapydScript. To prove that, I have implemented lightweight clones of several popular Python libraries and bundled them into RapydScript, you can find them in `src` directory. The following libraries are included:

	stdlib/stdlib2		# see stdlib section
	math				# replicates almost all of the functionality from Python's math library
	re					# replicates almost all of the functionality from Python's re library
	unittest			# replicates almost all of the functionality from Python's unittest library
	random				# replicates most of the functionality from Python's random library
	yql					# lightweight library for performing Yahoo Query Language requests

For the most part, the logic implemented in these libraries functions identically to the Python versions. One notable exception is that unittest library requires that classes be bound to the `global` (nodejs) or `window` (browser) object to be picked up by `unittest.main()`. An example in `unitetest.pyj` shows this usage. I'd be happy to include more libraries, if other members of the community want to implement them (it's fun to do, `re.pyj` is a good example), but I want to reemphasize that unlike most other Python-to-JavaScript compilers, RapydScript doesn't need them to be complete since there are already tons of available JavaScript libraries that it can use natively.


Advanced Usage Topics
---------------------
This section contains various topics which might be of interest to the programmer writing large projects using RapydScript, but might not be relevant to a programmer who is just getting started with RapydScript. The topics in this section focus on coding conventions to keep your code clean, optimizations, and additional libraries that come with RapydScript, as well as suggestions for writing your own libraries.

### Browser Compatibility
By default, RapydScript compiles your logic such that it will work on modern browsers running HTML5, as well as older browser like IE6-8. To do so, the compiler sometimes has to generate rather messy and inefficient output. As of September, 2013, less than 8% of the world has been found to be using IE8. If you know that your users will not be using older browsers, you can compile your logic with `--screw-ie8` option to generate cleaner, faster code.

### Code Conventions
It's not hard to see that RapydScript is a cleaner language than JavaScript. However, like with all dynamically-typed languages (including Python), it's still easy to shoot yourself in the foot if you don't follow some sort of code conventions. Needless to say, they're called `conventions` for a reason, feel free to ignore them if you already have a set of conventions you follow or if you disagree with some.

#### Tabs vs Spaces
This seems to be a very old debate. Python code conventions suggest 4-space indent, most of the bundled RapydScript files use 1-tab for indentation. The old version of RapydScript relied on tabs, new one uses spaces since that seems to be more consistent in both Python and JavaScript communities. Use whichever one you prefer, as long as you stay consistent. If you intend to submit your code to RapydScript, it must use spaces to be consistent with the rest of the code int he repository.

#### Object Literals vs Hashes/Dicts
JavaScript treats object literals and hashes as the same thing. I'm not a fan of this policy. Some of the problems you can see resulting from this is Google Closure compiler's ADVANACED_OPTIMIZATIONS breaking a lot of seemingly-good JavaScript code. The main problem for most of the code that breaks seems to be renaming of methods/variables in one place and not another. My suggestion is to ALWAYS treat object literals as object literals and ALWAYS treat hashes as hashes, basically be consistent about quoting your keys. As an added bonus, your code will have a much better chance of compiling correctly via Closure compiler. For example:

	obj = {
		foo:	1,
		bar:	def(): print('bar' + str(foo))
	}
	hash = {
		'foo':	1,
		'bar':	def(): print('bar' + str(foo))
	}
	
	obj.bar()		# good
	obj['bar']()	# bad
	
	hash.bar()		# bad
	hash['bar']()	# good

#### Semi-Colons
Don't abuse semi-colons. They're meant as a way to group related logic together, not to fit your entire web-app on one line. The following is fine:

	X = 0; Y = 1

Anything that requires more than a couple semi-colons, however, or involves long mathematical computations, is better off on its own line. Use your discretion, if the logic requires more than one visual pass-through from the programmer to understand the flow, you probably shouldn't use semi-colons. A Fibanacci function, as shown below, would probably be the upper limit of the kind of logic you could sanely represent with semi-colons:

	fib = def(x): if x<=1: return 1; return fib(x-1)+fib(x-2)

Even for this example, however, I'd personally prefer to use multiple lines.

#### jQuery-wrapped Elements
If you use jQuery with your app, you will probably be storing these into variables a lot. If you've written a decently sized app, you've probably mistaken a bare element with wrapped element at least once. This is especially true of objects like `canvas`, where you need to access object's attributes and methods directly. My solution for these is simple, prepend jQuery-wrapped elements with `$`:

	$canvas = ('<canvas></canvas>')
	canvas = $canvas.get(0)
	ctx = canvas.getContext('2d')
	$canvas.appendTo(document)

This is especially useful with function definitions, since you will immediately know what kind of object the function takes in just by skimming its signature.

#### Libraries
I recommend that developers rely on native JavaScript logic when possible, rather than libraries like `math.pyj` and `re.pyj`. While they mimic Python without problems and work quite well, they introduce extra overhead that your web app doesn't need. Additionally, I think `re` module in Python is unnecessarily complex, and JavaScript's `RegExp` object is much easier to use. With that said, these libraries can be extremely useful for porting large applications from Python to the web, but if you're writing new code, it will probably be easier to maintain if you decide to use native JavaScript alternatives (such as `Math` and `RegExp`) instead.


Quirks
------
In a perfect world, software works flawlessly and doesn't have any special cases requiring workarounds on the user's part. In a less-perfect world, all quirks are due to the software itself and can be fixed. In our world, we not only have to deal with the quirks of the software we're using, but other software it interacts with. RapydScript is no exception, in addition to its own quirks there are a few quirks brought upon us by the browser as well as a few bugs in jQuery that affect us. Here is a list of things you need to be aware of:

- RapydScript automatically appends 'new' keyword when using classes generated by it, it does not append it to objects created by another library, but it does append it to native JavaScript objects like `Image` and `RegExp`.
- jQuery erroneously assumes that no other library will be modifying JavaScript's 'Object', and fails to do `object.hasOwnProperty()` check in multiple places where it should. To avoid breaking it, I had to implement stdlib such that dictionary methods are methods of a different object. Regular Python allows you to call hash.keys() as well as dict.keys(hash). RapydScript only supports the second notation - which is admittedly a bit more awkward.
