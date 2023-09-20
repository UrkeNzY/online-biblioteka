import classes from "../../styles/UserMainPage.module.css";

import Button from "../../components/UI/Buttons/Button";
import Searchbar from "../../components/UI/Searchbar/Searchbar";

const UserMainPage = () => {
  const books = [
    {
      id: 1,
      genre: "Genre",
      name: "Book 1",
      author: "Name Surname",
      cover: "/images/placeholders/book-cover.jpg",
    },
    {
      id: 2,
      genre: "Genre",
      name: "Book 2",
      author: "Name Surname",
      cover: "/images/placeholders/book-cover.jpg",
    },
    {
      id: 3,
      genre: "Genre",
      name: "Book 3",
      author: "Name Surname",
      cover: "/images/placeholders/book-cover.jpg",
    },
    {
      id: 4,
      genre: "Genre",
      name: "Book 4",
      author: "Name Surname",
      cover: "/images/placeholders/book-cover.jpg",
    },
    {
      id: 5,
      genre: "Genre",
      name: "Book 5",
      author: "Name Surname",
      cover: "/images/placeholders/book-cover.jpg",
    },
    {
      id: 6,
      genre: "Genre",
      name: "Book 6",
      author: "Name Surname",
      cover: "/images/placeholders/book-cover.jpg",
    },
    {
      id: 7,
      genre: "Genre",
      name: "Book 7",
      author: "Name Surname",
      cover: "/images/placeholders/book-cover.jpg",
    },
    {
      id: 8,
      genre: "Genre",
      name: "Book 8",
      author: "Name Surname",
      cover: "/images/placeholders/book-cover.jpg",
    },
    {
      id: 9,
      genre: "Genre",
      name: "Book 9",
      author: "Name Surname",
      cover: "/images/placeholders/book-cover.jpg",
    },
  ];

  return (
    <div className={classes.userMainPageContainer}>
      <div className={classes.mainPageActions}>
        <Searchbar />
      </div>
      <div className={classes.bookItemsGrid}>
        {books.map((book) => (
          <div className={classes.bookItemContainer} key={book.id}>
            <img src={book.cover} alt="book cover" />
            <div className={classes.bookItemBody}>
              <div className={classes.bookItemGenre}>
                <img src="/images/icons/open-book.svg" alt="open book" />
                <p>{book.genre}</p>
              </div>
              <p className={classes.bookItemName}>{book.name}</p>
              <p className={classes.bookItemAuthor}>{book.author}</p>
              <Button text="Pogledaj" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMainPage;
