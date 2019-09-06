const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Query = require("./Query.js");
const { gql } = require("apollo-server");

const Mutation = {
	async createUser(parent, args, ctx, info) {
		let secret = await new Promise((res, rej) => {
			bcrypt.hash(args.password, 10, (err, hash) => {
				if (err) {
					rej(err.message);
				}
				res(hash);
			});
		});
		const user = await ctx.db.mutation.createUser(
			{
				data: {
					...args,
					password: secret,
					permissions: {
						set: ["USER"]
					},
					club: {
						connect: {
							id: args.club
						}
					}
				}
			},
			info
		);
		const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
		ctx.res.cookie("token", token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		});
		return user;
	},
	async loginUser(parent, { email, password }, ctx, info) {
		const user = await ctx.db.query.user({ where: { email } });
		if (!user) {
			throw new Error("No such user found for email ${email}");
		}
		// check password
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			throw new Error("Incorrect Login Details");
		}
		// generate JWT
		const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
		// call a function from context on response to set cookie with token
		ctx.res.cookie("token", token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		});
		// cookie is set through the react app
		return user;
	},
	async logoutUser(parent, args, ctx, info) {
		ctx.res.clearCookie("token");
		return { message: "Logged Out" };
	},
	async createActivity(parent, args, ctx, info) {
		if (!ctx.userId) {
			throw new Error("You must be logged in to do this");
		}
		const newActivity = await ctx.db.mutation.createActivity({
			data: {
				...args,
				user: {
					connect: {
						id: ctx.userId.userId
					}
				}
			}
		});
		return newActivity;
	},
	async deleteActivity(parent, { id }, ctx, info) {
		const foundActivity = await ctx.db.query.activity(
			{
				where: {
					id
				}
			},
			`id name user {id }`
		);
	},
	async createClub(parent, args, ctx, info) {
		const newClub = await ctx.db.mutation.createClub({
			data: {
				...args
			}
		});
		return newClub;
	},
	async createRace(parent, args, ctx, info) {
		const newRace = await ctx.db.mutation.createRace({
			data: {
				...args,
				admin: {
					connect: {
						id: ctx.req.userId
					}
					// todo ctx.userID returning null!!
					// todo reason: in graphql playground the credentials were not being passed.
				},
				competitors: []
			},
			info
		});
		return newRace;
	},
	async addMeToRace(parent, args, ctx, info) {
		const user = await ctx.db.query.user({
			where: {
				id: ctx.req.userId
			}
		});
		const amendedRace = await ctx.db.mutation.updateRace({
			where: {
				id: args.race
			},
			data: {
				competitors: {
					connect: [
						{
							id: ctx.req.userId
						}
					]
				},
				race_times: {
					create: {
						raceEntry: {
							create: {
								race: {
									connect: {
										id: args.race
									}
								},
								user: {
									connect: {
										id: ctx.req.userId
									}
								}
							}
						}
					}
				}
			}
		});
		// todo if i try to return amendedRace the competitor is not added till the race is
		// todo re-queried
		return { message: `User: ${user.name} added` };
	},
	async startRace(parent, args, ctx, info) {
		const startRace = await ctx.db.mutation.updateManyRaceTimes({
			where: {
				raceEntry: {
					race: {
						id: args.race
					}
				}
			},
			data: {
				timeStart: args.timeStart
			}
		});
		return { message: "Timer Started" };
	},
	async stopTimer(parent, args, ctx, info) {
		const stopTimer = await ctx.db.mutation.updateRaceTime({
			where: {
				id: args.raceTimeId
			},
			data: {
				timeStop: args.timeStop
			}
		});
		const startTime = await ctx.db.query.raceTime(
			{
				where: {
					id: args.raceTimeId
				}
			},
			`{timeStart raceEntry { user { name } }}`
		);
		return {
			message: `Timer for ${startTime.name} = ${args.timeStop -
				startTime.timeStart}`
		};
	}
};

module.exports = Mutation;
