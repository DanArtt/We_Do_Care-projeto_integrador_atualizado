import {Injectable, HttpException, HttpStatus} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository, ILike, DeleteResult } from "typeorm"
import { Usuario } from "../entities/usuario.entity";

@Injectable()
export class UsuarioService {
    constructor(@InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>) {
    }

//---------------------Metodo para Achar Todos-----------------------
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();

    }

//---------------------Metodo achar Pelo ID---------------------------

    async findById(id_usuario: number): Promise<Usuario> {
        let usuario = await this.usuarioRepository.findOne({ 
            where: {
                id_usuario
            }
        })
    if (!usuario) {
        throw new HttpException('ID referente ao Usuário não existe.', HttpStatus.NOT_FOUND);
    }
    return usuario;
    }

//---------------------Metodo Achar pelo nome-------------------------

    async findByName(nome_usuario: string): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            where: {
                nome_usuario: ILike(`%${nome_usuario}%`)
            }
        })
    }

//---------------------Mandar Todos os Dados para o Bando de Dados-----------------------

    async create(usuario: Usuario): Promise<Usuario> {
        return await this.usuarioRepository.save(usuario);
    }

//---------------------Metodo de Atualizar Dados no Banco de Dados pelo ID-----------------------

    async update(usuario: Usuario): Promise<Usuario> {
        let buscarUsuarios: Usuario = await this.findById(usuario.id_usuario)
        if (!buscarUsuarios || !usuario.id_usuario) {
            throw new HttpException(`ID referente ao Usuário não existe.`, HttpStatus.NOT_FOUND);
        }
        return await this.usuarioRepository.save(usuario);
    }

//---------------------Metodo de Deletar Dados do Banco de Dados pelo ID-------------------------

    async delete(id_usuario: number): Promise<DeleteResult> {
        let buscarUsuarios: Usuario = await this.findById(id_usuario);
        if (!buscarUsuarios) {
            throw new HttpException(`ID referente ao produto não existe.`, HttpStatus.NOT_FOUND);
        }
        return await this.usuarioRepository.delete(id_usuario);
    }
}

