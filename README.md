# `asyncro` [![NPM](https://img.shields.io/npm/v/asyncro.svg?style=flat)](https://www.npmjs.org/package/asyncro) [![travis-ci](https://travis-ci.org/developit/asyncro.svg?branch=master)](https://travis-ci.org/developit/asyncro)

It's the `map()`, `reduce()` & `filter()` you know, but with support for async callbacks!


<img src="http://i.imgur.com/yiiq6Gx.png" width="275" alt="preview">


### Installation

```sh
npm install --save asyncro
```


### Example

```js
import { map } from 'asyncro';

async function example() {
	return await map(
		['foo', 'bar'],
		async name => fetch('./'+name)
	)
}
```
