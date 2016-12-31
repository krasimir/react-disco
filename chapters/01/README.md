# Chapter 1 - transpilation of JSX

Before even start thinking about React in the browser (or on the server) we have to deal with the syntax. React uses [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) which I think brings lots of value to the library. When Facebook announced it we all thought that this is wrong but today lots of people adopted the idea. It is a nice way for [composing](https://github.com/krasimir/react-in-patterns/tree/master/patterns/composition) UI. So, the very first thing that we have to deal with is understanding the code and transpile it to valid ES5 JavaScript so we can ship it to the browser.

## Babel

Today (December, 2016) the best transpiler in the JavaScript ecosystem is [Babel](https://babeljs.io). It supports tons of stuff including ES6 classes and JSX syntax. [Once I tried](https://github.com/krasimir/cssx) dealing with parsing and compiling code and I know that it is not an easy task. So I decided to use Babel instead of reinventing the wheel.

In this chapter we are dealing only for understanding the code. We are not bundling it. Babel is actually only transpiler and the output of it is not production ready code (in most of the cases). In the end we want a single file where the `import`s (`require`s) are resolved properly. Babel is not producing such file. That is a subject of the next chapter. Here we'll write a simple file containing JSX tags and we will expect to see it transformed to valid ES5 JavaScript.

### Basic files structure

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

Under `app/src` we have our React code that we want transpiled and saved into `app/public`. The `lib` folder will stay empty for now. `.babelrc` will contain our Babel configuration. Here's how `package.json` looks like:

```
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

We are registering a single [npm script](https://docs.npmjs.com/misc/scripts) for running babel. The dependencies that we need are:

* [babel-cli](https://babeljs.io/docs/usage/cli/) - the actual transpiler
* [babel-plugin-transform-react-jsx](https://babeljs.io/docs/plugins/transform-react-jsx/) - a plugin for understanding JSX syntax
* [babel-preset-es2015](https://babeljs.io/docs/plugins/preset-es2015/) - a collection of plugins needed for converting to ES5 compatible code
