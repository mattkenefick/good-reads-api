# good-reads-api
Good Reads API demo


### Timeline

This test was started late-evening of **August 3rd** and completed by morning of **August 4th**.

Please ignore the lack of valuable commit messages; this repo was primarily used to save my own state before transferring the code elsewhere as per the instructions.


### Server

The `server` folder contains the code being used on Repl.it. It uses `express`, `xml2js`, and `cors` libraries. The demonstration is only designed to showcase consumption of GoodReads API in XML and converting it to JSON. It has a few other extremely simple systems, like caching request results for a limited period of time.


### Vue Client

The `vue-client` folder contains code being used on `https://good-reads.polymermallard.com` through the `dist` directory. You'll want to look at the `src` folder. Limited amount of time was given to creating a quick logo, a basic bookstore website structure, the start of a global+sfc styling structure, an extremely basic implementation of models / interfaces.


### Vanilla Client

This was the first example using completely raw tech that was specifically designed to be simple enough for CodePen. You can see it working here: https://codepen.io/mattkenefick/pen/bGWmpWZ  I ended up abandoning the Vanilla Client in favor of a more structured approach using Vue + TypeScript. The vanilla clinet was stripped down to the essentials.

This example uses `<template>` just for source, but in a proper vanilla example, I'd probably use some implementation of ShadowDOM as I've written about here: https://medium.com/@mattkenefick/snippets-in-javascript-converting-pascalcase-to-kebab-case-426c80672abc

Remember that in the code here, you may find `localhost:3030` for the server, which you could swap out with the REPL.IT URL.
