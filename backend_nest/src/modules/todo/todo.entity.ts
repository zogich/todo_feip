import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodoEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("text", {default: ''})
  description: string;

  @Column({default: false})
  isDone: boolean;

  @Column({ nullable: true })
  parentTask: number;

}