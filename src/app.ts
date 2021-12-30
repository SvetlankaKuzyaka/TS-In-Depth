import { UL, RefBook, ReferenceItem, Library, Shelf } from './classes';
import { Category } from './enums';
import {
    bookTitleTransform,
    calcTotalPages,
    createCustomer,
    createCustomerID,
    getAllBooks,
    getAllLibraries,
    getBookAuthorByIndex,
    getBookByID,
    getBookTitlesByCategory,
    getProperty,
    getTitles,
    logBookTitles,
    logFirstAvailable,
    printBook,
    сheckoutBooks,
    printRefBook,
    purge,
    getBooksByCategory,
    logCategorySearch,
    getBooksByCategoryPromise,
    logSearchResults,
} from './functions';
import { Author, Book, Librarian, Logger, Magazine } from './interfaces';
import { BookRequiredFields, PersonBook, Unpromisify, UpdatedBook, СreateCustomerFunctionType } from './types';

// ===============================================================

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// ===============================================================

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
    },
};
printBook(myBook);
myBook.markDamaged('missing back cover');

// const logDamage: DamageLogger = (reason: string): void => console.log(`Damaged: ${reason}`);
const logDamage: Logger = (reason: string): void => console.log(`Damaged: ${reason}`);
logDamage('missing back cover');

const favoriteAuthor: Author = {
    name: 'Anna',
    email: 'anna@test.com',
    numBooksPublished: 7,
};

const favoriteLibrarianLiteral: Librarian = {
    name: 'Vasya',
    email: 'vasya@test.com',
    department: 'Novels',
    assistCustomer(name: string) {
        console.log(name);
    },
};

const offer: any = {
    book: {
        title: 'Essential Typescript',
    },
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

// const refBook = new Encyclopedia(1, 'Learn Typescript', 2020, 4);
const refBook = new RefBook(1, 'Learn Typescript', 2020, 4);
refBook.printItem();
refBook.printCitation();
printRefBook(refBook);

// const univ = new UL.UniversityLibrarian();
// printRefBook(univ);

const favoriteLibrarianInstance: Librarian = new UL.UniversityLibrarian();
favoriteLibrarianInstance.name = 'Anna';
favoriteLibrarianInstance.assistCustomer('Boris');

const personBook: PersonBook = {
    name: 'Anna',
    author: 'Anna',
    email: 'anna@example.com',
    available: false,
    category: Category.TypeScript,
    id: 1,
    title: 'Learn Typescript',
};
console.log(personBook);

const flag = true;
if (flag) {
    // import('./classes').then((module) => {
    //     const reader = new module.Reader();
    //     reader.name = 'Anna';
    //     console.log(reader);
    // }).catch((err) => console.log(err));

    const module = await import('./classes');

    const reader = new module.Reader();
    reader.name = 'Anna';
    console.log(reader);
}

// const lib: Library = new Library(); // error: Library was exported as type
const lib: Library = {
    id: 10,
    name: 'Library',
    address: 'Belarus',
};
console.log(lib);

const inventory: Book[] = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software },
];

// const books: Book[] = purge(inventory);
// console.log(books);
// const numbers = purge<number>([1, 2, 3, 4]);
// console.log(numbers);

const bookShelf: Shelf<Book> = new Shelf<Book>();
inventory.forEach(book => bookShelf.add(book));
const title1: string = bookShelf.getFirst().title;
console.log(bookShelf);
console.log(title1);

const magazines: Magazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' },
];
const magazineShelf = new Shelf<Magazine>();
magazines.forEach(magazine => magazineShelf.add(magazine));
const title2: string = magazineShelf.getFirst().title;
console.log(magazineShelf);
console.log(title2);

magazineShelf.printTitles();
console.log(magazineShelf.find('Five Points'));

console.log(getProperty(magazines[0], 'title'));

const bookRequiredFields: BookRequiredFields = {
    id: 1,
    author: 'Anna',
    available: false,
    category: Category.CSS,
    pages: 102,
    title: 'Learning CSS',
    markDamaged: null,
};

const updatedBook: UpdatedBook = {
    author: 'Anna',
};

const params: Parameters<СreateCustomerFunctionType> = ['Anna', 30, 'Minsk'];
createCustomer(...params);

const obj1 = new UL.UniversityLibrarian();
// UL.UniversityLibrarian['prop'] = 'test'; // error: Cannot add property prop, object is not extensible
console.log(obj1);
obj1.name = 'Anna';
obj1.assistCustomer('Boris');

const obj2 = new UL.UniversityLibrarian();
obj2.assistFaculty = null;
// obj2.teachCommunity = null; // error: Cannot assign to read only property 'teachCommunity'

const enc1 = new RefBook(1, 'Learn Typescript', 2020, 4);
enc1.printItem();

const obj3 = new UL.UniversityLibrarian();
console.log(obj3);
obj3.name = 'Anna';
console.log(obj3.name);
obj3.assistCustomer('Boris');

const enc2 = new RefBook(1, 'Learn Typescript', 2020, 4);
// enc2.copies = -10; // error: Invalid value
enc2.copies = 15;

console.log('Begin');
getBooksByCategory(Category.JavaScript, logCategorySearch);
getBooksByCategory(Category.Software, logCategorySearch);
console.log('End');

const fn1 = (titles: string[]) => {
    console.log(titles);
    return Promise.resolve(titles.length);
};

console.log('Begin');
getBooksByCategoryPromise(Category.JavaScript)
    .then(fn1)
    .then((length: Unpromisify<ReturnType<typeof fn1>>) => console.log(length))
    .catch(reason => console.log(reason));
getBooksByCategoryPromise(Category.Software)
    .then(titles => console.log(titles))
    .catch(reason => console.log(reason));
console.log('End');

console.log('Begin');
logSearchResults(Category.JavaScript).catch(err => console.log(err));
console.log('End');
