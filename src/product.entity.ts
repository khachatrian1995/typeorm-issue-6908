import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Order } from './order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @ManyToOne(
    () => Manufacturer,
    (manufacturer: Manufacturer) => manufacturer.products
  )
  manufacturer: Manufacturer;

  @OneToMany(() => Order, (order: Order) => order.customer)
  orders: Order[];
}
