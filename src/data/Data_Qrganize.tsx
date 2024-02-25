import movies from "./movies.json";

// สร้าง Model ข้อมูลของ person
interface Model {
  name: string;
  popularity: number;
  text: string;
  img: string;
  video: string;
}

// Method สำหรับ ดึงข้อมูลของคนโดยไม่ซ้ำกัน
function getPeople() {
  const director: Model[][] = movies.map((movie) => movie.director);
  const writers: Model[][] = movies.map((movie) => movie.writers);
  const stars: Model[][] = movies.map((movie) => movie.stars);

  // array สำหรับรวบรวม array director, writers, stars
  const input = [director, writers, stars];

  // สร้าง Array Object ของคนหลายคน โดยมีชนิดเป็น model
  const people = new Map<string, Model>();

  // for loop
  input.forEach((element) => {
    element.forEach((director_writers_stars) => {
      director_writers_stars.forEach((data) => {
        // ถ้าใน people มีชื่อคนๆนั้นอยู่แล้ว จะไม่เพิ่มเข้าไปอีก
        // .has ใช้สำหรับ หา key ที่อยู่ใน map ถ้ามีจะเป็น true และ ถ้าไม่มีจะเป็น false
        if (!people.has(data.name)) {
          people.set(
            // กำหนด key และ {value} ให้กับ people
            // key คือ data.name , value คือ {name:string, img:string, video:string}
            data.name,
            {
              name: data.name,
              popularity: data.popularity,
              text: data.text,
              img: data.img,
              video: data.video
            }
          );
        }
      });
    });
  });

  // คืนค่าเป็น Array โดยส่งคืนแค่ value แต่ไม่เอา key
  //   โดยรูปแบบคือ [
  //     name: string,
  //     popularity: Number,
  //     text: string,
  //     img: string,
  //     video: string
  //   ]
  return Array.from(people.values());
}

export default getPeople;
