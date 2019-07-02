import React from "react";
import AddActivity from "./AddActivity";
import AddSession from "./AddSession";
import DeleteActivity from "./DeleteActivity";
import DeleteSession from "./DeleteSession";

const Testing = props => {
	return (
		<>
			<h1>Component test page only</h1>
			<AddActivity />
			<AddSession />
			<DeleteActivity id="cjx3b0yv9m3380b51rihtqhza" />
			<DeleteSession id="cjx4vdcv67bye0b5139ivw8hm" />
		</>
	);
};

export default Testing;
