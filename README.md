
RapydScript
===========

[![Build Status](https://secure.travis-ci.org/atsepkov/RapydScript.png)](http://travis-ci.org/atsepkov/RapydScript)
[![npm](https://img.shields.io/npm/dt/rapydscript.svg)](https://www.npmjs.com/package/rapydscript)

What is RapydScript?
--------------------
RapydScript is a pre-compiler for JavaScript. The syntax is very similar to Python, but allows JavaScript as well. This project was written as a cleaner alternative to CoffeeScript. Here is a quick example of a high-performance Fibonacci function in RapydScript and the JavaScript it produces after compilation:

```python
def memoize(f):
    memo = {}
    return def(x):
        if x not in memo: memo[x] = f(x)
        return memo[x]

@memoize
def fib(n):
    if n == 0: return 0
    elif n == 1: return 1
    else: return fib(n-1) + fib(n-2)
```
JavaScript:
```javascript
function _$rapyd$_in(val, arr) {
    if (arr instanceof Array || typeof arr === "string") {
        return arr.indexOf(val) != -1;
    }
    return arr.hasOwnProperty(val);
}
function memoize(f) {
    var memo = {};
    return function(x) {
        if (!(_$rapyd$_in(x, memo))) {
            memo[x] = f(x);
        }
        return memo[x];
    };
}

fib = memoize(function fib(n) {
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
});
```

Here are just a few examples of cleaner RapydScript syntax:

| RapydScript              | JavaScript                                                                     |
| ------------------------ | ------------------------------------------------------------------------------ |
| `foo = 1`                | `var foo = 1;`                                                                 |
| `thing in stuff`         | `stuff.indexOf(thing) != -1`                                                   |
| `a < b < c`              | `a < b && b < c`                                                               |
| `def(a, b='foo'):`       | `function(a, b) { if (typeof b === 'undefined') b = 'foo'; }`                  |
| `array[-1]`              | `array[array.length-1]`                                                        |
| `array[3:5] = [7, 8, 9]` | `[].splice.apply(array, [3, 5-3].concat([ 7, 8, 9 ]))`                         |
| `[5 to 15]`              | `Array.apply(null, {length: 11}).map(Number.call, function(n){ return n+5; })` |
| `[a**2 for a in array]`  | `// Really, really long for-loop code...`                                      |
| `{a: "?"} == {a: "?"}`   | `// Bet you didn't know deep equality with no overhead was possible`           |

RapydScript allows to write your JavaScript app in a language much closer to Python without the overhead that other similar frameworks introduce (the performance is the same as with pure JavaScript). To those familiar with CoffeeScript, RapydScript is like CoffeeScript, but inspired by Python's readability rather than Ruby's cleverness. To those familiar with Pyjamas, RapydScript brings many of the same features and support for Python syntax without the same overhead. Don't worry if you've never used either of the above-mentioned compilers, if you've ever had to write your code in pure JavaScript you'll appreciate RapydScript. RapydScript combines the best features of Python as well as JavaScript, bringing you features most other Pythonic JavaScript replacements overlook. Here are a few features of RapydScript:

- `==` compiles to deep equality and uses clever optimizations to avoid performance overhead
- type inference that allows for hybrid-typing similar to TypeScript
- intelligent scoping (no need for repetitive `var` or `new` keywords)
- intelligent code optimizations based on context
- much cleaner code than native JavaScript
- optional function arguments that work just like Python (`func(third='foo')`)
- decorators, list comprehensions, dict comprehensions, verbose regex, starargs, kwargs, you name it
- ability to use both, Python's methods/functions and JavaScript's alternatives
- similar to above, ability to use both, Python's and JavaScript's tutorials (as well as widgets)
- classes that work and feel very similar to Python
- inheritance system that's both, more powerful than Python and cleaner than JavaScript (single inheritance w/ mixins);
- pythonic import system (you can also use `require()`)
- support for object literals with anonymous functions, like in JavaScript
- ability to invoke any JavaScript/DOM object/function/method as if it's part of the same framework, without the need for special syntax
- it's self-hosting, the compiler is itself written in RapydScript and compiles into JavaScript

Let's not waste any more time with the introductions, however. The best way to learn a new language/framework is to dive in.


Table of Contents
-----------------
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Community](#community)
- [Compilation](#compilation)
- [Getting Started](#getting-started)
- [Leveraging other APIs](#leveraging-other-apis)
- [Anonymous Functions](#anonymous-functions)
- [Decorators](#decorators)
- [Function Annotations](#function-annotations)
- [Hybrid and Static Typing](#hybrid-and-static-typing)
- [Self-Executing Functions](#self-executing-functions)
- [Chaining Blocks](#chaining-blocks)
- [Function calling with optional arguments](#function-calling-with-optional-arguments)
- [Inferred Tuple Packing/Unpacking](#inferred-tuple-packingunpacking)
- [Python vs JavaScript](#python-vs-javascript)
- [Loops](#loops)
- [Dict and List Comprehensions](#dict-and-list-comprehensions)
- [Inclusive/Exclusive Sequences](#inclusiveexclusive-sequences)
- [Classes](#classes)
  - [External Classes](#external-classes)
  - [Method Binding](#method-binding)
- [Modules](#modules)
- [Exception Handling](#exception-handling)
- [Scope Control](#scope-control)
- [Importing](#importing)
- [Regular Expressions](#regular-expressions)
- [ES6 Features](#es6-features)
- [Available Libraries](#available-libraries)
- [Advanced Usage Topics](#advanced-usage-topics)
  - [System Scripts](#system-scripts)
  - [Unit Testing](#unit-testing)
  - [Browser Compatibility](#browser-compatibility)
  - [Code Conventions](#code-conventions)
    - [Tabs vs Spaces](#tabs-vs-spaces)
    - [Object Literals vs Hashes/Dicts](#object-literals-vs-hashesdicts)
    - [Semi-Colons](#semi-colons)
    - [Raw JavaScript](#raw-javascript)
    - [jQuery-wrapped Elements](#jquery-wrapped-elements)
    - [Libraries](#libraries)
    - [External Libraries and Classes](#external-libraries-and-classes)
- [Quirks](#quirks)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


Installation
------------
First make sure you have installed the latest version of [node.js](http://nodejs.org/) (You may need to restart your computer after this step). 

From NPM for use as a command line app:

	npm install rapydscript -g

From NPM for programmatic use:

	npm install rapydscript

From Git:

	git clone git://github.com/atsepkov/RapydScript.git
	cd RapydScript
	npm link .

If you're using OSX, you can probably use the same commands (let me know if that's not the case). If you're using Windows, you should be able to follow similar commands after installing node.js and git on your system.


Community
---------
If you have questions, bug reports, or feature requests, feel free to post them on our mailing list:  
<http://groups.google.com/group/rapydscript>

I bundled a few demos with RapydScript itself, but several members of the community put together much better demos. If you would like to take a look at them to see what's possible with RapydScript, here are some examples:

<http://www.glowscript.org/>  
GlowScript is a WebGL-based environment and a physics engine, originally written in Python for the desktop, the author ported it to the browser using
RapydScript compiler.

<http://salvatore.pythonanywhere.com/RapydScript>  
This includes the demos from RapydScript's `examples` directory, as well as a few others.

<http://salvatore.pythonanywhere.com/RapydBox>  
This is a collection of very cool demos, showcasing RapydScript's similarity to real Python and at the same time its ability to work with other JavaScript. It relies on a JavaScript port of NodeBox (which was originally written in Python). NodeBox was ported from Python to JavaScript to allow cross-platform compatibility. Ironically, the original demos from Python version of NodeBox now work with JavaScript version of NodeBox with few changes (and sometimes none at all) by using RapydScript.

<http://salvatore.pythonanywhere.com/RapydGlow>  
RapydScript making use of GlowScript, another project done by a member of our community

<https://github.com/adousen/RapydScript-pyjTransformer>
An in-browser compiler that allows you to use uncompiled RapydScript files in the browser directly via script tags:
```html
<script type="text/pyj" otype="text/jsx" src="helloworld.pyj" async="false"></script>
```

<https://github.com/atsepkov/puzzles/tree/master/project-euler>  
My solutions to Project Euler challenges in RapydScript. For those unfamiliar with projecteuler.net, it's a collection of mathematical puzzles for developers testing their ability to come up with clever/efficient algorithms as well as brevity/elegance of their chosen language. While Python and Ruby are popular choices, barely any solutions are in JavaScript (probably due to the language's arcane syntax and error handling and very limited utility for mathematical challenges out of the box). RapydScript, however, does quite well - sometimes allowing for identical solution as Python, sometimes a more clever one. Execution speed is typically faster than Python, but in some cases lags behind (i.e. when Python version uses sets or optimized numpy logic).


Compilation
-----------
**NOTE: ES6 mode is getting stable enough where I feel comfortable making it the default soon, after which ES5 mode will be deprecated in favor of lighter codebase. To those needing support for older platforms in the future, I recommend sending RapydScript in conjunction with Babel.js.**

Once you have installed RapydScript, compiling your application is as simple as running the following command:

	rapydscript <location of main file> [options]

By default this will dump the output to STDOUT, but you can specify the output file using `--output` option. The generated file can then be referenced in your html page the same way as you would with a typical JavaScript file. If you're only using RapydScript for classes and functions, then you're all set. If you're using additional Python methods, such as `range()`, `print()`, `list.append()`, `list.remove()`, then you will want to link RapydScript's stdlib.js in your html page as well. There are two ways of doing this, one is to include it as a JavaScript file in your HTML, the other is to include it as an `import` in your source code and let RapydScript pull it in automatically.

RapydScript can take multiple input files. It's recommended that you pass the input files first, then pass the options. RapydScript will parse input files in sequence and apply any compression options. The files are parsed in the same global scope, that is, a reference from a file to some variable/function declared in another file will be matched properly.

If you want to read from STDIN instead, pass a single dash instead of input
files.

The available options are:

	-o, --output       Output file (default STDOUT).
	-x, --execute      Execute the file in-place (no compiled output generated)
	-b, --bare         Omit scope-protection wrapper around generated code
	-p, --prettify     Beautify output/specify output options.
	-V, --version      Print version number and exit.
	-t, --test         Run unit tests, making sure the compiler produces usable code, you can specify a file or test everything
		--bench        Run performance tests, you can specify a file or test everything (note that these tests take a while to run)
	-6, --es6          Build code for ES6, cleaner output with support for more features (EXPERIMENTAL)
	-m, --omit-baselib Omit base library from generated code, make sure you're including baselib.js if you use this
	-i, --auto-bind    Automatically bind methods to the class they belong to (more Pythonic, but could interfere with other JS libs)
	-h, --help         Print usage and more information on each of these options
		--self         Compile the compiler itself
		--stats        Show compilation metrics in STDERR (time to parse, generate code, etc.)
		--dd           Drop specified decorators (takes a comma-separated list of decorator names)
		--di           Drop specified imports (takes a comma-separated list of import names)
	-l, --lint         Check file for errors and compilation problems

You can also use RapydScript as your main system's scripting language (similar to how some prefer to write their system scripts in Python). To do so, add the following line to the top of your script files:

	#!/usr/bin/env rapydscript -x

Now simply invoking the file (assuming it has execute permissions on it) should execute it.


Getting Started
---------------
As you read the following sections, I suggest you start a RapydScript shell (by typing `rapydscript` without arguments in your terminal) and follow along. You'll be able to see both, the generated JavaScript, and the output produced by the given RapydScript command.

You can also run the compiler in the browser. Just add a `script` tag linking back to `lib/rapydscript.js` and invoke the compiler as `rapydscript.compile(stringOfCode, options)`.

Like JavaScript, RapydScript can be used to create anything from a quick function to a complex web-app. RapydScript can access anything regular JavaScript can, in the same manner. Let's say we want to write a function that greets us with a "Hello World" pop-up. The following code will do it:

```python
def greet():
	alert("Hello World!")
```

Once compiled, the above code will turn into the following JavaScript:

```javascript
function greet() {
	alert("Hello World!");
}
```

Now you can reference this function from other JavaScript or the page itself (using "onclick", for example). For our next example, let's say you want a function that computes factorial of a number:

```python
def factorial(n):
	if n == 0:
		return 1
	return n * factorial(n-1)
```

Now all we need is to tie it into our page so that it's interactive. Let's add an input field to the page body and a cell for displaying the factorial of the number in the input once the input loses focus.

```html
<input id="user-input" onblur="computeFactorial()"></input>
<div id="result"></div>
```

**NOTE:** To complement RapydScript, I have also written RapydML (<http://bitbucket.org/pyjeon/rapydml>), which is a pre-compiler for HTML (just like RapydScript is a pre-compiler for JavaScript). 

Now let's implement computeFactorial() function in RapydScript:

```python
def computeFactorial():
	n = document.getElementById("user-input").value
	document.getElementById("result").innerHTML = factorial(n)
```

Again, notice that we have access to everything JavaScript has access to, including direct DOM manipulation. Once compiled, this function will look like this:

```javascript
function computeFactorial() {
	var n;
	n = document.getElementById("user-input").value;
	document.getElementById("result").innerHTML = factorial(n);
}
```

Notice that RapydScript automatically declares variables in local scope when you try to assign to them. This not only makes your code shorter, but saves you from making common JavaScript mistake of overwriting a global. For more information on controlling variable scope, see `Scope Control` section.


Leveraging other APIs
---------------------
Aside from Python-like stdlib, RapydScript does not have any of its own APIs. Nor does it need to, there are already good options available that we can leverage instead. If we wanted, for example, to rewrite the above factorial logic using jQuery, we could easily do so:

```python
def computeFactorial():
	n = $("#user-input").val()
	$("#result").text(factorial(n))
```

Many of these external APIs, however, take object literals as input. Like with JavaScript, you can easily create those with RapydScript, the same way you would create one in JavaScript, or a dictionary in Python:

```python
styles = {
	'background-color':	'#ffe',
	'border-left':		'5px solid #ccc',
	'width':			50,
}
```

Now you can pass it to jQuery:

	$('#element').css(styles)

Another feature of RapydScript is ability to have functions as part of your object literal. JavaScript APIs often take callback/handler functions as part of their input parameters, and RapydScript lets you create such object literal without any quirks/hacks:

```python
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
```

Note the comma on a new line following a function declaration, it needs to be there to let the compiler know there are more attributes in this object literal, yet it can't go on the same line as the function since it would get parsed as part of the function block. Like Python, however, RapydScript supports new-line shorthand using a `;`, which you could use to place the comma on the same line:

```python
hash = {
	'foo':	def():
		print('foo');,
	'bar':	def():
		print('bar')
}
```

It is because of easy integration with JavaScript's native libraries that RapydScript keeps its own libraries to a minimum. For example, it does not implement string interpolation, like native Python. However, by using `sprintf.js` library (<https://github.com/alexei/sprintf.js>) you can reproduce the same behavior in RapydScript:

```python
string = vsprintf('%d bottles of %s on the wall', (99, 'beer'))
```

Take a look at the `examples` directory to see RapydScript integration with `jQuery`, `jQuery-UI`, `D3`, and `Google Charts`.


Anonymous Functions
-------------------
Like JavaScript, RapydScript allows the use of anonymous functions. In fact, you've already seen the use of anonymous functions in previous section when creating an object literal ('onmouseover' and 'onmouseout' assignments). This is similar to Python's lambda function, except that the syntax isn't awkward like lambda, and the function isn't limited to one line. The following two function declarations are equivalent:


```python
def factorial(n):
	if n == 0:
		return 1
	return n * factorial(n-1)

factorial = def(n):
	if n == 0:
		return 1
	return n * factorial(n-1)
```

This might not seem like much at first, but if you're familiar with JavaScript, you know that this can be extermely useful to the programmer, especially when dealing with nested functions, which are a bit syntactically awkward in Python (it's not immediatelly obvious that those can be copied and assigned to other objects). To illustrate the usefulness, let's create a method that creates and returns an element that changes color while the user keeps the mouse pressed on it.

```python
def makeDivThatTurnsGreen():
	div = $('<div></div>')
	turnGreen = def(event):
		div.css('background', 'green')
	div.mousedown(turnGreen)
	resetColor = def(event):
		div.css('background', '')
	div.mouseup(resetColor)
	return div
```

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
Like Python, RapydScript supports function decorators.

```python
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

def multiple_args(front, back, repeat):
    return def(f):
        return def():
            string = front + f() + back
            container = []
            for i in range(repeat):
                container.push(string)
            return container.join(',')

@multiple_args('{{', '}}', 3)
def foo(): return 'foo'

foo() # returns '{{foo}},{{foo}},{{foo}}'
```

Function Annotations
--------------------
Like Python 3 and TypeScript, RapydScript allows function annotations. They look like this:

```python
def foo(a: Number, b: String) -> String:
	return b + str(a)

def bar(x: "x coordinate of the point", y: "y coordinate of the point") -> "distance from 0, 0":
	return Math.sqrt(x**2 + y**2)
```

Python is more flexible about them since they're treated as a fancy comment. In TypeScript they are actually significant and
used to enforce static typing. In current version of RapydScript they are significant if they resolve to a static type.
See "Static Typing" section for more details.


Hybrid And Static Typing
------------------------
RapydScript allows you to use both dynamic and static typing (similar to TypeScript or Flow). Unlike TypeScript, however, RapydScript goes
a step further with error detection and code optimization when you use static typing. I call this approach hybrid-typing.

The idea behind hybrid-typing is to combine the best of dynamic typing and static typing. Dynamic typing gives more flexibility to the
user and the code can more easily be reused in other places. Static typing gives the compiler more information about the context,
allowing for better linting, error checking and optimizations.

Some examples of logic the compiler can do for statically-typed code are:

- raise errors when the type of a statically declared variable is violated
- raise errors when an incompatible operation is performed on two variables (no more `{} + []`)
- inline certain functions/operations
- precompute certain values, assuming enough context/information about their state

You may wonder why compilers like TypeScript can't do the same. There are two parts to the answer:

- TypeScript tries to be more compatible with native JavaScript and as a result has to be more conservative with its optimizations
- RapydScript uses some non-JavaScript design patterns, as well as banning some traditional JavaScript anti-patterns, this stricter language syntax allows RapydScript to be more aggressive with its optimizations and errors

You don't need to do anything to benefit from RapydScript's type inference, your variable types are automatically resolved behind the scenes. However,
you can give the compiler even more hints about variables types (and as a result benefit from its optimizations and error detection even more). Do do
so, simply label function inputs and outputs via type annotations as mentioned in previous section:

```python
def optimizeMe(a: Number, b:Number) -> Number:
	...
```

The compiler will now check that the arguments passed to the function are indeed numbers and the output is also a number, throwing an error if it detects
an incorrect input or return. Additionally, the compiler will use inputs and outputs of this function to resolve the types of other variables in
your code, further assisting itself in optimizations and error checking.

The best way to use hybrid-typing is to start out with dynamically-typed code and add types to it once you finalize and refactor the function. While
static typing is optional, I definitely recommend you do it. The best way to think about static typing is as a free unit test for your
logic.


Self-Executing Functions
------------------------
RapydScript wouldn't be useful if it required work-arounds for things that JavaScript handled easily. If you've worked with JavaScript or jQuery before, you've probably seen the following syntax:

	(function(args){
		// some logic here
	})(args)

This code calls the function immediately after declaring it instead of assigning it to a variable. Python doesn't have any way of doing this. The closest work-around is this:

	def tmp(args):
		# some logic here
	tmp.__call__(args)

While it's not horrible, it did litter our namespace with a temporary variable. If we have to do this repeatedly, this pattern does get annoying. This is where RapydScript decided to be a little unorthodox and implement the JavaScript-like solution:

	(def(args):
		# some logic here
	)()

A close cousin of the above is the following code (passing current scope to the function being called):

	function(){
		// some logic here
	}.call(this);

With RapydScript equivalent of:

	def():
		# some logic here
	.call(this)

There is also a third alternative, that will pass the arguments as an array:

	def(a, b):
		# some logic here
	.apply(this, [a, b])


Chaining Blocks
---------------
As seen in previous section, RapydScript will bind any lines beginning with `.` to the outside of the block with the matching indentation. This logic isn't limited to the `.call()` method, you can use it with `.apply()` or any other method/property the function has assigned to it. This can be used for jQuery as well:

	$(element)
	.css('background-color', 'red')
	.show()

The only limitation is that the indentation has to match, if you prefer to indent your chained calls, you can still do so by using the `\` delimiter:

	$(element)\
		.css('background-color', 'red')\
		.show()

You may use this feature to define and call the function immediately:

	def(one, two):
		...
	.call(this, 1, 2)

JavaScript's parenthesized syntax will work as well:

	(def(one, two):
		...
	)(1, 2)

Some of you might welcome this feature, some of you might not. RapydScript always aims to make its unique features unobtrusive to regular Python, which means that you don't have to use them if you disagree with them. RapydScript implements `do/while` loops via similar syntax as well:

	a = 0
	do:
		print(a)
		a += 1
	.while a < 1


Function calling with optional arguments
-------------------------------------------
RapydScript supports the same function calling format as Python. You can have named optional arguments, create functions with variable numbers of arguments and variable number of named arguments. Some examples will illustrate this best:

	def foo(a, b=2):
		return [a, b]
	foo(1) == foo(1, 2) == [1, 2]

	def bar(a, b, c):
		return [a, b, c]
	bar(3, 2, 1) == bar(c=1, b=2, a=3) == [3, 2, 1]

	def baz(a, *args):
		return [a, args]
	baz(1, 2, 3) == [1, [2, 3]]

	def qux(a, b=2, **kwargs):
		return [a, b, kwargs]
	qux(1, b=3, c=4) == [1, 3, {c:4}]

RapydScript is not as strict as Python when it comes to validating function arguments. This is both for performance and to make it easier to interoperate with other JavaScript libraries. So if you do not pass enough arguments when calling a function, the
extra arguments will be set to undefined instead of raising a TypeError, as would be the case in Python. Similarly, when mixing `**kwargs` and optional arguments, RapydScript will not complain if an optional argument is specified twice, it will use the one specified in kwargs.

RapydScript will also create a separate object for an optional argument each time the function is called. This makes it slightly less efficient, but prevents the common bug in python caused by using a mutable object literal as the default value for an optional argument.


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
	NaN				NaN
	Infinity		Infinity

The basic operators like `+, +=, -, -=, /, /=, *, *=` work the same way in both languages as well. The JavaScript operators, however, are not supported. You will have to use Python versions of those. If you're unfamiliar with them, here is the mapping RapydScript uses:

	RapydScript		JavaScript
	
	==				deep equality (JS has no equivalent)
	!=				deep inequality (JS has no equivalent)
	and				&&
	or				||
	not				!
	is				===
	is not			!==
	+=1				++
	-=1				--
	**				Math.pow()
	//				floor division
	
Admittedly, `is` is not exactly the same thing in Python as `===` in JavaScript, but JavaScript is quirky when it comes to comparing objects anyway.

One important feature of RapydScript is its deep equality operators (`==`, `!=`). They have been carefully crafted through a few compilation tricks to
experience no overhead over JavaScript's traditional operators yet return correct result when comparing copies of objects.

```python
[1,2,3] == [1,[2,3]]		# False
[[1,2],3] == [1,[2,3]]	# False
[1,[2,3]] == [1,[2,3]]	# True

class Stuff:
	def __init__(self, data):
		self.data = data

Stuff(1) == Stuff(1)		# True
Stuff(1) == Stuff(2)		# False
Stuff(1) == {data: 1}		# False
```

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

One other topic I debated for a while is handling of conditionals. In Python, if you wanted a one-liner conditional that gets assigned to a variable, you would write something like this:

	foo = bar if baz else 10

In JavaScript, the equivalent logic would be written as follows:

	var foo = baz ? bar : 10

Which one looks cleaner is subject to personal preference (I'm used to seeing condition first in most of the `if` statements, so the second way makes more sense to me). But where the second approach wins is when dealing with anonymous functions. Indeed, Python doesn't have to handle them, yet RapydScript does. As a result, I decided to go with JavaScript's approach here. This also allows me to assign functions here, same way as JavaScript would:

	foo = baz ? def(): return bar; : def(): return 10


Loops
-----
RapydScript loops work like Python, not JavaScript. You can't, for example, use 'for(i=0;i<max;i++)' syntax. You can, however, loop through arrays using 'for ... in' syntax without worrying about the extra irrelevant attributes regular JavaScript returns.

	animals = ['cat', 'dog', 'mouse', 'horse']
	for animal in animals:
		print('I have a '+animal)
		
If you need to use the index in the loop as well, you can do so by using enumerate():

	for index, animal in enumerate(animals):
		print("index:"+index, "animal:"+animal)

Like in Python, if you just want the index, you can use range:

	for index in range(len(animals)):			# or range(animals.length)
		print("animal "+index+" is a "+animals[index])

When possible, RapydScript will automatically optimize the loop for you into JavaScript basic syntax, so you're not missing much by not being able to call it directly. However, if for some reason you really need to, you always can:

	for JS('i = 0; i < 50; i++'):
		print(i)


Dict and List Comprehensions
----------------------------
RapydScript also supports list comprehensions, using Python syntax. Instead of the following, for example:

	myArray = []
	for index in range(1,20):
		if index*index % 3 == 0:
			myArray.append(index*index)

You could write this:

	myArray = [i*i for i in range(1,20) if i*i%3 == 0]

Dict comprehensions are also supported:

	alphabet = {String.charFromCode(64+n): n for n in [1 to 26]}


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

An important distinction between Python and RapydScript is that RapydScript does not allow multiple inheritance. This is intentional, both for performance reasons and because multiple inheritance creates ambiguity. When using multiple inheritance, we usually only care about a few methods from the alternative classes (also see `mixin` section below). Leveraging JavaScript prototypical inheritance, RapydScript allows us to reuse methods from another class without even inheriting from it:

	class Something(Parent):
		def method(self, var):
			Parent.method(self, var)
			SomethingElse.method(self, var)
			SomethingElse.anotherMethod(self)

Notice that `Something` class has no `__init__` method. Like in Python, this method is optional for classes. If you omit it, an empty constructor will automatically get created for you by RapydScript (or when inheriting, the parent's constructor will be used). Also notice that we never inherited from SomethingElse class, yet we can invoke its methods. This brings us to the next point, the only real advantage of inheriting from another class (which you can't gain by calling the other classes method as shown above) is that the omitted methods are automatically copied from the parent. Admittedly, we might also care about `isinstance()` method, to have it work with the non-main parent, which is equivalent to JavaScript's `instanceof` operator.

To reuse portions of other classes similar to how one would expect via multiple inheritance, RapydScript also allows `mixin`s. To declare class with a few mixins simply use a decorator:

	@mixin(Predator, Maneuverable)
	class Shark(Fish):
		def __init__(self):
			Fish.__init__(self)
			self.bites = True
			self.damage = 999

There is also a convenience function in RapydScript called `merge` that lets you assign all methods of a given class to another, it gives you a bit more control than a `mixin` at the expense of prettier syntax:

	merge(Snake, Animal, false)     # add Animal's methods to Snake, don't overwrite ones already declared in Snake
	merge(Snake, Animal, true)      # add Animal's methods to Snake, overwriting ones already declared in Snake

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
RapydScript's module system works almost exactly like Python's. Modules are
files ending with the suffix `.pyj` and packages are directories containing
an `__init__.pyj` file. The only caveat is that star imports are not
currently supported (this is by design, star imports are easily abused).

For those unfamiliar with Python, here are a few examples that will cover all the user cases you will encounter:

	import foo
	from baz import anotherMethod, andAnotherMethod
	import bar as qux

	foo.methodInFoo()
	anotherMethod()
	andAnotherMethod()
	qux.methodInBar()

RapydScript first tries to search the current directory of the file for the import. If that fails, it tries to search user-defined imports (which
can be set via RAPYDSCRIPT_PATH environment variable as colon-separated directories, or semi-colon separated on Windows), and finally in the RapydScript
builtin directory. This search order allows the user to easily override inbuilt functions.

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

When executed, however, increment() function will discard any changes to `a`. This is because, like Python, RapydScript will not allow you to edit variables declared in outer scope. As soon as you use any sort of assignment with `a` in the inner scope, RapydScript will declare it as an internal variable, shadowing `a` in the outer scope. One way around this is to use the `global` keyword, declaring `a` as a global variable. This, however, must be done in every function that edits `a`. It also litters global scope, which it frowned upon because it can accidentally overwrite an unrelated variable with the same name (declared by someone else or another library). RapydScript solves this by introducing `nonlocal` keyword (just like Python 3):

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
Like Python, RapydScript allows you to import additional modules into your code.

For those unfamiliar with importing, let's imagine we're writing a very large program. This program is several thousand lines of code. We could dump it all into the same file, but that wouldn't be too clean (especially when we have multiple developers working on it). Alternatively, we could separate different chunks of the program into different files. Let's imagine, for example, that we're writing a videogame. We've already written a module that implements 'BasicCharacter' class, used by NPCs, monsters, and the main character. We've saved this class to Basic.pyj (that's the extension RapydScript prefers). Now let's create the main character in a different module:

	from Basic import BasicCharacter
	
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


Regular Expressions
-------------------
RapydScript supports Pythonic and JavaScript way of declaring regular expressions. Additionally, like CoffeeScript, RapydScript supports verbose mode (which works like Perl's `/x` modifier or Python's `VERBOSE` modifier) - flags, if any, are at the end:

	# regular
	op = /^(?:[-=]>|[-+*/%<>&|^!?=]=|>>>=?|([-+:])\1|([&|<>])\2=?|\?\.|\.{2,3})/

	# verbose
	op = /// ^ (
		?: [-=]>             # function
		 | [-+*/%<>&|^!?=]=  # compound assign / compare
		 | >>>=?             # zero-fill right shift
		 | ([-+:])\1         # doubles
		 | ([&|<>])\2=?      # logic / shift
		 | \?\.              # soak access
		 | \.{2,3}           # range or splat
	) ///

And the Pythonic alternative (note that importing `re` module also brings in other logic into your code, you'll end up with more functionality at the expense of performance - unless you need that extra functionality, I recommend JavaScript version shown above):

	# pythonic
	import re
	op = re.compile('^(?:[-=]>|[-+*/%<>&|^!?=]=|>>>=?|([-+:])\1|([&|<>])\2=?|\?\.|\.{2,3})')

	# verbose pythonic (re.VERBOSE is not implemented, since VERBOSE conversion in current engine happens at
	# compile time, for Pythonic re.VERBOSE syntax we'd need to duplicate this logic in re module to run at
	# runtime instead)
	op = re.compile(/// ^ (
		?: [-=]>             # function
		 | [-+*/%<>&|^!?=]=  # compound assign / compare
		 | >>>=?             # zero-fill right shift
		 | ([-+:])\1         # doubles
		 | ([&|<>])\2=?      # logic / shift
		 | \?\.              # soak access
		 | \.{2,3}           # range or splat
	) ///)

As in JavaScript, you can also use the `RegExp` class:

	regex = /ab+c/i
	regex = RegExp('ab+c', 'i')
	regex = RegExp(/ab+c/, 'i')


ES6 Features
------------
Most of the features in the compiler work fine with any version of JavaScript. Some features, however, are only available when you compile with `-es6` flag. Implementing them in older versions of JavaScript is simply not the best use of my time with libraries like Babel.js doing a good job with it. Here are some features that work differently in ES6 mode:

- Function generators (only supported with ES6 flags)
- Computed dictionary/object literal keys (`(foo**2): val`, only supported with ES6 flag)
- Spread operators in arrays (`['one', *splat, 'ten']`, only supported with ES6 flag)
- Spread operators in object literals (`{foo: "bar", *splat, baz: "qux"}`, only supported with ES6 flag)
- Setters and getters for classes (only supported with ES6 flag)
- Template literals

The remaining features are all supported with regular mode but take advantage of ES6 features when compiled with `-es6` flag:

- Cleaner optional function arguments
- Cleaner array to variable unpacking
- Cleaner class declaration logic
- Starargs produce cleaner compilation

Out of the new features mentioned above, function generator syntax is the same as in Python:

```python
def firstN(n):
	num = 0
	while num < n:
		yield num
		num += 1

print(sum(firstN(1e6)))
```

The syntax for computed keys is slightly different from Python, since JavaScript already uses the unquoted key syntax as alias for quoted keys and
RapydScript has been doing the same for a while. But since the array-like syntax of ES6 is ugly/confusing, RapydScript follows the convention it has itself
set for a while of using parentheses (this convention is consistent with self-executing function convention and using class as a function convention):

	computed = "qux"
	key = "Quux"
	hash = {
		regularKey: 1
		'regular-key': "foo",
		(computed + key): "baz"
	}

Spread operators are not supported in Python but are part of ES6 syntax. These allow you to splat one array/hash inside another. For now RapydScript uses
the `*args` convention set by Python for function calls (since this operation is similar in spirit), although the `...args` operator JavaScript uses seems
more intuitive to me, so there is a good chance it may change (or at least support both). Example use cases:

	a = [5 to 20]
	b = [100 til 500]
	c = [1, 2, *a, 27, 28, *b, 999]

	props = {
		foo: "bar",
		baz: 2
	}
	moreProps = {
		*props,
		qux: "quux"
	}

Setters and getters for classes are implemented in a way that's more similar to JavaScript than Python, mainly because their syntax is so horrible
in Python. As an added bonus, they actually feel more consistent with RapydScript's `def` keyword than they do in JavaScript itself:

```python
class Item:
    _item = None

    def unit(self):
        pass

    get item(self):
        return self._item

    set item(self, val):
        self._item = val
```

Template literals are new type of string in ES6 that auto-interpolates variables for you. Just like Python 3.6, RapydScript uses the `f` prefix for these:

```python
name = 'Simon'
greeting = f"Hello, my name is ${name}."
```

This will auto-fill name into the greeting, after which it will function as a regular string. This will eventually be the preferred approach over
concatenating strings, and integer/string concatenation will probably be marked as an error. It is, however, possible that the `${}` syntax, which was
taken from ES6, may change (Python's own syntax is `{}` by themselves).


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

### System Scripts
I typically have a language I strongly prefer over others for writing miscellaneous system scripts, things like moving files around or automating certain tasks on my home (or work) machine. *Bash* tends to work well for simple tasks without too much conditional logic. For other things I used to prefer *Python*. Today, I use *RapydScript* instead. JavaScript has a powerful ecosystem, and it would be a shame to let it go to waste. You can have your *RapydScript* files run natively on your OS as well. Do do so, you can include the following line at the top of your file and `chmod a+x` it:

	#!/usr/bin/env rapydscript -x

This is identical to the following terminal operation:

	rapydscript --execute [filename]

It will trigger the script, omitting the compiled code. You can include the `--pretty` option to include output of the compiled code as well.

### Unit Testing
You're free to use any unit testing library you wish, but RapydScript comes with a `dev` library out of the box. It's a convenient way to test your
functions without having to build out a test harness yourself. To use it, simply import `dev`, set `UTEST` to true on global `root` object and
use `dev.utest` decorator:

```python
import dev

root.UTEST = True

@dev.utest({input: [1, 2], output: 3})
@dev.utest({input: [1, 2, 3], output: 3})
@dev.utest({input: [Infinity, 2], output: Infinity})
def foo(a, b):
	return a + b

@dev.utest({input: [], error: /qux/})
def bar():
	raise Error('qux')
```
The function is tested at load time, not when it's executed, which means these test decorators can stay in your code without affecting execution after.
You may disable the test, however, by unsetting the `UTEST` variable. Aside from running at initialization, you won't even experience function-call
overhead with these decorators since they pass the original function through. However, if you want to remove them altogether in your production
environment, you can use `drop_decorators` and `drop_imports` flags:

```bash
rapydscript file.pyj --dd dev.utest --di dev
```

### Browser Compatibility
By default, RapydScript compiles your logic such that it will work on modern browsers running HTML5. Previously I generated code that was compatible with older versions of IE, but have since decided that it wasn't worth it. It prevented me from making use of sensible JavaScript features many developers take for granted (setters, getters, strict mode, etc.), forced special cases on me, and required overly verbose JavaScript with unnecessary polyfill. RapydScript no longer supports versions of IE before 9, but you can easily bring that support back into RapydScript with the help of a tool like `Modernizr` or `Babel`.

### Easter Eggs
While working with RapydScript, and interesting idea to try came to me:

```python
array = [i**2 for i in [1 to 100]] # just an array, initialized whichever way you want

@array.forEach
def f(e, i):
	print('lolz ' + e)
```
The above logic will do exactly what it looks like. It will auto-trigger on function creation, and repeat the action for each element in the array.
This wasn't intentional addition to the language, more of a side-effect of how decorators are implemented, but I can assure you it's not going anywhere
in case you want to make use of it for something of value.

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

#### Raw JavaScript
Occasionally you may need to use raw JavaScript due to a limitation of RapydScript. To keep code legible and consistent, I suggest minimizing the chunk of code contained within `JS`, keeping most of the logic within RapydScript itself. For example, instead of accessing a variable that shares reserved keyword as `JS('module.exports')` use `JS('module').exports`. This will make it more visually-obvious what you're trying to do as well as allow your syntax highlighter to do its job.

#### jQuery-wrapped Elements
If you use jQuery with your app, you will probably be storing these into variables a lot. If you've written a decently sized app, you've probably mistaken a bare element with wrapped element at least once. This is especially true of objects like `canvas`, where you need to access object's attributes and methods directly. My solution for these is simple, prepend jQuery-wrapped elements with `$`:

	$canvas = ('<canvas></canvas>')
	canvas = $canvas.get(0)
	ctx = canvas.getContext('2d')
	$canvas.appendTo(document)

This is especially useful with function definitions, since you will immediately know what kind of object the function takes in just by skimming its signature.

#### Libraries
I recommend that developers rely on native JavaScript logic when possible, rather than libraries like `math.pyj` and `re.pyj`. While they mimic Python without problems and work quite well, they introduce extra overhead that your web app doesn't need. Additionally, I think `re` module in Python is unnecessarily complex, and JavaScript's `RegExp` object is much easier to use. With that said, these libraries can be extremely useful for porting large applications from Python to the web, but if you're writing new code, it will probably be easier to maintain if you decide to use native JavaScript alternatives (such as `Math` and `RegExp`) instead.

#### External Libraries and Classes
RapydScript will pick up any classes you declare yourself as well as native JavaScript classes. It will not, however, pick up class-like objects created by outside frameworks. There are two approaches for dealing with those. One is via `@external` decorator, the other is via `new` operator when declaring such object. To keep code legible and consistent, I strongly prefer the use of `@external` decorator over the `new` operator for several reasons, even if it may be more verbose:

- `@external` decorator makes classes declared externally obvious to anyone looking at your code
- class declaration that uses `@external` decorator can be exported into a reusable module
- developers are much more likely to forget a single instance of `new` operator when declaring an object than to forget an import, the errors due to omitted `new` keyword are also likely to be more subtle and devious to debug

#### Performance
Performance emphasis is at the core of RapydScript. I don't want to feel like I'm a second-class citizen compared to native JavaScript developers and neither
should other RapydScript users. For that reason RapydScript rejected many Pythonic features that I myself would like to see in favor of performance. Some
of these include operator overloading and better error catching. However, when performance hit is negligible and allows additional productivity to the
developer, that's the kind of win-win RapydScript attempts to capture. For that reason, the compiler comes bundled with a mini benchmark suite. You can
invoke it by using `--bench` command. Since it takes a while to run performance tests, I recommend you select a particular file (in `test/perf/`) to bench. 
A few of these runs will give you a pretty good idea what kind of performance sacrifices you're making with different functions/operators. Feel free to
throw your own tests into the same directory.


Quirks
------
In a perfect world, software works flawlessly and doesn't have any special cases requiring workarounds on the user's part. In a less-perfect world, all quirks are due to the software itself and can be fixed. In our world, we not only have to deal with the quirks of the software we're using, but other software it interacts with. RapydScript is no exception, in addition to its own quirks there are a few quirks brought upon us by the browser as well as a few bugs in jQuery that affect us. Here is a list of things you need to be aware of:

- RapydScript automatically appends 'new' keyword when using classes generated
  by it, native JavaScript objects like `Image` and `RegExp` and classes from
  other libraries marked as external. This means that you should be using
  `@external` decorator from classes you're bringing in from the outside that
  the compiler isn't aware of, or use `new` when declaring them manually.

- Automatic new insertion depends on the compiler being able to detect that a
  symbol resolves to a class. Because of the dynamic nature of JavaScript this
  is not possible to do with 100% accuracy (this is usually only a problem
  when you rely on duck-typing to conceal a class constructor in a variable).
  In those cases you should append the `new` keyword yourself. Similarly, the
  compiler will try to convert SomeClass.method() into SomeClass.prototype.method()
  for you, but will fail in some cases. Declaring this variable as a class
  with `@external` decorator should fix this issue.

- Truthiness in JavaScript is very different from Python. Empty lists and dicts
  are `False` in Python but `True` in JavaScript. The compiler could work
  around that, but not without a significant performance cost, so it is best to
  just get used to checking the length instead of the object directly.

- Operators in JavaScript are very different from Python. `1 + '1'` would be
  an error in Python, but results in `'11'` in JavaScript. Keep that in mind
  as you write code. When possible, RapydScript tries to detect type and warn
  you ahead of time of nonsensical operations such as `[] + {}`, but sometimes
  it can't do its magic.

- Method binding in RS is not automatic. So ``someobj.somemethod()`` will do the
  right thing, but ``x = someobj.somethod; x()`` will not. RS could work around
  it, but at significant performance cost. See the section above on method
  binding for details. To work around it, you could assign it instead as
  `x = bind(someobj.somemethod, someobj)`. Alternatively, you can use
  `--auto-bind` flag, and enjoy automatic method binding at the expense of
  performance.

- jQuery erroneously assumes that no other library will be modifying
  JavaScript's 'Object', and fails to do `object.hasOwnProperty()` check in
  multiple places where it should. To avoid breaking it, I had to implement
  stdlib such that dictionary methods are methods of a different object.
  Regular Python allows you to call hash.keys() as well as dict.keys(hash).
  RapydScript only supports the second notation - which is admittedly a bit
  more awkward.

- Negative indexes are only supported for constant numbers. If the compiler
  detects that you're using a negative index (`array[-1]`), it will automatically
  convert it to `array[array.length-n]`. Otherwise, if the index is masked in
  a variable, you will have to convert it yourself.

- Operator overloading is not supported, yet
