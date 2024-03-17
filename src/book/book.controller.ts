import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { AddBookDetailsRequestDto, CreateBookDto } from './dto/book.req.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseInterceptors(
    FileInterceptor('thumbnail'),
  )
  @Post('basic')
  async createBookBasic(
    @UploadedFile() thumbnailFile: Express.Multer.File,
    @Body() body: CreateBookDto,
  ): Promise<Book> {
    return this.bookService.createBookBasic(body, thumbnailFile);
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 10 },
      { name: 'audios', maxCount: 10 },
    ]),
  )
  @Post('details')
  async addBookDetails(
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
      audios?: Express.Multer.File[];
    },
    @Body() body: AddBookDetailsRequestDto,
  ) {
    return this.bookService.addBookDetails(files, body);
  }
}
