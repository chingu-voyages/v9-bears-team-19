const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
		// check user
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
		// set cookie with token
		ctx.res.cookie("token", token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		});
		return user;
	},
	async logoutUser(parent, args, ctx, info) {
		ctx.res.clearCookie("token");
		return { message: "Logged Out" };
	},
	async createActivity(parent, args, ctx, info) {
		const fields = args.dataFields;
		const activity = await ctx.db.mutation.createActivity(
			{
				data: {
					...args,
					dataFields: {
						set: [...fields]
					}
				}
			},
			info
		);
		return activity;
	},
	async createSession(parent, args, ctx, info) {
		if (!ctx.userId) {
			throw new Error("Login Required");
		}
		const user = await ctx.db.query.user({ where: { id: ctx.userId } });
		const session = await ctx.db.mutation.createSession(
			// todo pass dataValues as a json file
			{
				data: {
					...args,
					user: {
						connect: { id: ctx.userId }
					},
					activityType: {
						connect: { id: args.activityType }
					},
					dataValues: {
						json: args.dataValues
					}
				}
			},
			info
		);
		return session;
	}
};

module.exports = Mutation;
