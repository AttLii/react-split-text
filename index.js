const { createElement, Fragment, forwardRef, useEffect } = require("react")
const PropTypes = require("prop-types")

const SplitText = forwardRef((props, ref) => {
	const {
		children,

		className,
		type,

		wordClassName,
		wordType,

		charClassName,
		charType,

		spaceClassName,
		spaceType,
		spaceHTML,

		wordRefs,
		charRefs,

		...rest
	} = props

	const wrapperCN = `c-split-text ${className}`
	const wrapperProps = {
		"aria-label": children,
		className: wrapperCN,
		ref,
		style: {
			display: "block"
		},
		...rest
	}

	const wordDefaultCN = "word"
	const wordProps = {
		"aria-hidden": true,
		className: `${wordDefaultCN} ${wordClassName}`,
		style: {
			display: "inline-flex"
		}
	}

	const charDefaultCN = "char"
	const charProps = {
		className: `${charDefaultCN} ${charClassName}`,
		"aria-hidden": true
	}

	const spaceCN = `space ${spaceClassName}`
	// space is rendered using this element
	const spaceElement = createElement(
		spaceType,
		{
			"aria-hidden": true,
			className: spaceCN,
			dangerouslySetInnerHTML: { __html: spaceHTML },
			style: { display: "inline-block" }
		},
		null
	)

	// sending refs to parent component
	useEffect(() => {
		if (!ref || !ref.current) return

		const wrapper = ref.current
		const words = Array.from(wrapper.querySelectorAll(`.${wordDefaultCN}`))
		if (words.length === 0) return
		wordRefs.current = words

		const chars = Array.from(wrapper.querySelectorAll(`.${charDefaultCN}`))
		if (chars.length === 0) return
		charRefs.current = chars

		// clean parent component's refs on dismount
		return () => {
			wordRefs.current = []
			charRefs.current = []
		}
	}, [ref, wordRefs, charRefs, wordDefaultCN, charDefaultCN])

	// wrapper element
	return createElement(
		type,
		wrapperProps,
		children.split(" ").map((word, i, words) => {
			if (word === "") return ""

			const space = i === words.length - 1 ? null : spaceElement

			return createElement(
				Fragment,
				{
					key: i
				},
				createElement(
					wordType,
					{
						...wordProps,
						"data-word": word
					},
					word.split("").map((char, i) =>
						createElement(
							charType,
							{
								...charProps,
								key: i
							},
							char
						)
					),
					space
				)
			)
		})
	)
})

SplitText.defaultProps = {
	children: "",

	className: "",
	type: "div",

	wordClassName: "",
	wordType: "span",

	charClassName: "",
	charType: "span",

	spaceClassName: "",
	spaceType: "span",
	spaceHTML: "&nbsp;",

	wordRefs: {
		current: []
	},
	charRefs: {
		current: []
	}
}

SplitText.propTypes = {
	children: PropTypes.string,

	className: PropTypes.string,
	type: PropTypes.string,

	wordClassName: PropTypes.string,
	wordType: PropTypes.string,

	charClassName: PropTypes.string,
	charType: PropTypes.string,

	spaceClassName: PropTypes.string,
	spaceType: PropTypes.string,
	spaceHTML: PropTypes.string,

	wordRefs: PropTypes.shape({
		current: PropTypes.array
	}),
	charRefs: PropTypes.shape({
		current: PropTypes.array
	})
}

module.exports = SplitText
