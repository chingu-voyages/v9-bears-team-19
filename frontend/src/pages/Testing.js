import React from "react";
import AddActivity from "../components/AddActivity";
import AllClubs from "../components/AllClubs";
import Signin from "../components/Signin";
import AddRace from "../components/AddRace";

const Testing = props => {
	return (
		<>
			<h1>Component test page only</h1>
			<Signin />
			<AddActivity />
			<AddRace />
			<button>Start Timer</button>
			<button>Stop Timer</button>
			<AllClubs />
		</>
	);
};

export default Testing;
