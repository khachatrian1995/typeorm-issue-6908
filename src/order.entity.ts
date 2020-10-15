import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';
import { Product } from './product.entity';

@Entity()
export class Order {
  @ManyToOne(() => Customer, (customer: Customer) => customer.orders, {
    primary: true
  })
  @JoinColumn()
  customer: Customer;

  @ManyToOne(() => Product, (product: Product) => product.orders, {
    primary: true
  })
  @JoinColumn()
  product: Product;

  @Column()
  details: string;
}
