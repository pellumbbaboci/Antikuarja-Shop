const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It is a basic eCommerce application.',
  },
  tags: {
    product: {
      name: 'products',
      description: 'Everything about Products',
    },
    user: {
      name: 'users',
      description: 'Everything about users',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
  paths: {
    '/': {
      get: {
        description: 'Making sure that server is running',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'String that shows api is running.',
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
    '/api/products': {
      get: {
        description:
          'Returns all products from the system that the user has access to',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'A list of products.',
            schema: {
              type: 'array',
            },
          },
        },
      },
    },
    '/api/products/related': {
      get: {
        description:
          'Returns all related products from the system that the user has access to',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'A list of products.',
            schema: {
              type: 'array',
            },
          },
        },
      },
    },
    '/api/products/{id}': {
      get: {
        description: 'Returns products based on ID',
        summary: 'Find product by ID',
        operationId: 'ProductById',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'products response',
          },
        },
      },
      parameters: [
        {
          name: 'id',
          in: 'path',
          description:
            'ID of product to use (e.g id: 60de39baf7bc81e89f254009)',
          required: true,
        },
      ],
    },
  },
  // '/api/users/login': {
  //   post: {
  //     description: 'Returns token for authorized User',
  //     operationId: 'Login',
  //     consumes: 'application/json',
  //     responses: {
  //       200: {
  //         description: 'Successful login',
  //         schema: {
  //           type: 'string',
  //         },
  //       },
  //       400: {
  //         description: 'Bad Request',
  //       },
  //       404: {
  //         description: 'User not found',
  //         schema: {
  //           type: 'string',
  //         },
  //       },
  //       500: {
  //         description: 'Server Error',
  //         schema: {
  //           type: 'string',
  //         },
  //       },
  //     },
  //   },
  //   parameters: [
  //     {
  //       in: 'body',
  //       name: 'user',
  //       description: 'The user to create',
  //       schema: {
  //         $ref: '#/definitions/LoginInfo',
  //       },
  //     },
  // {
  //   name: 'email',
  //   in: 'body',
  //   required: true,
  //   description: 'email',
  //   type: 'string',
  // },
  // {
  //   name: 'password',
  //   in: 'body',
  //   description: 'password',
  //   required: true,
  //   type: 'string',
  // },
  //   ],

  //   definitions: {
  //     LoginInfo: {
  //       type: 'object',
  //       properties: {
  //         email: {
  //           type: 'string',
  //         },
  //         password: {
  //           type: 'string',
  //         },
  //       },
  //     },
  //   },
}

export default swaggerDefinition
