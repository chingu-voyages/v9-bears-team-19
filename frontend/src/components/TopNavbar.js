import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class MenuExampleBasic extends Component {
	state = {};

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;
		return (
			<Menu pointing secondary>
				<Link to="/">
					<Menu.Item
						name="dashboard"
						active={activeItem === "dashboard"}
						onClick={this.handleItemClick}
					>
						Dashboard
					</Menu.Item>
				</Link>
				<Link to="/track">
					<Menu.Item
						name="track"
						active={activeItem === "track"}
						onClick={this.handleItemClick}
					>
						Track
					</Menu.Item>
				</Link>
				<Link to="/progress">
					<Menu.Item
						name="progress"
						active={activeItem === "progress"}
						onClick={this.handleItemClick}
					>
						Progress
					</Menu.Item>
				</Link>
				<Link to="/history">
					<Menu.Item
						name="history"
						active={activeItem === "history"}
						onClick={this.handleItemClick}
					>
						History
					</Menu.Item>
				</Link>
				<Menu.Menu position="right">
					<Link>
						<Menu.Item name="login">Login</Menu.Item>
					</Link>
				</Menu.Menu>
				{!this.props.user ? (
					<p>Please login</p>
				) : (
					<p>Welcome back {this.props.user.name}</p>
				)}
			</Menu>
		);
	}
}
