# arha-split-text

A react component to split passed in `children`-prop into word-spans and each word-span into character-spans. This lets developers do f.e. word / character based animations for text-elements.

## Example usage

For following React app:

```
import React from "react";
import SplitText from "arha-split-text";

function App() {
  return <SplitText>Edit src/App.js</SplitText>;
}

export default App;
```

an output would be:

```
<div aria-label="Edit src/App.js" class="c-split-text ">
  <span aria-hidden="true" class="word " style="display: inline-block;">
    <span class="char " aria-hidden="true">E</span>
    <span class="char " aria-hidden="true">d</span>
    <span class="char " aria-hidden="true">i</span>
    <span class="char " aria-hidden="true">t</span>
  </span>
  <span aria-hidden="true" class="space ">&nbsp;</span>
  <span aria-hidden="true" class="word " style="display: inline-block;">
    <span class="char " aria-hidden="true">s</span>
    <span class="char " aria-hidden="true">r</span>
    <span class="char " aria-hidden="true">c</span>
    <span class="char " aria-hidden="true">/</span>
    <span class="char " aria-hidden="true">A</span>
    <span class="char " aria-hidden="true">p</span>
    <span class="char " aria-hidden="true">p</span>
    <span class="char " aria-hidden="true">.</span>
    <span class="char " aria-hidden="true">j</span>
    <span class="char " aria-hidden="true">s</span>
  </span>
</div>
```

## Props

| Prop key       | Expected Type | Description                                                                             |
| -------------- | ------------- | --------------------------------------------------------------------------------------- |
| children       | string        | text wanted to be split                                                                 |
| className      | string        | className passed to wrapper element                                                     |
| type           | string        | wrapper element's type, f.e. `"h1"` or `"p"`                                            |
| wordClassName  | string        | className set to each word element                                                      |
| charClassName  | string        | className set to each character element                                                 |
| spaceClassName | string        | className set to each space element                                                     |
| spaceHTML      | string        | a character that is used as a text content for each space element. (default `&nbsp;`)   |
| wordRefs       | object        | `useRef()`'s returned object. Note: use empty array when initializing the default value |
| charRefs       | object        | `useRef()`'s returned object. Note: use empty array when initializing the default value |
| ...rest        |               | rest of the props are spread to wrapper element                                         |
