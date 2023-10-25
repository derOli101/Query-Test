<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import { db } from "./main";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const indexRef = collection(db, "index");
const artRef = collection(db, "artists");
const albRef = collection(db, "albums");
const trackRef = collection(db, "tracks");

var qt = query(albRef, where("Name", "==", "Stoppschild"));

/*var test;
getDocs(qt).then((snapshot) => {
  let albums = [];
  snapshot.docs.forEach((doc) => {
    albums.push({ ...doc.data(), id: doc.id });
  });

  test = albums[0].id;
  console.log(test);
});*/

//Reinschreiben in DB
/* addDoc(albRef, {
    Artist: 'artists/DvD4oOT0bls5ad0E7brq',
    Name: 'TestAlbum',
  })*/
//aus DB löschen
/*  const docRef = doc(db, 'albums', 'wEzyeFGwkTSNqKvpsFjK');
  deleteDoc(docRef);*/

function addArtist(name, cover) {
  var id;
  addDoc(artRef, {
    name: name,
    cover: cover,
    score: 0,
    reviews: 0,
  });
  var q = query(artRef, where("name", "==", name));
  getDocs(q).then((snapshot) => {
    let artist = [];
    snapshot.docs.forEach((doc) => {
      artist.push({ ...doc.data(), id: doc.id });
    });
    id = artist[0].id;
  });
  addDoc(indexRef, {
    name: name,
    reference: "artists/" + id,
    type: "artist",
  });
}

function addAlbum(name, cover, date, artist) {
  var id = "";
  var artistId;

  var q = query(artRef, where("name", "==", artist));
  getDocs(q).then((snapshot) => {
    let artist = [];
    snapshot.docs.forEach((doc) => {
      artist.push({ ...doc.data(), id: doc.id });
    });
    artistId = artist[0].id;
  });

  addDoc(albRef, {
    name: name,
    cover: cover,
    score: 0,
    reviews: 0,
    date: date,
    artist: "artists/" + artistId,
  });

  q = query(albRef, where("name", "==", name));
  getDocs(q).then((snapshot) => {
    let album = [];
    snapshot.docs.forEach((doc) => {
      album.push({ ...doc.data(), id: doc.id });
    });
    id = album[0].id;
  });

  addDoc(indexRef, {
    name: name,
    reference: "albums/" + id,
    type: "album",
  });
}

function addTrack(name, album) {
  var id = "";
  var q = query(albRef, where("name", "==", album));
  getDocs(q).then((snapshot) => {
    let album = [];
    snapshot.docs.forEach((doc) => {
      album.push({ ...doc.data(), id: doc.id });
    });
    id = album[0].id;
  });

  addDoc(trackRef, {
    name: name,
    album: "albums/" + id,
    score: 0,
    reviews: 0,
  });

  q = query(trackRef, where("name", "==", name));
  getDocs(q).then((snapshot) => {
    let track = [];
    snapshot.docs.forEach((doc) => {
      track.push({ ...doc.data(), id: doc.id });
    });
    id = track[0].id;
  });

  addDoc(indexRef, {
    name: name,
    reference: "tracks/" + id,
    type: "track",
  });
}

addArtist(
  "Linkin Park",
  "https://www.warnermusic.de/uploads/media/image-1002-704/04/10834-linkin_park_logo_2014.jpg?v=2-0"
);
addAlbum(
  "LIVING THINGS",
  "https://static.qobuz.com/images/covers/79/04/0093624950479_600.jpg",
  "20.07.2012",
  "Linkin Park"
);
addTrack("LOST IN THE ECHO", "LIVING THINGS");
addTrack("IN MY REMAINS", "LIVING THINGS");
addTrack("BURN IT DOWN", "LIVING THINGS");
addTrack("LIES GREED MISERY", "LIVING THINGS");
addTrack("I'LL BE GONE", "LIVING THINGS");
addTrack("CASTLE OF GLASS", "LIVING THINGS");
addTrack("VICTIMIZED", "LIVING THINGS");
addTrack("ROADS UNTRAVELED", "LIVING THINGS");
addTrack("SKIN TO BONE", "LIVING THINGS");
addTrack("UNTIL IT BREAKS", "LIVING THINGS");
addTrack("TINFOIL", "LIVING THINGS");
addTrack("POWERLESS", "LIVING THINGS");

addAlbum(
  "Hybrid Theory",
  "https://tanteguerilla.com/media/image/product/112801/lg/linkin-park-hybrid-theory-lp.jpg",
  "24.10.2000",
  "Linkin Park"
);
addTrack("Papercut", "Hybrid Theory");
addTrack("One Step Closer", "Hybrid Theory");
addTrack("With You", "Hybrid Theory");
addTrack("Points Of Authority", "Hybrid Theory");
addTrack("Crawling", "Hybrid Theory");
addTrack("Runaway", "Hybrid Theory");
addTrack("By Myself", "Hybrid Theory");
addTrack("In The End", "Hybrid Theory");
addTrack("A Place For My Head", "Hybrid Theory");
addTrack("Forgotten", "Hybrid Theory");
addTrack("Cure For The Itch", "Hybrid Theory");
addTrack("Pushing Me Away", "Hybrid Theory");

addAlbum(
  "Meteora",
  "https://www.impericon.com/432x624x90/media/catalog/product/l/i/linkinpark_meteora_cd_lg.jpg",
  "24.03.2003",
  "Linkin Park"
);
addTrack("Foreword", "Meteora");
addTrack("Don't Stay", "Meteora");
addTrack("Somewhere I Belong", "Meteora");
addTrack("Lying rrom You", "Meteora");
addTrack("Hit the Floor", "Meteora");
addTrack("Easier to Run", "Meteora");
addTrack("Faint", "Meteora");
addTrack("Figure.09", "Meteora");
addTrack("Breaking the Habit", "Meteora");
addTrack("From the Inside", "Meteora");
addTrack("Nobody's Listening", "Meteora");
addTrack("Session", "Meteora");
addTrack("Numb", "Meteora");

