# Chapter 1 - transpilation of JSX

Before even start thinking about React in the browser (or on the server) we have to deal with the syntax. React uses [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) which I think brings lots of value to the library. When Facebook announced it we all thought that this is wrong but today lots of people adopted the idea. It is a nice way for [composing](https://github.com/krasimir/react-in-patterns/tree/master/patterns/composition) UI. So, the very first thing that we have to deal with is understanding the code and transpile it to valid ES5 JavaScript so we can ship it to the browser.

## Babel

Today (December, 2016) the best transpiler in the JavaScript ecosystem is [Babel](https://babeljs.io). It supports tons of stuff including ES6 classes and JSX syntax. [Once I tried](https://github.com/krasimir/cssx) dealing with parsing and compiling code and I know that it is not an easy task. So let's use Babel.

In this chapter we are dealing only about understanding the code. We are not bundling it. Babel is actually only transpiler and the output of it is not production ready code (in most of the cases). We want a single file where the `import`s (`require`s) are resolved properly. And that's a subject of the next chapter.
