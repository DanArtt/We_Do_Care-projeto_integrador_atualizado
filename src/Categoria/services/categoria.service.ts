import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike, DeleteResult } from 'typeorm'
import { Categoria } from '../entities/categoria.entity'

@Injectable()
export class CategoriaService{
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria> ){}

        // Método Achar Todos
        async findAll(): Promise<Categoria[]> {
            return await this.categoriaRepository.find();
        }

        // Método Achar pelo ID
        async findById(id: number): Promise<Categoria> {
            let categoria = await this.categoriaRepository.findOne({
                where: {
                    id
                }
            });
            if(!categoria) {
                throw new HttpException('Id Relacionado ao Objeto não foi encontrado.', HttpStatus.NOT_FOUND)
            }
            return categoria;
        }

        // Método Achar Pelo Modelo
        async findByModelo(modelo: string): Promise<Categoria[]> {
            return await this.categoriaRepository.find({
                where: {
                    modelo: ILike(`%${modelo}%`)
                }
            })
        }

        //Mandar todos os dados para o banco de dados
        async create(categoria: Categoria): Promise<Categoria>{
            return await this.categoriaRepository.save(categoria)
        }


        //Atualizar todos os dados.
        //nossa variavel é nossa classe que está sendo prometida a nossa categoria
        async update(categoria: Categoria): Promise<Categoria>{
            //essa variavel vai fazer uma busca pelo id de cada produto que o usuario for buscar
            let buscaCategoria: Categoria = await this.findById(categoria.id)
            // aqui ele tentara fazer uma busca, caso ele não ache um ou o outro, irá mostrar a mensagem de erro
            if (!buscaCategoria || !categoria.id){
                throw new HttpException('Id relacionado ao objeto não foi encontrado', HttpStatus.NOT_FOUND)
            }
            // caso contrario, ele irá modificar e salvar a alteração da categoria.
            return await this.categoriaRepository.save(categoria)
        }

        //Deletar os dados no banco de dados
        //dele irá buscar pela categoria/ deleteResult irá deletar o resultado que for encontrado pelo id.
            async delete(id: number): Promise<DeleteResult>{
                //Usando a mesma variavel usada no update e setando a categoria, ele irá achar o id
            let buscaCategoria: Categoria = await this.findById(id);
                //Caso ele não ache o id, ele irá emitir uma mensagem de erro.
            if(!buscaCategoria){
                throw new HttpException('Id relacionado ao objeto não foi enconntrado', HttpStatus.NOT_FOUND)
            }
            //Caso contrario ele irá deletar.
            return await this.categoriaRepository.delete(id)
        }

        
} 