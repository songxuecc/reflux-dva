import React from "react"
import logo from "../logo.svg"
import "../App.css"

function pureCom(props) {
	const onClick = () => {
        console.log('new B().constructor')

	}
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p onClick={onClick}>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	)
}

export default pureCom
