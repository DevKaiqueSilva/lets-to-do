import { rest } from 'msw';

export default [
  rest.post('/api/login', (req, res, ctx) => {
    const { user, password } = req.body;
    console.log(user, password);
    if (user && password) {
      return res(
        ctx.json({
          message: 'Loggin sucessfull.',
        }),
      );
    }
    return res(
      ctx.status(401),
      ctx.json({
        message: 'User or password empty.',
      }),
    );
  }),
];
