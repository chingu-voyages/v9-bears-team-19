const { forwardTo } = require("prisma-binding");

const Query = {
	users: forwardTo("db"),
	currentUser(parent, args, ctx, info) {
		if (!ctx.userId) {
			return null;
		}
		return ctx.db.query.user(
			{
				where: {
					id: ctx.userId
				}
			},
			info
		);
	}
};

module.exports = Query;
