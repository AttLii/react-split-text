import React from "react"
import Enzyme, { shallow, mount } from "enzyme"
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import SplitText from "./index"

Enzyme.configure({ adapter: new Adapter() })

describe("SplitText-component", () => {
	it("renders with no props", () => {
		const component = mount(<SplitText />)
		expect(component).toMatchSnapshot()
	})

	it("renders correctly with foo children-prop", () => {
		const component = shallow(<SplitText>foo</SplitText>)
		expect(component).toMatchSnapshot()
	})

	it("makes wrapper by default a div", () => {
		const wrapper = shallow(<SplitText />)
		expect(wrapper.type()).toEqual("div")
	})

	it("changes wrapper's type to one passed in type-prop", () => {
		const type = "p"
		const wrapper = shallow(<SplitText type={type} />)

		expect(wrapper.type()).toEqual(type)
	})

	it("makes char-elements by default spans", () => {
		const sentence = "h"
		const component = mount(<SplitText>{sentence}</SplitText>)

		const char = component.find(".char")
		expect(char.type()).toEqual("span")
	})

	it("makes char-elements the type passed in by charType-prop", () => {
		const sentence = "h"
		const component = mount(<SplitText charType="p">{sentence}</SplitText>)

		const char = component.find(".char")
		expect(char.type()).toEqual("p")
	})

	it("makes word-elements by default spans", () => {
		const sentence = "s"
		const component = mount(<SplitText>{sentence}</SplitText>)

		const word = component.find(".word")
		expect(word.type()).toEqual("span")
	})

	it("makes word-elements the type passed in by wordType-prop", () => {
		const sentence = "hai"
		const component = mount(<SplitText wordType="code">{sentence}</SplitText>)

		const char = component.find(".word")
		expect(char.type()).toEqual("code")
	})

	it("makes space-elements by default spans", () => {
		const sentence = "s s"
		const component = mount(<SplitText>{sentence}</SplitText>)

		const space = component.find(".space")
		expect(space.type()).toEqual("span")
	})

	it("makes space-elements the type passed in by spaceType-prop", () => {
		const sentence = "s s"
		const component = mount(<SplitText spaceType="h6">{sentence}</SplitText>)

		const space = component.find(".space")
		expect(space.type()).toEqual("h6")
	})

	it("creates children element for each word provided in children-prop", () => {
		const sentence = "Foo bar baz"
		const wordAmount = 3

		const component = mount(<SplitText>{sentence}</SplitText>)
		const wordElements = component.find(".word")

		expect(wordElements.length).toBe(wordAmount)
	})

	it("creates children element for each character provided in children-prop", () => {
		const sentence = "Foo bar baz"
		const charAmount = 9

		const component = mount(<SplitText>{sentence}</SplitText>)
		const charElements = component.find(".char")
		expect(charElements.length).toBe(charAmount)
	})

	it("creates space element between word elements", () => {
		const sentence = "Foo bar baz"
		const spaceAmount = 2

		const component = mount(<SplitText>{sentence}</SplitText>)
		const spaceElements = component.find(".space")

		expect(spaceElements.length).toBe(spaceAmount)
	})

	it("creates space element at the end of each word element, except last one", () => {
		const sentence = "Foo bar baz"

		const component = mount(<SplitText>{sentence}</SplitText>)
		const spaceElementParents = component.find(".space").parent()

		const firstParent = spaceElementParents.at(0)
		expect(firstParent.prop("data-word")).toBe("Foo")
		const secondParent = spaceElementParents.at(1)
		expect(secondParent.prop("data-word")).toBe("bar")
		const shouldntExist = spaceElementParents.at(2)
		expect(shouldntExist.exists()).toBeFalsy()
	})

	it("passes className-prop to wrapper element", () => {
		const className = "foo"
		const wrapper = shallow(<SplitText className={className} />)

		expect(wrapper.hasClass(className)).toBe(true)
	})

	it("passes wordClassName-prop to word-elements", () => {
		const sentence = "Foo bar baz"
		const wordsWithProvidedClassName = 3
		const wordClassName = "foo-word"

		const component = mount(
			<SplitText wordClassName={wordClassName}>{sentence}</SplitText>
		)

		const wordElements = component.find(`.word.${wordClassName}`)

		expect(wordElements.length).toBe(wordsWithProvidedClassName)
	})

	it("passes charClassName-prop to char-elements", () => {
		const sentence = "Foo bar baz baa"
		const charsWithProvidedClassName = 12
		const charClassName = "foo-char"

		const component = mount(
			<SplitText charClassName={charClassName}>{sentence}</SplitText>
		)

		const charElements = component.find(`.char.${charClassName}`)

		expect(charElements.length).toBe(charsWithProvidedClassName)
	})

	it("passes spaceClassName-prop to space-elements", () => {
		const sentence = "Foo bar baz baa"
		const spacesWithProvidedClassName = 3
		const spaceClassName = "foo-space"

		const component = mount(
			<SplitText spaceClassName={spaceClassName}>{sentence}</SplitText>
		)

		const spaceElements = component.find(`.space.${spaceClassName}`)

		expect(spaceElements.length).toBe(spacesWithProvidedClassName)
	})

	/**
	 * This test has a flaw that cannot be fixed right now.
	 * Selecting text content that is &npbs; returns what we have in defaultSpaceHTML variable.
	 * @https://github.com/enzymejs/enzyme/issues/1349
	 **/
	it("uses default spaceHTML-value if not specified in props", () => {
		const sentence = "Foo bar"
		const defaultSpaceHTML = "\u00a0"

		const component = mount(<SplitText>{sentence}</SplitText>)
		const spaceElement = component.find(".space")

		expect(spaceElement.text()).toEqual(defaultSpaceHTML)
	})

	it("uses passed in spaceHTML-prop as a space-character", () => {
		const sentence = "Foo bar banana"
		const spaceHTML = "FOO_BANANAS"

		const component = mount(
			<SplitText spaceHTML={spaceHTML}>{sentence}</SplitText>
		)

		const spaceElements = component.find(".space")
		expect(spaceElements.at(0).text()).toEqual("FOO_BANANAS")
		expect(spaceElements.at(1).text()).toEqual("FOO_BANANAS")
	})
})
