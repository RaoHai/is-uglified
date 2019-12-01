# is-uglified
Detect if a javascript file is uglified

![CI](https://github.com/RaoHai/is-uglified/workflows/Node%20CI/badge.svg)

## How?

We use `Mean Identify Length` measure. For one handwriting javascript file, the average length of identifiers `MUST` bigger than it of an uglified one.

E.g.,

* The `mean identify length` of [react.development.js](https://unpkg.com/react@16.7.0/umd/react.development.js) is `10.8` 
* The `mean identify length` of the minimized version [react.production.js](https://unpkg.com/react@16.7.0/umd/react.production.min.js) is `1.7`, which is much more smaller than before.

We set the threshold value default to `3`, detecting whether a javascript file is uglified.

## Installing

```
npm install is-uglified
```


## Usage

```javascript
import isUglified from 'is-uglified';

isUglified('local_file_to_detect.js') // get result;
```
