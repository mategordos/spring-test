# spring-test


## Terv:

Felületek, szükségletek:

3 különböző állapot: nincs senki loginelve, user login, és admin login

Home page: 

Felül egy sáv (valami logó bal oldalt), home, egy search bar középen fent, profile, és sign up/login button (akár ugyanott)
Valahol oldalt egy "Kategóriák" gyűjtő, ahol a legtöbb cikkel rendelkező kategóriák fel vannak sorolva (erre kattintva csak azokat a cikkeket jeleníti meg)
Alapból egy browse page a home, legújabb cikkek vannak egymás alatt, pár sor látszódik, majd read more (rákattintva redirect a cikkre)

Cikk felépítése
cím, tartalmi tagek, jelenlegi score (upvote/downvote), time to read(kiszámolod karakterek alapján) szövege
alatta lehet a cikket érintő tagekből hasonlóakat ajánlani pl 3-at

Profile: Egy felület, lehet beállítani avatart, jelszót változtatni, és biot állítani

Sign up: admin reg nincs, csak user, szükségesek hozzá: username, email, password, repeat password
Admin alapból regisztrálva van, több admin nem lehet

User tud: megtalálható cikkek alá kommentelni, cikket értékelni (upvote/downvote), cikket írni(ezt lehet úgy kéne, hogy az admin adhat "blogger" jogot usereknek valahogy, akár user profileon feltüntethető is lenne)




Ötletek amik nem biztosak

Cikkeket lehetne úgy tárolni, hogy linket tárolunk hozzá db-ben?
Grafikát lehetne csinálni hozzá mondjuk midjourneyvel/akár hátteret is, legenerálni párat és változhatna a háttér egy bizonyos csomag generalt kepbol?
lehetne saját avatart feltölteni, meg lehetne pár base amit szintén lehetne mondjuk midjourneyvel
oauth2-t hozzádobni? spring securitynek elvileg vannak hozzá jó cuccai, és jó addition lenne

usernek lehetnének bookmarkolt cikkek, amik valahol össze vannak gyűjtve
Ha blogger profiljára kattolsz, lehetne egy dashboard cikkekkel?

