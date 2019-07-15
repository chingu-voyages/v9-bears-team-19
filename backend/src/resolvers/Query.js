const { forwardTo } = require("prisma-binding");

const Query = {
	users: forwardTo("db"),
	currentUser(parent, args, ctx, info) {
		if (!ctx.userId) {
			return null;
		}
		const user = ctx.db.query.user(
			{
				where: {
					id: ctx.userId
				}
			},
			info
		);
		return user;
	},
	async activities(parent, args, ctx, db) {
		const foundActivities = await ctx.db.query.activities({
			where: {
				user: {
					id: ctx.userId
				}
			}
		});
		return foundActivities;
	},
	async activity(parent, args, ctx, info) {
		const foundActivity = await ctx.db.query.activity(
			{
				where: {
					id: args.id
				}
			},
			`{id title user { id name } distance}`
		);
		if (foundActivity.user.id !== ctx.userId) {
			throw new Error("Permissions Error");
		}
		return foundActivity;
	},
	clubs: forwardTo("db")
};

module.exports = Query;
