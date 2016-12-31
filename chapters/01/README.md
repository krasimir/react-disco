# Chapter 1 - transpilation of JSX

Before even start thinking about React in the browser (or on the server) we have to deal with the syntax. React uses [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) which I think brings lots of value to the library. When Facebook announced it we all thought that this is wrong but today lots of people adopted the idea. It is a nice way for [composing](https://github.com/krasimir/react-in-patterns/tree/master/patterns/composition) UI. So, the very first thing that we have to deal with is understanding the code and transpile it to valid ES5 JavaScript so we can ship it to the browser.

## Babel

Today (December, 2016) the best transpiler in the JavaScript ecosystem is [Babel](https://babeljs.io). It supports tons of stuff including ES6 classes and JSX syntax. [Once I tried](https://github.com/krasimir/cssx) dealing with parsing and compiling code and I know that it is not an easy task. So I decided to use Babel instead of reinventing the wheel.

In this chapter we are dealing only for understanding the code. We are not bundling it. Babel is actually only transpiler and the output of it is not production ready code (in most of the cases). In the end we want a single file where the `import`s (`require`s) are resolved properly. Babel is not producing such file. That is a subject of the next chapter. Here we'll write a simple file containing JSX tags and we will expect to see it transformed to valid ES5 JavaScript.

## Basic setup

Let's start with the following directories and files:

```
app
 └ public
   └ app.js
 └ src
   └ app.jsx
lib
.babelrc
package.json
```

Under `app/src` we will have our React code that we want transpiled and saved into `app/public`. The `lib` will keep the source code of our React implementation but will stay empty for now. `.babelrc` will contain our Babel's configuration. Here's how `package.json` looks like:

```js
{
  ...
  "scripts": {
    "transpile": "babel ./app/src --out-dir ./app/public"
  },
  "devDependencies": {
    "babel-cli": "6.18.0",
    "babel-plugin-transform-react-jsx": "6.8.0",
    "babel-preset-es2015": "6.18.0"
  }
}
```

We are registering a single [npm script](https://docs.npmjs.com/misc/scripts) for running Babel. The dependencies that we need are:

* [babel-cli](https://babeljs.io/docs/usage/cli/) - the actual transpiler
* [babel-plugin-transform-react-jsx](https://babeljs.io/docs/plugins/transform-react-jsx/) - a plugin for understanding JSX syntax
* [babel-preset-es2015](https://babeljs.io/docs/plugins/preset-es2015/) - a collection of plugins needed for converting to ES5 compatible code

The last bit of the setup is our `.babelrc` file:

```
// .babelrc
{
  "presets": ["es2015"],
  "plugins": ["transform-react-jsx"]
}

```

## Wrapping the transpilation

We want to stick with React's interface so our starting point will be a class that has a `render` method and outputs something on the screen:

```js
// src/app.jsx
class App {
  render() {
    const greetings = 'Hello';

    return (
      <h1>{ greetings }
        <span style={ { fontWeight: 'bold' } }>world</span>
      </h1>
    );
  }
}
```

Notice that we have several JSX expressions and tag nesting. That's of course not all the JSX features but it will be nice to start with something a little bit more advanced so we are sure that the transpiled code is what we want.

If we try running `npm run transpile` we will get the following `app/public/app.js` file:

```js
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var greetings = 'Hello';

      return React.createElement(
        'h1',
        null,
        greetings,
        React.createElement(
          'span',
          { style: { fontWeight: 'bold' } },
          'world'
        )
      );
    }
  }]);

  return App;
}();
```

We may ignore the `_createClass` function because that's the polyfill of the `class` definition. The interesting bit is the declaration of our `App` component:

```js
_createClass(App, [{
  key: 'render',
  value: function render() {
    var greetings = 'Hello';

    return React.createElement(
      'h1',
      null,
      greetings,
      React.createElement(
        'span',
        { style: { fontWeight: 'bold' } },
        'world'
      )
    );
  }
}]);
```

It looks all fine but there is this `React.createElement` call. We want to replace that with our own library so we get the `h1` and `span` sent there. To achieve that we have to modify our `.babelrc` file:

```
{
  "presets": ["es2015"],
  "plugins": [
    ["transform-react-jsx", {
      "pragma": "D"
    }]
  ]
}
```

The value of `pragma` property replaces the `React.createElement` invocations. Another run of `npm run transpile` will result in:

```js
_createClass(App, [{
  key: 'render',
  value: function render() {
    var greetings = 'Hello';

    return D(
      'h1',
      null,
      greetings,
      D(
        'span',
        { style: { fontWeight: 'bold' } },
        'world'
      )
    );
  }
}]);
```

That's better. Now we can ship this code to the browser and if there is a global `D` function available we will be able to process the tag definitions.

In the next chapter we will start shaping our library. Check it out [here](../02/).
