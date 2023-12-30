import HttpError from '@wasp/core/HttpError.js'

export const getProducts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  let products = context.entities.Product.findMany({
    include: { category: true },
  });

  if (args.categoryId) {
    products = products.filter(product => product.categoryId === args.categoryId);
  }

  if (args.search) {
    products = products.filter(product => product.name.includes(args.search));
  }

  return products;
}

export const getProduct = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const product = await context.entities.Product.findUnique({
    where: { id: args.id },
    include: {
      category: true,
      user: true,
      Order: true,
      reviews: true
    }
  });

  if (!product) throw new HttpError(404, 'No product with ID ' + args.id);

  return product;
}

export const getOrders = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Order.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getOrder = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const order = await context.entities.Order.findUnique({
    where: { id: args.id, userId: context.user.id },
    include: { products: { include: { category: true } } }
  });

  if (!order) { throw new HttpError(404, `Order not found with id ${args.id}`) }

  return order;
}

export const getShipment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const shipment = await context.entities.Shipment.findUnique({
    where: { id: args.id }
  });

  if (!shipment) throw new HttpError(404, 'No shipment with id ' + args.id);

  return shipment;
}

export const getReviews = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Review.findMany({
    where: {
      productId: args.productId
    }
  })
}