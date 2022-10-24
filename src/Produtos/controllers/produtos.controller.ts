import { Controller, Get, HttpStatus, HttpCode, Param, ParseIntPipe, Body, Post, Patch, Delete } from '@nestjs/common'
import { Produto } from '../entities/produtos.entity'
import { ProdutosService } from '../services/produtos.service'

@Controller("/produtos")
export class ProdutosController {

    constructor(private readonly produtosService: ProdutosService) {}

    // Retornando para o metodo de achar todos.
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtosService.findAll();
    };

    // Retornando para o metodo de achar pelo iD.
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
        return this.produtosService.findById(id);
    };

    // Retornando para o metodo de achar pelo Nome.
    @Get('/search/:nome')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('nome') nome: string): Promise<Produto[]> {
        return this.produtosService.findByName(nome);
    };

    // Retornando para o modo de criar um post no Banco de Dados.
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body()produtos: Produto): Promise<Produto> {
        return this.produtosService.create(produtos);
};

    // Retornando para o modo de atualizar no Banco de Dados
    @Patch()
    @HttpCode(HttpStatus.OK)
    update(@Body()produtos: Produto): Promise<Produto> {
        return this.produtosService.update(produtos);
};
    
// Retando para o metodo de deletar no Banco de Dados.
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.produtosService.delete(id);
    };


};
    
    
    

