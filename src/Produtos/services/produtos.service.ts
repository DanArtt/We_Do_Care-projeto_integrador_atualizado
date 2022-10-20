import {Injectable} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, ILike, DeleteResult } from "typeorm"
import { Produto } from "../entities/produtos.entity"


@Injectable()
export class ProdutosService {
    constructor(@InjectRepository(Produto)
    private produtosRepository: Repository<Produto>) {
    }

//---------------------Metodo para Achar Todos-----------------------
    async findAll(): Promise<Produto[]> {
        return await this.produtosRepository.find();

    }

//---------------------Metodo achar Pelo ID---------------------------

    async findById(id: number): Promise<Produto> {
        let produtos = await this.produtosRepository.findOne({
            where: {
                id
            }
        })
    }
}

