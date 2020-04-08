const { createElement, Fragment, forwardRef, useEffect } = require("react");
const PropTypes = require("prop-types")

const SplitText = forwardRef((props, ref) => {
  const {
    className,
    wordClassName,
    charClassName,
    spaceClassName,
    children,
    type,
    wordRefs,
    charRefs,
    ...rest
  } = props;

  const wrapperCN = `c-split-text ${className}`;

  const wordDefaultCN = "word";
  const wordCN = `${wordDefaultCN} ${wordClassName}`;
  const wordType = "span";

  const charDefaultCN = "char";
  const charCN = `${charDefaultCN} ${charClassName}`;
  const charType = "span";

  const spaceCN = `space ${spaceClassName}`;
  const spaceType = "span";
  const spaceHTML = "&nbsp;";

  // space is rendered using this element
  const spaceElement = createElement(
    spaceType,
    {
      "aria-hidden": true,
      className: spaceCN,
      dangerouslySetInnerHTML: { __html: spaceHTML }
    },
    null
  );

  // sending refs to parent component
  useEffect(() => {
    if (!ref || !ref.current) return;

    const wrapper = ref.current;
    const words = Array.from(wrapper.querySelectorAll(`.${wordDefaultCN}`));
    if (words.length === 0) return;
    wordRefs.current = words;

    const chars = Array.from(wrapper.querySelectorAll(`.${charDefaultCN}`));
    if (chars.length === 0) return;
    charRefs.current = chars;

    // clean parent component's refs on dismount
    return () => {
      wordRefs.current = [];
      charRefs.current = [];
    };
  }, [ref, wordRefs, charRefs, wordDefaultCN, charDefaultCN]);

  // wrapper element
  return createElement(
    type,
    { "aria-label": children, className: wrapperCN, ref, ...rest },
    children.split(" ").map((word, i) => {
      const space = !i ? null : spaceElement;
      return word === ""
        ? null
        : createElement(
            Fragment,
            { key: i },
            createElement(
              Fragment,
              null,
              space,
              createElement(
                wordType,
                {
                  "aria-hidden": true,
                  className: wordCN,
                  style: { display: "inline-block" }
                },
                word.split("").map((char, i) =>
                  createElement(
                    charType,
                    {
                      className: charCN,
                      "aria-hidden": true,
                      key: i
                    },
                    char
                  )
                )
              )
            )
          );
    })
  );
});

SplitText.defaultProps = {
  children: "",
  className: "",
  wordClassName: "",
  charClassName: "",
  spaceClassName: "",
  type: "div",
  wordRefs: {
    current: []
  },
  charRefs: {
    current: []
  }
};

SplitText.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  wordClassName: PropTypes.string,
  charClassName: PropTypes.string,
  spaceClassName: PropTypes.string,
  type: PropTypes.string,
  wordRefs: PropTypes.shape({
    current: PropTypes.array
  }),
  charRefs: PropTypes.shape({
    current: PropTypes.array
  })
}

module.exports = SplitText;
