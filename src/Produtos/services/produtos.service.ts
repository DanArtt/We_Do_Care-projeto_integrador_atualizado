import {Injectable, HttpException, HttpStatus} from "@nestjs/common"
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
    if (!produtos) {
        throw new HttpException('ID referente ao produto não existe.', HttpStatus.NOT_FOUND);
    }
    return produtos;
    }

//---------------------Metodo Achar pelo nome-------------------------

    async findByName(nome: string): Promise<Produto[]> {
        return await this.produtosRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            }
        })
    }

//---------------------Mandar Todos os Dados para o Bando de Dados-----------------------

    async create(produtos: Produto): Promise<Produto> {
        return await this.produtosRepository.save(produtos);
    }

//---------------------Metodo de Atualizar Dados no Banco de Dados pelo ID-----------------------

    async update(produtos: Produto): Promise<Produto> {
        let buscarProdutos: Produto = await this.findById(produtos.id)
        if (!buscarProdutos || !produtos.id) {
            throw new HttpException(`ID referente ao produto não existe.`, HttpStatus.NOT_FOUND);
        }
        return await this.produtosRepository.save(produtos);
    }

//---------------------Metodo de Deletar Dados do Banco de Dados pelo ID-------------------------

    async delete(id: number): Promise<DeleteResult> {
        let buscarProdutos: Produto = await this.findById(id);
        if (!buscarProdutos) {
            throw new HttpException(`ID referente ao produto não existe.`, HttpStatus.NOT_FOUND);
        }
        return await this.produtosRepository.delete(id);
    }
}

