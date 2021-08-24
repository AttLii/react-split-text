import PropTypes from "prop-types"
import React, { Fragment } from "react"

export const SplitText = ({ children, ContainerElement, WordElement, CharElement, SpaceElement, ...rest }) => {
  if (!children) return null

  const words = children.split(" ")

  return (
    <ContainerElement {...rest}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <WordElement i={i}>
            {word.split("").map((char, j) => (
              <CharElement key={j} i={j}>
                {char}
              </CharElement>
            ))}
          </WordElement>
          {i !== words.length - 1 && (<SpaceElement />)}
        </Fragment>
      ))}
    </ContainerElement>
  )
} 

SplitText.defaultProps = {
  className: undefined,
  children: null,
  ContainerElement: "div",
  WordElement: "div",
  CharElement: "div",
  SpaceElement: () => <div>{" "}</div>
}

SplitText.propTypes = {
  children: PropTypes.string,
  ContainerElement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  WordElement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  CharElement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  SpaceElement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
}