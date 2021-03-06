import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch
} from "react-router-dom";

import actions from "../store/action";
import {connect} from "react-redux";




function NestingExample(params) {
	console.log(params);
	const {toggle,onToggle} = params;
	console.log(toggle);
	console.log(onToggle);

	function handleClick(e) {
		e.preventDefault();
		onToggle(!toggle.toggle);

	}

	return (
		<Router>
			<div>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/topics">Topics</Link>
					</li>
				</ul>
				{toggle.toggle?<div>true</div>:<div>false</div>}
				<hr />
				<button onClick={handleClick}>
          Click me
				</button>
				<hr />

				<Switch>
					<Route exact path="/" component={Home}>
						{/* <Home /> */}
					</Route>
					<Route path="/topics" component={Topics}>
						{/* <Topics /> */}
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

function Home() {
	return (
		<div>
			<h2>Home</h2>
		</div>
	);
}

function Topics() {
	// The `path` lets us build <Route> paths that are
	// relative to the parent route, while the `url` lets
	// us build relative links.
	const whatIsMatch = useRouteMatch();
	console.log(whatIsMatch);
	let { path, url } = useRouteMatch();

	return (
		<div>
			<h2>Topics</h2>
			<ul>
				<li>
					<Link to={`${url}/rendering`}>Rendering with React</Link>
				</li>
				<li>
					<Link to={`${url}/components`}>Components</Link>
				</li>
				<li>
					<Link to={`${url}/props-v-state`}>Props v. State</Link>
				</li>
			</ul>

			<Switch>
				<Route exact path={path}>
					<h3>Please select a topic.</h3>
				</Route>
				<Route path={`${path}/:topicId`}>
					<Topic />
				</Route>
			</Switch>
		</div>
	);
}

function Topic() {
	// The <Route> that rendered this component has a
	// path of `/topics/:topicId`. The `:topicId` portion
	// of the URL indicates a placeholder that we can
	// get from `useParams()`.
	let { topicId } = useParams();


	const whatIsParam = useParams();
	console.log(whatIsParam);

	return (
		<div>
			<h3>{topicId}</h3>
		</div>
	);
}

const mapStateToProps = (state) => ({
	toggle: state.toggle
});

const mapDispatchToProps = (dispatch) => ({
	onToggle: (toggle) => dispatch(actions.onToggle(toggle)),
});

export default connect(mapStateToProps,mapDispatchToProps)(NestingExample);