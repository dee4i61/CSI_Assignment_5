const songsData = [
  {
    id: 1,
    title: "Tum Hi Ho",
    subtitle: "Arijit Singh - Aashiqui 2",
    audioUrl: "/songs/Tum Hi Ho - Aashiqui 2 320 Kbps.mp3",
    image: "https://i1.sndcdn.com/artworks-000580416998-kbrnmy-t500x500.jpg",
  },
  {
    id: 2,
    title: "Kabira",
    subtitle: "Tochi Raina, Rekha Bhardwaj - Yeh Jawaani Hai Deewani",
    audioUrjpgl: "/songs/Kabira - Yeh Jawaani Hai Deewani 320 Kbps.mp3",
    image: "https://i1.sndcdn.com/artworks-000055558224-n93m1d-t500x500.jpg",
  },
  {
    id: 3,
    title: "Raabta",
    subtitle: "Arijit Singh - Agent Vinod",
    audioUrl: "/songs/Raabta-Female-Version.mp3",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7z91AaKJiiQx3l7AqEAjy1R62PCPh8-aUAg&s",
  },
  {
    id: 4,
    title: "Channa Mereya",
    subtitle: "Arijit Singh - Ae Dil Hai Mushkil",
    audioUrl: "/songs/Channa Mereya - Arijit Singh(Pagalourld.in).mp3",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXj8T2EhLd7S3Yh1yZebr3V65z-_60JHJVSw&s",
  },
  {
    id: 5,
    title: "Tera Hone Laga Hoon",
    subtitle: "Atif Aslam - Ajab Prem Ki Ghazab Kahani",
    audioUrl:
      "/songs/Tera Hone Laga Hoon Ajab Prem Ki Ghazab Kahani 320 Kbps.mp3",
    image: "https://i.scdn.co/image/ab67616d0000b273e23347d1b3a9da365c1addfc",
  },
  {
    id: 6,
    title: "Phir Le Aya Dil",
    subtitle: "Arijit Singh - Barfi!",
    audioUrl: "/songs/Phir Le Aya Dil Barfi 320 Kbps.mp3",
    image:
      "https://resources.tidal.com/images/f8aba918/89fd/4248/963a/c8772bc592ee/640x640.jpg",
  },
  {
    id: 7,
    title: "Tera Ban Jaunga",
    subtitle: "Tulsi Kumar - Kabir Singh",
    audioUrl: "/songs/Tera Ban Jaunga - Kabir Singh 320 Kbps.mp3",
    image:
      "https://i1.sndcdn.com/artworks-LIBFzlKUj7KiITVo-uLH0Qw-t500x500.jpg",
  },
  {
    id: 8,
    title: "Sun Saathiya",
    subtitle: "Divya Kumar - ABCD 2",
    audioUrl: "/songs/Tum Hi Ho - Aashiqui 2 320 Kbps.mp3",
    image: "https://static-cse.canva.com/blob/2082021/1600w-mHIJOBN4RkY.jpg",
  },
  {
    id: 9,
    title: "Hawayein",
    subtitle: "Arijit Singh - Jab Harry Met Sejal",
    audioUrl:
      "/songs/Hawayein (Film Version) - Jab Harry Met Sejal 320 Kbps.mp3",
    image:
      "https://cdn-images.dzcdn.net/images/cover/bd0a481be0da5abea9db50df8af1ce61/0x1900-000000-80-0-0.jpg",
  },
  {
    id: 10,
    title: "Agar Tum Saath Ho",
    subtitle: "Arijit Singh, Alka Yagnik - Tamasha",
    audioUrl: "/songs/Agar Tum Saath Ho - Tamasha 320 Kbps.mp3",
    image:
      "https://c.saavncdn.com/723/Agar-Tum-Saath-Ho-From-Tamasha--English-2019-20200106215945-500x500.jpg",
  },
  {
    id: 11,
    title: "Tum Se Hi",
    subtitle: "Arijit Singh - Jab Harry Met Sejal",
    audioUrl: "/songs/Tum Se Hi - Jab We Met 320 Kbps.mp3",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRogU-aeZjIUojLXjUPP3BmH24-kFACeevhqA&s",
  },
  {
    id: 12,
    title: "Ve Kamleya",
    subtitle: "Sachin-Jigar, Arijit Singh – Rocky Aur Rani Ki Prem Kahani",
    audioUrl: "/songs/Ve Kamleya Rocky Aur Rani Kii Prem Kahaani 320 Kbps.mp3",
    image:
      "https://cdn-images.dzcdn.net/images/cover/f51f0a1f6268ca54f2893df288acfa33/1900x1900-000000-80-0-0.jpg",
  },
  {
    id: 13,
    title: "Deva Deva",
    subtitle: "Vishal-Shekhar, Arijit Singh - Brahmastra",
    audioUrl: "/songs/Deva Deva Brahmastra 320 Kbps.mp3",
    image:
      "https://c.saavncdn.com/044/Deva-Deva-From-Brahmastra-Hindi-2022-20220812225424-500x500.jpg",
  },
  {
    id: 14,
    title: "Pehle Bhi Main",
    subtitle: "Atif Aslam - Animal",
    audioUrl: "/songs/Pehle Bhi Main - Animal 320 Kbps.mp3",
    image:
      "https://c.saavncdn.com/248/Pehle-Bhi-Main-Future-Bass-Hindi-2024-20240223181016-500x500.jpg",
  },
  {
    id: 15,
    title: "Sunn Raha Hai",
    subtitle: "Aashiqui 2 - Ankit Tiwari",
    audioUrl: "/songs/Sunn Raha Hai (Male) - Aashiqui 2 320 Kbps.mp3",
    image:
      "https://c.saavncdn.com/502/Sunn-Raha-Hai-Reloaded-Hindi-2015-500x500.jpg",
  },
  {
    id: 16,
    title: "Badtameez Dil",
    subtitle: "Yeh Jawaani Hai Deewani - Pritam",
    audioUrl: "/songs/Badtameez Dil - Yeh Jawaani Hai Deewani 320 Kbps.mp3",
    image: "https://i1.sndcdn.com/artworks-000046080064-uk7dyu-t500x500.jpg",
  },
  {
    id: 17,
    title: "Kaise Hua",
    subtitle: "Sanam Teri Kasam - Himesh Reshammiya",
    audioUrl: "/songs/Kaise Hua - Kabir Singh 320 Kbps.mp3",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBhiUjy_CCwoK5Q4LZWIPueRp4EHvP_1GRZg&s",
  },
  {
    id: 18,
    title: "Finding Her",
    subtitle: "Kushagra, Bhaarath, Saaheal",
    audioUrl: "/songs/Finding Her - Kushagra 320 Kbps.mp3",
    image: "https://i.scdn.co/image/ab67616d0000b27383141000ee8ce3b893a0b425",
  },
  {
    id: 19,
    title: "Young G.O.A.T",
    subtitle: "Cheema Y, Gur Sidhu",
    audioUrl: "/songs/Young G.O.A.T - Cheema Y.mp3",
    image:
      "https://c.saavncdn.com/569/Young-Goat-Punjabi-2022-20240119145304-500x500.jpg",
  },
  {
    id: 20,
    title: 'Raanjhan (From "Do Patti")',
    subtitle: "Sachet-Parampara, Parampara Tandon",
    audioUrl: "/songs/Raanjhan - Do Patti 320 Kbps.mp3",
    image:
      "https://c.saavncdn.com/915/Raanjhan-From-Do-Patti-Hindi-2024-20241004153945-500x500.jpg",
  },
  {
    id: 21,
    title: "Perfect",
    subtitle: "Ed Sheeran",
    audioUrl: "/songs/Perfect - 320Kbps-(Mr-Jat.in).mp3",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv4BF1TU4Vb6Cf-_Hz9lPXkEsl__XP5oIbtQ&s",
  },
  {
    id: 22,
    title: 'Naamumkin (From "Maalik")',
    subtitle: "Shreya Ghoshal, Sachin-Jigar",
    audioUrl: "/songs/Naamumkin Maalik 320 Kbps.mp3",
    image:
      "https://c.saavncdn.com/424/Naamumkin-From-Maalik-Hindi-2025-20250609145108-500x500.jpg",
  },
  {
    id: 23,
    title: "Aur Mohabbat Kitni Karoon",
    subtitle: "Pritam, Arijit Singh - Metro",
    audioUrl: "/songs/Aur Mohabbat Kitni Karoon Metro In Dino 320 Kbps.mp3",
    image:
      "https://c.saavncdn.com/840/Aur-Mohabbat-Kitni-Karoon-From-Metro-In-Dino-Hindi-2025-20250620111003-500x500.jpg",
  },
  {
    id: 24,
    title: "Shaky",
    subtitle: "Sanju Rathod, G-SPXRKK",
    audioUrl: "/songs/Shaky - Sanju Rathod 320 Kbps.mp3",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Shaky_Sanju_Rathod.jpg/250px-Shaky_Sanju_Rathod.jpg",
  },
  {
    id: 25,
    title: 'Jugraafiya - From "Super 30"',
    subtitle: "Udit Narayan, Shreya Ghoshal",
    audioUrl: "/songs/Tum Hi Ho - Aashiqui 2 320 Kbps.mp3",
    image: "https://static-cse.canva.com/blob/2082021/1600w-mHIJOBN4RkY.jpg",
  },
  {
    id: 26,
    title: "Chiranjeevi",
    subtitle: "Nihal Sadiq, Hanan Shaikh",
    audioUrl: "/songs/Tum Hi Ho - Aashiqui 2 320 Kbps.mp3",
    image: "https://static-cse.canva.com/blob/2082021/1600w-mHIJOBN4RkY.jpg",
  },
];

module.exports = songsData;
