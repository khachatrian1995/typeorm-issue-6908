import { createConnection } from 'typeorm';
import { Customer } from './customer.entity';
import { Manufacturer } from './manufacturer.entity';
import { Order } from './order.entity';
import { Product } from './product.entity';

async function reproduce() {
  const connection = await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'developer',
    password: 'repoleved',
    database: 'typeorm-issue-6908-mysql',
    entities: [Customer, Manufacturer, Product, Order]
  });
  await connection.synchronize();

  const customerRepository = connection.getRepository(Customer);
  const customer = await customerRepository.save({ name: 'customer 1' });

  const manufacturerRepository = connection.getRepository(Manufacturer);
  const manufacturer = await manufacturerRepository.save({
    name: 'manufacture 1'
  });

  const productRepository = connection.getRepository(Product);
  const product = await productRepository.save({
    code: 'code 1',
    name: 'product 1',
    manufacturer: manufacturer
  });

  const orderRepository = connection.getRepository(Order);
  await orderRepository.save({
    customer: { id: customer.id },
    product: { id: product.id },
    details: 'some details'
  });
  const order = await orderRepository.findOne({
    customer: { id: customer.id },
    product: { id: product.id }
  });
  await orderRepository.remove(order);
}

reproduce();
