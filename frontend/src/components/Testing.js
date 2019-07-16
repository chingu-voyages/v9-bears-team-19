import React from "react";
import AddActivity from "./AddActivity";
import AllClubs from "./AllClubs";

const Testing = props => {
	return (
		<>
			<h1>Component test page only</h1>
			<AddActivity />
			<button>Start Timer</button>
			<button>Stop Timer</button>
			<AllClubs />
		</>
	);
};

export default Testing;
