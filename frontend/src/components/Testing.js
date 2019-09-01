import React from "react";
import AddActivity from "./AddActivity";
import AllClubs from "./AllClubs";
import Signin from "./Signin";

const Testing = props => {
	return (
		<>
			<h1>Component test page only</h1>
			<Signin />
			<AddActivity />
			<button>Start Timer</button>
			<button>Stop Timer</button>
			<AllClubs />
		</>
	);
};

export default Testing;
