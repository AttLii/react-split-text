# arha-split-text

A react component to split passed in `children`-prop into word elements and each word into character elements. This lets developers do f.e. word / character based animations for a text.

## Example usage

``` jsx
import React from "react";
import { SplitText } from "arha-split-text";

function App() {
  return <SplitText>foo bar</SplitText>;
}

export default App;

// output:
//  <div>
//    <div>
//      <div>f</div>
//      <div>o</div>
//      <div>o</div>
//    </div>
//    <div></div>
//    <div>
//      <div>b</div>
//      <div>a</div>
//      <div>r</div>
//    </div>
//  </div>
//
```

SplitText also provides additional props, so developers can have more control over the output

```jsx
import React from "react";
import { SplitText } from "./arha-split-text"

/**
 * Example word component
 */
const Word = ({ children, i }) => (
  <span className={`word word-${i}`}>
    {children}
  </span>
)

/**
 * Example Space component
 */
const Space = () => "\u00A0"

/**
 * Example Char component
 */
const Char = ({ children, i }) => (
  <span className={`char char-${i}`}>
    {children}
  </span>
)

function App() {
  return (
    <SplitText
      ContainerElement="h1" // I can be a function component as well 
      WordElement={Word}
      CharElement={Char}
      SpaceElement={Space}
      // rest are set to container element
      className="my-cool-split-text"
    >
      awesome component   
    </SplitText>
  )
}

export default App;

//  <h1 class="my-cool-split-text">
//    <span class="word word-0">
//      <span class="char char-0">a</span>
//      <span class="char char-1">w</span>
//      <span class="char char-2">e</span>
//      <span class="char char-3">s</span>
//      <span class="char char-4">o</span>
//      <span class="char char-5">m</span>
//      <span class="char char-6">e</span>
//    </span>
//    &nbsp;
//    <span class="word word-1">
//      <span class="char char-0">c</span>
//      <span class="char char-1">o</span>
//      <span class="char char-2">m</span>
//      <span class="char char-3">p</span>
//      <span class="char char-4">o</span>
//      <span class="char char-5">n</span>
//      <span class="char char-6">e</span>
//      <span class="char char-7">n</span>
//      <span class="char char-8">t</span>
//    </span>
//  </h1>
```

## Props
| Prop                | Description                                                     | Type                          |
| ---                 | ---                                                             | ---                           |
| `children`          | string needed to be split                                       | string                        |
| `ContainerElement`  | overrides default container element (by default `div`)          | string or function component  |
| `WordElement`       | overrides default word element (by default `div`)               | string or function component  |
| `CharElement`       | overrides default char element (by default `div`)               | string or function component  |
| `SpaceElement`      | overrides default space element (by default `div` with `{" "}`) | string or function component  |
| `...rest`           | rest of the props are set to container element                  | go wild                       |

