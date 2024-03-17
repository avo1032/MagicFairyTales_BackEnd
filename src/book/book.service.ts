import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';
import { AwsService } from 'src/aws/aws.service';
import { AddBookDetailsRequestDto, CreateBookDto } from './dto/book.req.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    private readonly awsService: AwsService,
  ) {}

  async createBookBasic(
    body: CreateBookDto,
    thumbnailFile: Express.Multer.File,
  ): Promise<Book> {
    const { title } = body;

    const thumbnail = await this.awsService.uploadFile(thumbnailFile, title);
    const newBook = new this.bookModel({
      title,
      thumbnail,
      views: 0,
      isPublished: false,
    });
    return newBook.save();
  }

  async addBookDetails(
    files: {
      images?: Express.Multer.File[];
      audios?: Express.Multer.File[];
    },
    body: AddBookDetailsRequestDto,
  ) {
    const { images, audios } = files;
    const { bookId, scripts } = body;
    const book = await this.bookModel.findById(bookId);
    if (!book) {
      throw new NotFoundException('해당 도서는 존재하지 않습니다.');
    }
    const pages = [];
    for (let i = 0; i < images.length; i++) {
      const page = i + 1;
      const image = await this.awsService.uploadFile(
        images[i],
        `${book.title}/images`,
      );
      const script = scripts[i];
      const audio = await this.awsService.uploadFile(
        audios[i],
        `${book.title}/audios`,
      );
      pages.push({
        page,
        script,
        image,
        audio,
      });
    }
    book.pages = pages;
    await book.save();

    return book;
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }
}
