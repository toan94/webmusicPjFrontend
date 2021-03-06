import {Carousel, Tab, Tabs} from "react-bootstrap";

export default function HomeComponent(){

    return (
        <>
            <h1 className="text-success text-center">Music For Infinite Inspiration</h1>
            <hr/>
            <div className="vh-100">
            <Carousel fade>
                <Carousel.Item>
                    <img

                        className="d-block w-100"
                        src="https://przemekspider.com/wp-content/uploads/2017/05/concerts-in-Delhi.jpg"
                        alt="Music"
                    />
                    <Carousel.Caption>
                        <h3>Music</h3>
                        <p>Melody and harmony</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://musiccitymike.files.wordpress.com/2020/04/benefits-of-going-to-live-music-concerts.jpg?w=640"
                        alt="Sharing"
                    />

                    <Carousel.Caption>
                        <h3>Sharing</h3>
                        <p>A place to share music</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/3/2018/03/03103805/big-concert-audience-listening-to-music-at-festival-picture-id485343244.jpg"
                        alt="Composing"
                    />

                    <Carousel.Caption>
                        <h3>Composing</h3>
                        <p>Share you own creation</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </div>


        </>
    )
}