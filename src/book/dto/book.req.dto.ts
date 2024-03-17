export class CreateBookDto {
  readonly title: string;
}

export class AddBookDetailsRequestDto {
  readonly bookId: string;
  readonly scripts: string[];
}