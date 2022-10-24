import {IsNotEmpty} from "class-validator";
import { Produto } from "src/Produtos/entities/produtos.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"


@Entity({name: "tb_category"})
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 50, nullable: false})
    fornecedor : string

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    modelo: string;

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    material: string;



    //Chave de uma para muitos
    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto : Produto []
}
