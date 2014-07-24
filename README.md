# sinatra.js

> Minimal Sinatra like router for your Web browser, just perfect for single page applications

**sinatra.js is for web browsers only! If you’re looking for a minimal Sinatra like router for node.js, check out [fapprik](http://fapprik.com/)’s [Sinodetra](https://www.npmjs.org/package/sinodetra).**

## Usage

At first, embed `sinatra.min.js` within your Web application. `sinatra.min.js` is minified using [Google’s Closure Compiler](https://developers.google.com/closure/compiler/) and weighs < 1 kB bytes if gzipped.

	<script src="sinatra.min.js"></script>

That’s it, you’re able to add routes now by using the injected `sinatra` global.

	sinatra.on('/', function(request) {
		console.log('Hello world!');
	});

	sinatra.on('/user/:user', function(request, user) {
		console.log('Hello, ' + user);
	});

	sinatra.on('/show/([0-9]+)', function(request, id) {
		console.log('Hello, ' + id);
	});

As you can see, you can also use regular expressions within your route definitions. For a better readability, sinatra.js provides the opportunity to use placeholders (see `:user` above). However, these placeholders are nothing but a regular expression in the end.

You can disable/remove routes using `sinatra.off`.

	sinatra.off('/show/([0-9]+)');

Of course, there’s also a way to define a callback if no routes match the requested path. This is normally used to display some fancy 404 error.

	sinatra.error(function(request) {
		console.log('404 Not Found');
	});

Finally, you can initialize the routing after you added all your routes using `sinatra.run()`.

## Example

	sinatra.on('/', function(request) {
		console.log('Hello world!');
	}).on('/say/:greeting/to/:person', function(request, greeting, person) {
		console.log(greeting + ', ' + person + '!');
	}).on('/([0-9]+)/plus/([0-9]+)', function(request, one, two) {
		console.log(parseInt(one, 10) + parseInt(two, 10));
	}).error(function(request) {
		console.log('404');
	}).run();

## Changelog

* 0.0.1
	* Initial version

## TODO

- Documentation
- Tests

## License

Copyright (c) 2014 [websperts](http://websperts.com/)  
Licensed under the MIT license.

See LICENSE for more info.