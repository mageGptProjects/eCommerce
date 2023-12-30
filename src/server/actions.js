import HttpError from '@wasp/core/HttpError.js'

export const addToCart = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { productId } = args;

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    include: { cart: true }
  });

  const product = await context.entities.Product.findUnique({
    where: { id: productId }
  });

  if (!product) { throw new HttpError(404, 'Product not found') }
  if (user.cart.some((item) => item.id === productId)) { throw new HttpError(400, 'Product is already in cart') }

  return context.entities.User.update({
    where: { id: context.user.id },
    data: { cart: { connect: { id: productId } } }
  });
}

export const checkout = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { userId } = context.user;

  const user = await context.entities.User.findUnique({
    where: { id: userId },
    include: { cart: { include: { products: true } } }
  });

  if (!user) { throw new HttpError(404, 'User not found') }

  const productsInCart = user.cart.products;

  if (productsInCart.length === 0) { throw new HttpError(400, 'Cart is empty') }

  const order = await context.entities.Order.create({
    data: {
      userId,
      status: 'Pending',
      products: { createMany: { data: productsInCart.map(product => ({ productId: product.id })) } }
    }
  })

  return order;
}

export const cancelOrder = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const order = await context.entities.Order.findUnique({
    where: { id: args.orderId }
  });
  if (!order) { throw new HttpError(404) };

  if (order.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Order.update({
    where: { id: args.orderId },
    data: { status: 'cancelled' }
  });
}

export const createReview = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { userId, productId, rating, reviewText } = args

  const user = await context.entities.User.findUnique({
    where: { id: userId }
  })

  if (!user) { throw new HttpError(404) }

  const product = await context.entities.Product.findUnique({
    where: { id: productId }
  })

  if (!product) { throw new HttpError(404) }

  return context.entities.Review.create({
    data: {
      userId: user.id,
      productId: product.id,
      rating,
      reviewText
    }
  })
}