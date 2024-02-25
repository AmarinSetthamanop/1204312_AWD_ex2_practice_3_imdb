import { Container } from "@mui/system";
import { useNavigate, useSearchParams } from "react-router-dom";
import css from "./personPage.module.css";
import getPeople from "../../data/Data_Qrganize";
import { Button, Card } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

function PersonPage() {

  const people = getPeople();

  // ใช้สำหรับดึงตัวแปลที่อยู่ใน path แต่จะเป็น array
  const [searchParams] = useSearchParams();

  // ดึง parameter ที่ชื่อว่า name ที่อยู่ใน path มาเป็บไว้ในตัวแปล personName
  const personName = searchParams.get("name");

  // หาคนที่ชื่อตรงกันกับที่ส่งเข้ามา
  let person;
  for (let i = 0; i < people.length; i++) {
    if (people[i].name == personName) {
      person = people[i];
      break;
    }
  }

  // สร้าง object เพื่อใช้สำหรับเปลี่ยนหน้า โดยสามารถส่งตัวแปลไปหน้านั้นๆ ได้
  const navigate = useNavigate();

  // Method เพื่อเปลี่ยนหน้าไปหน้า home
  function navigateToHome() {
    // ถ้าอยู่ที่อน้าของ หนัง แล้วกดมาหน้าคน เมื่อกดย้อนกลับ ก็จะกลับไปหน้าของหนังเรื่องนั้นๆที่เคยกดมาก่อน
    const movieIndex = searchParams.get("movieIndex");
    if (movieIndex) {
      navigate("/movie/?index=" + movieIndex);
    } else {
      // ถ้าอยู่หน้า home แล้วกดมาหน้าคน เมื่อกดกลับก็จะกลับไปหน้า home
      navigate("/");
    }
  }

  return (
    <Container className={css.container}>
      <button style={{ marginTop: "5%" }} onClick={() => navigateToHome()}>
        {"< Back"}
      </button>

      <Card>
        <div className={css.person_name}>
          <h2>{person?.name}</h2>
          <div className={css.person_name_popularity}>
            <TrendingUpIcon color="success" style={{ marginRight: "10px" }} />
            {person?.popularity}
          </div>
        </div>

        <div className={css.person_video}>
          <img width={"25%"} src={person?.img} alt={person?.name} />
          <iframe width={"55%"} src={person?.video}></iframe>
          <div className={css.person_video_add}>
            <Button
              variant="contained"
              color="inherit"
              className={css.person_video_add_1}
            >
              <VideoLibraryIcon />
              videos
            </Button>
            <Button
              variant="contained"
              color="inherit"
              className={css.person_video_add_2}
            >
              <PhotoLibraryIcon />
              photos
            </Button>
          </div>
        </div>

        <div className={css.contains}>
          {person?.text}
        </div>
      </Card>
    </Container>
  );
}

export default PersonPage;
