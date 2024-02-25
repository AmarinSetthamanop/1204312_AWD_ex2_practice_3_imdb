import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Container,
} from "@mui/material";
import movies from "../../data/movies.json";
import css from "./homePage.module.css";
import { Link, useNavigate } from "react-router-dom";
import getPeople from "../../data/Data_Qrganize";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from "react";

function HomePage() {
  // สร้าง object เพื่อใช้สำหรับเปลี่ยนหน้า โดยสามารถส่งตัวแปลไปหน้านั้นๆ ได้
  const navigate = useNavigate();

  // Method เพื่อเปลี่ยนหน้าไหน้า movie เรื่องนั้นๆ
  function navigateToMovie(index: unknown) {
    navigate("/movie/?index=" + index);
  }

  // Mathod เปลี่ยนหน้าไปหน้า คนๆ นั้น
  function navigateToPerson(name: unknown) {
    navigate("/person/?name=" + name);
  }

  // เรียกใช้ Method getPeople โดยส่ง Array 3 ตัวเข้าไป (ส่งคืนมาเป็น array 1 มิติ)
  const people = getPeople();

  // ค่าสำหรับการกำหนดจำนวนการทำงานของ map เพื่อการกดเลื่อนไปทางซ้าย และขวาของ people เพื่อแสดงคนต่อๆไปบนหน้าจอ
  const [minVar, setMinVar] = useState(0); // กำหนดค่าเริ่มค้นคือ 0 เพราะเริ่มต้นจะแสดงตั้งแต่คนที่ 0
  const [maxVar, setMaxVar] = useState(6); // กำหนดค่าเริ่มต้นคือ 6 เพราะเริ่มต้นจะแสดงมาถึงคนที่ n-1
  // Method สำหรับเลื่อน people ไปทางขวา 6 คนต่อไป
  function right_peoler() {
    // ถ้า maxVar เมื่อ +6 เข้าไปแล้ว ยังมีค่าที่น้อยกว่า people ทั้งหมด
    if ( (maxVar+6) < people.length ) {
      setMaxVar(maxVar + 6); // ค่า maxVar ก็จะ +6 ไปเรื่อยๆ
      setMinVar(minVar + 6); // และค่า minVar ก็จะ +6 ด่วยเช่นกัน
    }
    else if (maxVar !== people.length) { // ถ้า maxVar +6 ไปแล้ว เกินกว่าจำนวนคนทั้งหมด ก็จะเอาส่วนที่เกิน ว่าเกินไปเท่าไหร่ มา + ใส่
      setMaxVar(maxVar + ((maxVar+6) - people.length) +2); // +2 คือทดแทนค่าที่ไม่เท่ากัน ของการ map และ length
      setMinVar(minVar + ((maxVar+6) - people.length) +2);
    }
    console.log("minVar: "+minVar+
                "\nmaxVar: "+maxVar)
  }
  // Method สำหรับเลื่อน people ไปทางซ้าย 6 คนก่อนหน้านี้
  function left_peoler() {
    console.log("minVar: "+minVar+
                "\nmaxVar: "+maxVar)
    // ถ้า minVar เมื่อ -6 เข้าไปแล้ว ยังมีค่าที่มากกว่า 0
    if ( (minVar-6) >= 0 ) {
      setMaxVar(maxVar - 6); // ค่า maxVar ก็จะ -6 ไปเรื่อยๆ
      setMinVar(minVar - 6); // และค่า minVar ก็จะ -6 ด้วยเช่นกัน
    }
    else if ( minVar !== 0 ) { // ถ้า minVar -6 แล้ว น้อยกว่า 0 ก็จะเอาจำนวนที่เกิน 0 ว่าเกินไปเท่าไหร่ มา - ใส่
      setMaxVar(maxVar - ((minVar-6) - 0));
      setMinVar(minVar - ((minVar-6) - 0));
    }
  }

  return (
    <Container>
      <h3>Movies</h3>

      <div className={css.card_movie}>
        {/* ใช้ map เพื่อเข้าถึงข้อมูลทั้งหมดที่อยู่ใน list */}
        {movies.map((movie, index) => (
          <Card sx={{ margin: "10px" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                image={movie.img}
                alt={"" + index}
                onClick={() => navigateToMovie(index)}
              />
              {/* Add and Bookmark Icons */}
              <div style={{ position: "absolute", top: 0, left: 0 }}>
                  <BookmarkIcon sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 40 }} />
                  <AddIcon sx={{ color: "black", fontSize: 25, position: "absolute", top: 4, left: 8,}} />
              </div>
            </CardActionArea>

            <CardContent style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <StarIcon color="warning" />
                {movie.imdb_rating}
                <Button>
                  <StarIcon />
                </Button>
              </div>
              <Link to={"/movie/?index=" + index}>{movie.name}</Link>
            </CardContent>

            <CardActions sx={{ flexDirection: "column" }}>
              <Button startIcon={<AddIcon />} size="small">
                Watchlist
              </Button>
              <Button
                startIcon={<PlayArrowIcon />}
                size="small"
                color="inherit"
              >
                Trailer
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>

      <h3>People</h3>

      <div className={css.person}>
        {/* ปุ่มสำหรับเลื่อน people ไปทางซ้าย เพื่อแสดง 6 คนก่อนหน้านี้ */}
        <div className={css.person_next_button}>
          <Button sx={{fontSize: '30px'}} onClick={left_peoler}>{"<"}</Button>
        </div> 

        {/* slice คือ ให้ map ทำงานแค่ n-1 ครั้ง โดยเริ่มตั้งแต่ index ที่ 0 1 2 3 4 5 (รวมเป็น 6 ครั้ง)*/}
        {people.slice(minVar, maxVar).map((person, index) => (
          <div className={css.person_div} key={index}>
            <img
              className={css.person_image}
              src={person.img}
              alt={"" + index}
              onClick={() => navigateToPerson(person.name)}
            />
            {person.name}
          </div>
        ))}

        {/* ปุ่มสำหรับเลื่อน people ไปทางขวา เพื่อแสดง 6 คนต่อๆไป */}
        <div className={css.person_next_button}>
          <Button sx={{fontSize: '30px'}} onClick={right_peoler}>{">"}</Button>
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
