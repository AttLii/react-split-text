import 'jsdom-global/register'
import React from "react"
import Enzyme, { shallow, mount, render } from "enzyme"
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { SplitText } from "./arha-split-text"

Enzyme.configure({ adapter: new Adapter() })

describe("SplitText-component", () => {
	it("Doesn't crash with no props", () => {
		const component = render(<SplitText />)
		expect(component).toMatchSnapshot()
	})

	it("renders with children prop", () => {
		const component = render(<SplitText>foo</SplitText>)
		expect(component).toMatchSnapshot()
	})

	it("changes container element to one passed in ContainerElement-prop (string)", () => {
		const ContainerElement = "span"
		const container = mount(<SplitText ContainerElement={ContainerElement}>foo</SplitText>)
		expect(container.find("span").html()).toBeTruthy()
	})

	it("changes container element to one passed in ContainerElement-prop (function component)", () => {
		const ContainerElement = ({ children }) => <h1 className="my-container">{children}</h1>
		const container = mount(<SplitText ContainerElement={ContainerElement}>foo</SplitText>)
		expect(container.find(".my-container").get(0)).toBeTruthy()
	})

	it("renders space element between words", () => {
		const component = mount(<SplitText>foo fii</SplitText>)
		// from 0 - 4 we got component container, word (foo) container and container for each letter 
		expect(component.find("div").get(5).props.children).toEqual(" ")
	})

	it("replaces space element with provided SpaceElement-prop (string)", () => {
		const component = mount(<SplitText SpaceElement="span">foo fii</SplitText>)
		expect(component.find("span").html()).toBeTruthy()
	})

	it("replaces space element with provided SpaceElement-prop (function component)", () => {
		const SpaceElement = () => <span>&nbps; inside span better</span>
		const component = mount(<SplitText SpaceElement={SpaceElement}>foo fii</SplitText>)
		expect(component.find("span").html()).toBeTruthy()
	})

	it("replaces Word wrapper element with provided WordElement-prop (string)", () => {
		const component = shallow(<SplitText WordElement="span">foo bar</SplitText>)
		expect(component.find("span")).toHaveLength(2)
	})

	it("replaces Word wrapper element with provided WordElement-prop (function component)", () => {
		const WordElement = ({ children }) => <span className="my-component__word">{children}</span>
		const component = shallow(<SplitText WordElement={WordElement}>foo bar</SplitText>)
		expect(component.find(WordElement)).toHaveLength(2)
	})

	it("WordElement-prop has access to current word index if its a function component", () => {
		const WordElement = ({ children, i }) => (
			<span>
				<p>
					I'm current word's index {i}
				</p>
				{children}
			</span>
		)
		const component = render(<SplitText WordElement={WordElement}>foo bar baz</SplitText>)
		expect(component).toMatchSnapshot()
	})

	it("replaces Character's wrapper element with provided CharElement-prop (string)", () => {
		const component = shallow(<SplitText CharElement="span">foo bar</SplitText>)
		expect(component.find("span")).toHaveLength(6)
	})

	it("replaces Character wrapper element with provided CharElement-prop (function component)", () => {
		const CharElement = ({ children }) => <span className="my-component__char">{children}</span>
		const component = shallow(<SplitText CharElement={CharElement}>foo</SplitText>)
		expect(component.find(CharElement)).toHaveLength(3)
	})

	it("CharElement-prop has access to current character's index inside the word if its a function component", () => {
		const CharElement = ({ children, i }) => (
			<span>
				<span>
					current index of the character inside the word: {i}
				</span>
				{children}
			</span>
		)
		const component = render(<SplitText CharElement={CharElement}>foo</SplitText>)
		expect(component).toMatchSnapshot()
	})

	it("sets rest of the props to wrapper element", () => {
		const rest = {
			className: "foo",
			id: "1",
			onclick: () => {},
			"aria-label": "first second third"
		}
		const component = shallow(
			<SplitText
				ContainerElement="p"
				WordElement="span"
				CharElement="span"
				SpaceElement="span"
				{...rest}
			>
				first second third
			</SplitText>
		)
		expect(component).toMatchSnapshot()
	})

	it("fails", () => {
		expect(true).toEqual(false)
	})
})
