import ReactShowMoreText from "react-show-more-text";

import classes from "../../../styles/BookDetails.module.css";

const DUMMY_DATA = [
  { title: "Naziv knjige", data: "Tom Sojer" },
  { title: "Kategorija", data: "Romani" },
  { title: "Zanr", data: "Knjige za djecu" },
  { title: "Autor/i", data: "Mark Twain" },
  { title: "Izdavac", data: "Delfi knjizare" },
  { title: "Godina izdavanja", data: "30.03.2011" },
];

const DUMMY_DESC =
  "Tom Sojer je roman koji možemo da smatramo i autobiografijom jer je utemeljen na doživljajima samog Marka Tvena. Autor ga je pisao u nekoliko navrata: prvi deo napisan je u zimu 1872. godine, drugi deo u proljeće 1875. godine, a treći na leto te iste godine. Napisan je jednostavnim stilom i uz mnogo pripovedanja i humora pa je jednako interesantan i deci i odraslima. Tven je ovim romanom hteo da odrasle čitaoce podseti na detinjstvo.Pripovedanje u romanu Tom Sojer odvija se linearno, bez paralelnih radnji. Sva dešavanja u romanu vrte se oko jednog lika, a to je Tom Sojer. On se ističe svojom inteligencijom, neobuzdanošću i humorističnom naravi.";

const BookMainDetails = () => {
  return (
    <div className={classes.mainDetailsContainer}>
      <div>
        {DUMMY_DATA.map((bookDetail) => {
          return (
            <div className={classes.detailContainer}>
              <p className={classes.detailTitle}>{bookDetail.title}</p>
              <p className={classes.mainDetailText}>{bookDetail.data}</p>
            </div>
          );
        })}
      </div>
      <div className={classes.descriptionContainer}>
        <h4>Storyline (Kratki sadrzaj)</h4>
        <ReactShowMoreText
          lines={5}
          more="Prikazi vise &#8595;"
          less="Prikazi manje &#8593;"
          anchorClass={classes.descriptionAnchor}
        >
          {DUMMY_DESC}
        </ReactShowMoreText>
      </div>
    </div>
  );
};

export default BookMainDetails;
