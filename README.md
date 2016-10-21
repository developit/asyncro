# `asyncro` [![NPM](https://img.shields.io/npm/v/asyncro.svg?style=flat)](https://www.npmjs.org/package/asyncro) [![travis-ci](https://travis-ci.org/developit/asyncro.svg?branch=master)](https://travis-ci.org/developit/asyncro)

Converts JSX to Objects (JSON) <sub>using blood magic</sub>.

```sh
npm install --save asyncro
```

---

### Example

```js
import { map } from 'asyncro';

async function example() {
	await map(
		['foo', 'bar'],
		async name => fetch('./'+name)
	)
}
```
