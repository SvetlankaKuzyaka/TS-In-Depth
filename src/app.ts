/* eslint-disable no-underscore-dangle */
/* eslint-disable no-redeclare */

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// ===============================================================

// type DamageLogger = (reason: string) => void;

interface DamageLogger {
    (reason: string): void;
}

// type Book = {
//     id: number;
//     title: string;
//     author: string;
//     available: boolean;
//     category: Category;
// };

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    // markDamaged?: (reason: string) => void;
    // markDamaged?(reason: string): void;
    markDamaged?: DamageLogger;
    // [propertyName: string]: any;
};

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string) => void;
}

enum Category {
    JavaScript,
    CSS,
    HTML,
    TypeScript,
    Angular,
}

type Library = {
    lib: string;
    books: number;
    avgPagesPerBook: number;
};

type BookProperties = keyof Book;

type PersonBook = Person & Book;

type BookOrUndefined = Book | undefined;

function getAllBooks(): readonly Book[] {
    const books: readonly Book[] = <const>[
        {
            id: 1,
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            available: true,
            category: Category.JavaScript,
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            available: false,
            category: Category.JavaScript,
        },
        {
            id: 3,
            title: 'CSS Secrets',
            author: 'Lea Verou',
            available: true,
            category: Category.CSS,
        },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true,
            category: Category.JavaScript,
        },
    ];

    return books;
}

function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    console.log(`Number of books: ${books.length}`);

    const title = books.find(book => book.available === true)?.title;
    console.log(`First available book title: ${title}`);
}

function getBookTitlesByCategory(category: Category = Category.JavaScript): string[] {
    return getAllBooks()
        .filter(book => book.category === category)
        .map(book => book.title);
}

function logBookTitles(titles: string[]): void {
    console.log(`Book titles: ${titles.join(', ')}`);
}

function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const { title, author } = getAllBooks()[index];
    return [title, author];
}

function getAllLibraries(): readonly Library[] {
    const libraries: readonly Library[] = <const>[
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
    ];

    return libraries;
}

function calcTotalPages(libraries: readonly Library[]): bigint {
    return libraries.reduce((acc, library) => acc + BigInt(library.books) * BigInt(library.avgPagesPerBook), 0n);
}

function createCustomerID(name: string, id: number): string {
    return `${name}-${id}`;
}

function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer name: ${name}`);

    if (age) {
        console.log(`Customer age: ${age}`);
    }

    if (city) {
        console.log(`Customer city: ${city}`);
    }
}

function getBookByID(id: number): BookOrUndefined {
    const books = getAllBooks();

    return books.find(book => book.id === id);
}

function сheckoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Customer name: ${customer}`);

    return bookIDs
        .map(id => getBookByID(id))
        .filter(book => book.available === true)
        .map(book => book.title);
}

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...args: any[]): string[] {
    const books = getAllBooks();
    if (args.length === 1) {
        const [arg] = args;
        if (typeof arg === 'string') {
            return books.filter(book => book.author === arg).map(book => book.title);
        }
        if (typeof arg === 'boolean') {
            return books.filter(book => book.available === arg).map(book => book.title);
        }
    }
    if (args.length === 2) {
        const [id, available] = args;
        return books.filter(book => book.id === id && book.available === available).map(book => book.title);
    }

    return [];
}

function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should have been a string');
    }
}

function bookTitleTransform(title: any): string | never {
    assertStringValue(title);

    return [...title].reverse().join('');
}

function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

function getProperty(book: Book, prop: BookProperties): any {
    return typeof book[prop] === 'function' ? (book[prop] as Function).name : book[prop];
}

abstract class ReferenceItem {
    // title: string;
    // year: number;

    // constructor (newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem...');
    //     this.title = newTitle;
    //     this.year = newYear;
    // }

    private _publisher: string;
    #id: number;
    static department: string = 'Novels';

    constructor (id: number, public title: string, protected year: number) {
        console.log('Creating a new ReferenceItem...');
        this.#id = id;
    }

    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    getID(): number {
        return this.#id;
    }

    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department: ${ReferenceItem.department}`);
    }

    abstract printCitation(): void;
}

class Encyclopedia extends ReferenceItem {
    constructor(id: number, title: string, year: number, public edition: number) {
        super(id, title, year);
    }

    printItem(): void {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }

    printCitation(): void {
        console.log(`${this.title} - ${this.year}`);
    }
}

class UniversityLibrarian implements Librarian {
    name: string;
    email: string;
    department: string;

    assistCustomer(custName: string): void {
        console.log(`${this.name} is assisting ${custName}`);
    }
}

logFirstAvailable(getAllBooks());
logFirstAvailable();

logBookTitles(getBookTitlesByCategory(Category.CSS));
logBookTitles(getBookTitlesByCategory());

console.log(getBookAuthorByIndex(2));

console.log(calcTotalPages(getAllLibraries()));

const myID: string = createCustomerID('Ann', 10);
console.log(myID);
// let idGenerator: typeof createCustomerID;
let idGenerator: (name: string, id: number) => string;
idGenerator = (name: string, id: number) => `${name}-${id}`;
idGenerator = createCustomerID;
console.log(idGenerator('Katya', 22));

createCustomer('Boris');
createCustomer('Boris', 31);
createCustomer('Boris', 31, 'Minsk');

console.log(getBookByID(1));

const myBooks = сheckoutBooks('Ann', 1, 2, 4);
console.log(myBooks);

const checkedOutBooks = getTitles(false);
console.log(checkedOutBooks);

console.log(bookTitleTransform('Typescript book'));
// console.log(bookTitleTransform(7));

const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    // year: 2015,
    // copies: 3,
    pages: 200,
    markDamaged: (reason: string): void => {
        console.log(`Damaged: ${reason}`);
    }
};
printBook(myBook);
myBook.markDamaged('missing back cover');

const logDamage: DamageLogger = (reason: string): void =>
    console.log(`Damaged: ${reason}`);
logDamage('missing back cover');

const favoriteAuthor: Author = {
    name: 'Anna',
    email: 'anna@test.com',
    numBooksPublished: 7
};

const favoriteLibrarianLiteral: Librarian = {
    name: 'Vasya',
    email: 'vasya@test.com',
    department: 'Novels',
    assistCustomer(name: string) {
        console.log(name);
    }
};

const offer: any = {
    book: {
        title: 'Essential Typescript'
    }
};
console.log(offer.magazine);
console.log(offer.magazine?.getTitle());
console.log(offer.book.getTitle?.());
console.log(offer?.book?.authors?.[0]);

console.log(getProperty(getAllBooks()[0], 'title'));
console.log(getProperty(getAllBooks()[0], 'markDamaged'));
// console.log(getProperty(getAllBooks()[0], 'isbn'));

// const ref: ReferenceItem = new ReferenceItem(1, 'Learn Typescript', 2020); // class ReferenceItem should not be abstract for this task
// ref.printItem();
// ref.publisher = 'abc group';
// console.log(ref.publisher);
// console.log(ref.getID());

const refBook = new Encyclopedia(1, 'Learn Typescript', 2020, 4);
refBook.printItem();
refBook.printCitation();

const favoriteLibrarianInstance: Librarian = new UniversityLibrarian();
favoriteLibrarianInstance.name = 'Anna';
favoriteLibrarianInstance.assistCustomer('Boris');

const personBook: PersonBook = {
    name: 'Anna',
    author: 'Anna',
    email: 'anna@example.com',
    available: false,
    category: Category.TypeScript,
    id: 1,
    title: 'Learn Typescript'
};
console.log(personBook);