/*
* sinatra.js
* https://github.com/websperts/sinatra.js
*
* Copyright (c) 2014 websperts <hello@websperts.com>
* Licensed under the MIT license.
* https://github.com/websperts/sinatra.js/blob/master/LICENSE
*/

;(function(window, undefined) {

    'use strict';

    var sinatra = window.sinatra = {

        routes: {},
        errorCallback: null,
        placeholders: /(:\w+)/gi,

        on: function(request, callback) {
            if (typeof callback === 'function') {
                if (sinatra.placeholders.test(request)) {
                    request = request.replace(sinatra.placeholders, function() {
                        return '([^\/]+)';
                    });
                }
                sinatra.routes[request] = callback;
            }
            return this;
        },

        off: function(request) {
            if (request in sinatra.routes) {
                delete sinatra.routes[request];
            }
            return this;
        },

        error: function(callback) {
            sinatra.errorCallback = callback;
            return this;
        },

        change: function() {
            var matches = (window.location.hash || '#').match('^#\!?(.*)$');
            if (matches) {
                var request = matches[1] || '';
                if (request.length === 0) {
                    request = '/';
                }
                console.log(request);
                for (var route in sinatra.routes) {
                    var matches = request.match('^' + route + '$');
                    if (matches) {
                        var args = [request];
                        matches.shift();
                        matches.forEach(function(match) {
                            args.push(match);
                        });
                        var handle = sinatra.routes[route];
                        handle.apply(this, args);
                        return;
                    }
                }
                if (typeof sinatra.errorCallback === 'function') {
                    sinatra.errorCallback.apply(this, [request]);
                }
            }
        },

        reset: function() {
            sinatra.routes = {};
        },

        run: function() {
            if (!('onhashchange' in window)) {
                window.setInterval(function() {
                    sinatra.change();
                }, 100);
            } else if (window.addEventListener) {
                window.addEventListener('hashchange', sinatra.change, false);
            } else if (window.attachEvent) {
                window.attachEvent('onhashchange', sinatra.change);
            }
            sinatra.change();
        }

    };

})(window);
