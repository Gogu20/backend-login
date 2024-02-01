import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
    
    @PrimaryGeneratedColumn('increment')
    id!: number;
    
    @Column('varchar', {
        length: 255,
        unique: true,
        nullable: false
    })
    email!: string;

    @Column('text', {
        nullable: false
    })
    password!: string;
}