addArtist(
  "Nirvana",
  "https://www.rockantenne.de/media/cache/3/version/10456/138880_nirvana_logo.011c6919-v1.jpg/692149a1fa960b65ed8af8d97d6514c5.jpg"
);
addAlbum(
  "Nevermind",
  "https://www.hannamusic.de/wp-content/uploads/2021/06/nirvananever.jpg",
  "26.09.1991",
  "Nirvana"
);
addTrack("Smells Like Teen Spirit", "Nevermind");
addTrack("In Bloom", "Nevermind");
addTrack("Come As You Are", "Nevermind");
addTrack("Breed", "Nevermind");
addTrack("Lithium", "Nevermind");
addTrack("Polly", "Nevermind");
addTrack("Territorial Pissings", "Nevermind");
addTrack("Drain You", "Nevermind");
addTrack("Lounge Act", "Nevermind");
addTrack("Stay Away", "Nevermind");
addTrack("On A Plain", "Nevermind");
addTrack("Something In The Way", "Nevermind");
addTrack("Endless, Nameless", "Nevermind");

addAlbum(
  "Bleach",
  "https://m.media-amazon.com/images/I/71ThvtmT-FL._UF1000,1000_QL80_.jpg",
  "15.06.1989",
  "Nirvana"
);
addTrack("Blew", "Bleach");
addTrack("Floyd the Barber", "Bleach");
addTrack("About a Girl", "Bleach");
addTrack("School", "Bleach");
addTrack("Love Buzz", "Bleach");
addTrack("Paper Cuts", "Bleach");
addTrack("Negative Creep", "Bleach");
addTrack("Scoff", "Bleach");
addTrack("Swap Meet", "Bleach");
addTrack("Mr. Moustache", "Bleach");
addTrack("Sifting", "Bleach");
addTrack("Big Cheese", "Bleach");
addTrack("Downer", "Bleach");

addAlbum(
  "In Utero",
  "https://m.media-amazon.com/images/I/71eLqPemDvS._UF1000,1000_QL80_.jpg",
  "21.09.1993",
  "Nirvana"
);
addTrack("Serve the Servants", "In Utero");
addTrack("Scentless Apprentice", "In Utero");
addTrack("Heart-Shaped Box", "In Utero");
addTrack("Rape Me", "In Utero");
addTrack("Frances Farmer Will Have Her Revenge on Seattle", "In Utero");
addTrack("Dumb", "In Utero");
addTrack("Very Ape", "In Utero");
addTrack("Milk It", "In Utero");
addTrack("Pennyroyal Tea", "In Utero");
addTrack("Radio Friendly Unit Shifter", "In Utero");
addTrack("Tourette's", "In Utero");
addTrack("All Apologies", "In Utero");

addArtist(
  "Pink Floyd",
  "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.byte.fm%2Fmedia%2Fartists%2FbPink_Floyd.jpg&tbnid=QDSbPz_ls3hWlM&vet=12ahUKEwjE0OLAzY-CAxVWiv0HHTsvDrgQMygBegQIARBx..i&imgrefurl=https%3A%2F%2Fwww.byte.fm%2Fartists%2Fpink-floyd%2F&docid=BR_viXetoKg8kM&w=885&h=410&q=pink%20floyd&client=opera-gx&ved=2ahUKEwjE0OLAzY-CAxVWiv0HHTsvDrgQMygBegQIARBx"
);
addAlbum(
  "Wish You Were Here",
  "https://m.media-amazon.com/images/I/71m0ofUWYXL._UF894,1000_QL80_.jpg",
  "12.09.1975",
  "Pink Floyd"
);
addTrack("Shine On You Crazy Diamond (Parts I-V)", "Wish You Were Here");
addTrack("Welcome to the Machine", "Wish You Were Here");
addTrack("Have a Cigar", "Wish You Were Here");
addTrack("Wish You Were Here", "Wish You Were Here");
addTrack("Shine On You Crazy Diamond (Parts VI-IX)", "Wish You Were Here");

addAlbum(
  "The Dark Side Of The Moon",
  "https://upload.wikimedia.org/wikipedia/commons/c/c7/The_Dark_Side_of_the_Moon_Cover.svg",
  "01.03.1973",
  "Pink Floyd"
);
addTrack("Speak to Me", "The Dark Side of the Moon");
addTrack("Breathe", "The Dark Side of the Moon");
addTrack("On the Run", "The Dark Side of the Moon");
addTrack("Time", "The Dark Side of the Moon");
addTrack("The Great Gig in the Sky", "The Dark Side of the Moon");
addTrack("Money", "The Dark Side of the Moon");
addTrack("Us and Them", "The Dark Side of the Moon");
addTrack("Any Colour You Like", "The Dark Side of the Moon");
addTrack("Brain Damage", "The Dark Side of the Moon");
addTrack("Eclipse", "The Dark Side of the Moon");

console.log("hallo");
addAlbum(
  "Animals",
  "https://upload.wikimedia.org/wikipedia/en/7/74/Pink_Floyd-Animals-Frontal.jpg",
  "21.01.1977",
  "Pink Floyd"
);
addTrack("Pigs on the Wing 1", "Animals");
addTrack("Dogs", "Animals");
addTrack("Pigs (Three Different Ones)", "Animals");
addTrack("Sheep", "Animals");
addTrack("Pigs on the Wing 2", "Animals");
</script>

<template>
  <div>{{ test }}</div>
</template>
