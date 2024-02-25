import { Container } from "@mui/system";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import movies from "../../data/movies.json";
import css from "./moviePage.module.css";
import StarIcon from "@mui/icons-material/Star";
import { Button, Card } from "@mui/material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function MoviePage() {
  // ใช้สำหรับดึงตัวแปลที่อยู่ใน path แต่จะเป็น array
  const [searchParams] = useSearchParams();

  // ดึง parameter ที่ชื่อว่า index ที่อยู่ใน path มาเป็บไว้ในตัวแปล index
  const movieIndex = searchParams.get("index");

  // หนังเรื่องนั้นๆ (แปลง string to number)
  const movie = movies[Number(movieIndex)];

  // สร้าง object เพื่อใช้สำหรับเปลี่ยนหน้า โดยสามารถส่งตัวแปลไปหน้านั้นๆ ได้
  const navigate = useNavigate();

  // Method เพื่อเปลี่ยนหน้าไปหน้า home
  function navigateToHome() {
    navigate("/");
  }

  return (
    <Container className={css.container}>
      <Button
        style={{ marginTop: "5%" }}
        variant="text"
        color="warning"
        onClick={() => navigateToHome()}
      >
        {"< Back"}
      </Button>

      <Card>
        <div className={css.movie_name}>
          <h2>{movie.name}</h2>
          <div className={css.movie_name_rating}>
            <StarIcon color="warning" />
            {movie.imdb_rating}
            <Button startIcon={<StarIcon />}>Rate</Button>
            <TrendingUpIcon color="success" style={{ marginRight: "5px" }} />
            {movie.popularity}
          </div>
        </div>

        <div className={css.movie_video}>
          <img width={"25%"} src={movie.img} alt={movie.name} />
          <iframe width={"55%"} src={movie.video}></iframe>
          <div className={css.movie_video_add}>
            <Button
              variant="contained"
              color="inherit"
              className={css.movie_video_add_1}
            >
              <VideoLibraryIcon />
              videos
            </Button>
            <Button
              variant="contained"
              color="inherit"
              className={css.movie_video_add_2}
            >
              <PhotoLibraryIcon />
              photos
            </Button>
          </div>
        </div>

        <div className={css.contains}>
          {movie.text}

          <hr style={{ width: "100%" }} />
          <div className={css.contains_person}>
            Diractor
            {movie.director.map((director) => (
              <div style={{ marginLeft: "20px" }}>
                <Link to={"/person/?name=" + director.name + "&movieIndex=" + movieIndex}>{director.name}</Link>
              </div>
            ))}
          </div>

          <hr style={{ width: "100%" }} />
          <div className={css.contains_person}>
            Writer
            {movie.writers.map((writer) => (
              <div style={{ marginLeft: "20px" }}>
                <Link to={"/person/?name=" + writer.name  + "&movieIndex=" + movieIndex}>{writer.name}</Link>
              </div>
            ))}
          </div>

          <hr style={{ width: "100%" }} />
          <div className={css.contains_person}>
            Stars
            {movie.stars.map((star) => (
              <div style={{ marginLeft: "20px" }}>
                <Link to={"/person/?name=" + star.name  + "&movieIndex=" + movieIndex}>{star.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default MoviePage;
